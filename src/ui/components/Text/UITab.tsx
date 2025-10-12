import { UILabel, type ColorList, ColorList as ColorListObject } from './UILabel';
import styles from './UITab.module.css';

export enum UITabState {
    ACTIVE = 'active', // Active tab
    INACTIVE = 'inactive', // Inactive but clickable tab
    DISABLED = 'disabled', // Disabled and not clickable tab
}

export interface UITabProps {
    /** Text content of the tab */
    tabText: string;
    /** Current state of the tab */
    tabState: UITabState;
    /** Optional click handler for interactive behavior */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
}

export function UITab({
    tabText,
    tabState,
    onClick,
    className = ''
}: UITabProps) {
    // Determine if tab is clickable based on tabState
    const isClickable = (tabState === UITabState.ACTIVE || tabState === UITabState.INACTIVE) && !!onClick;

    // Get appropriate CSS class based on state
    const getTabClassName = (): string => {
        const baseClass = (() => {
            switch (tabState) {
                case UITabState.ACTIVE:
                    return styles.tabActive;
                case UITabState.INACTIVE:
                    return styles.tabInactive;
                case UITabState.DISABLED:
                    return styles.tabDisabled;
                default:
                    return styles.tabInactive;
            }
        })();

        // Add interactive class if clickable
        if (isClickable) {
            return `${baseClass} ${styles.interactive}`;
        }

        return baseClass;
    };

    // Get appropriate UILabel color based on tabState
    const getLabelColor = (): ColorList => {
        switch (tabState) {
            case UITabState.ACTIVE:
                return ColorListObject.black; // Black text on white background
            case UITabState.INACTIVE:
                return ColorListObject.white; // White text on transparent background
            case UITabState.DISABLED:
                return ColorListObject.darkGray; // Gray text on transparent background
            default:
                return ColorListObject.white;
        }
    };

    return (
        <div
            className={`${styles.tab} ${getTabClassName()} ${className}`}
            onClick={isClickable ? onClick : undefined}
            data-state={tabState}
        >
            <UILabel
                children={tabText}
                fontVariant="body"
                color={getLabelColor()}
                className={styles.tabLabel}
            />
        </div>
    );
}
