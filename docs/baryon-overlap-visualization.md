# Baryon Overlap Visualization - QCD Color Confinement

## Overview

A visual feature that demonstrates QCD color confinement when quarks are tightly bound together. When the `bondDistance` between quarks is small (< 4px), a central overlap sphere appears showing the color-neutral core of the baryon.

## Feature Description

### Visual Effect

When quarks are close together, they merge into a color-neutral core represented by a sphere at the centroid of the three quarks.

**Overlap Sphere Properties:**
- **Position**: Centroid of the three quark positions
- **Size**: Dynamic - increases as quarks get closer (inversely proportional to bondDistance)
- **Opacity**: Fades in as quarks approach (max at bondDistance = 0, min at threshold)
- **Color**: Depends on quark composition (see below)
- **Blend Mode**: `multiply` - creates visual mixing with quark colors

### Baryon-Specific Colors

The overlap sphere color is automatically determined by the quark composition:

| Baryon | Composition | Overlap Color | Reason |
|--------|-------------|---------------|--------|
| **Proton** | uud | `#000000` (Black) | 2 up + 1 down → Black sphere (unique signature) |
| **Neutron** | udd | `#FFFFFF` (White) | 1 up + 2 down → White sphere (unique signature) |
| **Delta++** | uuu | `#808080` (Gray) | 3 identical quarks → Gray (default) |
| **Delta−** | ddd | `#808080` (Gray) | 3 identical quarks → Gray (default) |
| **All Others** | various | `#808080` (Gray) | Mixed compositions → Gray (default) |

### Physics Basis

**QCD Color Confinement:**
- Quarks cannot exist in isolation - they must form color-neutral combinations
- Three quarks with RGB (red-green-blue) or CMY (cyan-magenta-yellow) form color-neutral baryons
- At small distances, the strong force confines quarks into a tight, color-neutral core
- The overlap sphere represents this confined, color-neutral state

## Implementation

### Component Props

```typescript
interface UIBaryonParticleProps {
    showOverlap?: boolean;        // Enable/disable overlap effect (default: true)
    overlapThreshold?: number;     // Distance below which overlap appears (default: 4px)
    bondDistance?: number;         // Distance between quark centers (1-20px)
    // ... other props
}
```

### Usage Examples

#### Basic Overlap
```tsx
<UIBaryonParticle 
    baryonType="p+"
    bondDistance={2}
    showOverlap={true}
/>
// Shows black core (Proton)
```

#### Custom Threshold
```tsx
<UIBaryonParticle 
    baryonType="n0"
    bondDistance={5}
    showOverlap={true}
    overlapThreshold={6}
/>
// Shows white core (Neutron) when distance < 6px
```

#### Disable Overlap
```tsx
<UIBaryonParticle 
    baryonType="p+"
    bondDistance={2}
    showOverlap={false}
/>
// No overlap sphere shown
```

## Color Detection Logic

### Implementation (`getBaryonOverlapColor`)

```typescript
function getBaryonOverlapColor(quarkComposition: [string, string, string]): string {
    const sorted = [...quarkComposition].sort().join('');
    
    // Proton: uud → Black
    if (sorted === 'duu') return '#000000';
    
    // Neutron: udd → White
    if (sorted === 'ddu') return '#FFFFFF';
    
    // All other combinations → Gray
    return '#808080';
}
```

**How it works:**
1. Sorts the three quark symbols alphabetically
2. Joins into string (e.g., `['u', 'u', 'd']` → `'duu'`)
3. Matches against known patterns
4. Returns appropriate color

**Examples:**
- `['u', 'd', 'u']` → sorted: `'duu'` → **Black** (Proton)
- `['d', 'u', 'd']` → sorted: `'ddu'` → **White** (Neutron)
- `['u', 'u', 'u']` → sorted: `'uuu'` → **Gray** (Delta++)
- `['u', 's', 's']` → sorted: `'ssu'` → **Gray** (Xi0)

## Visual Behavior

### Size Calculation

```typescript
overlapSize = max(
    maxDiameter * 0.8,  // Minimum 80% of quark diameter
    maxDiameter * (1 - bondDistance / threshold)  // Grows as distance decreases
)
```

**Example with 6px quarks:**
- bondDistance = 0px → overlap = 6px (100%)
- bondDistance = 2px → overlap = 5.2px (~87%)
- bondDistance = 4px → overlap = 4.8px (80% minimum)
- bondDistance = 6px+ → no overlap (threshold exceeded)

### Opacity Calculation

```typescript
opacity = max(
    0.3,  // Minimum 30% opacity
    1 - (bondDistance / threshold)  // Full opacity at distance = 0
)
```

