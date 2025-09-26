/**
 * Data Index - Central export for all static data
 * 
 * This file provides a single entry point for all static data in the application.
 * Import from here instead of individual data files for better organization.
 */

// Export Game related constants
export { GAME_CONSTANTS, type GameConstants } from '../data/game-constants.data';

// Particle Atomic Data
export {
    PERIODIC_TABLE_DATA,
    getElementBySymbol,
    getElementByAtomicNumber,
    getElementsByCategory,
    getElementsByShellGroup,
    getElementsByPeriod,
    type ParticleAtomicData
} from './particle-atomic.data.ts 22-38-27-025';

// Particle Physics Data
export {
    PARTICLE_QUANTUM_DATA,
    getParticleData,
    getParticleProperties,
    getParticleRenderConfig,
    getParticlePhysicsConfig,
    getParticlesByMatterType,
    getParticlesByFamily,
    getParticleCollisionBounds,
    getParticleShadowConfig,
    ParticleList,
    ParticleMatterType,
    type ParticleQuantumData
} from './particle-quantum.data';
