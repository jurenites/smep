import type { Meta, StoryObj } from '@storybook/react-vite';
import { UiRuler } from '../ui/primitives/UiRuler';

const meta: Meta<typeof UiRuler> = {
    title: 'UI Primitives/UiRuler',
    component: UiRuler,
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
        height: {
            control: { type: 'number', min: 20, max: 100 },
            description: 'Height of the ruler',
        },
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
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
        height: 20,
        position: 'bottom',
    },
};

export const LargeScale: Story = {
    args: {
        scale: 1000,
        width: 200,
        height: 20,
        position: 'bottom',
    },
};

export const SmallScale: Story = {
    args: {
        scale: 0.001,
        width: 200,
        height: 20,
        position: 'bottom',
    },
};

export const TopPosition: Story = {
    args: {
        scale: 1,
        width: 200,
        height: 20,
        position: 'top',
    },
};

export const LeftPosition: Story = {
    args: {
        scale: 1,
        width: 20,
        height: 200,
        position: 'left',
    },
};

export const RightPosition: Story = {
    args: {
        scale: 1,
        width: 20,
        height: 200,
        position: 'right',
    },
}; 