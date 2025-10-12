import React from 'react';
import styles from './UIBadge.module.css';
import type { ColorList } from './UILabel';

export interface UIBadgeProps {
    /** Text content to display */
    children: React.ReactNode;
    /** Text color variant - what color the text appears on */
    labelColor?: ColorList;
    /** Badge background color */
    badgeColor?: ColorList;
    /** Badge style variant */
    variant?: 'filled' | 'outline';
    /** Optional CSS class name */
    className?: string;
}

export function UIBadge({
    children,
    labelColor = 'white',
    badgeColor = 'gray',
    variant = 'filled',
    className = ''
}: UIBadgeProps) {
    // Validation: Prevent bad color combinations (same color for label and badge)
    const validateColorCombination = (label: ColorList, badge: ColorList): void => {
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
        styles[`variant-${variant}`],
        styles[`labelColor-${labelColor}`],
        styles[`badgeColor-${badgeColor}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={cssClasses}>
            {children}
        </span>
    );
}
