/**
 * Particle Physics Configuration
 * 
 * This file contains all game mechanics and physics constants for particles.
 * Centralized configuration for collision detection, rendering, and interactions.
 */

import { ParticleList, getParticleProperties } from '../types/particle-types';
import { TOKENS } from '../../ui/tokens/tokens';

/**
 * Complete particle configuration combining physics and rendering
 */
export interface ParticleConfig {
    /** Particle type identifier */
    type: ParticleList;
    /** Rendering configuration */
    render: ParticleRenderConfig;
    /** Physics configuration */
    physics: ParticlePhysicsConfig;
}

/**
 * Particle rendering configuration
 */
export interface ParticleRenderConfig {
    /** Visual size in pixels for the particle core */
    coreDiameter: number;
    /** Shadow size in pixels for visual effects (only for electron-type particles) */
    shadowSize?: number;
    /** Color configuration */
    coreColor: string;
}

/**
 * Particle physics configuration
 */
export interface ParticlePhysicsConfig {
    /** Interaction range for magnetic forces */
    interactionRange: number;
    /** Collision detection radius in pixels */
    collisionRadius: number;
    /** Mass for physics calculations */
    mass: number;
}

/**
 * Centralized particle configuration mapping
 */
export const PARTICLE_CONFIG: Record<ParticleList, ParticleConfig> = {
    [ParticleList.ELECTRON]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, // UICircle dot size
            shadowSize: TOKENS.sizes.PARTICLE_SHADOW_SMALL,
            color: getParticleColors(ParticleList.ELECTRON),
        },
        physics: {
            collisionRadius: 3, // Half of core diameter
            mass: 1, // Reference mass
            interactionRange: 25, // Pixels
        },
    },
    [ParticleList.MUON]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            shadowSize: TOKENS.sizes.PARTICLE_SHADOW_MID,
            color: getParticleColors(ParticleList.MUON),
        },
        physics: {
            interactionRange: 30,
            collisionRadius: 3,
            mass: 207, // ~207 times electron mass
        },
    },
    [ParticleList.TAU]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            shadowSize: TOKENS.sizes.PARTICLE_SHADOW_BIG,
            color: getParticleColors(ParticleList.TAU),
        },
        physics: {
            interactionRange: 40,
            collisionRadius: 3,
            mass: 3477,// ~3477 times electron mass
        },
    },
    [ParticleList.POSITRON]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            shadowSize: TOKENS.sizes.PARTICLE_SHADOW_SMALL,
            color: getParticleColors(ParticleList.POSITRON),
        },
        physics: {
            interactionRange: 25,
            collisionRadius: 3,
            mass: 1,
        },
    },
    [ParticleList.ANTIMUON]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            shadowSize: TOKENS.sizes.PARTICLE_SHADOW_MID,
            color: getParticleColors(ParticleList.ANTIMUON),
        },
        physics: {
            interactionRange: 30,
            collisionRadius: 3,
            mass: 207,
        },
    },
    [ParticleList.ANTITAU]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            shadowSize: TOKENS.sizes.PARTICLE_SHADOW_BIG,
            color: getParticleColors(ParticleList.ANTITAU),
        },
        physics: {
            interactionRange: 40,
            collisionRadius: 3,
            mass: 3477,
        },
    },

    // Neutrinos - neutral particles with minimal interaction
    [ParticleList.ELECTRON_NEUTRINO]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1, // Same dot size as electron
            color: getParticleColors(ParticleList.ELECTRON_NEUTRINO),
        },
        physics: {
            interactionRange: 0, // Very short interaction range
            collisionRadius: 0, // Very small collision radius (ghost-like)
            mass: 0.0000022, //negligible mass
        },
    },
    [ParticleList.MUON_NEUTRINO]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            color: getParticleColors(ParticleList.MUON_NEUTRINO),
        },
        physics: {
            interactionRange: 0,
            collisionRadius: 0,
            mass: 0.00017,
        },
    },
    [ParticleList.TAU_NEUTRINO]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            color: getParticleColors(ParticleList.TAU_NEUTRINO),
        },
        physics: {
            interactionRange: 0,
            collisionRadius: 0,
            mass: 0.035,
        }, you
    },
    [ParticleList.ANTI_ELECTRON_NEUTRINO]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            color: getParticleColors(ParticleList.ANTI_ELECTRON_NEUTRINO),
        },
        physics: {
            interactionRange: 0,
            collisionRadius: 0,
            mass: 0.0000022,
        },
    },
    [ParticleList.ANTI_MUON_NEUTRINO]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            color: getParticleColors(ParticleList.ANTI_MUON_NEUTRINO),
        },
        physics: {
            interactionRange: 0,
            collisionRadius: 0,
            mass: 0.00017,
        },
    },
    [ParticleList.ANTI_TAU_NEUTRINO]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_DOT_1,
            color: getParticleColors(ParticleList.ANTI_TAU_NEUTRINO),
        },
        physics: {
            interactionRange: 0,
            collisionRadius: 0,
            mass: 0.035,
        },
    },

    // Quarks - use mini size with gray gradient
    [ParticleList.UP]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.UP),
        },
        physics: {
            interactionRange: 10, // Short range (quarks are confined)
            collisionRadius: 2, // Very small collision radius
            mass: 4.3,
            // TODO: need to add here the actual aspect ratio between different quarks, so the way how it displays minified version and the preal physical sizes of diameters. need to animate the scale size trasition on a Playgroud dispalying them relative to eachother.
        },
    },
    [ParticleList.DOWN]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.DOWN),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 9.4,
        },
    },
    [ParticleList.CHARM]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.CHARM),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 2550,
        },
    },
    [ParticleList.STRANGE]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.STRANGE),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 190,
        },
    },
    [ParticleList.TOP]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.TOP),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 340000,
        },
    },
    [ParticleList.BOTTOM]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.BOTTOM),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 9200,
        },
    },

    // Antiquarks - same as quarks but opposite charges
    [ParticleList.ANTIUP]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.ANTIUP),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 4.3,
        },
    },
    [ParticleList.ANTIDOWN]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.ANTIDOWN),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 9.4,
        },
    },
    [ParticleList.ANTICHARM]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.ANTICHARM),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 2550,
        },
    },
    [ParticleList.ANTISTRANGE]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.ANTISTRANGE),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 190,
        },
    },
    [ParticleList.ANTITOP]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.ANTITOP),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 340000,
        },
    },
    [ParticleList.ANTIBOTTOM]: {
        render: {
            coreDiameter: TOKENS.sizes.CIRCLE_MINI_6,
            color: getParticleColors(ParticleList.ANTIBOTTOM),
        },
        physics: {
            interactionRange: 10,
            collisionRadius: 2,
            mass: 9200,
        },
    },
};

