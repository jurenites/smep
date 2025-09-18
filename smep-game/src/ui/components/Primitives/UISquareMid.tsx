import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from '../../../lib/types';
import styles from './UISquareMid.module.css';

interface UISquareMidProps {
    /** Current state of the square */
    state: UISquareState;
    /** Optional click handler for interactive behavior */
    onClick?: () => void;
    /** Optional custom content to render inside the square */
    children?: React.ReactNode;
}

export function UISquareMid({
    state,
    onClick,
    children
}: UISquareMidProps) {
    const sizes = TOKENS.sizes;

    // Square dimensions - always use MINI_CARD size for consistency
    const squareWidth = sizes.MINI_CARD;  // 31px
    const squareHeight = sizes.MINI_CARD;

    // SVG container size - same as the square for optimal space usage
    const svgSize = squareWidth;

    // Calculate center offset to center the square within the SVG
    const centerOffsetX = Math.round((svgSize - squareWidth) / 2);
    const centerOffsetY = Math.round((svgSize - squareHeight) / 2);

    // Determine if the square is clickable
    const isClickable = !!onClick;

    // Get CSS class based on state
    const getItemClassName = (): string => {
        const baseClass = styles.container;
        const stateClass = styles[`square${state.charAt(0).toUpperCase() + state.slice(1)}`];
        return `${baseClass} ${stateClass}`.trim();
    };

    // Render the square content
    const renderContent = () => {
        // Square with offset on half pixel because SVG draws 1px solid line center, not inner
        return (
            <rect
                x={centerOffsetX + 0.5}
                y={centerOffsetY + 0.5}
                width={squareWidth - 1}
                height={squareHeight - 1}
            />
        );
    };

    // Render optional children content with flexible positioning
    const renderChildren = () => {
        if (!children) return null;

        return (
            <foreignObject
                x={centerOffsetX + 2} // Reduced padding for better content fit
                y={centerOffsetY + 2}
                width={squareWidth - 4}
                height={squareHeight - 4}
            >
                <div className={styles.contentContainer}>
                    {children}
                </div>
            </foreignObject>
        );
    };

    return (
        <div
            className={getItemClassName()}
            data-active={isClickable ? "clickable" : "static"}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ cursor: isClickable ? 'pointer' : 'default' }}
            >
                {renderContent()}
                {renderChildren()}
            </svg>
        </div>
    );
}
