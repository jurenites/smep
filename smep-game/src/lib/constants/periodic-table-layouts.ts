// Periodic Table Display Layouts - Coordinates for displaying elements in paginator
// This contains only the display positioning information

export interface DisplayPosition {
    x: number;
    y: number;
}

export interface ElementDisplayMapping {
    symbol: string;
    position: DisplayPosition;
}

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
            blockName: 'f',
            dimensions: { width: 14, height: 2 },
            elements: [
                // F-block elements positioned between S and D blocks
                // Lanthanides (row 1)
                { symbol: 'La', position: { x: 2, y: 5 } },
                { symbol: 'Ce', position: { x: 3, y: 5 } },
                { symbol: 'Pr', position: { x: 4, y: 5 } },
                { symbol: 'Nd', position: { x: 5, y: 5 } },
                { symbol: 'Pm', position: { x: 6, y: 5 } },
                { symbol: 'Sm', position: { x: 7, y: 5 } },
                { symbol: 'Eu', position: { x: 8, y: 5 } },
                { symbol: 'Gd', position: { x: 9, y: 5 } },
                { symbol: 'Tb', position: { x: 10, y: 5 } },
                { symbol: 'Dy', position: { x: 11, y: 5 } },
                { symbol: 'Ho', position: { x: 12, y: 5 } },
                { symbol: 'Er', position: { x: 13, y: 5 } },
                { symbol: 'Tm', position: { x: 14, y: 5 } },
                { symbol: 'Yb', position: { x: 15, y: 5 } },
                // Actinides (row 2)
                { symbol: 'Ac', position: { x: 2, y: 6 } },
                { symbol: 'Th', position: { x: 3, y: 6 } },
                { symbol: 'Pa', position: { x: 4, y: 6 } },
                { symbol: 'U', position: { x: 5, y: 6 } },
                { symbol: 'Np', position: { x: 6, y: 6 } },
                { symbol: 'Pu', position: { x: 7, y: 6 } },
                { symbol: 'Am', position: { x: 8, y: 6 } },
                { symbol: 'Cm', position: { x: 9, y: 6 } },
                { symbol: 'Bk', position: { x: 10, y: 6 } },
                { symbol: 'Cf', position: { x: 11, y: 6 } },
                { symbol: 'Es', position: { x: 12, y: 6 } },
                { symbol: 'Fm', position: { x: 13, y: 6 } },
                { symbol: 'Md', position: { x: 14, y: 6 } },
                { symbol: 'No', position: { x: 15, y: 6 } },
                { symbol: 'Lr', position: { x: 16, y: 6 } },
            ]
        },
        {
            blockName: 'd',
            dimensions: { width: 10, height: 5 },
            elements: [
                // D-block elements positioned after F-block
                // Period 4
                { symbol: 'Sc', position: { x: 18, y: 3 } },
                { symbol: 'Ti', position: { x: 19, y: 3 } },
                { symbol: 'V', position: { x: 20, y: 3 } },
                { symbol: 'Cr', position: { x: 21, y: 3 } },
                { symbol: 'Mn', position: { x: 22, y: 3 } },
                { symbol: 'Fe', position: { x: 23, y: 3 } },
                { symbol: 'Co', position: { x: 24, y: 3 } },
                { symbol: 'Ni', position: { x: 25, y: 3 } },
                { symbol: 'Cu', position: { x: 26, y: 3 } },
                { symbol: 'Zn', position: { x: 27, y: 3 } },
                // Period 5
                { symbol: 'Y', position: { x: 18, y: 4 } },
                { symbol: 'Zr', position: { x: 19, y: 4 } },
                { symbol: 'Nb', position: { x: 20, y: 4 } },
                { symbol: 'Mo', position: { x: 21, y: 4 } },
                { symbol: 'Tc', position: { x: 22, y: 4 } },
                { symbol: 'Ru', position: { x: 23, y: 4 } },
                { symbol: 'Rh', position: { x: 24, y: 4 } },
                { symbol: 'Pd', position: { x: 25, y: 4 } },
                { symbol: 'Ag', position: { x: 26, y: 4 } },
                { symbol: 'Cd', position: { x: 27, y: 4 } },
                // Period 6
                { symbol: 'Hf', position: { x: 19, y: 5 } },
                { symbol: 'Ta', position: { x: 20, y: 5 } },
                { symbol: 'W', position: { x: 21, y: 5 } },
                { symbol: 'Re', position: { x: 22, y: 5 } },
                { symbol: 'Os', position: { x: 23, y: 5 } },
                { symbol: 'Ir', position: { x: 24, y: 5 } },
                { symbol: 'Pt', position: { x: 25, y: 5 } },
                { symbol: 'Au', position: { x: 26, y: 5 } },
                { symbol: 'Hg', position: { x: 27, y: 5 } },
                // Period 7
                { symbol: 'Rf', position: { x: 19, y: 7 } },
                { symbol: 'Db', position: { x: 20, y: 7 } },
                { symbol: 'Sg', position: { x: 21, y: 7 } },
                { symbol: 'Bh', position: { x: 22, y: 7 } },
                { symbol: 'Hs', position: { x: 23, y: 7 } },
                { symbol: 'Mt', position: { x: 24, y: 7 } },
                { symbol: 'Ds', position: { x: 25, y: 7 } },
                { symbol: 'Rg', position: { x: 26, y: 7 } },
                { symbol: 'Cn', position: { x: 27, y: 7 } },
            ]
        },
        {
            blockName: 'p',
            dimensions: { width: 6, height: 7 },
            elements: [
                // P-block elements positioned after D-block
                // Period 1
                { symbol: 'He', position: { x: 31, y: 0 } },
                // Period 2
                { symbol: 'B', position: { x: 28, y: 1 } },
                { symbol: 'C', position: { x: 29, y: 1 } },
                { symbol: 'N', position: { x: 30, y: 1 } },
                { symbol: 'O', position: { x: 31, y: 1 } },
                { symbol: 'F', position: { x: 32, y: 1 } },
                { symbol: 'Ne', position: { x: 33, y: 1 } },
                // Period 3
                { symbol: 'Al', position: { x: 28, y: 2 } },
                { symbol: 'Si', position: { x: 29, y: 2 } },
                { symbol: 'P', position: { x: 30, y: 2 } },
                { symbol: 'S', position: { x: 31, y: 2 } },
                { symbol: 'Cl', position: { x: 32, y: 2 } },
                { symbol: 'Ar', position: { x: 33, y: 2 } },
                // Period 4
                { symbol: 'Ga', position: { x: 28, y: 3 } },
                { symbol: 'Ge', position: { x: 29, y: 3 } },
                { symbol: 'As', position: { x: 30, y: 3 } },
                { symbol: 'Se', position: { x: 31, y: 3 } },
                { symbol: 'Br', position: { x: 32, y: 3 } },
                { symbol: 'Kr', position: { x: 33, y: 3 } },
                // Period 5
                { symbol: 'In', position: { x: 28, y: 4 } },
                { symbol: 'Sn', position: { x: 29, y: 4 } },
                { symbol: 'Sb', position: { x: 30, y: 4 } },
                { symbol: 'Te', position: { x: 31, y: 4 } },
                { symbol: 'I', position: { x: 32, y: 4 } },
                { symbol: 'Xe', position: { x: 33, y: 4 } },
                // Period 6
                { symbol: 'Tl', position: { x: 28, y: 5 } },
                { symbol: 'Pb', position: { x: 29, y: 5 } },
                { symbol: 'Bi', position: { x: 30, y: 5 } },
                { symbol: 'Po', position: { x: 31, y: 5 } },
                { symbol: 'At', position: { x: 32, y: 5 } },
                { symbol: 'Rn', position: { x: 33, y: 5 } },
                // Period 7
                { symbol: 'Nh', position: { x: 28, y: 6 } },
                { symbol: 'Fl', position: { x: 29, y: 6 } },
                { symbol: 'Mc', position: { x: 30, y: 6 } },
                { symbol: 'Lv', position: { x: 31, y: 6 } },
                { symbol: 'Ts', position: { x: 32, y: 6 } },
                { symbol: 'Og', position: { x: 33, y: 6 } },
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
            dimensions: { width: 10, height: 5 },
            elements: [
                // D-block elements in main table
                // Period 4
                { symbol: 'Sc', position: { x: 2, y: 3 } },
                { symbol: 'Ti', position: { x: 3, y: 3 } },
                { symbol: 'V', position: { x: 4, y: 3 } },
                { symbol: 'Cr', position: { x: 5, y: 3 } },
                { symbol: 'Mn', position: { x: 6, y: 3 } },
                { symbol: 'Fe', position: { x: 7, y: 3 } },
                { symbol: 'Co', position: { x: 8, y: 3 } },
                { symbol: 'Ni', position: { x: 9, y: 3 } },
                { symbol: 'Cu', position: { x: 10, y: 3 } },
                { symbol: 'Zn', position: { x: 11, y: 3 } },
                // Period 5
                { symbol: 'Y', position: { x: 2, y: 4 } },
                { symbol: 'Zr', position: { x: 3, y: 4 } },
                { symbol: 'Nb', position: { x: 4, y: 4 } },
                { symbol: 'Mo', position: { x: 5, y: 4 } },
                { symbol: 'Tc', position: { x: 6, y: 4 } },
                { symbol: 'Ru', position: { x: 7, y: 4 } },
                { symbol: 'Rh', position: { x: 8, y: 4 } },
                { symbol: 'Pd', position: { x: 9, y: 4 } },
                { symbol: 'Ag', position: { x: 10, y: 4 } },
                { symbol: 'Cd', position: { x: 11, y: 4 } },
                // Period 6
                { symbol: 'Hf', position: { x: 3, y: 5 } },
                { symbol: 'Ta', position: { x: 4, y: 5 } },
                { symbol: 'W', position: { x: 5, y: 5 } },
                { symbol: 'Re', position: { x: 6, y: 5 } },
                { symbol: 'Os', position: { x: 7, y: 5 } },
                { symbol: 'Ir', position: { x: 8, y: 5 } },
                { symbol: 'Pt', position: { x: 9, y: 5 } },
                { symbol: 'Au', position: { x: 10, y: 5 } },
                { symbol: 'Hg', position: { x: 11, y: 5 } },
                // Period 7
                { symbol: 'Rf', position: { x: 3, y: 6 } },
                { symbol: 'Db', position: { x: 4, y: 6 } },
                { symbol: 'Sg', position: { x: 5, y: 6 } },
                { symbol: 'Bh', position: { x: 6, y: 6 } },
                { symbol: 'Hs', position: { x: 7, y: 6 } },
                { symbol: 'Mt', position: { x: 8, y: 6 } },
                { symbol: 'Ds', position: { x: 9, y: 6 } },
                { symbol: 'Rg', position: { x: 10, y: 6 } },
                { symbol: 'Cn', position: { x: 11, y: 6 } },
            ]
        },
        {
            blockName: 'p',
            dimensions: { width: 6, height: 7 },
            elements: [
                // P-block elements in main table
                // Period 1
                { symbol: 'He', position: { x: 17, y: 0 } },
                // Period 2
                { symbol: 'B', position: { x: 12, y: 1 } },
                { symbol: 'C', position: { x: 13, y: 1 } },
                { symbol: 'N', position: { x: 14, y: 1 } },
                { symbol: 'O', position: { x: 15, y: 1 } },
                { symbol: 'F', position: { x: 16, y: 1 } },
                { symbol: 'Ne', position: { x: 17, y: 1 } },
                // Period 3
                { symbol: 'Al', position: { x: 12, y: 2 } },
                { symbol: 'Si', position: { x: 13, y: 2 } },
                { symbol: 'P', position: { x: 14, y: 2 } },
                { symbol: 'S', position: { x: 15, y: 2 } },
                { symbol: 'Cl', position: { x: 16, y: 2 } },
                { symbol: 'Ar', position: { x: 17, y: 2 } },
                // Period 4
                { symbol: 'Ga', position: { x: 12, y: 3 } },
                { symbol: 'Ge', position: { x: 13, y: 3 } },
                { symbol: 'As', position: { x: 14, y: 3 } },
                { symbol: 'Se', position: { x: 15, y: 3 } },
                { symbol: 'Br', position: { x: 16, y: 3 } },
                { symbol: 'Kr', position: { x: 17, y: 3 } },
                // Period 5
                { symbol: 'In', position: { x: 12, y: 4 } },
                { symbol: 'Sn', position: { x: 13, y: 4 } },
                { symbol: 'Sb', position: { x: 14, y: 4 } },
                { symbol: 'Te', position: { x: 15, y: 4 } },
                { symbol: 'I', position: { x: 16, y: 4 } },
                { symbol: 'Xe', position: { x: 17, y: 4 } },
                // Period 6
                { symbol: 'Tl', position: { x: 12, y: 5 } },
                { symbol: 'Pb', position: { x: 13, y: 5 } },
                { symbol: 'Bi', position: { x: 14, y: 5 } },
                { symbol: 'Po', position: { x: 15, y: 5 } },
                { symbol: 'At', position: { x: 16, y: 5 } },
                { symbol: 'Rn', position: { x: 17, y: 5 } },
                // Period 7
                { symbol: 'Nh', position: { x: 12, y: 6 } },
                { symbol: 'Fl', position: { x: 13, y: 6 } },
                { symbol: 'Mc', position: { x: 14, y: 6 } },
                { symbol: 'Lv', position: { x: 15, y: 6 } },
                { symbol: 'Ts', position: { x: 16, y: 6 } },
                { symbol: 'Og', position: { x: 17, y: 6 } },
            ]
        },
        {
            blockName: 'f',
            dimensions: { width: 14, height: 2 },
            elements: [
                // F-block elements below main table with indent
                // Lanthanides (row 1)
                { symbol: 'La', position: { x: 2, y: 8 } },
                { symbol: 'Ce', position: { x: 3, y: 8 } },
                { symbol: 'Pr', position: { x: 4, y: 8 } },
                { symbol: 'Nd', position: { x: 5, y: 8 } },
                { symbol: 'Pm', position: { x: 6, y: 8 } },
                { symbol: 'Sm', position: { x: 7, y: 8 } },
                { symbol: 'Eu', position: { x: 8, y: 8 } },
                { symbol: 'Gd', position: { x: 9, y: 8 } },
                { symbol: 'Tb', position: { x: 10, y: 8 } },
                { symbol: 'Dy', position: { x: 11, y: 8 } },
                { symbol: 'Ho', position: { x: 12, y: 8 } },
                { symbol: 'Er', position: { x: 13, y: 8 } },
                { symbol: 'Tm', position: { x: 14, y: 8 } },
                { symbol: 'Yb', position: { x: 15, y: 8 } },
                // Actinides (row 2)
                { symbol: 'Ac', position: { x: 2, y: 9 } },
                { symbol: 'Th', position: { x: 3, y: 9 } },
                { symbol: 'Pa', position: { x: 4, y: 9 } },
                { symbol: 'U', position: { x: 5, y: 9 } },
                { symbol: 'Np', position: { x: 6, y: 9 } },
                { symbol: 'Pu', position: { x: 7, y: 9 } },
                { symbol: 'Am', position: { x: 8, y: 9 } },
                { symbol: 'Cm', position: { x: 9, y: 9 } },
                { symbol: 'Bk', position: { x: 10, y: 9 } },
                { symbol: 'Cf', position: { x: 11, y: 9 } },
                { symbol: 'Es', position: { x: 12, y: 9 } },
                { symbol: 'Fm', position: { x: 13, y: 9 } },
                { symbol: 'Md', position: { x: 14, y: 9 } },
                { symbol: 'No', position: { x: 15, y: 9 } },
                { symbol: 'Lr', position: { x: 16, y: 9 } },
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
