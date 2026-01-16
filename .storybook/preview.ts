import '../src/styles/tokens.css'
import '../src/styles/base.css'
import '../src/styles/button.css'
import '../src/styles/fab.css'
import type { Preview } from '@storybook/vue3-vite'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
