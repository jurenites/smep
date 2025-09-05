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
| Small Card | UICardSmall | Minimal particle representation (symbol only), supports state enum |
| Mid Card | UICardMid | Particle details: name, symbol, eV, charge, mass |
| Big Card | UICardBig | Full-screen particle detail view |

### Pagination
| Term | Code Identifier | Notes |
|------|-----------------|-------|
| Tab | UITab | Active/Inactive/Disabled/Blank |
| Big Pagination | UIPaginationBig | 4px by 17px rectangles, bottom-center |
| Mini Paginator | UIPaginationMini | 4px squares, horizontal only, supports state and clickable properties, activeIndex optional (defaults to 1) |
| Small Square | UISquareSmall | Individual 4x4 square component with unified state enum (ACTIVE, INACTIVE, DISABLED, ERROR, LOCKED) |
| Pagination Container | UIPaginationContainer | Higher-level component with event system integration |
| Pagination Service | paginationService | Centralized pagination state and event management |
| Pagination Hook | usePagination | React hook for easy pagination integration |
| Slider Paginator | UISliderPaginator | Hybrid: Small Card as active, Mini Paginator as rest |

```ts
enum PaginationState {
  ACTIVE,
  INACTIVE,
  DISABLED,
  ERROR,
  UNAVAILABLE, // Pages that are not yet available
  LOCKED,      // Pages that are locked/restricted
}

enum UICardState {
  NORMAL,    // Default state
  LOADING,   // Loading/skeleton state
  SELECTED,  // Selected/highlighted state
}

enum UISquareState {
  ACTIVE,    // Active and clickable
  INACTIVE,  // Inactive but clickable
  DISABLED,  // Disabled and not clickable
  ERROR,     // Error state, not clickable
  LOCKED,    // Locked, not clickable
}
```

### Pagination System Architecture

The pagination system provides a higher-level abstraction for managing page navigation with event-driven architecture:

#### Components
- **UIPaginationContainer**: High-level component that integrates with the pagination service
- **UIPaginationMini**: Low-level UI component for rendering pagination squares
- **UISquareSmall**: Individual 4x4 square component with unified state enum (ACTIVE, INACTIVE, DISABLED, ERROR, LOCKED)

#### Services & Hooks
- **paginationService**: Centralized service managing pagination contexts and events
- **usePagination**: React hook for easy integration with pagination functionality

#### Event System
- **PAGE_CHANGED**: Fired when user navigates to a different page
- **PAGE_LOADED**: Fired when a page content is loaded
- **PAGINATION_READY**: Fired when pagination system is initialized

#### State System
- **ACTIVE**: Page is available and clickable
- **INACTIVE**: Page is available but not currently selected
- **DISABLED**: Page is temporarily disabled
- **ERROR**: Page is in error state
- **UNAVAILABLE**: Page is not yet available (locked by progression)
- **LOCKED**: Page is locked/restricted (requires unlock condition)

#### Usage Example
```tsx
// Using the container component
<UIPaginationContainer
    contextId="my-pagination"
    pages={[
        { id: 'page-1', title: 'Quantum', state: PaginationState.ACTIVE },
        { id: 'page-2', title: 'Nuclear', state: PaginationState.ACTIVE },
        { id: 'page-3', title: 'Atomic', state: PaginationState.UNAVAILABLE },
    ]}
    onPageChange={(pageIndex, event) => {
        console.log('Page changed to:', pageIndex);
        // Handle page change logic
    }}
/>

// Using the hook
const {
    currentPageIndex,
    changePage,
    goToNextPage,
    goToPreviousPage
} = usePagination({
    contextId: 'my-pagination',
    pages: [...],
    onPageChange: (pageIndex, event) => {
        // Handle page change
    }
});
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
// Colors
export const COLOR_PRIMARY = "#F8E71C"; // #yolk
export const COLOR_SECONDARY = "#4C00FF"; // #ultraviolet
export const COLOR_WHITE = "#FFFFFF"; // #white
export const COLOR_LIGHT_GRAY = "#C0C0C0"; // #lightgray
export const COLOR_GRAY = "#666666"; // #gray
export const COLOR_DARK_GRAY = "#232323"; // #darkgray
export const COLOR_BLACK = "#000000"; // #black

// Typography
export const TYPOGRAPHY = {
    title: {
        fontFamily: "Roundabout-Regular, Urbanist, sans-serif",
        fontSize: 16,
    },
    body: {
        fontFamily: "Roundabout-Regular, Sulphur Point, sans-serif",
        fontSize: 16,
    },
    digitBig: {
        fontFamily: "4pixel, monospace",
        fontSize: 10,
    },
    digitSmall: {
        fontFamily: "4pixel, monospace",
        fontSize: 5,
    },
    code: {
        fontFamily: "'Courier New', monospace",
        fontSize: 12,
    },
};


```

---

## Typography

### Typography

| Token | Font Stack | Size | Usage |
|-------|------------|------|-------|
| `typography.title` | `Roundabout-Regular, Urbanist, sans-serif` | 16px | Titles, headers, and prominent text elements |
| `typography.body` | `Roundabout-Regular, Sulphur Point, sans-serif` | 16px | Body text, general content, and UI elements |
| `typography.digitBig` | `4pixel, monospace` | 10px | Large numeric values and measurements |
| `typography.digitSmall` | `4pixel, monospace` | 5px | Small numeric values, pixel-perfect text |
| `typography.code` | `'Courier New', monospace` | 12px | Code, debug information, and technical content |

### Usage Guidelines

- **Titles & Headers**: Use `typography.title` for section headers and prominent text
- **Body Text**: Use `typography.body` for general content
- **Numeric Values**: Use `typography.digitSmall` for small values or `typography.digitBig` for larger values
- **Code & Debug**: Use `typography.code` for technical content
- **Consistency**: Always use the predefined tokens rather than hardcoded values

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

## SVG Guidelines

### ViewBox Requirements

All SVG elements **must** include a `viewBox` attribute to maintain proper aspect ratios and prevent distortion during screen recording or display scaling:

```tsx
<svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet"
>
    {/* SVG content */}
</svg>
```

### Implementation Rules

- **Always include `viewBox`**: Every SVG element must have a `viewBox` attribute matching its width and height
- **Use `preserveAspectRatio="xMidYMid meet"`**: This ensures the SVG scales proportionally and centers content
- **Maintain pixel-perfect rendering**: Critical for 4px squares and other small elements
- **Prevent distortion**: Essential for screen recording and high-DPI displays

### Affected Components

- `UIPaginationMini` - 4px squares must maintain perfect 1:1 aspect ratio
- `UIRuler` - Measurement lines and tick marks
- `UICardSmall` - Card outlines and text positioning
- `UIPlaygroundSurface` - Background circles and blur effects

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
