import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import styles from './UISurface.module.css';

export interface UISurfaceProps {
    /** Surface width in pixels */
    width: number;
    /** Surface height in pixels */
    height: number;
    /** Child components to render on the surface */
    children?: React.ReactNode;
    /** Mouse move event handler */
    onMouseMove?: (event: React.MouseEvent) => void;
    /** Mouse down event handler */
    onMouseDown?: (event: React.MouseEvent) => void;
    /** Mouse up event handler */
    onMouseUp?: (event: React.MouseEvent) => void;
    /** Additional CSS class name */
    className?: string;
}

/**
 * UISurface Component
 * 
 * Provides the background surface with radial gradient and handles mouse events.
 * Contains only the background - no playground circle or shadow effects.
 * 
 * @example
 * ```tsx
 * <UISurface width={800} height={600} onMouseDown={handleClick}>
 *   <UIPlayground width={800} height={600}>
 *     {particles}
 *   </UIPlayground>
 * </UISurface>
 * ```
 */
export function UISurface({
    width,
    height,
    children,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    className = ''
}: UISurfaceProps) {
    // Use CSS variables for background gradient instead of inline styles
    const containerStyle: React.CSSProperties = {
        width,
        height,
        // Background gradient now handled by CSS variables
    };

    const contentStyle: React.CSSProperties = {
        width,
        height,
    };

    return (
        <div
            className={`${styles.container} ${className}`}
            style={containerStyle}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            data-testid="uisurface"
            role="region"
            aria-label="Playground surface"
        >
            {/* Content overlay */}
            <div
                className={styles.contentOverlay}
                style={contentStyle}
            >
                {children}
            </div>
        </div>
    );
}
