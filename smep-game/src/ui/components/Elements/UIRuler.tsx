import { TOKENS } from '../../tokens/tokens';
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
    const s = TOKENS.sizes;
    const c = TOKENS.colors;


    // Calculate dynamic label based on scale
    const getDynamicLabel = (scale: number) => {
        // Determine the appropriate unit based on scale
        if (scale >= 1e18) return 'Em'; // Exa meter 1km * (10^12)
        if (scale >= 1e15) return 'Pm';  // Peta meter 1km * (10^9)
        if (scale >= 1e12) return 'Tm';  // Tera meter 1km * (10^6)
        if (scale >= 1e9) return 'Gm';  // Giga meter 1km * (10^6)
        if (scale >= 1e6) return 'Mm';  // Mega meter 1km * (10^3)
        if (scale >= 1e3) return 'km';  // Giga meter (10^3)
        if (scale >= 1) return 'm';
        if (scale >= 1e-1) return 'dm'; // decimeter meter (10^-1)
        if (scale >= 1e-3) return 'cm'; // centi meter (10^-1)
        if (scale >= 1e-6) return 'mm'; // milli meter (10^-1)
        if (scale >= 1e-9) return 'μm'; // micro meter (10^-1)
        if (scale >= 1e-12) return 'nm'; // nano meter (10^-1)
        if (scale >= 1e-15) return 'pm'; // pico meter (10^-1)
        if (scale >= 1e-18) return 'fm'; // femto meter (10^-1)
        if (scale >= 1e-21) return 'am'; // atto meter (10^-1)
        if (scale >= 1e-24) return 'zm'; // zepto meter (10^-1)
        if (scale >= 1e-27) return 'ym'; // yocto meter (10^-1)
        return 'm'; // Base meter
    };

    // Default width from tokens
    const width = s.TAB_W; // 109px
    const rulerLength = width;
    const rulerThickness = 20;

    // Calculate zoom-based tick visibility with smooth animation
    const getVisibleTicks = (scale: number) => {
        // Both linear and logarithmic scales have jump over behavior
        // Jump over ranges: 10.01-100.0, 100.01-1000.0, 1000.01-10000.0, etc.
        const log10Scale = Math.log10(scale);
        const log10ScaleInt = Math.floor(log10Scale);
        const log10ScaleDecimal = log10Scale - log10ScaleInt;

        // Check if we're in a jump over range (when log10 scale is between 1.001 and 2.0)
        if (log10ScaleDecimal >= 0.001 && log10ScaleDecimal < 1.0) {
            // We're in a jump over range - both scale types show progressive ticks from 2 to 10
            const jumpProgress = (log10ScaleDecimal - 0.001) / 0.999; // 0 to 1
            return 2 + (jumpProgress * 8); // 2 to 10 ticks
        }

        // Normal scale behavior - make it truly gradual
        // For both scale types, we work within the current order of magnitude
        const currentOrderOfMagnitude = Math.pow(10, log10ScaleInt);
        const normalizedScale = scale / currentOrderOfMagnitude;
        const normalizedScaleInt = Math.floor(normalizedScale);
        const remainder = normalizedScaleInt % 10;

        // Calculate base visible count
        let baseVisibleCount = 2; // Always show at least first and second tick

        if (remainder === 0) {
            baseVisibleCount = 10; // Show all ticks at order of magnitude boundaries
        } else {
            baseVisibleCount = Math.min(remainder + 1, 10); // Progressive visibility
        }

        // Add smooth transition for the next tick - make it gradual from 0.0 to 1.0
        if (remainder !== 0 && baseVisibleCount < 10) {
            // Use the full decimal part for smooth transition
            return baseVisibleCount + (normalizedScale - normalizedScaleInt);
        }

        return baseVisibleCount;
    };

    const visibleTickCount = getVisibleTicks(scale);

    // Calculate line start and end positions based on visible ticks
    const getLineBounds = () => {
        if (visibleTickCount < 2) return { start: 0, end: rulerLength };

        const firstTickX = 0;

        // Calculate the exact position of the last visible tick (including partial visibility)
        let lastTickX: number;
        if (scaleType === 'logarithmic') {
            // For logarithmic scale, calculate position using log10
            const logValue = Math.log10(visibleTickCount);
            const maxLogValue = Math.log10(10); // log10(10) = 1
            lastTickX = Math.round(rulerLength * (logValue / maxLogValue));
        } else {
            // For linear scale, use even distribution with smooth interpolation
            lastTickX = (rulerLength / 9) * (visibleTickCount - 1);
        }

        return { start: firstTickX, end: lastTickX };
    };

    const lineBounds = getLineBounds();

    return (
        <svg
            width={width}
            height={rulerThickness}
            viewBox={`0 0 ${width} ${rulerThickness}`}
            preserveAspectRatio="xMidYMid meet"
            data-testid="uiruler"
        >
            {/* Starting point label (top-left) */}
            <text
                x={2}
                y={8}
                fill={c.white}
                className={styles.label}
                textAnchor="start"
                dominantBaseline="middle"
            >
                <tspan fill={c.white}>1</tspan>
                <tspan fill={c.gray}>{getDynamicLabel(scale)}</tspan>
            </text>

            {/* Ruler line (clipped to visible ticks) */}
            <line
                x1={lineBounds.start}
                y1={rulerThickness - 1}
                x2={lineBounds.end}
                y2={rulerThickness - 1}
                stroke={c.gray}
                strokeWidth={s.STROKE}
            />

            {/* Scale text (bottom-right) */}
            <text
                x={rulerLength - 5}
                y={rulerThickness - 5}
                fill={c.white}
                className={styles.scaleText}
                textAnchor="end"
                dominantBaseline="middle"
            >
                x {Math.round(scale)}
            </text>

            {/* Tick marks */}
            {Array.from({ length: 10 }).map((_, i) => {
                // Only render visible ticks based on zoom level
                if (i >= Math.ceil(visibleTickCount)) return null;

                // Calculate tick position based on scale type
                let tickX: number;
                if (scaleType === 'logarithmic') {
                    // Logarithmic scale: use proper logarithmic spacing
                    // Calculate position using log10 of (i + 1) to get proper logarithmic distribution
                    const logValue = Math.log10(i + 1);
                    const maxLogValue = Math.log10(10); // log10(10) = 1
                    tickX = Math.round(rulerLength * (logValue / maxLogValue));
                } else {
                    // Linear scale: distribute ticks evenly
                    tickX = (rulerLength / 9) * i;
                }

                const tickY = rulerThickness - 1;

                // Handle smooth animation for all ticks
                let tickLength = 1; // Default tick length
                let opacity = 1;

                if (i === 0) {
                    tickLength = 3; // First tick is always 3px
                } else if (i < Math.floor(visibleTickCount)) {
                    // Fully visible ticks
                    tickLength = 1;
                } else if (i === Math.floor(visibleTickCount)) {
                    // Partially visible tick (smooth transition)
                    const partialProgress = visibleTickCount - Math.floor(visibleTickCount);
                    tickLength = 1 + (partialProgress * 2); // Animate from 1px to 3px
                    opacity = partialProgress;
                }

                return (
                    <line
                        key={i}
                        x1={tickX}
                        y1={tickY}
                        x2={tickX}
                        y2={tickY - tickLength}
                        stroke={c.gray}
                        strokeWidth={s.STROKE}
                        opacity={opacity}
                    />
                );
            })}

            {/* Dynamic tick - follows the growing edge */}
            {visibleTickCount > 2 && visibleTickCount < 10 && (
                <line
                    x1={lineBounds.end}
                    y1={rulerThickness - 1}
                    x2={lineBounds.end}
                    y2={rulerThickness - 2}
                    stroke={c.gray}
                    strokeWidth={s.STROKE}
                    opacity={1}
                />
            )}
        </svg>
    );
}
