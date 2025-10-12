import React from 'react';
import { parseAntiparticleSymbol } from '../../../utils/antiparticleSymbolParser';
import styles from './AntiparticleSymbol.module.css';

export interface AntiparticleSymbolProps {
    /** The particle symbol to display */
    symbol: string;
    /** Whether this is an antiparticle */
    isAntiparticle: boolean;
    /** Additional CSS class name */
    className?: string;
    /** Click handler */
    onClick?: () => void;
    /** Whether the symbol is interactive */
    interactive?: boolean;
}

/**
 * AntiparticleSymbol Component
 * 
 * Displays particle symbols with proper antiparticle bar positioning.
 * The bar is positioned above individual characters, not the entire string.
 * 
 * Examples:
 * - "μ⁺" → bar over "μ" only
 * - "β⁺" → bar over "β" only
 * - "u" → bar over "u"
 */
export function AntiparticleSymbol({
    symbol,
    isAntiparticle,
    className = '',
    onClick,
    interactive = false
}: AntiparticleSymbolProps) {
    const parsed = parseAntiparticleSymbol(symbol, isAntiparticle);

    // If no bar is needed, return simple span
    if (!parsed.needsBar) {
        return (
            <span
                className={className}
                onClick={onClick}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
            >
                {symbol}
            </span>
        );
    }

    // Create structured symbol with character-level bar
    return (
        <span
            className={`${styles.antiparticleSymbol} ${className}`}
            onClick={onClick}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
        >
            <span className={styles.antiparticleBase}>
                {parsed.baseChar}
            </span>
            {parsed.modifier && (
                <span className={styles.antiparticleModifier}>
                    {parsed.modifier}
                </span>
            )}
        </span>
    );
}

/**
 * Hook for using antiparticle symbol parsing in other components
 */
export function useAntiparticleSymbol(symbol: string, isAntiparticle: boolean) {
    return parseAntiparticleSymbol(symbol, isAntiparticle);
}
