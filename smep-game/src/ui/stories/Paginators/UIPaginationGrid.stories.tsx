import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationGrid } from '../../components/Paginators/UIPaginationGrid';
import { UIPeriodicTableBlocks } from '../../components/Paginators/UIPeriodicTableBlocks';
import { PaginationState } from '../../../lib/types';
import { gridPaginationService } from '../../../lib/grid-pagination-service';

const meta: Meta<typeof UIPaginationGrid> = {
    title: 'UI/Pagination/UIPaginationGrid',
    component: UIPaginationGrid,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        active: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Display mode - clickable or only view',
        },
        viewMode: {
            control: 'select',
            options: ['long', 'short'],
            description: 'Periodic table view - long form (all blocks in a row) or short form (F-block below main table)',
        },
    } as any,
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const SimpleGrid: Story = {
    args: {
        context: createSimpleGridContext(),
        active: 'only view',
    },
    parameters: {
        docs: {
            description: {
                story: 'Simple 3x3 grid pagination example. Shows how 2D pagination works with a regular grid layout.',
            },
        },
    },
};

export const PeriodicTableBlocks: Story = {
    args: {
        active: 'only view',
        viewMode: 'long',
    } as any,
    parameters: {
        docs: {
            description: {
                story: 'Block-based periodic table layout. Each block (S, P, D, F) is rendered as a separate SimpleGrid component, making it easier to arrange and manage the layout. Use the viewMode control to switch between long form (all blocks in a row) and short form (F-block below main table).',
            },
        },
    },
    render: (args) => {
        const viewMode = (args as any).viewMode || 'long';
        return <UIPeriodicTableBlocks viewMode={viewMode} {...args} />;
    },
};
