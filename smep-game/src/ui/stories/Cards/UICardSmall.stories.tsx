import type { Meta, StoryObj } from '@storybook/react';
import { UICardSmall } from '../../components/Cards/UICardSmall';
import { UICardState } from '../../../lib/types';

const meta: Meta<typeof UICardSmall> = {
    title: 'UI/UICardSmall',
    component: UICardSmall,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        symbol: {
            control: 'text',
            description: 'The symbol to display on the card',
        },
        state: {
            control: 'select',
            options: Object.values(UICardState),
            description: 'State of the card',
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when card is clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        symbol: 'A',
        onClick: () => console.log('Card clicked!'),
    },
}; 