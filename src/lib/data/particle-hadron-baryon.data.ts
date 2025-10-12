/**
 * Particle Hadron Baryon Data - Complete baryon definitions
 * 
 * Baryons are composite particles made of three quarks bound together.
 * This file provides the single source of truth for all baryon data.
 * 
 * Structure mirrors particle-hadron-meson.data.ts and particle-atomic.data.ts for consistency:
 * - properties: Basic baryon properties
 * - render: Visual rendering configuration
 * - physics: Physics simulation parameters
 * - table: Grid position for table layout
 */

import { ParticleMatterType } from './particle-quantum.data';

/**
 * Quark composition tuple - always three quarks [quark1, quark2, quark3]
 * Quarks with apostrophe (e.g., "u'") indicate antiparticles
 */
export type BaryonQuarkComposition = [string, string, string];

/**
 * Baryon family types
 */
export type BaryonFamily = 'Nucleon' | 'Delta' | 'Sigma' | 'Xi' | 'Omega';

/**
 * Baryon properties interface
 */
export interface BaryonProperties {
    primaryId: number;
    name: string;
    symbol: string;
    quarkComposition: BaryonQuarkComposition;
    massInMeV: number;
    matterType: ParticleMatterType;
    family: BaryonFamily;
    /** Indicates if mass value is predicted/estimated rather than experimentally measured */
    massPredicted?: boolean;
}

/**
 * Baryon render configuration interface
 */
export interface BaryonRenderConfig {
    bondDistance: number; // Gap between particles in pixels
    showBond: boolean; // Whether to show visual bond lines (future use)
}

/**
 * Baryon physics configuration interface
 */
export interface BaryonPhysicsConfig {
    interactionRange: number;
    collisionRadius: number;
    mass: number;
}

/**
 * Baryon table position interface
 */
export interface BaryonTablePosition {
    x: number;
    y: number;
}

/**
 * Complete baryon data interface
 */
export interface BaryonData {
    properties: BaryonProperties;
    render: BaryonRenderConfig;
    physics: BaryonPhysicsConfig;
    table: BaryonTablePosition;
}

/**
 * Complete baryon data for all baryons
 * Format: Compact inline objects for better readability
 * 
 * Note: Some mass values marked as predicted are theoretical estimates based on:
 * - Quark mass contributions
 * - Patterns from similar measured baryons
 * - Lattice QCD calculations where available
 */
