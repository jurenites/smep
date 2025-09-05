import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationBig } from '../../components/Paginators/UIPaginationBig';
import { PaginationState, ClickableState, UISquareState } from '../../../lib/types';

const meta: Meta<typeof UIPaginationBig> = {
    title: 'UI/UIPaginationBig',
    component: UIPaginationBig,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        count: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Number of pagination rectangles (horizontal layout)',
        },
        activeIndex: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Currently active page number (1-based)',
        },
        clickable: {
            control: 'select',
            options: Object.values(ClickableState),
            description: 'Whether the pagination is clickable or not',
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
        clickable: ClickableState.ENABLED,
        elementStates: [
            UISquareState.ACTIVE,    // First element - Active
            UISquareState.INACTIVE,  // Second element - Inactive
            UISquareState.INACTIVE,  // Third element - Inactive
            UISquareState.INACTIVE,  // Fourth element - Inactive
            UISquareState.DISABLED,  // Last element - Disabled (as requested)
        ],
    },
    parameters: {
        docs: {
            description: {
                story: '5-element pagination with the last element set to DISABLED state. The first element is active, middle elements are inactive, and the last element is disabled.',
            },
        },
    },
};
