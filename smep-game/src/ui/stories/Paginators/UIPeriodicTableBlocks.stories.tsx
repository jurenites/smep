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

// Default story - Only view mode
export const OnlyView: Story = {
    args: {
        viewMode: 'long',
        interactionMode: 'only view',
        activeIndex: 1,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UIPeriodicTableBlocks in "only view" mode showing UISquares with standard periodic table layout.',
            },
        },
    },
};

// Clickable mode story - shows UICards
export const Clickable: Story = {
    args: {
        viewMode: 'long',
        interactionMode: 'clickable',
        activeIndex: 6, // Carbon
    },
    parameters: {
        docs: {
            description: {
                story: 'UIPeriodicTableBlocks in "clickable" mode showing UICards with atomic particle data. Each card displays the element symbol and can be clicked to navigate to detail views.',
            },
        },
    },
};

// Short view mode with clickable
export const ClickableShortView: Story = {
    args: {
        viewMode: 'short',
        interactionMode: 'clickable',
        activeIndex: 26, // Iron
    },
    parameters: {
        docs: {
            description: {
                story: 'UIPeriodicTableBlocks in "clickable" mode with short view layout. F-block elements are positioned below the main row.',
            },
        },
    },
};

// Interactive demo with different active elements
export const InteractiveDemo: Story = {
    args: {
        viewMode: 'long',
        interactionMode: 'clickable',
        activeIndex: 1, // Start with Hydrogen
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo showing clickable UICards. Use the Controls tab to change the active element and see how the highlighting works.',
            },
        },
    },
};
