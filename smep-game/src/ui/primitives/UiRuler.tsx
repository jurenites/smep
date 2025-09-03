import React from 'react';
import { TOKENS } from '../tokens/tokens';
import styles from './UiRuler.module.css';

interface UiRulerProps {
    scale: number;
    width: number;
    height: number;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export function UiRuler({
    scale,
    width,
    height,
    position = 'bottom'
}: UiRulerProps) {
    const s = TOKENS.sizes;
    const c = TOKENS.colors;
    const fs = TOKENS.fontSizes;

    // Calculate ruler measurements based on scale
    const getScaleText = (scale: number) => {
        if (scale >= 1e9) return `${(scale / 1e9).toFixed(1)}G`;
        if (scale >= 1e6) return `${(scale / 1e6).toFixed(1)}M`;
        if (scale >= 1e3) return `${(scale / 1e3).toFixed(1)}K`;
        if (scale >= 1) return scale.toFixed(1);
        if (scale >= 1e-3) return `${(scale * 1e3).toFixed(1)}m`;
        if (scale >= 1e-6) return `${(scale * 1e6).toFixed(1)}μ`;
        if (scale >= 1e-9) return `${(scale * 1e9).toFixed(1)}n`;
        return `${(scale * 1e12).toFixed(1)}p`;
    };

    const rulerLength = position === 'top' || position === 'bottom' ? width : height;
    const rulerThickness = 20;

    return (
        <svg
            width={position === 'top' || position === 'bottom' ? width : rulerThickness}
            height={position === 'top' || position === 'bottom' ? rulerThickness : height}
        >
            {/* Ruler line */}
            <line
                x1={position === 'left' ? rulerThickness - 1 : 0}
                y1={position === 'top' ? rulerThickness - 1 : 0}
                x2={position === 'left' ? rulerThickness - 1 : rulerLength}
                y2={position === 'top' ? rulerThickness - 1 : 0}
                stroke={c.white}
                strokeWidth={s.STROKE}
            />

            {/* Scale text */}
            <text
                x={position === 'left' ? rulerThickness - 5 : 5}
                y={position === 'top' ? rulerThickness - 5 : 15}
                fill={c.white}
                fontSize={fs.small}
                fontFamily={TOKENS.fonts.DIGIT}
                className={styles.text}
            >
                {getScaleText(scale)}x
            </text>

            {/* Tick marks */}
            {Array.from({ length: 5 }).map((_, i) => {
                const tickX = position === 'left' ? rulerThickness - 1 : (rulerLength / 4) * i;
                const tickY = position === 'top' ? rulerThickness - 1 : 0;
                const tickLength = i === 0 || i === 4 ? 8 : 4;

                return (
                    <line
                        key={i}
                        x1={tickX}
                        y1={tickY}
                        x2={tickX}
                        y2={position === 'top' ? tickLength : tickLength}
                        stroke={c.white}
                        strokeWidth={s.STROKE}
                    />
                );
            })}
        </svg>
    );
}