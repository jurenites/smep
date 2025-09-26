import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import styles from './UICircle.module.css';

export type LogicalSize = 'dot' | 'small' | 'mini' | 'middle' | 'mega';

export interface UICircleProps {
    logicalSize: LogicalSize;
    actualSize?: number; // Override logical size with actual pixel size (up to 2 decimal places)
    brightness?: 'full' | 'dimmed'; // For dot size: full square vs dimmed vector circle
    color?: string; // HEX color code for the circle
    onClick?: () => void;
}

// Logical size to pixel diameter mapping using tokens
const LOGICAL_SIZE_MAP: Record<LogicalSize, number> = {
    dot: TOKENS.sizes.CIRCLE_DOT_1,      // 1px diameter
    small: TOKENS.sizes.CIRCLE_MICRO_4,  // 4px diameter
    mini: TOKENS.sizes.CIRCLE_MINI_6,    // 6px diameter
    middle: TOKENS.sizes.CIRCLE_MIDDLE_61, // 61px diameter
    mega: TOKENS.sizes.CIRCLE_MEGA_109   // 109px diameter
};

export function UICircle({
    logicalSize,
    actualSize,
    brightness = 'full',
    color = '#FFF', // Default color
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
        // TODO maybe morebeeficial to replace this DOM element sith SVG element, so we can have better control over the shape and be able to animate it with CSS animations.
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
