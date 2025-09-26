/**
 * Standard Model of Particle Physics Types
 * 
 * This file defines the particle types and their properties for the SMEP game.
 * Organized according to the Standard Model with proper matter/antimatter classification.
 */

export enum ParticleList {
    // Quark family - quarks (matter)
    UP = 'up',
    DOWN = 'down',
    CHARM = 'charm',
    STRANGE = 'strange',
    TOP = 'top',
    BOTTOM = 'bottom',
    ANTIUP = 'antiup', //antiquarks (antimatter)
    ANTIDOWN = 'antidown',
    ANTICHARM = 'anticharm',
    ANTISTRANGE = 'antistrange',
    ANTITOP = 'antitop',
    ANTIBOTTOM = 'antibottom',

    // Lepton family - charged leptons
    ELECTRON = 'electron',
    MUON = 'muon',
    TAU = 'tau',
    POSITRON = 'positron', // antileptons (antimatter)
    ANTIMUON = 'antimuon',
    ANTITAU = 'antitau',

    // Lepton family - neutrinos (neutral leptons)
    ELECTRON_NEUTRINO = 'electron_neutrino',
    MUON_NEUTRINO = 'muon_neutrino',
    TAU_NEUTRINO = 'tau_neutrino',
    ANTI_ELECTRON_NEUTRINO = 'anti_electron_neutrino', // antineutrinos (antimatter)
    ANTI_MUON_NEUTRINO = 'anti_muon_neutrino',
    ANTI_TAU_NEUTRINO = 'anti_tau_neutrino',

    // Future expansion for other Standard Model particles
    // GAUGE_BOSONS, HIGGS_BOSON, etc.
}

export enum ParticleMatterType {
    MATTER = 'matter',
    ANTIMATTER = 'antimatter',
}
export interface ParticleProperties {
    /** The type of particle */
    type: ParticleList;
    /** Whether this is matter or antimatter */
    matterType: ParticleMatterType;
    /** Symbol for display */
    symbol: string;
    /** Full name */
    name: string;
    /** Family in Standard Model */
    family: string;
    /** Charge for electromagnetic interactions */
    charge: number;
    /** Magnetic field strength */
    magneticFieldStrength: number;
}

/**
 * Standard Model particle definitions
 */
export const PARTICLE_DEFINITIONS: Record<ParticleList, ParticleProperties> = {
    // Matter leptons
    [ParticleList.ELECTRON]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 'e⁻',
        name: 'Electron',
        family: 'Lepton',
        charge: -1,
        magneticFieldStrength: 1.0,
        // TODO: need to ad MeV for the mass conversion to energy
    },
    [ParticleList.MUON]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 'μ⁻',
        name: 'Muon',
        family: 'Lepton',
        charge: -1,
        magneticFieldStrength: 2.1, // Heavier = stronger field
    },
    [ParticleList.TAU]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 'τ⁻',
        name: 'Tau',
        family: 'Lepton',
        charge: -1,
        magneticFieldStrength: 3.5, // Much heavier = much stronger field
    },

    // Antimatter leptons (antiparticles)
    [ParticleList.POSITRON]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'β⁺', //Do not change this symbol I like it like that.
        name: 'Positron',
        family: 'Antilepton',
        charge: +1, // Opposite charge
        magneticFieldStrength: 1.0,
    },
    [ParticleList.ANTIMUON]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'μ⁺',
        name: 'Antimuon',
        family: 'Antilepton',
        charge: +1,
        magneticFieldStrength: 2.1,
    },
    [ParticleList.ANTITAU]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'τ⁺',
        name: 'Antitau',
        family: 'Antilepton',
        charge: +1,
        magneticFieldStrength: 3.5,
    },

    [ParticleList.ELECTRON_NEUTRINO]: {
        matterType: ParticleMatterType.NEUTRINO,
        symbol: 'νₑ',
        name: 'Electron Neutrino',
        family: 'Neutrino',
        charge: 0,  // Neutral
        magneticFieldStrength: 0.0, // No magnetic field
    },
    [ParticleList.MUON_NEUTRINO]: {
        matterType: ParticleMatterType.NEUTRINO,
        symbol: 'νμ',
        name: 'Muon Neutrino',
        family: 'Neutrino',
        charge: 0,
        magneticFieldStrength: 0.0,
    },
    [ParticleList.TAU_NEUTRINO]: {
        matterType: ParticleMatterType.NEUTRINO,
        symbol: 'ντ',
        name: 'Tau Neutrino',
        family: 'Neutrino',
        charge: 0,
        magneticFieldStrength: 0.0,
    },
    [ParticleList.ANTI_ELECTRON_NEUTRINO]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'νₑ',
        name: 'Antineutrino',
        family: 'Antineutrino',
        charge: 0,
        magneticFieldStrength: 0.0,
    },
    [ParticleList.ANTI_MUON_NEUTRINO]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'νμ',
        name: 'Antimuon Neutrino',
        family: 'Antineutrino',
        charge: 0,
        magneticFieldStrength: 0.0,
    },
    [ParticleList.ANTI_TAU_NEUTRINO]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'ντ',
        name: 'Antitau Neutrino',
        family: 'Antineutrino',
        charge: 0,
        magneticFieldStrength: 0.0,
    },

    [ParticleList.UP]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 'u',
        name: 'up',
        family: 'Quark',
        charge: 2 / 3,
        magneticFieldStrength: 0.5, // Moderate field strength
    },
    [ParticleList.DOWN]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 'd',
        name: 'down',
        family: 'Quark',
        charge: -1 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.CHARM]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 'c',
        name: 'charm',
        family: 'Quark',
        charge: 2 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.STRANGE]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 's',
        name: 'strange',
        family: 'Quark',
        charge: -1 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.TOP]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 't',
        name: 'top',
        family: 'Quark',
        charge: 2 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.BOTTOM]: {
        matterType: ParticleMatterType.MATTER,
        symbol: 'b',
        name: 'bottom',
        family: 'Quark',
        charge: -1 / 3,
        magneticFieldStrength: 0.5,
    },

    [ParticleList.ANTIUP]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'u',
        name: 'anti up',
        family: 'Quark',
        charge: -2 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.ANTIDOWN]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'd',
        name: 'anti down',
        family: 'Quark',
        charge: 1 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.ANTICHARM]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'c',
        name: 'anti charm',
        family: 'Quark',
        charge: -2 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.ANTISTRANGE]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 's',
        name: 'anti strange',
        family: 'Quark',
        charge: 1 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.ANTITOP]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 't',
        name: 'anti top',
        family: 'Quark',
        charge: -2 / 3,
        magneticFieldStrength: 0.5,
    },
    [ParticleList.ANTIBOTTOM]: {
        matterType: ParticleMatterType.ANTIMATTER,
        symbol: 'b',
        name: 'anti bottom',
        family: 'Quark',
        charge: 1 / 3,
        magneticFieldStrength: 0.5,
    },
};

/**
 * Get particle properties by type
 */
export function getParticleProperties(type: ParticleList): ParticleProperties {
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
