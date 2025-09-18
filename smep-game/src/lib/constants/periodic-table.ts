// Periodic Table Constants - All 118 elements without position data
// Position data is now calculated by the paginator based on atomicNumber
// Element data is imported from JSON file for better maintainability

import periodicTableData from './periodic-table-data.json';

export interface PeriodicElement {
    symbol: string;
    atomicNumber: number;
    name: string;
    category: 'alkali-metal' | 'alkaline-earth' | 'transition-metal' | 'post-transition-metal' |
    'metalloid' | 'nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide' | 'unknown';
    electronShellGroup: 's' | 'p' | 'd' | 'f';
    period: number;
    relativeDiameter: number;
}

// All periodic table elements sorted by atomic number (1-118)
export const PERIODIC_TABLE_ELEMENTS: PeriodicElement[] = periodicTableData as PeriodicElement[];

// S-Block Elements (Groups 1-2, Alkali and Alkaline Earth metals)
export const S_BLOCK_ELEMENTS: PeriodicElement[] = PERIODIC_TABLE_ELEMENTS.filter(
    element => element.electronShellGroup === 's'
);

// F-Block Elements (Lanthanides and Actinides)
export const F_BLOCK_ELEMENTS: PeriodicElement[] = PERIODIC_TABLE_ELEMENTS.filter(
    element => element.electronShellGroup === 'f'
);

// D-Block Elements (Groups 3-12, Transition metals)
export const D_BLOCK_ELEMENTS: PeriodicElement[] = PERIODIC_TABLE_ELEMENTS.filter(
    element => element.electronShellGroup === 'd'
);

// P-Block Elements (Groups 13-18, including noble gases)
export const P_BLOCK_ELEMENTS: PeriodicElement[] = PERIODIC_TABLE_ELEMENTS.filter(
    element => element.electronShellGroup === 'p'
);

// Grid dimensions for different views
export const PERIODIC_TABLE_GRID_DIMENSIONS = {
    // Long form (standard periodic table with F-block integrated between S and D blocks)
    longForm: {
        width: 34, // Increased to accommodate F-block between S and D blocks, and P-block after D-block
        height: 9
    },
    // Short form (F-block moved under the table)
    shortForm: {
        width: 18,
        height: 10
    }
};

// Helper function to get elements by electron shell group
export const getElementsByShellGroup = (shellGroup: 's' | 'p' | 'd' | 'f'): PeriodicElement[] => {
    switch (shellGroup) {
        case 's': return S_BLOCK_ELEMENTS;
        case 'p': return P_BLOCK_ELEMENTS;
        case 'd': return D_BLOCK_ELEMENTS;
        case 'f': return F_BLOCK_ELEMENTS;
        default: return [];
    }
};

// Helper function to get element by atomic number
export const getElementByAtomicNumber = (atomicNumber: number): PeriodicElement | undefined => {
    return PERIODIC_TABLE_ELEMENTS.find(element => element.atomicNumber === atomicNumber);
};

// Helper function to get element by symbol
export const getElementBySymbol = (symbol: string): PeriodicElement | undefined => {
    return PERIODIC_TABLE_ELEMENTS.find(element => element.symbol === symbol);
};

// Helper function to get elements by category
export const getElementsByCategory = (category: PeriodicElement['category']): PeriodicElement[] => {
    return PERIODIC_TABLE_ELEMENTS.filter(element => element.category === category);
};