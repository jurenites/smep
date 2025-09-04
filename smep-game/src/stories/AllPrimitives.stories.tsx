import type { Meta, StoryObj } from '@storybook/react';
import { AllPrimitivesShowcase } from './components/AllPrimitivesShowcase';

const meta: Meta<typeof AllPrimitivesShowcase> = {
    title: 'Design System/All Primitives',
    component: AllPrimitivesShowcase,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# All UI Primitives Showcase

This showcase displays all the available UI primitives in the SMEP design system.

## Typography

For detailed typography information, see the [Typography](/docs/design-system-typography--docs) documentation.

### Available Typography:
- **typography.title**: Roundabout-Regular, Urbanist, sans-serif (16px)
- **typography.body**: Roundabout-Regular, Sulphur Point, sans-serif (16px)
- **typography.digitBig**: 4pixel, monospace (10px)
- **typography.digitSmall**: 4pixel, monospace (5px)
- **typography.code**: Courier New, monospace (12px)

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