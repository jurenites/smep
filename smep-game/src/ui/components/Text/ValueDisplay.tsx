import { UILabel } from './UILabel';
import { formatValue, type MeasurementType, type DisplayMode } from '../../../formatters/formatValue';
import styles from './ValueDisplay.module.css';

export interface ValueDisplayProps {
    /** Numeric value to display (can include + prefix for positive numbers) */
    value: number | string;
    /** Type of measurement (temperature, distance, energy, custom) */
    measurementType?: MeasurementType;
    /** Custom unit string when measurementType is 'custom' */
    customUnit?: string;
    /** Display mode (full, shortened, scientific) */
    displayMode?: DisplayMode;
    /** Color variant for the value label */
    valueColor?: 'primary' | 'secondary' | 'accent';
    /** Color variant for the unit and exponent labels */
    unitColor?: 'primary' | 'secondary' | 'accent';
    /** Font variant for the value (body, digitSmall, digitBig) */
    valueFontVariant?: 'body' | 'digitSmall' | 'digitBig';
    /** Font variant for the unit labels (body, digitSmall, digitBig) */
    labelFontVariant?: 'body' | 'digitSmall' | 'digitBig';
    /** Whether the display mode can be clicked to cycle through modes */
    clickable?: boolean;
    /** Callback when display mode changes */
    onDisplayModeChange?: (newMode: DisplayMode) => void;
    /** Optional CSS class name */
    className?: string;
}

/**
 * ValueDisplay component
 * Unified display for numeric values with different measurement types and display modes
 * 
 * Display Modes:
 * - Full: Shows every digit with spaces (e.g., "1 234 567.890", "0.00000032")
 * - Shortened: Converts units appropriately (eV→MeV, m→km, etc.)
 * - Scientific: Shows mantissa with order of magnitude (e.g., "1.23·10^6")
 * 
 * Measurement Types:
 * - Temperature: Uses °C units
 * - Distance: Uses m, km, cm, mm units
 * - Energy: Uses eV, keV, MeV, μeV units
 * - Time: Uses sec, hour, day, week, year units
 * - Custom: Uses any custom unit string
 */
export function ValueDisplay({
    value,
    measurementType = 'custom',
    customUnit = "",
    displayMode = 'shortened',
    valueColor = 'primary',
    unitColor = 'secondary',
    valueFontVariant = 'digitBig',
    labelFontVariant = 'body',
    clickable = false,
    onDisplayModeChange,
    className = ''
}: ValueDisplayProps) {
    const formatted = formatValue(value, measurementType, customUnit, displayMode);

    // Split the value to separate the number part from the ·10 part for color styling
    const valueParts = formatted.value.split('·10');
    const numberPart = valueParts[0];
    const hasScientificNotation = valueParts.length > 1;

    // Handle click to cycle through display modes
    const handleClick = () => {
        if (!clickable || !onDisplayModeChange) return;

        const modes: DisplayMode[] = ['full', 'shortened', 'scientific'];
        const currentIndex = modes.indexOf(displayMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        onDisplayModeChange(modes[nextIndex]);
    };

    return (
        <span
            className={`${styles.valueDisplay} ${clickable ? styles.clickable : ''} ${className}`}
            onClick={handleClick}
        >
            <UILabel fontVariant={valueFontVariant} color={valueColor}>{numberPart}</UILabel>
            {hasScientificNotation && (
                <UILabel fontVariant={valueFontVariant} color={unitColor}>·10</UILabel>
            )}
            {formatted.exponent && (
                <UILabel fontVariant="digitSmall" color={unitColor} className={styles.exponent}>
                    {formatted.exponent}
                </UILabel>
            )}
            {formatted.unit && <UILabel fontVariant={labelFontVariant} color={unitColor}> {formatted.unit}</UILabel>}
        </span>
    );
}
