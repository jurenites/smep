// Periodic Table Mapper - Connects atomic data with display coordinates
// This layer combines atomic information with display positioning

import type { AtomicElement } from './periodic-table-layouts';
import { ALL_ATOMIC_ELEMENTS, getLayoutByName, getElementPosition } from './periodic-table-layouts';

export interface PeriodicElement {
    symbol: string;
    atomicNumber: number;
    name: string;
    position: { x: number; y: number };
    category: 'alkali-metal' | 'alkaline-earth' | 'transition-metal' | 'post-transition-metal' |
    'metalloid' | 'nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide' | 'unknown';
    electronShellGroup: 's' | 'p' | 'd' | 'f';
    period: number;
}

export interface PeriodicTableData {
    elements: PeriodicElement[];
    dimensions: { width: number; height: number };
    layoutName: string;
}

/**
 * Maps atomic data to display coordinates for a specific layout
 */
export function mapAtomicDataToLayout(layoutName: string): PeriodicTableData {
    const layout = getLayoutByName(layoutName);
    if (!layout) {
        throw new Error(`Layout '${layoutName}' not found`);
    }

    const elements: PeriodicElement[] = [];

    // Map each atomic element to its display position
    for (const atomicElement of ALL_ATOMIC_ELEMENTS) {
        const displayPosition = getElementPosition(layoutName, atomicElement.symbol);

        if (displayPosition) {
            elements.push({
                symbol: atomicElement.symbol,
                atomicNumber: atomicElement.atomicNumber,
                name: atomicElement.name,
                position: displayPosition,
                category: atomicElement.category,
                electronShellGroup: atomicElement.electronShellGroup,
                period: atomicElement.period,
            });
        }
    }

    return {
        elements,
        dimensions: layout.totalDimensions,
        layoutName,
    };
}

/**
 * Gets elements for a specific block in a specific layout
 */
export function getBlockElements(layoutName: string, blockName: 's' | 'p' | 'd' | 'f'): PeriodicElement[] {
    const layout = getLayoutByName(layoutName);
    if (!layout) return [];

    const block = layout.blocks.find(b => b.blockName === blockName);
    if (!block) return [];

    const elements: PeriodicElement[] = [];

    for (const elementMapping of block.elements) {
        // Handle both atomicNumber (new format) and symbol (legacy format)
        const atomicElement = 'atomicNumber' in elementMapping 
            ? ALL_ATOMIC_ELEMENTS.find(ae => ae.atomicNumber === elementMapping.atomicNumber)
            : ALL_ATOMIC_ELEMENTS.find(ae => ae.symbol === elementMapping.symbol);
            
        if (atomicElement) {
            elements.push({
                symbol: atomicElement.symbol,
                atomicNumber: atomicElement.atomicNumber,
                name: atomicElement.name,
                position: elementMapping.position,
                category: atomicElement.category,
                electronShellGroup: atomicElement.electronShellGroup,
                period: atomicElement.period,
            });
        }
    }

    return elements;
}

/**
 * Gets all elements grouped by block for a specific layout
 */
export function getElementsByBlock(layoutName: string): {
    s: PeriodicElement[];
    p: PeriodicElement[];
    d: PeriodicElement[];
    f: PeriodicElement[];
} {
    return {
        s: getBlockElements(layoutName, 's'),
        p: getBlockElements(layoutName, 'p'),
        d: getBlockElements(layoutName, 'd'),
        f: getBlockElements(layoutName, 'f'),
    };
}

/**
 * Gets element by atomic number with display position for a specific layout
 */
export function getElementByAtomicNumber(layoutName: string, atomicNumber: number): PeriodicElement | undefined {
    const atomicElement = ALL_ATOMIC_ELEMENTS.find(ae => ae.atomicNumber === atomicNumber);
    if (!atomicElement) return undefined;

    const displayPosition = getElementPosition(layoutName, atomicElement.symbol);
    if (!displayPosition) return undefined;

    return {
        symbol: atomicElement.symbol,
        atomicNumber: atomicElement.atomicNumber,
        name: atomicElement.name,
        position: displayPosition,
        category: atomicElement.category,
        electronShellGroup: atomicElement.electronShellGroup,
        period: atomicElement.period,
    };
}

/**
 * Gets element by symbol with display position for a specific layout
 */
export function getElementBySymbol(layoutName: string, symbol: string): PeriodicElement | undefined {
    const atomicElement = ALL_ATOMIC_ELEMENTS.find(ae => ae.symbol === symbol);
    if (!atomicElement) return undefined;

    const displayPosition = getElementPosition(layoutName, atomicElement.symbol);
    if (!displayPosition) return undefined;

    return {
        symbol: atomicElement.symbol,
        atomicNumber: atomicElement.atomicNumber,
        name: atomicElement.name,
        position: displayPosition,
        category: atomicElement.category,
        electronShellGroup: atomicElement.electronShellGroup,
        period: atomicElement.period,
    };
}

/**
 * Gets elements by category with display positions for a specific layout
 */
export function getElementsByCategory(layoutName: string, category: AtomicElement['category']): PeriodicElement[] {
    const atomicElements = ALL_ATOMIC_ELEMENTS.filter(ae => ae.category === category);
    const elements: PeriodicElement[] = [];

    for (const atomicElement of atomicElements) {
        const displayPosition = getElementPosition(layoutName, atomicElement.symbol);
        if (displayPosition) {
            elements.push({
                symbol: atomicElement.symbol,
                atomicNumber: atomicElement.atomicNumber,
                name: atomicElement.name,
                position: displayPosition,
                category: atomicElement.category,
                electronShellGroup: atomicElement.electronShellGroup,
                period: atomicElement.period,
            });
        }
    }

    return elements;
}

/**
 * Gets elements by electron shell group with display positions for a specific layout
 */
export function getElementsByShellGroup(layoutName: string, shellGroup: 's' | 'p' | 'd' | 'f'): PeriodicElement[] {
    return getBlockElements(layoutName, shellGroup);
}

// Export the main mapping function for backward compatibility
export const createPeriodicTableData = mapAtomicDataToLayout;
