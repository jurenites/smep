import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationMini } from '../ui/primitives/UIPaginationMini';
import { PaginationState } from '../lib/types';

const meta: Meta<typeof UIPaginationMini> = {
    title: 'UI Primitives/UIPaginationMini',
    component: UIPaginationMini,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        count: {
            control: { type: 'number', min: 1, max: 10 },
            description: 'Number of pagination dots',
        },
        activeIndex: {
            control: { type: 'number', min: 1, max: 10 },
            description: 'Currently active page number (1-based)',
        },
        state: {
            control: 'select',
            options: Object.values(PaginationState),
            description: 'State of the pagination component',
        },
        onPageChange: {
            action: 'pageChanged',
            description: 'Callback when page is changed (returns 1-based page number)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    args: {
        count: 5,
        activeIndex: 1,
    },
}; 