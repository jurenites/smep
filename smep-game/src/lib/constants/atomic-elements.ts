// Atomic Elements Data - Pure atomic information without display coordinates
// This contains only the scientific data about elements

export interface AtomicElement {
    symbol: string;
    atomicNumber: number;
    name: string;
    category: 'alkali-metal' | 'alkaline-earth' | 'transition-metal' | 'post-transition-metal' |
    'metalloid' | 'nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide' | 'unknown';
    electronShellGroup: 's' | 'p' | 'd' | 'f';
    period: number;
}

// S-Block Elements (Groups 1-2, Alkali and Alkaline Earth metals)
export const S_BLOCK_ATOMIC_DATA: AtomicElement[] = [
    // Period 1
    { symbol: 'H', atomicNumber: 1, name: 'Hydrogen', category: 'nonmetal', electronShellGroup: 's', period: 1 },

    // Period 2
    { symbol: 'Li', atomicNumber: 3, name: 'Lithium', category: 'alkali-metal', electronShellGroup: 's', period: 2 },
    { symbol: 'Be', atomicNumber: 4, name: 'Beryllium', category: 'alkaline-earth', electronShellGroup: 's', period: 2 },

    // Period 3
    { symbol: 'Na', atomicNumber: 11, name: 'Sodium', category: 'alkali-metal', electronShellGroup: 's', period: 3 },
    { symbol: 'Mg', atomicNumber: 12, name: 'Magnesium', category: 'alkaline-earth', electronShellGroup: 's', period: 3 },

    // Period 4
    { symbol: 'K', atomicNumber: 19, name: 'Potassium', category: 'alkali-metal', electronShellGroup: 's', period: 4 },
    { symbol: 'Ca', atomicNumber: 20, name: 'Calcium', category: 'alkaline-earth', electronShellGroup: 's', period: 4 },

    // Period 5
    { symbol: 'Rb', atomicNumber: 37, name: 'Rubidium', category: 'alkali-metal', electronShellGroup: 's', period: 5 },
    { symbol: 'Sr', atomicNumber: 38, name: 'Strontium', category: 'alkaline-earth', electronShellGroup: 's', period: 5 },

    // Period 6
    { symbol: 'Cs', atomicNumber: 55, name: 'Cesium', category: 'alkali-metal', electronShellGroup: 's', period: 6 },
    { symbol: 'Ba', atomicNumber: 56, name: 'Barium', category: 'alkaline-earth', electronShellGroup: 's', period: 6 },

    // Period 7
    { symbol: 'Fr', atomicNumber: 87, name: 'Francium', category: 'alkali-metal', electronShellGroup: 's', period: 7 },
    { symbol: 'Ra', atomicNumber: 88, name: 'Radium', category: 'alkaline-earth', electronShellGroup: 's', period: 7 },
];

