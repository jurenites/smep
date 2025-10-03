import type { Meta, StoryObj } from '@storybook/react';
import { UIButton, ButtonStyle, ButtonSize } from '../../components/Primitives/UIButton';
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
            <div className="storybook-button-container">
                <Story />
            </div>
        ),
    ],
    argTypes: {
        buttonText: {
            control: 'text',
            description: 'Button text content',
        },
        buttonState: {
            control: 'select',
            options: ['progress', 'done', 'hold'],
            description: 'Button logical state (hold, progress, done)',
        },
        buttonStyle: {
            control: 'select',
            options: ['filled', 'outlined'],
            description: 'Button style variant',
        },
        buttonSize: {
            control: 'select',
            options: ['small', 'big'],
            description: 'Button size variant',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the button is disabled',
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
                min: 1000,
                max: 3000,
                step: 1000,
            },
            description: 'Hold duration in milliseconds',
        },
        onComplete: {
            action: 'completed',
            description: 'Completion handler',
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
        buttonStyle: ButtonStyle.FILLED,
        buttonSize: ButtonSize.BIG,
        isDisabled: false,
        progressDuration: 5000,
        holdDuration: 2000,
        buttonText: 'Continue',
        loadingText: 'Loading...',
        doneText: 'Done',
        holdText: 'Hold',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default button with Continue text. Click to test interaction. Hover, active, and focus states are handled by CSS.',
            },
        },
    },
};