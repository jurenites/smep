/**
 * Particle Physics Configuration
 * 
 * This file contains all game mechanics and physics constants for particles.
 * Centralized configuration for collision detection, rendering, and interactions.
 */

import { ParticleType, ParticleMatterType, getParticleProperties } from '../types/particle-types';
import { TOKENS } from '../../ui/tokens/tokens';

/**
 * Particle rendering configuration
 */
export interface ParticleRenderConfig {
    /** Visual size in pixels for the particle core */
    coreDiameter: number;
    /** Shadow size in pixels for visual effects */
    shadowSize: {
        small: number;
        mid: number;
        big: number;
    };
    /** Color configuration */
    colors: {
        matter: string;
        antimatter: string;
    };
}

/**
 * Particle physics configuration
 */
export interface ParticlePhysicsConfig {
    /** Collision detection radius in pixels */
    collisionRadius: number;
    /** Mass for physics calculations */
    mass: number;
    /** Charge for electromagnetic interactions */
    charge: number;
    /** Magnetic field strength */
    magneticFieldStrength: number;
    /** Interaction range for magnetic forces */
    interactionRange: number;
}

/**
 * Complete particle configuration combining physics and rendering
 */
export interface ParticleConfig {
    /** Particle type identifier */
    type: ParticleType;
    /** Rendering configuration */
    render: ParticleRenderConfig;
    /** Physics configuration */
    physics: ParticlePhysicsConfig;
}

/**
 * Centralized particle configuration mapping
 */
export const PARTICLE_CONFIG: Record<ParticleType, ParticleConfig> = {
    [ParticleType.ELECTRON]: {
        type: ParticleType.ELECTRON,
        render: {
            coreDiameter: 6, // UICircle dot size
            shadowSize: {
                small: 17,
                mid: 40,
                big: 109,
            },
            colors: {
                matter: 'var(--color-yolk)',
                antimatter: 'var(--color-ultraviolet)',
            },
        },
        physics: {
            collisionRadius: 3, // Half of core diameter
            mass: 1, // Reference mass
            charge: -1,
            magneticFieldStrength: 1.0,
            interactionRange: 25, // Pixels
        },
    },
    [ParticleType.MUON]: {
        type: ParticleType.MUON,
        render: {
            coreDiameter: 6,
            shadowSize: {
                small: 17,
                mid: 40,
                big: 109,
            },
            colors: {
                matter: 'var(--color-yolk)',
                antimatter: 'var(--color-ultraviolet)',
            },
        },
        physics: {
            collisionRadius: 3,
            mass: 207,
            charge: -1,
            magneticFieldStrength: 2.1, // Heavier = stronger field
            interactionRange: 30,
        },
    },
    [ParticleType.TAU]: {
        type: ParticleType.TAU,
        render: {
            coreDiameter: 6,
            shadowSize: {
                small: 17,
                mid: 40,
                big: 109,
            },
            colors: {
                matter: 'var(--color-yolk)',
                antimatter: 'var(--color-ultraviolet)',
            },
        },
        physics: {
            collisionRadius: 3,
            mass: 3477,
            charge: -1,
            magneticFieldStrength: 3.5, // Much heavier = much stronger field
            interactionRange: 40,
        },
    },
    [ParticleType.POSITRON]: {
        type: ParticleType.POSITRON,
        render: {
            coreDiameter: 6,
            shadowSize: {
                small: 17,
                mid: 40,
                big: 109,
            },
            colors: {
                matter: 'var(--color-yolk)',
                antimatter: 'var(--color-ultraviolet)',
            },
        },
        physics: {
            collisionRadius: 3,
            mass: 1,
            charge: +1, // Opposite charge
            magneticFieldStrength: 1.0,
            interactionRange: 25,
        },
    },
    [ParticleType.ANTIMUON]: {
        type: ParticleType.ANTIMUON,
        render: {
            coreDiameter: 6,
            shadowSize: {
                small: 17,
                mid: 40,
                big: 109,
            },
            colors: {
                matter: 'var(--color-yolk)',
                antimatter: 'var(--color-ultraviolet)',
            },
        },
        physics: {
            collisionRadius: 3,
            mass: 207,
            charge: +1,
            magneticFieldStrength: 2.1,
            interactionRange: 30,
        },
    },
    [ParticleType.ANTITAU]: {
        type: ParticleType.ANTITAU,
        render: {
            coreDiameter: 6,
            shadowSize: {
                small: 17,
                mid: 40,
                big: 109,
            },
            colors: {
                matter: 'var(--color-yolk)',
                antimatter: 'var(--color-ultraviolet)',
            },
        },
        physics: {
            collisionRadius: 3,
            mass: 3477,
            charge: +1,
            magneticFieldStrength: 3.5,
            interactionRange: 40,
        },
    },
};

/**
 * Get particle configuration by type
 */
export function getParticleConfig(type: ParticleType): ParticleConfig {
    return PARTICLE_CONFIG[type];
}

/**
 * Get particle render configuration by type
 */
export function getParticleRenderConfig(type: ParticleType): ParticleRenderConfig {
    return PARTICLE_CONFIG[type].render;
}

/**
 * Get particle physics configuration by type
 */
export function getParticlePhysicsConfig(type: ParticleType): ParticlePhysicsConfig {
    return PARTICLE_CONFIG[type].physics;
}

/**
 * Get collision bounds for physics simulation
 */
export function getParticleCollisionBounds(type: ParticleType) {
    const config = getParticlePhysicsConfig(type);
    return {
        radius: config.collisionRadius,
        diameter: config.collisionRadius * 2,
        interactionRange: config.interactionRange,
        magneticFieldStrength: config.magneticFieldStrength,
    };
}

/**
 * Get shadow configuration for rendering
 */
export function getParticleShadowConfig(type: ParticleType, shadowSize: 'small' | 'mid' | 'big') {
    const renderConfig = getParticleRenderConfig(type);
    const particleProps = getParticleProperties(type);

    return {
        size: renderConfig.shadowSize[shadowSize],
        gradientToken: getShadowGradientToken(particleProps.matterType, shadowSize),
        particleColor: particleProps.matterType === ParticleMatterType.MATTER
            ? renderConfig.colors.matter
            : renderConfig.colors.antimatter,
    };
}

/**
 * Get shadow gradient token based on matter type and size
 */
function getShadowGradientToken(matterType: ParticleMatterType, shadowSize: 'small' | 'mid' | 'big'): string {
    const matterPrefix = matterType === ParticleMatterType.MATTER ? 'particleMatter' : 'particleAntimatter';
    const sizeSuffix = shadowSize.charAt(0).toUpperCase() + shadowSize.slice(1);
    const tokenKey = `${matterPrefix}${sizeSuffix}` as keyof typeof TOKENS.shadows;
    return TOKENS.shadows[tokenKey];
}
