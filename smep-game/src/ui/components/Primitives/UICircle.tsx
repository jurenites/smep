import React from 'react';
import styles from './UICircle.module.css';

export type LogicalSize = 'dot' | 'small' | 'mini' | 'middle' | 'mega';

export interface UICircleProps {
    logicalSize: LogicalSize;
    actualSize?: number; // Override logical size with actual pixel size (up to 2 decimal places)
    brightness?: 'full' | 'dimmed'; // For dot size: full square vs dimmed vector circle
    color?: string; // HEX color code for the circle
    onClick?: () => void;
}

// Logical size to pixel diameter mapping
const LOGICAL_SIZE_MAP: Record<LogicalSize, number> = {
    dot: 1,      // 1px diameter
    small: 4,    // 4px diameter
    mini: 6,     // 6px diameter
    middle: 61,  // 61px diameter
    mega: 109    // 109px diameter
};

export function UICircle({
    logicalSize,
    actualSize,
    brightness = 'full',
    color = '#3B82F6', // Default blue color
    onClick
}: UICircleProps) {
    // Calculate final size: use actualSize if provided, otherwise use logical size
    const finalSize = actualSize !== undefined ? actualSize : LOGICAL_SIZE_MAP[logicalSize];

    // Round to 2 decimal places for actualSize
    const roundedSize = actualSize !== undefined ? Math.round(finalSize * 100) / 100 : finalSize;

    // For dot size, determine if we should use special rendering
    const isDot = logicalSize === 'dot' && actualSize === undefined;
    const useSpecialDot = isDot && brightness === 'dimmed';

    // Create dynamic styles
    const dynamicStyles: React.CSSProperties = {
        width: `${roundedSize}px`,
        height: `${roundedSize}px`,
        borderRadius: '50%', // Always circular
        backgroundColor: color,
    };

    // CSS classes
    const cssClasses = [
        styles.circle,
        styles[`size-${logicalSize}`],
        useSpecialDot ? styles.dotDimmed : '',
        onClick ? styles.clickable : ''
    ].filter(Boolean).join(' ');

    return (
        <div
            className={cssClasses}
            style={dynamicStyles}
            onClick={onClick}
            data-logical-size={logicalSize}
            data-actual-size={actualSize}
            data-brightness={brightness}
        />
    );
}
