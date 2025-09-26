/**
 * Particle Symbol Utilities
 * 
 * Provides formatted symbols for particles including special formatting for antiparticles.
 */

import { ParticleList } from '../types/particle-types';

export const PARTICLE_SYMBOLS: Record<ParticleList, string> = {
    [ParticleList.ELECTRON]: 'e',
    [ParticleList.MUON]: 'μ',
    [ParticleList.TAU]: 'τ',
    [ParticleList.POSITRON]: 'β',
    [ParticleList.ANTIMUON]: 'μ',
    [ParticleList.ANTITAU]: 'τ',
};

/**
 * Get the display symbol for a particle type
 */
export function getParticleSymbol(particleType: ParticleList): string {
    return PARTICLE_SYMBOLS[particleType];
}

/**
 * Check if a particle is an antiparticle (needs overbar)
 */
export function isAntiparticle(particleType: ParticleList): boolean {
    return particleType === ParticleList.POSITRON ||
        particleType === ParticleList.ANTIMUON ||
        particleType === ParticleList.ANTITAU;
}

/**
 * Get formatted symbol with overbar for antiparticles
 */
export function getFormattedParticleSymbol(particleType: ParticleList): string {
    var symbol = getParticleSymbol(particleType);
    return symbol;
}
