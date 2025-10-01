import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from '../../../lib/types';
import styles from './UIRectangleBig.module.css';

interface UIRectangleBigProps {
    state: UISquareState;
    onClick?: () => void;
}

export function UIRectangleBig({ state, onClick }: UIRectangleBigProps) {
    const sizes = TOKENS.sizes;

    // Rectangle dimensions from tokens - using MID_CARD dimensions for big rectangle
    const rectWidth = sizes.CARD_MID_W;  // 83px
    const rectHeight = sizes.CARD_MID_H; // 109px

    // SVG container size - use exact rectangle dimensions for precise sizing
    const svgSize = Math.max(rectWidth, rectHeight); // 109px (no extra padding)

    // Calculate center offset to center the rectangle within the SVG
    const centerOffsetX = Math.round((svgSize - rectWidth) / 2);
    const centerOffsetY = Math.round((svgSize - rectHeight) / 2);

    // Determine if the rectangle is clickable
    const isClickable = !!onClick;

    // Get CSS class based on state
    const getItemClassName = (): string => {
        const baseClass = styles.container;
        const stateClass = styles[`rectangle${state.charAt(0).toUpperCase() + state.slice(1)}`];
        return `${baseClass} ${stateClass}`.trim();
    };

    // Render the rectangle content
    const renderContent = () => {
        // Rectangle with offset on half pixel because SVG draws 1px solid line center, not inner
        return (
            <rect
                x={centerOffsetX + 0.5}
                y={centerOffsetY + 0.5}
                width={rectWidth - 1}
                height={rectHeight - 1}
            />
        );
    };

    return (
        <div
            className={getItemClassName()}
            data-active="clickable"
            onClick={onClick}
            data-testid="uirectanglebig"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                preserveAspectRatio="xMidYMid meet"
                className={isClickable ? styles.cursorPointer : styles.cursorDefault}
            >
                {renderContent()}
            </svg>
        </div>
    );
}
