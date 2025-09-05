import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationMini } from '../../components/Paginators/UIPaginationMini';
import { PaginationState, ClickableState } from '../../../lib/types';

const meta: Meta<typeof UIPaginationMini> = {
    title: 'UI/UIPaginationMini',
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
        clickable: {
            control: 'select',
            options: Object.values(ClickableState),
            description: 'Whether the pagination is clickable or not',
        },
        onPageChange: {
            action: 'pageChanged',
            description: 'Callback when page is changed (returns 1-based page number)',
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
        clickable: ClickableState.ENABLED,
    },
};
