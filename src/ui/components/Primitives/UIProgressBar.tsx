import { useState, useEffect, useRef } from 'react';
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
    /** Progress value from 0 to 1 (only used in single mode) */
    progress?: number; // 0.0 to 1.0
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
    /** Duration in ms for each segment to fill (used in segmented mode) */
    progressDuration?: number;
}

// Logical size to height mapping
const LOGICAL_SIZE_MAP: Record<ProgressLogicalSize, number> = {
    small: TOKENS.sizes.SQUARE_SMALL, // 4px height
    mid: TOKENS.sizes.CARD_SMALL, // 31px height (maximum)
};

export function UIProgressBar({
    progressState,
    logicalSize,
    progress = 0,
    onClick,
    fillColor = 'white', // Default white fill
    fullWidth = false,
    progressMode = 'single',
    segmentCount = 5,
    activeSegmentIndex = 1,
    progressDuration = 1000
}: UIProgressBarProps) {
    const sizes = TOKENS.sizes;

    // Segmented mode animation state
    // currentSegmentIndex points to the segment AFTER the last completed one
    // e.g., if currentSegmentIndex = 2, then segment 1 is completed
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(2);
    const [currentSegmentProgress, setCurrentSegmentProgress] = useState(0);
    const previousTargetRef = useRef(activeSegmentIndex);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const startTimeRef = useRef<number | undefined>(undefined);

    // Initialize currentSegmentIndex based on initial activeSegmentIndex
    useEffect(() => {
        setCurrentSegmentIndex(activeSegmentIndex + 1);
        previousTargetRef.current = activeSegmentIndex;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run on mount

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

    // Animation for segmented mode
    useEffect(() => {
        if (progressMode !== 'segmented') return;

        // Check if target has changed
        if (activeSegmentIndex === previousTargetRef.current) return;

        const targetSegment = activeSegmentIndex;
        previousTargetRef.current = activeSegmentIndex;

        // Cancel existing animation and restart from current position to new target
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = undefined;
        }

        // Capture current state at the time this effect runs
        setCurrentSegmentIndex(prevSegIndex => {
            setCurrentSegmentProgress(prevSegProgress => {
                // Calculate where we're starting from (current actual progress)
                const currentActualProgress = prevSegIndex - 1 + prevSegProgress;
                const targetProgress = targetSegment;
                const progressDifference = targetProgress - currentActualProgress;

                // Determine direction
                const isMovingBackward = progressDifference < 0;
                const progressDistance = Math.abs(progressDifference);

                // If already at target, no animation needed
                if (progressDistance < 0.001) {
                    setCurrentSegmentIndex(targetSegment + 1);
                    setCurrentSegmentProgress(0);
                    startTimeRef.current = undefined;
                    return prevSegProgress;
                }

                const totalDuration = progressDuration * progressDistance;

                // Start animation
                const animate = (timestamp: number) => {
                    if (!startTimeRef.current) {
                        startTimeRef.current = timestamp;
                    }

                    const elapsed = timestamp - startTimeRef.current;
                    const animationProgress = Math.min(elapsed / totalDuration, 1);

                    let absoluteProgress: number;

                    if (isMovingBackward) {
                        // Moving backward - drain from current to target
                        absoluteProgress = currentActualProgress - (progressDistance * animationProgress);
                    } else {
                        // Moving forward - fill from current to target
                        absoluteProgress = currentActualProgress + (progressDistance * animationProgress);
                    }

                    const segmentIndex = Math.floor(absoluteProgress);
                    const segmentProg = absoluteProgress - segmentIndex;

                    // Current segment being filled/drained (1-based)
                    const currentSegmentNum = segmentIndex + 1;

                    setCurrentSegmentIndex(currentSegmentNum);
                    setCurrentSegmentProgress(segmentProg);

                    if (animationProgress < 1) {
                        animationFrameRef.current = requestAnimationFrame(animate);
                    } else {
                        // Animation complete
                        setCurrentSegmentIndex(targetSegment + 1);
                        setCurrentSegmentProgress(0);
                        startTimeRef.current = undefined;
                        animationFrameRef.current = undefined;
                    }
                };

                startTimeRef.current = undefined;
                animationFrameRef.current = requestAnimationFrame(animate);

                return prevSegProgress; // Don't change state in this setter
            });
            return prevSegIndex; // Don't change state in this setter
        });

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [activeSegmentIndex, progressMode, progressDuration]);

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
        const currentActualProgress = currentSegmentIndex - 1 + currentSegmentProgress;
        const isInDrainMode = currentActualProgress > activeSegmentIndex;

        for (let i = 1; i <= segmentCount; i++) {
            let segmentProgress = 0;
            let segmentFillColor: ProgressFillColor = fillColor;
            let showYolkBackground = false;
            let yolkDrainProgress = 0; // For showing draining yolk effect
            let showDraining = false;

            // TODO: Can we check the logic below and make it simplier to read?
            if (isInDrainMode) {
                // DRAINING MODE (moving backward)
                if (i <= activeSegmentIndex) {
                    // Safe segments - keep white fill (target and below)
                    segmentProgress = 1;
                    segmentFillColor = fillColor;
                    showYolkBackground = false;
                    showDraining = false;
                } else if (i === currentSegmentIndex) {
                    // Currently draining segment - white is EMPTY (0%), yolk drains on top
                    segmentProgress = 0; // No white underneath - empty segment
                    segmentFillColor = fillColor;
                    showDraining = true;
                    yolkDrainProgress = currentSegmentProgress; // Yolk drains from 1 to 0
                } else if (i > activeSegmentIndex && i < currentSegmentIndex && i <= Math.ceil(currentActualProgress)) {
                    // Segments between target and current draining position - show full yolk waiting to drain
                    segmentProgress = 0; // No white - empty segment
                    segmentFillColor = fillColor;
                    showDraining = true;
                    yolkDrainProgress = 1; // Full yolk (100%)
                } else if (i > currentSegmentIndex && i <= Math.ceil(currentActualProgress)) {
                    // Segments after current (already drained in a previous state) - show full yolk
                    segmentProgress = 0; // No white - empty segment
                    segmentFillColor = fillColor;
                    showDraining = true;
                    yolkDrainProgress = 1; // Full yolk (100%)
                } else {
                    // Segments that were never filled - remain empty
                    segmentProgress = 0;
                    segmentFillColor = fillColor;
                    showDraining = false;
                }
            } else {
                // FILLING MODE (moving forward)
                if (i < currentSegmentIndex) {
                    // Completed segments - 100% filled with white (no yolk)
                    segmentProgress = 1;
                    segmentFillColor = fillColor;
                    showYolkBackground = false;
                } else if (i === currentSegmentIndex) {
                    // Current active segment - show animated white progress on top of yolk
                    segmentProgress = currentSegmentProgress;
                    segmentFillColor = fillColor;
                    // Show yolk background if this segment is in the target range
                    showYolkBackground = i <= activeSegmentIndex;
                } else if (i <= activeSegmentIndex) {
                    // Future segments in the target path - show 100% yolk background, 0% white
                    segmentProgress = 0;
                    segmentFillColor = fillColor;
                    showYolkBackground = true;
                } else {
                    // Segments beyond target - empty, no preview
                    segmentProgress = 0;
                    segmentFillColor = fillColor;
                    showYolkBackground = false;
                }
            }

            segments.push(
                <div
                    key={i}
                    className={`${styles.segment} ${(showYolkBackground || showDraining) ? styles.segmentWithYolk : ''}`}
                    data-segment-index={i}
                >
                    {showDraining ? (
                        // DRAINING MODE: Only render yolk drain layer
                        <div className={styles.yolkDrainLayer}>
                            <UIProgressBar
                                progressState={progressState}
                                logicalSize={logicalSize}
                                progress={yolkDrainProgress} // Drains from 1 to 0
                                fillColor="yolk"
                                fullWidth={false}
                                progressMode="single"
                            />
                        </div>
                    ) : (
                        // FILLING MODE: Render white with optional yolk background
                        <>
                            {/* Yolk background layer (for filling mode preview) */}
                            {showYolkBackground && (
                                <div className={styles.yolkBackgroundLayer}>
                                    <UIProgressBar
                                        progressState={progressState}
                                        logicalSize={logicalSize}
                                        progress={1} // Always 100% for yolk background
                                        fillColor="yolk"
                                        fullWidth={false}
                                        progressMode="single"
                                    />
                                </div>
                            )}
                            {/* White foreground layer (animated progress) */}
                            <div className={styles.whiteForegroundLayer}>
                                <UIProgressBar
                                    progressState={progressState}
                                    logicalSize={logicalSize}
                                    progress={segmentProgress}
                                    fillColor={segmentFillColor}
                                    fullWidth={false}
                                    progressMode="single"
                                />
                            </div>
                        </>
                    )}
                </div>
            );
        }

        return (
            <div
                className={styles.segmentedContainer}
                data-testid="uiprogressbar-segmented"
                data-segment-count={segmentCount}
                data-active-segment={activeSegmentIndex}
                data-current-segment={currentSegmentIndex}
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
