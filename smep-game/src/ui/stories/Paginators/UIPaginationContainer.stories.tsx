import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationContainer } from '../../components/Paginators/UIPaginationContainer';
import { PaginationState } from '../../../lib/types';

const meta: Meta<typeof UIPaginationContainer> = {
    title: 'UI/UIPaginationContainer',
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
        active: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Display mode - clickable or only view',
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
    { id: 'page-5', title: 'Astronomical', state: PaginationState.DISABLED },
];

export const Default: Story = {
    args: {
        contextId: 'storybook-pagination',
        pages: samplePages,
        initialState: PaginationState.ACTIVE,
        active: 'clickable',
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
        active: 'clickable',
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
        active: 'clickable',
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
        active: 'clickable',
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
            { id: 'page-2', title: 'Nuclear', state: PaginationState.DISABLED },
            { id: 'page-3', title: 'Atomic', state: PaginationState.ACTIVE },
            { id: 'page-4', title: 'Molecular', state: PaginationState.INACTIVE },
            { id: 'page-5', title: 'Astronomical', state: PaginationState.DISABLED },
        ],
        initialState: PaginationState.ACTIVE,
        active: 'clickable',
        onPageChange: (pageIndex, event) => {
            console.log('Page changed to:', pageIndex, event);
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates robust pagination that ensures there\'s always an active page, even when some pages are unavailable or disabled.',
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
        active: 'clickable',
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

export const SimpleTest: Story = {
    args: {
        contextId: 'storybook-pagination-simple-test',
        pages: [
            { id: 'page-1', title: 'Page 1', state: PaginationState.ACTIVE },
            { id: 'page-2', title: 'Page 2', state: PaginationState.ACTIVE },
            { id: 'page-3', title: 'Page 3', state: PaginationState.ACTIVE },
        ],
        initialState: PaginationState.ACTIVE,
        active: 'clickable',
        onPageChange: (pageIndex, event) => {
            console.log('Simple Test: Page changed to:', pageIndex);
            console.log('Event details:', event);
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Simple 3-page pagination test. Click on any square to see the active state change. The clicked square should become white (active) and the previously active square should become gray (inactive).',
            },
        },
    },
};
