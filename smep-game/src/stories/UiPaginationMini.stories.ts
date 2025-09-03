import type { Meta, StoryObj } from '@storybook/react-vite';
import { UiPaginationMini } from '../ui/primitives/UiPaginationMini';

const meta: Meta<typeof UiPaginationMini> = {
    title: 'UI Primitives/UiPaginationMini',
    component: UiPaginationMini,
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
            control: { type: 'number', min: 0, max: 9 },
            description: 'Currently active page index',
        },
        onPageChange: {
            action: 'pageChanged',
            description: 'Callback when page is changed',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        count: 5,
        activeIndex: 0,
    },
};

export const ActiveMiddle: Story = {
    args: {
        count: 5,
        activeIndex: 2,
    },
};

export const ActiveLast: Story = {
    args: {
        count: 5,
        activeIndex: 4,
    },
};

export const ManyPages: Story = {
    args: {
        count: 8,
        activeIndex: 3,
    },
};

export const SinglePage: Story = {
    args: {
        count: 1,
        activeIndex: 0,
    },
};

export const Interactive: Story = {
    args: {
        count: 5,
        activeIndex: 0,
        onPageChange: (index: number) => console.log(`Page changed to: ${index}`),
    },
}; 