import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIRectangleBig } from '../../components/Primitives/UIRectangleBig';
import { UISquareState } from '../../../lib/types';

const meta: Meta<typeof UIRectangleBig> = {
    title: 'Primitives/UIRectangleBig',
    component: UIRectangleBig,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            control: 'select',
            options: Object.values(UISquareState),
            description: 'Current state of the rectangle',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler function',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        state: UISquareState.ACTIVE,
    },
};
