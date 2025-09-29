import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIPlayground } from '../../components/Playground/UIPlayground';

const meta: Meta<typeof UIPlayground> = {
    title: 'Playground/UIPlayground',
    component: UIPlayground,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'UIPlayground component contains the playground circle and shadow effects. Should be used as a child of UISurface component.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        diameter: {
            control: { type: 'number', min: 100, max: 800, step: 50 },
            description: 'Playground diameter in pixels (creates a square container)',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class name',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        diameter: 400,
    },
};