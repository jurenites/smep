import type { Meta, StoryObj } from '@storybook/react';
import { UIPeriodicTableBlocks } from '../../components/Paginators/UIPeriodicTableBlocks';

const meta: Meta<typeof UIPeriodicTableBlocks> = {
    title: 'Paginators/UIPeriodicTableBlocks',
    component: UIPeriodicTableBlocks,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        viewMode: {
            control: 'select',
            options: ['long', 'short'],
            description: 'View mode for the periodic table layout',
        },
        interactionMode: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Interaction mode - clickable shows UICards, only view shows UISquares',
        },
        activeIndex: {
            control: { type: 'number', min: 1, max: 118, step: 1 },
            description: 'Active atomic number (1-based) to highlight',
        },
        onPageChange: {
            action: 'page changed',
            description: 'Callback when page/position changes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing the periodic table blocks component
export const Default: Story = {
    args: {
        viewMode: 'long',
        interactionMode: 'clickable',
        activeIndex: 6, // Carbon
    },
    parameters: {
        docs: {
            description: {
                story: 'UIPeriodicTableBlocks component displaying the periodic table in blocks. Use the Controls tab to switch between view modes (long/short), interaction modes (clickable/only view), and change the active element by atomic number.',
            },
        },
    },
};