/**
 * Get particle configuration by type
 * TODO: cange to get it by Name instead of type
 */
export function getParticleConfig(type: ParticleList): ParticleConfig {
    return PARTICLE_CONFIG[type];
}

/**
 * Get particle render configuration by type
 */
export function getParticleRenderConfig(type: ParticleList): ParticleRenderConfig {
    return PARTICLE_CONFIG[type].render;
}

/**
 * Get particle physics configuration by type
 */
export function getParticlePhysicsConfig(type: ParticleList): ParticlePhysicsConfig {
    return PARTICLE_CONFIG[type].physics;
}

/**
 * Get collision bounds for physics simulation
 */
export function getParticleCollisionBounds(type: ParticleList) {
    const config = getParticlePhysicsConfig(type);
    return {
        interactionRange: config.interactionRange,
        radius: config.collisionRadius
    };
}

/**
 * Get shadow configuration for rendering (only for particles that have shadowSize)
 */
export function getParticleShadowConfig(type: ParticleList) {
    var renderConfig = getParticleRenderConfig(type);

    // Return null if particle doesn't have shadow configuration
    if (!renderConfig.shadowSize) {
        return null;
    }
    /**
     * Get shadow gradient token based on matter type and size
     */
    var matterPrefix = renderConfig === ParticleList.MATTER ? 'particleMatter' : 'particleAntimatter';
    var tokenKey = `${matterPrefix}` as keyof typeof TOKENS.shadows;
    var shadowToken = TOKENS.shadows[tokenKey];

    return {
        size: renderConfig.shadowSize,
        gradientToken: shadowToken
    };
}

/**
 * Get particle colors based on particle family and matter type
 */
function getParticleColors(particleType: ParticleList) {
    const particleProps = getParticleProperties(particleType);

    // Determine particle family
    //TODO: here to CASE approach not need this amoaunt of IF statements

    // quarks
    if (particleProps.family === 'Quark') {
        return 'var(--particle-quark-matter)';
    }
    if (particleProps.family === 'Antiquark') {
        return 'var(--particle-quark-antimatter)'
    }
    // electrons
    if (particleProps.family === 'Lepton') {
        return 'var(--particle-lepton-matter)';
    }
    if (particleProps.family === 'Antilepton') {
        return 'var(--particle-lepton-antimatter)';
    };
    // neutrinos
    if (particleProps.family === 'Neutrino') {
        return 'var(--particle-neutrino-matter)';
    }
    if (particleProps.family === 'Antineutrino') {
        return 'var(--particle-neutrino-antimatter)';
    }
}
