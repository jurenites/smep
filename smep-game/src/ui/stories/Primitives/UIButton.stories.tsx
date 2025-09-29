import type { Meta, StoryObj } from '@storybook/react';
import { UIButton } from '../../components/Primitives/UIButton';
import '../../tokens/tokens.css';

const meta: Meta<typeof UIButton> = {
    title: 'UI/UIButton',
    component: UIButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ padding: '20px' }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        children: {
            control: 'text',
            description: 'Button text content',
        },
        state: {
            control: 'select',
            options: ['enabled', 'disabled', 'hover', 'focused', 'pressed', 'progress', 'done', 'hold'],
            description: 'Button state',
        },
        buttonStyle: {
            control: 'select',
            options: ['filled', 'outlined'],
            description: 'Button style variant',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler',
        },
        progressDuration: {
            control: {
                type: 'number',
                min: 1000,
                max: 60000,
                step: 1000,
            },
            description: 'Progress duration in milliseconds',
        },
        holdDuration: {
            control: {
                type: 'number',
                min: 500,
                max: 10000,
                step: 500,
            },
            description: 'Hold duration in milliseconds',
        },
        onComplete: {
            action: 'completed',
            description: 'Completion handler',
        },
        focusable: {
            control: 'boolean',
            description: 'Whether the button is focusable',
        },
        loadingText: {
            control: 'text',
            description: 'Loading text to display during progress',
        },
        doneText: {
            control: 'text',
            description: 'Done text to display when completed',
        },
        holdText: {
            control: 'text',
            description: 'Hold text to display during hold state',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        children: 'Continue',
        state: 'enabled',
        buttonStyle: 'filled',
        progressDuration: 30000,
        holdDuration: 2000,
        loadingText: 'Loading...',
        doneText: 'Done',
        holdText: 'Hold',
        focusable: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default button with Continue text. Click to test interaction.',
            },
        },
    },
};

