/**
 * Particle Atomic Data - All 118 elements with complete properties
 * 
 * This is the single source of truth for all atomic element data.
 * Converted from JSON to TypeScript for better type safety and performance.
 * 
 * This file combines all periodic table functionality including:
 * - Element data and properties
 * - Layout definitions (long form and short form)
 * - Position mapping functions
 * - Helper functions for accessing elements
 */

/**
 * Type definitions for atomic element data
 */

// Base properties interface
export interface AtomicProperties {
    symbol: string;
    atomicNumber: number;
    name: string;
    category: 'alkali-metal' | 'alkaline-earth' | 'transition-metal' | 'post-transition-metal' |
    'metalloid' | 'nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide' | 'unknown';
    electronShellGroup: 's' | 'p' | 'd' | 'f';
    period: number;
    relativeDiameter: number;
}

// Render configuration interface
export interface AtomicRenderConfig {
    coreDiameter: number;
    coreColor: string;
}

// Physics configuration interface
export interface AtomicPhysicsConfig {
    interactionRange: number;
    collisionRadius: number;
    mass: number;
}

// Table position interface
export interface AtomicTablePosition {
    longForm: { x: number; y: number };
    shortForm: { x: number; y: number };
}

// Complete atomic element interface
export interface PeriodicElement {
    properties: AtomicProperties;
    render: AtomicRenderConfig;
    physics: AtomicPhysicsConfig;
    table: AtomicTablePosition;
}

/**
 * Complete periodic table data for all 118 elements
 * Sorted by atomic number (1-118)
 * Using new structured format with properties, render, physics, and table sections
 * 
 * Format: Compact inline objects for better readability and shorter file length.
 * Each element is defined as: { properties: {...}, render: {...}, physics: {...}, table: {...} }
 */
