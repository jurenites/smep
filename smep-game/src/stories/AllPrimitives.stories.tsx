import type { Meta, StoryObj } from '@storybook/react';
import { AllPrimitivesShowcase } from './components/AllPrimitivesShowcase';

const meta: Meta = {
    title: 'UI Primitives/All Primitives',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Showcase: Story = {
    render: () => <AllPrimitivesShowcase />,
}; 