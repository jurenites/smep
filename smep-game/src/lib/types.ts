// Core Gameplay Types
export enum GameLevel {
    QUANTUM = 'quantum',
    NUCLEAR = 'nuclear',
    ATOMIC = 'atomic',
    MOLECULAR = 'molecular',
    ASTRONOMICAL = 'astronomical',
}

export enum ParticleType {
    QUARK = 'quark',
    LEPTON = 'lepton',
    BOSON = 'boson',
    HADRON = 'hadron',
    MESON = 'meson',
    BARYON = 'baryon',
    VIRTUAL = 'virtual',
}

export enum ForceType {
    STRONG = 'strong',
    WEAK = 'weak',
    ELECTROMAGNETIC = 'electromagnetic',
    GRAVITY = 'gravity',
}

export enum ButtonState {
    ENABLED = 'enabled',
    DISABLED = 'disabled',
    HOVER = 'hover',
    FOCUSED = 'focused',
    PRESSED = 'pressed',
    PROGRESS = 'progress',
    DONE = 'done',
}

export enum PaginationState {
    ACTIVE = 'active', // Curreltly active page.
    INACTIVE = 'inactive',
    DISABLED = 'disabled', // can't switch to that page
    ERROR = 'error', // error loading for the page
    UNAVAILABLE = 'unavailable', // New state for unavailable pages
    LOCKED = 'locked', // New state for locked pages
}

export enum UICardState {
    NORMAL = 'normal',
    LOADING = 'loading',
    SELECTED = 'selected',
}

// Pagination System Types
export interface PaginationPage {
    id: string;
    index: number; // 1-based index
    title: string;
    state: PaginationState; // Replace isAvailable with state
    isActive: boolean;
}

export interface PaginationContext {
    id: string;
    pages: PaginationPage[];
    currentPageIndex: number; // 1-based index
    totalPages: number;
    state: PaginationState;
}

// Pagination Events
export interface PaginationEvent {
    type: 'PAGE_CHANGED' | 'PAGE_LOADED' | 'PAGINATION_READY';
    contextId: string;
    pageIndex: number; // 1-based index
    timestamp: number;
    metadata?: Record<string, any>;
}

// Pagination Listener Interface
export interface PaginationListener {
    onPageChange: (event: PaginationEvent) => void;
    onPageLoad?: (event: PaginationEvent) => void;
    onPaginationReady?: (event: PaginationEvent) => void;
}

// Core Entities
export interface EntityPlayground {
    id: string;
    level: GameLevel;
    scale: number;
    temperature: number;
    time: number;
    space: number;
}

export interface EntitySingularity {
    id: string;
    position: { x: number; y: number };
    energy: number;
}

export interface EntityNucleus {
    id: string;
    position: { x: number; y: number };
    charge: number;
    mass: number;
    baryons: number;
}

export interface EntityAtom {
    id: string;
    nucleus: EntityNucleus;
    electrons: number;
    orbitals: number[];
}

export interface EntityMolecule {
    id: string;
    atoms: EntityAtom[];
    bonds: Array<{ from: string; to: string; type: string }>;
}

// Particles
export interface Particle {
    id: string;
    type: ParticleType;
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    mass: number;
    charge: number;
    energy: number;
    lifetime?: number;
    isAntiparticle?: boolean;
}

export interface Antiparticle extends Particle {
    isAntiparticle: true;
}

// Forces & Fields
export interface ForceField {
    id: string;
    type: ForceType;
    position: { x: number; y: number };
    strength: number;
    range: number;
}

// Game State
export interface PlayerWallet {
    currencyEv: number;
    totalEarned: number;
}

export interface GameState {
    wallet: PlayerWallet;
    playground: EntityPlayground;
    particles: Particle[];
    fields: ForceField[];
    entities: {
        singularity: EntitySingularity;
        nuclei: EntityNucleus[];
        atoms: EntityAtom[];
        molecules: EntityMolecule[];
    };
    epoch: number;
    universe: {
        particlesCreated: number;
        energyEarned: number;
        temperature: number;
        time: number;
        space: number;
    };
}

// UI Types
export interface UIParticle {
    id: string;
    symbol: string;
    name: string;
    type: ParticleType;
    energy: number;
    charge: number;
    mass: number;
    isSelected?: boolean;
    isLoading?: boolean;
}