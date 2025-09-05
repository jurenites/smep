import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from '../../../lib/types';
import styles from './UISquareSmall.module.css';

interface UISquareSmallProps {
    state: UISquareState;
    onClick?: () => void;
    active?: 'clickable' | 'only view'; // New property to control display mode
}

export function UISquareSmall({
    state,
    onClick,
    active = 'clickable' // Default to clickable mode
}: UISquareSmallProps) {
    const sizes = TOKENS.sizes;

    // Determine if square is clickable based on state and active mode
    const isClickable = (state === UISquareState.ACTIVE || state === UISquareState.INACTIVE) && active === 'clickable';

    // Calculate dimensions based on active mode
    const isClickableMode = active === 'clickable';
    const svgSize = isClickableMode ? sizes.MINI_CARD : sizes.MINI_PAGINATOR; // 31px for clickable, 4px for only view
    const rectSize = sizes.MINI_PAGINATOR; // Always 4px for the rect
    const centerOffset = isClickableMode ? Math.round((svgSize - rectSize) / 2) : 0; // Center for clickable, 0 for only view

    // Get appropriate CSS class based on state
    const getItemClassName = () => {
        const baseClass = (() => {
            switch (state) {
                case UISquareState.ACTIVE:
                    return styles.squareActive;
                case UISquareState.INACTIVE:
                    return styles.squareInactive;
                case UISquareState.DISABLED:
                    return styles.squareDisabled;
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

    // Render different content based on state
    const renderContent = () => {
        // Default rect for other states, with offset on half pixel because SVG draw 1px solid line center, not inner 
        return (
            <rect
                x={centerOffset + 0.5}
                y={centerOffset + 0.5}
                width={rectSize - 1}
                height={rectSize - 1}
            />
        );
    };

    return (
        <div className={styles.container} data-active={active}>
            <svg
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                preserveAspectRatio="xMidYMid meet"
                onClick={isClickable ? onClick : undefined}
                className={getItemClassName()}
            >
                {renderContent()}
            </svg>
        </div>
    );
}
