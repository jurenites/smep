import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from '../../../lib/types';
import styles from './UIProgressBar.module.css';

export type ProgressLogicalSize = 'small' | 'mid';

export interface UIProgressBarProps {
    /** Current state of the progress bar */
    state: UISquareState;
    /** Logical size of the progress bar */
    logicalSize: ProgressLogicalSize;
    /** Progress value from 0 to 1 */
    progress: number; // 0.0 to 1.0
    /** Optional click handler for interactive behavior */
    onClick?: () => void;
    /** Fill color for the progress bar */
    fillColor?: string;
}

// Logical size to height mapping
const LOGICAL_SIZE_MAP: Record<ProgressLogicalSize, number> = {
    small: TOKENS.sizes.BIG_PAGINATOR_H, // 4px height
    mid: TOKENS.sizes.MINI_CARD, // 31px height (maximum)
};

export function UIProgressBar({
    state,
    logicalSize,
    progress,
    onClick,
    fillColor = '#FFFFFF' // Default white fill
}: UIProgressBarProps) {
    const sizes = TOKENS.sizes;

    // Validate progress value
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Get height based on logical size
    const height = LOGICAL_SIZE_MAP[logicalSize];

    // Container width - fixed at 31px as specified
    const containerWidth = sizes.MINI_CARD; // 31px

    // Calculate fill width based on progress
    const fillWidth = containerWidth * clampedProgress;

    // Determine if the progress bar is clickable
    const isClickable = !!onClick;

    // Get CSS class based on state
    const getItemClassName = (): string => {
        const baseClass = styles.container;
        const stateClass = styles[`progress${state.charAt(0).toUpperCase() + state.slice(1)}`];
        const sizeClass = styles[`size-${logicalSize.toLowerCase()}`];
        return `${baseClass} ${stateClass} ${sizeClass}`.trim();
    };

    // Render the progress bar content
    const renderContent = () => {
        return (
            <>
                {/* Background outline - always full width */}
                <rect
                    x={0.5}
                    y={0.5}
                    width={containerWidth - 1}
                    height={height - 1}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={1}
                    className={styles.background}
                />
                {/* Progress fill */}
                {clampedProgress > 0 && (
                    <rect
                        x={1}
                        y={1}
                        width={fillWidth - 2}
                        height={height - 2}
                        fill={fillColor}
                        className={styles.fill}
                    />
                )}
            </>
        );
    };

    return (
        <div
            className={getItemClassName()}
            data-active="clickable"
            onClick={onClick}
            data-testid="uiprogressbar"
            data-progress={clampedProgress}
            data-logical-size={logicalSize}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={containerWidth}
                height={height}
                viewBox={`0 0 ${containerWidth} ${height}`}
                preserveAspectRatio="none"
                style={{ cursor: isClickable ? 'pointer' : 'default' }}
            >
                {renderContent()}
            </svg>
        </div>
    );
}
