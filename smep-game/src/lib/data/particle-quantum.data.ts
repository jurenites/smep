/**
 * Particle Physics Data - Complete Standard Model particle definitions
 * 
 * This consolidates particle properties, physics configuration, and rendering data
 * into a single, type-safe data structure. Replaces the scattered approach from
 * particle-list.ts and particle-physics.ts files.
 * 
 * Format: Compact inline objects for better readability and shorter file length.
 * Each particle is defined as: { properties: {...}, render: {...}, physics: {...} }
 */

import { TOKENS } from "../../ui/tokens/tokens";

/**
 * Particle matter type enumeration
 */
export enum ParticleMatterType {
    MATTER = 'matter',
    ANTIMATTER = 'antimatter',
}

/**
 * Particle list enumeration for particle identification
 */
// TODO: review do we really need this enum list? its being added again and again, i not kinda like it that much. lsit of static strings? better to move those evetntually into localisatino file.
export enum ParticleList {
    // Quarks
    UP = 'up',
    DOWN = 'down',
    CHARM = 'charm',
    STRANGE = 'strange',
    TOP = 'top',
    BOTTOM = 'bottom',
    ANTI_UP = 'anti-up',
    ANTI_DOWN = 'anti-down',
    ANTI_CHARM = 'anti-charm',
    ANTI_STRANGE = 'anti-strange',
    ANTI_TOP = 'anti-top',
    ANTI_BOTTOM = 'anti-bottom',

    // Leptons
    ELECTRON = 'electron',
    MUON = 'muon',
    TAU = 'tau',
    POSITRON = 'positron',
    ANTI_MUON = 'antimuon',
    ANTI_TAU = 'antitau',

    // Neutrinos
    ELECTRON_NEUTRINO = 'electron-neutrino',
    MUON_NEUTRINO = 'muon-neutrino',
    TAU_NEUTRINO = 'tau-neutrino',
    ANTI_ELECTRON_NEUTRINO = 'antineutrino',
    ANTI_MUON_NEUTRINO = 'antimuon-neutrino',
    ANTI_TAU_NEUTRINO = 'antitau-neutrino',
}

/**
 * Complete particle data for all Standard Model particles
 * This is the single source of truth for all particle information
 */

