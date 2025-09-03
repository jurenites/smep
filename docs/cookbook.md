# Project Cookbook v0.1

This document maps glossary terms to **canonical code identifiers**.  
Use these consistently across engine, UI, and docs.  

---

## Naming Conventions

- **PascalCase** → Classes, Enums, Types  
- **camelCase** → variables, object keys  
- **UPPER_SNAKE_CASE** → constants  
- Prefix `Entity`, `System`, `Component` where relevant.  
- All terms from glossary are **singular** (never plural in enums).  

---

## Core Gameplay

| Glossary Term | Code Identifier | Notes |
|---------------|----------------|-------|
| Playground | `EntityPlayground` | Main scene entity |
| Level | `GameLevel` (enum) | e.g. `Quantum`, `Nuclear`, `Atomic`, `Molecular`, `Astronomical` |
| Wallet | `PlayerWallet` | Holds `currencyEv` (number) |
| Epoch | `Epoch` | Time stage; consider `EpochSystem` |
| Singularity | `EntitySingularity` | Special world origin entity |

---

## Particles & Groups

| Glossary Term | Code Identifier | Notes |
|---------------|----------------|-------|
| Particle | `Particle` | Base class / interface |
| Antiparticle | `Antiparticle` | Inherits from `Particle` |
| Lepton | `ParticleType.LEPTON` | Enum member |
| Boson | `ParticleType.BOSON` | Enum member |
| Quark | `ParticleType.QUARK` | Enum member |
| Hadron | `ParticleType.HADRON` | Enum member |
| Meson | `ParticleType.MESON` | Enum member (subtype of Hadron) |
| Baryon | `ParticleType.BARYON` | Enum member (subtype of Hadron) |
| Virtual Particle | `ParticleType.VIRTUAL` | Enum member, short-lived |
| Quanta | `QUANTA_UNIT` | Constant representing indivisible unit |

**Enum Example:**

```ts
enum ParticleType {
  QUARK,
  LEPTON,
  BOSON,
  HADRON,
  MESON,
  BARYON,
  VIRTUAL,
}
```

## Fields & Forces

| Fields & Forces | Code Identifier | Notes |
|---------------|----------------|-------|
| Field| ForceField | Base class |
| Strong Nuclear | ForceType.STRONG | Enum |
| Weak Nuclear |ForceType.WEAK | Enum |
| Electromagnetic | ForceType.ELECTROMAGNETIC | Enum |
| Gravitational | ForceType.GRAVITY | Enum |

**Enum Example:**

```ts
enum ForceType {
  STRONG,
  WEAK,
  ELECTROMAGNETIC,
  GRAVITY,
}
```

## Matter & Structures

| Glossary Term | Code Identifier | Notes |
|---------------|----------------|-------|
| Nucleus | EntityNucleus | Atomic core entity |
| Atom | EntityAtom | Nucleus + electrons |
| Molecule | EntityMolecule | Atom + atoms bound + Atom |
