/**
 * Upgrade Data - Research upgrades for game progression
 * 
 * This file contains all upgrade definitions including research costs,
 * time requirements, and effects on gameplay.
 */

/**
 * Upgrade identifier enum
 */
export enum UpgradeId {
    PARITY = 1,
    ANTIPARTICLES = 2,
    SPECIAL_RELATIVITY = 3,
    EVENT_HORIZON = 4,
    EUCLIDEAN_TIME = 5,
    POINT_ZERO_VOLUME = 6,
    HARD_XRAYS = 7,
    CREATIO_EX_NIHILO = 8,
    BINDING_ENERGY = 9,
    FUSION = 10,
    CRYSTAL_NET = 11,
    FLAT_SPACETIME = 12,
    CAUSALITY = 13,
    MASS_DEFECT = 14,
}

/**
 * Upgrade data interface
 */
export interface UpgradeData {
    /** Unique identifier (Primary Key) */
    id: number;
    /** Upgrade name */
    name: string;
    /** Description of the upgrade effect */
    description: string;
    /** Cost in electron volts (supports decimals for pico eV) */
    costInEv: number;
    /** Research time in seconds */
    researchTimeSeconds: number;
    /** Gaining per second after researched (for calculation) */
    gainingPerSecond: number;
}

/**
 * Initial upgrade definitions
 */
export const UPGRADE_DATA: readonly UpgradeData[] = [
    {
        id: UpgradeId.PARITY,
        name: "parity",
        description: "conservation of parity in particle interactions",
        costInEv: 0.000001, // 1 pico eV
        researchTimeSeconds: 5,
        gainingPerSecond: 0.0000001,
    },
    {
        id: UpgradeId.ANTIPARTICLES,
        name: "antiparticles",
        description: "reveal access to antimatter particles",
        costInEv: 0.00001, // 10 pico eV
        researchTimeSeconds: 10,
        gainingPerSecond: 0.000001,
    },
    {
        id: UpgradeId.SPECIAL_RELATIVITY,
        name: "special relativity",
        description: "time dilation at high velocities",
        costInEv: 0.0001,
        researchTimeSeconds: 15,
        gainingPerSecond: 0.00001,
    },
    {
        id: UpgradeId.EVENT_HORIZON,
        name: "event horizon",
        description: "boundary beyond which nothing escapes",
        costInEv: 0.001,
        researchTimeSeconds: 20,
        gainingPerSecond: 0.0001,
    },
    {
        id: UpgradeId.EUCLIDEAN_TIME,
        name: "euclidean time",
        description: "imaginary time in quantum mechanics",
        costInEv: 0.01,
        researchTimeSeconds: 25,
        gainingPerSecond: 0.001,
    },
    {
        id: UpgradeId.POINT_ZERO_VOLUME,
        name: "point of zero volume",
        description: "singularity at the beginning of space-time",
        costInEv: 0.1,
        researchTimeSeconds: 30,
        gainingPerSecond: 0.01,
    },
    {
        id: UpgradeId.HARD_XRAYS,
        name: "hard x-rays",
        description: "high-energy electromagnetic radiation",
        costInEv: 1,
        researchTimeSeconds: 35,
        gainingPerSecond: 0.1,
    },
    {
        id: UpgradeId.CREATIO_EX_NIHILO,
        name: "creatio ex nihilo",
        description: "creation out of nothing",
        costInEv: 10,
        researchTimeSeconds: 40,
        gainingPerSecond: 1,
    },
    {
        id: UpgradeId.BINDING_ENERGY,
        name: "binding energy",
        description: "energy required to disassemble a nucleus",
        costInEv: 100,
        researchTimeSeconds: 45,
        gainingPerSecond: 10,
    },
    {
        id: UpgradeId.FUSION,
        name: "fusion",
        description: "combining light nuclei into heavier ones",
        costInEv: 1000,
        researchTimeSeconds: 50,
        gainingPerSecond: 100,
    },
    {
        id: UpgradeId.CRYSTAL_NET,
        name: "crystal net",
        description: "lattice structure of solid matter",
        costInEv: 10000,
        researchTimeSeconds: 55,
        gainingPerSecond: 1000,
    },
    {
        id: UpgradeId.FLAT_SPACETIME,
        name: "flat spacetime",
        description: "euclidean geometry without curvature",
        costInEv: 100000,
        researchTimeSeconds: 60,
        gainingPerSecond: 10000,
    },
    {
        id: UpgradeId.CAUSALITY,
        name: "causality",
        description: "cause precedes effect in time",
        costInEv: 1000000,
        researchTimeSeconds: 65,
        gainingPerSecond: 100000,
    },
    {
        id: UpgradeId.MASS_DEFECT,
        name: "mass defect",
        description: "difference between mass of nucleus and sum of parts",
        costInEv: 10000000,
        researchTimeSeconds: 70,
        gainingPerSecond: 1000000,
    },
] as const;

/**
 * Helper function to get upgrade data by ID
 */
export function getUpgradeById(id: number): UpgradeData | undefined {
    return UPGRADE_DATA.find(upgrade => upgrade.id === id);
}

/**
 * Helper function to get upgrade data by UpgradeId enum
 */
export function getUpgrade(upgradeId: UpgradeId): UpgradeData | undefined {
    return getUpgradeById(upgradeId);
}

