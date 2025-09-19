/**
 * Game Logic Constants
 * 
 * This file contains game-specific constants that control gameplay mechanics,
 * physics, and game behavior. These are separate from visual design tokens.
 */

export const GAME_CONSTANTS = {
    // Energy and Physics
    energyGenerationRate: 0.1,
    particleRadius: 3,
    quantaUnit: 1.602176634e-19,

    // Debug and Development
    playgroundDebugArtMode: false,

    // Game Mechanics (add more as needed)
    // maxParticles: 1000,
    // simulationSpeed: 1.0,
    // gravity: 9.81,
} as const;

// Type for game constants
export type GameConstants = typeof GAME_CONSTANTS;

