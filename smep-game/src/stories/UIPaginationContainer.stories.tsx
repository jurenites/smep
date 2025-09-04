import type { Meta, StoryObj } from '@storybook/react';
import { UIPaginationContainer } from '../ui/primitives/UIPaginationContainer';
import { PaginationState } from '../lib/types';

const meta: Meta<typeof UIPaginationContainer> = {
    title: 'UI/Pagination/UIPaginationContainer',
    component: UIPaginationContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        contextId: {
            control: 'text',
            description: 'Unique identifier for the pagination context',
        },
        initialState: {
            control: 'select',
            options: Object.values(PaginationState),
            description: 'Initial state of the pagination',
        },
        onPageChange: {
            action: 'pageChanged',
            description: 'Callback when page changes',
        },
        onPageLoad: {
            action: 'pageLoaded',
            description: 'Callback when page loads',
        },
        onPaginationReady: {
            action: 'paginationReady',
            description: 'Callback when pagination is ready',
        },

    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample pages for stories
const samplePages = [
    { id: 'page-1', title: 'Quantum', state: PaginationState.ACTIVE },
    { id: 'page-2', title: 'Nuclear', state: PaginationState.ACTIVE },
    { id: 'page-3', title: 'Atomic', state: PaginationState.ACTIVE },
    { id: 'page-4', title: 'Molecular', state: PaginationState.UNAVAILABLE },
    { id: 'page-5', title: 'Astronomical', state: PaginationState.LOCKED },
];

export const Default: Story = {
    args: {
        contextId: 'storybook-pagination',
        pages: samplePages,
        initialState: PaginationState.ACTIVE,
    },
    argTypes: {
        initialState: {
            control: 'select',
            options: Object.values(PaginationState),
            description: 'Initial state of the pagination',
        },
    },
};

export const Disabled: Story = {
    args: {
        contextId: 'storybook-pagination-disabled',
        pages: samplePages,
        initialState: PaginationState.DISABLED,
    },
    argTypes: {
        initialState: {
            control: 'select',
            options: Object.values(PaginationState),
            description: 'Initial state of the pagination',
        },
    },
};

export const Error: Story = {
    args: {
        contextId: 'storybook-pagination-error',
        pages: samplePages,
        initialState: PaginationState.ERROR,
    },
    argTypes: {
        initialState: {
            control: 'select',
            options: Object.values(PaginationState),
            description: 'Initial state of the pagination',
        },
    },
};

export const WithEventHandlers: Story = {
    args: {
        contextId: 'storybook-pagination-events',
        pages: samplePages,
        initialState: PaginationState.ACTIVE,
        onPageChange: (pageIndex, event) => {
            console.log('Page changed to:', pageIndex, event);
        },
        onPageLoad: (pageIndex, event) => {
            console.log('Page loaded:', pageIndex, event);
        },
        onPaginationReady: (event) => {
            console.log('Pagination ready:', event);
        },
    },
};

export const CustomStyling: Story = {
    args: {
        contextId: 'storybook-pagination-styled',
        pages: samplePages,
        initialState: PaginationState.ACTIVE,
        className: 'custom-pagination',
    },
    parameters: {
        docs: {
            description: {
                story: 'Pagination container with custom CSS class for styling.',
            },
        },
    },
};

export const RobustPagination: Story = {
    args: {
        contextId: 'storybook-pagination-robust',
        pages: [
            { id: 'page-1', title: 'Quantum', state: PaginationState.UNAVAILABLE },
            { id: 'page-2', title: 'Nuclear', state: PaginationState.LOCKED },
            { id: 'page-3', title: 'Atomic', state: PaginationState.ACTIVE },
            { id: 'page-4', title: 'Molecular', state: PaginationState.INACTIVE },
            { id: 'page-5', title: 'Astronomical', state: PaginationState.DISABLED },
        ],
        initialState: PaginationState.ACTIVE,
        onPageChange: (pageIndex, event) => {
            console.log('Page changed to:', pageIndex, event);
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates robust pagination that ensures there\'s always an active page, even when some pages are unavailable or locked.',
            },
        },
    },
};

export const ConfigurableStates: Story = {
    args: {
        contextId: 'storybook-pagination-configurable',
        pages: [
            { id: 'page-1', title: 'Quantum', state: PaginationState.ACTIVE },
            { id: 'page-2', title: 'Nuclear', state: PaginationState.ACTIVE },
            { id: 'page-3', title: 'Atomic', state: PaginationState.ACTIVE },
            { id: 'page-4', title: 'Molecular', state: PaginationState.ACTIVE },
            { id: 'page-5', title: 'Astronomical', state: PaginationState.ACTIVE },
        ],
        initialState: PaginationState.ACTIVE,
        onPageChange: (pageIndex, event) => {
            console.log('Page changed to:', pageIndex, event);
        },
    },
    argTypes: {
        initialState: {
            control: 'select',
            options: Object.values(PaginationState),
            description: 'Change the overall pagination state to see how it affects the component',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive story where you can change the pagination state using the dropdown control. Try different states to see how the component behaves.',
            },
        },
    },
};
