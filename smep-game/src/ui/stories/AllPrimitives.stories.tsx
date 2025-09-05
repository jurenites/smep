import type { Meta, StoryObj } from '@storybook/react';
import { AllPrimitivesShowcase } from './AllPrimitivesShowcase';

const meta: Meta<typeof AllPrimitivesShowcase> = {
    title: 'Design System/All Primitives',
    component: AllPrimitivesShowcase,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# All UI Primitives Showcase

## Components

### UICardSmall
Small card components for displaying symbols and states.

### UIRuler
Scale indicators for measurements and dimensions.

### UIPaginationMini
Mini pagination controls for navigation.

### UIPlaygroundSurface
Main playground surface for the game environment.
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
}; 