**Example with threshold = 5px:**
- bondDistance = 0px → opacity = 1.0 (100%)
- bondDistance = 2px → opacity = 0.6 (60%)
- bondDistance = 4px → opacity = 0.3 (30% minimum)
- bondDistance = 5px+ → no overlap

## Storybook Stories

### 1. OverlapComparison
**Static comparison** showing three baryons side-by-side with overlap spheres:
- Delta++ → Gray core
- Proton → Black core
- Neutron → White core

### 2. OverlapTransition
**Interactive demo** with all three baryons and bondDistance slider:
- Adjust bondDistance from 1-20px
- Watch overlap spheres appear/disappear
- See size and opacity changes in real-time
- Educational descriptions

### 3. Individual Tight Binding Stories
- **ProtonTightBinding** - Black core at bondDistance = 1.5px
- **NeutronTightBinding** - White core at bondDistance = 1.5px
- **DeltaTightBinding** - Gray core at bondDistance = 1.5px

### 4. NormalBaryon
Shows normal state (bondDistance = 8px) with no overlap

## Educational Value

### Physics Concepts Demonstrated

1. **QCD Color Confinement**: Quarks merge into color-neutral core
2. **Distance-Dependent Behavior**: Overlap appears only at small distances
3. **Baryon Identification**: Unique colors for proton (black) and neutron (white)
4. **Strong Nuclear Force**: Visualizes the binding that holds quarks together
5. **Ground vs Excited States**: Normal vs tight binding configurations

### Visual Learning

- **Interactive**: Students can adjust bondDistance to see confinement in action
- **Comparative**: Side-by-side view shows differences between baryon types
- **Color-Coded**: Unique colors help identify and remember particle types
- **Smooth Transitions**: Animated changes show continuous physics behavior

## Technical Details

### CSS Styling

```css
.overlapSphere {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    transform: translate(-50%, -50%);
    mix-blend-mode: multiply;
    transition: opacity 0.2s ease, width 0.2s ease, height 0.2s ease;
}
```

**Key Features:**
- `transform: translate(-50%, -50%)` - Centers on centroid
- `mix-blend-mode: multiply` - Blends with quark colors
- `transition: 0.2s ease` - Smooth size/opacity changes
- `z-index: 1` - Above bond lines, below quarks

### Positioning

**Centroid Calculation:**
```typescript
centroidX = (particle1X + particle2X + particle3X) / 3
centroidY = (particle1Y + particle2Y + particle3Y) / 3
```

For equilateral triangle with bondDistance = 6px:
- Particle 1 (top): (6, 0)
- Particle 2 (bottom-left): (0, 5.2)
- Particle 3 (bottom-right): (12, 5.2)
- **Centroid**: (6, 3.5) ✓

## Usage in Game

### Potential Applications

1. **Particle Fusion Mechanics**: Show overlap when particles collide
2. **Energy States**: Tight binding = high energy state (visual feedback)
3. **Baryon Identification**: Players learn to recognize proton (black) vs neutron (white)
4. **Puzzle Elements**: Match baryons by their overlap signatures
5. **Educational Mode**: Interactive physics demonstrations

### Game Mechanics Ideas

- **Compression Puzzle**: Squeeze baryons to specific overlap states
- **Baryon Scanner**: Identify particles by overlap color
- **Energy Absorption**: Tighter binding = more energy stored
- **Particle Sorting**: Separate protons (black) from neutrons (white)

## Future Enhancements

### Planned Features
1. **Gluon Visualization**: Replace blend mode with actual gluon particles
2. **Animated Pulses**: Overlap sphere pulses with binding energy
3. **Color Mixing**: Real-time RGB→Black or RGB→White transitions
4. **Force Field**: Show QCD color field lines converging at centroid

### Advanced Effects
1. **Quark Orbit Animation**: Quarks rotate around centroid
2. **Energy Particles**: Photons/gluons emitted from overlap region
3. **Quantum Fluctuations**: Overlap size varies randomly (uncertainty principle)
4. **Decay Visualization**: Overlap sphere breaks apart during decay

## Performance Considerations

- **Render Cost**: Minimal - just one extra div element
- **Calculation Cost**: Simple arithmetic (centroid, distance check)
- **Animation**: CSS transitions handle smoothness
- **Memory**: Negligible overhead

## Summary

✅ **Automatic overlap detection** based on bondDistance  
✅ **Unique colors** for Proton (black) and Neutron (white)  
✅ **Interactive demonstrations** in Storybook  
✅ **Smooth transitions** with CSS animations  
✅ **Educational value** - visualizes QCD confinement  
✅ **Game-ready** - can be used for mechanics and puzzles  

The overlap feature provides an intuitive, visually appealing way to demonstrate quantum chromodynamics color confinement while maintaining scientific accuracy.

