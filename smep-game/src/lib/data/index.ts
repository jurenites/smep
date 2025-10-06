/**
 * Data Index - Central export for all static data
 * 
 * This file provides a single entry point for all static data in the application.
 * Import from here instead of individual data files for better organization.
 */

// Export Game related constants
export { GAME_CONSTANTS, type GameConstants } from '../data/game-constants.data';

// Export types from particle-atomic.data
export type {
    PeriodicElement,
    AtomicProperties,
    AtomicRenderConfig,
    AtomicPhysicsConfig,
    AtomicTablePosition,
    PeriodicTableLayout,
    BlockLayout,
    DisplayPosition,
    ElementDisplayMapping,
    PeriodicElementWithPosition,
    PeriodicTableData,
} from './particle-atomic.data';

// Particle Atomic Data - Complete periodic table functionality
export {
    // Core data
    PERIODIC_TABLE_DATA,
    PERIODIC_TABLE_ELEMENTS, // Legacy compatibility

    // Layout definitions
    LONG_FORM_LAYOUT,
    SHORT_FORM_LAYOUT,
    PERIODIC_TABLE_LAYOUTS,
    PERIODIC_TABLE_GRID_DIMENSIONS,

    // Block-specific element collections
    S_BLOCK_ELEMENTS,
    F_BLOCK_ELEMENTS,
    D_BLOCK_ELEMENTS,
    P_BLOCK_ELEMENTS,

    // Core element access functions
    getElementBySymbol,
    getElementByAtomicNumber,
    getElementsByCategory,
    getElementsByShellGroup,
    getElementsByPeriod,

    // Layout helper functions
    getLayoutByName,
    getBlockLayout,
    getElementPosition,

    // Layout mapping functions
    mapAtomicDataToLayout,
    getBlockElements,
    getElementsByBlock,
    getElementByAtomicNumberWithPosition,
    getElementBySymbolWithPosition,
    getElementsByCategoryWithPosition,
    getElementsByShellGroupWithPosition,

    // Legacy compatibility functions
    createPeriodicTableData,
    getElementsByShellGroupWithLayout
} from './particle-atomic.data';

// Particle Physics Data
export {
    PARTICLE_QUANTUM_DATA,
    getParticleQuantumData,
    getParticleProperties,
    getParticleRenderConfig,
    getParticlePhysicsConfig,
    getParticlesByMatterType,
    getParticlesByFamily,
    getParticleCollisionBounds,
    getParticleShadowConfig,
    getParticleSymbol,
    isAntiparticle,
    getFormattedParticleSymbol,
    shouldHaveBackgroundShadow,
    getParticleIndex,
    getParticlePropertiesByType,
    getParticleRenderConfigByType,
    getParticlePhysicsConfigByType,
    getParticleShadowConfigByType,
    shouldHaveBackgroundShadowByType,
    getFormattedParticleSymbolByType,
    isAntiparticleByType,
    ParticleMatterType,
    ParticleList
} from './particle-quantum.data';

// Export types from particle-quantum.data
export type { ParticleQuantumData } from './particle-quantum.data';

// Legacy type alias
export type { PeriodicElement as ParticleAtomicData } from './particle-atomic.data';
