import type { Meta, StoryObj } from '@storybook/react';
import { UiPlaygroundSurface } from '../ui/primitives/UiPlaygroundSurface';
import styles from './UiPlaygroundSurface.stories.module.css';

const meta: Meta<typeof UiPlaygroundSurface> = {
    title: 'UI Primitives/UiPlaygroundSurface',
    component: UiPlaygroundSurface,
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
        width: 400,
        height: 300,
    },
};

export const Large: Story = {
    args: {
        width: 600,
        height: 400,
    },
};

export const Small: Story = {
    args: {
        width: 200,
        height: 150,
    },
};

export const WithContent: Story = {
    args: {
        width: 400,
        height: 300,
    },
    render: (args) => (
        <UiPlaygroundSurface {...args}>
            <div className={styles.content}>
                Interactive Content
            </div>
        </UiPlaygroundSurface>
    ),
};