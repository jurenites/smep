/**
 * Particle Symbol Utilities
 * 
 * Provides formatted symbols for particles including special formatting for antiparticles.
 */

import { ParticleQuantumData, getParticleProperties, ParticleMatterType, getParticleRenderConfig } from './particle-quantum.data';

/**
 * Get the display symbol for a particle type from PARTICLE_DEFINITIONS
 */
export function getParticleSymbol(particleType: ParticleQuantumData): string {
    const particleProps = getParticleProperties(particleType);
    return particleProps.symbol;
}

/**
 * Check if a particle is an antiparticle by checking its matterType
 */
export function isAntiparticle(particleType: ParticleQuantumData): boolean {
    const particleProps = getParticleProperties(particleType);
    return particleProps.matterType === ParticleMatterType.ANTIMATTER;
}

/**
 * Get formatted symbol with overbar for antiparticles
 */
export function getFormattedParticleSymbol(particleType: ParticleQuantumData): string {
    var symbol = getParticleSymbol(particleType);
    return symbol;
}

/**
 * Determines if a particle should have a background shadow by checking if shadowSize exists
 */
export function shouldHaveBackgroundShadow(particleType: ParticleQuantumData): boolean {
    const renderConfig = getParticleRenderConfig(particleType);
    return renderConfig.shadowSize != null;
}
