// Periodic Table Display Layouts - Complete atomic data with display coordinates
// This is the single source of truth for all atomic information and positioning

import periodicTableData from './periodic-table-data.json';

export interface DisplayPosition {
    x: number;
    y: number;
}

export interface ElementDisplayMapping {
    atomicNumber: number;
    position: DisplayPosition;
}

// Atomic element interface (matches JSON structure)
export interface AtomicElement {
    symbol: string;
    atomicNumber: number;
    name: string;
    category: 'alkali-metal' | 'alkaline-earth' | 'transition-metal' | 'post-transition-metal' |
    'metalloid' | 'nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide' | 'unknown';
    electronShellGroup: 's' | 'p' | 'd' | 'f';
    period: number;
    relativeDiameter: number;
    color: string;
}

// All atomic elements from JSON (single source of truth)
export const ALL_ATOMIC_ELEMENTS: AtomicElement[] = periodicTableData as AtomicElement[];

export interface BlockLayout {
    blockName: 's' | 'p' | 'd' | 'f';
    elements: ElementDisplayMapping[];
    dimensions: { width: number; height: number };
}

export interface PeriodicTableLayout {
    layoutName: string;
    blocks: BlockLayout[];
    totalDimensions: { width: number; height: number };
}

// Long Form Layout - All blocks arranged horizontally
export const LONG_FORM_LAYOUT: PeriodicTableLayout = {
    layoutName: 'long',
    totalDimensions: { width: 34, height: 9 },
    blocks: [
        {
            blockName: 's',
            dimensions: { width: 2, height: 7 },
            elements: [
                // S-block elements positioned in columns 0-1
                { atomicNumber: 1, position: { x: 0, y: 0 } },   // H
                { atomicNumber: 3, position: { x: 0, y: 1 } },   // Li
                { atomicNumber: 4, position: { x: 1, y: 1 } },   // Be
                { atomicNumber: 11, position: { x: 0, y: 2 } },  // Na
                { atomicNumber: 12, position: { x: 1, y: 2 } },  // Mg
                { atomicNumber: 19, position: { x: 0, y: 3 } },  // K
                { atomicNumber: 20, position: { x: 1, y: 3 } },  // Ca
                { atomicNumber: 37, position: { x: 0, y: 4 } },  // Rb
                { atomicNumber: 38, position: { x: 1, y: 4 } },  // Sr
                { atomicNumber: 55, position: { x: 0, y: 5 } },  // Cs
                { atomicNumber: 56, position: { x: 1, y: 5 } },  // Ba
                { atomicNumber: 87, position: { x: 0, y: 6 } },  // Fr
                { atomicNumber: 88, position: { x: 1, y: 6 } },  // Ra
            ]
        },
        {
            blockName: 'f',
            dimensions: { width: 15, height: 2 },
            elements: [
                // F-block elements positioned between S and D blocks
                // Lanthanides (row 0)
                { atomicNumber: 57, position: { x: 0, y: 0 } },  // La
                { atomicNumber: 58, position: { x: 1, y: 0 } },  // Ce
                { atomicNumber: 59, position: { x: 2, y: 0 } },  // Pr
                { atomicNumber: 60, position: { x: 3, y: 0 } },  // Nd
                { atomicNumber: 61, position: { x: 4, y: 0 } },  // Pm
                { atomicNumber: 62, position: { x: 5, y: 0 } },  // Sm
                { atomicNumber: 63, position: { x: 6, y: 0 } },  // Eu
                { atomicNumber: 64, position: { x: 7, y: 0 } },  // Gd
                { atomicNumber: 65, position: { x: 8, y: 0 } },  // Tb
                { atomicNumber: 66, position: { x: 9, y: 0 } },  // Dy
                { atomicNumber: 67, position: { x: 10, y: 0 } }, // Ho
                { atomicNumber: 68, position: { x: 11, y: 0 } }, // Er
                { atomicNumber: 69, position: { x: 12, y: 0 } }, // Tm
                { atomicNumber: 70, position: { x: 13, y: 0 } }, // Yb
                { atomicNumber: 71, position: { x: 14, y: 0 } }, // Lu
                // Actinides (row 1)
                { atomicNumber: 89, position: { x: 0, y: 1 } },  // Ac
                { atomicNumber: 90, position: { x: 1, y: 1 } },  // Th
                { atomicNumber: 91, position: { x: 2, y: 1 } },  // Pa
                { atomicNumber: 92, position: { x: 3, y: 1 } },  // U
                { atomicNumber: 93, position: { x: 4, y: 1 } },  // Np
                { atomicNumber: 94, position: { x: 5, y: 1 } },  // Pu
                { atomicNumber: 95, position: { x: 6, y: 1 } },  // Am
                { atomicNumber: 96, position: { x: 7, y: 1 } },  // Cm
                { atomicNumber: 97, position: { x: 8, y: 1 } },  // Bk
                { atomicNumber: 98, position: { x: 9, y: 1 } },  // Cf
                { atomicNumber: 99, position: { x: 10, y: 1 } }, // Es
                { atomicNumber: 100, position: { x: 11, y: 1 } }, // Fm
                { atomicNumber: 101, position: { x: 12, y: 1 } }, // Md
                { atomicNumber: 102, position: { x: 13, y: 1 } }, // No
                { atomicNumber: 103, position: { x: 14, y: 1 } }, // Lr
            ]
        },
        {
            blockName: 'd',
            dimensions: { width: 10, height: 4 },
            elements: [
                // D-block elements positioned after F-block
                // Period 4
                { atomicNumber: 21, position: { x: 0, y: 0 } },  // Sc
                { atomicNumber: 22, position: { x: 1, y: 0 } },  // Ti
                { atomicNumber: 23, position: { x: 2, y: 0 } },  // V
                { atomicNumber: 24, position: { x: 3, y: 0 } },  // Cr
                { atomicNumber: 25, position: { x: 4, y: 0 } },  // Mn
                { atomicNumber: 26, position: { x: 5, y: 0 } },  // Fe
                { atomicNumber: 27, position: { x: 6, y: 0 } },  // Co
                { atomicNumber: 28, position: { x: 7, y: 0 } },  // Ni
                { atomicNumber: 29, position: { x: 8, y: 0 } },  // Cu
                { atomicNumber: 30, position: { x: 9, y: 0 } },  // Zn
                // Period 5
                { atomicNumber: 39, position: { x: 0, y: 1 } },  // Y
                { atomicNumber: 40, position: { x: 1, y: 1 } },  // Zr
                { atomicNumber: 41, position: { x: 2, y: 1 } },  // Nb
                { atomicNumber: 42, position: { x: 3, y: 1 } },  // Mo
                { atomicNumber: 43, position: { x: 4, y: 1 } },  // Tc
                { atomicNumber: 44, position: { x: 5, y: 1 } },  // Ru
                { atomicNumber: 45, position: { x: 6, y: 1 } },  // Rh
                { atomicNumber: 46, position: { x: 7, y: 1 } },  // Pd
                { atomicNumber: 47, position: { x: 8, y: 1 } },  // Ag
                { atomicNumber: 48, position: { x: 9, y: 1 } },  // Cd
                // Period 6
                { atomicNumber: 72, position: { x: 1, y: 2 } },  // Hf
                { atomicNumber: 73, position: { x: 2, y: 2 } },  // Ta
                { atomicNumber: 74, position: { x: 3, y: 2 } },  // W
                { atomicNumber: 75, position: { x: 4, y: 2 } },  // Re
                { atomicNumber: 76, position: { x: 5, y: 2 } },  // Os
                { atomicNumber: 77, position: { x: 6, y: 2 } },  // Ir
                { atomicNumber: 78, position: { x: 7, y: 2 } },  // Pt
                { atomicNumber: 79, position: { x: 8, y: 2 } },  // Au
                { atomicNumber: 80, position: { x: 9, y: 2 } },  // Hg
                // Period 7
                { atomicNumber: 104, position: { x: 1, y: 3 } }, // Rf
                { atomicNumber: 105, position: { x: 2, y: 3 } }, // Db
                { atomicNumber: 106, position: { x: 3, y: 3 } }, // Sg
                { atomicNumber: 107, position: { x: 4, y: 3 } }, // Bh
                { atomicNumber: 108, position: { x: 5, y: 3 } }, // Hs
                { atomicNumber: 109, position: { x: 6, y: 3 } }, // Mt
                { atomicNumber: 110, position: { x: 7, y: 3 } }, // Ds
                { atomicNumber: 111, position: { x: 8, y: 3 } }, // Rg
                { atomicNumber: 112, position: { x: 9, y: 3 } }, // Cn
            ]
        },
        {
            blockName: 'p',
            dimensions: { width: 6, height: 7 },
            elements: [
                // P-block elements positioned after D-block
                // Period 1
                { symbol: 'He', position: { x: 5, y: 0 } },
                // Period 2
                { symbol: 'B', position: { x: 0, y: 1 } },
                { symbol: 'C', position: { x: 1, y: 1 } },
                { symbol: 'N', position: { x: 2, y: 1 } },
                { symbol: 'O', position: { x: 3, y: 1 } },
                { symbol: 'F', position: { x: 4, y: 1 } },
                { symbol: 'Ne', position: { x: 5, y: 1 } },
                // Period 3
                { symbol: 'Al', position: { x: 0, y: 2 } },
                { symbol: 'Si', position: { x: 1, y: 2 } },
                { symbol: 'P', position: { x: 2, y: 2 } },
                { symbol: 'S', position: { x: 3, y: 2 } },
                { symbol: 'Cl', position: { x: 4, y: 2 } },
                { symbol: 'Ar', position: { x: 5, y: 2 } },
                // Period 4
                { symbol: 'Ga', position: { x: 0, y: 3 } },
                { symbol: 'Ge', position: { x: 1, y: 3 } },
                { symbol: 'As', position: { x: 2, y: 3 } },
                { symbol: 'Se', position: { x: 3, y: 3 } },
                { symbol: 'Br', position: { x: 4, y: 3 } },
                { symbol: 'Kr', position: { x: 5, y: 3 } },
                // Period 5
                { symbol: 'In', position: { x: 0, y: 4 } },
                { symbol: 'Sn', position: { x: 1, y: 4 } },
                { symbol: 'Sb', position: { x: 2, y: 4 } },
                { symbol: 'Te', position: { x: 3, y: 4 } },
                { symbol: 'I', position: { x: 4, y: 4 } },
                { symbol: 'Xe', position: { x: 5, y: 4 } },
                // Period 6
                { symbol: 'Tl', position: { x: 0, y: 5 } },
                { symbol: 'Pb', position: { x: 1, y: 5 } },
                { symbol: 'Bi', position: { x: 2, y: 5 } },
                { symbol: 'Po', position: { x: 3, y: 5 } },
                { symbol: 'At', position: { x: 4, y: 5 } },
                { symbol: 'Rn', position: { x: 5, y: 5 } },
                // Period 7
                { symbol: 'Nh', position: { x: 0, y: 6 } },
                { symbol: 'Fl', position: { x: 1, y: 6 } },
                { symbol: 'Mc', position: { x: 2, y: 6 } },
                { symbol: 'Lv', position: { x: 3, y: 6 } },
                { symbol: 'Ts', position: { x: 4, y: 6 } },
                { symbol: 'Og', position: { x: 5, y: 6 } },
            ]
        }
    ]
};

