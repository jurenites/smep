import type { Meta, StoryObj } from '@storybook/react-vite';
import { UILabel } from '../../components/Primitives/UILabel';

// Direct font loading for Storybook
const load4PixelFont = async () => {
    try {
        console.log('Loading 4pixel font directly...');
        const fontFace = new FontFace('4pixel', 'url(/assets/fonts/4pixel.woff) format("woff")');
        await fontFace.load();
        document.fonts.add(fontFace);
        console.log('4pixel font loaded successfully');
    } catch (error) {
        console.error('Failed to load 4pixel font:', error);
    }
};

// Load font when module loads
load4PixelFont();

const meta: Meta<typeof UILabel> = {
    title: 'Primitives/UILabel',
    component: UILabel,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        fontVariant: {
            control: 'select',
            options: ['title', 'body', 'digitBig', 'digitSmall', 'code'],
            description: 'Font variant to use for the text',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'accent', 'white', 'black'],
            description: 'Text color variant',
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Text alignment',
        },
        interactive: {
            control: 'boolean',
            description: 'Whether the label is interactive (clickable)',
        },
        children: {
            control: 'text',
            description: 'Text content to display',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        children: 'Hello World',
        fontVariant: 'body',
        color: 'primary',
        align: 'left',
        interactive: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UILabel component with body font and primary color.',
            },
        },
    },
};

// Font variants showcase
export const FontVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <UILabel fontVariant="title" color="white">Title Font - Roundabout</UILabel>
            <UILabel fontVariant="body" color="white">Body Font - Roundabout</UILabel>
            <UILabel fontVariant="digitBig" color="white">Digit Big Font - 4pixel</UILabel>
            <UILabel fontVariant="digitSmall" color="white">Digit Small Font - 4pixel</UILabel>
            <UILabel fontVariant="code" color="white">Code Font - Courier New</UILabel>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all available font variants. Title and Body use Roundabout font, Digit variants use 4pixel font, and Code uses Courier New.',
            },
        },
    },
};

// Color variants showcase
export const ColorVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start', backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
            <UILabel fontVariant="body" color="primary">Primary Color</UILabel>
            <UILabel fontVariant="body" color="secondary">Secondary Color</UILabel>
            <UILabel fontVariant="body" color="accent">Accent Color (Yolk)</UILabel>
            <UILabel fontVariant="body" color="white">White Color</UILabel>
            <UILabel fontVariant="body" color="black">Black Color</UILabel>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all available color variants on a dark background.',
            },
        },
    },
};

// Alignment showcase
export const Alignment: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px', border: '1px solid #666', padding: '20px' }}>
            <UILabel fontVariant="body" color="white" align="left">Left Aligned Text</UILabel>
            <UILabel fontVariant="body" color="white" align="center">Center Aligned Text</UILabel>
            <UILabel fontVariant="body" color="white" align="right">Right Aligned Text</UILabel>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of text alignment options.',
            },
        },
    },
};

// Interactive example
export const Interactive: Story = {
    args: {
        children: 'Click me!',
        fontVariant: 'body',
        color: 'accent',
        align: 'center',
        interactive: true,
        onClick: () => alert('UILabel clicked!'),
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive UILabel with click handler and hover effects.',
            },
        },
    },
};

// Two font combination example
export const TwoFontCombination: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <div>
                <UILabel fontVariant="title" color="white">Roundabout Title</UILabel>
                <UILabel fontVariant="digitBig" color="accent" style={{ marginLeft: '8px' }}>4pixel Digits</UILabel>
            </div>
            <div>
                <UILabel fontVariant="body" color="secondary">Roundabout Body Text</UILabel>
                <UILabel fontVariant="code" color="accent" style={{ marginLeft: '8px' }}>Courier Code</UILabel>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Example showing how to combine different font variants in the same line.',
            },
        },
    },
};
