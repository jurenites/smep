/**
 * Value formatter utility
 * Formats numeric values with appropriate units and notation
 */

export type MeasurementType = 'temperature' | 'distance' | 'energy' | 'time' | 'custom';
export type DisplayMode = 'full' | 'shortened' | 'scientific';

export interface FormattedValue {
    /** The formatted value string (includes ·10 part for scientific notation) */
    value: string;
    /** The exponent string for scientific notation (only the power number) */
    exponent: string;
    /** The unit string */
    unit: string;
}

// Universal metric prefix system
interface MetricPrefix {
    symbol: string;
    multiplier: number;
}

const METRIC_PREFIXES: MetricPrefix[] = [
    // Large prefixes
    { symbol: 'Y', multiplier: 1e24 },   // Yotta
    { symbol: 'Z', multiplier: 1e21 },   // Zetta
    { symbol: 'E', multiplier: 1e18 },   // Exa
    { symbol: 'P', multiplier: 1e15 },   // Peta
    { symbol: 'T', multiplier: 1e12 },   // Tera
    { symbol: 'G', multiplier: 1e9 },    // Giga
    { symbol: 'M', multiplier: 1e6 },    // Mega
    { symbol: 'k', multiplier: 1e3 },    // Kilo

    // Small prefixes
    { symbol: 'm', multiplier: 1e-3 },   // milli
    { symbol: 'μ', multiplier: 1e-6 },   // micro
    { symbol: 'n', multiplier: 1e-9 },   // nano
    { symbol: 'p', multiplier: 1e-12 },  // pico
    { symbol: 'f', multiplier: 1e-15 },  // femto
    { symbol: 'a', multiplier: 1e-18 },  // atto
    { symbol: 'z', multiplier: 1e-21 },  // zepto
    { symbol: 'y', multiplier: 1e-24 },  // yocto
];

/**
 * Finds the best metric prefix for a given value
 * @param value - The numeric value
 * @returns Object with the best prefix and adjusted value
 */
function findBestMetricPrefix(value: number): { prefix: MetricPrefix | null; adjustedValue: number } {
    const absValue = Math.abs(value);

    // Find the largest prefix where the adjusted value would be >= 1
    for (const prefix of METRIC_PREFIXES) {
        const adjustedValue = absValue / prefix.multiplier;
        if (adjustedValue >= 1 && adjustedValue < 1000) {
            return { prefix, adjustedValue: value / prefix.multiplier };
        }
    }

    // If no prefix found, return original value
    return { prefix: null, adjustedValue: value };
}

/**
 * Formats numeric values for display with different modes and measurement types
 * @param value - Numeric value to format (can be number or string with + prefix)
 * @param measurementType - Type of measurement (temperature, distance, energy, custom)
 * @param customUnit - Custom unit string when measurementType is 'custom'
 * @param displayMode - Display mode (full, shortened, scientific)
 * @returns Formatted value object with value, exponent, and unit
 */
export function formatValue(
    value: number | string,
    measurementType: MeasurementType = 'custom',
    customUnit: string = "",
    displayMode: DisplayMode = 'shortened'
): FormattedValue {
    // Check if value has a manually added plus sign
    const valueString = String(value);
    const hasManualPlus = valueString.startsWith('+');

    // Convert to number for calculations
    const numericValue = typeof value === 'number' ? value : parseFloat(valueString);

    // Handle edge cases
    if (!isFinite(numericValue) || numericValue === 0) {
        const unit = getUnitForType(measurementType, customUnit);
        const displayValue = hasManualPlus && numericValue !== 0 ? "+0" : "0";
        return { value: displayValue, exponent: "", unit };
    }

    let result: FormattedValue;
    switch (displayMode) {
        case 'full':
            result = formatFullDisplay(numericValue, measurementType, customUnit, displayMode);
            break;
        case 'shortened':
            result = formatShortenedDisplay(numericValue, measurementType, customUnit, displayMode);
            break;
        case 'scientific':
            result = formatScientificDisplay(numericValue, measurementType, customUnit, displayMode);
            break;
        default:
            result = formatShortenedDisplay(numericValue, measurementType, customUnit, displayMode);
    }

    // Add plus sign if it was manually specified
    if (hasManualPlus && numericValue > 0) {
        result.value = '+' + result.value;
    }

    return result;
}

