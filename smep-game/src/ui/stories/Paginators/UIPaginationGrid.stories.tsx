import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationGrid } from '../../components/Paginators/UIPaginationGrid';
import { PaginationState } from '../../../lib/types';
import { gridPaginationService } from '../../../lib/grid-pagination-service';
import {
    PERIODIC_TABLE_ELEMENTS,
    PERIODIC_TABLE_GRID_DIMENSIONS,
    S_BLOCK_ELEMENTS,
    P_BLOCK_ELEMENTS,
    D_BLOCK_ELEMENTS,
    F_BLOCK_ELEMENTS
} from '../../../lib/constants/periodic-table';

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
    },
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

// Periodic table-like layout example using constants
const createPeriodicTableContext = (viewMode: 'long' | 'short' = 'long') => {
    let elements: any[];
    let dimensions: { width: number; height: number };

    if (viewMode === 'long') {
        // Long form: All S, P, D, F blocks displayed at the bottom in order: S, F, D, P
        // F and D blocks interlinked at atomic numbers 57, 58, 89, 90
        elements = [
            // S-block elements (first column, rows 0-6)
            ...S_BLOCK_ELEMENTS,
            
            // F-block elements (second column, rows 7-8) - lanthanides and actinides
            ...F_BLOCK_ELEMENTS.filter(el => el.period === 6).map((el, index) => ({
                ...el,
                position: { x: 1, y: 7 } // Lanthanides in row 7, column 1
            })),
            ...F_BLOCK_ELEMENTS.filter(el => el.period === 7).map((el, index) => ({
                ...el,
                position: { x: 1, y: 8 } // Actinides in row 8, column 1
            })),
            
            // D-block elements (third column, rows 3-6) - transition metals
            ...D_BLOCK_ELEMENTS.filter(el => el.period === 4).map((el, index) => ({
                ...el,
                position: { x: 2, y: 3 } // Period 4 D-block in row 3, column 2
            })),
            ...D_BLOCK_ELEMENTS.filter(el => el.period === 5).map((el, index) => ({
                ...el,
                position: { x: 2, y: 4 } // Period 5 D-block in row 4, column 2
            })),
            ...D_BLOCK_ELEMENTS.filter(el => el.period === 6).map((el, index) => ({
                ...el,
                position: { x: 2, y: 5 } // Period 6 D-block in row 5, column 2
            })),
            ...D_BLOCK_ELEMENTS.filter(el => el.period === 7).map((el, index) => ({
                ...el,
                position: { x: 2, y: 6 } // Period 7 D-block in row 6, column 2
            })),
            
            // P-block elements (fourth column, rows 0-6) - main group elements
            ...P_BLOCK_ELEMENTS.filter(el => el.period === 1).map((el, index) => ({
                ...el,
                position: { x: 3, y: 0 } // Period 1 P-block in row 0, column 3
            })),
            ...P_BLOCK_ELEMENTS.filter(el => el.period === 2).map((el, index) => ({
                ...el,
                position: { x: 3, y: 1 } // Period 2 P-block in row 1, column 3
            })),
            ...P_BLOCK_ELEMENTS.filter(el => el.period === 3).map((el, index) => ({
                ...el,
                position: { x: 3, y: 2 } // Period 3 P-block in row 2, column 3
            })),
            ...P_BLOCK_ELEMENTS.filter(el => el.period === 4).map((el, index) => ({
                ...el,
                position: { x: 3, y: 3 } // Period 4 P-block in row 3, column 3
            })),
            ...P_BLOCK_ELEMENTS.filter(el => el.period === 5).map((el, index) => ({
                ...el,
                position: { x: 3, y: 4 } // Period 5 P-block in row 4, column 3
            })),
            ...P_BLOCK_ELEMENTS.filter(el => el.period === 6).map((el, index) => ({
                ...el,
                position: { x: 3, y: 5 } // Period 6 P-block in row 5, column 3
            })),
            ...P_BLOCK_ELEMENTS.filter(el => el.period === 7).map((el, index) => ({
                ...el,
                position: { x: 3, y: 6 } // Period 7 P-block in row 6, column 3
            }))
        ];
        dimensions = { width: 4, height: 9 };
    } else {
        // Short form: F-block elements moved to separate rows under main table
        elements = [
            // S, D, and P blocks in main table (rows 0-6)
            ...S_BLOCK_ELEMENTS,
            ...D_BLOCK_ELEMENTS,
            ...P_BLOCK_ELEMENTS,

            // F-block lanthanides repositioned to row 7 (under main table)
            ...F_BLOCK_ELEMENTS.filter(el => el.period === 6).map((el, index) => ({
                ...el,
                position: { x: index, y: 7 }
            })),

            // F-block actinides repositioned to row 8 (under lanthanides)
            ...F_BLOCK_ELEMENTS.filter(el => el.period === 7).map((el, index) => ({
                ...el,
                position: { x: index, y: 8 }
            }))
        ];
        dimensions = { width: 18, height: 9 };
    }

    // Convert periodic table elements to grid pages
    const pages = elements.map(element => ({
        id: element.id,
        position: element.position,
        title: element.symbol,
        // Disable elements with atomic numbers greater than 90 (beyond Thorium)
        state: element.atomicNumber > 90 ? PaginationState.DISABLED : PaginationState.ACTIVE,
        metadata: {
            atomicNumber: element.atomicNumber,
            name: element.name,
            category: element.category,
            electronShellGroup: element.electronShellGroup,
            period: element.period,
            group: element.group
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
        const hasElement = pages.some(page =>
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
    },
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

