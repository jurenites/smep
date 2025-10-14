import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from '../../../lib/types';
import styles from './UIProgressBar.module.css';

export type ProgressLogicalSize = 'small' | 'mid';
export type ProgressMode = 'single' | 'segmented';
export type ProgressFillColor = 'yolk' | 'ultraviolet' | 'white' | 'lightgray' | 'gray' | 'darkgray' | 'black';

// Map color names to token values
const FILL_COLOR_MAP: Record<ProgressFillColor, string> = {
    yolk: TOKENS.colors.yolk,
    ultraviolet: TOKENS.colors.ultraviolet,
    white: TOKENS.colors.white,
    lightgray: TOKENS.colors.lightgray,
    gray: TOKENS.colors.gray,
    darkgray: TOKENS.colors.darkgray,
    black: TOKENS.colors.black,
};

export interface UIProgressBarProps {
    /** Current state of the progress bar */
    progressState: UISquareState;
    /** Logical size of the progress bar */
    logicalSize: ProgressLogicalSize;
    /** Progress value from 0 to 1 */
    progress: number; // 0.0 to 1.0
    /** Optional click handler for interactive behavior */
    onClick?: () => void;
    /** Fill color for the progress bar from theme colors */
    fillColor?: ProgressFillColor;
    /** Whether to take full width of container (for UIButton use) */
    fullWidth?: boolean;
    /** Progress bar mode - single or segmented */
    progressMode?: ProgressMode;
    /** Number of segments when in segmented mode */
    segmentCount?: number;
    /** Active segment index (1-based) when in segmented mode */
    activeSegmentIndex?: number;
}

// Logical size to height mapping
const LOGICAL_SIZE_MAP: Record<ProgressLogicalSize, number> = {
    small: TOKENS.sizes.SQUARE_SMALL, // 4px height
    mid: TOKENS.sizes.CARD_SMALL, // 31px height (maximum)
};

export function UIProgressBar({
    progressState,
    logicalSize,
    progress,
    onClick,
    fillColor = 'white', // Default white fill
    fullWidth = false,
    progressMode = 'single',
    segmentCount = 5,
    activeSegmentIndex = 1
}: UIProgressBarProps) {
    const sizes = TOKENS.sizes;

    // Get actual hex color from color name
    const actualFillColor = FILL_COLOR_MAP[fillColor];

    // Validate progress value
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Get height based on logical size
    const height = LOGICAL_SIZE_MAP[logicalSize];

    // Container width - full width or fixed at 31px
    const containerWidth = fullWidth ? 100 : sizes.CARD_SMALL; // 100% or 31px

    // Calculate fill width based on progress
    const fillWidth = containerWidth * clampedProgress;

    // Determine if the progress bar is clickable
    const isClickable = !!onClick;

    // Get CSS class based on state
    const getItemClassName = (): string => {
        const baseClass = styles.container;
        const stateClass = styles[`progress${progressState.charAt(0).toUpperCase() + progressState.slice(1)}`];
        const sizeClass = styles[`size${logicalSize.charAt(0).toUpperCase() + logicalSize.slice(1)}`];
        const fullWidthClass = fullWidth ? styles.fullWidth : '';
        return `${baseClass} ${stateClass} ${sizeClass} ${fullWidthClass}`.trim();
    };

    // Render the progress bar content
    const renderContent = () => {
        if (fullWidth) {
            // Full width mode - no border, just fill
            return (
                <>
                    {/* Progress fill only - no border */}
                    {clampedProgress > 0 && (
                        <rect
                            x={0}
                            y={0}
                            width={`${clampedProgress * 100}%`}
                            height={height}
                            fill={actualFillColor}
                            className={styles.fill}
                        />
                    )}
                </>
            );
        } else {
            // Fixed width mode - original logic
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
                            fill={actualFillColor}
                            className={styles.fill}
                        />
                    )}
                </>
            );
        }
    };

    // Render segmented mode
    if (progressMode === 'segmented') {
        const segments = [];

        for (let i = 1; i <= segmentCount; i++) {
            let segmentProgress = 0;
            let segmentFillColor: ProgressFillColor = fillColor;

            if (i < activeSegmentIndex) {
                // Completed segments - 100% filled with white
                segmentProgress = 1;
                segmentFillColor = fillColor;
            } else if (i === activeSegmentIndex) {
                // Current active segment - show current progress with white fill
                segmentProgress = clampedProgress;
                segmentFillColor = fillColor;
            } else {
                // Future segments - empty, no fill
                segmentProgress = 0;
                segmentFillColor = fillColor;
            }

            segments.push(
                <div
                    key={i}
                    className={styles.segment}
                    data-segment-index={i}
                >
                    <UIProgressBar
                        progressState={progressState}
                        logicalSize={logicalSize}
                        progress={segmentProgress}
                        fillColor={segmentFillColor}
                        fullWidth={true}
                        progressMode="single"
                    />
                </div>
            );
        }

        return (
            <div
                className={styles.segmentedContainer}
                data-testid="uiprogressbar-segmented"
                data-segment-count={segmentCount}
                data-active-segment={activeSegmentIndex}
            >
                {segments}
            </div>
        );
    }

    // Single mode render
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
                width={fullWidth ? "100%" : containerWidth}
                height={height}
                viewBox={fullWidth ? `0 0 100 ${height}` : `0 0 ${containerWidth} ${height}`}
                preserveAspectRatio="none"
                className={isClickable ? styles.cursorPointer : styles.cursorDefault}
            >
                {renderContent()}
            </svg>
        </div>
    );
}