function getUnitForType(measurementType: MeasurementType, customUnit: string): string {
    switch (measurementType) {
        case 'temperature': return '°C';
        case 'distance': return 'm';
        case 'energy': return 'eV';
        case 'time': return 'sec';
        case 'custom': return customUnit;
        default: return customUnit;
    }
}

function formatTimeDisplay(value: number, displayMode: DisplayMode): FormattedValue {
    const absValue = Math.abs(value);
    const isNegative = value < 0;
    const sign = isNegative ? '-' : '';


    // Time conversion constants
    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_MONTH = 2628000; // 30.44 days average
    const SECONDS_IN_YEAR = 31536000; // 365 days

    // Full mode: "100 000sec"
    if (displayMode === 'full') {
        const formattedValue = Math.floor(absValue).toLocaleString('en-US').replace(/,/g, ' ');
        return { value: `${sign}${formattedValue}`, exponent: "", unit: 'sec' };
    }

    // Shortened mode: "1y 2m 3d 1h 2m 35s"
    if (displayMode === 'shortened') {
        const years = Math.floor(absValue / SECONDS_IN_YEAR);
        const remainingAfterYears = absValue % SECONDS_IN_YEAR;

        const months = Math.floor(remainingAfterYears / SECONDS_IN_MONTH);
        const remainingAfterMonths = remainingAfterYears % SECONDS_IN_MONTH;

        const days = Math.floor(remainingAfterMonths / SECONDS_IN_DAY);
        const remainingAfterDays = remainingAfterMonths % SECONDS_IN_DAY;

        const hours = Math.floor(remainingAfterDays / SECONDS_IN_HOUR);
        const remainingAfterHours = remainingAfterDays % SECONDS_IN_HOUR;

        const minutes = Math.floor(remainingAfterHours / SECONDS_IN_MINUTE);
        const seconds = Math.floor(remainingAfterHours % SECONDS_IN_MINUTE);

        const parts: string[] = [];
        if (years > 0) parts.push(`${years}y`);
        if (months > 0) parts.push(`${months}mo`);
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (seconds > 0) parts.push(`${seconds}s`);

        return { value: `${sign}${parts.join(' ')}`, exponent: "", unit: '' };
    }

    // For minutes:seconds format (31:40)
    if (absValue >= SECONDS_IN_MINUTE && absValue < SECONDS_IN_HOUR) {
        const minutes = Math.floor(absValue / SECONDS_IN_MINUTE);
        const seconds = Math.floor(absValue % SECONDS_IN_MINUTE);
        return { value: `${sign}${minutes}:${seconds.toString().padStart(2, '0')}`, exponent: "", unit: '' };
    }

    // For hours:minutes format (2:45)
    if (absValue >= SECONDS_IN_HOUR && absValue < SECONDS_IN_DAY) {
        const hours = Math.floor(absValue / SECONDS_IN_HOUR);
        const minutes = Math.floor((absValue % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
        return { value: `${sign}${hours}:${minutes.toString().padStart(2, '0')}`, exponent: "", unit: '' };
    }

    // For days:hours format (3:12)
    if (absValue >= SECONDS_IN_DAY) {
        const days = Math.floor(absValue / SECONDS_IN_DAY);
        const hours = Math.floor((absValue % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
        return { value: `${sign}${days}:${hours.toString().padStart(2, '0')}`, exponent: "", unit: '' };
    }

    // Fallback (should not happen)
    return { value: `${sign}${Math.floor(absValue)}`, exponent: "", unit: 'sec' };
}

function formatFullDisplay(value: number, measurementType: MeasurementType, customUnit: string, displayMode: DisplayMode): FormattedValue {
    // Handle time conversion specially
    if (measurementType === 'time') {
        return formatTimeDisplay(value, displayMode);
    }

    const unit = getUnitForType(measurementType, customUnit);

    // For very small values, show all digits including leading zeros with space delimiters
    if (Math.abs(value) < 1 && value !== 0) {
        // Use toFixed with a large number of decimal places
        let formattedValue = value.toFixed(18).replace(/\.?0+$/, '');

        // Add space delimiters to decimal places (every 3 digits after decimal point)
        if (formattedValue.includes('.')) {
            const [integerPart, decimalPart] = formattedValue.split('.');
            // Group decimal digits in groups of 3
            const groupedDecimal = decimalPart.replace(/(\d{3})(?=\d)/g, '$1 ');
            formattedValue = `${integerPart}.${groupedDecimal}`;
        }

        return { value: formattedValue, exponent: "", unit };
    }

    // For larger values, show every digit with spaces for thousands
    const formattedValue = value.toLocaleString('en-US', {
        maximumFractionDigits: 12,
        minimumFractionDigits: 0,
        useGrouping: true
    }).replace(/,/g, ' ');

    return { value: formattedValue, exponent: "", unit };
}

function formatShortenedDisplay(value: number, measurementType: MeasurementType, customUnit: string, displayMode: DisplayMode): FormattedValue {
    const baseUnit = getUnitForType(measurementType, customUnit);

    // Handle time conversion specially
    if (measurementType === 'time') {
        return formatTimeDisplay(value, displayMode);
    }

    // Find the best metric prefix for this value
    const { prefix, adjustedValue } = findBestMetricPrefix(value);

    // Build the unit string
    let unit = baseUnit;
    if (prefix) {
        unit = prefix.symbol + baseUnit;
    }

    // Format the display value with space delimiters
    let formattedValue: string;
    if (Math.abs(adjustedValue) >= 100) {
        formattedValue = adjustedValue.toFixed(1);
    } else if (Math.abs(adjustedValue) >= 10) {
        formattedValue = adjustedValue.toFixed(2);
    } else {
        formattedValue = adjustedValue.toFixed(3);
    }

    // Add space delimiters for thousands and decimals
    formattedValue = parseFloat(formattedValue).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    }).replace(/,/g, ' ');

    // Add space delimiters to decimal places if they exist
    if (formattedValue.includes('.')) {
        const [integerPart, decimalPart] = formattedValue.split('.');
        // Group decimal digits in groups of 3
        const groupedDecimal = decimalPart.replace(/(\d{3})(?=\d)/g, '$1 ');
        formattedValue = `${integerPart}.${groupedDecimal}`;
    }

    return { value: formattedValue, exponent: "", unit };
}

function formatScientificDisplay(value: number, measurementType: MeasurementType, customUnit: string, displayMode: DisplayMode): FormattedValue {
    // Handle time conversion specially
    if (measurementType === 'time') {
        return formatTimeDisplay(value, displayMode);
    }

    const unit = getUnitForType(measurementType, customUnit);

    // Calculate the order of magnitude
    const orderOfMagnitude = Math.floor(Math.log10(Math.abs(value)));

    // Clamp the exponent to a reasonable range (-40 to +40)
    const clampedExponent = Math.max(-40, Math.min(40, orderOfMagnitude));

    // Calculate the mantissa
    const mantissa = value / Math.pow(10, clampedExponent);

    // Format the mantissa with appropriate decimal places and space delimiters
    let formattedMantissa: string;
    if (Math.abs(mantissa) >= 10) {
        formattedMantissa = mantissa.toFixed(1);
    } else if (Math.abs(mantissa) >= 1) {
        formattedMantissa = mantissa.toFixed(2);
    } else {
        formattedMantissa = mantissa.toFixed(3);
    }

    // Add space delimiters for thousands and decimals
    formattedMantissa = parseFloat(formattedMantissa).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    }).replace(/,/g, ' ');

    // Add space delimiters to decimal places if they exist
    if (formattedMantissa.includes('.')) {
        const [integerPart, decimalPart] = formattedMantissa.split('.');
        // Group decimal digits in groups of 3
        const groupedDecimal = decimalPart.replace(/(\d{3})(?=\d)/g, '$1 ');
        formattedMantissa = `${integerPart}.${groupedDecimal}`;
    }

    // Create the value string (mantissa + ·10) and exponent string (only the power)
    let valueString = formattedMantissa;
    let exponentString = "";

    if (clampedExponent !== 0) {
        valueString = `${formattedMantissa}·10`;
        // Add plus sign for positive exponents
        exponentString = clampedExponent > 0 ? `+${clampedExponent}` : `${clampedExponent}`;
    }

    return {
        value: valueString,
        exponent: exponentString,
        unit
    };
}
