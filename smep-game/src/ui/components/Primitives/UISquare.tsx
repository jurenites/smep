import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import styles from './UISquare.module.css';

export enum UISquareState {
    ACTIVE = 'active', // Active and clickable
    INACTIVE = 'inactive', // Inactive but clickable
    DISABLED = 'disabled', // Disabled and not clickable
    HIDDEN = 'hidden', // Hidden from view (0px width/height) but remains in DOM
}

export type SquareLogicalSize = 'small' | 'mid';

export interface UISquareProps {
    /** Current state of the square */
    state: UISquareState;
    /** Logical size of the square */
    logicalSize: SquareLogicalSize;
    /** Override logical size with actual pixel size (up to 2 decimal places) */
    actualSize?: number;
    /** Optional click handler for interactive behavior */
    onClick?: () => void;
    /** Optional custom content to render inside the square */
    children?: React.ReactNode;
    /** Display mode for the square */
    active?: 'clickable' | 'only view';
}

// Logical size to pixel size mapping
const LOGICAL_SIZE_MAP: Record<SquareLogicalSize, number> = {
    small: TOKENS.sizes.SQUARE_SMALL, // 4px
    mid: TOKENS.sizes.CARD_SMALL, // 31px
};

export function UISquare({
    state,
    logicalSize,
    actualSize,
    onClick,
    children,
    active = 'clickable'
}: UISquareProps) {

    // Calculate final size: use actualSize if provided, otherwise use logical size
    const finalSize = actualSize !== undefined ? actualSize : LOGICAL_SIZE_MAP[logicalSize];

    // Round to 2 decimal places for actualSize
    const roundedSize = actualSize !== undefined ? Math.round(finalSize * 100) / 100 : finalSize;

    // Determine if square is clickable based on state and active mode
    const isClickable = (state === UISquareState.ACTIVE || state === UISquareState.INACTIVE) && active === 'clickable' && !!onClick;

    // Calculate dimensions based on active mode and size
    const isClickableMode = active === 'clickable';
    const svgSize = isClickableMode ? roundedSize : roundedSize; // Same size for both modes in unified component
    const rectSize = roundedSize; // Always use the calculated size for the rect
    const centerOffset = isClickableMode ? 0 : 0; // No centering needed since svg and rect are same size

    // Get appropriate CSS class based on state
    const getItemClassName = (): string => {
        const baseClass = (() => {
            switch (state) {
                case UISquareState.ACTIVE:
                    return styles.squareActive;
                case UISquareState.INACTIVE:
                    return styles.squareInactive;
                case UISquareState.DISABLED:
                    return styles.squareDisabled;
                case UISquareState.HIDDEN:
                    return styles.squareHidden;
                default:
                    return styles.squareInactive;
            }
        })();

        // For "only view" mode, add a modifier class to disable hover effects
        if (active === 'only view') {
            return `${baseClass} ${styles.onlyView}`;
        }

        return baseClass;
    };

    // Render the square content
    const renderContent = () => {
        // Square with offset on half pixel because SVG draws 1px solid line center, not inner
        return (
            <rect
                x={centerOffset + 0.5}
                y={centerOffset + 0.5}
                width={rectSize - 1}
                height={rectSize - 1}
            />
        );
    };

    // Render optional children content with flexible positioning
    const renderChildren = () => {
        if (!children) return null;

        return (
            <foreignObject
                x={centerOffset + 2} // Reduced padding for better content fit
                y={centerOffset + 2}
                width={rectSize - 4}
                height={rectSize - 4}
            >
                <div className={styles.contentContainer}>
                    {children}
                </div>
            </foreignObject>
        );
    };

    // Create dynamic styles for size transitions
    const dynamicStyles: React.CSSProperties = {
        width: `${roundedSize}px`,
        height: `${roundedSize}px`,
    };

    return (
        <div
            className={`${styles.container} ${styles[`size-${logicalSize.toLowerCase()}`]}`}
            style={dynamicStyles}
            data-logical-size={logicalSize}
            data-actual-size={actualSize}
            data-active={active}
        >
            <svg
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                preserveAspectRatio="xMidYMid meet"
                onClick={isClickable ? onClick : undefined}
                className={getItemClassName()}
            >
                {renderContent()}
                {renderChildren()}
            </svg>
        </div>
    );
}
