import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from '../../../lib/types';
import styles from './UIRectangleMid.module.css';

interface UIRectangleMidProps {
    /** Current state of the rectangle */
    state: UISquareState;
    /** Optional click handler for interactive behavior */
    onClick?: () => void;
    /** Optional custom content to render inside the rectangle */
    children?: React.ReactNode;
    /** Optional additional CSS classes */
    className?: string;
    /** Optional data attributes for testing or identification */
    'data-testid'?: string;
}

export function UIRectangleMid({
    state,
    onClick,
    children,
    className,
    'data-testid': dataTestId
}: UIRectangleMidProps) {
    const sizes = TOKENS.sizes;

    // Rectangle dimensions - always use MINI_CARD size for consistency
    const rectWidth = sizes.MINI_CARD;  // 31px
    const rectHeight = sizes.MINI_CARD;

    // SVG container size - same as the rectangle for optimal space usage
    const svgSize = rectWidth;

    // Calculate center offset to center the rectangle within the SVG
    const centerOffsetX = Math.round((svgSize - rectWidth) / 2);
    const centerOffsetY = Math.round((svgSize - rectHeight) / 2);

    // Determine if the rectangle is clickable
    const isClickable = !!onClick;

    // Get CSS class based on state and any additional classes
    const getItemClassName = (): string => {
        const baseClass = styles.container;
        const stateClass = styles[`rectangle${state.charAt(0).toUpperCase() + state.slice(1)}`];
        const additionalClasses = className ? ` ${className}` : '';
        return `${baseClass} ${stateClass}${additionalClasses}`.trim();
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

    // Render optional children content with flexible positioning
    const renderChildren = () => {
        if (!children) return null;

        return (
            <foreignObject
                x={centerOffsetX + 2} // Reduced padding for better content fit
                y={centerOffsetY + 2}
                width={rectWidth - 4}
                height={rectHeight - 4}
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
            data-testid={dataTestId}
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
