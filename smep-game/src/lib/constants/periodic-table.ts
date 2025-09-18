// Periodic Table Constants - All 118 elements with correct standard periodic table layout
// Layout: S-block (left), F-block (lanthanides/actinides), D-block (transition metals), P-block (right)

export interface PeriodicElement {
    id: string;
    symbol: string;
    name: string;
    atomicNumber: number;
    position: { x: number; y: number };
    category: 'alkali-metal' | 'alkaline-earth' | 'transition-metal' | 'post-transition-metal' |
    'metalloid' | 'nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide' | 'unknown';
    electronShellGroup: 's' | 'p' | 'd' | 'f';
    period: number;
    group: number;
}

// S-Block Elements (Groups 1-2, Alkali and Alkaline Earth metals)
export const S_BLOCK_ELEMENTS: PeriodicElement[] = [
    // Period 1
    { id: 'H', symbol: 'H', name: 'Hydrogen', atomicNumber: 1, position: { x: 0, y: 0 }, category: 'nonmetal', electronShellGroup: 's', period: 1, group: 1 },

    // Period 2
    { id: 'Li', symbol: 'Li', name: 'Lithium', atomicNumber: 3, position: { x: 0, y: 1 }, category: 'alkali-metal', electronShellGroup: 's', period: 2, group: 1 },
    { id: 'Be', symbol: 'Be', name: 'Beryllium', atomicNumber: 4, position: { x: 1, y: 1 }, category: 'alkaline-earth', electronShellGroup: 's', period: 2, group: 2 },

    // Period 3
    { id: 'Na', symbol: 'Na', name: 'Sodium', atomicNumber: 11, position: { x: 0, y: 2 }, category: 'alkali-metal', electronShellGroup: 's', period: 3, group: 1 },
    { id: 'Mg', symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, position: { x: 1, y: 2 }, category: 'alkaline-earth', electronShellGroup: 's', period: 3, group: 2 },

    // Period 4
    { id: 'K', symbol: 'K', name: 'Potassium', atomicNumber: 19, position: { x: 0, y: 3 }, category: 'alkali-metal', electronShellGroup: 's', period: 4, group: 1 },
    { id: 'Ca', symbol: 'Ca', name: 'Calcium', atomicNumber: 20, position: { x: 1, y: 3 }, category: 'alkaline-earth', electronShellGroup: 's', period: 4, group: 2 },

    // Period 5
    { id: 'Rb', symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, position: { x: 0, y: 4 }, category: 'alkali-metal', electronShellGroup: 's', period: 5, group: 1 },
    { id: 'Sr', symbol: 'Sr', name: 'Strontium', atomicNumber: 38, position: { x: 1, y: 4 }, category: 'alkaline-earth', electronShellGroup: 's', period: 5, group: 2 },

    // Period 6
    { id: 'Cs', symbol: 'Cs', name: 'Cesium', atomicNumber: 55, position: { x: 0, y: 5 }, category: 'alkali-metal', electronShellGroup: 's', period: 6, group: 1 },
    { id: 'Ba', symbol: 'Ba', name: 'Barium', atomicNumber: 56, position: { x: 1, y: 5 }, category: 'alkaline-earth', electronShellGroup: 's', period: 6, group: 2 },

    // Period 7
    { id: 'Fr', symbol: 'Fr', name: 'Francium', atomicNumber: 87, position: { x: 0, y: 6 }, category: 'alkali-metal', electronShellGroup: 's', period: 7, group: 1 },
    { id: 'Ra', symbol: 'Ra', name: 'Radium', atomicNumber: 88, position: { x: 1, y: 6 }, category: 'alkaline-earth', electronShellGroup: 's', period: 7, group: 2 },
];

