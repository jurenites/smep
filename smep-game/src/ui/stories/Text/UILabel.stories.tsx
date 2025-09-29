import type { Meta, StoryObj } from '@storybook/react-vite';
import { UILabel } from '../../components/Text/UILabel';
import '../../tokens/tokens.css';
import { COLOR_OPTIONS, FONT_OPTIONS } from '../../components/Text/UILabel';
import { autoLoad4PixelFont } from '../../utils/storybookFontLoader';

// Auto-load 4pixel font for Storybook
autoLoad4PixelFont();

const meta: Meta<typeof UILabel> = {
    title: 'Text/UILabel',
    component: UILabel,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        fontVariant: {
            control: 'select',
            options: FONT_OPTIONS,
            description: 'Font variant to use for the text',
        },
        color: {
            control: 'select',
            options: COLOR_OPTIONS,
            description: 'Text color variant',
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
        color: 'white',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UILabel component with body font and white color.',
            },
        },
    },
};
