import { UITabState } from '../../../lib/types';
import { UILabel } from './UILabel';
import styles from './UITab.module.css';

export interface UITabProps {
    /** Text content of the tab */
    text: string;
    /** Current state of the tab */
    state: UITabState;
    /** Optional click handler for interactive behavior */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
}

export function UITab({
    text,
    state,
    onClick,
    className = ''
}: UITabProps) {
    // Determine if tab is clickable based on state
    const isClickable = (state === UITabState.ACTIVE || state === UITabState.INACTIVE) && !!onClick;

    // Get appropriate CSS class based on state
    const getTabClassName = (): string => {
        const baseClass = (() => {
            switch (state) {
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

    // Get appropriate UILabel color based on state
    const getLabelColor = (): 'primary' | 'secondary' => {
        switch (state) {
            case UITabState.ACTIVE:
                return 'secondary'; // Black text on white background
            case UITabState.INACTIVE:
                return 'primary'; // White text on transparent background
            case UITabState.DISABLED:
                return 'secondary'; // Gray text on transparent background
            default:
                return 'primary';
        }
    };

    return (
        <div
            className={`${styles.tab} ${getTabClassName()} ${className}`}
            onClick={isClickable ? onClick : undefined}
            data-state={state}
        >
            <UILabel
                children={text}
                fontVariant="body"
                align="center"
                color={getLabelColor()}
                className={styles.tabLabel}
            />
        </div>
    );
}