// F-Block Elements (Lanthanides and Actinides) - positioned in separate rows
export const F_BLOCK_ELEMENTS: PeriodicElement[] = [
    // Lanthanides (Period 6)
    { id: 'La', symbol: 'La', name: 'Lanthanum', atomicNumber: 57, position: { x: 2, y: 5 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 3 },
    { id: 'Ce', symbol: 'Ce', name: 'Cerium', atomicNumber: 58, position: { x: 2, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Pr', symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, position: { x: 3, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Nd', symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, position: { x: 4, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Pm', symbol: 'Pm', name: 'Promethium', atomicNumber: 61, position: { x: 5, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Sm', symbol: 'Sm', name: 'Samarium', atomicNumber: 62, position: { x: 6, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Eu', symbol: 'Eu', name: 'Europium', atomicNumber: 63, position: { x: 7, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Gd', symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, position: { x: 8, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Tb', symbol: 'Tb', name: 'Terbium', atomicNumber: 65, position: { x: 9, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Dy', symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, position: { x: 10, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Ho', symbol: 'Ho', name: 'Holmium', atomicNumber: 67, position: { x: 11, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Er', symbol: 'Er', name: 'Erbium', atomicNumber: 68, position: { x: 12, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Tm', symbol: 'Tm', name: 'Thulium', atomicNumber: 69, position: { x: 13, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Yb', symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, position: { x: 14, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },
    { id: 'Lu', symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, position: { x: 15, y: 7 }, category: 'lanthanide', electronShellGroup: 'f', period: 6, group: 0 },

    // Actinides (Period 7)
    { id: 'Ac', symbol: 'Ac', name: 'Actinium', atomicNumber: 89, position: { x: 2, y: 6 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 3 },
    { id: 'Th', symbol: 'Th', name: 'Thorium', atomicNumber: 90, position: { x: 2, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Pa', symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, position: { x: 3, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'U', symbol: 'U', name: 'Uranium', atomicNumber: 92, position: { x: 4, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Np', symbol: 'Np', name: 'Neptunium', atomicNumber: 93, position: { x: 5, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Pu', symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, position: { x: 6, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Am', symbol: 'Am', name: 'Americium', atomicNumber: 95, position: { x: 7, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Cm', symbol: 'Cm', name: 'Curium', atomicNumber: 96, position: { x: 8, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Bk', symbol: 'Bk', name: 'Berkelium', atomicNumber: 97, position: { x: 9, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Cf', symbol: 'Cf', name: 'Californium', atomicNumber: 98, position: { x: 10, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Es', symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, position: { x: 11, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Fm', symbol: 'Fm', name: 'Fermium', atomicNumber: 100, position: { x: 12, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Md', symbol: 'Md', name: 'Mendelevium', atomicNumber: 101, position: { x: 13, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'No', symbol: 'No', name: 'Nobelium', atomicNumber: 102, position: { x: 14, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
    { id: 'Lr', symbol: 'Lr', name: 'Lawrencium', atomicNumber: 103, position: { x: 15, y: 8 }, category: 'actinide', electronShellGroup: 'f', period: 7, group: 0 },
];

// D-Block Elements (Groups 3-12, Transition metals)
export const D_BLOCK_ELEMENTS: PeriodicElement[] = [
    // Period 4
    { id: 'Sc', symbol: 'Sc', name: 'Scandium', atomicNumber: 21, position: { x: 2, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 3 },
    { id: 'Ti', symbol: 'Ti', name: 'Titanium', atomicNumber: 22, position: { x: 3, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 4 },
    { id: 'V', symbol: 'V', name: 'Vanadium', atomicNumber: 23, position: { x: 4, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 5 },
    { id: 'Cr', symbol: 'Cr', name: 'Chromium', atomicNumber: 24, position: { x: 5, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 6 },
    { id: 'Mn', symbol: 'Mn', name: 'Manganese', atomicNumber: 25, position: { x: 6, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 7 },
    { id: 'Fe', symbol: 'Fe', name: 'Iron', atomicNumber: 26, position: { x: 7, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 8 },
    { id: 'Co', symbol: 'Co', name: 'Cobalt', atomicNumber: 27, position: { x: 8, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 9 },
    { id: 'Ni', symbol: 'Ni', name: 'Nickel', atomicNumber: 28, position: { x: 9, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 10 },
    { id: 'Cu', symbol: 'Cu', name: 'Copper', atomicNumber: 29, position: { x: 10, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 11 },
    { id: 'Zn', symbol: 'Zn', name: 'Zinc', atomicNumber: 30, position: { x: 11, y: 3 }, category: 'transition-metal', electronShellGroup: 'd', period: 4, group: 12 },

    // Period 5
    { id: 'Y', symbol: 'Y', name: 'Yttrium', atomicNumber: 39, position: { x: 2, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 3 },
    { id: 'Zr', symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, position: { x: 3, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 4 },
    { id: 'Nb', symbol: 'Nb', name: 'Niobium', atomicNumber: 41, position: { x: 4, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 5 },
    { id: 'Mo', symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, position: { x: 5, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 6 },
    { id: 'Tc', symbol: 'Tc', name: 'Technetium', atomicNumber: 43, position: { x: 6, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 7 },
    { id: 'Ru', symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, position: { x: 7, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 8 },
    { id: 'Rh', symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, position: { x: 8, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 9 },
    { id: 'Pd', symbol: 'Pd', name: 'Palladium', atomicNumber: 46, position: { x: 9, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 10 },
    { id: 'Ag', symbol: 'Ag', name: 'Silver', atomicNumber: 47, position: { x: 10, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 11 },
    { id: 'Cd', symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, position: { x: 11, y: 4 }, category: 'transition-metal', electronShellGroup: 'd', period: 5, group: 12 },

    // Period 6 (connected to F-block)
    { id: 'Hf', symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, position: { x: 3, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 4 },
    { id: 'Ta', symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, position: { x: 4, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 5 },
    { id: 'W', symbol: 'W', name: 'Tungsten', atomicNumber: 74, position: { x: 5, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 6 },
    { id: 'Re', symbol: 'Re', name: 'Rhenium', atomicNumber: 75, position: { x: 6, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 7 },
    { id: 'Os', symbol: 'Os', name: 'Osmium', atomicNumber: 76, position: { x: 7, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 8 },
    { id: 'Ir', symbol: 'Ir', name: 'Iridium', atomicNumber: 77, position: { x: 8, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 9 },
    { id: 'Pt', symbol: 'Pt', name: 'Platinum', atomicNumber: 78, position: { x: 9, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 10 },
    { id: 'Au', symbol: 'Au', name: 'Gold', atomicNumber: 79, position: { x: 10, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 11 },
    { id: 'Hg', symbol: 'Hg', name: 'Mercury', atomicNumber: 80, position: { x: 11, y: 5 }, category: 'transition-metal', electronShellGroup: 'd', period: 6, group: 12 },

    // Period 7 (connected to F-block)
    { id: 'Rf', symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, position: { x: 3, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 4 },
    { id: 'Db', symbol: 'Db', name: 'Dubnium', atomicNumber: 105, position: { x: 4, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 5 },
    { id: 'Sg', symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, position: { x: 5, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 6 },
    { id: 'Bh', symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, position: { x: 6, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 7 },
    { id: 'Hs', symbol: 'Hs', name: 'Hassium', atomicNumber: 108, position: { x: 7, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 8 },
    { id: 'Mt', symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, position: { x: 8, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 9 },
    { id: 'Ds', symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, position: { x: 9, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 10 },
    { id: 'Rg', symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, position: { x: 10, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 11 },
    { id: 'Cn', symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, position: { x: 11, y: 6 }, category: 'transition-metal', electronShellGroup: 'd', period: 7, group: 12 },
];

// P-Block Elements (Groups 13-18, including noble gases)
export const P_BLOCK_ELEMENTS: PeriodicElement[] = [
    // Period 1
    { id: 'He', symbol: 'He', name: 'Helium', atomicNumber: 2, position: { x: 17, y: 0 }, category: 'noble-gas', electronShellGroup: 'p', period: 1, group: 18 },

    // Period 2
    { id: 'B', symbol: 'B', name: 'Boron', atomicNumber: 5, position: { x: 12, y: 1 }, category: 'metalloid', electronShellGroup: 'p', period: 2, group: 13 },
    { id: 'C', symbol: 'C', name: 'Carbon', atomicNumber: 6, position: { x: 13, y: 1 }, category: 'nonmetal', electronShellGroup: 'p', period: 2, group: 14 },
    { id: 'N', symbol: 'N', name: 'Nitrogen', atomicNumber: 7, position: { x: 14, y: 1 }, category: 'nonmetal', electronShellGroup: 'p', period: 2, group: 15 },
    { id: 'O', symbol: 'O', name: 'Oxygen', atomicNumber: 8, position: { x: 15, y: 1 }, category: 'nonmetal', electronShellGroup: 'p', period: 2, group: 16 },
    { id: 'F', symbol: 'F', name: 'Fluorine', atomicNumber: 9, position: { x: 16, y: 1 }, category: 'nonmetal', electronShellGroup: 'p', period: 2, group: 17 },
    { id: 'Ne', symbol: 'Ne', name: 'Neon', atomicNumber: 10, position: { x: 17, y: 1 }, category: 'noble-gas', electronShellGroup: 'p', period: 2, group: 18 },

    // Period 3
    { id: 'Al', symbol: 'Al', name: 'Aluminum', atomicNumber: 13, position: { x: 12, y: 2 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 3, group: 13 },
    { id: 'Si', symbol: 'Si', name: 'Silicon', atomicNumber: 14, position: { x: 13, y: 2 }, category: 'metalloid', electronShellGroup: 'p', period: 3, group: 14 },
    { id: 'P', symbol: 'P', name: 'Phosphorus', atomicNumber: 15, position: { x: 14, y: 2 }, category: 'nonmetal', electronShellGroup: 'p', period: 3, group: 15 },
    { id: 'S', symbol: 'S', name: 'Sulfur', atomicNumber: 16, position: { x: 15, y: 2 }, category: 'nonmetal', electronShellGroup: 'p', period: 3, group: 16 },
    { id: 'Cl', symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, position: { x: 16, y: 2 }, category: 'nonmetal', electronShellGroup: 'p', period: 3, group: 17 },
    { id: 'Ar', symbol: 'Ar', name: 'Argon', atomicNumber: 18, position: { x: 17, y: 2 }, category: 'noble-gas', electronShellGroup: 'p', period: 3, group: 18 },

    // Period 4
    { id: 'Ga', symbol: 'Ga', name: 'Gallium', atomicNumber: 31, position: { x: 12, y: 3 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 4, group: 13 },
    { id: 'Ge', symbol: 'Ge', name: 'Germanium', atomicNumber: 32, position: { x: 13, y: 3 }, category: 'metalloid', electronShellGroup: 'p', period: 4, group: 14 },
    { id: 'As', symbol: 'As', name: 'Arsenic', atomicNumber: 33, position: { x: 14, y: 3 }, category: 'metalloid', electronShellGroup: 'p', period: 4, group: 15 },
    { id: 'Se', symbol: 'Se', name: 'Selenium', atomicNumber: 34, position: { x: 15, y: 3 }, category: 'nonmetal', electronShellGroup: 'p', period: 4, group: 16 },
    { id: 'Br', symbol: 'Br', name: 'Bromine', atomicNumber: 35, position: { x: 16, y: 3 }, category: 'nonmetal', electronShellGroup: 'p', period: 4, group: 17 },
    { id: 'Kr', symbol: 'Kr', name: 'Krypton', atomicNumber: 36, position: { x: 17, y: 3 }, category: 'noble-gas', electronShellGroup: 'p', period: 4, group: 18 },

    // Period 5
    { id: 'In', symbol: 'In', name: 'Indium', atomicNumber: 49, position: { x: 12, y: 4 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 5, group: 13 },
    { id: 'Sn', symbol: 'Sn', name: 'Tin', atomicNumber: 50, position: { x: 13, y: 4 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 5, group: 14 },
    { id: 'Sb', symbol: 'Sb', name: 'Antimony', atomicNumber: 51, position: { x: 14, y: 4 }, category: 'metalloid', electronShellGroup: 'p', period: 5, group: 15 },
    { id: 'Te', symbol: 'Te', name: 'Tellurium', atomicNumber: 52, position: { x: 15, y: 4 }, category: 'metalloid', electronShellGroup: 'p', period: 5, group: 16 },
    { id: 'I', symbol: 'I', name: 'Iodine', atomicNumber: 53, position: { x: 16, y: 4 }, category: 'nonmetal', electronShellGroup: 'p', period: 5, group: 17 },
    { id: 'Xe', symbol: 'Xe', name: 'Xenon', atomicNumber: 54, position: { x: 17, y: 4 }, category: 'noble-gas', electronShellGroup: 'p', period: 5, group: 18 },

    // Period 6
    { id: 'Tl', symbol: 'Tl', name: 'Thallium', atomicNumber: 81, position: { x: 12, y: 5 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 6, group: 13 },
    { id: 'Pb', symbol: 'Pb', name: 'Lead', atomicNumber: 82, position: { x: 13, y: 5 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 6, group: 14 },
    { id: 'Bi', symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, position: { x: 14, y: 5 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 6, group: 15 },
    { id: 'Po', symbol: 'Po', name: 'Polonium', atomicNumber: 84, position: { x: 15, y: 5 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 6, group: 16 },
    { id: 'At', symbol: 'At', name: 'Astatine', atomicNumber: 85, position: { x: 16, y: 5 }, category: 'metalloid', electronShellGroup: 'p', period: 6, group: 17 },
    { id: 'Rn', symbol: 'Rn', name: 'Radon', atomicNumber: 86, position: { x: 17, y: 5 }, category: 'noble-gas', electronShellGroup: 'p', period: 6, group: 18 },

    // Period 7
    { id: 'Nh', symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, position: { x: 12, y: 6 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 7, group: 13 },
    { id: 'Fl', symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, position: { x: 13, y: 6 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 7, group: 14 },
    { id: 'Mc', symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, position: { x: 14, y: 6 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 7, group: 15 },
    { id: 'Lv', symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, position: { x: 15, y: 6 }, category: 'post-transition-metal', electronShellGroup: 'p', period: 7, group: 16 },
    { id: 'Ts', symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, position: { x: 16, y: 6 }, category: 'nonmetal', electronShellGroup: 'p', period: 7, group: 17 },
    { id: 'Og', symbol: 'Og', name: 'Oganesson', atomicNumber: 118, position: { x: 17, y: 6 }, category: 'noble-gas', electronShellGroup: 'p', period: 7, group: 18 },
];

// Combined periodic table (all elements)
export const PERIODIC_TABLE_ELEMENTS: PeriodicElement[] = [
    ...S_BLOCK_ELEMENTS,
    ...F_BLOCK_ELEMENTS,
    ...D_BLOCK_ELEMENTS,
    ...P_BLOCK_ELEMENTS,
];

// Grid dimensions for different views
export const PERIODIC_TABLE_GRID_DIMENSIONS = {
    // Long form (standard periodic table with F-block integrated)
    longForm: {
        width: 18,
        height: 9
    },
    // Short form (F-block moved under the table)
    shortForm: {
        width: 18,
        height: 9
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