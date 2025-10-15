import React from 'react';
import styles from './UIRadiationPulse.module.css';

export interface UIRadiationPulseProps {
    /** Diameter in px of the core circle the pulse originates from */
    coreDiameter: number;
    /** HEX color of the atom; pulse uses 0.2 opacity */
    color: string;
    /** Optional: animation speed in seconds (default 0.5s) */
    speedSeconds?: number;
    /** Optional: max scale factor relative to core diameter (default 3x) */
    maxScale?: number;
    /** Number of concurrent rings (1-3). Default 2. */
    rings?: number;
}

export function UIRadiationPulse({
    coreDiameter,
    color,
    speedSeconds = 0.5,
    maxScale = 3,
    rings = 2,
}: UIRadiationPulseProps) {
    const sizeStyle: React.CSSProperties = {
        width: `${coreDiameter}px`,
        height: `${coreDiameter}px`,
        // Variables drive flat ring look and timing
        ['--pulse-color' as any]: hexToRgba(color, 0.2),
        ['--pulse-speed' as any]: `${speedSeconds}s`,
        ['--pulse-scale' as any]: maxScale,
    };

    // Offset start times so rings are staggered
    const ringEls = Array.from({ length: Math.max(1, Math.min(3, rings)) }).map((_, i) => (
        <div
            key={i}
            className={`${styles.pulse} ${i % 2 === 1 ? styles.secondary : ''}`}
            style={{ animationDelay: `${(i * speedSeconds) / rings}s` }}
            aria-hidden="true"
        />
    ));

    return (
        <div className={styles.container} style={sizeStyle} aria-hidden="true">
            {ringEls}
        </div>
    );
}

// Converts a HEX like #RRGGBB to rgba(r,g,b,a)
function hexToRgba(hex: string, alpha: number): string {
    const normalized = hex.trim();
    const match = /^#?([0-9a-fA-F]{6})$/.exec(normalized);
    if (!match) return `rgba(255,255,255,${alpha})`;
    const intVal = parseInt(match[1], 16);
    const r = (intVal >> 16) & 255;
    const g = (intVal >> 8) & 255;
    const b = intVal & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
