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
        children: (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                fontSize: '8px',
                lineHeight: '1'
            }}>
                <span style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    fontSize: '6px'
                }}>TL</span>
                <span>ON</span>
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Default mid-sized rectangle using MINI_CARD dimensions (31x31px) for consistent sizing across all instances.',
            },
        },
    },
};
