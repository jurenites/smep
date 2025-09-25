/**
 * Standard Model of Particle Physics Types
 * 
 * This file defines the particle types and their properties for the SMEP game.
 * Organized according to the Standard Model with proper matter/antimatter classification.
 */

export enum ParticleType {
    // Lepton family - charged leptons
    ELECTRON = 'electron',
    MUON = 'muon',
    TAU = 'tau',

    // Lepton family - antileptons (antimatter)
    POSITRON = 'positron',
    ANTIMUON = 'antimuon',
    ANTITAU = 'antitau',

    // Future expansion for other Standard Model particles
    // QUARKS, GAUGE_BOSONS, HIGGS_BOSON, etc.
}

export enum ParticleMatterType {
    MATTER = 'matter',
    ANTIMATTER = 'antimatter',
}

export enum ParticleSize {
    SMALL = 'small',
    MID = 'mid',
    BIG = 'big',
}

export interface ParticleProperties {
    /** The type of particle */
    type: ParticleType;
    /** Whether this is matter or antimatter */
    matterType: ParticleMatterType;
    /** Display size */
    size: ParticleSize;
    /** Mass in electron masses (relative scale) */
    mass: number;
    /** Charge in elementary charge units */
    charge: number;
    /** Symbol for display */
    symbol: string;
    /** Full name */
    name: string;
    /** Family in Standard Model */
    family: string;
}

/**
 * Standard Model particle definitions
 */
export const PARTICLE_DEFINITIONS: Record<ParticleType, ParticleProperties> = {
    // Matter leptons
    [ParticleType.ELECTRON]: {
        type: ParticleType.ELECTRON,
        matterType: ParticleMatterType.MATTER,
        size: ParticleSize.SMALL,
        mass: 1, // Reference mass
        charge: -1,
        symbol: 'e⁻',
        name: 'Electron',
        family: 'Lepton',
    },
    [ParticleType.MUON]: {
        type: ParticleType.MUON,
        matterType: ParticleMatterType.MATTER,
        size: ParticleSize.MID,
        mass: 207, // ~207 times electron mass
        charge: -1,
        symbol: 'μ⁻',
        name: 'Muon',
        family: 'Lepton',
    },
    [ParticleType.TAU]: {
        type: ParticleType.TAU,
        matterType: ParticleMatterType.MATTER,
        size: ParticleSize.BIG,
        mass: 3477, // ~3477 times electron mass
        charge: -1,
        symbol: 'τ⁻',
        name: 'Tau',
        family: 'Lepton',
    },

    // Antimatter leptons (antiparticles)
    [ParticleType.POSITRON]: {
        type: ParticleType.POSITRON,
        matterType: ParticleMatterType.ANTIMATTER,
        size: ParticleSize.SMALL,
        mass: 1,
        charge: +1,
        symbol: 'e⁺',
        name: 'Positron',
        family: 'Antilepton',
    },
    [ParticleType.ANTIMUON]: {
        type: ParticleType.ANTIMUON,
        matterType: ParticleMatterType.ANTIMATTER,
        size: ParticleSize.MID,
        mass: 207,
        charge: +1,
        symbol: 'μ⁺',
        name: 'Antimuon',
        family: 'Antilepton',
    },
    [ParticleType.ANTITAU]: {
        type: ParticleType.ANTITAU,
        matterType: ParticleMatterType.ANTIMATTER,
        size: ParticleSize.BIG,
        mass: 3477,
        charge: +1,
        symbol: 'τ⁺',
        name: 'Antitau',
        family: 'Antilepton',
    },
};

/**
 * Get particle properties by type
 */
export function getParticleProperties(type: ParticleType): ParticleProperties {
    return PARTICLE_DEFINITIONS[type];
}

/**
 * Get all particles of a specific matter type
 */
export function getParticlesByMatterType(matterType: ParticleMatterType): ParticleProperties[] {
    return Object.values(PARTICLE_DEFINITIONS).filter(
        particle => particle.matterType === matterType
    );
}

/**
 * Get all particles of a specific size
 */
export function getParticlesBySize(size: ParticleSize): ParticleProperties[] {
    return Object.values(PARTICLE_DEFINITIONS).filter(
        particle => particle.size === size
    );
}
