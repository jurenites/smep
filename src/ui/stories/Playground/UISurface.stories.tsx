import type { Meta, StoryObj } from '@storybook/react-vite';
import { UISurface } from '../../components/Playground/UISurface';

const meta: Meta<typeof UISurface> = {
    title: 'Playground/UISurface',
    component: UISurface,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        width: {
            control: { type: 'number', min: 100, max: 1200, step: 50 },
            description: 'Surface width in pixels',
        },
        height: {
            control: { type: 'number', min: 100, max: 800, step: 50 },
            description: 'Surface height in pixels',
        },
        onMouseMove: {
            action: 'mouseMove',
            description: 'Mouse move handler',
        },
        onMouseDown: {
            action: 'mouseDown',
            description: 'Mouse down handler',
        },
        onMouseUp: {
            action: 'mouseUp',
            description: 'Mouse up handler',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        width: 400,
        height: 800,
    },
};
