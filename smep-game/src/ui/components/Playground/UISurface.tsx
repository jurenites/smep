import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { getNestedTranslation } from '../../../lib/data/translations';
import styles from './UISurface.module.css';

export interface UISurfaceProps {
    /** Surface width in pixels */
    surfaceWidth: number;
    /** Surface height in pixels */
    surfaceHeight: number;
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
    surfaceWidth,
    surfaceHeight,
    children,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    className = ''
}: UISurfaceProps) {
    // Use CSS variables for background gradient instead of inline styles
    const containerStyle: React.CSSProperties = {
        width: surfaceWidth,
        height: surfaceHeight,
        // Background gradient now handled by CSS variables
    };

    const contentStyle: React.CSSProperties = {
        width: surfaceWidth,
        height: surfaceHeight,
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
            aria-label={getNestedTranslation('accessibility.playgroundSurface')}
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
