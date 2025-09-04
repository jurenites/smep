import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIRuler } from '../ui/primitives/UIRuler';

const meta: Meta<typeof UIRuler> = {
    title: 'UI Primitives/UIRuler',
    component: UIRuler,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        scale: {
            control: { type: 'number', min: 0.001, max: 1000000, step: 0.1 },
            description: 'Scale factor to display',
        },
        width: {
            control: { type: 'number', min: 50, max: 400 },
            description: 'Width of the ruler',
        },

        position: {
            control: 'select',
            options: ['top', 'bottom'],
            description: 'Position of the ruler',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        scale: 1,
        width: 200,
        position: 'bottom',
    },
};

export const LargeScale: Story = {
    args: {
        scale: 1000,
        width: 200,
        position: 'bottom',
    },
};

export const SmallScale: Story = {
    args: {
        scale: 0.001,
        width: 200,
        position: 'bottom',
    },
};

export const TopPosition: Story = {
    args: {
        scale: 1,
        width: 200,
        position: 'top',
    },
}; 