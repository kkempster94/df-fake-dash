import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f8f8' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark',  value: '#131a1a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color|bg)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
