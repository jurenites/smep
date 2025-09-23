import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIBadge, type LabelColor, type BadgeColor } from '../../components/Text/UIBadge';

// Direct font loading for Storybook
const load4PixelFont = async () => {
    try {
        // console.log('Loading 4pixel font directly...');
        const fontFace = new FontFace('4pixel', 'url(/assets/fonts/4pixel.woff) format("woff")');
        await fontFace.load();
        document.fonts.add(fontFace);
        // console.log('4pixel font loaded successfully');
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
            options: ['primary', 'secondary', 'accent'],
            description: 'Text color variant. Avoid selecting the same color as badgeColor for better contrast.',
        },
        badgeColor: {
            control: 'select',
            options: ['primary', 'secondary'],
            description: 'Badge background color. Avoid selecting the same color as labelColor for better contrast.',
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
        labelColor: 'secondary',
        badgeColor: 'primary',
        align: 'left',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UIBadge component with digitSmall font and configurable label and badge colors. Choose from 3 labelColor options (primary, secondary, accent) and 2 badgeColor options (primary, secondary). The component will warn in console if same colors are selected for poor contrast.',
            },
        },
    },
};