// eslint-disable-next-line @typescript-eslint/object-curly-spacing
export const PARTICLE_QUANTUM_DATA: readonly ParticleQuantumData[] = [
    // Quarks - use custom size (8px) for better visibility
    { properties: { symbol: 'u', name: 'up', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: 2 / 3, magneticFieldStrength: 0.5, massInMeV: 2.2 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 4.3 }, table: { shortForm: { x: 0, y: 0 } } },
    { properties: { symbol: 'd', name: 'down', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: -1 / 3, magneticFieldStrength: 0.5, massInMeV: 4.7 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 9.4 }, table: { shortForm: { x: 0, y: 1 } } },
    { properties: { symbol: 'c', name: 'charm', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: 2 / 3, magneticFieldStrength: 0.5, massInMeV: 1270 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 2550 }, table: { shortForm: { x: 1, y: 0 } } },
    { properties: { symbol: 's', name: 'strange', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: -1 / 3, magneticFieldStrength: 0.5, massInMeV: 96 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 190 }, table: { shortForm: { x: 1, y: 1 } } },
    { properties: { symbol: 't', name: 'top', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: 2 / 3, magneticFieldStrength: 0.5, massInMeV: 173000 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 340000 }, table: { shortForm: { x: 2, y: 0 } } },
    { properties: { symbol: 'b', name: 'bottom', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: -1 / 3, magneticFieldStrength: 0.5, massInMeV: 4180 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 9200 }, table: { shortForm: { x: 2, y: 1 } } },
    // Antiquarks - same as quarks but opposite charges
    { properties: { symbol: 'û', name: 'anti up', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: -2 / 3, magneticFieldStrength: 0.5, massInMeV: 2.2 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 4.3 }, table: { shortForm: { x: 4, y: 0 } } },
    { properties: { symbol: 'đ', name: 'anti down', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: 1 / 3, magneticFieldStrength: 0.5, massInMeV: 4.7 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 9.4 }, table: { shortForm: { x: 4, y: 1 } } },
    { properties: { symbol: 'ĉ', name: 'anti charm', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: -2 / 3, magneticFieldStrength: 0.5, massInMeV: 1270 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 2550 }, table: { shortForm: { x: 5, y: 0 } } },
    { properties: { symbol: 'š', name: 'anti strange', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: 1 / 3, magneticFieldStrength: 0.5, massInMeV: 96 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 190 }, table: { shortForm: { x: 5, y: 1 } } },
    { properties: { symbol: 'í', name: 'anti top', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: -2 / 3, magneticFieldStrength: 0.5, massInMeV: 173000 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 340000 }, table: { shortForm: { x: 6, y: 0 } } },
    { properties: { symbol: 'ḃ', name: 'anti bottom', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: 1 / 3, magneticFieldStrength: 0.5, massInMeV: 4180 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 9200 }, table: { shortForm: { x: 6, y: 1 } } },
    // Leptons 
    { properties: { symbol: 'e⁻', name: 'electron', family: 'Lepton', matterType: ParticleMatterType.MATTER, charge: -1, magneticFieldStrength: 1.0, massInMeV: 0.511 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.shadowSizes.SMALL, coreColor: 'var(--particle-lepton-matter)' }, physics: { interactionRange: 25, collisionRadius: 3, mass: 1 }, table: { shortForm: { x: 2, y: 0 } } },
    { properties: { symbol: 'μ⁻', name: 'muon', family: 'Lepton', matterType: ParticleMatterType.MATTER, charge: -1, magneticFieldStrength: 2.1, massInMeV: 105.66 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.shadowSizes.MID, coreColor: 'var(--particle-lepton-matter)' }, physics: { interactionRange: 30, collisionRadius: 3, mass: 207 }, table: { shortForm: { x: 2, y: 1 } } },
    { properties: { symbol: 'τ⁻', name: 'tau', family: 'Lepton', matterType: ParticleMatterType.MATTER, charge: -1, magneticFieldStrength: 3.5, massInMeV: 1776.86 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.shadowSizes.BIG, coreColor: 'var(--particle-lepton-matter)' }, physics: { interactionRange: 40, collisionRadius: 3, mass: 3477 }, table: { shortForm: { x: 2, y: 2 } } },
    { properties: { symbol: 'β⁺', name: 'positron', family: 'Antilepton', matterType: ParticleMatterType.ANTIMATTER, charge: +1, magneticFieldStrength: 1.0, massInMeV: 0.511 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.shadowSizes.SMALL, coreColor: 'var(--particle-lepton-antimatter)' }, physics: { interactionRange: 25, collisionRadius: 3, mass: 1 }, table: { shortForm: { x: 2, y: 3 } } },
    { properties: { symbol: 'μ⁺', name: 'antimuon', family: 'Antilepton', matterType: ParticleMatterType.ANTIMATTER, charge: +1, magneticFieldStrength: 2.1, massInMeV: 105.66 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.shadowSizes.MID, coreColor: 'var(--particle-lepton-antimatter)' }, physics: { interactionRange: 30, collisionRadius: 3, mass: 207 }, table: { shortForm: { x: 2, y: 4 } } },
    { properties: { symbol: 'τ⁺', name: 'antitau', family: 'Antilepton', matterType: ParticleMatterType.ANTIMATTER, charge: +1, magneticFieldStrength: 3.5, massInMeV: 1776.86 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.shadowSizes.BIG, coreColor: 'var(--particle-lepton-antimatter)' }, physics: { interactionRange: 40, collisionRadius: 3, mass: 3477 }, table: { shortForm: { x: 2, y: 5 } } },
    // Neutrinos - neutral particles with minimal interaction
    { properties: { symbol: 'νè', name: 'electron neutrino', family: 'Neutrino', matterType: ParticleMatterType.MATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.000002 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, coreColor: 'var(--particle-neutrino-matter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.0000022 }, table: { shortForm: { x: 3, y: 0 } } },
    { properties: { symbol: 'νµ', name: 'muon neutrino', family: 'Neutrino', matterType: ParticleMatterType.MATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.00019 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, coreColor: 'var(--particle-neutrino-matter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.00017 }, table: { shortForm: { x: 3, y: 1 } } },
    { properties: { symbol: 'νî', name: 'tau neutrino', family: 'Neutrino', matterType: ParticleMatterType.MATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.0185 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, coreColor: 'var(--particle-neutrino-matter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.035 }, table: { shortForm: { x: 3, y: 2 } } },
    { properties: { symbol: 'νè', name: 'antineutrino', family: 'antineutrino', matterType: ParticleMatterType.ANTIMATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.000002 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, coreColor: 'var(--particle-neutrino-antimatter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.0000022 }, table: { shortForm: { x: 3, y: 3 } } },
    { properties: { symbol: 'νµ', name: 'antimuon neutrino', family: 'Antineutrino', matterType: ParticleMatterType.ANTIMATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.00019 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, coreColor: 'var(--particle-neutrino-antimatter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.00017 }, table: { shortForm: { x: 3, y: 4 } } },
    { properties: { symbol: 'νî', name: 'antitau neutrino', family: 'Antineutrino', matterType: ParticleMatterType.ANTIMATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.0185 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, coreColor: 'var(--particle-neutrino-antimatter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.035 }, table: { shortForm: { x: 3, y: 5 } } },
];

/**
 * Complete particle configuration combining all properties
 */
export interface ParticleQuantumData {
    /** Basic particle properties */
    properties: {
        /** Symbol for display */
        symbol: string;
        /** Full name */
        name: string;
        /** Family in Standard Model */
        family: string;
        /** Whether this is matter or antimatter */
        matterType: ParticleMatterType;
        /** Charge for electromagnetic interactions */
        charge: number;
        /** Magnetic field strength */
        magneticFieldStrength: number;
        /** Mass in MeV/c² for mass-energy conversion */
        massInMeV: number;
    };

    /** Rendering configuration */
    render: {
        /** Visual size in pixels for the particle core */
        coreDiameter: number;
        /** Shadow size in pixels for visual effects (only for electron-type particles) */
        shadowSize?: number;
        /** Core color for the particle */
        coreColor: string;
    };

    /** Physics configuration */
    physics: {
        /** Interaction range for magnetic forces */
        interactionRange: number;
        /** Collision detection radius in pixels */
        collisionRadius: number;
        /** Mass for physics calculations */
        mass: number;
    };

    /** Table position configuration */
    table: {
        /** Short form table position */
        shortForm: { x: number; y: number };
    }
}

/**
 * Helper functions for accessing particle data
 */
export const getParticleQuantumData = (index: number): ParticleQuantumData => {
    return PARTICLE_QUANTUM_DATA[index];
};

export const getParticleProperties = (index: number) => {
    return PARTICLE_QUANTUM_DATA[index].properties;
};

export const getParticleRenderConfig = (index: number) => {
    return PARTICLE_QUANTUM_DATA[index].render;
};

export const getParticlePhysicsConfig = (index: number) => {
    return PARTICLE_QUANTUM_DATA[index].physics;
};

export const getParticlesByMatterType = (matterType: ParticleMatterType): ParticleQuantumData[] => {
    return Object.values(PARTICLE_QUANTUM_DATA).filter(
        particle => particle.properties.matterType === matterType
    );
};

export const getParticlesByFamily = (family: string): ParticleQuantumData[] => {
    return Object.values(PARTICLE_QUANTUM_DATA).filter(
        particle => particle.properties.family === family
    );
};

export const getParticleCollisionBounds = (index: number) => {
    const config = getParticlePhysicsConfig(index);
    return {
        interactionRange: config.interactionRange,
        radius: config.collisionRadius
    };
};

export const getParticleShadowConfig = (index: number) => {
    var renderConfig = getParticleRenderConfig(index);

    // Return null if particle doesn't have shadow configuration
    if (!renderConfig.shadowSize) {
        return null;
    }

    var particleProps = getParticleProperties(index);
    var matterPrefix = particleProps.matterType === ParticleMatterType.MATTER ? 'particle-matter' : 'particle-antimatter';

    return {
        size: renderConfig.shadowSize,
        gradientToken: `var(--${matterPrefix}-shadow)`
    };
};

/**
 * Particle Symbol Utilities
 * 
 * Provides formatted symbols for particles including special formatting for antiparticles.
 */

/**
 * Get the display symbol for a particle by index
 */
export const getParticleSymbol = (index: number): string => {
    const particleProps = getParticleProperties(index);
    return particleProps.symbol;
};

/**
 * Check if a particle is an antiparticle by checking its matterType
 */
export const isAntiparticle = (index: number): boolean => {
    const particleProps = getParticleProperties(index);
    return particleProps.matterType === ParticleMatterType.ANTIMATTER;
};

/**
 * Get formatted symbol with overbar for antiparticles
 */
export const getFormattedParticleSymbol = (index: number): string => {
    const symbol = getParticleSymbol(index);
    return symbol;
};

/**
 * Determines if a particle should have a background shadow by checking if shadowSize exists
 */
export const shouldHaveBackgroundShadow = (index: number): boolean => {
    const renderConfig = getParticleRenderConfig(index);
    return renderConfig.shadowSize != null;
};

/**
 * Maps ParticleList enum values to numeric indices in the PARTICLE_QUANTUM_DATA array
 */
export const getParticleIndex = (particleType: ParticleList): number => {
    const particleNames = PARTICLE_QUANTUM_DATA.map(p => p.properties.name);
    const index = particleNames.findIndex(name =>
        name.toLowerCase().replace(/\s+/g, '-') === particleType.toLowerCase()
    );
    if (index === -1) {
        throw new Error(`Particle type ${particleType} not found in particle data`);
    }
    return index;
};

/**
 * Helper functions that accept ParticleList enum values instead of numeric indices
 */
export const getParticlePropertiesByType = (particleType: ParticleList) => {
    return getParticleProperties(getParticleIndex(particleType));
};

export const getParticleRenderConfigByType = (particleType: ParticleList) => {
    return getParticleRenderConfig(getParticleIndex(particleType));
};

export const getParticlePhysicsConfigByType = (particleType: ParticleList) => {
    return getParticlePhysicsConfig(getParticleIndex(particleType));
};

export const getParticleShadowConfigByType = (particleType: ParticleList) => {
    return getParticleShadowConfig(getParticleIndex(particleType));
};

export const shouldHaveBackgroundShadowByType = (particleType: ParticleList): boolean => {
    return shouldHaveBackgroundShadow(getParticleIndex(particleType));
};

export const getFormattedParticleSymbolByType = (particleType: ParticleList): string => {
    return getFormattedParticleSymbol(getParticleIndex(particleType));
};

export const isAntiparticleByType = (particleType: ParticleList): boolean => {
    // Special exceptions: positron and anti-quarks should not have antiparticle bar
    if (particleType === ParticleList.POSITRON ||
        particleType === ParticleList.ANTI_UP ||
        particleType === ParticleList.ANTI_DOWN ||
        particleType === ParticleList.ANTI_CHARM ||
        particleType === ParticleList.ANTI_STRANGE ||
        particleType === ParticleList.ANTI_TOP ||
        particleType === ParticleList.ANTI_BOTTOM) {
        return false;
    }
    return isAntiparticle(getParticleIndex(particleType));
};


