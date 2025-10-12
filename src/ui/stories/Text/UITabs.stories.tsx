import type { Meta, StoryObj } from '@storybook/react';
import { UITabs } from '../../components/Text/UITabs';
import { useState } from 'react';

const meta: Meta<typeof UITabs> = {
    title: 'UI/UITabs',
    component: UITabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        activeTabId: {
            control: { type: 'select' },
            options: ['particle', 'field1', 'field2', 'wave'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Example tabs data
const exampleTabs = [
    { id: 'particle', text: 'particle' },
    { id: 'field1', text: 'field' },
    { id: 'wave', text: 'wave' },
];

// Interactive component wrapper
const UITabsInteractive = () => {
    const [activeTab, setActiveTab] = useState('particle');

    return (
        <UITabs
            tabs={exampleTabs}
            activeTabId={activeTab}
            onTabChange={setActiveTab}
        />
    );
};

export const Default: Story = {
    render: () => <UITabsInteractive />,
};
