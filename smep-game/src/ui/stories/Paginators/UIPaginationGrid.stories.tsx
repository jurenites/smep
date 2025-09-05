import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPaginationGrid } from '../../components/Paginators/UIPaginationGrid';
import { PaginationState, ClickableState } from '../../../lib/types';
import { gridPaginationService } from '../../../lib/grid-pagination-service';

const meta: Meta<typeof UIPaginationGrid> = {
    title: 'UI/UIPaginationGrid',
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
        clickable: {
            control: 'select',
            options: Object.values(ClickableState),
            description: 'Whether the pagination is clickable or not',
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

// Periodic table-like layout example
const createPeriodicTableContext = () => {
    const pages = [
        // Row 1 (H, He)
        { id: 'H', position: { x: 0, y: 0 }, title: 'H', state: PaginationState.ACTIVE, metadata: { atomicNumber: 1 } },
        { id: 'He', position: { x: 17, y: 0 }, title: 'He', state: PaginationState.ACTIVE, metadata: { atomicNumber: 2 } },

        // Row 2 (Li, Be, B, C, N, O, F, Ne)
        { id: 'Li', position: { x: 0, y: 1 }, title: 'Li', state: PaginationState.ACTIVE, metadata: { atomicNumber: 3 } },
        { id: 'Be', position: { x: 1, y: 1 }, title: 'Be', state: PaginationState.ACTIVE, metadata: { atomicNumber: 4 } },
        { id: 'B', position: { x: 12, y: 1 }, title: 'B', state: PaginationState.ACTIVE, metadata: { atomicNumber: 5 } },
        { id: 'C', position: { x: 13, y: 1 }, title: 'C', state: PaginationState.ACTIVE, metadata: { atomicNumber: 6 } },
        { id: 'N', position: { x: 14, y: 1 }, title: 'N', state: PaginationState.ACTIVE, metadata: { atomicNumber: 7 } },
        { id: 'O', position: { x: 15, y: 1 }, title: 'O', state: PaginationState.ACTIVE, metadata: { atomicNumber: 8 } },
        { id: 'F', position: { x: 16, y: 1 }, title: 'F', state: PaginationState.ACTIVE, metadata: { atomicNumber: 9 } },
        { id: 'Ne', position: { x: 17, y: 1 }, title: 'Ne', state: PaginationState.ACTIVE, metadata: { atomicNumber: 10 } },

        // Row 3 (Na, Mg, Al, Si, P, S, Cl, Ar)
        { id: 'Na', position: { x: 0, y: 2 }, title: 'Na', state: PaginationState.ACTIVE, metadata: { atomicNumber: 11 } },
        { id: 'Mg', position: { x: 1, y: 2 }, title: 'Mg', state: PaginationState.ACTIVE, metadata: { atomicNumber: 12 } },
        { id: 'Al', position: { x: 12, y: 2 }, title: 'Al', state: PaginationState.ACTIVE, metadata: { atomicNumber: 13 } },
        { id: 'Si', position: { x: 13, y: 2 }, title: 'Si', state: PaginationState.ACTIVE, metadata: { atomicNumber: 14 } },
        { id: 'P', position: { x: 14, y: 2 }, title: 'P', state: PaginationState.ACTIVE, metadata: { atomicNumber: 15 } },
        { id: 'S', position: { x: 15, y: 2 }, title: 'S', state: PaginationState.ACTIVE, metadata: { atomicNumber: 16 } },
        { id: 'Cl', position: { x: 16, y: 2 }, title: 'Cl', state: PaginationState.ACTIVE, metadata: { atomicNumber: 17 } },
        { id: 'Ar', position: { x: 17, y: 2 }, title: 'Ar', state: PaginationState.ACTIVE, metadata: { atomicNumber: 18 } },
    ];

    // Custom navigation for periodic table (jumps over gaps)
    const customNavigation = (from: { x: number; y: number }, direction: 'up' | 'down' | 'left' | 'right') => {
        // This is a simplified version - real periodic table navigation would be more complex
        let nextPosition = { ...from };

        switch (direction) {
            case 'up':
                nextPosition.y = Math.max(0, from.y - 1);
                break;
            case 'down':
                nextPosition.y = Math.min(2, from.y + 1);
                break;
            case 'left':
                nextPosition.x = Math.max(0, from.x - 1);
                break;
            case 'right':
                nextPosition.x = Math.min(17, from.x + 1);
                break;
        }

        // Check if the next position has a valid element
        const hasElement = pages.some(page =>
            page.position.x === nextPosition.x && page.position.y === nextPosition.y
        );

        return hasElement ? nextPosition : null;
    };

    return gridPaginationService.createContext(
        'periodic-table',
        pages,
        { width: 18, height: 3 },
        PaginationState.ACTIVE,
        { customNavigation }
    );
};

export const SimpleGrid: Story = {
    args: {
        context: createSimpleGridContext(),
        active: 'only view',
        clickable: ClickableState.DISABLED,
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
        context: createPeriodicTableContext(),
        active: 'only view',
        clickable: ClickableState.DISABLED,
    },
    parameters: {
        docs: {
            description: {
                story: 'Periodic table-like layout example. Demonstrates complex layouts with gaps and custom navigation rules.',
            },
        },
    },
};

export const ClickableGrid: Story = {
    args: {
        context: createSimpleGridContext(),
        active: 'clickable',
        clickable: ClickableState.ENABLED,
    },
    parameters: {
        docs: {
            description: {
                story: 'Clickable 3x3 grid pagination. Users can click on squares to navigate between pages.',
            },
        },
    },
};
