# Particle Component Architecture - Type-Safe Design

## Overview

This document describes the type-safe abstraction strategy for particle rendering components, preventing invalid particle configurations at compile time.

## Problem Statement

We need to prevent invalid particle combinations such as:
- A quark having an invalid QCD color (e.g., an up quark with cyan color - only allowed for antiquarks)
- A lepton having QCD color properties (leptons don't have color charge)
- A meson with incorrect quark-antiquark pairing
- A baryon with only 2 quarks instead of 3

## Solution: Discriminated Unions with Type Guards

### Level 1: Base Particle Types (Quantum Level)

```typescript
/**
 * Base particle type discriminator
 */
type ParticleFamily = 'Quark' | 'Lepton' | 'Neutrino';

/**
 * Quark-specific props - only available when family='Quark'
 */
interface QuarkSpecificProps {
    family: 'Quark';
    particleType: ParticleList.UP | ParticleList.DOWN | ParticleList.CHARM | 
                  ParticleList.STRANGE | ParticleList.TOP | ParticleList.BOTTOM |
                  ParticleList.ANTI_UP | ParticleList.ANTI_DOWN | 
                  ParticleList.ANTI_CHARM | ParticleList.ANTI_STRANGE | 
                  ParticleList.ANTI_TOP | ParticleList.ANTI_BOTTOM;
    /** QCD color charge - REQUIRED for quarks */
    qcdColor: QCDColorCharge;
}

/**
 * Lepton-specific props - only available when family='Lepton'
 */
interface LeptonSpecificProps {
    family: 'Lepton';
    particleType: ParticleList.ELECTRON | ParticleList.MUON | ParticleList.TAU |
                  ParticleList.POSITRON | ParticleList.ANTI_MUON | ParticleList.ANTI_TAU;
    /** QCD color NOT allowed for leptons */
    qcdColor?: never;
}

/**
 * Neutrino-specific props - only available when family='Neutrino'
 */
interface NeutrinoSpecificProps {
    family: 'Neutrino';
    particleType: ParticleList.ELECTRON_NEUTRINO | ParticleList.MUON_NEUTRINO | 
                  ParticleList.TAU_NEUTRINO | ParticleList.ANTI_ELECTRON_NEUTRINO |
                  ParticleList.ANTI_MUON_NEUTRINO | ParticleList.ANTI_TAU_NEUTRINO;
    qcdColor?: never;
}

/**
 * Discriminated union - TypeScript ensures only valid combinations
 */
type UIParticleProps = QuarkSpecificProps | LeptonSpecificProps | NeutrinoSpecificProps;
```

### Level 2: Composite Particles (Hadron Level)

#### Meson Component (2 quarks/antiquarks)

```typescript
/**
 * Meson composition - enforces quark-antiquark pairing
 */
interface UIMesonProps {
    /** First quark (matter) */
    quark1: {
        particleType: ParticleList.UP | ParticleList.DOWN | ParticleList.CHARM | 
                     ParticleList.STRANGE | ParticleList.TOP | ParticleList.BOTTOM;
        qcdColor: QCDColorCharge.RED | QCDColorCharge.GREEN | QCDColorCharge.BLUE;
    };
    
    /** Second quark (antimatter) - must be antiquark */
    quark2: {
        particleType: ParticleList.ANTI_UP | ParticleList.ANTI_DOWN | 
                     ParticleList.ANTI_CHARM | ParticleList.ANTI_STRANGE | 
                     ParticleList.ANTI_TOP | ParticleList.ANTI_BOTTOM;
        qcdColor: QCDColorCharge.CYAN | QCDColorCharge.MAGENTA | QCDColorCharge.YELLOW;
    };
    
    /** Rendering configuration */
    bondDistance?: number;
    showBond?: boolean;
}
```

#### Baryon Component (3 quarks)

```typescript
/**
 * Baryon composition - enforces 3-quark structure with color neutrality
 */
interface UIBaryonProps {
    /** All three quarks must be matter or all antimatter */
    matterType: ParticleMatterType;
    
    /** Three quarks - enforces RGB color combination for matter */
    quarks: matterType extends ParticleMatterType.MATTER 
        ? [
            { particleType: QuarkType; qcdColor: QCDColorCharge.RED },
            { particleType: QuarkType; qcdColor: QCDColorCharge.GREEN },
            { particleType: QuarkType; qcdColor: QCDColorCharge.BLUE }
          ]
        : [
            { particleType: AntiQuarkType; qcdColor: QCDColorCharge.CYAN },
            { particleType: AntiQuarkType; qcdColor: QCDColorCharge.MAGENTA },
            { particleType: AntiQuarkType; qcdColor: QCDColorCharge.YELLOW }
          ];
    
    /** Rendering configuration */
    arrangement?: 'triangle' | 'linear';
    bondDistance?: number;
}
```

### Level 3: Atomic Structure (Nucleon Level)

```typescript
/**
 * Nucleus component - combines protons and neutrons
 */
interface UINucleusProps {
    /** Number of protons (defines element) */
    protonCount: number;
    
    /** Number of neutrons (defines isotope) */
    neutronCount: number;
    
    /** Layout arrangement */
    arrangement?: 'shell' | 'cluster' | 'random';
}

/**
 * Atom component - nucleus + electron cloud
 */
interface UIAtomProps {
    /** Element from periodic table */
    element: PeriodicElement;
    
    /** Ionization state (number of missing/extra electrons) */
    ionizationState?: number;
    
    /** Show electron shells */
    showElectronShells?: boolean;
}
```

## Implementation Strategy

### Type Guard Functions

```typescript
/**
 * Type guard: Is this particle a quark?
 */
function isQuarkParticle(particleType: ParticleList): boolean {
    return particleType in [
        ParticleList.UP, ParticleList.DOWN, ParticleList.CHARM,
        ParticleList.STRANGE, ParticleList.TOP, ParticleList.BOTTOM,
        ParticleList.ANTI_UP, ParticleList.ANTI_DOWN, ParticleList.ANTI_CHARM,
        ParticleList.ANTI_STRANGE, ParticleList.ANTI_TOP, ParticleList.ANTI_BOTTOM
    ];
}

/**
 * Type guard: Is QCD color valid for this quark?
 */
function isValidQCDColorForQuark(
    particleType: ParticleList, 
    qcdColor: QCDColorCharge
): boolean {
    const particleData = getParticlePropertiesByType(particleType);
    
    // Matter quarks can only have RGB
    if (particleData.matterType === ParticleMatterType.MATTER) {
        return [QCDColorCharge.RED, QCDColorCharge.GREEN, QCDColorCharge.BLUE]
            .includes(qcdColor);
    }
    
    // Antimatter quarks can only have CMY (anticolors)
    if (particleData.matterType === ParticleMatterType.ANTIMATTER) {
        return [QCDColorCharge.CYAN, QCDColorCharge.MAGENTA, QCDColorCharge.YELLOW]
            .includes(qcdColor);
    }
    
    return false;
}

/**
 * Type guard: Is baryon color-neutral?
 */
function isBaryonColorNeutral(
    quark1: QCDColorCharge,
    quark2: QCDColorCharge,
    quark3: QCDColorCharge
): boolean {
    const colors = [quark1, quark2, quark3].sort();
    
    // Matter baryons: must have R + G + B
    const matterNeutral = 
        colors[0] === QCDColorCharge.RED &&
        colors[1] === QCDColorCharge.GREEN &&
        colors[2] === QCDColorCharge.BLUE;
    
    // Antimatter baryons: must have C + M + Y
    const antimatterNeutral =
        colors[0] === QCDColorCharge.CYAN &&
        colors[1] === QCDColorCharge.MAGENTA &&
        colors[2] === QCDColorCharge.YELLOW;
    
    return matterNeutral || antimatterNeutral;
}

/**
 * Type guard: Is meson color-neutral?
 */
function isMesonColorNeutral(
    quark: QCDColorCharge,
    antiquark: QCDColorCharge
): boolean {
    // Meson must be color + anticolor pair
    const validPairs: [QCDColorCharge, QCDColorCharge][] = [
        [QCDColorCharge.RED, QCDColorCharge.CYAN],
        [QCDColorCharge.GREEN, QCDColorCharge.MAGENTA],
        [QCDColorCharge.BLUE, QCDColorCharge.YELLOW],
    ];
    
    return validPairs.some(([c1, c2]) => 
        (quark === c1 && antiquark === c2) || 
        (quark === c2 && antiquark === c1)
    );
}
```

### Smart Constructor Functions

```typescript
/**
 * Create a type-safe meson from data
 * Automatically assigns valid QCD colors
 */
function createMeson(mesonData: MesonData): UIMesonProps {
    const [quark1Symbol, quark2Symbol] = mesonData.properties.quarkComposition;
    
    const quark1Type = mapQuarkToParticleList(quark1Symbol);
    const quark2Type = mapQuarkToParticleList(quark2Symbol);
    
    // Auto-assign valid color pair
    const colorPairs: [QCDColorCharge, QCDColorCharge][] = [
        [QCDColorCharge.RED, QCDColorCharge.CYAN],
        [QCDColorCharge.GREEN, QCDColorCharge.MAGENTA],
        [QCDColorCharge.BLUE, QCDColorCharge.YELLOW],
    ];
    
    const [color1, color2] = colorPairs[Math.floor(Math.random() * colorPairs.length)];
    
    return {
        quark1: { particleType: quark1Type, qcdColor: color1 },
        quark2: { particleType: quark2Type, qcdColor: color2 },
        bondDistance: mesonData.render.bondDistance,
        showBond: mesonData.render.showBond
    };
}

/**
 * Create a type-safe baryon from data
 * Automatically assigns RGB or CMY colors
 */
function createBaryon(baryonData: BaryonData): UIBaryonProps {
    const [q1, q2, q3] = baryonData.properties.quarkComposition;
    
    const quark1Type = mapBaryonQuarkToParticleList(q1);
    const quark2Type = mapBaryonQuarkToParticleList(q2);
    const quark3Type = mapBaryonQuarkToParticleList(q3);
    
    const matterType = baryonData.properties.matterType;
    
    // Auto-assign color-neutral combination
    const colors = matterType === ParticleMatterType.MATTER
        ? [QCDColorCharge.RED, QCDColorCharge.GREEN, QCDColorCharge.BLUE]
        : [QCDColorCharge.CYAN, QCDColorCharge.MAGENTA, QCDColorCharge.YELLOW];
    
    return {
        matterType,
        quarks: [
            { particleType: quark1Type, qcdColor: colors[0] },
            { particleType: quark2Type, qcdColor: colors[1] },
            { particleType: quark3Type, qcdColor: colors[2] }
        ],
        arrangement: baryonData.render.arrangement,
        bondDistance: baryonData.render.bondDistance
    };
}
```

## Component Hierarchy

```
UIParticle (Quantum Level)
├── Quarks (with mandatory qcdColor)
├── Leptons (qcdColor not allowed)
└── Neutrinos (qcdColor not allowed)

UIMeson (Hadron Level)
├── Uses 2x UIParticle (quark + antiquark)
└── Enforces color-neutral pairing

UIBaryon (Hadron Level)
├── Uses 3x UIParticle (three quarks)
└── Enforces RGB/CMY color neutrality

UINucleus (Nuclear Level)
├── Uses Nx UIBaryon (protons + neutrons)
└── Manages nuclear binding

UIAtom (Atomic Level)
├── Uses 1x UINucleus
├── Uses Nx UIParticle (electrons)
└── Manages electron shells
```

## Usage Examples

### ✅ Valid Usage

```typescript
// Valid: Quark with proper QCD color
<UIParticle 
    family="Quark"
    particleType={ParticleList.UP}
    qcdColor={QCDColorCharge.RED}
/>

// Valid: Lepton without QCD color
<UIParticle 
    family="Lepton"
    particleType={ParticleList.ELECTRON}
/>

// Valid: Color-neutral meson
<UIMeson 
    quark1={{ particleType: ParticleList.UP, qcdColor: QCDColorCharge.RED }}
    quark2={{ particleType: ParticleList.ANTI_DOWN, qcdColor: QCDColorCharge.CYAN }}
/>

// Valid: Color-neutral baryon
<UIBaryon 
    matterType={ParticleMatterType.MATTER}
    quarks={[
        { particleType: ParticleList.UP, qcdColor: QCDColorCharge.RED },
        { particleType: ParticleList.UP, qcdColor: QCDColorCharge.GREEN },
        { particleType: ParticleList.DOWN, qcdColor: QCDColorCharge.BLUE }
    ]}
/>
```

### ❌ Invalid Usage (Prevented by TypeScript)

```typescript
// ERROR: Lepton cannot have qcdColor
<UIParticle 
    family="Lepton"
    particleType={ParticleList.ELECTRON}
    qcdColor={QCDColorCharge.RED}  // ❌ Type error
/>

// ERROR: Matter quark cannot have anticolor
<UIParticle 
    family="Quark"
    particleType={ParticleList.UP}
    qcdColor={QCDColorCharge.CYAN}  // ❌ Type error
/>

// ERROR: Meson cannot have two matter quarks
<UIMeson 
    quark1={{ particleType: ParticleList.UP, qcdColor: QCDColorCharge.RED }}
    quark2={{ particleType: ParticleList.DOWN, qcdColor: QCDColorCharge.GREEN }}  // ❌ Type error
/>

// ERROR: Baryon colors not RGB/CMY
<UIBaryon 
    matterType={ParticleMatterType.MATTER}
    quarks={[
        { particleType: ParticleList.UP, qcdColor: QCDColorCharge.RED },
        { particleType: ParticleList.UP, qcdColor: QCDColorCharge.RED },  // ❌ Type error (duplicate)
        { particleType: ParticleList.DOWN, qcdColor: QCDColorCharge.BLUE }
    ]}
/>
```

## Benefits

1. **Compile-time Safety**: Invalid particle combinations are caught during development, not at runtime
2. **Self-documenting Code**: Types clearly express physics constraints
3. **Better IDE Support**: Auto-completion only shows valid options
4. **Refactoring Safety**: Changes to particle types are checked across entire codebase
5. **Prevents Physics Violations**: Ensures color neutrality and valid quark combinations

## Future Extensions

- Add validation for **spin states** (fermions vs bosons)
- Add validation for **charge conservation** in particle reactions
- Add validation for **baryon/lepton number conservation**
- Add validation for **strangeness, charm, beauty quantum numbers**

## Implementation Checklist

- [ ] Update `UIParticle.tsx` with discriminated union types
- [ ] Create `UIMeson.tsx` component with color-neutral constraints
- [ ] Create `UIBaryon.tsx` component with RGB/CMY constraints
- [ ] Add type guard functions to `particle-quantum.data.ts`
- [ ] Add smart constructor functions for mesons and baryons
- [ ] Update Storybook stories with type-safe examples
- [ ] Add unit tests for type guards
- [ ] Update documentation with migration guide

