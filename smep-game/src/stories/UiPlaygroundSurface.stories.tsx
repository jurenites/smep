import type { Meta, StoryObj } from '@storybook/react';
import { UIPlaygroundSurface } from '../ui/primitives/UIPlaygroundSurface';

const meta: Meta<typeof UIPlaygroundSurface> = {
    title: 'UI Primitives/UIPlaygroundSurface',
    component: UIPlaygroundSurface,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        width: {
            control: { type: 'number', min: 100, max: 800 },
            description: 'Width of the playground surface',
        },
        height: {
            control: { type: 'number', min: 100, max: 600 },
            description: 'Height of the playground surface',
        },
        onMouseMove: {
            action: 'mouseMove',
            description: 'Callback when mouse moves over the surface',
        },
        onMouseDown: {
            action: 'mouseDown',
            description: 'Callback when mouse button is pressed',
        },
        onMouseUp: {
            action: 'mouseUp',
            description: 'Callback when mouse button is released',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: 360,
        height: 640,
    },
};