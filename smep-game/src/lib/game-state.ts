import { create } from 'zustand';
import type { GameState, PlayerWallet, EntityPlayground, EntitySingularity, Particle, ForceField } from './types';
import { GameLevel } from './types';
import { ParticleList } from './data';
import { GAME_CONSTANTS } from './constants';

// Initial state
const initialWallet: PlayerWallet = {
    currencyEv: 0,
    totalEarned: 0,
};

const initialPlayground: EntityPlayground = {
    id: 'playground-1',
    level: GameLevel.QUANTUM,
    scale: 1,
    temperature: 0,
    time: 0,
    space: 1,
};

const initialSingularity: EntitySingularity = {
    id: 'singularity-1',
    position: { x: 0, y: 0 },
    energy: 0,
};

const initialGameState: GameState = {
    wallet: initialWallet,
    playground: initialPlayground,
    particles: [],
    fields: [],
    entities: {
        singularity: initialSingularity,
        nuclei: [],
        atoms: [],
        molecules: [],
    },
    epoch: 0,
    universe: {
        particlesCreated: 0,
        energyEarned: 0,
        temperature: 0,
        time: 0,
        space: 1,
    },
};

interface GameStore extends GameState {
    // Actions
    addEnergy: (amount: number) => void;
    spendEnergy: (amount: number) => void;
    createParticle: (type: ParticleList, position: { x: number; y: number }) => void;
    updatePlayground: (updates: Partial<EntityPlayground>) => void;
    tick: (deltaTime: number) => void;
    reset: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    ...initialGameState,

    addEnergy: (amount: number) => {
        set((state) => ({
            wallet: {
                ...state.wallet,
                currencyEv: state.wallet.currencyEv + amount,
                totalEarned: state.wallet.totalEarned + amount,
            },
            universe: {
                ...state.universe,
                energyEarned: state.universe.energyEarned + amount,
            },
        }));
    },

    spendEnergy: (amount: number) => {
        set((state) => ({
            wallet: {
                ...state.wallet,
                currencyEv: Math.max(0, state.wallet.currencyEv - amount),
            },
        }));
    },

    createParticle: (type: ParticleList, position: { x: number; y: number }) => {
        const newParticle: Particle = {
            id: `particle-${Date.now()}-${Math.random()}`,
            type,
            position,
            velocity: { x: 0, y: 0 },
            mass: 1,
            charge: 0,
            energy: 1,
        };

        set((state) => ({
            particles: [...state.particles, newParticle],
            universe: {
                ...state.universe,
                particlesCreated: state.universe.particlesCreated + 1,
            },
        }));
    },

    updatePlayground: (updates: Partial<EntityPlayground>) => {
        set((state) => ({
            playground: {
                ...state.playground,
                ...updates,
            },
        }));
    },

    tick: (deltaTime: number) => {
        set((state) => {
            // Update time
            const newTime = state.universe.time + deltaTime;

            // Simple idle progression - generate energy over time
            const energyGenerated = deltaTime * GAME_CONSTANTS.energyGenerationRate; // 0.1 eV per second

            // Update particle positions (simple physics)
            const updatedParticles = state.particles.map(particle => ({
                ...particle,
                position: {
                    x: particle.position.x + particle.velocity.x * deltaTime,
                    y: particle.position.y + particle.velocity.y * deltaTime,
                },
            }));

            return {
                universe: {
                    ...state.universe,
                    time: newTime,
                    energyEarned: state.universe.energyEarned + energyGenerated,
                },
                wallet: {
                    ...state.wallet,
                    currencyEv: state.wallet.currencyEv + energyGenerated,
                },
                particles: updatedParticles,
            };
        });
    },

    reset: () => {
        set(initialGameState);
    },
})); 