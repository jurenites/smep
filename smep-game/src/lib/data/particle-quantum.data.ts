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
 * Complete particle data for all Standard Model particles
 * This is the single source of truth for all particle information
 */

// eslint-disable-next-line @typescript-eslint/object-curly-spacing
export const PARTICLE_QUANTUM_DATA: readonly ParticleQuantumData[] = [
    // Quarks - use mini size with gray gradient
    { properties: { symbol: 'u', name: 'up', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: 2 / 3, magneticFieldStrength: 0.5, massInMeV: 2.2 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 4.3 }, table: { shortForm: { x: 0, y: 0 } } },
    { properties: { symbol: 'd', name: 'down', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: -1 / 3, magneticFieldStrength: 0.5, massInMeV: 4.7 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 9.4 } },
    { properties: { symbol: 'c', name: 'charm', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: 2 / 3, magneticFieldStrength: 0.5, massInMeV: 1270 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 2550 } },
    { properties: { symbol: 's', name: 'strange', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: -1 / 3, magneticFieldStrength: 0.5, massInMeV: 96 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 190 } },
    { properties: { symbol: 't', name: 'top', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: 2 / 3, magneticFieldStrength: 0.5, massInMeV: 173000 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 340000 } },
    { properties: { symbol: 'b', name: 'bottom', family: 'Quark', matterType: ParticleMatterType.MATTER, charge: -1 / 3, magneticFieldStrength: 0.5, massInMeV: 4180 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-matter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 9200 } },
    // Antiquarks - same as quarks but opposite charges
    { properties: { symbol: 'u', name: 'anti up', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: -2 / 3, magneticFieldStrength: 0.5, massInMeV: 2.2 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 4.3 } },
    { properties: { symbol: 'd', name: 'anti down', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: 1 / 3, magneticFieldStrength: 0.5, massInMeV: 4.7 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 9.4 } },
    { properties: { symbol: 'c', name: 'anti charm', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: -2 / 3, magneticFieldStrength: 0.5, massInMeV: 1270 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 2550 } },
    { properties: { symbol: 's', name: 'anti strange', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: 1 / 3, magneticFieldStrength: 0.5, massInMeV: 96 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 190 } },
    { properties: { symbol: 't', name: 'anti top', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: -2 / 3, magneticFieldStrength: 0.5, massInMeV: 173000 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 340000 } },
    { properties: { symbol: 'b', name: 'anti bottom', family: 'Quark', matterType: ParticleMatterType.ANTIMATTER, charge: 1 / 3, magneticFieldStrength: 0.5, massInMeV: 4180 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_MINI_6, coreColor: 'var(--particle-quark-antimatter)' }, physics: { interactionRange: 10, collisionRadius: 2, mass: 9200 } },
    // Leptons 
    { properties: { symbol: 'e⁻', name: 'electron', family: 'Lepton', matterType: ParticleMatterType.MATTER, charge: -1, magneticFieldStrength: 1.0, massInMeV: 0.511 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.sizes.PARTICLE_SHADOW_SMALL, coreColor: 'var(--particle-lepton-matter)' }, physics: { interactionRange: 25, collisionRadius: 3, mass: 1 } },
    { properties: { symbol: 'μ⁻', name: 'muon', family: 'Lepton', matterType: ParticleMatterType.MATTER, charge: -1, magneticFieldStrength: 2.1, massInMeV: 105.66 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.sizes.PARTICLE_SHADOW_MID, coreColor: 'var(--particle-lepton-matter)' }, physics: { interactionRange: 30, collisionRadius: 3, mass: 207 } },
    { properties: { symbol: 'τ⁻', name: 'tau', family: 'Lepton', matterType: ParticleMatterType.MATTER, charge: -1, magneticFieldStrength: 3.5, massInMeV: 1776.86 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.sizes.PARTICLE_SHADOW_BIG, coreColor: 'var(--particle-lepton-matter)' }, physics: { interactionRange: 40, collisionRadius: 3, mass: 3477 } },
    { properties: { symbol: 'β⁺', name: 'positron', family: 'Antilepton', matterType: ParticleMatterType.ANTIMATTER, charge: +1, magneticFieldStrength: 1.0, massInMeV: 0.511 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.sizes.PARTICLE_SHADOW_SMALL, coreColor: 'var(--particle-lepton-antimatter)' }, physics: { interactionRange: 25, collisionRadius: 3, mass: 1 } },
    { properties: { symbol: 'μ⁺', name: 'antimuon', family: 'Antilepton', matterType: ParticleMatterType.ANTIMATTER, charge: +1, magneticFieldStrength: 2.1, massInMeV: 105.66 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.sizes.PARTICLE_SHADOW_MID, coreColor: 'var(--particle-lepton-antimatter)' }, physics: { interactionRange: 30, collisionRadius: 3, mass: 207 } },
    { properties: { symbol: 'τ⁺', name: 'antitau', family: 'Antilepton', matterType: ParticleMatterType.ANTIMATTER, charge: +1, magneticFieldStrength: 3.5, massInMeV: 1776.86 }, render: { coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, shadowSize: TOKENS.sizes.PARTICLE_SHADOW_BIG, coreColor: 'var(--particle-lepton-antimatter)' }, physics: { interactionRange: 40, collisionRadius: 3, mass: 3477 } },
    // Neutrinos - neutral particles with minimal interaction
    { properties: { symbol: 'νè', name: 'electron neutrino', family: 'Neutrino', matterType: ParticleMatterType.MATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.000002 }, render: { coreDiameter: 6, coreColor: 'var(--particle-neutrino-matter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.0000022 } },
    { properties: { symbol: 'νμ', name: 'muon neutrino', family: 'Neutrino', matterType: ParticleMatterType.MATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.00019 }, render: { coreDiameter: 6, coreColor: 'var(--particle-neutrino-matter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.00017 } },
    { properties: { symbol: 'νî', name: 'tau neutrino', family: 'Neutrino', matterType: ParticleMatterType.MATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.0185 }, render: { coreDiameter: 6, coreColor: 'var(--particle-neutrino-matter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.035 } },
    { properties: { symbol: 'νè', name: 'antineutrino', family: 'antineutrino', matterType: ParticleMatterType.ANTIMATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.000002 }, render: { coreDiameter: 6, coreColor: 'var(--particle-neutrino-antimatter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.0000022 } },
    { properties: { symbol: 'νμ', name: 'antimuon neutrino', family: 'Antineutrino', matterType: ParticleMatterType.ANTIMATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.00019 }, render: { coreDiameter: 6, coreColor: 'var(--particle-neutrino-antimatter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.00017 } },
    { properties: { symbol: 'νî', name: 'antitau neutrino', family: 'Antineutrino', matterType: ParticleMatterType.ANTIMATTER, charge: 0, magneticFieldStrength: 0.0, massInMeV: 0.0185 }, render: { coreDiameter: 6, coreColor: 'var(--particle-neutrino-antimatter)' }, physics: { interactionRange: 0, collisionRadius: 0, mass: 0.035 } },
];

export enum ParticleMatterType {
    MATTER = 'matter',
    ANTIMATTER = 'antimatter',
}

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
    const renderConfig = getParticleRenderConfig(index);

    // Return null if particle doesn't have shadow configuration
    if (!renderConfig.shadowSize) {
        return null;
    }

    const particleProps = getParticleProperties(index);
    const matterPrefix = particleProps.matterType === ParticleMatterType.MATTER ? 'particleMatter' : 'particleAntimatter';

    return {
        size: renderConfig.shadowSize,
        gradientToken: `var(--${matterPrefix}-shadow)`
    };
};
