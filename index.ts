import { fileURLToPath } from 'node:url'
import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import { DWDSchema } from './helpers/weather'

export const createApp = async () => {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(FastifyVite, {
    root: import.meta.url,
    dev: process.env.NODE_ENV !== 'production',
    spa: true
  })

  fastify.get('/wetter', async () => {
    const data = await (
      await fetch('https://s3.eu-central-1.amazonaws.com/app-prod-static.warnwetter.de/v16/gemeinde_warnings_v2.json')
    ).json()
    const warnings = DWDSchema.parse(data.warnings)
    return warnings
  })

  fastify.get('/*', (_, res) => {
    res.html()
  })

  await fastify.vite.ready()
  return fastify
}

if (process.argv[1] === fileURLToPath(new URL(import.meta.url))) {
  const app = await createApp()
  await app.listen({ port: parseInt(process.env.PORT || '3000', 10), host: process.env.ADDRESS || '0.0.0.0' })
}
