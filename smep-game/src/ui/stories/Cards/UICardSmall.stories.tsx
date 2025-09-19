import type { Meta, StoryObj } from '@storybook/react';
import { UICardSmall } from '../../components/Cards/UICardSmall';

const meta: Meta<typeof UICardSmall> = {
    title: 'UI/Cards/UICardSmall',
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
            options: ['normal', 'selected', 'loading'],
            description: 'State of the card',
        },
        // Label configuration options
        labelFontVariant: {
            control: 'select',
            options: ['title', 'body', 'digitBig', 'digitSmall', 'code'],
            description: 'Font variant for the label text',
        },
        labelColor: {
            control: 'select',
            options: ['primary', 'secondary', 'accent'],
            description: 'Color variant for the label text',
        },
        labelAlign: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Text alignment for the label',
        },
        labelClassName: {
            control: 'text',
            description: 'Additional CSS class for the label',
        },
        labelInteractive: {
            control: 'boolean',
            description: 'Whether the label is interactive (clickable)',
        },
        // UICircle configuration options
        showCircle: {
            control: 'boolean',
            description: 'Whether to show a UICircle above the label',
        },
        circleLogicalSize: {
            control: 'select',
            options: ['dot', 'small', 'mini', 'middle', 'mega'],
            description: 'Logical size of the circle above the label',
        },
        circleActualSizeInner: {
            control: { type: 'number', min: 0.1, max: 50, step: 0.01 },
            description: 'Custom size override for the inner circle (up to 2 decimal places)',
        },
        circleColor: {
            control: 'color',
            description: 'Color of the circle above the label',
        },
        circleBrightness: {
            control: 'select',
            options: ['full', 'dimmed'],
            description: 'Brightness configuration for the circle',
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when card is clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - UICardSmall with circle example
export const Default: Story = {
    args: {
        symbol: 'H',
        state: 'normal',
        labelFontVariant: 'body',
        labelColor: 'primary',
        labelAlign: 'center',
        labelInteractive: false,
        showCircle: true,
        circleLogicalSize: 'small',
        circleActualSizeInner: undefined,
        circleColor: '#F8E71C',
        circleBrightness: 'full',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UICardSmall component with UICircle above the label. Use the Controls tab to configure all properties.',
            },
        },
    },
}; 