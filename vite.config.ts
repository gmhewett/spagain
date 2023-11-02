import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import viteReact from '@vitejs/plugin-react'

const path = fileURLToPath(new URL(import.meta.url))
const root = resolve(dirname(path), 'frontend')

const plugins = [viteReact()]

export default {
  root,
  plugins
}
