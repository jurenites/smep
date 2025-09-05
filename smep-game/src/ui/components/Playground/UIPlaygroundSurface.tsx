import React from 'react';
import { TOKENS } from '../../tokens/tokens';

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
    const c = TOKENS.colors;
    const s = TOKENS.sizes;

    // Calculate playground circle (centered)
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - s.HUD_PADDING; // 20px margin

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                background: `radial-gradient(circle at top left, ${c.darkgray} 0%, ${c.black} 100%)`,
                overflow: 'hidden',
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
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            >
                {/* Background circle */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill={c.black}
                    stroke={c.white}
                    strokeWidth={s.STROKE}
                />

                {/* Bottom blur effect */}
                <defs>
                    <filter id="blur">
                        <feGaussianBlur stdDeviation={s.BLUR_PLAYGROUND} />
                    </filter>
                </defs>

                {/* Bottom half blur */}
                <circle
                    cx={centerX}
                    cy={centerY + radius / 2}
                    r={radius / 2}
                    fill={c.white}
                    opacity={0.1}
                    filter="url(#blur)"
                />
            </svg>

            {/* Content overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width,
                    height,
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            >
                {children}
            </div>
        </div>
    );
} 