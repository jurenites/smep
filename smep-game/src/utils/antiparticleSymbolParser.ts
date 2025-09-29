/**
 * Antiparticle Symbol Parser
 * 
 * Parses particle symbols to identify which characters need antiparticle bars.
 * Handles complex symbols with multiple characters and modifiers.
 */

export interface ParsedSymbol {
    baseChar: string;
    modifier?: string;
    needsBar: boolean;
}

/**
 * Parses a particle symbol to identify the base character that needs an antiparticle bar
 * @param symbol - The particle symbol (e.g., "μ⁺", "β⁺", "τ⁺")
 * @param isAntiparticle - Whether this is an antiparticle
 * @returns ParsedSymbol object with base character and modifier
 */
export function parseAntiparticleSymbol(symbol: string, isAntiparticle: boolean): ParsedSymbol {
    if (!isAntiparticle || !symbol) {
        return {
            baseChar: symbol,
            needsBar: false
        };
    }

    // Common patterns for antiparticle symbols:
    // - Single character: "u", "d", "c", "s", "t", "b"
    // - Character with charge: "μ⁺", "β⁺", "τ⁺", "e⁻"
    // - Character with other modifiers: "νè", "νμ", "νî"

    // For symbols with charge indicators (⁺, ⁻, ⁰), the bar goes over the base character
    const chargePattern = /^([^⁺⁻⁰]+)([⁺⁻⁰]+)$/;
    const chargeMatch = symbol.match(chargePattern);

    if (chargeMatch) {
        return {
            baseChar: chargeMatch[1],
            modifier: chargeMatch[2],
            needsBar: true
        };
    }

    // For symbols with superscript/subscript modifiers
    const modifierPattern = /^([a-zA-Zα-ωΑ-Ω])([^a-zA-Zα-ωΑ-Ω]+)$/;
    const modifierMatch = symbol.match(modifierPattern);

    if (modifierMatch) {
        return {
            baseChar: modifierMatch[1],
            modifier: modifierMatch[2],
            needsBar: true
        };
    }

    // For single character symbols, the bar goes over the entire character
    if (symbol.length === 1) {
        return {
            baseChar: symbol,
            needsBar: true
        };
    }

    // For complex symbols, default to bar over first character
    return {
        baseChar: symbol.charAt(0),
        modifier: symbol.slice(1),
        needsBar: true
    };
}

/**
 * Creates HTML string with proper antiparticle bar positioning
 * @param symbol - The particle symbol
 * @param isAntiparticle - Whether this is an antiparticle
 * @param classCustomName - Additional CSS class
 * @returns HTML string with parsed symbol structure
 */
export function createAntiparticleSymbolHTML(
    symbol: string,
    isAntiparticle: boolean,
    classCustomName: string = ''
): string {
    const parsed = parseAntiparticleSymbol(symbol, isAntiparticle);

    if (!parsed.needsBar) {
        return `<span class="${classCustomName}">${symbol}</span>`;
    }

    const modifierHTML = parsed.modifier
        ? `<span class="antiparticle-modifier">${parsed.modifier}</span>`
        : '';

    return `<span class="antiparticle-symbol ${classCustomName}">
        <span class="antiparticle-base">${parsed.baseChar}</span>
        ${modifierHTML}
    </span>`;
}

/**
 * Test cases for the parser
 */
export const testCases = [
    { symbol: 'μ⁺', isAntiparticle: true, expected: { baseChar: 'μ', modifier: '⁺', needsBar: true } },
    { symbol: 'β⁺', isAntiparticle: true, expected: { baseChar: 'β', modifier: '⁺', needsBar: true } },
    { symbol: 'τ⁺', isAntiparticle: true, expected: { baseChar: 'τ', modifier: '⁺', needsBar: true } },
    { symbol: 'e⁻', isAntiparticle: false, expected: { baseChar: 'e⁻', needsBar: false } },
    { symbol: 'u', isAntiparticle: true, expected: { baseChar: 'u', needsBar: true } },
    { symbol: 'νè', isAntiparticle: true, expected: { baseChar: 'ν', modifier: 'è', needsBar: true } },
    { symbol: 'νμ', isAntiparticle: true, expected: { baseChar: 'ν', modifier: 'μ', needsBar: true } },
];
