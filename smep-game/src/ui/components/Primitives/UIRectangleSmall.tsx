import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from '../../../lib/types';
import styles from './UIRectangleSmall.module.css';

interface UIRectangleSmallProps {
    state: UISquareState;
    onClick?: () => void;
}

export function UIRectangleSmall({ state, onClick }: UIRectangleSmallProps) {
    const sizes = TOKENS.sizes;

    // Rectangle dimensions from tokens
    const rectWidth = sizes.RECTANGLE_SMALL;  // 17px
    const rectHeight = sizes.SQUARE_SMALL; // 4px

    // SVG container size (same as UISquare Mid for consistency)
    const svgSize = sizes.CARD_SMALL; // 31px

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
            data-testid="uirectanglesmall"
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
