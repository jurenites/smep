import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationGrid } from '../../components/Paginators/UIPaginationGrid';
import { UIPeriodicTableBlocks } from '../../components/Paginators/UIPeriodicTableBlocks';
import { PaginationState, UISquareState, ClickableState } from '../../../lib/types';
import { gridPaginationService } from '../../../lib/grid-pagination-service';

const meta: Meta<typeof UIPaginationGrid> = {
    title: 'UI/Pagination/UIPaginationGrid',
    component: UIPaginationGrid,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // Simple pagination controls (replaces UIPaginationMini)
        count: {
            control: { type: 'number', min: 1, max: 10 },
            description: 'Number of pagination items (for simple mode)',
        },
        activeIndex: {
            control: { type: 'number', min: 1, max: 10 },
            description: 'Currently active page number (1-based, for simple mode)',
        },
        clickable: {
            control: 'select',
            options: Object.values(ClickableState),
            description: 'Whether individual items are clickable',
        },

        // Grid dimension controls
        gridCols: {
            control: { type: 'number', min: 1, max: 5 },
            description: 'Number of columns in the grid',
        },
        gridRows: {
            control: { type: 'number', min: 1, max: 5 },
            description: 'Number of rows in the grid',
        },

        // Common controls
        active: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Display mode - clickable or only view',
        },


        // Event handlers
        onPageChange: {
            action: 'pageChanged',
            description: 'Callback when page is changed (simple mode)',
        },
        onGridPageChange: {
            action: 'gridPageChanged',
            description: 'Callback when grid page is changed (grid mode)',
        },
    } as any,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        count: 5,
        activeIndex: 2,
        gridCols: 5,
        gridRows: 1,
        active: 'only view',
    },
    argTypes: {
        // Hide clickable control for view-only Default story
        clickable: {
            table: { disable: true },
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UIPaginationGrid component - simple pagination in view-only mode. Use the Controls tab to configure all properties including grid dimensions and interaction modes. Individual page states can be controlled through the elementStates array.',
            },
        },
    },
};

// Simple 3x3 grid example
const createSimpleGridContext = () => {
    const pages = [
        { id: '1', position: { x: 0, y: 0 }, title: 'Page 1', state: PaginationState.ACTIVE },
        { id: '2', position: { x: 1, y: 0 }, title: 'Page 2', state: PaginationState.ACTIVE },
        { id: '3', position: { x: 2, y: 0 }, title: 'Page 3', state: PaginationState.ACTIVE },
        { id: '4', position: { x: 0, y: 1 }, title: 'Page 4', state: PaginationState.ACTIVE },
        { id: '5', position: { x: 1, y: 1 }, title: 'Page 5', state: PaginationState.ACTIVE },
        { id: '6', position: { x: 2, y: 1 }, title: 'Page 6', state: PaginationState.ACTIVE },
        { id: '7', position: { x: 0, y: 2 }, title: 'Page 7', state: PaginationState.ACTIVE },
        { id: '8', position: { x: 1, y: 2 }, title: 'Page 8', state: PaginationState.ACTIVE },
        { id: '9', position: { x: 2, y: 2 }, title: 'Page 9', state: PaginationState.ACTIVE },
    ];

    return gridPaginationService.createContext(
        'simple-grid',
        pages,
        { width: 3, height: 3 }
    );
};

/*
export const PeriodicTable: Story = {
    args: {
        active: 'only view',
        viewMode: 'long',
        activeIndex: 0, // Start with no active element to demonstrate the unified pagination
    } as any,
    argTypes: {
        // Hide simple pagination controls for PeriodicTable story
        count: {
            table: { disable: true },
        },
        activeIndex: {
            control: { type: 'number', min: 0, max: 118 },
            description: 'Atomic number to highlight (0 = no active element, 1-118 = specific atomic number)',
        },
        clickable: {
            table: { disable: true },
        },
        gridCols: {
            table: { disable: true },
        },
        gridRows: {
            table: { disable: true },
        },
        onPageChange: {
            table: { disable: true },
        },
        onGridPageChange: {
            table: { disable: true },
        },

        // PeriodicTable-specific controls
        viewMode: {
            control: 'select',
            options: ['long', 'short'],
            description: 'Periodic table view - long form (all blocks in a row) or short form (F-block below main table)',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Block-based periodic table layout. Each block (S, P, D, F) is rendered as a separate SimpleGrid component, making it easier to arrange and manage the layout. Use the viewMode control to switch between long form (all blocks in a row) and short form (F-block below main table). Use the activeIndex control to highlight any element by its atomic number (1-118) in real-time.',
            },
        },
    },
    render: (args) => {
        const viewMode = (args as any).viewMode || 'long';
        const activeIndex = (args as any).activeIndex || 1;
        return <UIPeriodicTableBlocks viewMode={viewMode} activeIndex={activeIndex} {...args} />;
    },
};*/
