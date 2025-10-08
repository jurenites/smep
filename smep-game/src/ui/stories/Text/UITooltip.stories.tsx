import type { Meta, StoryObj } from '@storybook/react';
import { UITooltip } from '../../components/Text/UITooltip';
import { UICard, UICardState } from '../../components/Cards/UICard';

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
                <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Hover me
                </button>
            </UITooltip>
        </div>
    ),
};

// With UICard
export const WithUICard: Story = {
    args: {
        content: '#6 | pos: (13, 1)',
        delay: 1000,
        position: 'top',
    },
    render: (args) => (
        <div style={{ padding: '100px' }}>
            <UITooltip {...args}>
                <UICard
                    textSymbol="C"
                    textNumber={6}
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    showParticle={true}
                    particleType="C"
                />
            </UITooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'UITooltip wrapping a UICard to show debug information like atomic number and position.',
            },
        },
    },
};

// Different positions
export const Positions: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            gap: '40px',
            padding: '150px',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <UITooltip content="Top position" position="top" delay={500}>
                <button style={{ padding: '10px 20px' }}>Top</button>
            </UITooltip>

            <UITooltip content="Bottom position" position="bottom" delay={500}>
                <button style={{ padding: '10px 20px' }}>Bottom</button>
            </UITooltip>

            <UITooltip content="Left position" position="left" delay={500}>
                <button style={{ padding: '10px 20px' }}>Left</button>
            </UITooltip>

            <UITooltip content="Right position" position="right" delay={500}>
                <button style={{ padding: '10px 20px' }}>Right</button>
            </UITooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'UITooltip in different positions: top, bottom, left, and right.',
            },
        },
    },
};

