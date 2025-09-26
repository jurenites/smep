//TODO: remove this file after all the code is migrated to the new file

export interface ElementPosition {
    atomicNumber: number;
    longForm: { x: number; y: number };
    shortForm: { x: number; y: number };
}

/**
 * Complete position mapping for all 118 elements
 * Each element has coordinates for both long-form and short-form layouts
 */

export const PARTICLE_ATOMIC_DATA: readonly ElementPosition[] = [
    // Period 1
    { atomicNumber: 1, longForm: { x: 0, y: 0 }, shortForm: { x: 0, y: 0 } },   // H
    { atomicNumber: 2, longForm: { x: 31, y: 0 }, shortForm: { x: 17, y: 0 } }, // He
    // Period 2
    { atomicNumber: 3, longForm: { x: 0, y: 1 }, shortForm: { x: 0, y: 1 } },   // Li
    { atomicNumber: 4, longForm: { x: 1, y: 1 }, shortForm: { x: 1, y: 1 } },   // Be
    { atomicNumber: 5, longForm: { x: 28, y: 1 }, shortForm: { x: 12, y: 1 } }, // B
    { atomicNumber: 6, longForm: { x: 29, y: 1 }, shortForm: { x: 13, y: 1 } }, // C
    { atomicNumber: 7, longForm: { x: 30, y: 1 }, shortForm: { x: 14, y: 1 } }, // N
    { atomicNumber: 8, longForm: { x: 31, y: 1 }, shortForm: { x: 15, y: 1 } }, // O
    { atomicNumber: 9, longForm: { x: 32, y: 1 }, shortForm: { x: 16, y: 1 } }, // F
    { atomicNumber: 10, longForm: { x: 33, y: 1 }, shortForm: { x: 17, y: 1 } }, // Ne
    // Period 3
    { atomicNumber: 11, longForm: { x: 0, y: 2 }, shortForm: { x: 0, y: 2 } },  // Na
    { atomicNumber: 12, longForm: { x: 1, y: 2 }, shortForm: { x: 1, y: 2 } },  // Mg
    { atomicNumber: 13, longForm: { x: 28, y: 2 }, shortForm: { x: 12, y: 2 } }, // Al
    { atomicNumber: 14, longForm: { x: 29, y: 2 }, shortForm: { x: 13, y: 2 } }, // Si
    { atomicNumber: 15, longForm: { x: 30, y: 2 }, shortForm: { x: 14, y: 2 } }, // P
    { atomicNumber: 16, longForm: { x: 31, y: 2 }, shortForm: { x: 15, y: 2 } }, // S
    { atomicNumber: 17, longForm: { x: 32, y: 2 }, shortForm: { x: 16, y: 2 } }, // Cl
    { atomicNumber: 18, longForm: { x: 33, y: 2 }, shortForm: { x: 17, y: 2 } }, // Ar
    // Period 4
    { atomicNumber: 19, longForm: { x: 0, y: 3 }, shortForm: { x: 0, y: 3 } },  // K
    { atomicNumber: 20, longForm: { x: 1, y: 3 }, shortForm: { x: 1, y: 3 } },  // Ca
    { atomicNumber: 21, longForm: { x: 18, y: 3 }, shortForm: { x: 2, y: 3 } }, // Sc
    { atomicNumber: 22, longForm: { x: 19, y: 3 }, shortForm: { x: 3, y: 3 } }, // Ti
    { atomicNumber: 23, longForm: { x: 20, y: 3 }, shortForm: { x: 4, y: 3 } }, // V
    { atomicNumber: 24, longForm: { x: 21, y: 3 }, shortForm: { x: 5, y: 3 } }, // Cr
    { atomicNumber: 25, longForm: { x: 22, y: 3 }, shortForm: { x: 6, y: 3 } }, // Mn
    { atomicNumber: 26, longForm: { x: 23, y: 3 }, shortForm: { x: 7, y: 3 } }, // Fe
    { atomicNumber: 27, longForm: { x: 24, y: 3 }, shortForm: { x: 8, y: 3 } }, // Co
    { atomicNumber: 28, longForm: { x: 25, y: 3 }, shortForm: { x: 9, y: 3 } }, // Ni
    { atomicNumber: 29, longForm: { x: 26, y: 3 }, shortForm: { x: 10, y: 3 } }, // Cu
    { atomicNumber: 30, longForm: { x: 27, y: 3 }, shortForm: { x: 11, y: 3 } }, // Zn
    { atomicNumber: 31, longForm: { x: 28, y: 3 }, shortForm: { x: 12, y: 3 } }, // Ga
    { atomicNumber: 32, longForm: { x: 29, y: 3 }, shortForm: { x: 13, y: 3 } }, // Ge
    { atomicNumber: 33, longForm: { x: 30, y: 3 }, shortForm: { x: 14, y: 3 } }, // As
    { atomicNumber: 34, longForm: { x: 31, y: 3 }, shortForm: { x: 15, y: 3 } }, // Se
    { atomicNumber: 35, longForm: { x: 32, y: 3 }, shortForm: { x: 16, y: 3 } }, // Br
    { atomicNumber: 36, longForm: { x: 33, y: 3 }, shortForm: { x: 17, y: 3 } }, // Kr
    // Period 5
    { atomicNumber: 37, longForm: { x: 0, y: 4 }, shortForm: { x: 0, y: 4 } },  // Rb
    { atomicNumber: 38, longForm: { x: 1, y: 4 }, shortForm: { x: 1, y: 4 } },  // Sr
    { atomicNumber: 39, longForm: { x: 18, y: 4 }, shortForm: { x: 2, y: 4 } }, // Y
    { atomicNumber: 40, longForm: { x: 19, y: 4 }, shortForm: { x: 3, y: 4 } }, // Zr
    { atomicNumber: 41, longForm: { x: 20, y: 4 }, shortForm: { x: 4, y: 4 } }, // Nb
    { atomicNumber: 42, longForm: { x: 21, y: 4 }, shortForm: { x: 5, y: 4 } }, // Mo
    { atomicNumber: 43, longForm: { x: 22, y: 4 }, shortForm: { x: 6, y: 4 } }, // Tc
    { atomicNumber: 44, longForm: { x: 23, y: 4 }, shortForm: { x: 7, y: 4 } }, // Ru
    { atomicNumber: 45, longForm: { x: 24, y: 4 }, shortForm: { x: 8, y: 4 } }, // Rh
    { atomicNumber: 46, longForm: { x: 25, y: 4 }, shortForm: { x: 9, y: 4 } }, // Pd
    { atomicNumber: 47, longForm: { x: 26, y: 4 }, shortForm: { x: 10, y: 4 } }, // Ag
    { atomicNumber: 48, longForm: { x: 27, y: 4 }, shortForm: { x: 11, y: 4 } }, // Cd
    { atomicNumber: 49, longForm: { x: 28, y: 4 }, shortForm: { x: 12, y: 4 } }, // In
    { atomicNumber: 50, longForm: { x: 29, y: 4 }, shortForm: { x: 13, y: 4 } }, // Sn
    { atomicNumber: 51, longForm: { x: 30, y: 4 }, shortForm: { x: 14, y: 4 } }, // Sb
    { atomicNumber: 52, longForm: { x: 31, y: 4 }, shortForm: { x: 15, y: 4 } }, // Te
    { atomicNumber: 53, longForm: { x: 32, y: 4 }, shortForm: { x: 16, y: 4 } }, // I
    { atomicNumber: 54, longForm: { x: 33, y: 4 }, shortForm: { x: 17, y: 4 } }, // Xe
    // Period 6
    { atomicNumber: 55, longForm: { x: 0, y: 5 }, shortForm: { x: 0, y: 5 } },  // Cs
    { atomicNumber: 56, longForm: { x: 1, y: 5 }, shortForm: { x: 1, y: 5 } },  // Ba
    { atomicNumber: 57, longForm: { x: 2, y: 5 }, shortForm: { x: 2, y: 8 } },  // La
    { atomicNumber: 58, longForm: { x: 2, y: 6 }, shortForm: { x: 3, y: 8 } },  // Ce
    { atomicNumber: 59, longForm: { x: 3, y: 6 }, shortForm: { x: 4, y: 8 } },  // Pr
    { atomicNumber: 60, longForm: { x: 4, y: 6 }, shortForm: { x: 5, y: 8 } },  // Nd
    { atomicNumber: 61, longForm: { x: 5, y: 6 }, shortForm: { x: 6, y: 8 } },  // Pm
    { atomicNumber: 62, longForm: { x: 6, y: 6 }, shortForm: { x: 7, y: 8 } },  // Sm
    { atomicNumber: 63, longForm: { x: 7, y: 6 }, shortForm: { x: 8, y: 8 } },  // Eu
    { atomicNumber: 64, longForm: { x: 8, y: 6 }, shortForm: { x: 9, y: 8 } },  // Gd
    { atomicNumber: 65, longForm: { x: 9, y: 6 }, shortForm: { x: 10, y: 8 } }, // Tb
    { atomicNumber: 66, longForm: { x: 10, y: 6 }, shortForm: { x: 11, y: 8 } }, // Dy
    { atomicNumber: 67, longForm: { x: 11, y: 6 }, shortForm: { x: 12, y: 8 } }, // Ho
    { atomicNumber: 68, longForm: { x: 12, y: 6 }, shortForm: { x: 13, y: 8 } }, // Er
    { atomicNumber: 69, longForm: { x: 13, y: 6 }, shortForm: { x: 14, y: 8 } }, // Tm
    { atomicNumber: 70, longForm: { x: 14, y: 6 }, shortForm: { x: 15, y: 8 } }, // Yb
    { atomicNumber: 71, longForm: { x: 15, y: 6 }, shortForm: { x: 16, y: 8 } }, // Lu
    { atomicNumber: 72, longForm: { x: 19, y: 5 }, shortForm: { x: 3, y: 5 } }, // Hf
    { atomicNumber: 73, longForm: { x: 20, y: 5 }, shortForm: { x: 4, y: 5 } }, // Ta
    { atomicNumber: 74, longForm: { x: 21, y: 5 }, shortForm: { x: 5, y: 5 } }, // W
    { atomicNumber: 75, longForm: { x: 22, y: 5 }, shortForm: { x: 6, y: 5 } }, // Re
    { atomicNumber: 76, longForm: { x: 23, y: 5 }, shortForm: { x: 7, y: 5 } }, // Os
    { atomicNumber: 77, longForm: { x: 24, y: 5 }, shortForm: { x: 8, y: 5 } }, // Ir
    { atomicNumber: 78, longForm: { x: 25, y: 5 }, shortForm: { x: 9, y: 5 } }, // Pt
    { atomicNumber: 79, longForm: { x: 26, y: 5 }, shortForm: { x: 10, y: 5 } }, // Au
    { atomicNumber: 80, longForm: { x: 27, y: 5 }, shortForm: { x: 11, y: 5 } }, // Hg
    { atomicNumber: 81, longForm: { x: 28, y: 5 }, shortForm: { x: 12, y: 5 } }, // Tl
    { atomicNumber: 82, longForm: { x: 29, y: 5 }, shortForm: { x: 13, y: 5 } }, // Pb
    { atomicNumber: 83, longForm: { x: 30, y: 5 }, shortForm: { x: 14, y: 5 } }, // Bi
    { atomicNumber: 84, longForm: { x: 31, y: 5 }, shortForm: { x: 15, y: 5 } }, // Po
    { atomicNumber: 85, longForm: { x: 32, y: 5 }, shortForm: { x: 16, y: 5 } }, // At
    { atomicNumber: 86, longForm: { x: 33, y: 5 }, shortForm: { x: 17, y: 5 } }, // Rn
    // Period 7
    { atomicNumber: 87, longForm: { x: 0, y: 6 }, shortForm: { x: 0, y: 6 } },  // Fr
    { atomicNumber: 88, longForm: { x: 1, y: 6 }, shortForm: { x: 1, y: 6 } },  // Ra
    { atomicNumber: 89, longForm: { x: 2, y: 7 }, shortForm: { x: 2, y: 9 } },  // Ac
    { atomicNumber: 90, longForm: { x: 2, y: 8 }, shortForm: { x: 3, y: 9 } },  // Th
    { atomicNumber: 91, longForm: { x: 3, y: 8 }, shortForm: { x: 4, y: 9 } },  // Pa
    { atomicNumber: 92, longForm: { x: 4, y: 8 }, shortForm: { x: 5, y: 9 } },  // U
    { atomicNumber: 93, longForm: { x: 5, y: 8 }, shortForm: { x: 6, y: 9 } },  // Np
    { atomicNumber: 94, longForm: { x: 6, y: 8 }, shortForm: { x: 7, y: 9 } },  // Pu
    { atomicNumber: 95, longForm: { x: 7, y: 8 }, shortForm: { x: 8, y: 9 } },  // Am
    { atomicNumber: 96, longForm: { x: 8, y: 8 }, shortForm: { x: 9, y: 9 } },  // Cm
    { atomicNumber: 97, longForm: { x: 9, y: 8 }, shortForm: { x: 10, y: 9 } }, // Bk
    { atomicNumber: 98, longForm: { x: 10, y: 8 }, shortForm: { x: 11, y: 9 } }, // Cf
    { atomicNumber: 99, longForm: { x: 11, y: 8 }, shortForm: { x: 12, y: 9 } }, // Es
    { atomicNumber: 100, longForm: { x: 12, y: 8 }, shortForm: { x: 13, y: 9 } }, // Fm
    { atomicNumber: 101, longForm: { x: 13, y: 8 }, shortForm: { x: 14, y: 9 } }, // Md
    { atomicNumber: 102, longForm: { x: 14, y: 8 }, shortForm: { x: 15, y: 9 } }, // No
    { atomicNumber: 103, longForm: { x: 15, y: 8 }, shortForm: { x: 16, y: 9 } }, // Lr
    { atomicNumber: 104, longForm: { x: 19, y: 7 }, shortForm: { x: 3, y: 7 } }, // Rf
    { atomicNumber: 105, longForm: { x: 20, y: 7 }, shortForm: { x: 4, y: 7 } }, // Db
    { atomicNumber: 106, longForm: { x: 21, y: 7 }, shortForm: { x: 5, y: 7 } }, // Sg
    { atomicNumber: 107, longForm: { x: 22, y: 7 }, shortForm: { x: 6, y: 7 } }, // Bh
    { atomicNumber: 108, longForm: { x: 23, y: 7 }, shortForm: { x: 7, y: 7 } }, // Hs
    { atomicNumber: 109, longForm: { x: 24, y: 7 }, shortForm: { x: 8, y: 7 } }, // Mt
    { atomicNumber: 110, longForm: { x: 25, y: 7 }, shortForm: { x: 9, y: 7 } }, // Ds
    { atomicNumber: 111, longForm: { x: 26, y: 7 }, shortForm: { x: 10, y: 7 } }, // Rg
    { atomicNumber: 112, longForm: { x: 27, y: 7 }, shortForm: { x: 11, y: 7 } }, // Cn
    { atomicNumber: 113, longForm: { x: 28, y: 6 }, shortForm: { x: 12, y: 6 } }, // Nh
    { atomicNumber: 114, longForm: { x: 29, y: 6 }, shortForm: { x: 13, y: 6 } }, // Fl
    { atomicNumber: 115, longForm: { x: 30, y: 6 }, shortForm: { x: 14, y: 6 } }, // Mc
    { atomicNumber: 116, longForm: { x: 31, y: 6 }, shortForm: { x: 15, y: 6 } }, // Lv
    { atomicNumber: 117, longForm: { x: 32, y: 6 }, shortForm: { x: 16, y: 6 } }, // Ts
    { atomicNumber: 118, longForm: { x: 33, y: 6 }, shortForm: { x: 17, y: 6 } }, // Og
] as const;

/**
 * Helper functions for position lookup
 */
export const getElementPosition = (atomicNumber: number, viewMode: 'long' | 'short'): { x: number; y: number } => {
    const element = PARTICLE_ATOMIC_DATA.find(pos => pos.atomicNumber === atomicNumber);
    if (!element) {
        return { x: 0, y: 0 }; // Default fallback
    }
    return viewMode === 'long' ? element.longForm : element.shortForm;
};

export const getLongFormPosition = (atomicNumber: number): { x: number; y: number } => {
    return getElementPosition(atomicNumber, 'long');
};

export const getShortFormPosition = (atomicNumber: number): { x: number; y: number } => {
    return getElementPosition(atomicNumber, 'short');
};

export const getElementByPosition = (x: number, y: number, viewMode: 'long' | 'short'): number | undefined => {
    const positionKey = viewMode === 'long' ? 'longForm' : 'shortForm';
    const element = PARTICLE_ATOMIC_DATA.find(pos =>
        pos[positionKey].x === x && pos[positionKey].y === y
    );
    return element?.atomicNumber;
};
