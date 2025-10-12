import type { Meta, StoryObj } from '@storybook/react';
import { UITitleWrapper } from '../../components/Text/UITitleWrapper';
import { FONT_OPTIONS } from '../../components/Text/UILabel';

const meta: Meta<typeof UITitleWrapper> = {
    title: 'Text/UITitleWrapper',
    component: UITitleWrapper,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Text content to display in the title wrapper',
        },
        className: {
            control: 'text',
            description: 'Optional CSS class name for additional styling',
        },
        fontVariant: {
            control: 'select',
            options: FONT_OPTIONS,
            description: 'Font variant to use for the title text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        children: 'My Title',
    },
};
