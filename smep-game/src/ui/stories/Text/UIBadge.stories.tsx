import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIBadge } from '../../components/Text/UIBadge';
import { COLOR_OPTIONS } from '../../components/Text/UILabel';
import '../../tokens/tokens.css';
import { autoLoad4PixelFont } from '../../utils/storybookFontLoader';

// Auto-load 4pixel font for Storybook
autoLoad4PixelFont();

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
            options: COLOR_OPTIONS,
            description: 'Text color variant. Avoid selecting the same color as badgeColor for better contrast.',
        },
        badgeColor: {
            control: 'select',
            options: COLOR_OPTIONS,
            description: 'Badge background color. Avoid selecting the same color as labelColor for better contrast.',
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
        labelColor: 'white',
        badgeColor: 'gray',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UIBadge component with digitSmall font and configurable label and badge colors. Choose from 5 color options (white, gray, dark-gray, yolk, black). The component will warn in console if same colors are selected for poor contrast.',
            },
        },
    },
};
