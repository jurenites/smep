import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import styles from './UIPlaygroundSurface.module.css';

interface UIPlaygroundSurfaceProps {
    width: number;
    height: number;
    children?: React.ReactNode;
    onMouseMove?: (event: React.MouseEvent) => void;
    onMouseDown?: (event: React.MouseEvent) => void;
    onMouseUp?: (event: React.MouseEvent) => void;
}

export function UIPlaygroundSurface({
    width,
    height,
    children,
    onMouseMove,
    onMouseDown,
    onMouseUp
}: UIPlaygroundSurfaceProps) {
    const colors = TOKENS.colors;
    const sizes = TOKENS.sizes;

    // Calculate playground circle (centered)
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - sizes.GAP_SMALL; // 2px margin

    return (
        <div
            className={styles.container}
            style={{
                width,
                height,
                background: `radial-gradient(circle at top left, ${colors.darkgray} 0%, ${colors.black} 100%)`,
            }}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            data-testid="uiplaygroundsurface"
        >
            {/* Playground circle */}
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                className={styles.backgroundSvg}
            >
                {/* Background circle */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill={colors.black}
                    stroke={colors.white}
                    strokeWidth={sizes.LINE}
                />

                {/* Bottom blur effect */}
                <defs>
                    <filter id="blur">
                        <feGaussianBlur stdDeviation={sizes.BLUR_PLAYGROUND} />
                    </filter>
                </defs>

                {/* Bottom half blur */}
                <circle
                    cx={centerX}
                    cy={centerY + radius / 2}
                    r={radius / 2}
                    fill={colors.white}
                    opacity={0.1}
                    filter="url(#blur)"
                />
            </svg>

            {/* Content overlay */}
            <div
                className={styles.contentOverlay}
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