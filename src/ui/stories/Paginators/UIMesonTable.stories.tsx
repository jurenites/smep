import type { Meta, StoryObj } from '@storybook/react';
import { UIMesonTable } from '../../components/Paginators/UIMesonTable';

const meta: Meta<typeof UIMesonTable> = {
    title: 'UI/Pagination/UIMesonTable',
    component: UIMesonTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        interactionMode: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Interaction mode - clickable shows UICards, only view shows UISquares',
        },
        activePrimaryId: {
            control: { type: 'number', min: 1, max: 25, step: 1 },
            description: 'Active meson primary ID (1-25) to highlight',
        },
        displayMode: {
            control: 'select',
            options: ['symbol', 'quarks'],
            description: 'Display mode - symbol shows Greek symbols (π+), quarks shows quark composition (ud̄)',
        },
        onPageChange: {
            action: 'page changed',
            description: 'Callback when page/position changes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing the meson table
export const Default: Story = {
    args: {
        interactionMode: 'clickable',
        activePrimaryId: 1, // π+ (charged Pion)
        displayMode: 'symbol',
    },
    parameters: {
        docs: {
            description: {
                story: 'UIMesonTable component displaying all 25 mesons in a 4×7 grid organized by families. Use the Controls tab to switch between interaction modes (clickable/only view), display modes (symbol/quarks), and change the active meson by primaryId.',
            },
        },
    },
};

