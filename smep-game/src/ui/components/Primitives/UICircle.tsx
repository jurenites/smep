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
    className?: string; // Optional CSS class for additional styling
    'data-particle-core'?: string; // Data attribute for particle core identification
    // Position coordinates (center of the circle)
    x?: number; // X coordinate for center positioning
    y?: number; // Y coordinate for center positioning
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
    onClick,
    className,
    'data-particle-core': dataParticleCore,
    x,
    y
}: UICircleProps) {
    // Calculate final size: use actualSize if provided, otherwise use logical size
    const finalSize = actualSize !== undefined ? actualSize : LOGICAL_SIZE_MAP[logicalSize];

    // Round to 2 decimal places for actualSize
    const roundedSize = actualSize !== undefined ? Math.round(finalSize * 100) / 100 : finalSize;

    // For dot size, determine if we should use special rendering
    const isDot = logicalSize === 'dot' && actualSize === undefined;
    const useSpecialDot = isDot && brightness === 'dimmed';

    // Calculate circle radius
    const radius = roundedSize / 2;

    // Create dynamic styles for SVG container
    const svgContainerStyles: React.CSSProperties = {
        width: `${roundedSize}px`,
        height: `${roundedSize}px`,
        // Position coordinates (center-based positioning)
        ...(x !== undefined && y !== undefined && {
            position: 'absolute',
            left: `${x - roundedSize / 2}px`, // Center the circle on x coordinate
            top: `${y - roundedSize / 2}px`,  // Center the circle on y coordinate
        }),
    };

    // CSS classes
    const cssClasses = [
        styles.circle,
        styles[`size-${logicalSize}`],
        useSpecialDot ? styles.dotDimmed : '',
        className
    ].filter(Boolean).join(' ');

    /*
    // Determine stroke based on size (for visual consistency with previous implementation)
    const getStrokeWidth = (): number => {
        if (logicalSize === 'dot') return 0;
        if (logicalSize === 'middle') return 2;
        if (logicalSize === 'mega') return 0;
        return 1; // small and mini
    };*/

    const strokeWidth = 0;//getStrokeWidth();
    const hasStroke = strokeWidth > 0;

    return (
        <svg
            className={cssClasses}
            style={svgContainerStyles}
            onClick={onClick}
            data-logical-size={logicalSize}
            data-actual-size={actualSize}
            data-brightness={brightness}
            data-particle-core={dataParticleCore}
            viewBox={`0 0 ${roundedSize} ${roundedSize}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx={radius}
                cy={radius}
                r={hasStroke ? radius - strokeWidth / 2 : radius}
                fill={color}
                stroke={hasStroke ? 'var(--color-white)' : 'none'}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
