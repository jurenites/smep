import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIRectangleMid } from '../../components/Primitives/UIRectangleMid';
import { UISquareState } from '../../../lib/types';

const meta: Meta<typeof UIRectangleMid> = {
    title: 'Primitives/UIRectangleMid',
    component: UIRectangleMid,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A consistent mid-sized rectangle component (31x31px) designed as a core building block for multiple entities. Focuses on content presentation with icons, text, and flexible positioning.',
            },
        },
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
            description: 'Click handler for interactive behavior',
        },
        children: {
            control: 'text',
            description: 'Content to render inside the rectangle (icons, text, etc.)',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
        'data-testid': {
            control: 'text',
            description: 'Test identifier for automated testing',
        },
    },
    decorators: [
        (Story) => (
            <div style={{
                background: '#000',
                padding: '40px',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with standard MINI_CARD dimensions
export const Default: Story = {
    args: {
        state: UISquareState.ACTIVE,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default mid-sized rectangle using MINI_CARD dimensions (31x31px) for consistent sizing across all instances.',
            },
        },
    },
};

// With complex content layout
export const WithComplexContent: Story = {
    args: {
        state: UISquareState.ACTIVE,
        children: (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                fontSize: '8px',
                lineHeight: '1'
            }}>
                <span>ON</span>
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Rectangle containing icon + text layout, showing flexible content positioning.',
            },
        },
    },
};

// With positioned content
export const WithPositionedContent: Story = {
    args: {
        state: UISquareState.ACTIVE,
        children: (
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <span style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    fontSize: '6px'
                }}>TL</span>
                <span style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    fontSize: '6px'
                }}>BR</span>
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Rectangle with absolutely positioned content, demonstrating advanced layout capabilities.',
            },
        },
    },
};


// State transitions showcase
export const StateTransitions: Story = {
    render: () => {
        const [currentState, setCurrentState] = React.useState<UISquareState>(UISquareState.ACTIVE);

        const cycleState = () => {
            const states = Object.values(UISquareState);
            const currentIndex = states.indexOf(currentState);
            const nextIndex = (currentIndex + 1) % states.length;
            setCurrentState(states[nextIndex]);
        };

        return (
            <div style={{ textAlign: 'center' }}>
                <UIRectangleMid
                    state={currentState}
                    onClick={cycleState}
                    children={`${currentState.charAt(0).toUpperCase()}`}
                />
                <div style={{ marginTop: '10px', fontSize: '10px', color: '#fff' }}>
                    Click to cycle through states
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demonstration of all three states with smooth transitions.',
            },
        },
    },
};
