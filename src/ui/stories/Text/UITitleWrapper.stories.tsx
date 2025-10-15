import type { Meta, StoryObj } from '@storybook/react';
import { UITitleWrapper } from '../../components/Text/UITitleWrapper';

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
        labelFontVariant: {
            control: 'select',
            options: ['title', 'body'],
            description: 'Label font variant - limited to title or body',
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
