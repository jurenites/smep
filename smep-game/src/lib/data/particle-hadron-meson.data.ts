/**
 * Particle Hadron Meson Data - Complete meson definitions
 * 
 * Mesons are composite particles made of a quark and an antiquark bound together.
 * This file provides the single source of truth for all meson data.
 * 
 * Structure mirrors particle-atomic.data.ts for consistency:
 * - properties: Basic meson properties
 * - render: Visual rendering configuration
 * - physics: Physics simulation parameters
 * - table: Grid position for table layout
 */

import { ParticleMatterType } from './particle-quantum.data';

/**
 * Quark composition tuple - always two quarks [quark1, quark2]
 * Second quark with apostrophe (e.g., "u'") indicates antiparticle
 */
export type QuarkComposition = [string, string];

/**
 * Meson family types
 */
export type MesonFamily = 'Pion' | 'Kaon' | 'D Meson' | 'B Meson' | 'Heavy Quarkonia';

/**
 * Meson properties interface
 */
export interface MesonProperties {
    primaryId: number;
    name: string;
    symbol: string;
    quarkComposition: QuarkComposition;
    massInMeV: number;
    matterType: ParticleMatterType;
    family: MesonFamily;
}

/**
 * Meson render configuration interface
 */
export interface MesonRenderConfig {
    bondDistance: number; // Gap between particles in pixels
    showBond: boolean; // Whether to show visual bond line (future use)
}

/**
 * Meson physics configuration interface
 */
export interface MesonPhysicsConfig {
    interactionRange: number;
    collisionRadius: number;
    mass: number;
}

/**
 * Meson table position interface
 */
export interface MesonTablePosition {
    x: number;
    y: number;
}

/**
 * Complete meson data interface
 */
export interface MesonData {
    properties: MesonProperties;
    render: MesonRenderConfig;
    physics: MesonPhysicsConfig;
    table: MesonTablePosition;
}

/**
 * Complete meson data for all 25 mesons
 * Format: Compact inline objects for better readability
 */