// eslint-disable-next-line @typescript-eslint/object-curly-spacing
export const PERIODIC_TABLE_DATA: readonly PeriodicElement[] = [
    { properties: { symbol: 'H', atomicNumber: 1, name: 'Hydrogen', category: 'nonmetal', electronShellGroup: 's', period: 1, relativeDiameter: 6.625 }, render: { coreDiameter: 4, coreColor: '#ffffff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 0, y: 0 }, shortForm: { x: 0, y: 0 } } },
    { properties: { symbol: 'He', atomicNumber: 2, name: 'Helium', category: 'noble-gas', electronShellGroup: 'p', period: 1, relativeDiameter: 3.875 }, render: { coreDiameter: 4, coreColor: '#d9ffff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 31, y: 0 }, shortForm: { x: 17, y: 0 } } },
    { properties: { symbol: 'Li', atomicNumber: 3, name: 'Lithium', category: 'alkali-metal', electronShellGroup: 's', period: 2, relativeDiameter: 20.875 }, render: { coreDiameter: 4, coreColor: '#cc80ff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 0, y: 1 }, shortForm: { x: 0, y: 1 } } },
    { properties: { symbol: 'Be', atomicNumber: 4, name: 'Beryllium', category: 'alkaline-earth', electronShellGroup: 's', period: 2, relativeDiameter: 14 }, render: { coreDiameter: 4, coreColor: '#c2ff00' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 1, y: 1 }, shortForm: { x: 1, y: 1 } } },
    { properties: { symbol: 'B', atomicNumber: 5, name: 'Boron', category: 'metalloid', electronShellGroup: 'p', period: 2, relativeDiameter: 10.875 }, render: { coreDiameter: 4, coreColor: '#ffb5b5' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 12, y: 1 }, shortForm: { x: 12, y: 1 } } },
    { properties: { symbol: 'C', atomicNumber: 6, name: 'Carbon', category: 'nonmetal', electronShellGroup: 'p', period: 2, relativeDiameter: 8.375 }, render: { coreDiameter: 4, coreColor: '#909090' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 13, y: 1 }, shortForm: { x: 13, y: 1 } } },
    { properties: { symbol: 'N', atomicNumber: 7, name: 'Nitrogen', category: 'nonmetal', electronShellGroup: 'p', period: 2, relativeDiameter: 7 }, render: { coreDiameter: 4, coreColor: '#3050f8' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 14, y: 1 }, shortForm: { x: 14, y: 1 } } },
    { properties: { symbol: 'O', atomicNumber: 8, name: 'Oxygen', category: 'nonmetal', electronShellGroup: 'p', period: 2, relativeDiameter: 6 }, render: { coreDiameter: 4, coreColor: '#ff0d0d' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 15, y: 1 }, shortForm: { x: 15, y: 1 } } },
    { properties: { symbol: 'F', atomicNumber: 9, name: 'Fluorine', category: 'nonmetal', electronShellGroup: 'p', period: 2, relativeDiameter: 5.25 }, render: { coreDiameter: 4, coreColor: '#90e050' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 16, y: 1 }, shortForm: { x: 16, y: 1 } } },
    { properties: { symbol: 'Ne', atomicNumber: 10, name: 'Neon', category: 'noble-gas', electronShellGroup: 'p', period: 2, relativeDiameter: 4.75 }, render: { coreDiameter: 4, coreColor: '#b3e3f5' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 31, y: 1 }, shortForm: { x: 17, y: 1 } } },
    { properties: { symbol: 'Na', atomicNumber: 11, name: 'Sodium', category: 'alkali-metal', electronShellGroup: 's', period: 3, relativeDiameter: 23.75 }, render: { coreDiameter: 4, coreColor: '#ab5cf2' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 0, y: 2 }, shortForm: { x: 0, y: 2 } } },
    { properties: { symbol: 'Mg', atomicNumber: 12, name: 'Magnesium', category: 'alkaline-earth', electronShellGroup: 's', period: 3, relativeDiameter: 18.125 }, render: { coreDiameter: 4, coreColor: '#8aff00' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 1, y: 2 }, shortForm: { x: 1, y: 2 } } },
    { properties: { symbol: 'Al', atomicNumber: 13, name: 'Aluminum', category: 'post-transition-metal', electronShellGroup: 'p', period: 3, relativeDiameter: 14.75 }, render: { coreDiameter: 4, coreColor: '#bfa6a6' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 12, y: 2 }, shortForm: { x: 12, y: 2 } } },
    { properties: { symbol: 'Si', atomicNumber: 14, name: 'Silicon', category: 'metalloid', electronShellGroup: 'p', period: 3, relativeDiameter: 13.875 }, render: { coreDiameter: 4, coreColor: '#f0c8a0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 13, y: 2 }, shortForm: { x: 13, y: 2 } } },
    { properties: { symbol: 'P', atomicNumber: 15, name: 'Phosphorus', category: 'nonmetal', electronShellGroup: 'p', period: 3, relativeDiameter: 12.25 }, render: { coreDiameter: 4, coreColor: '#ff8000' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 14, y: 2 }, shortForm: { x: 14, y: 2 } } },
    { properties: { symbol: 'S', atomicNumber: 16, name: 'Sulfur', category: 'nonmetal', electronShellGroup: 'p', period: 3, relativeDiameter: 11 }, render: { coreDiameter: 4, coreColor: '#ffff30' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 15, y: 2 }, shortForm: { x: 15, y: 2 } } },
    { properties: { symbol: 'Cl', atomicNumber: 17, name: 'Chlorine', category: 'nonmetal', electronShellGroup: 'p', period: 3, relativeDiameter: 9.875 }, render: { coreDiameter: 4, coreColor: '#1ff01f' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 16, y: 2 }, shortForm: { x: 16, y: 2 } } },
    { properties: { symbol: 'Ar', atomicNumber: 18, name: 'Argon', category: 'noble-gas', electronShellGroup: 'p', period: 3, relativeDiameter: 8.875 }, render: { coreDiameter: 4, coreColor: '#80d1e3' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 31, y: 2 }, shortForm: { x: 17, y: 2 } } },
    { properties: { symbol: 'K', atomicNumber: 19, name: 'Potassium', category: 'alkali-metal', electronShellGroup: 's', period: 4, relativeDiameter: 30.375 }, render: { coreDiameter: 4, coreColor: '#8f40d4' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 0, y: 3 }, shortForm: { x: 0, y: 3 } } },
    { properties: { symbol: 'Ca', atomicNumber: 20, name: 'Calcium', category: 'alkaline-earth', electronShellGroup: 's', period: 4, relativeDiameter: 24.25 }, render: { coreDiameter: 4, coreColor: '#3dff00' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 1, y: 3 }, shortForm: { x: 1, y: 3 } } },
    { properties: { symbol: 'Sc', atomicNumber: 21, name: 'Scandium', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 23 }, render: { coreDiameter: 4, coreColor: '#e6e6e6' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 2, y: 3 }, shortForm: { x: 2, y: 3 } } },
    { properties: { symbol: 'Ti', atomicNumber: 22, name: 'Titanium', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 22 }, render: { coreDiameter: 4, coreColor: '#bfc2c7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 3, y: 3 }, shortForm: { x: 3, y: 3 } } },
    { properties: { symbol: 'V', atomicNumber: 23, name: 'Vanadium', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 21.375 }, render: { coreDiameter: 4, coreColor: '#a6a6ab' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 4, y: 3 }, shortForm: { x: 4, y: 3 } } },
    { properties: { symbol: 'Cr', atomicNumber: 24, name: 'Chromium', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 20.75 }, render: { coreDiameter: 4, coreColor: '#8a99c7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 5, y: 3 }, shortForm: { x: 5, y: 3 } } },
    { properties: { symbol: 'Mn', atomicNumber: 25, name: 'Manganese', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 20.125 }, render: { coreDiameter: 4, coreColor: '#9c7ac7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 6, y: 3 }, shortForm: { x: 6, y: 3 } } },
    { properties: { symbol: 'Fe', atomicNumber: 26, name: 'Iron', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 19.5 }, render: { coreDiameter: 4, coreColor: '#e06633' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 7, y: 3 }, shortForm: { x: 7, y: 3 } } },
    { properties: { symbol: 'Co', atomicNumber: 27, name: 'Cobalt', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 19 }, render: { coreDiameter: 4, coreColor: '#f090a0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 8, y: 3 }, shortForm: { x: 8, y: 3 } } },
    { properties: { symbol: 'Ni', atomicNumber: 28, name: 'Nickel', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 18.625 }, render: { coreDiameter: 4, coreColor: '#50d050' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 9, y: 3 }, shortForm: { x: 9, y: 3 } } },
    { properties: { symbol: 'Cu', atomicNumber: 29, name: 'Copper', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 18.125 }, render: { coreDiameter: 4, coreColor: '#c88033' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 10, y: 3 }, shortForm: { x: 10, y: 3 } } },
    { properties: { symbol: 'Zn', atomicNumber: 30, name: 'Zinc', category: 'transition-metal', electronShellGroup: 'd', period: 4, relativeDiameter: 17.75 }, render: { coreDiameter: 4, coreColor: '#7d80b0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 11, y: 3 }, shortForm: { x: 11, y: 3 } } },
    { properties: { symbol: 'Ga', atomicNumber: 31, name: 'Gallium', category: 'post-transition-metal', electronShellGroup: 'p', period: 4, relativeDiameter: 17 }, render: { coreDiameter: 4, coreColor: '#c28f8f' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 12, y: 3 }, shortForm: { x: 12, y: 3 } } },
    { properties: { symbol: 'Ge', atomicNumber: 32, name: 'Germanium', category: 'metalloid', electronShellGroup: 'p', period: 4, relativeDiameter: 15.625 }, render: { coreDiameter: 4, coreColor: '#668f8f' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 13, y: 3 }, shortForm: { x: 13, y: 3 } } },
    { properties: { symbol: 'As', atomicNumber: 33, name: 'Arsenic', category: 'metalloid', electronShellGroup: 'p', period: 4, relativeDiameter: 14.25 }, render: { coreDiameter: 4, coreColor: '#bd80e3' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 14, y: 3 }, shortForm: { x: 14, y: 3 } } },
    { properties: { symbol: 'Se', atomicNumber: 34, name: 'Selenium', category: 'nonmetal', electronShellGroup: 'p', period: 4, relativeDiameter: 12.875 }, render: { coreDiameter: 4, coreColor: '#ffa100' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 15, y: 3 }, shortForm: { x: 15, y: 3 } } },
    { properties: { symbol: 'Br', atomicNumber: 35, name: 'Bromine', category: 'nonmetal', electronShellGroup: 'p', period: 4, relativeDiameter: 11.75 }, render: { coreDiameter: 4, coreColor: '#a62929' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 16, y: 3 }, shortForm: { x: 16, y: 3 } } },
    { properties: { symbol: 'Kr', atomicNumber: 36, name: 'Krypton', category: 'noble-gas', electronShellGroup: 'p', period: 4, relativeDiameter: 11 }, render: { coreDiameter: 4, coreColor: '#5cb8d1' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 31, y: 3 }, shortForm: { x: 17, y: 3 } } },
    { properties: { symbol: 'Rb', atomicNumber: 37, name: 'Rubidium', category: 'alkali-metal', electronShellGroup: 's', period: 5, relativeDiameter: 33.125 }, render: { coreDiameter: 4, coreColor: '#702eb0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 0, y: 4 }, shortForm: { x: 0, y: 4 } } },
    { properties: { symbol: 'Sr', atomicNumber: 38, name: 'Strontium', category: 'alkaline-earth', electronShellGroup: 's', period: 5, relativeDiameter: 27.375 }, render: { coreDiameter: 4, coreColor: '#00ff00' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 1, y: 4 }, shortForm: { x: 1, y: 4 } } },
    { properties: { symbol: 'Y', atomicNumber: 39, name: 'Yttrium', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 26.5 }, render: { coreDiameter: 4, coreColor: '#94ffff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 2, y: 4 }, shortForm: { x: 2, y: 4 } } },
    { properties: { symbol: 'Zr', atomicNumber: 40, name: 'Zirconium', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 25.75 }, render: { coreDiameter: 4, coreColor: '#94e0e0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 3, y: 4 }, shortForm: { x: 3, y: 4 } } },
    { properties: { symbol: 'Nb', atomicNumber: 41, name: 'Niobium', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 25 }, render: { coreDiameter: 4, coreColor: '#73c2c9' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 4, y: 4 }, shortForm: { x: 4, y: 4 } } },
    { properties: { symbol: 'Mo', atomicNumber: 42, name: 'Molybdenum', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 24.25 }, render: { coreDiameter: 4, coreColor: '#54b5b5' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 5, y: 4 }, shortForm: { x: 5, y: 4 } } },
    { properties: { symbol: 'Tc', atomicNumber: 43, name: 'Technetium', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 23.5 }, render: { coreDiameter: 4, coreColor: '#3b9e9e' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 6, y: 4 }, shortForm: { x: 6, y: 4 } } },
    { properties: { symbol: 'Ru', atomicNumber: 44, name: 'Ruthenium', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 22.875 }, render: { coreDiameter: 4, coreColor: '#248f8f' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 7, y: 4 }, shortForm: { x: 7, y: 4 } } },
    { properties: { symbol: 'Rh', atomicNumber: 45, name: 'Rhodium', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 22.25 }, render: { coreDiameter: 4, coreColor: '#0a7d8c' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 8, y: 4 }, shortForm: { x: 8, y: 4 } } },
    { properties: { symbol: 'Pd', atomicNumber: 46, name: 'Palladium', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 21.625 }, render: { coreDiameter: 4, coreColor: '#006985' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 9, y: 4 }, shortForm: { x: 9, y: 4 } } },
    { properties: { symbol: 'Ag', atomicNumber: 47, name: 'Silver', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 21 }, render: { coreDiameter: 4, coreColor: '#c0c0c0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 10, y: 4 }, shortForm: { x: 10, y: 4 } } },
    { properties: { symbol: 'Cd', atomicNumber: 48, name: 'Cadmium', category: 'transition-metal', electronShellGroup: 'd', period: 5, relativeDiameter: 20.375 }, render: { coreDiameter: 4, coreColor: '#ffd98f' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 11, y: 4 }, shortForm: { x: 11, y: 4 } } },
    { properties: { symbol: 'In', atomicNumber: 49, name: 'Indium', category: 'post-transition-metal', electronShellGroup: 'p', period: 5, relativeDiameter: 19.75 }, render: { coreDiameter: 4, coreColor: '#a67573' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 12, y: 4 }, shortForm: { x: 12, y: 4 } } },
    { properties: { symbol: 'Sn', atomicNumber: 50, name: 'Tin', category: 'post-transition-metal', electronShellGroup: 'p', period: 5, relativeDiameter: 19.125 }, render: { coreDiameter: 4, coreColor: '#668080' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 13, y: 4 }, shortForm: { x: 13, y: 4 } } },
    { properties: { symbol: 'Sb', atomicNumber: 51, name: 'Antimony', category: 'metalloid', electronShellGroup: 'p', period: 5, relativeDiameter: 18.5 }, render: { coreDiameter: 4, coreColor: '#9e63b5' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 14, y: 4 }, shortForm: { x: 14, y: 4 } } },
    { properties: { symbol: 'Te', atomicNumber: 52, name: 'Tellurium', category: 'metalloid', electronShellGroup: 'p', period: 5, relativeDiameter: 17.875 }, render: { coreDiameter: 4, coreColor: '#d47a00' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 15, y: 4 }, shortForm: { x: 15, y: 4 } } },
    { properties: { symbol: 'I', atomicNumber: 53, name: 'Iodine', category: 'nonmetal', electronShellGroup: 'p', period: 5, relativeDiameter: 17.25 }, render: { coreDiameter: 4, coreColor: '#940094' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 16, y: 4 }, shortForm: { x: 16, y: 4 } } },
    { properties: { symbol: 'Xe', atomicNumber: 54, name: 'Xenon', category: 'noble-gas', electronShellGroup: 'p', period: 5, relativeDiameter: 16.625 }, render: { coreDiameter: 4, coreColor: '#429eb0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 31, y: 4 }, shortForm: { x: 17, y: 4 } } },
    { properties: { symbol: 'Cs', atomicNumber: 55, name: 'Cesium', category: 'alkali-metal', electronShellGroup: 's', period: 6, relativeDiameter: 35.875 }, render: { coreDiameter: 4, coreColor: '#57178f' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 0, y: 5 }, shortForm: { x: 0, y: 5 } } },
    { properties: { symbol: 'Ba', atomicNumber: 56, name: 'Barium', category: 'alkaline-earth', electronShellGroup: 's', period: 6, relativeDiameter: 30.5 }, render: { coreDiameter: 4, coreColor: '#00c900' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 1, y: 5 }, shortForm: { x: 1, y: 5 } } },
    { properties: { symbol: 'La', atomicNumber: 57, name: 'Lanthanum', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 29.625 }, render: { coreDiameter: 4, coreColor: '#70d4ff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 2, y: 5 }, shortForm: { x: 2, y: 5 } } },
    { properties: { symbol: 'Ce', atomicNumber: 58, name: 'Cerium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 28.75 }, render: { coreDiameter: 4, coreColor: '#ffffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 2, y: 6 }, shortForm: { x: 2, y: 6 } } },
    { properties: { symbol: 'Pr', atomicNumber: 59, name: 'Praseodymium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 27.875 }, render: { coreDiameter: 4, coreColor: '#d9ffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 3, y: 6 }, shortForm: { x: 3, y: 6 } } },
    { properties: { symbol: 'Nd', atomicNumber: 60, name: 'Neodymium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 27 }, render: { coreDiameter: 4, coreColor: '#c7ffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 4, y: 6 }, shortForm: { x: 4, y: 6 } } },
    { properties: { symbol: 'Pm', atomicNumber: 61, name: 'Promethium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 26.125 }, render: { coreDiameter: 4, coreColor: '#a3ffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 5, y: 6 }, shortForm: { x: 5, y: 6 } } },
    { properties: { symbol: 'Sm', atomicNumber: 62, name: 'Samarium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 25.25 }, render: { coreDiameter: 4, coreColor: '#8fffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 6, y: 6 }, shortForm: { x: 6, y: 6 } } },
    { properties: { symbol: 'Eu', atomicNumber: 63, name: 'Europium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 24.375 }, render: { coreDiameter: 4, coreColor: '#61ffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 7, y: 6 }, shortForm: { x: 7, y: 6 } } },
    { properties: { symbol: 'Gd', atomicNumber: 64, name: 'Gadolinium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 23.5 }, render: { coreDiameter: 4, coreColor: '#45ffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 8, y: 6 }, shortForm: { x: 8, y: 6 } } },
    { properties: { symbol: 'Tb', atomicNumber: 65, name: 'Terbium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 22.625 }, render: { coreDiameter: 4, coreColor: '#30ffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 9, y: 6 }, shortForm: { x: 9, y: 6 } } },
    { properties: { symbol: 'Dy', atomicNumber: 66, name: 'Dysprosium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 21.75 }, render: { coreDiameter: 4, coreColor: '#1fffc7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 10, y: 6 }, shortForm: { x: 10, y: 6 } } },
    { properties: { symbol: 'Ho', atomicNumber: 67, name: 'Holmium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 20.875 }, render: { coreDiameter: 4, coreColor: '#00ff9c' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 11, y: 6 }, shortForm: { x: 11, y: 6 } } },
    { properties: { symbol: 'Er', atomicNumber: 68, name: 'Erbium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 20 }, render: { coreDiameter: 4, coreColor: '#00e675' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 12, y: 6 }, shortForm: { x: 12, y: 6 } } },
    { properties: { symbol: 'Tm', atomicNumber: 69, name: 'Thulium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 19.125 }, render: { coreDiameter: 4, coreColor: '#00d452' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 13, y: 6 }, shortForm: { x: 13, y: 6 } } },
    { properties: { symbol: 'Yb', atomicNumber: 70, name: 'Ytterbium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 18.25 }, render: { coreDiameter: 4, coreColor: '#00bf38' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 14, y: 6 }, shortForm: { x: 14, y: 6 } } },
    { properties: { symbol: 'Lu', atomicNumber: 71, name: 'Lutetium', category: 'lanthanide', electronShellGroup: 'f', period: 6, relativeDiameter: 17.375 }, render: { coreDiameter: 4, coreColor: '#00ab24' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 15, y: 6 }, shortForm: { x: 15, y: 6 } } },
    { properties: { symbol: 'Hf', atomicNumber: 72, name: 'Hafnium', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 16.5 }, render: { coreDiameter: 4, coreColor: '#4dc2ff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 3, y: 5 }, shortForm: { x: 3, y: 5 } } },
    { properties: { symbol: 'Ta', atomicNumber: 73, name: 'Tantalum', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 15.625 }, render: { coreDiameter: 4, coreColor: '#4da6ff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 4, y: 5 }, shortForm: { x: 4, y: 5 } } },
    { properties: { symbol: 'W', atomicNumber: 74, name: 'Tungsten', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 14.75 }, render: { coreDiameter: 4, coreColor: '#2194d6' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 5, y: 5 }, shortForm: { x: 5, y: 5 } } },
    { properties: { symbol: 'Re', atomicNumber: 75, name: 'Rhenium', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 13.875 }, render: { coreDiameter: 4, coreColor: '#267dab' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 6, y: 5 }, shortForm: { x: 6, y: 5 } } },
    { properties: { symbol: 'Os', atomicNumber: 76, name: 'Osmium', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 13 }, render: { coreDiameter: 4, coreColor: '#266696' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 7, y: 5 }, shortForm: { x: 7, y: 5 } } },
    { properties: { symbol: 'Ir', atomicNumber: 77, name: 'Iridium', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 12.125 }, render: { coreDiameter: 4, coreColor: '#175487' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 8, y: 5 }, shortForm: { x: 8, y: 5 } } },
    { properties: { symbol: 'Pt', atomicNumber: 78, name: 'Platinum', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 11.25 }, render: { coreDiameter: 4, coreColor: '#d0d0e0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 9, y: 5 }, shortForm: { x: 9, y: 5 } } },
    { properties: { symbol: 'Au', atomicNumber: 79, name: 'Gold', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 10.375 }, render: { coreDiameter: 4, coreColor: '#ffd123' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 10, y: 5 }, shortForm: { x: 10, y: 5 } } },
    { properties: { symbol: 'Hg', atomicNumber: 80, name: 'Mercury', category: 'transition-metal', electronShellGroup: 'd', period: 6, relativeDiameter: 9.5 }, render: { coreDiameter: 4, coreColor: '#b8b8d0' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 11, y: 5 }, shortForm: { x: 11, y: 5 } } },
    { properties: { symbol: 'Tl', atomicNumber: 81, name: 'Thallium', category: 'post-transition-metal', electronShellGroup: 'p', period: 6, relativeDiameter: 8.875 }, render: { coreDiameter: 4, coreColor: '#a6544d' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 12, y: 5 }, shortForm: { x: 12, y: 5 } } },
    { properties: { symbol: 'Pb', atomicNumber: 82, name: 'Lead', category: 'post-transition-metal', electronShellGroup: 'p', period: 6, relativeDiameter: 8.25 }, render: { coreDiameter: 4, coreColor: '#575961' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 13, y: 5 }, shortForm: { x: 13, y: 5 } } },
    { properties: { symbol: 'Bi', atomicNumber: 83, name: 'Bismuth', category: 'post-transition-metal', electronShellGroup: 'p', period: 6, relativeDiameter: 7.625 }, render: { coreDiameter: 4, coreColor: '#9e4fb5' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 14, y: 5 }, shortForm: { x: 14, y: 5 } } },
    { properties: { symbol: 'Po', atomicNumber: 84, name: 'Polonium', category: 'metalloid', electronShellGroup: 'p', period: 6, relativeDiameter: 7 }, render: { coreDiameter: 4, coreColor: '#ab5c00' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 15, y: 5 }, shortForm: { x: 15, y: 5 } } },
    { properties: { symbol: 'At', atomicNumber: 85, name: 'Astatine', category: 'metalloid', electronShellGroup: 'p', period: 6, relativeDiameter: 6.375 }, render: { coreDiameter: 4, coreColor: '#754f45' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 16, y: 5 }, shortForm: { x: 16, y: 5 } } },
    { properties: { symbol: 'Rn', atomicNumber: 86, name: 'Radon', category: 'noble-gas', electronShellGroup: 'p', period: 6, relativeDiameter: 5.75 }, render: { coreDiameter: 4, coreColor: '#428296' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 31, y: 5 }, shortForm: { x: 17, y: 5 } } },
    { properties: { symbol: 'Fr', atomicNumber: 87, name: 'Francium', category: 'alkali-metal', electronShellGroup: 's', period: 7, relativeDiameter: 38.125 }, render: { coreDiameter: 4, coreColor: '#420066' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 0, y: 6 }, shortForm: { x: 0, y: 6 } } },
    { properties: { symbol: 'Ra', atomicNumber: 88, name: 'Radium', category: 'alkaline-earth', electronShellGroup: 's', period: 7, relativeDiameter: 32.75 }, render: { coreDiameter: 4, coreColor: '#007d00' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 1, y: 6 }, shortForm: { x: 1, y: 6 } } },
    { properties: { symbol: 'Ac', atomicNumber: 89, name: 'Actinium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 31.875 }, render: { coreDiameter: 4, coreColor: '#70abfa' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 2, y: 6 }, shortForm: { x: 2, y: 6 } } },
    { properties: { symbol: 'Th', atomicNumber: 90, name: 'Thorium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 31 }, render: { coreDiameter: 4, coreColor: '#00baff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 2, y: 7 }, shortForm: { x: 2, y: 7 } } },
    { properties: { symbol: 'Pa', atomicNumber: 91, name: 'Protactinium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 30.125 }, render: { coreDiameter: 4, coreColor: '#00a1ff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 3, y: 7 }, shortForm: { x: 3, y: 7 } } },
    { properties: { symbol: 'U', atomicNumber: 92, name: 'Uranium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 29.25 }, render: { coreDiameter: 4, coreColor: '#008fff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 4, y: 7 }, shortForm: { x: 4, y: 7 } } },
    { properties: { symbol: 'Np', atomicNumber: 93, name: 'Neptunium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 28.375 }, render: { coreDiameter: 4, coreColor: '#0080ff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 5, y: 7 }, shortForm: { x: 5, y: 7 } } },
    { properties: { symbol: 'Pu', atomicNumber: 94, name: 'Plutonium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 27.5 }, render: { coreDiameter: 4, coreColor: '#006bff' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 6, y: 7 }, shortForm: { x: 6, y: 7 } } },
    { properties: { symbol: 'Am', atomicNumber: 95, name: 'Americium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 26.625 }, render: { coreDiameter: 4, coreColor: '#545cf2' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 7, y: 7 }, shortForm: { x: 7, y: 7 } } },
    { properties: { symbol: 'Cm', atomicNumber: 96, name: 'Curium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 25.75 }, render: { coreDiameter: 4, coreColor: '#785ce3' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 8, y: 7 }, shortForm: { x: 8, y: 7 } } },
    { properties: { symbol: 'Bk', atomicNumber: 97, name: 'Berkelium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 24.875 }, render: { coreDiameter: 4, coreColor: '#8a4fe3' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 9, y: 7 }, shortForm: { x: 9, y: 7 } } },
    { properties: { symbol: 'Cf', atomicNumber: 98, name: 'Californium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 24 }, render: { coreDiameter: 4, coreColor: '#a136d4' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 10, y: 7 }, shortForm: { x: 10, y: 7 } } },
    { properties: { symbol: 'Es', atomicNumber: 99, name: 'Einsteinium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 23.125 }, render: { coreDiameter: 4, coreColor: '#b31fd4' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 11, y: 7 }, shortForm: { x: 11, y: 7 } } },
    { properties: { symbol: 'Fm', atomicNumber: 100, name: 'Fermium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 22.25 }, render: { coreDiameter: 4, coreColor: '#b31fd4' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 12, y: 7 }, shortForm: { x: 12, y: 7 } } },
    { properties: { symbol: 'Md', atomicNumber: 101, name: 'Mendelevium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 21.375 }, render: { coreDiameter: 4, coreColor: '#b30da7' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 13, y: 7 }, shortForm: { x: 13, y: 7 } } },
    { properties: { symbol: 'No', atomicNumber: 102, name: 'Nobelium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 20.5 }, render: { coreDiameter: 4, coreColor: '#bd0d87' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 14, y: 7 }, shortForm: { x: 14, y: 7 } } },
    { properties: { symbol: 'Lr', atomicNumber: 103, name: 'Lawrencium', category: 'actinide', electronShellGroup: 'f', period: 7, relativeDiameter: 19.625 }, render: { coreDiameter: 4, coreColor: '#c70066' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 15, y: 7 }, shortForm: { x: 15, y: 7 } } },
    { properties: { symbol: 'Rf', atomicNumber: 104, name: 'Rutherfordium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 18.75 }, render: { coreDiameter: 4, coreColor: '#cc0052' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 3, y: 6 }, shortForm: { x: 3, y: 6 } } },
    { properties: { symbol: 'Db', atomicNumber: 105, name: 'Dubnium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 17.875 }, render: { coreDiameter: 4, coreColor: '#d1004d' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 4, y: 6 }, shortForm: { x: 4, y: 6 } } },
    { properties: { symbol: 'Sg', atomicNumber: 106, name: 'Seaborgium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 17 }, render: { coreDiameter: 4, coreColor: '#d90045' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 5, y: 6 }, shortForm: { x: 5, y: 6 } } },
    { properties: { symbol: 'Bh', atomicNumber: 107, name: 'Bohrium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 16.125 }, render: { coreDiameter: 4, coreColor: '#e00038' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 6, y: 6 }, shortForm: { x: 6, y: 6 } } },
    { properties: { symbol: 'Hs', atomicNumber: 108, name: 'Hassium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 15.25 }, render: { coreDiameter: 4, coreColor: '#e6002a' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 7, y: 6 }, shortForm: { x: 7, y: 6 } } },
    { properties: { symbol: 'Mt', atomicNumber: 109, name: 'Meitnerium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 14.375 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 8, y: 6 }, shortForm: { x: 8, y: 6 } } },
    { properties: { symbol: 'Ds', atomicNumber: 110, name: 'Darmstadtium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 13.5 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 9, y: 6 }, shortForm: { x: 9, y: 6 } } },
    { properties: { symbol: 'Rg', atomicNumber: 111, name: 'Roentgenium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 12.625 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 10, y: 6 }, shortForm: { x: 10, y: 6 } } },
    { properties: { symbol: 'Cn', atomicNumber: 112, name: 'Copernicium', category: 'transition-metal', electronShellGroup: 'd', period: 7, relativeDiameter: 11.75 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 11, y: 6 }, shortForm: { x: 11, y: 6 } } },
    { properties: { symbol: 'Nh', atomicNumber: 113, name: 'Nihonium', category: 'post-transition-metal', electronShellGroup: 'p', period: 7, relativeDiameter: 10.875 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 12, y: 6 }, shortForm: { x: 12, y: 6 } } },
    { properties: { symbol: 'Fl', atomicNumber: 114, name: 'Flerovium', category: 'post-transition-metal', electronShellGroup: 'p', period: 7, relativeDiameter: 10 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 13, y: 6 }, shortForm: { x: 13, y: 6 } } },
    { properties: { symbol: 'Mc', atomicNumber: 115, name: 'Moscovium', category: 'post-transition-metal', electronShellGroup: 'p', period: 7, relativeDiameter: 9.125 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 14, y: 6 }, shortForm: { x: 14, y: 6 } } },
    { properties: { symbol: 'Lv', atomicNumber: 116, name: 'Livermorium', category: 'post-transition-metal', electronShellGroup: 'p', period: 7, relativeDiameter: 8.25 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 15, y: 6 }, shortForm: { x: 15, y: 6 } } },
    { properties: { symbol: 'Ts', atomicNumber: 117, name: 'Tennessine', category: 'metalloid', electronShellGroup: 'p', period: 7, relativeDiameter: 7.375 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 16, y: 6 }, shortForm: { x: 16, y: 6 } } },
    { properties: { symbol: 'Og', atomicNumber: 118, name: 'Oganesson', category: 'noble-gas', electronShellGroup: 'p', period: 7, relativeDiameter: 6.5 }, render: { coreDiameter: 4, coreColor: '#eb0026' }, physics: { interactionRange: 4, collisionRadius: 4, mass: 1 }, table: { longForm: { x: 31, y: 6 }, shortForm: { x: 17, y: 6 } } },
] as const;

/**
 * Helper functions for accessing periodic table data
 */
export const getElementBySymbol = (symbol: string): PeriodicElement | undefined => {
    return PERIODIC_TABLE_DATA.find(element => element.properties.symbol === symbol);
};

export const getElementByAtomicNumber = (atomicNumber: number): PeriodicElement | undefined => {
    return PERIODIC_TABLE_DATA.find(element => element.properties.atomicNumber === atomicNumber);
};

export const getElementsByCategory = (category: AtomicProperties['category']): readonly PeriodicElement[] => {
    return PERIODIC_TABLE_DATA.filter(element => element.properties.category === category);
};

export const getElementsByShellGroup = (shellGroup: 's' | 'p' | 'd' | 'f'): readonly PeriodicElement[] => {
    return PERIODIC_TABLE_DATA.filter(element => element.properties.electronShellGroup === shellGroup);
};

export const getElementsByPeriod = (period: number): readonly PeriodicElement[] => {
    return PERIODIC_TABLE_DATA.filter(element => element.properties.period === period);
};

/**
 * Legacy compatibility functions - these maintain backward compatibility
 * by returning the old flat structure format
 */
export const getElementProperties = (element: PeriodicElement): AtomicProperties => {
    return element.properties;
};

export const getElementRenderConfig = (element: PeriodicElement): AtomicRenderConfig => {
    return element.render;
};

export const getElementPhysicsConfig = (element: PeriodicElement): AtomicPhysicsConfig => {
    return element.physics;
};

export const getElementTablePosition = (element: PeriodicElement): AtomicTablePosition => {
    return element.table;
};

// ============================================================================
// LAYOUT DEFINITIONS AND POSITION MAPPING
// ============================================================================

/**
 * Display position interface for layout coordinates
 */
export interface DisplayPosition {
    x: number;
    y: number;
}

/**
 * Element display mapping for layout positioning
 */
export interface ElementDisplayMapping {
    atomicNumber: number;
    position: DisplayPosition;
}

/**
 * Block layout interface for organizing elements by electron shell groups
 */
export interface BlockLayout {
    blockName: 's' | 'p' | 'd' | 'f';
    elements: ElementDisplayMapping[];
    dimensions: { width: number; height: number };
}

/**
 * Complete periodic table layout interface
 */
export interface PeriodicTableLayout {
    layoutName: string;
    blocks: BlockLayout[];
    totalDimensions: { width: number; height: number };
}

/**
 * Periodic element interface for display with position
 */
export interface PeriodicElementWithPosition {
    symbol: string;
    atomicNumber: number;
    name: string;
    position: DisplayPosition;
    category: AtomicProperties['category'];
    electronShellGroup: 's' | 'p' | 'd' | 'f';
    period: number;
}

/**
 * Periodic table data interface for layout mapping
 */
export interface PeriodicTableData {
    elements: PeriodicElementWithPosition[];
    dimensions: { width: number; height: number };
    layoutName: string;
}

// ============================================================================
// LAYOUT GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate layout data from PERIODIC_TABLE_DATA based on layout type
 * Uses the table coordinates stored in each element as the single source of truth
 */
export function generateLayout(layoutName: 'long' | 'short'): PeriodicTableLayout {
    const elementsByBlock: { [key: string]: PeriodicElementWithPosition[] } = {
        s: [],
        p: [],
        d: [],
        f: []
    };

    // Group elements by their electron shell group (block type)
    PERIODIC_TABLE_DATA.forEach(element => {
        const blockType = element.properties.electronShellGroup;
        const position = layoutName === 'long' ? element.table.longForm : element.table.shortForm;

        elementsByBlock[blockType].push({
            ...element,
            position,
            atomicNumber: element.properties.atomicNumber,
            name: element.properties.name,
            symbol: element.properties.symbol,
            category: element.properties.category,
            electronShellGroup: element.properties.electronShellGroup,
            period: element.properties.period
        });
    });

    // Create blocks array with calculated dimensions
    const blocks: BlockLayout[] = Object.entries(elementsByBlock).map(([blockName, elements]) => {
        if (elements.length === 0) {
            return {
                blockName: blockName as 's' | 'p' | 'd' | 'f',
                dimensions: { width: 0, height: 0 },
                elements: []
            };
        }

        // Calculate block dimensions based on actual element positions
        const maxX = Math.max(...elements.map(el => el.position.x));
        const maxY = Math.max(...elements.map(el => el.position.y));

        return {
            blockName: blockName as 's' | 'p' | 'd' | 'f',
            dimensions: { width: maxX + 1, height: maxY + 1 },
            elements: elements.map(el => ({
                atomicNumber: el.atomicNumber,
                position: el.position
            }))
        };
    });

    // Calculate total dimensions
    const totalWidth = Math.max(...blocks.map(block => block.dimensions.width));
    const totalHeight = Math.max(...blocks.map(block => block.dimensions.height));

    return {
        layoutName,
        totalDimensions: { width: totalWidth, height: totalHeight },
        blocks
    };
}

/**
 * Generated layouts using PERIODIC_TABLE_DATA as source of truth
 */
export const LONG_FORM_LAYOUT: PeriodicTableLayout = generateLayout('long');
export const SHORT_FORM_LAYOUT: PeriodicTableLayout = generateLayout('short');

// ============================================================================
// LAYOUT REGISTRY AND HELPER FUNCTIONS
// ============================================================================

/**
 * Layout registry for accessing different periodic table layouts
 */
export const PERIODIC_TABLE_LAYOUTS = {
    long: LONG_FORM_LAYOUT,
    short: SHORT_FORM_LAYOUT,
} as const;

/**
 * Get layout by name
 */
export const getLayoutByName = (layoutName: string): PeriodicTableLayout | undefined => {
    return PERIODIC_TABLE_LAYOUTS[layoutName as keyof typeof PERIODIC_TABLE_LAYOUTS];
};

/**
 * Get block layout for a specific layout and block
 */
export const getBlockLayout = (layoutName: string, blockName: 's' | 'p' | 'd' | 'f'): BlockLayout | undefined => {
    const layout = getLayoutByName(layoutName);
    return layout?.blocks.find(block => block.blockName === blockName);
};

/**
 * Get element position in a specific layout
 */
export const getElementPosition = (layoutName: string, symbol: string): DisplayPosition | undefined => {
    const layout = getLayoutByName(layoutName);
    if (!layout) return undefined;

    for (const block of layout.blocks) {
        const element = block.elements.find(el => {
            const atomicElement = getElementByAtomicNumber(el.atomicNumber);
            return atomicElement?.properties.symbol === symbol;
        });
        if (element) return element.position;
    }
    return undefined;
};

// ============================================================================
// LAYOUT MAPPING FUNCTIONS
// ============================================================================

/**
 * Maps atomic data to display coordinates for a specific layout
 */
export function mapAtomicDataToLayout(layoutName: string): PeriodicTableData {
    const layout = getLayoutByName(layoutName);
    if (!layout) {
        throw new Error(`Layout '${layoutName}' not found`);
    }

    const elements: PeriodicElementWithPosition[] = [];

    // Map each atomic element to its display position
    for (const atomicElement of PERIODIC_TABLE_DATA) {
        const displayPosition = getElementPosition(layoutName, atomicElement.properties.symbol);

        if (displayPosition) {
            elements.push({
                symbol: atomicElement.properties.symbol,
                atomicNumber: atomicElement.properties.atomicNumber,
                name: atomicElement.properties.name,
                position: displayPosition,
                category: atomicElement.properties.category,
                electronShellGroup: atomicElement.properties.electronShellGroup,
                period: atomicElement.properties.period,
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
export function getBlockElements(layoutName: string, blockName: 's' | 'p' | 'd' | 'f'): PeriodicElementWithPosition[] {
    const layout = getLayoutByName(layoutName);
    if (!layout) return [];

    const block = layout.blocks.find(b => b.blockName === blockName);
    if (!block) return [];

    const elements: PeriodicElementWithPosition[] = [];

    for (const elementMapping of block.elements) {
        const atomicElement = getElementByAtomicNumber(elementMapping.atomicNumber);

        if (atomicElement) {
            elements.push({
                symbol: atomicElement.properties.symbol,
                atomicNumber: atomicElement.properties.atomicNumber,
                name: atomicElement.properties.name,
                position: elementMapping.position,
                category: atomicElement.properties.category,
                electronShellGroup: atomicElement.properties.electronShellGroup,
                period: atomicElement.properties.period,
            });
        }
    }

    return elements;
}

/**
 * Gets all elements grouped by block for a specific layout
 */
export function getElementsByBlock(layoutName: string): {
    s: PeriodicElementWithPosition[];
    p: PeriodicElementWithPosition[];
    d: PeriodicElementWithPosition[];
    f: PeriodicElementWithPosition[];
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
export function getElementByAtomicNumberWithPosition(layoutName: string, atomicNumber: number): PeriodicElementWithPosition | undefined {
    const atomicElement = getElementByAtomicNumber(atomicNumber);
    if (!atomicElement) return undefined;

    const displayPosition = getElementPosition(layoutName, atomicElement.properties.symbol);
    if (!displayPosition) return undefined;

    return {
        symbol: atomicElement.properties.symbol,
        atomicNumber: atomicElement.properties.atomicNumber,
        name: atomicElement.properties.name,
        position: displayPosition,
        category: atomicElement.properties.category,
        electronShellGroup: atomicElement.properties.electronShellGroup,
        period: atomicElement.properties.period,
    };
}

/**
 * Gets element by symbol with display position for a specific layout
 */
export function getElementBySymbolWithPosition(layoutName: string, symbol: string): PeriodicElementWithPosition | undefined {
    const atomicElement = getElementBySymbol(symbol);
    if (!atomicElement) return undefined;

    const displayPosition = getElementPosition(layoutName, symbol);
    if (!displayPosition) return undefined;

    return {
        symbol: atomicElement.properties.symbol,
        atomicNumber: atomicElement.properties.atomicNumber,
        name: atomicElement.properties.name,
        position: displayPosition,
        category: atomicElement.properties.category,
        electronShellGroup: atomicElement.properties.electronShellGroup,
        period: atomicElement.properties.period,
    };
}

/**
 * Gets elements by category with display positions for a specific layout
 */
export function getElementsByCategoryWithPosition(layoutName: string, category: AtomicProperties['category']): PeriodicElementWithPosition[] {
    const atomicElements = getElementsByCategory(category);
    const elements: PeriodicElementWithPosition[] = [];

    for (const atomicElement of atomicElements) {
        const displayPosition = getElementPosition(layoutName, atomicElement.properties.symbol);
        if (displayPosition) {
            elements.push({
                symbol: atomicElement.properties.symbol,
                atomicNumber: atomicElement.properties.atomicNumber,
                name: atomicElement.properties.name,
                position: displayPosition,
                category: atomicElement.properties.category,
                electronShellGroup: atomicElement.properties.electronShellGroup,
                period: atomicElement.properties.period,
            });
        }
    }

    return elements;
}

/**
 * Gets elements by electron shell group with display positions for a specific layout
 */
export function getElementsByShellGroupWithPosition(layoutName: string, shellGroup: 's' | 'p' | 'd' | 'f'): PeriodicElementWithPosition[] {
    return getBlockElements(layoutName, shellGroup);
}

// ============================================================================
// BLOCK-SPECIFIC ELEMENT COLLECTIONS
// ============================================================================

/**
 * S-Block Elements (Groups 1-2, Alkali and Alkaline Earth metals)
 */
export const S_BLOCK_ELEMENTS: readonly PeriodicElement[] = PERIODIC_TABLE_DATA.filter(
    element => element.properties.electronShellGroup === 's'
);

/**
 * F-Block Elements (Lanthanides and Actinides)
 */
export const F_BLOCK_ELEMENTS: readonly PeriodicElement[] = PERIODIC_TABLE_DATA.filter(
    element => element.properties.electronShellGroup === 'f'
);

/**
 * D-Block Elements (Groups 3-12, Transition metals)
 */
export const D_BLOCK_ELEMENTS: readonly PeriodicElement[] = PERIODIC_TABLE_DATA.filter(
    element => element.properties.electronShellGroup === 'd'
);

/**
 * P-Block Elements (Groups 13-18, including noble gases)
 */
export const P_BLOCK_ELEMENTS: readonly PeriodicElement[] = PERIODIC_TABLE_DATA.filter(
    element => element.properties.electronShellGroup === 'p'
);

// ============================================================================
// GRID DIMENSIONS
// ============================================================================

/**
 * Grid dimensions for different periodic table views
 */
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
} as const;

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

/**
 * Legacy compatibility - re-export with old name
 */
export const PERIODIC_TABLE_ELEMENTS = PERIODIC_TABLE_DATA;

/**
 * Legacy compatibility - main mapping function
 */
export const createPeriodicTableData = mapAtomicDataToLayout;

/**
 * Legacy compatibility - get elements by shell group with layout
 */
export const getElementsByShellGroupWithLayout = getElementsByShellGroupWithPosition;

