import React from 'react';
import styles from './UIBadge.module.css';

export interface UIBadgeProps {
    /** Text content to display */
    children: React.ReactNode;
    /** Text color variant */
    color?: 'primary' | 'secondary' | 'accent';
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Optional CSS class name */
    className?: string;
    /** Optional click handler */
    onClick?: () => void;
    /** Whether the badge is interactive (clickable) */
    interactive?: boolean;
}

export function UIBadge({
    children,
    color = 'primary',
    align = 'left',
    className = '',
    onClick,
    interactive = false
}: UIBadgeProps) {
    // Build CSS classes
    const cssClasses = [
        styles.badge,
        styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
        styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
        interactive ? styles.interactive : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <span
            className={cssClasses}
            onClick={interactive ? onClick : undefined}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
        >
            {children}
        </span>
    );
}