// eslint-disable-next-line @typescript-eslint/object-curly-spacing
export const MESON_DATA: readonly MesonData[] = [
    // Pion Family - Column 1
    { properties: { primaryId: 1, name: 'charged Pion', symbol: 'π+', quarkComposition: ['u', 'đ'], massInMeV: 139.5, matterType: ParticleMatterType.MATTER, family: 'Pion' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 139.5 }, table: { x: 1, y: 1 } },
    { properties: { primaryId: 2, name: 'negative Pion', symbol: 'π-', quarkComposition: ['d', 'û'], massInMeV: 139.5, matterType: ParticleMatterType.ANTIMATTER, family: 'Pion' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 139.5 }, table: { x: 1, y: 2 } },
    { properties: { primaryId: 3, name: 'neutral Pion', symbol: 'π0', quarkComposition: ['u', 'û'], massInMeV: 134.9, matterType: ParticleMatterType.MATTER, family: 'Pion' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 134.9 }, table: { x: 1, y: 3 } },
    { properties: { primaryId: 4, name: 'anti Pion', symbol: "π0'", quarkComposition: ['d', 'đ'], massInMeV: 134.9, matterType: ParticleMatterType.ANTIMATTER, family: 'Pion' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 134.9 }, table: { x: 1, y: 4 } },

    // Kaon Family - Column 2
    { properties: { primaryId: 5, name: 'charged Kaon', symbol: 'K+', quarkComposition: ['u', 'š'], massInMeV: 494, matterType: ParticleMatterType.MATTER, family: 'Kaon' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 494 }, table: { x: 2, y: 1 } },
    { properties: { primaryId: 6, name: 'negative Kaon', symbol: 'K−', quarkComposition: ['s', 'û'], massInMeV: 494, matterType: ParticleMatterType.ANTIMATTER, family: 'Kaon' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 494 }, table: { x: 2, y: 2 } },
    { properties: { primaryId: 7, name: 'neutral Kaon', symbol: 'K0', quarkComposition: ['d', 'š'], massInMeV: 498, matterType: ParticleMatterType.MATTER, family: 'Kaon' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 498 }, table: { x: 2, y: 3 } },
    { properties: { primaryId: 8, name: 'anti Kaon', symbol: "K'0", quarkComposition: ['s', 'đ'], massInMeV: 498, matterType: ParticleMatterType.ANTIMATTER, family: 'Kaon' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 498 }, table: { x: 2, y: 4 } },

    // D Meson Family - Columns 3-4
    { properties: { primaryId: 9, name: 'charged D meson', symbol: 'D+', quarkComposition: ['c', "d'"], massInMeV: 1869, matterType: ParticleMatterType.MATTER, family: 'D Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 1869 }, table: { x: 3, y: 1 } },
    { properties: { primaryId: 10, name: 'negative D meson', symbol: 'D-', quarkComposition: ['d', 'ĉ'], massInMeV: 1869, matterType: ParticleMatterType.ANTIMATTER, family: 'D Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 1869 }, table: { x: 3, y: 2 } },
    { properties: { primaryId: 11, name: 'neutral D meson', symbol: 'D0', quarkComposition: ['c', 'û'], massInMeV: 1865, matterType: ParticleMatterType.MATTER, family: 'D Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 1865 }, table: { x: 3, y: 3 } },
    { properties: { primaryId: 12, name: 'anti D meson', symbol: "D'0", quarkComposition: ['u', 'ĉ'], massInMeV: 1865, matterType: ParticleMatterType.ANTIMATTER, family: 'D Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 1865 }, table: { x: 3, y: 4 } },
    { properties: { primaryId: 13, name: 'strange D meson', symbol: 'D+s', quarkComposition: ['c', 'š'], massInMeV: 1968.4, matterType: ParticleMatterType.MATTER, family: 'D Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 1968.4 }, table: { x: 4, y: 1 } },
    { properties: { primaryId: 14, name: 'anti strange D meson', symbol: 'D-s', quarkComposition: ['s', 'ĉ'], massInMeV: 1968.4, matterType: ParticleMatterType.ANTIMATTER, family: 'D Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 1968.4 }, table: { x: 4, y: 2 } },

    // B Meson Family - Columns 5-6
    { properties: { primaryId: 15, name: 'charged B meson', symbol: 'B+', quarkComposition: ['u', 'ḃ'], massInMeV: 5279, matterType: ParticleMatterType.MATTER, family: 'B Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 5279 }, table: { x: 5, y: 1 } },
    { properties: { primaryId: 16, name: 'negative B meson', symbol: 'B-', quarkComposition: ['b', 'û'], massInMeV: 5279, matterType: ParticleMatterType.ANTIMATTER, family: 'B Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 5279 }, table: { x: 5, y: 2 } },
    { properties: { primaryId: 17, name: 'neutral B meson', symbol: 'B0', quarkComposition: ['d', 'ḃ'], massInMeV: 5279, matterType: ParticleMatterType.MATTER, family: 'B Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 5279 }, table: { x: 5, y: 3 } },
    { properties: { primaryId: 18, name: 'anti B meson', symbol: "B'0", quarkComposition: ['b', 'đ'], massInMeV: 5279, matterType: ParticleMatterType.ANTIMATTER, family: 'B Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 5279 }, table: { x: 5, y: 4 } },
    { properties: { primaryId: 19, name: 'strange B meson', symbol: 'B0s', quarkComposition: ['s', 'ḃ'], massInMeV: 5366.3, matterType: ParticleMatterType.MATTER, family: 'B Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 5366.3 }, table: { x: 6, y: 1 } },
    { properties: { primaryId: 20, name: 'anti strange B meson', symbol: "B'0s", quarkComposition: ['b', 'š'], massInMeV: 5366.3, matterType: ParticleMatterType.ANTIMATTER, family: 'B Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 5366.3 }, table: { x: 6, y: 2 } },
    { properties: { primaryId: 21, name: 'charmed B meson', symbol: 'B+c', quarkComposition: ['c', 'ḃ'], massInMeV: 6276, matterType: ParticleMatterType.MATTER, family: 'B Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 6276 }, table: { x: 6, y: 3 } },
    { properties: { primaryId: 22, name: 'anti charmed B meson', symbol: "B'+c", quarkComposition: ['b', 'ĉ'], massInMeV: 6276, matterType: ParticleMatterType.ANTIMATTER, family: 'B Meson' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 6276 }, table: { x: 6, y: 4 } },

    // Heavy Quarkonia - Column 7
    { properties: { primaryId: 23, name: 'Phi meson', symbol: 'φ', quarkComposition: ['s', 'š'], massInMeV: 1020, matterType: ParticleMatterType.MATTER, family: 'Heavy Quarkonia' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 1020 }, table: { x: 7, y: 2 } },
    { properties: { primaryId: 24, name: 'Upsilon meson', symbol: 'ϒ', quarkComposition: ['b', 'ḃ'], massInMeV: 9460, matterType: ParticleMatterType.MATTER, family: 'Heavy Quarkonia' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 9460 }, table: { x: 7, y: 3 } },
    { properties: { primaryId: 25, name: 'J/Psi', symbol: 'J/ψ', quarkComposition: ['c', 'ĉ'], massInMeV: 3097, matterType: ParticleMatterType.MATTER, family: 'Heavy Quarkonia' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 15, collisionRadius: 5, mass: 3097 }, table: { x: 7, y: 4 } },
] as const;

/**
 * Helper functions for accessing meson data
 */
export const getMesonByPrimaryId = (primaryId: number): MesonData | undefined => {
    return MESON_DATA.find(meson => meson.properties.primaryId === primaryId);
};

export const getMesonBySymbol = (symbol: string): MesonData | undefined => {
    return MESON_DATA.find(meson => meson.properties.symbol === symbol);
};

export const getMesonsByFamily = (family: MesonFamily): readonly MesonData[] => {
    return MESON_DATA.filter(meson => meson.properties.family === family);
};

export const getMesonsByQuarkComposition = (quark1: string, quark2: string): readonly MesonData[] => {
    return MESON_DATA.filter(meson => {
        const [q1, q2] = meson.properties.quarkComposition;
        return (q1 === quark1 && q2 === quark2) || (q1 === quark2 && q2 === quark1);
    });
};

/**
 * Get quark composition with proper formatting (overbar for antiquarks)
 * Returns formatted string like "ud̄" for display
 */
export const getFormattedQuarkComposition = (quarkComposition: QuarkComposition): string => {
    const [q1, q2] = quarkComposition;
    // Remove apostrophe and add combining overline character (U+0305) for antiquarks
    const formattedQ1 = q1.endsWith("'") ? q1.slice(0, -1) + '\u0305' : q1;
    const formattedQ2 = q2.endsWith("'") ? q2.slice(0, -1) + '\u0305' : q2;
    return formattedQ1 + formattedQ2;
};

/**
 * Map quark symbol to ParticleList enum
 * Handles both matter quarks (u, d, c, s, t, b) and antiquarks (with apostrophe)
 */
export const mapQuarkToParticleList = (quark: string): string => {
    const isAnti = quark.endsWith("'");
    const baseQuark = isAnti ? quark.slice(0, -1) : quark;

    const quarkMap: { [key: string]: string } = {
        'u': isAnti ? 'anti up' : 'up',
        'd': isAnti ? 'anti down' : 'down',
        'c': isAnti ? 'anti charm' : 'charm',
        's': isAnti ? 'anti strange' : 'strange',
        't': isAnti ? 'anti top' : 'top',
        'b': isAnti ? 'anti bottom' : 'bottom',
    };

    return quarkMap[baseQuark] || 'up';
};

