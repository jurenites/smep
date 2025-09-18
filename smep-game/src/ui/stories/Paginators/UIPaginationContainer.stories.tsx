import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationContainer } from '../../components/Paginators/UIPaginationContainer';
import { PaginationState } from '../../../lib/types';

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
    { id: 'page-1', index: 1, title: 'Quantum', state: PaginationState.ACTIVE },
    { id: 'page-2', index: 2, title: 'Nuclear', state: PaginationState.ACTIVE },
    { id: 'page-3', index: 3, title: 'Atomic', state: PaginationState.ACTIVE },
    { id: 'page-4', index: 4, title: 'Molecular', state: PaginationState.UNAVAILABLE },
    { id: 'page-5', index: 5, title: 'Astronomical', state: PaginationState.DISABLED },
];

export const Default: Story = {
    args: {
        contextId: 'storybook-pagination-events',
        pages: samplePages,
        initialState: PaginationState.ACTIVE,
        active: 'clickable',
        className: 'custom-pagination',
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
