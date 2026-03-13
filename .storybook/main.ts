import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (cfg) =>
    mergeConfig(cfg, {
      resolve: {
        alias: { '@': resolve(__dirname, '../src') },
      },
    }),
}

export default config
