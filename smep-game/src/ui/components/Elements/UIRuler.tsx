import { useState, useEffect, useRef } from 'react';
import { TOKENS } from '../../tokens/tokens';
import { formatDisplayNumber } from '../../../lib/utils/number-formatter';
import styles from './UIRuler.module.css';

type ScaleType = 'linear' | 'logarithmic';

interface UIRulerProps {
    scale: number;
    scaleType?: ScaleType;
}

export function UIRuler({
    scale,
    scaleType = 'linear'
}: UIRulerProps) {
    const sizes = TOKENS.sizes;
    const colors = TOKENS.colors;

    // Animation state
    const [animatedScale, setAnimatedScale] = useState(scale);
    const [isJumpOverAnimating, setIsJumpOverAnimating] = useState(false);
    const [jumpOverProgress, setJumpOverProgress] = useState(0);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const startScaleRef = useRef<number | null>(null);
    const targetScaleRef = useRef<number | null>(null);

    // Animation configuration
    const ANIMATION_DURATION = 800; // ms
    const JUMP_OVER_DURATION = 1200; // ms for jump over animations

    // Animation effect
    useEffect(() => {
        if (scale !== animatedScale) {
            // Start animation from current animated scale to target scale
            startScaleRef.current = animatedScale;
            targetScaleRef.current = scale;
            startTimeRef.current = performance.now();

            // Check if we need jump over animation
            const needsJumpOver = Math.abs(Math.log10(scale) - Math.log10(animatedScale)) >= 1;
            setIsJumpOverAnimating(needsJumpOver);
            setJumpOverProgress(0);

            const animate = (currentTime: number) => {
                if (!startTimeRef.current) return;

                const elapsed = currentTime - startTimeRef.current;
                const startScale = startScaleRef.current!;
                const targetScale = targetScaleRef.current!;

                // Calculate duration based on animation type and scale difference
                let duration;
                if (needsJumpOver) {
                    duration = JUMP_OVER_DURATION;
                } else {
                    const scaleDifference = Math.abs(targetScale - startScale);
                    const maxScaleDifference = Math.max(startScale, targetScale);
                    const relativeDifference = scaleDifference / maxScaleDifference;
                    duration = Math.max(200, ANIMATION_DURATION * relativeDifference);
                }

                if (elapsed < duration) {
                    const progress = elapsed / duration;
                    // Cubic ease-out for smooth animation
                    const easedProgress = 1 - Math.pow(1 - progress, 3);

                    if (needsJumpOver) {
                        // Jump over animation: scale down to 1 segment, then scale up
                        if (progress < 0.5) {
                            // First half: scale down to 1 segment
                            const scaleDownProgress = progress * 2;
                            const scaleDownEased = 1 - Math.pow(1 - scaleDownProgress, 3);
                            setJumpOverProgress(scaleDownEased);
                            setAnimatedScale(startScale); // Keep original scale for tick visibility
                        } else {
                            // Second half: scale up to target
                            const scaleUpProgress = (progress - 0.5) * 2;
                            const scaleUpEased = 1 - Math.pow(1 - scaleUpProgress, 3);
                            setJumpOverProgress(1 - scaleUpEased);
                            // Animate scale text to target immediately in second half
                            setAnimatedScale(targetScale);
                        }
                    } else {
                        // Normal animation
                        const newScale = startScale + (targetScale - startScale) * easedProgress;
                        setAnimatedScale(newScale);
                    }

                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    setAnimatedScale(targetScale);
                    setIsJumpOverAnimating(false);
                    setJumpOverProgress(0);
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                    }
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [scale, animatedScale]);

    // Constants
    const TICK_COUNT = 11;
    const SEGMENT_COUNT = 10;
    const SEGMENT_WIDTH_PX = 10;
    const TICK_WIDTH_PX = 1;
    const RULER_WIDTH = SEGMENT_COUNT * SEGMENT_WIDTH_PX + TICK_COUNT * TICK_WIDTH_PX; // 110px
    const MIN_LOGARITHMIC_SEGMENT_WIDTH = 2;

    // Layout constants
    const rulerThickness = 21;
    const yOffsetRuler = 8;
    const xOffsetTick = 0.5;

    // Calculate dynamic label based on scale
    const getDynamicLabel = (scale: number) => {
        // Determine the appropriate unit based on scale
        if (scale >= 1e18) return 'Em'; // Exa meter 1km * (10^12)
        if (scale >= 1e15) return 'Pm';  // Peta meter 1km * (10^9)
        if (scale >= 1e12) return 'Tm';  // Tera meter 1km * (10^6)
        if (scale >= 1e9) return 'Gm';  // Giga meter 1km * (10^6)
        if (scale >= 1e6) return 'Mm';  // Mega meter 1km * (10^3)
        if (scale >= 1e3) return 'km';  // Kilometer (10^3)
        if (scale >= 1) return 'm'; // range 1.1 ->10.0, range 10.1 -> 100.0; range 100.1 ->1000.0
        if (scale >= 1e-1) return 'dm'; // decimeter meter (10^-1)
        if (scale >= 1e-3) return 'cm'; // centi meter (10^-3)
        if (scale >= 1e-6) return 'mm'; // milli meter (10^-6)
        if (scale >= 1e-9) return 'μm'; // micro meter (10^-9)
        if (scale >= 1e-12) return 'nm'; // nano meter (10^-12)
        if (scale >= 1e-15) return 'pm'; // pico meter (10^-15)
        if (scale >= 1e-18) return 'fm'; // femto meter (10^-18)
        if (scale >= 1e-21) return 'am'; // atto meter (10^-21)
        if (scale >= 1e-24) return 'zm'; // zepto meter (10^-24)
        if (scale >= 1e-27) return 'ym'; // yocto meter (10^-27)
        return 'm'; // Base meter
    };

    // Jump over logic for powers of 10
    const getJumpOverProgress = (currentScale: number) => {
        const log10Scale = Math.log10(currentScale);
        const log10ScaleInt = Math.floor(log10Scale);
        const log10ScaleDecimal = log10Scale - log10ScaleInt;

        // Check if we're in a jump over range (0.01-1.0, 1.01-10.0, 10.01-100.0, etc.)
        // Jump over starts at X.01 (where X is 0, 1, 10, 100, etc.)
        if (log10ScaleDecimal >= 0.00043 && log10ScaleDecimal < 1.0) {
            // We're in a jump over range (0.00043 ≈ log10(10.01) - log10(10))
            const jumpProgress = (log10ScaleDecimal - 0.00043) / (1.0 - 0.00043); // 0 to 1
            return jumpProgress;
        }
        return null;
    };

    // Calculate visible tick count and segment progress
    const getVisibilityData = () => {
        // Handle jump over animation
        if (isJumpOverAnimating) {
            // During jump over animation: keep all 11 ticks visible during scale down
            // Then start hiding ticks during scale up phase
            if (jumpOverProgress < 0.5) {
                // Scale down phase: keep all ticks visible
                return { visibleTickCount: TICK_COUNT, segmentProgress: 0 };
            } else {
                // Scale up phase: start hiding ticks based on target scale
                const scaleUpProgress = (jumpOverProgress - 0.5) * 2; // 0 to 1
                const targetScale = targetScaleRef.current || animatedScale;
                const currentOrderOfMagnitude = Math.pow(10, Math.floor(Math.log10(targetScale)));
                const normalizedScale = targetScale / currentOrderOfMagnitude;

                if (scaleType === 'logarithmic') {
                    const baseVisibleCount = Math.min(Math.floor(normalizedScale) + 1, TICK_COUNT);
                    const visibleTickCount = TICK_COUNT - (scaleUpProgress * (TICK_COUNT - baseVisibleCount));
                    return { visibleTickCount, segmentProgress: 0 };
                } else {
                    const targetVisibleCount = Math.min(normalizedScale + 1, TICK_COUNT);
                    const visibleTickCount = TICK_COUNT - (scaleUpProgress * (TICK_COUNT - targetVisibleCount));
                    return { visibleTickCount, segmentProgress: 0 };
                }
            }
        }

        const jumpProgress = getJumpOverProgress(animatedScale);

        if (jumpProgress !== null) {
            // Jump over mode: progressive ticks from 2 to 11
            const visibleTickCount = 2 + (jumpProgress * 9); // 2 to 11 ticks
            return { visibleTickCount, segmentProgress: jumpProgress };
        }

        // Normal mode: based on scale within current order of magnitude
        const currentOrderOfMagnitude = Math.pow(10, Math.floor(Math.log10(animatedScale)));
        const normalizedScale = animatedScale / currentOrderOfMagnitude;

        if (scaleType === 'logarithmic') {
            // Logarithmic: discrete tick boundaries
            const baseVisibleCount = Math.min(Math.floor(normalizedScale) + 1, TICK_COUNT);
            return { visibleTickCount: baseVisibleCount, segmentProgress: (normalizedScale - Math.floor(normalizedScale)) };
        } else {
            // Linear: simple math - scale directly maps to tick count
            // Scale 1.0 = 2 ticks (1 segment), Scale 2.0 = 3 ticks (2 segments), etc.
            const visibleTickCount = Math.min(normalizedScale + 1, TICK_COUNT);
            return { visibleTickCount, segmentProgress: normalizedScale - Math.floor(normalizedScale) };
        }
    };

    const { visibleTickCount } = getVisibilityData();

    // Calculate tick positions
    const getTickPositions = () => {
        const positions: number[] = [];

        for (let i = 0; i < TICK_COUNT; i++) {
            if (scaleType === 'logarithmic') {
                // Logarithmic tick positioning
                if (i === 0) {
                    positions.push(0);
                } else if (i === TICK_COUNT - 1) {
                    positions.push(RULER_WIDTH);
                } else {
                    // Logarithmic distribution: each segment gets progressively smaller
                    // First segment is largest, subsequent segments get smaller
                    const segmentIndex = i; // Current segment (0-9)

                    // Calculate cumulative logarithmic position
                    let cumulativePosition = 0;
                    for (let j = 1; j <= segmentIndex; j++) {
                        // Each segment size is proportional to 1/j (logarithmic decay)
                        const segmentWeight = 1 / j;
                        const totalWeight = Array.from({ length: SEGMENT_COUNT }, (_, k) => 1 / (k + 1))
                            .reduce((sum, w) => sum + w, 0);
                        const segmentSize = (RULER_WIDTH * segmentWeight) / totalWeight;

                        // Ensure minimum segment width
                        const actualSegmentSize = Math.max(segmentSize, MIN_LOGARITHMIC_SEGMENT_WIDTH);
                        cumulativePosition += actualSegmentSize;
                    }

                    positions.push(Math.round(cumulativePosition));
                }
            } else {
                // Linear tick positioning: evenly distributed
                positions.push((RULER_WIDTH / SEGMENT_COUNT) * i);
            }
        }

        return positions;
    };

    const tickPositions = getTickPositions();

    // Calculate horizontal line end position (synchronized with dynamic tick)
    const getHorizontalLineEnd = () => {
        // Handle jump over animation
        if (isJumpOverAnimating) {
            // During jump over: scale down to 1 segment width while keeping all ticks visible
            const oneSegmentWidth = RULER_WIDTH / SEGMENT_COUNT; // 11px for one segment
            const minWidth = oneSegmentWidth;
            const maxWidth = RULER_WIDTH;

            // Interpolate between full width and one segment width
            const currentWidth = maxWidth - (jumpOverProgress * (maxWidth - minWidth));
            return currentWidth;
        }

        if (scaleType === 'linear') {
            // Simple linear math: scale * 10px per segment
            const jumpProgress = getJumpOverProgress(scale);
            if (jumpProgress !== null) {
                // Jump over mode
                const lastVisibleTickIndex = Math.floor(visibleTickCount) - 1;
                const progress = visibleTickCount - Math.floor(visibleTickCount);
                if (lastVisibleTickIndex < 0) return 0;
                if (lastVisibleTickIndex >= TICK_COUNT - 1) return RULER_WIDTH;
                const currentTickPos = tickPositions[lastVisibleTickIndex];
                const nextTickPos = tickPositions[lastVisibleTickIndex + 1];
                return currentTickPos + (progress * (nextTickPos - currentTickPos));
            } else {
                // Normal linear mode: +1px per 1% + 1px extra per segment
                const currentOrderOfMagnitude = Math.pow(10, Math.floor(Math.log10(animatedScale)));
                const normalizedScale = animatedScale / currentOrderOfMagnitude;

                // Calculate: scale * 10px (1px per 1%) + Math.floor(scale) * 1px (extra per segment)
                const pixelsForPercentage = normalizedScale * 10; // 1px per 1%
                const pixelsForSegments = Math.floor(normalizedScale); // 1px extra per completed segment
                const totalPixels = pixelsForPercentage + pixelsForSegments;

                return Math.min(totalPixels, RULER_WIDTH);
            }
        } else {
            // Logarithmic: use tick positions
            const lastVisibleTickIndex = Math.floor(visibleTickCount) - 1;
            const progress = visibleTickCount - Math.floor(visibleTickCount);

            if (lastVisibleTickIndex < 0) return 0;
            if (lastVisibleTickIndex >= TICK_COUNT - 1) return RULER_WIDTH;

            const currentTickPos = tickPositions[lastVisibleTickIndex];
            const nextTickPos = tickPositions[lastVisibleTickIndex + 1];

            return currentTickPos + (progress * (nextTickPos - currentTickPos));
        }
    };

    const horizontalLineEnd = getHorizontalLineEnd();

    // Calculate alignment based on scale sign
    const isPositiveScale = animatedScale > 0;

    return (
        <svg
            width={RULER_WIDTH + 1}
            height={rulerThickness}
            viewBox={`0 0 ${RULER_WIDTH} ${rulerThickness}`}
            preserveAspectRatio="xMidYMid meet"
            data-testid="uiruler"
        >
            {/* Starting point label (top-left) */}
            <text
                x={-2.5}
                y={2.5}
                className={styles.label}
                textAnchor="start"
                dominantBaseline="hanging"
                data-testid="uiruler-label"
            >
                <tspan className={styles.textWhite}>1</tspan>
                <tspan className={styles.textGray}>{getDynamicLabel(animatedScale)}</tspan>
            </text>

            {/* Horizontal ruler line (grows progressively) */}
            <line
                x1={isPositiveScale ? 0 - xOffsetTick : RULER_WIDTH - horizontalLineEnd - xOffsetTick}
                y1={rulerThickness - yOffsetRuler}
                x2={isPositiveScale ? horizontalLineEnd - xOffsetTick : RULER_WIDTH - xOffsetTick}
                y2={rulerThickness - yOffsetRuler}
                stroke={colors.gray}
                strokeWidth={sizes.STROKE}
            />

            {/* Tick marks */}
            {Array.from({ length: TICK_COUNT }).map((_, i) => {
                // Only render visible ticks
                if (i >= Math.ceil(visibleTickCount)) return null;

                const tickX = tickPositions[i];
                const tickY = rulerThickness - yOffsetRuler;

                // Calculate tick height and opacity for smooth animation
                let tickLength = 1;
                let opacity = 1;

                if (i === 0) {
                    tickLength = 3; // First tick is always 3px
                } else if (i < Math.floor(visibleTickCount)) {
                    tickLength = 1; // Fully visible ticks
                } else if (i === Math.floor(visibleTickCount)) {
                    // Partially visible tick (smooth transition)
                    const partialProgress = visibleTickCount - Math.floor(visibleTickCount);
                    tickLength = 1 + (partialProgress * 2);
                    opacity = partialProgress;
                }

                const adjustedTickX = isPositiveScale ? tickX : RULER_WIDTH - tickX;

                return (
                    <line
                        key={i}
                        x1={adjustedTickX - xOffsetTick}
                        y1={tickY}
                        x2={adjustedTickX - xOffsetTick}
                        y2={tickY - tickLength}
                        stroke={colors.gray}
                        strokeWidth={sizes.STROKE}
                        opacity={opacity}
                    />
                );
            })}

            {/* Dynamic tick - synchronized with horizontal line end */}
            {visibleTickCount > 2 && visibleTickCount < TICK_COUNT && (
                <line
                    x1={isPositiveScale ? horizontalLineEnd - xOffsetTick : RULER_WIDTH - horizontalLineEnd - xOffsetTick}
                    y1={rulerThickness - yOffsetRuler}
                    x2={isPositiveScale ? horizontalLineEnd - xOffsetTick : RULER_WIDTH - horizontalLineEnd - xOffsetTick}
                    y2={rulerThickness - yOffsetRuler - 1}
                    stroke={colors.gray}
                    strokeWidth={sizes.STROKE}
                    opacity={1}
                />
            )}

            {/* Scale text (bottom-right) */}
            <text
                x={isJumpOverAnimating ? horizontalLineEnd + 1.5 : RULER_WIDTH + 1.5}
                y={rulerThickness - 1.5}
                className={`${styles.scaleText} ${styles.scaleTextGray}`}
                textAnchor="end"
                dominantBaseline="middle"
                data-testid="uiruler-scale-text"
            >
                x {formatDisplayNumber(animatedScale >= 1 ? Math.trunc(animatedScale) : animatedScale)}
            </text>

        </svg>
    );
}