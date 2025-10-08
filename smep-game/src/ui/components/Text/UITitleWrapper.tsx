import React from 'react';
import { UILabel, FONT_OPTIONS } from './UILabel';
import styles from './UITitleWrapper.module.css';

// Define font variant type locally
type FontVariant = typeof FONT_OPTIONS[number];

export interface UITitleWrapperProps {
    /** Text content to display */
    children: React.ReactNode;
    /** Optional CSS class name for additional styling */
    className?: string;
    /** Font variant to use */
    fontVariant?: FontVariant;
}

export function UITitleWrapper({
    children,
    className = '',
    fontVariant = 'title'
}: UITitleWrapperProps) {

    return (
        <UILabel className={`${styles.container} ${className}`} fontVariant={fontVariant} color="gray">
            {children}
        </UILabel>
    );
}
