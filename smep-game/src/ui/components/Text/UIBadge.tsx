import React from 'react';
import styles from './UIBadge.module.css';

export type LabelColor = 'primary' | 'secondary' | 'accent';
export type BadgeColor = 'primary' | 'secondary' | 'accent';

export interface UIBadgeProps {
    /** Text content to display */
    children: React.ReactNode;
    /** Text color variant - what color the text appears on */
    labelColor?: LabelColor;
    /** Badge background color */
    badgeColor?: BadgeColor;
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Optional CSS class name */
    className?: string;
}

export function UIBadge({
    children,
    labelColor = 'primary',
    badgeColor = 'secondary',
    align = 'left',
    className = ''
}: UIBadgeProps) {
    // Validation: Prevent bad color combinations (same color for label and badge)
    const validateColorCombination = (label: LabelColor, badge: BadgeColor): void => {
        if (label === badge) {
            console.warn(
                `UIBadge: Invalid color combination detected: "${label}" text on "${badge}" background. ` +
                `This may result in poor contrast and accessibility issues. ` +
                `Consider using a different combination for better visibility.`
            );
        }
    };

    // Validate color combination
    validateColorCombination(labelColor, badgeColor);

    // Build CSS classes
    const cssClasses = [
        styles.badge,
        styles[`labelColor${labelColor.charAt(0).toUpperCase() + labelColor.slice(1)}`],
        styles[`badgeColor${badgeColor.charAt(0).toUpperCase() + badgeColor.slice(1)}`],
        styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={cssClasses}>
            {children}
        </span>
    );
}
