import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationMini } from '../../components/Paginators/UIPaginationMini';
import { UISquareState } from '../../../lib/types';

const meta: Meta<typeof UIPaginationMini> = {
    title: 'UI/Pagination/UIPaginationMini',
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
        active: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Display mode - clickable (0px gap) or only view (2px gap)',
        },
        onPageChange: {
            action: 'pageChanged',
            description: 'Callback when page is changed (returns 1-based page number)',
        },
        elementStates: {
            control: 'object',
            description: 'Array to override individual element states (optional)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        count: 5,
        activeIndex: 1,
        active: 'clickable',
        elementStates: [
            UISquareState.ACTIVE,    // First element - Active
            UISquareState.INACTIVE,  // Second element - Inactive
            UISquareState.INACTIVE,  // Third element - Inactive
            UISquareState.INACTIVE,  // Fourth element - Inactive
            UISquareState.DISABLED,  // Fifth element - Disabled
        ],
    },
    parameters: {
        docs: {
            description: {
                story: '5-element pagination with the fifth element set to DISABLED state. The first element is active, middle elements are inactive, and the last element is disabled.',
            },
        },
    },
};
