import React from 'react';
import { UILabel } from './UILabel';
import styles from './UITitleWrapper.module.css';

export interface UITitleWrapperProps {
    /** Text content to display */
    children: React.ReactNode;
    /** Optional CSS class name for additional styling */
    className?: string;
    /** Label font variant - limited to 'title' or 'body' */
    labelFontVariant?: 'title' | 'body';
}

export function UITitleWrapper({
    children,
    className = '',
    labelFontVariant = 'title'
}: UITitleWrapperProps) {

    return (
        <UILabel className={`${styles.container} ${className}`} fontVariant={labelFontVariant} color="gray">
            {children}
        </UILabel>
    );
}
