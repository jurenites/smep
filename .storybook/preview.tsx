import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/index.css';
import '../src/ui/tokens/tokens.css';
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
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
};

export default preview;
