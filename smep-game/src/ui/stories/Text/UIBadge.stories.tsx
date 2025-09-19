import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIBadge } from '../../components/Text/UIBadge';

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

const meta: Meta<typeof UIBadge> = {
    title: 'Text/UIBadge',
    component: UIBadge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        labelColor: {
            control: 'select',
            options: ['on-primary', 'on-secondary', 'on-accent'],
            description: 'Text color variant - what color the text appears on',
        },
        badgeColor: {
            control: 'select',
            options: ['primary', 'secondary'],
            description: 'Badge background color',
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Text alignment',
        },
        children: {
            control: 'text',
            description: 'Text content to display',
        },
        // Hide className from controls - internal styling only
        className: {
            table: { disable: true },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        children: 'Badge',
        labelColor: 'on-primary',
        badgeColor: 'primary',
        align: 'left',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UIBadge component with digitSmall font and configurable label and badge colors.',
            },
        },
    },
};

// Color combination examples
export const OnPrimaryBackground: Story = {
    args: {
        children: 'Primary',
        labelColor: 'on-primary',
        badgeColor: 'primary',
        align: 'center',
    },
    parameters: {
        docs: {
            description: {
                story: 'Badge with on-primary text on primary background (black text on white background).',
            },
        },
    },
};

export const OnSecondaryBackground: Story = {
    args: {
        children: 'Secondary',
        labelColor: 'on-secondary',
        badgeColor: 'secondary',
        align: 'center',
    },
    parameters: {
        docs: {
            description: {
                story: 'Badge with on-secondary text on secondary background (white text on gray background).',
            },
        },
    },
};

export const OnAccentBackground: Story = {
    args: {
        children: 'Accent',
        labelColor: 'on-accent',
        badgeColor: 'primary',
        align: 'center',
    },
    parameters: {
        docs: {
            description: {
                story: 'Badge with on-accent text on primary background (black text on white background).',
            },
        },
    },
};
