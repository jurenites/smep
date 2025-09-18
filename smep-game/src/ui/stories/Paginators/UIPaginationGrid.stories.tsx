import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationGrid } from '../../components/Paginators/UIPaginationGrid';
import { UIPeriodicTableBlocks } from '../../components/Paginators/UIPeriodicTableBlocks';
import { PaginationState } from '../../../lib/types';
import { gridPaginationService } from '../../../lib/grid-pagination-service';
import {
    PERIODIC_TABLE_ELEMENTS,
    PERIODIC_TABLE_GRID_DIMENSIONS
} from '../../../lib/constants/periodic-table';
import { mapAtomicDataToLayout } from '../../../lib/constants/periodic-table-mapper';
import { getElementPosition } from '../../../lib/constants/periodic-table-position-mapper';

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
            description: 'Periodic table view - long form (standard) or short form (P-block under table)',
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

// Periodic table-like layout example using position mapper
const createPeriodicTableContext = (viewMode: 'long' | 'short' = 'long') => {
    const dimensions = viewMode === 'long'
        ? PERIODIC_TABLE_GRID_DIMENSIONS.longForm
        : PERIODIC_TABLE_GRID_DIMENSIONS.shortForm;

    // Convert periodic table elements to grid pages using position mapper
    const pages = PERIODIC_TABLE_ELEMENTS.map((element: any) => ({
        id: element.symbol, // Use symbol as id
        position: getElementPosition(element.atomicNumber, viewMode), // Calculate position based on atomicNumber
        title: element.symbol,
        // Disable elements with atomic numbers greater than 87 (beyond Francium)
        state: element.atomicNumber > 87 ? PaginationState.DISABLED : PaginationState.ACTIVE,
        metadata: {
            atomicNumber: element.atomicNumber,
            name: element.name,
            category: element.category,
            electronShellGroup: element.electronShellGroup,
            period: element.period
        }
    }));

    // Custom navigation for periodic table (jumps over gaps)
    const customNavigation = (from: { x: number; y: number }, direction: 'up' | 'down' | 'left' | 'right') => {
        let nextPosition = { ...from };

        switch (direction) {
            case 'up':
                nextPosition.y = Math.max(0, from.y - 1);
                break;
            case 'down':
                nextPosition.y = Math.min(dimensions.height - 1, from.y + 1);
                break;
            case 'left':
                nextPosition.x = Math.max(0, from.x - 1);
                break;
            case 'right':
                nextPosition.x = Math.min(dimensions.width - 1, from.x + 1);
                break;
        }

        // Check if the next position has a valid element
        const hasElement = pages.some((page: any) =>
            page.position.x === nextPosition.x && page.position.y === nextPosition.y
        );

        return hasElement ? nextPosition : null;
    };

    return gridPaginationService.createContext(
        `periodic-table-${viewMode}`,
        pages,
        dimensions,
        PaginationState.ACTIVE,
        { customNavigation }
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

export const PeriodicTable: Story = {
    args: {
        context: createPeriodicTableContext('long'),
        active: 'only view',
        viewMode: 'long',
    } as any,
    parameters: {
        docs: {
            description: {
                story: 'Periodic table-like layout example. Demonstrates complex layouts with gaps and custom navigation rules. Use the viewMode control to switch between long form (standard periodic table) and short form (P-block under the table).',
            },
        },
    },
    render: (args) => {
        // Recreate context when viewMode changes
        const viewMode = (args as any).viewMode || 'long';
        const context = createPeriodicTableContext(viewMode);
        return <UIPaginationGrid {...args} context={context} />;
    },
};

export const PeriodicTableBlocks: Story = {
    args: {
        active: 'only view',
    },
    parameters: {
        docs: {
            description: {
                story: 'Block-based periodic table layout. Each block (S, P, D, F) is rendered as a separate SimpleGrid component, making it easier to arrange and manage the layout. Use the viewMode control to switch between long form (all blocks in a row) and short form (F-block below main table).',
            },
        },
    },
    render: (args) => {
        return <UIPeriodicTableBlocks viewMode="long" {...args} />;
    },
};

export const PeriodicTableWithNewAbstraction: Story = {
    args: {
        active: 'only view',
    },
    parameters: {
        docs: {
            description: {
                story: 'Periodic table using the new abstraction layer. Atomic data is separated from display coordinates, making it easier to create different layouts without modifying the atomic information. The mapping layer connects atomic data with display positions.',
            },
        },
    },
    render: (args) => {
        // Create context using the new abstraction
        const viewMode = 'long'; // Fixed to long view for this story
        const periodicTableData = mapAtomicDataToLayout(viewMode);

        const pages = periodicTableData.elements.map(element => ({
            id: element.symbol, // Use symbol as id
            position: element.position,
            title: element.symbol,
            state: element.atomicNumber > 87 ? PaginationState.DISABLED : PaginationState.ACTIVE,
            metadata: {
                atomicNumber: element.atomicNumber,
                name: element.name,
                category: element.category,
                electronShellGroup: element.electronShellGroup,
                period: element.period
            }
        }));

        const context = gridPaginationService.createContext(
            `periodic-table-${viewMode}`,
            pages,
            periodicTableData.dimensions,
            PaginationState.ACTIVE
        );

        return <UIPaginationGrid context={context} active={args.active} />;
    },
};

