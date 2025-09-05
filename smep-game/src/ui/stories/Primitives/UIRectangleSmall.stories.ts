import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIRectangleSmall } from '../../components/Primitives/UIRectangleSmall';
import { UISquareState } from '../../../lib/types';

const meta: Meta<typeof UIRectangleSmall> = {
    title: 'Primitives/UIRectangleSmall',
    component: UIRectangleSmall,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            control: 'select',
            options: [UISquareState.ACTIVE, UISquareState.INACTIVE, UISquareState.DISABLED],
            description: 'Visual state of the rectangle',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler for the rectangle',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        state: UISquareState.INACTIVE,
        onClick: () => console.log('Rectangle clicked!'),
    },
};
