import type { Meta, StoryObj } from '@storybook/react';
import { UITabs } from '../../components/Text/UITabs';
import { useState } from 'react';
import { MessageState } from '../../../lib/types';

const meta: Meta<typeof UITabs> = {
    title: 'UI/UITabs',
    component: UITabs,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# UITabs Component

A tab navigation component with support for glare animations to draw attention to unread content.

## Features

- **Glare Animation**: Subtle yellow gradient sweep effect for unread notifications
- **Smart Interaction**: Animation stops immediately when tab becomes active
- **State Management**: Integrates with read/unread message states
- **Accessibility**: Respects reduced motion preferences

## Glare Animation Behavior

- Shows on tabs with \`hasNotification: true\` and \`messageState: MessageState.UNREAD\`
- Stops immediately when tab becomes active (marked as read)
- Perfect for guiding users to new content or notifications
                `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        activeTabId: {
            control: { type: 'select' },
            options: ['particle', 'field1', 'wave'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Example tabs data
const exampleTabs = [
    { id: 'particle', text: 'particle' },
    { id: 'field1', text: 'field' },
    {
        id: 'wave',
        text: 'wave',
        hasNotification: true,
        messageState: MessageState.UNREAD // This will trigger the glare animation
    },
];

// Interactive component wrapper
const UITabsInteractive = () => {
    const [activeTab, setActiveTab] = useState('particle');
    const [waveMessageState, setWaveMessageState] = useState(MessageState.UNREAD);

    // Handle tab change - immediately mark as read when wave tab becomes active
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // If wave tab becomes active, immediately mark as read to stop glare animation
        if (tabId === 'wave') {
            setWaveMessageState(MessageState.READ);
        }
    };

    const tabsWithState = exampleTabs.map(tab => {
        if (tab.id === 'wave') {
            return {
                ...tab,
                messageState: waveMessageState,
                onClick: () => handleTabChange(tab.id)
            };
        }
        return {
            ...tab,
            onClick: () => handleTabChange(tab.id)
        };
    });

    return (

        <UITabs
            tabs={tabsWithState}
            activeTabId={activeTab}
            onTabChange={handleTabChange}
        />

    );
};

export const Default: Story = {
    render: () => <UITabsInteractive />,
    parameters: {
        docs: {
            description: {
                story: `
This example demonstrates the glare animation feature:

1. **Notice the Animation**: The "wave" tab has a subtle yellow glare effect sweeping from bottom to top
2. **Click to Stop**: Click on the "wave" tab to see the animation stop immediately when it becomes active
3. **Page Refresh**: Refresh the page to see the animation restart (state resets to unread)

The glare animation is designed to draw attention without being overwhelming, creating an intuitive user experience that guides players to new content.
                `
            }
        }
    }
};