// Short Form Layout - F-block below main table
export const SHORT_FORM_LAYOUT: PeriodicTableLayout = {
    layoutName: 'short',
    totalDimensions: { width: 18, height: 10 },
    blocks: [
        {
            blockName: 's',
            dimensions: { width: 2, height: 7 },
            elements: [
                // S-block elements in original positions
                { symbol: 'H', position: { x: 0, y: 0 } },
                { symbol: 'Li', position: { x: 0, y: 1 } },
                { symbol: 'Be', position: { x: 1, y: 1 } },
                { symbol: 'Na', position: { x: 0, y: 2 } },
                { symbol: 'Mg', position: { x: 1, y: 2 } },
                { symbol: 'K', position: { x: 0, y: 3 } },
                { symbol: 'Ca', position: { x: 1, y: 3 } },
                { symbol: 'Rb', position: { x: 0, y: 4 } },
                { symbol: 'Sr', position: { x: 1, y: 4 } },
                { symbol: 'Cs', position: { x: 0, y: 5 } },
                { symbol: 'Ba', position: { x: 1, y: 5 } },
                { symbol: 'Fr', position: { x: 0, y: 6 } },
                { symbol: 'Ra', position: { x: 1, y: 6 } },
            ]
        },
        {
            blockName: 'd',
            dimensions: { width: 10, height: 4 },
            elements: [
                // D-block elements positioned after S-block
                // Period 4
                { symbol: 'Sc', position: { x: 0, y: 0 } },
                { symbol: 'Ti', position: { x: 1, y: 0 } },
                { symbol: 'V', position: { x: 2, y: 0 } },
                { symbol: 'Cr', position: { x: 3, y: 0 } },
                { symbol: 'Mn', position: { x: 4, y: 0 } },
                { symbol: 'Fe', position: { x: 5, y: 0 } },
                { symbol: 'Co', position: { x: 6, y: 0 } },
                { symbol: 'Ni', position: { x: 7, y: 0 } },
                { symbol: 'Cu', position: { x: 8, y: 0 } },
                { symbol: 'Zn', position: { x: 9, y: 0 } },
                // Period 5
                { symbol: 'Y', position: { x: 0, y: 1 } },
                { symbol: 'Zr', position: { x: 1, y: 1 } },
                { symbol: 'Nb', position: { x: 2, y: 1 } },
                { symbol: 'Mo', position: { x: 3, y: 1 } },
                { symbol: 'Tc', position: { x: 4, y: 1 } },
                { symbol: 'Ru', position: { x: 5, y: 1 } },
                { symbol: 'Rh', position: { x: 6, y: 1 } },
                { symbol: 'Pd', position: { x: 7, y: 1 } },
                { symbol: 'Ag', position: { x: 8, y: 1 } },
                { symbol: 'Cd', position: { x: 9, y: 1 } },
                // Period 6
                { symbol: 'Hf', position: { x: 1, y: 2 } },
                { symbol: 'Ta', position: { x: 2, y: 2 } },
                { symbol: 'W', position: { x: 3, y: 2 } },
                { symbol: 'Re', position: { x: 4, y: 2 } },
                { symbol: 'Os', position: { x: 5, y: 2 } },
                { symbol: 'Ir', position: { x: 6, y: 2 } },
                { symbol: 'Pt', position: { x: 7, y: 2 } },
                { symbol: 'Au', position: { x: 8, y: 2 } },
                { symbol: 'Hg', position: { x: 9, y: 2 } },
                // Period 7
                { symbol: 'Rf', position: { x: 1, y: 3 } },
                { symbol: 'Db', position: { x: 2, y: 3 } },
                { symbol: 'Sg', position: { x: 3, y: 3 } },
                { symbol: 'Bh', position: { x: 4, y: 3 } },
                { symbol: 'Hs', position: { x: 5, y: 3 } },
                { symbol: 'Mt', position: { x: 6, y: 3 } },
                { symbol: 'Ds', position: { x: 7, y: 3 } },
                { symbol: 'Rg', position: { x: 8, y: 3 } },
                { symbol: 'Cn', position: { x: 9, y: 3 } },
            ]
        },
        {
            blockName: 'p',
            dimensions: { width: 6, height: 7 },
            elements: [
                // P-block elements positioned after D-block
                // Period 1
                { symbol: 'He', position: { x: 5, y: 0 } },
                // Period 2
                { symbol: 'B', position: { x: 0, y: 1 } },
                { symbol: 'C', position: { x: 1, y: 1 } },
                { symbol: 'N', position: { x: 2, y: 1 } },
                { symbol: 'O', position: { x: 3, y: 1 } },
                { symbol: 'F', position: { x: 4, y: 1 } },
                { symbol: 'Ne', position: { x: 5, y: 1 } },
                // Period 3
                { symbol: 'Al', position: { x: 0, y: 2 } },
                { symbol: 'Si', position: { x: 1, y: 2 } },
                { symbol: 'P', position: { x: 2, y: 2 } },
                { symbol: 'S', position: { x: 3, y: 2 } },
                { symbol: 'Cl', position: { x: 4, y: 2 } },
                { symbol: 'Ar', position: { x: 5, y: 2 } },
                // Period 4
                { symbol: 'Ga', position: { x: 0, y: 3 } },
                { symbol: 'Ge', position: { x: 1, y: 3 } },
                { symbol: 'As', position: { x: 2, y: 3 } },
                { symbol: 'Se', position: { x: 3, y: 3 } },
                { symbol: 'Br', position: { x: 4, y: 3 } },
                { symbol: 'Kr', position: { x: 5, y: 3 } },
                // Period 5
                { symbol: 'In', position: { x: 0, y: 4 } },
                { symbol: 'Sn', position: { x: 1, y: 4 } },
                { symbol: 'Sb', position: { x: 2, y: 4 } },
                { symbol: 'Te', position: { x: 3, y: 4 } },
                { symbol: 'I', position: { x: 4, y: 4 } },
                { symbol: 'Xe', position: { x: 5, y: 4 } },
                // Period 6
                { symbol: 'Tl', position: { x: 0, y: 5 } },
                { symbol: 'Pb', position: { x: 1, y: 5 } },
                { symbol: 'Bi', position: { x: 2, y: 5 } },
                { symbol: 'Po', position: { x: 3, y: 5 } },
                { symbol: 'At', position: { x: 4, y: 5 } },
                { symbol: 'Rn', position: { x: 5, y: 5 } },
                // Period 7
                { symbol: 'Nh', position: { x: 0, y: 6 } },
                { symbol: 'Fl', position: { x: 1, y: 6 } },
                { symbol: 'Mc', position: { x: 2, y: 6 } },
                { symbol: 'Lv', position: { x: 3, y: 6 } },
                { symbol: 'Ts', position: { x: 4, y: 6 } },
                { symbol: 'Og', position: { x: 5, y: 6 } },
            ]
        },
        {
            blockName: 'f',
            dimensions: { width: 15, height: 2 },
            elements: [
                // F-block elements below main table with indent
                // Lanthanides (row 0)
                { symbol: 'La', position: { x: 0, y: 0 } },
                { symbol: 'Ce', position: { x: 1, y: 0 } },
                { symbol: 'Pr', position: { x: 2, y: 0 } },
                { symbol: 'Nd', position: { x: 3, y: 0 } },
                { symbol: 'Pm', position: { x: 4, y: 0 } },
                { symbol: 'Sm', position: { x: 5, y: 0 } },
                { symbol: 'Eu', position: { x: 6, y: 0 } },
                { symbol: 'Gd', position: { x: 7, y: 0 } },
                { symbol: 'Tb', position: { x: 8, y: 0 } },
                { symbol: 'Dy', position: { x: 9, y: 0 } },
                { symbol: 'Ho', position: { x: 10, y: 0 } },
                { symbol: 'Er', position: { x: 11, y: 0 } },
                { symbol: 'Tm', position: { x: 12, y: 0 } },
                { symbol: 'Yb', position: { x: 13, y: 0 } },
                { symbol: 'Lu', position: { x: 14, y: 0 } },
                // Actinides (row 1)
                { symbol: 'Ac', position: { x: 0, y: 1 } },
                { symbol: 'Th', position: { x: 1, y: 1 } },
                { symbol: 'Pa', position: { x: 2, y: 1 } },
                { symbol: 'U', position: { x: 3, y: 1 } },
                { symbol: 'Np', position: { x: 4, y: 1 } },
                { symbol: 'Pu', position: { x: 5, y: 1 } },
                { symbol: 'Am', position: { x: 6, y: 1 } },
                { symbol: 'Cm', position: { x: 7, y: 1 } },
                { symbol: 'Bk', position: { x: 8, y: 1 } },
                { symbol: 'Cf', position: { x: 9, y: 1 } },
                { symbol: 'Es', position: { x: 10, y: 1 } },
                { symbol: 'Fm', position: { x: 11, y: 1 } },
                { symbol: 'Md', position: { x: 12, y: 1 } },
                { symbol: 'No', position: { x: 13, y: 1 } },
                { symbol: 'Lr', position: { x: 14, y: 1 } },
            ]
        }
    ]
};

