// the origin source for this file is particle-atomic.data.ts need to migrate all needed helper function from here.
// TODO: remove this file after all the code is migrated to the new file
import { , type ParticleAtomicData } from './particle-atomic.data.ts 22-38-27-025';

// Re-export for backward compatibility
export { PERIODIC_TABLE_DATA as PERIODIC_TABLE_ELEMENTS, type PeriodicElement };

// S-Block Elements (Groups 1-2, Alkali and Alkaline Earth metals)
export const S_BLOCK_ELEMENTS: PeriodicElement[] = PERIODIC_TABLE_DATA.filter(
    element => element.electronShellGroup === 's'
);

// F-Block Elements (Lanthanides and Actinides)
export const F_BLOCK_ELEMENTS: PeriodicElement[] = PERIODIC_TABLE_DATA.filter(
    element => element.electronShellGroup === 'f'
);

// D-Block Elements (Groups 3-12, Transition metals)
export const D_BLOCK_ELEMENTS: PeriodicElement[] = PERIODIC_TABLE_DATA.filter(
    element => element.electronShellGroup === 'd'
);

// P-Block Elements (Groups 13-18, including noble gases)
export const P_BLOCK_ELEMENTS: PeriodicElement[] = PERIODIC_TABLE_DATA.filter(
    element => element.electronShellGroup === 'p'
);

// Grid dimensions for different views
export const PERIODIC_TABLE_GRID_DIMENSIONS = {
    //TODO: this cound be automatticaly recalcualted based on the nubmer of elements and the short or lng type of table, maybe? becauee later on we will have the case wehn the Mperiodic table dispalyed not fully but even more shorter way some of the element wount be "researched" at certain points, so  we definatley need a dynamic way of calculating overall shape of UIPaginatorGrid
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
    return PERIODIC_TABLE_DATA.find(element => element.atomicNumber === atomicNumber);
};

// Helper function to get element by symbol
export const getElementBySymbol = (symbol: string): PeriodicElement | undefined => {
    return PERIODIC_TABLE_DATA.find(element => element.symbol === symbol);
};

// Helper function to get elements by category
export const getElementsByCategory = (category: PeriodicElement['category']): PeriodicElement[] => {
    return PERIODIC_TABLE_DATA.filter(element => element.category === category);
};