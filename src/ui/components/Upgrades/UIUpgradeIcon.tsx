import React from 'react';
import { TOKENS } from '../../tokens/tokens';

export interface UIUpgradeIconProps {
    /** Stroke color for the icon */
    color?: string;
    /** Optional CSS class name */
    className?: string;
}

/**
 * UIUpgradeIcon - Placeholder icon for upgrades
 * 
 * Displays a 24px × 24px SVG with:
 * - 16px diameter circle (centered)
 * - 14px edge square (centered)
 * - 1px dashed stroke (2px dash, 2px gap)
 */
export function UIUpgradeIcon({
    color = TOKENS.colors.white,
    className = ''
}: UIUpgradeIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={className}
            style={{ flexShrink: 0 }}
        >
            {/* 16px diameter circle, centered at (12, 12) with radius 8 */}
            <circle
                cx="12"
                cy="12"
                r="8"
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeDasharray="2 2"
            />

            {/* 14px edge square, centered at (12, 12) */}
            {/* Square from (5, 5) to (19, 19) = 14px edge */}
            <rect
                x="5"
                y="5"
                width="14"
                height="14"
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeDasharray="2 2"
            />
        </svg>
    );
}