// Layout registry
export const PERIODIC_TABLE_LAYOUTS = {
    long: LONG_FORM_LAYOUT,
    short: SHORT_FORM_LAYOUT,
};

// Helper functions
export const getLayoutByName = (layoutName: string): PeriodicTableLayout | undefined => {
    return PERIODIC_TABLE_LAYOUTS[layoutName as keyof typeof PERIODIC_TABLE_LAYOUTS];
};

export const getBlockLayout = (layoutName: string, blockName: 's' | 'p' | 'd' | 'f'): BlockLayout | undefined => {
    const layout = getLayoutByName(layoutName);
    return layout?.blocks.find(block => block.blockName === blockName);
};

export const getElementPosition = (layoutName: string, symbol: string): DisplayPosition | undefined => {
    const layout = getLayoutByName(layoutName);
    if (!layout) return undefined;

    for (const block of layout.blocks) {
        const element = block.elements.find(el => el.symbol === symbol);
        if (element) return element.position;
    }
    return undefined;
};

// Helper functions for atomic data
export const getAtomicElementBySymbol = (symbol: string): AtomicElement | undefined => {
    return ALL_ATOMIC_ELEMENTS.find(element => element.symbol === symbol);
};

export const getAtomicElementByAtomicNumber = (atomicNumber: number): AtomicElement | undefined => {
    return ALL_ATOMIC_ELEMENTS.find(element => element.atomicNumber === atomicNumber);
};

export const getAtomicElementsByCategory = (category: AtomicElement['category']): AtomicElement[] => {
    return ALL_ATOMIC_ELEMENTS.filter(element => element.category === category);
};

export const getAtomicElementsByShellGroup = (shellGroup: 's' | 'p' | 'd' | 'f'): AtomicElement[] => {
    return ALL_ATOMIC_ELEMENTS.filter(element => element.electronShellGroup === shellGroup);
};

