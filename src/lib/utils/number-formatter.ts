/**
 * Universal number formatter utility
 * Formats numbers with thousands separators and other formatting options
 */

export interface NumberFormatterOptions {
    /** Use thousands separator (space by default) */
    useThousandsSeparator?: boolean;
    /** Custom thousands separator character */
    thousandsSeparator?: string;
    /** Number of decimal places */
    decimalPlaces?: number;
    /** Whether to show decimal places for whole numbers */
    showDecimalsForWhole?: boolean;
    /** Prefix to add before the number */
    prefix?: string;
    /** Suffix to add after the number */
    suffix?: string;
}

/**
 * Formats a number with thousands separators and other options
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export function formatNumber(value: number, options: NumberFormatterOptions = {}): string {
    const {
        useThousandsSeparator = true,
        thousandsSeparator = ' ',
        decimalPlaces = 0,
        showDecimalsForWhole = false,
        prefix = '',
        suffix = ''
    } = options;

    // Handle special cases
    if (value === 0) {
        return `${prefix}0${suffix}`;
    }

    if (!isFinite(value)) {
        return `${prefix}${value}${suffix}`;
    }

    // Round to specified decimal places
    const roundedValue = Math.round(value * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

    // Check if it's a whole number
    const isWholeNumber = roundedValue % 1 === 0;

    // Format decimal places
    let formattedValue: string;
    if (decimalPlaces > 0 && (!isWholeNumber || showDecimalsForWhole)) {
        formattedValue = roundedValue.toFixed(decimalPlaces);
    } else {
        formattedValue = Math.round(roundedValue).toString();
    }

    // Add thousands separators
    if (useThousandsSeparator) {
        const parts = formattedValue.split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];

        // Add thousands separators to integer part
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

        // Reconstruct the number
        formattedValue = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    }

    return `${prefix}${formattedValue}${suffix}`;
}

/**
 * Formats a number for display in UI components (default formatting)
 * @param value - The number to format
 * @returns Formatted number string with space thousands separators
 */
export function formatDisplayNumber(value: number): string {
    return formatNumber(value, {
        useThousandsSeparator: true,
        thousandsSeparator: ' ',
        decimalPlaces: 0,
        showDecimalsForWhole: false
    });
}

/**
 * Formats a number for currency display
 * @param value - The number to format
 * @param currency - Currency symbol (default: '$')
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string = '$'): string {
    return formatNumber(value, {
        useThousandsSeparator: true,
        thousandsSeparator: ' ',
        decimalPlaces: 2,
        showDecimalsForWhole: false,
        prefix: currency
    });
}

/**
 * Formats a number for percentage display
 * @param value - The number to format (0-100)
 * @param decimalPlaces - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimalPlaces: number = 1): string {
    return formatNumber(value, {
        useThousandsSeparator: true,
        thousandsSeparator: ' ',
        decimalPlaces,
        showDecimalsForWhole: false,
        suffix: '%'
    });
}
