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


# UI Identifiers v0.1

This section maps all UI elements into **normalized identifiers**.  
Follow same conventions:  
- **PascalCase** → React components, enums, types  
- **camelCase** → variables, props  
- **UPPER_SNAKE_CASE** → constants  

---

## Core HUD

| Term | Code Identifier | Notes |
|------|-----------------|-------|
| HUD | `HUD` | Main in-game interface wrapper |
| debugHUD | `DebugHUD` | Developer-only overlay, toggleable via env flag |
| Playground (UI surface) | `UIPlaygroundSurface` | The visible boundary of the simulation; background + blur |
| Background | `UIBackground` | Radial gradient background |
| Surface (Big Card surface) | `UISurface` | Display area inside Big Card |
| Wallet (UI) | `UIWallet` | Displays current eV with scientific notation |
| Ruler | `UIRuler` | Measurement line & scale indicator |
| Button | `UIButton` | Standard button component, supports states |

### Button States (enum)

```ts
enum ButtonState {
  ENABLED,
  DISABLED,
  HOVER,
  FOCUSED,
  PRESSED,
  PROGRESS,
  DONE,
}
```

### Cards 
| Term | Code Identifier | Notes |
|------|-----------------|-------|
| Small Card | UICardSmall | Minimal particle representation (symbol only) |
| Mid Card | UICardMid | Particle details: name, symbol, eV, charge, mass |
| Big Card | UICardBig | Full-screen particle detail view |

### Pagination
| Term | Code Identifier | Notes |
|------|-----------------|-------|
| Tab | UITab | Active/Inactive/Disabled/Blank |
| Big Pagination | UIPaginationBig | 4px rectangles, bottom-center |
| Mini Paginator | UIPaginationMini | 4px squares, horizontal only |
| Slider Paginator | UISliderPaginator | Hybrid: Small Card as active, Mini Paginator as rest |

```ts
enum PaginationState {
  ACTIVE,
  INACTIVE,
  DISABLED,
  ERROR,
}
```

### Tables
| Term | Code Identifier | Notes |
|------|-----------------|-------|
| Mini Table | UITableMini | Grid-like, bottom of Big Card |
| Mid Table | UITableMid | Table view of Mid Cards |
| Big Table | UITableBig | Table view of Big Cards |


### Other
| Term | Code Identifier | Notes |
|------|-----------------|-------|
| Inventory | UiInventory | Row of 12 Small Cards, top of screen |
| Upgrade | UiUpgrade | Minimalist icon buttons |

Loading & Shadows
	•	All UI elements support a loading skeleton state:
	•	Identifier: UiSkeleton
	•	Rendered as rectangle #darkgray with matching element dimensions

# Style Guidelines v0.1

This section defines **visual theming rules** for the project.  
All UI elements must adhere to these rules unless explicitly overridden.  
 •	Never introduce a new color/size/font without adding it to this section.
 •	Always implement skeleton states first when designing a new component.
 •	Skeleton's are required for every UI component.
 •	DebugHUD anchored in absolute coords, floats above HUD, hidden in production.

---

## Lines

- Stroke width: **1px solid**  
- Corner style: **sharp only** (no rounded corners)  

---

## Colors

| Role | Name | HEX | Usage |
|------|------|-----|-------|
| Primary | `COLOR_PRIMARY` | `#F8E71C` (`#yolk`) | Depth, mystery, currency highlights (eV, Wallet). Max 10% usage. |
| Secondary | `COLOR_SECONDARY` | `#4C00FF` (`#ultraviolet`) | Interactive elements, `<a>` links, antiparticles. Rare (≤1%). |
| White | `COLOR_WHITE` | `#FFFFFF` (`#white`) | Text, outlines, contrast highlights. |
| Light Gray | `COLOR_LIGHT_GRAY` | `#C0C0C0` (`#lightgray`) | Neutral elements, subtle surfaces. |
| Gray | `COLOR_GRAY` | `#666666` (`#gray`) | Input field labels, inactive state. |
| Dark Gray | `COLOR_DARK_GRAY` | `#232323` (`#darkgray`) | Surfaces, disabled state, skeletons. |
| Black | `COLOR_BLACK` | `#000000` (`#black`) | Main background, Playground void. |

## Code Constants (TS/JS)

```ts
export const COLOR_PRIMARY = "#F8E71C"; // #yolk
export const COLOR_SECONDARY = "#4C00FF"; // #ultraviolet
export const COLOR_WHITE = "#FFFFFF"; // #white
export const COLOR_LIGHT_GRAY = "#C0C0C0"; // #lightgray
export const COLOR_GRAY = "#666666"; // #gray
export const COLOR_DARK_GRAY = "#232323"; // #darkgray
export const COLOR_BLACK = "#000000"; // #black

export const FONT_TITLE = "Urbanist, sans-serif";
export const FONT_BODY = "Roundabout-Regular, Sulphur Point, sans-serif"; // custom TTF https://www.dropbox.com/scl/fi/grhm72jqfa7osv20rxgij/Roundabout-Regular.ttf?rlkey=88bt7wklvhwqxiofjaolf9orv&dl=0
export const FONT_DIGIT = "4pixel, monospace"; // custom TTF https://www.dropbox.com/scl/fi/pb6mk4gkehf2svayhdmnt/4pixel.ttf?rlkey=grhyi2hmknacs61yr3pccksk2&dl=0
export const FONT_CODE = "'Courier New', monospace";

```

---

## Typography

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Title `<h1>` | Roundabout-Regular | 16px | Regular | Section headers |
| Body `<p>, <a>` | Roundabout-Regular | 16px | Regular | Main text |
| Numeric `<p>, <a>` | Roundabout-Regular | 16px | Regular | Main text |
| Digits (numeric values) | 4pixel | 4px | Regular | Smallest legible pixel font (custom .ttf provided) |
| Code/Debug | Courier New | 16px | Bold | Debug HUD, console output |

---

## Sizes & Shapes

- **Dot** → `1px` square (pixel element)  
- **Circle Small** → `4px` filled circle  
- **Circle Medium** → `6px` filled circle with **radial gradient** (sphere reflection)  
- **Circle Large** → `61px` filled circle with **radial gradient** (sphere reflection)  
  - No shadow in Playground  
  - Drop shadow only when inside Big Card  
- **Mini Card** → `31px` outlined square  
- **Paginator (Mini)** → `4px` outlined square, gap **16px**  
- **Paginator (Big)** → `4px x 17px` outlined rectangle, gap **6px**  
- **Mid Card** → `83px x 109px` outlined rectangle  
- **Tab** → `109px x 23px` outlined rectangle  

Note the elements size sued as a prime numbers withg golden urle aspect ratio to eachother, nd other reasons maybe.

---

## Playground Theming

- Background = `#000000` (`#black`)
- White blur (16px) around bottom half of Playground circle (not top half) it also dunamically moves depending on User cursor, or tilted phone position .
- Gradient for **Background**: radial, from `#232323` (`#darkgray`) → `#000000` (`#black`), center aligned to **top-left corner**  

---

## Skeleton / Loading State

- All UI elements have a **shadow loading variant**:  
  - Shape: matching element bounds  
  - Color: `#232323` (`#darkgray`)  
  - Animation: static (no shimmer by default)  

---

## Developer Feature: Generative Art Testing

- The **Playground surface** must support toggling a **“third-party library overlay mode”** for experiments (e.g. Three.js, Processing, generative shaders).  
- Rule: these overlays **must render behind the HUD/UI layer**, and **must not affect collisions or gameplay state**.  
- Use toggle flag: `PLAYGROUND_DEBUG_ART_MODE = true`.  

---
