import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import './storybook-overrides.css';
import { create } from '@storybook/theming';
import { TOKENS } from '../src/ui/tokens/tokens';

const darkTheme = create({
  base: 'dark',
  appBg: TOKENS.colors.black,
  appContentBg: TOKENS.colors.black,
  barBg: TOKENS.colors.black,
});

const preview: Preview = {
  parameters: {
    docs: {
      theme: darkTheme,
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: TOKENS.colors.black },
        { name: 'light', value: TOKENS.colors.white },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;