// F-Block Elements (Lanthanides and Actinides)
export const F_BLOCK_ATOMIC_DATA: AtomicElement[] = [
    // Lanthanides (Period 6)
    { symbol: 'La', atomicNumber: 57, name: 'Lanthanum', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Ce', atomicNumber: 58, name: 'Cerium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Pr', atomicNumber: 59, name: 'Praseodymium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Nd', atomicNumber: 60, name: 'Neodymium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Pm', atomicNumber: 61, name: 'Promethium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Sm', atomicNumber: 62, name: 'Samarium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Eu', atomicNumber: 63, name: 'Europium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Gd', atomicNumber: 64, name: 'Gadolinium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Tb', atomicNumber: 65, name: 'Terbium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Dy', atomicNumber: 66, name: 'Dysprosium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Ho', atomicNumber: 67, name: 'Holmium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Er', atomicNumber: 68, name: 'Erbium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Tm', atomicNumber: 69, name: 'Thulium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Yb', atomicNumber: 70, name: 'Ytterbium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },
    { symbol: 'Lu', atomicNumber: 71, name: 'Lutetium', category: 'lanthanide', electronShellGroup: 'f', period: 6 },

    // Actinides (Period 7)
    { symbol: 'Ac', atomicNumber: 89, name: 'Actinium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Th', atomicNumber: 90, name: 'Thorium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Pa', atomicNumber: 91, name: 'Protactinium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'U', atomicNumber: 92, name: 'Uranium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Np', atomicNumber: 93, name: 'Neptunium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Pu', atomicNumber: 94, name: 'Plutonium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Am', atomicNumber: 95, name: 'Americium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Cm', atomicNumber: 96, name: 'Curium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Bk', atomicNumber: 97, name: 'Berkelium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Cf', atomicNumber: 98, name: 'Californium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Es', atomicNumber: 99, name: 'Einsteinium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Fm', atomicNumber: 100, name: 'Fermium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Md', atomicNumber: 101, name: 'Mendelevium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'No', atomicNumber: 102, name: 'Nobelium', category: 'actinide', electronShellGroup: 'f', period: 7 },
    { symbol: 'Lr', atomicNumber: 103, name: 'Lawrencium', category: 'actinide', electronShellGroup: 'f', period: 7 },
];

