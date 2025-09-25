import { UITab } from './UITab';
import { UITabState } from '../../../lib/types';
import styles from './UITabs.module.css';

export interface UITabItem {
    /** Unique identifier for the tab */
    id: string;
    /** Text content of the tab */
    text: string;
    /** Optional click handler for this specific tab */
    onClick?: () => void;
}

export interface UITabsProps {
    /** Array of tab items */
    tabs: UITabItem[];
    /** ID of the currently active tab */
    activeTabId: string;
    /** Optional CSS class name */
    className?: string;
    /** Optional click handler for tab selection */
    onTabChange?: (tabId: string) => void;
}

export function UITabs({
    tabs,
    activeTabId,
    className = '',
    onTabChange
}: UITabsProps) {
    // Validate that only one tab is active
    const activeTabs = tabs.filter(tab => tab.id === activeTabId);
    if (activeTabs.length === 0) {
        console.warn(`UITabs: No tab found with activeTabId "${activeTabId}"`);
    }
    if (activeTabs.length > 1) {
        console.warn(`UITabs: Multiple tabs found with activeTabId "${activeTabId}". Only one tab should be active.`);
    }

    const handleTabClick = (tabId: string) => {
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    return (
        <div className={`${styles.tabsContainer} ${className}`}>
            {tabs.map((tab, index) => {
                const isActive = tab.id === activeTabId;
                const isDisabled = false; // You can add disabled logic here if needed

                let state: UITabState;
                if (isActive) {
                    state = UITabState.ACTIVE;
                } else if (isDisabled) {
                    state = UITabState.DISABLED;
                } else {
                    state = UITabState.INACTIVE;
                }

                return (
                    <UITab
                        key={tab.id}
                        text={tab.text}
                        state={state}
                        onClick={() => handleTabClick(tab.id)}
                        className={index > 0 ? styles.connectedTab : ''}
                    />
                );
            })}
        </div>
    );
}
