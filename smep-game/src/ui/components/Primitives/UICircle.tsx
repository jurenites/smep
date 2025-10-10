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
    // Sphere rendering options
    sphereMode?: boolean; // Enable 3D sphere effect with radial gradient
    highlightOffsetX?: number; // Highlight position offset X (percentage: -1 to 1, default: -0.3 for top-left)
    highlightOffsetY?: number; // Highlight position offset Y (percentage: -1 to 1, default: -0.3 for top-left)
    invertGradient?: boolean; // Invert gradient colors (dark center to light edges) for antimatter
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
    y,
    sphereMode = false,
    highlightOffsetX = -0.3, // Default: top-left
    highlightOffsetY = -0.3,  // Default: top-left
    invertGradient = false // Default: normal gradient (light center to dark edges)
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

    // Calculate highlight position for sphere mode
    // Convert offset percentages to actual coordinates within the circle
    const highlightCx = radius + (highlightOffsetX * radius);
    const highlightCy = radius + (highlightOffsetY * radius);

    // Reason: Highlight radius calculation for future use if needed for dynamic sizing
    // Currently using percentage-based radial gradient (r="80%")
    // TODO: check if we need to use this ?
    // const highlightRadius = radius * 0.4; // Highlight covers 40% of radius

    // Generate unique gradient ID based on position and size (not color, as it may be a CSS variable)
    // Use a simple unique ID that doesn't include the color value
    const gradientId = `sphere-gradient-${Math.round(highlightCx * 100)}-${Math.round(highlightCy * 100)}-${Math.round(roundedSize * 100)}`;

    return (
        <svg
            className={cssClasses}
            style={svgContainerStyles}
            onClick={onClick}
            data-logical-size={logicalSize}
            data-actual-size={actualSize}
            data-brightness={brightness}
            data-particle-core={dataParticleCore}
            data-sphere-mode={sphereMode}
            viewBox={`0 0 ${roundedSize} ${roundedSize}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {sphereMode && (
                <defs>
                    <radialGradient
                        id={gradientId}
                        cx={`${(highlightCx / roundedSize) * 100}%`}
                        cy={`${(highlightCy / roundedSize) * 100}%`}
                        r="80%"
                        fx={`${(highlightCx / roundedSize) * 100}%`}
                        fy={`${(highlightCy / roundedSize) * 100}%`}
                    >
                        {invertGradient ? (
                            // Inverted gradient for antimatter: very dark center → bright edges
                            // Reason: More pronounced gradient for better visibility at small sizes (6px quarks)
                            <>
                                <stop offset="0%" stopColor="#000000" />
                                <stop offset="30%" stopColor="#1a1a1a" />
                                <stop offset="60%" stopColor={color} />
                                <stop offset="85%" stopColor="#E0E0E0" />
                                <stop offset="100%" stopColor="#FFFFFF" />
                            </>
                        ) : (
                            // Normal gradient for matter: bright center → very dark edges
                            <>
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="15%" stopColor="#E0E0E0" />
                                <stop offset="40%" stopColor={color} />
                                <stop offset="70%" stopColor="#1a1a1a" />
                                <stop offset="100%" stopColor="#000000" />
                            </>
                        )}
                    </radialGradient>
                </defs>
            )}
            <circle
                cx={radius}
                cy={radius}
                r={hasStroke ? radius - strokeWidth / 2 : radius}
                fill={sphereMode ? `url(#${gradientId})` : color}
                stroke={hasStroke ? 'var(--color-white)' : 'none'}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
