/**
 * Game Logic Constants
 * 
 * This file contains game-specific constants that control gameplay mechanics,
 * physics, and game behavior. These are separate from visual design tokens.
 */

export const GAME_CONSTANTS = {
    // Energy and Physics
    energyGenerationRate: 0.1,
    quantaUnit: 1.602176634e-19,

    // Debug and Development
    playgroundDebugArtMode: false,

    // Game performance (add more as needed)
    maxParticles: 10000,
    simulationSpeed: 1.0,
} as const;

// Type for game constants
export type GameConstants = typeof GAME_CONSTANTS;

