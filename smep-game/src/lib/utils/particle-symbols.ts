/**
 * Particle Symbol Utilities
 * 
 * Provides formatted symbols for particles including special formatting for antiparticles.
 */

import { ParticleType } from '../types/particle-types';

export const PARTICLE_SYMBOLS: Record<ParticleType, string> = {
    [ParticleType.ELECTRON]: 'e',
    [ParticleType.MUON]: 'μ',
    [ParticleType.TAU]: 'τ',
    [ParticleType.POSITRON]: 'β',
    [ParticleType.ANTIMUON]: 'μ',
    [ParticleType.ANTITAU]: 'τ',
};

/**
 * Get the display symbol for a particle type
 */
export function getParticleSymbol(particleType: ParticleType): string {
    return PARTICLE_SYMBOLS[particleType];
}

/**
 * Check if a particle is an antiparticle (needs overbar)
 */
export function isAntiparticle(particleType: ParticleType): boolean {
    return particleType === ParticleType.POSITRON ||
        particleType === ParticleType.ANTIMUON ||
        particleType === ParticleType.ANTITAU;
}

/**
 * Get formatted symbol with overbar for antiparticles
 */
export function getFormattedParticleSymbol(particleType: ParticleType): string {
    const symbol = getParticleSymbol(particleType);

    if (isAntiparticle(particleType)) {
        // For antiparticles, we'll use a CSS class to add the overbar
        return symbol;
    }

    return symbol;
}