// eslint-disable-next-line @typescript-eslint/object-curly-spacing
export const BARYON_DATA: readonly BaryonData[] = [
    // Row 1: Nucleons (Delta++ → Antiproton) - 8 baryons
    { properties: { primaryId: 1, name: 'Delta', symbol: 'Δ++', quarkComposition: ['u', 'u', 'u'], massInMeV: 1232, matterType: ParticleMatterType.MATTER, family: 'Delta' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1232 }, table: { x: 1, y: 1 } },
    { properties: { primaryId: 2, name: 'Anti Delta', symbol: 'Δ\u0305--', quarkComposition: ['û', 'û', 'û'], massInMeV: 1232, matterType: ParticleMatterType.ANTIMATTER, family: 'Delta' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1232 }, table: { x: 2, y: 1 } },
    { properties: { primaryId: 3, name: 'Proton', symbol: 'p+', quarkComposition: ['u', 'u', 'd'], massInMeV: 938.2, matterType: ParticleMatterType.MATTER, family: 'Nucleon' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 938.2 }, table: { x: 3, y: 1 } },
    { properties: { primaryId: 4, name: 'Antiproton', symbol: 'p\u0305-', quarkComposition: ['û', 'û', 'đ'], massInMeV: 938.2, matterType: ParticleMatterType.ANTIMATTER, family: 'Nucleon' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 938.2 }, table: { x: 4, y: 1 } },
    { properties: { primaryId: 5, name: 'Neutron', symbol: 'n0', quarkComposition: ['u', 'd', 'd'], massInMeV: 939.5, matterType: ParticleMatterType.MATTER, family: 'Nucleon' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 939.5 }, table: { x: 5, y: 1 } },
    { properties: { primaryId: 6, name: 'Antineutron', symbol: 'n\u03050', quarkComposition: ['û', 'đ', 'đ'], massInMeV: 939.5, matterType: ParticleMatterType.ANTIMATTER, family: 'Nucleon' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 939.5 }, table: { x: 6, y: 1 } },
    { properties: { primaryId: 7, name: 'Delta', symbol: 'Δ−', quarkComposition: ['d', 'd', 'd'], massInMeV: 1232, matterType: ParticleMatterType.MATTER, family: 'Delta' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1232 }, table: { x: 7, y: 1 } },
    { properties: { primaryId: 8, name: 'Anti Delta', symbol: 'Δ\u0305+', quarkComposition: ['đ', 'đ', 'đ'], massInMeV: 1232, matterType: ParticleMatterType.ANTIMATTER, family: 'Delta' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1232 }, table: { x: 8, y: 1 } },

    // Row 2: Sigma Baryons (all variants) - 18 baryons
    { properties: { primaryId: 9, name: 'Sigma', symbol: 'Σ+', quarkComposition: ['u', 'u', 's'], massInMeV: 1382.8, matterType: ParticleMatterType.MATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1382.8 }, table: { x: 1, y: 2 } },
    { properties: { primaryId: 10, name: 'Anti Sigma', symbol: 'Σ\u0305-', quarkComposition: ['š', 'û', 'û'], massInMeV: 1382.8, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1382.8 }, table: { x: 2, y: 2 } },
    { properties: { primaryId: 11, name: 'Sigma', symbol: 'Σ0', quarkComposition: ['u', 'd', 's'], massInMeV: 1383.7, matterType: ParticleMatterType.MATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1383.7 }, table: { x: 3, y: 2 } },
    { properties: { primaryId: 12, name: 'Anti Sigma', symbol: 'Σ\u03050', quarkComposition: ['š', 'đ', 'û'], massInMeV: 1383.7, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1383.7 }, table: { x: 4, y: 2 } },
    { properties: { primaryId: 13, name: 'Sigma', symbol: 'Σ−', quarkComposition: ['d', 'd', 's'], massInMeV: 1387.2, matterType: ParticleMatterType.MATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1387.2 }, table: { x: 5, y: 2 } },
    { properties: { primaryId: 14, name: 'Anti Sigma', symbol: 'Σ\u0305+', quarkComposition: ['š', 'đ', 'đ'], massInMeV: 1387.2, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1387.2 }, table: { x: 6, y: 2 } },
    { properties: { primaryId: 15, name: 'charmed Sigma', symbol: 'Σ++c', quarkComposition: ['u', 'u', 'c'], massInMeV: 2517.9, matterType: ParticleMatterType.MATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2517.9 }, table: { x: 7, y: 2 } },
    { properties: { primaryId: 16, name: 'Anti charmed Sigma', symbol: 'Σ\u0305--c', quarkComposition: ['ĉ', 'û', 'û'], massInMeV: 2517.9, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2517.9 }, table: { x: 8, y: 2 } },
    { properties: { primaryId: 17, name: 'charmed Sigma', symbol: 'Σ+c', quarkComposition: ['u', 'd', 'c'], massInMeV: 2517.5, matterType: ParticleMatterType.MATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2517.5 }, table: { x: 9, y: 2 } },
    { properties: { primaryId: 18, name: 'Anti charmed Sigma', symbol: 'Σ\u0305-c', quarkComposition: ['ĉ', 'đ', 'û'], massInMeV: 2517.5, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2517.5 }, table: { x: 10, y: 2 } },
    { properties: { primaryId: 19, name: 'charmed Sigma', symbol: 'Σ0c', quarkComposition: ['d', 'd', 'c'], massInMeV: 2518.8, matterType: ParticleMatterType.MATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2518.8 }, table: { x: 11, y: 2 } },
    { properties: { primaryId: 20, name: 'Anti charmed Sigma', symbol: 'Σ\u03050c', quarkComposition: ['ĉ', 'đ', 'đ'], massInMeV: 2518.8, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2518.8 }, table: { x: 12, y: 2 } },
    { properties: { primaryId: 21, name: 'bottom Sigma', symbol: 'Σ+b', quarkComposition: ['u', 'u', 'b'], massInMeV: 5832.1, matterType: ParticleMatterType.MATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5832.1 }, table: { x: 13, y: 2 } },
    { properties: { primaryId: 22, name: 'Anti bottom Sigma', symbol: 'Σ\u0305-b', quarkComposition: ['ḃ', 'û', 'û'], massInMeV: 5832.1, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5832.1 }, table: { x: 14, y: 2 } },
    // Reason: Mass predicted based on pattern from Σ+b (5832.1) and Σ−b (5835.1), neutral should be in between
    { properties: { primaryId: 23, name: 'bottom Sigma', symbol: 'Σ0b', quarkComposition: ['u', 'd', 'b'], massInMeV: 5833.5, matterType: ParticleMatterType.MATTER, family: 'Sigma', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5833.5 }, table: { x: 15, y: 2 } },
    { properties: { primaryId: 24, name: 'Anti bottom Sigma', symbol: 'Σ\u03050b', quarkComposition: ['ḃ', 'đ', 'û'], massInMeV: 5833.5, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5833.5 }, table: { x: 16, y: 2 } },
    { properties: { primaryId: 25, name: 'bottom Sigma', symbol: 'Σ−b', quarkComposition: ['d', 'd', 'b'], massInMeV: 5835.1, matterType: ParticleMatterType.MATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5835.1 }, table: { x: 17, y: 2 } },
    { properties: { primaryId: 26, name: 'Anti bottom Sigma', symbol: 'Σ\u0305+b', quarkComposition: ['ḃ', 'đ', 'đ'], massInMeV: 5835.1, matterType: ParticleMatterType.ANTIMATTER, family: 'Sigma' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5835.1 }, table: { x: 18, y: 2 } },

    // Row 3: Xi Baryons (all variants) - 24 baryons
    { properties: { primaryId: 27, name: 'Xi', symbol: 'Ξ0', quarkComposition: ['u', 's', 's'], massInMeV: 1531.8, matterType: ParticleMatterType.MATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1531.8 }, table: { x: 1, y: 3 } },
    { properties: { primaryId: 28, name: 'Anti Xi', symbol: 'Ξ\u03050', quarkComposition: ['š', 'š', 'û'], massInMeV: 1531.8, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1531.8 }, table: { x: 2, y: 3 } },
    { properties: { primaryId: 29, name: 'Xi', symbol: 'Ξ−', quarkComposition: ['d', 's', 's'], massInMeV: 1535, matterType: ParticleMatterType.MATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1535 }, table: { x: 3, y: 3 } },
    { properties: { primaryId: 30, name: 'Anti Xi', symbol: 'Ξ\u0305+', quarkComposition: ['š', 'š', 'đ'], massInMeV: 1535, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1535 }, table: { x: 4, y: 3 } },
    { properties: { primaryId: 31, name: 'charmed Xi', symbol: 'Ξ+c', quarkComposition: ['u', 's', 'c'], massInMeV: 2645.9, matterType: ParticleMatterType.MATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2645.9 }, table: { x: 5, y: 3 } },
    { properties: { primaryId: 32, name: 'Anti charmed Xi', symbol: 'Ξ\u0305-c', quarkComposition: ['ĉ', 'š', 'û'], massInMeV: 2645.9, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2645.9 }, table: { x: 6, y: 3 } },
    { properties: { primaryId: 33, name: 'charmed Xi', symbol: 'Ξ0c', quarkComposition: ['d', 's', 'c'], massInMeV: 2645.9, matterType: ParticleMatterType.MATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2645.9 }, table: { x: 7, y: 3 } },
    { properties: { primaryId: 34, name: 'Anti charmed Xi', symbol: 'Ξ\u03050c', quarkComposition: ['ĉ', 'š', 'đ'], massInMeV: 2645.9, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2645.9 }, table: { x: 8, y: 3 } },
    { properties: { primaryId: 35, name: 'bottom Xi', symbol: 'Ξ0b', quarkComposition: ['u', 's', 'b'], massInMeV: 5945.5, matterType: ParticleMatterType.MATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5945.5 }, table: { x: 9, y: 3 } },
    { properties: { primaryId: 36, name: 'Anti bottom Xi', symbol: 'Ξ\u03050b', quarkComposition: ['ḃ', 'š', 'û'], massInMeV: 5945.5, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5945.5 }, table: { x: 10, y: 3 } },
    // Reason: Mass predicted based on Ξ0b (5945.5) plus typical 5-6 MeV increase for d quark substitution
    { properties: { primaryId: 37, name: 'bottom Xi', symbol: 'Ξ−b', quarkComposition: ['d', 's', 'b'], massInMeV: 5950.3, matterType: ParticleMatterType.MATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5950.3 }, table: { x: 11, y: 3 } },
    { properties: { primaryId: 38, name: 'Anti bottom Xi', symbol: 'Ξ\u0305+b', quarkComposition: ['ḃ', 'š', 'đ'], massInMeV: 5950.3, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5950.3 }, table: { x: 12, y: 3 } },
    // Reason: Mass predicted based on quark mass sum (c≈1270, b≈4180, u≈2.2) plus binding ≈1100 MeV
    { properties: { primaryId: 39, name: 'charmed bottom Xi', symbol: 'Ξ+cb', quarkComposition: ['u', 'c', 'b'], massInMeV: 6900, matterType: ParticleMatterType.MATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 6900 }, table: { x: 13, y: 3 } },
    { properties: { primaryId: 40, name: 'Anti charmed bottom Xi', symbol: 'Ξ\u0305-cb', quarkComposition: ['ḃ', 'ĉ', 'û'], massInMeV: 6900, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 6900 }, table: { x: 14, y: 3 } },
    // Reason: Mass predicted similar to Ξ+cb with d quark substitution adding ~5 MeV
    { properties: { primaryId: 41, name: 'charmed bottom Xi', symbol: 'Ξ0cb', quarkComposition: ['d', 'c', 'b'], massInMeV: 6905, matterType: ParticleMatterType.MATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 6905 }, table: { x: 15, y: 3 } },
    { properties: { primaryId: 42, name: 'Anti charmed bottom Xi', symbol: 'Ξ\u03050cb', quarkComposition: ['ḃ', 'ĉ', 'đ'], massInMeV: 6905, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 6905 }, table: { x: 16, y: 3 } },
    { properties: { primaryId: 43, name: 'double charmed Xi', symbol: 'Ξ++cc', quarkComposition: ['u', 'c', 'c'], massInMeV: 3621.4, matterType: ParticleMatterType.MATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 3621.4 }, table: { x: 17, y: 3 } },
    { properties: { primaryId: 44, name: 'Anti double charmed Xi', symbol: 'Ξ\u0305--cc', quarkComposition: ['ĉ', 'ĉ', 'û'], massInMeV: 3621.4, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 3621.4 }, table: { x: 18, y: 3 } },
    // Reason: Mass predicted based on Ξ++cc (3621.4) with d quark adding typical 5 MeV
    { properties: { primaryId: 45, name: 'double charmed Xi', symbol: 'Ξ+cc', quarkComposition: ['d', 'c', 'c'], massInMeV: 3626, matterType: ParticleMatterType.MATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 3626 }, table: { x: 19, y: 3 } },
    { properties: { primaryId: 46, name: 'Anti double charmed Xi', symbol: 'Ξ\u0305-cc', quarkComposition: ['ĉ', 'ĉ', 'đ'], massInMeV: 3626, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 3626 }, table: { x: 20, y: 3 } },
    // Reason: Mass predicted based on two b quarks (2×4180) plus u quark (2.2) plus binding ≈2000 MeV
    { properties: { primaryId: 47, name: 'double bottom Xi', symbol: 'Ξ0bb', quarkComposition: ['u', 'b', 'b'], massInMeV: 10350, matterType: ParticleMatterType.MATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 10350 }, table: { x: 21, y: 3 } },
    { properties: { primaryId: 48, name: 'Anti double bottom Xi', symbol: 'Ξ\u0305+bb', quarkComposition: ['ḃ', 'ḃ', 'û'], massInMeV: 10350, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 10350 }, table: { x: 22, y: 3 } },
    // Reason: Mass predicted similar to Ξ0bb with d quark adding typical 5 MeV
    { properties: { primaryId: 49, name: 'double bottom Xi', symbol: 'Ξ−bb', quarkComposition: ['d', 'b', 'b'], massInMeV: 10355, matterType: ParticleMatterType.MATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 10355 }, table: { x: 23, y: 3 } },
    { properties: { primaryId: 50, name: 'Anti double bottom Xi', symbol: 'Ξ\u03050bb', quarkComposition: ['ḃ', 'ḃ', 'đ'], massInMeV: 10355, matterType: ParticleMatterType.ANTIMATTER, family: 'Xi', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 10355 }, table: { x: 24, y: 3 } },

    // Row 4: Omega Baryons (all variants) - 20 baryons
    { properties: { primaryId: 51, name: 'Omega', symbol: 'Ω−', quarkComposition: ['s', 's', 's'], massInMeV: 1672.4, matterType: ParticleMatterType.MATTER, family: 'Omega' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1672.4 }, table: { x: 1, y: 4 } },
    { properties: { primaryId: 52, name: 'Anti Omega', symbol: 'Ω\u0305+', quarkComposition: ['š', 'š', 'š'], massInMeV: 1672.4, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 1672.4 }, table: { x: 2, y: 4 } },
    { properties: { primaryId: 53, name: 'charmed Omega', symbol: 'Ω0c', quarkComposition: ['s', 's', 'c'], massInMeV: 2765.9, matterType: ParticleMatterType.MATTER, family: 'Omega' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2765.9 }, table: { x: 3, y: 4 } },
    { properties: { primaryId: 54, name: 'Anti charmed Omega', symbol: 'Ω\u03050c', quarkComposition: ['ĉ', 'š', 'š'], massInMeV: 2765.9, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega' }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 2765.9 }, table: { x: 4, y: 4 } },
    // Reason: Mass predicted based on Ω− (1672.4) replacing s with b (mass increase ~3300 MeV)
    { properties: { primaryId: 55, name: 'bottom Omega', symbol: 'Ω−b', quarkComposition: ['s', 's', 'b'], massInMeV: 6046, matterType: ParticleMatterType.MATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 6046 }, table: { x: 5, y: 4 } },
    { properties: { primaryId: 56, name: 'Anti bottom Omega', symbol: 'Ω\u0305+b', quarkComposition: ['ḃ', 'š', 'š'], massInMeV: 6046, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 6046 }, table: { x: 6, y: 4 } },
    // Reason: Mass predicted based on Ω0c (2765.9) replacing s with c (mass increase ~1200 MeV)
    { properties: { primaryId: 57, name: 'double charmed Omega', symbol: 'Ω+cc', quarkComposition: ['s', 'c', 'c'], massInMeV: 3950, matterType: ParticleMatterType.MATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 3950 }, table: { x: 7, y: 4 } },
    { properties: { primaryId: 58, name: 'Anti double charmed Omega', symbol: 'Ω\u0305-cc', quarkComposition: ['ĉ', 'ĉ', 'š'], massInMeV: 3950, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 3950 }, table: { x: 8, y: 4 } },
    // Reason: Mass predicted based on quark masses (s≈96, c≈1270, b≈4180) plus binding ≈1500 MeV
    { properties: { primaryId: 59, name: 'charmed bottom Omega', symbol: 'Ω0cb', quarkComposition: ['s', 'c', 'b'], massInMeV: 7050, matterType: ParticleMatterType.MATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 7050 }, table: { x: 9, y: 4 } },
    { properties: { primaryId: 60, name: 'Anti charmed bottom Omega', symbol: 'Ω\u03050cb', quarkComposition: ['ḃ', 'ĉ', 'š'], massInMeV: 7050, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 7050 }, table: { x: 10, y: 4 } },
    // Reason: Mass predicted based on Ω−b (6046) replacing s with b (mass increase ~3300 MeV)
    { properties: { primaryId: 61, name: 'double bottom Omega', symbol: 'Ω−bb', quarkComposition: ['s', 'b', 'b'], massInMeV: 10340, matterType: ParticleMatterType.MATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 10340 }, table: { x: 11, y: 4 } },
    { properties: { primaryId: 62, name: 'Anti double bottom Omega', symbol: 'Ω\u0305+bb', quarkComposition: ['ḃ', 'ḃ', 'š'], massInMeV: 10340, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 10340 }, table: { x: 12, y: 4 } },
    // Reason: Mass predicted based on three c quarks (3×1270) plus binding ≈1200 MeV
    { properties: { primaryId: 63, name: 'triple charmed Omega', symbol: 'Ω++ccc', quarkComposition: ['c', 'c', 'c'], massInMeV: 5000, matterType: ParticleMatterType.MATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5000 }, table: { x: 13, y: 4 } },
    { properties: { primaryId: 64, name: 'Anti triple charmed Omega', symbol: 'Ω\u0305--ccc', quarkComposition: ['ĉ', 'ĉ', 'ĉ'], massInMeV: 5000, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 5000 }, table: { x: 14, y: 4 } },
    // Reason: Mass predicted based on quark masses (c≈1270×2, b≈4180) plus binding ≈1800 MeV
    { properties: { primaryId: 65, name: 'double charmed bottom Omega', symbol: 'Ω+ccb', quarkComposition: ['c', 'c', 'b'], massInMeV: 8500, matterType: ParticleMatterType.MATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 8500 }, table: { x: 15, y: 4 } },
    { properties: { primaryId: 66, name: 'Anti double charmed bottom Omega', symbol: 'Ω\u0305-ccb', quarkComposition: ['ḃ', 'ĉ', 'ĉ'], massInMeV: 8500, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 8500 }, table: { x: 16, y: 4 } },
    // Reason: Mass predicted based on quark masses (c≈1270, b≈4180×2) plus binding ≈2000 MeV
    { properties: { primaryId: 67, name: 'charmed double bottom Omega', symbol: 'Ω0cbb', quarkComposition: ['c', 'b', 'b'], massInMeV: 11630, matterType: ParticleMatterType.MATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 11630 }, table: { x: 17, y: 4 } },
    { properties: { primaryId: 68, name: 'Anti charmed double bottom Omega', symbol: 'Ω\u03050cbb', quarkComposition: ['ḃ', 'ḃ', 'ĉ'], massInMeV: 11630, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 11630 }, table: { x: 18, y: 4 } },
    // Reason: Mass predicted based on three b quarks (3×4180) plus binding ≈2200 MeV
    { properties: { primaryId: 69, name: 'triple bottom Omega', symbol: 'Ω−bbb', quarkComposition: ['b', 'b', 'b'], massInMeV: 14740, matterType: ParticleMatterType.MATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 14740 }, table: { x: 19, y: 4 } },
    { properties: { primaryId: 70, name: 'Anti triple bottom Omega', symbol: 'Ω\u0305+bbb', quarkComposition: ['ḃ', 'ḃ', 'ḃ'], massInMeV: 14740, matterType: ParticleMatterType.ANTIMATTER, family: 'Omega', massPredicted: true }, render: { bondDistance: 3, showBond: false }, physics: { interactionRange: 18, collisionRadius: 6, mass: 14740 }, table: { x: 20, y: 4 } },
] as const;

/**
 * Helper functions for accessing baryon data
 */
export const getBaryonByPrimaryId = (primaryId: number): BaryonData | undefined => {
    return BARYON_DATA.find(baryon => baryon.properties.primaryId === primaryId);
};

export const getBaryonBySymbol = (symbol: string): BaryonData | undefined => {
    return BARYON_DATA.find(baryon => baryon.properties.symbol === symbol);
};

export const getBaryonsByFamily = (family: BaryonFamily): readonly BaryonData[] => {
    return BARYON_DATA.filter(baryon => baryon.properties.family === family);
};

export const getBaryonsByQuarkComposition = (quark1: string, quark2: string, quark3: string): readonly BaryonData[] => {
    return BARYON_DATA.filter(baryon => {
        const [q1, q2, q3] = baryon.properties.quarkComposition;
        const inputQuarks = [quark1, quark2, quark3].sort();
        const baryonQuarks = [q1, q2, q3].sort();
        return inputQuarks.every((quark, index) => quark === baryonQuarks[index]);
    });
};

/**
 * Get quark composition with proper formatting (overbar for antiquarks)
 * Returns formatted string like "uud" or "ūūđ" for display
 */
export const getFormattedBaryonQuarkComposition = (quarkComposition: BaryonQuarkComposition): string => {
    const [q1, q2, q3] = quarkComposition;
    // Remove apostrophe and add combining overline character (U+0305) for antiquarks
    const formattedQ1 = q1.endsWith("'") ? q1.slice(0, -1) + '\u0305' : q1;
    const formattedQ2 = q2.endsWith("'") ? q2.slice(0, -1) + '\u0305' : q2;
    const formattedQ3 = q3.endsWith("'") ? q3.slice(0, -1) + '\u0305' : q3;
    return formattedQ1 + formattedQ2 + formattedQ3;
};

/**
 * Map quark symbol to ParticleList enum
 * Handles both matter quarks (u, d, c, s, t, b) and antiquarks (with apostrophe)
 */
export const mapBaryonQuarkToParticleList = (quark: string): string => {
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

/**
 * Get baryons with predicted masses
 */
export const getPredictedMassBaryons = (): readonly BaryonData[] => {
    return BARYON_DATA.filter(baryon => baryon.properties.massPredicted === true);
};

/**
 * Get baryons with experimentally measured masses
 */
export const getMeasuredMassBaryons = (): readonly BaryonData[] => {
    return BARYON_DATA.filter(baryon => !baryon.properties.massPredicted);
};

