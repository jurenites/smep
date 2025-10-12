import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { UITooltip } from '../Text/UITooltip';
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
    squareState: UISquareState;
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
    /** Tooltip configuration */
    tooltipContent?: string;
}

// Logical size to pixel size mapping
const LOGICAL_SIZE_MAP: Record<SquareLogicalSize, number> = {
    small: TOKENS.sizes.SQUARE_SMALL, // 4px
    mid: TOKENS.sizes.CARD_SMALL, // 31px
};

export function UISquare({
    squareState,
    logicalSize,
    actualSize,
    onClick,
    children,
    active = 'clickable',
    tooltipContent
}: UISquareProps) {

    // Calculate final size: use actualSize if provided, otherwise use logical size
    const finalSize = actualSize !== undefined ? actualSize : LOGICAL_SIZE_MAP[logicalSize];

    // Round to 2 decimal places for actualSize
    const roundedSize = actualSize !== undefined ? Math.round(finalSize * 100) / 100 : finalSize;

    // Determine if square is clickable based on squareState and active mode
    const isClickable = (squareState === UISquareState.ACTIVE || squareState === UISquareState.INACTIVE) && active === 'clickable' && !!onClick;

    // Get appropriate CSS class based on state
    const getItemClassName = (): string => {
        const baseClass = (() => {
            switch (squareState) {
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

    // Create dynamic styles for size transitions
    const dynamicStyles: React.CSSProperties = {
        width: `${roundedSize}px`,
        height: `${roundedSize}px`,
    };

    const squareElement = (
        <div
            className={`${styles.container} ${getItemClassName()} ${styles[`size-${logicalSize.toLowerCase()}`]}`}
            style={dynamicStyles}
            onClick={isClickable ? onClick : undefined}
            data-logical-size={logicalSize}
            data-actual-size={actualSize}
            data-active={active}
        >
            {children && (
                <div className={styles.contentContainer}>
                    {children}
                </div>
            )}
        </div>
    );

    // Wrap with tooltip if tooltipContent is provided
    if (tooltipContent) {
        return (
            <UITooltip content={tooltipContent} position="top" delay={1000}>
                {squareElement}
            </UITooltip>
        );
    }

    return squareElement;
}
