import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { UIPeriodicTableBlocks } from '../../components/Paginators/UIPeriodicTableBlocks';

const meta: Meta<typeof UIPeriodicTableBlocks> = {
    title: 'UI/Pagination/UIPeriodicTableBlocks',
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
        cardSizeMode: {
            control: 'select',
            options: ['micro', 'small', 'mid'],
            description: 'Card size mode - micro shows UISquare (4px), small shows UICard small (31px), mid shows UICard mid (83px)',
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
        viewMode: 'short',
        cardSizeMode: 'small',
        activeIndex: 6, // Carbon
    },
    parameters: {
        docs: {
            description: {
                story: 'UIPeriodicTableBlocks component displaying the periodic table in blocks. Use the Controls tab to switch between view modes (long/short), card size modes (micro/small/mid), and change the active element by atomic number. Click on any element to select it.',
            },
        },
    },
    render: function Render(args) {
        const [activeIndex, setActiveIndex] = useState(args.activeIndex || 6);

        // Sync with control changes
        useEffect(() => {
            setActiveIndex(args.activeIndex || 6);
        }, [args.activeIndex]);

        const handlePageChange = (position: { x: number; y: number }, event: any) => {
            if (event?.atomicNumber) {
                setActiveIndex(event.atomicNumber);
            }
            args.onPageChange?.(position, event);
        };

        return (
            <UIPeriodicTableBlocks
                {...args}
                activeIndex={activeIndex}
                onPageChange={handlePageChange}
            />
        );
    },
};
