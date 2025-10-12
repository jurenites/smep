import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { getNestedTranslation } from '../../../lib/data/translations';
import styles from './UIPlayground.module.css';

export interface UIPlaygroundProps {
    /** Playground diameter in pixels (creates a square container) */
    diameter: number;
    /** Child components to render on the playground */
    children?: React.ReactNode;
    /** Additional CSS class name */
    className?: string;
}

/**
 * UIPlayground Component
 * 
 * Contains only the playground circle and its shadow casting effects.
 * Should be used as a child of UISurface component.
 * 
 * @example
 * ```tsx
 * <UIPlayground diameter={600}>
 *   {particles}
 * </UIPlayground>
 * ```
 */
export function UIPlayground({
    diameter,
    children,
    className = ''
}: UIPlaygroundProps) {
    const sizes = TOKENS.sizes;

    // Calculate playground circle (centered) using token values
    // Since diameter creates a square container, width and height are the same
    const width = diameter;
    const height = diameter;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = diameter / 2 - sizes.PLAYGROUND_MARGIN;

    // Calculate shadow positioning using token values
    const shadowOffsetY = centerY + (radius * sizes.PLAYGROUND_SHADOW_OFFSET);
    const shadowRadius = radius * sizes.PLAYGROUND_SHADOW_OFFSET;

    // SVG viewBox for proper scaling
    const viewBox = `0 0 ${width} ${height}`;

    return (
        <div className={className}>
            {/* Playground circle with shadow effects */}
            <svg
                width={width}
                height={height}
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet"
                className={styles.playgroundSvg}
                role="img"
                aria-label={getNestedTranslation('accessibility.playgroundCircle')}
            >
                {/* Background circle */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="var(--color-black)"
                    stroke="var(--color-white)"
                    strokeWidth={sizes.LINE}
                />

                {/* Bottom blur effect */}
                <defs>
                    <filter id="playground-blur">
                        <feGaussianBlur stdDeviation={sizes.BLUR_PLAYGROUND} />
                    </filter>
                </defs>

                {/* Bottom half blur using token values */}
                <circle
                    cx={centerX}
                    cy={shadowOffsetY}
                    r={shadowRadius}
                    fill="var(--color-white)"
                    opacity={sizes.PLAYGROUND_SHADOW_OPACITY}
                    filter="url(#playground-blur)"
                />
            </svg>

            {/* Playground content overlay */}
            <div
                className={styles.playgroundContent}
                style={{
                    width,
                    height,
                }}
            >
                {children}
            </div>
        </div>
    );
}
