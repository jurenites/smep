import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIRuler } from '../../components/Elements/UIRuler';

const meta: Meta<typeof UIRuler> = {
    title: 'UI/UIRuler',
    component: UIRuler,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ 
                background: '#000', 
                padding: '20px',
                fontFamily: '4pixel, monospace'
            }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        scale: {
            control: { type: 'number', min: 0.001, max: 1000000, step: 0.1 },
            description: 'Scale factor to display',
        },
        width: {
            control: { type: 'number', min: 50, max: 400 },
            description: 'Width of the ruler',
        },

        position: {
            control: 'select',
            options: ['top', 'bottom'],
            description: 'Position of the ruler',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        scale: 1,
        width: 200,
        position: 'bottom',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default ruler with scale 1x, using 4pixel font for crisp digital display.',
            },
        },
    },
};
