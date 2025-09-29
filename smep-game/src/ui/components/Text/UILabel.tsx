import React from 'react';
import styles from './UILabel.module.css';
import { AntiparticleSymbol } from './AntiparticleSymbol';

/**
 * UNICODE character mapping for capital letters in body font variant
 * Maps standard ASCII capital letters to special UNICODE characters
 */
const UNICODE_CHAR_MAP: Record<string, string> = {
    'A': 'Ā',  // Latin Capital Letter A with Macron
    'B': 'Ɓ',  // Latin Capital Letter B with Hook
    'C': 'Ć',  // Latin Capital Letter C with Acute
    'D': 'Ď',  // Latin Capital Letter D with Caron
    'E': 'Ē',  // Latin Capital Letter E with Macron
    'F': 'Ƒ',  // Latin Capital Letter F with Hook
    'G': 'Ĝ',  // Latin Capital Letter G with Circumflex
    'H': 'Ĥ',  // Latin Capital Letter H with Circumflex
    'I': 'Ī',  // Latin Capital Letter I with Macron
    'J': 'Ĵ',  // Latin Capital Letter J with Circumflex
    'K': 'Ķ',  // Latin Capital Letter K with Cedilla
    'L': 'Ĺ',  // Latin Capital Letter L with Acute
    'M': 'Ɯ',  // Latin Capital Letter Turned M
    'N': 'Ň',  // Latin Capital Letter N with Caron
    'O': 'Ǒ',  // Latin Capital Letter O with Caron
    'P': 'Ƥ',  // Latin Capital Letter P with Hook
    'Q': 'Ǫ',  // Latin Capital Letter O with Ogonek
    'R': 'Ʀ',  // Latin Capital Letter Yr
    'S': 'Ś',  // Latin Capital Letter S with Acute
    'T': 'Ţ',  // Latin Capital Letter T with Cedilla
    'U': 'Ũ',  // Latin Capital Letter U with Tilde
    'V': 'Ѵ',  // Cyrillic Capital Letter Izhitsa
    'W': 'Ŵ',  // Latin Capital Letter W with Circumflex
    'X': 'Х',  // Cyrillic Capital Letter Ha
    'Y': 'Ŷ',  // Latin Capital Letter Y with Circumflex
    'Z': 'Ź',  // Latin Capital Letter Z with Acute
};

/**
 * Greek letter mapping for body font variant
 * Maps Greek capital letters to special UNICODE characters
 * Based on the provided mapping: ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ → ĀƁГĐĒŹĤƟĨĸɅМŇ≡ƠПƤƩŢŶɸХѰΏ
 */
const GREEK_CHAR_MAP: Record<string, string> = {
    'Α': 'Ā',  // Alpha → Latin Capital Letter A with Macron
    'Β': 'Ɓ',  // Beta → Latin Capital Letter B with Hook
    'Γ': 'Г',  // Gamma → Cyrillic Capital Letter Ghe
    'Δ': 'Đ',  // Delta → Latin Capital Letter D with Stroke
    'Ε': 'Ē',  // Epsilon → Latin Capital Letter E with Macron
    'Ζ': 'Ź',  // Zeta → Latin Capital Letter Z with Acute
    'Η': 'Ĥ',  // Eta → Latin Capital Letter H with Circumflex
    'Θ': 'Ɵ',  // Theta → Latin Capital Letter O with Middle Tilde
    'Ι': 'Ĩ',  // Iota → Latin Capital Letter I with Tilde
    'Κ': 'ĸ',  // Kappa → Latin Small Letter Kra
    'Λ': 'Ʌ',  // Lambda → Latin Capital Letter Turned V
    'Μ': 'М',  // Mu → Cyrillic Capital Letter Em
    'Ν': 'Ň',  // Nu → Latin Capital Letter N with Caron
    'Ξ': '≡',  // Xi → Identical To
    'Ο': 'Ơ',  // Omicron → Latin Capital Letter O with Horn
    'Π': 'П',  // Pi → Cyrillic Capital Letter Pe
    'Ρ': 'Ƥ',  // Rho → Latin Capital Letter P with Hook
    'Σ': 'Ʃ',  // Sigma → Latin Capital Letter Esh
    'Τ': 'Ţ',  // Tau → Latin Capital Letter T with Cedilla
    'Υ': 'Ŷ',  // Upsilon → Latin Capital Letter Y with Circumflex
    'Φ': 'ɸ',  // Phi → Latin Small Letter Phi
    'Χ': 'Х',  // Chi → Cyrillic Capital Letter Ha
    'Ψ': 'Ѱ',  // Psi → Cyrillic Capital Letter Psi
    'Ω': 'Ώ',  // Omega → Greek Capital Letter Omega with Tonos
};

// Single source of truth for colors
const COLOR_VALUES = ['white', 'gray', 'dark-gray', 'yolk', 'black'] as const;

// Single source of truth for fonts
const FONT_VALUES = ['title', 'body', 'digitBig', 'digitSmall', 'code'] as const;

// Generate types from the values
export type ColorList = typeof COLOR_VALUES[number];
export type FontList = typeof FONT_VALUES[number];

// Export arrays for Storybook and other uses
export const COLOR_OPTIONS: readonly ColorList[] = COLOR_VALUES;
export const FONT_OPTIONS: readonly FontList[] = FONT_VALUES;

// Generate color object from the values
export const ColorList = COLOR_VALUES.reduce((acc, color) => {
    const key = color === 'dark-gray' ? 'darkGray' : color;
    acc[key] = color;
    return acc;
}, {} as Record<string, ColorList>);

/**
 * Transforms text by replacing capital letters with UNICODE characters
 * Handles both Latin (A-Z) and Greek capital letters
 * @param text - The input text to transform
 * @returns The transformed text with UNICODE characters
 */
function transformTextWithUnicode(text: string): string {
    // First transform Latin capital letters (A-Z)
    let transformedText = text.replace(/[A-Z]/g, (char) => UNICODE_CHAR_MAP[char] || char);

    // Then transform Greek capital letters
    transformedText = transformedText.replace(/[ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ]/g, (char) => GREEK_CHAR_MAP[char] || char);

    return transformedText;
}

export interface UILabelProps {
    /** Text content to display */
    children: React.ReactNode;
    /** Font variant to use */
    fontVariant?: FontList;
    /** Text color variant */
    color?: ColorList;
    /** Optional CSS class name */
    className?: string;
    /** Whether this is an antiparticle symbol (enables character-level bar positioning) */
    isAntiparticle?: boolean;
}

export function UILabel({
    children,
    fontVariant = 'body',
    color = 'white',
    className = '',
    isAntiparticle = false
}: UILabelProps) {
    // Build CSS classes
    const cssClasses = [
        styles.label,
        styles[`font${fontVariant.charAt(0).toUpperCase() + fontVariant.slice(1)}`],
        styles[`color-${color}`],
        className
    ].filter(Boolean).join(' ');

    // Transform text content for body font variant
    const getDisplayContent = (): React.ReactNode => {
        if (typeof children === 'string') {
            // Apply UNICODE transformation for body font variant
            if (fontVariant === 'body') {
                return transformTextWithUnicode(children);
            }
            return children;
        }
        return children;
    };

    // If this is an antiparticle symbol, use the AntiparticleSymbol component
    if (isAntiparticle && typeof children === 'string') {
        return (
            <span className={cssClasses}>
                <AntiparticleSymbol
                    symbol={children}
                    isAntiparticle={isAntiparticle}
                />
            </span>
        );
    }

    return (
        <span className={cssClasses}>
            {getDisplayContent()}
        </span>
    );
}
