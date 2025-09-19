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
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'accent'],
            description: 'Text color variant',
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Text alignment',
        },
        interactive: {
            control: 'boolean',
            description: 'Whether the badge is interactive (clickable)',
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
        children: 'Badge',
        color: 'primary',
        align: 'left',
        interactive: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UIBadge component with digitSmall font, dark background, and primary color.',
            },
        },
    },
};
