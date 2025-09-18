import React from 'react';
import styles from './UILabel.module.css';

export interface UILabelProps {
    /** Text content to display */
    children: React.ReactNode;
    /** Font variant to use */
    fontVariant?: 'title' | 'body' | 'digitBig' | 'digitSmall' | 'code';
    /** Text color variant */
    color?: 'primary' | 'secondary' | 'accent';
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Optional CSS class name */
    className?: string;
    /** Optional click handler */
    onClick?: () => void;
    /** Whether the label is interactive (clickable) */
    interactive?: boolean;
}

export function UILabel({
    children,
    fontVariant = 'body',
    color = 'primary',
    align = 'left',
    className = '',
    onClick,
    interactive = false
}: UILabelProps) {
    // Build CSS classes
    const cssClasses = [
        styles.label,
        styles[`font${fontVariant.charAt(0).toUpperCase() + fontVariant.slice(1)}`],
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
