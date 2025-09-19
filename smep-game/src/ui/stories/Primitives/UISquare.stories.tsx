import type { Meta, StoryObj } from '@storybook/react-vite';
import { UISquare } from '../../components/Primitives/UISquare';

const meta: Meta<typeof UISquare> = {
    title: 'Primitives/UISquare',
    component: UISquare,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            control: 'select',
            options: ['active', 'inactive', 'disabled'],
            description: 'Current state of the square',
        },
        logicalSize: {
            control: 'select',
            options: ['small', 'mid'],
            description: 'Logical size of the square (small: 4px, mid: 31px)',
        },
        actualSize: {
            control: { type: 'number', min: 1, max: 100, step: 0.01 },
            description: 'Override logical size with actual pixel size (up to 2 decimal places)',
        },
        active: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Display mode for the square',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler function',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - matches UICircle pattern with size as parameter
export const Default: Story = {
    args: {
        state: 'active',
        logicalSize: 'mid',
        active: 'clickable',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default square with mid size (31px × 31px). Use the Controls tab to change size, state, and other properties.',
            },
        },
    },
};