// D-Block Elements (Groups 3-12, Transition metals)
export const D_BLOCK_ATOMIC_DATA: AtomicElement[] = [
    // Period 4
    { symbol: 'Sc', atomicNumber: 21, name: 'Scandium', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'Ti', atomicNumber: 22, name: 'Titanium', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'V', atomicNumber: 23, name: 'Vanadium', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'Cr', atomicNumber: 24, name: 'Chromium', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'Mn', atomicNumber: 25, name: 'Manganese', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'Fe', atomicNumber: 26, name: 'Iron', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'Co', atomicNumber: 27, name: 'Cobalt', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'Ni', atomicNumber: 28, name: 'Nickel', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'Cu', atomicNumber: 29, name: 'Copper', category: 'transition-metal', electronShellGroup: 'd', period: 4 },
    { symbol: 'Zn', atomicNumber: 30, name: 'Zinc', category: 'transition-metal', electronShellGroup: 'd', period: 4 },

    // Period 5
    { symbol: 'Y', atomicNumber: 39, name: 'Yttrium', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Zr', atomicNumber: 40, name: 'Zirconium', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Nb', atomicNumber: 41, name: 'Niobium', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Mo', atomicNumber: 42, name: 'Molybdenum', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Tc', atomicNumber: 43, name: 'Technetium', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Ru', atomicNumber: 44, name: 'Ruthenium', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Rh', atomicNumber: 45, name: 'Rhodium', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Pd', atomicNumber: 46, name: 'Palladium', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Ag', atomicNumber: 47, name: 'Silver', category: 'transition-metal', electronShellGroup: 'd', period: 5 },
    { symbol: 'Cd', atomicNumber: 48, name: 'Cadmium', category: 'transition-metal', electronShellGroup: 'd', period: 5 },

    // Period 6
    { symbol: 'Hf', atomicNumber: 72, name: 'Hafnium', category: 'transition-metal', electronShellGroup: 'd', period: 6 },
    { symbol: 'Ta', atomicNumber: 73, name: 'Tantalum', category: 'transition-metal', electronShellGroup: 'd', period: 6 },
    { symbol: 'W', atomicNumber: 74, name: 'Tungsten', category: 'transition-metal', electronShellGroup: 'd', period: 6 },
    { symbol: 'Re', atomicNumber: 75, name: 'Rhenium', category: 'transition-metal', electronShellGroup: 'd', period: 6 },
    { symbol: 'Os', atomicNumber: 76, name: 'Osmium', category: 'transition-metal', electronShellGroup: 'd', period: 6 },
    { symbol: 'Ir', atomicNumber: 77, name: 'Iridium', category: 'transition-metal', electronShellGroup: 'd', period: 6 },
    { symbol: 'Pt', atomicNumber: 78, name: 'Platinum', category: 'transition-metal', electronShellGroup: 'd', period: 6 },
    { symbol: 'Au', atomicNumber: 79, name: 'Gold', category: 'transition-metal', electronShellGroup: 'd', period: 6 },
    { symbol: 'Hg', atomicNumber: 80, name: 'Mercury', category: 'transition-metal', electronShellGroup: 'd', period: 6 },

    // Period 7
    { symbol: 'Rf', atomicNumber: 104, name: 'Rutherfordium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
    { symbol: 'Db', atomicNumber: 105, name: 'Dubnium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
    { symbol: 'Sg', atomicNumber: 106, name: 'Seaborgium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
    { symbol: 'Bh', atomicNumber: 107, name: 'Bohrium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
    { symbol: 'Hs', atomicNumber: 108, name: 'Hassium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
    { symbol: 'Mt', atomicNumber: 109, name: 'Meitnerium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
    { symbol: 'Ds', atomicNumber: 110, name: 'Darmstadtium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
    { symbol: 'Rg', atomicNumber: 111, name: 'Roentgenium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
    { symbol: 'Cn', atomicNumber: 112, name: 'Copernicium', category: 'transition-metal', electronShellGroup: 'd', period: 7 },
];

// P-Block Elements (Groups 13-18, including noble gases)
export const P_BLOCK_ATOMIC_DATA: AtomicElement[] = [
    // Period 1
    { symbol: 'He', atomicNumber: 2, name: 'Helium', category: 'noble-gas', electronShellGroup: 'p', period: 1 },

    // Period 2
    { symbol: 'B', atomicNumber: 5, name: 'Boron', category: 'metalloid', electronShellGroup: 'p', period: 2 },
    { symbol: 'C', atomicNumber: 6, name: 'Carbon', category: 'nonmetal', electronShellGroup: 'p', period: 2 },
    { symbol: 'N', atomicNumber: 7, name: 'Nitrogen', category: 'nonmetal', electronShellGroup: 'p', period: 2 },
    { symbol: 'O', atomicNumber: 8, name: 'Oxygen', category: 'nonmetal', electronShellGroup: 'p', period: 2 },
    { symbol: 'F', atomicNumber: 9, name: 'Fluorine', category: 'nonmetal', electronShellGroup: 'p', period: 2 },
    { symbol: 'Ne', atomicNumber: 10, name: 'Neon', category: 'noble-gas', electronShellGroup: 'p', period: 2 },

    // Period 3
    { symbol: 'Al', atomicNumber: 13, name: 'Aluminum', category: 'post-transition-metal', electronShellGroup: 'p', period: 3 },
    { symbol: 'Si', atomicNumber: 14, name: 'Silicon', category: 'metalloid', electronShellGroup: 'p', period: 3 },
    { symbol: 'P', atomicNumber: 15, name: 'Phosphorus', category: 'nonmetal', electronShellGroup: 'p', period: 3 },
    { symbol: 'S', atomicNumber: 16, name: 'Sulfur', category: 'nonmetal', electronShellGroup: 'p', period: 3 },
    { symbol: 'Cl', atomicNumber: 17, name: 'Chlorine', category: 'nonmetal', electronShellGroup: 'p', period: 3 },
    { symbol: 'Ar', atomicNumber: 18, name: 'Argon', category: 'noble-gas', electronShellGroup: 'p', period: 3 },

    // Period 4
    { symbol: 'Ga', atomicNumber: 31, name: 'Gallium', category: 'post-transition-metal', electronShellGroup: 'p', period: 4 },
    { symbol: 'Ge', atomicNumber: 32, name: 'Germanium', category: 'metalloid', electronShellGroup: 'p', period: 4 },
    { symbol: 'As', atomicNumber: 33, name: 'Arsenic', category: 'metalloid', electronShellGroup: 'p', period: 4 },
    { symbol: 'Se', atomicNumber: 34, name: 'Selenium', category: 'nonmetal', electronShellGroup: 'p', period: 4 },
    { symbol: 'Br', atomicNumber: 35, name: 'Bromine', category: 'nonmetal', electronShellGroup: 'p', period: 4 },
    { symbol: 'Kr', atomicNumber: 36, name: 'Krypton', category: 'noble-gas', electronShellGroup: 'p', period: 4 },

    // Period 5
    { symbol: 'In', atomicNumber: 49, name: 'Indium', category: 'post-transition-metal', electronShellGroup: 'p', period: 5 },
    { symbol: 'Sn', atomicNumber: 50, name: 'Tin', category: 'post-transition-metal', electronShellGroup: 'p', period: 5 },
    { symbol: 'Sb', atomicNumber: 51, name: 'Antimony', category: 'metalloid', electronShellGroup: 'p', period: 5 },
    { symbol: 'Te', atomicNumber: 52, name: 'Tellurium', category: 'metalloid', electronShellGroup: 'p', period: 5 },
    { symbol: 'I', atomicNumber: 53, name: 'Iodine', category: 'nonmetal', electronShellGroup: 'p', period: 5 },
    { symbol: 'Xe', atomicNumber: 54, name: 'Xenon', category: 'noble-gas', electronShellGroup: 'p', period: 5 },

    // Period 6
    { symbol: 'Tl', atomicNumber: 81, name: 'Thallium', category: 'post-transition-metal', electronShellGroup: 'p', period: 6 },
    { symbol: 'Pb', atomicNumber: 82, name: 'Lead', category: 'post-transition-metal', electronShellGroup: 'p', period: 6 },
    { symbol: 'Bi', atomicNumber: 83, name: 'Bismuth', category: 'post-transition-metal', electronShellGroup: 'p', period: 6 },
    { symbol: 'Po', atomicNumber: 84, name: 'Polonium', category: 'post-transition-metal', electronShellGroup: 'p', period: 6 },
    { symbol: 'At', atomicNumber: 85, name: 'Astatine', category: 'metalloid', electronShellGroup: 'p', period: 6 },
    { symbol: 'Rn', atomicNumber: 86, name: 'Radon', category: 'noble-gas', electronShellGroup: 'p', period: 6 },

    // Period 7
    { symbol: 'Nh', atomicNumber: 113, name: 'Nihonium', category: 'post-transition-metal', electronShellGroup: 'p', period: 7 },
    { symbol: 'Fl', atomicNumber: 114, name: 'Flerovium', category: 'post-transition-metal', electronShellGroup: 'p', period: 7 },
    { symbol: 'Mc', atomicNumber: 115, name: 'Moscovium', category: 'post-transition-metal', electronShellGroup: 'p', period: 7 },
    { symbol: 'Lv', atomicNumber: 116, name: 'Livermorium', category: 'post-transition-metal', electronShellGroup: 'p', period: 7 },
    { symbol: 'Ts', atomicNumber: 117, name: 'Tennessine', category: 'nonmetal', electronShellGroup: 'p', period: 7 },
    { symbol: 'Og', atomicNumber: 118, name: 'Oganesson', category: 'noble-gas', electronShellGroup: 'p', period: 7 },
];

// Combined atomic data (all elements)
export const ALL_ATOMIC_ELEMENTS: AtomicElement[] = [
    ...S_BLOCK_ATOMIC_DATA,
    ...F_BLOCK_ATOMIC_DATA,
    ...D_BLOCK_ATOMIC_DATA,
    ...P_BLOCK_ATOMIC_DATA,
];

// Helper functions
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
    switch (shellGroup) {
        case 's': return S_BLOCK_ATOMIC_DATA;
        case 'p': return P_BLOCK_ATOMIC_DATA;
        case 'd': return D_BLOCK_ATOMIC_DATA;
        case 'f': return F_BLOCK_ATOMIC_DATA;
        default: return [];
    }
};