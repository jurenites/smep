import type { Meta, StoryObj } from '@storybook/react';
import { UITooltip } from '../../components/Text/UITooltip';
import { UIButton, ButtonSize } from '../../components/Primitives/UIButton';

const meta: Meta<typeof UITooltip> = {
    title: 'Text/UITooltip',
    component: UITooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        content: {
            control: 'text',
            description: 'Tooltip content to display',
        },
        delay: {
            control: 'number',
            description: 'Delay before showing tooltip in milliseconds',
        },
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Tooltip position relative to trigger element',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        content: 'This is a tooltip',
        delay: 1000,
        position: 'top',
    },
    render: (args) => (
        <div style={{ padding: '100px' }}>
            <UITooltip {...args}>
                <UIButton
                    buttonText="Hover me"
                    buttonSize={ButtonSize.BIG}
                />
            </UITooltip>
        </div>
    ),
};
