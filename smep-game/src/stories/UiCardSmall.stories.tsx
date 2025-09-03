import type { Meta, StoryObj } from '@storybook/react';
import { UiCardSmall } from '../ui/primitives/UiCardSmall';
import { MultipleCardsTemplate } from './components/MultipleCardsTemplate';

const meta: Meta<typeof UiCardSmall> = {
    title: 'UI Primitives/UiCardSmall',
    component: UiCardSmall,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        symbol: {
            control: 'text',
            description: 'The symbol to display on the card',
        },
        isLoading: {
            control: 'boolean',
            description: 'Whether the card is in loading state',
        },
        isSelected: {
            control: 'boolean',
            description: 'Whether the card is selected',
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
    },
};

export const Selected: Story = {
    args: {
        symbol: 'B',
        isSelected: true,
    },
};

export const Loading: Story = {
    args: {
        symbol: 'C',
        isLoading: true,
    },
};

export const Interactive: Story = {
    args: {
        symbol: 'D',
        onClick: () => console.log('Card clicked!'),
    },
};

export const MultipleCards: Story = {
    render: () => <MultipleCardsTemplate />,
}; 