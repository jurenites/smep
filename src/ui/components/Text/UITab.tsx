import { UILabel, type ColorList, ColorList as ColorListObject } from './UILabel';
import { UIGlareAnimation } from '../Primitives/UIGlareAnimation';
import { MessageState } from '../../../lib/types';
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
    /** Whether this tab has an unread notification */
    hasNotification?: boolean;
    /** Message state for notification system */
    messageState?: MessageState;
    /** Optional additional CSS class name */
    className?: string;
}

export function UITab({
    tabText,
    tabState,
    onClick,
    hasNotification = false,
    messageState = MessageState.READ,
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

    // Determine if glare animation should be active
    const shouldShowGlare = hasNotification && messageState === MessageState.UNREAD;
    const isGlarePaused = tabState === UITabState.ACTIVE;
    const isGlareDisabled = messageState === MessageState.READ;

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
            <UIGlareAnimation
                isActive={shouldShowGlare}
                isPaused={isGlarePaused}
                isDisabled={isGlareDisabled}
                speed="normal"
            />
        </div>
    );
}
