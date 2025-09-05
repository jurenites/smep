import type { Meta, StoryObj } from '@storybook/react-vite';
import { UISquareSmall } from '../../components/Primitives/UISquareSmall';
import { UISquareState } from '../../../lib/types';

const meta: Meta<typeof UISquareSmall> = {
    title: 'Primitives/UISquareSmall',
    component: UISquareSmall,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            control: 'select',
            options: [UISquareState.ACTIVE, UISquareState.INACTIVE, UISquareState.DISABLED],
            description: 'State of the square',
        },
        active: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Display mode - clickable (31x31px with hover) or only view (4x4px without hover)',
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when square is clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        state: UISquareState.INACTIVE,
        active: 'clickable',
    },
};
