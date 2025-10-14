import React from 'react';
import styles from './UISkeletonRectangle.module.css';

export interface UISkeletonRectangleProps {
    /** Width in pixels */
    width: number;
    /** Height in pixels */
    height: number;
    /** Optional CSS class name */
    className?: string;
}

export function UISkeletonRectangle({
    width,
    height,
    className = ''
}: UISkeletonRectangleProps) {
    return (
        <div
            className={`${styles.skeletonRectangle} ${className}`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        />
    );
}
