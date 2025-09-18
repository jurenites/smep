import type { Meta, StoryObj } from '@storybook/react-vite';
import { UICircle } from '../../components/Primitives/UICircle';

const meta: Meta<typeof UICircle> = {
    title: 'Primitives/UICircle',
    component: UICircle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        logicalSize: {
            control: 'select',
            options: ['dot', 'small', 'mini', 'middle', 'mega'],
            description: 'Logical size of the circle (dot: 1px, small: 4px, mini: 6px, middle: 61px, mega: 109px)',
        },
        actualSize: {
            control: { type: 'number', min: 0.1, max: 200, step: 0.01 },
            description: 'Override logical size with actual pixel size (up to 2 decimal places)',
        },
        brightness: {
            control: 'select',
            options: ['full', 'dimmed'],
            description: 'Brightness configuration for dot size (full: square pixel, dimmed: vector circle)',
            if: { arg: 'logicalSize', eq: 'dot' },
        },
        color: {
            control: 'color',
            description: 'HEX color code for the circle background',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler function',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        logicalSize: 'middle',
        brightness: 'full',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default circle with middle size (61px diameter).',
            },
        },
    },
};

