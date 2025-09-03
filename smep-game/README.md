# SMEP - Scientific Matter Evolution Playground

A web-based idle game that simulates particle physics and matter evolution from quantum scales to astronomical objects.

## 🎮 Game Concept

SMEP is an idle game where players explore the universe at different scales, from quantum particles to galaxies. The game features:

- **Particle Simulation**: Real-time physics simulation of particles, atoms, and molecules
- **Scale Progression**: Zoom from quantum to astronomical scales
- **Idle Mechanics**: Earn energy (eV) over time to create new matter
- **Scientific Accuracy**: Based on real particle physics and cosmology

## 🏗️ Architecture

The project follows a layered architecture as specified in the cookbook:

### 1. Simulation Layer (GPU)
- **WebGPU** with **WebGL2** fallback
- Particle state buffers and physics kernels
- Fixed render loop (60fps)

### 2. Rendering Primitives (SVG/Canvas)
- Pure presentational components
- No business logic
- Examples: `UiCardSmall`, `UiPaginationMini`, `UiRuler`

### 3. Orchestration Layer (React 19)
- Screens, routing, transitions
- Coordinates props → primitives
- Uses React Transitions for smooth screen swaps

### 4. Debug/Utility Layer (shadcn/ui)
- Debug HUD, dev toggles, settings
- Never used for in-game HUD

## 🎨 Design System

### Colors
- **Primary**: `#F8E71C` (yolk) - Currency highlights
- **Secondary**: `#4C00FF` (ultraviolet) - Interactive elements
- **White**: `#FFFFFF` - Text, outlines
- **Light Gray**: `#C0C0C0` - Neutral elements
- **Gray**: `#666666` - Input labels
- **Dark Gray**: `#232323` - Surfaces, skeletons
- **Black**: `#000000` - Background

### Typography
- **Title**: Roundabout-Regular (16px)
- **Body**: Roundabout-Regular (16px)
- **Digits**: 4pixel (4px) - Custom pixel font
- **Code**: Courier New (16px)

### Sizes
- **Dot**: 1px square
- **Circle Small**: 4px filled circle
- **Circle Medium**: 6px with radial gradient
- **Circle Large**: 61px with radial gradient
- **Mini Card**: 31px outlined square
- **Mid Card**: 83px × 109px outlined rectangle

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd smep-game

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook for UI components

## 🎯 Gameplay

### Core Mechanics
1. **Energy Generation**: Earn eV (electron volts) over time
2. **Particle Creation**: Click in the playground to create particles
3. **Scale Progression**: Unlock new levels by earning energy
4. **Matter Evolution**: Particles combine to form atoms and molecules

### Controls
- **Click**: Create particles at cursor position
- **Hover**: Interact with UI elements
- **Scroll**: Zoom in/out (future feature)

## 🧪 Development

### Project Structure
```
src/
├── engine/           # GPU simulation layer
├── lib/             # Game logic and state
├── ui/
│   ├── primitives/  # SVG/Canvas components
│   ├── screens/     # React screens
│   ├── tokens/      # Design tokens
│   └── debug/       # Debug components
└── storybook/       # Component stories
```

### Adding New Components
1. Create component in `src/ui/primitives/`
2. Add Storybook story in `src/storybook/`
3. Use design tokens from `src/ui/tokens/tokens.ts`
4. Follow naming conventions from cookbook

### State Management
- **Zustand** for game state
- **React 19** for UI state
- **GPU buffers** for particle data

## 🎨 UI Components

### Primitives
- `UiCardSmall` - Minimal particle representation
- `UiPaginationMini` - 4px pagination dots
- `UiRuler` - Scale measurement display
- `UiPlaygroundSurface` - Main simulation area

### Screens
- `ScreenPlayground` - Main game interface
- `ScreenTableCards` - Particle table view (future)
- `ScreenListCards` - Particle list view (future)

## 🔧 Technical Details

### Performance
- **60fps** target for smooth gameplay
- **GPU acceleration** for particle simulation
- **React 19** for optimized rendering
- **WebGPU** for modern graphics

### Browser Support
- **Modern browsers** with WebGPU support
- **WebGL2** fallback for older browsers
- **Progressive enhancement** approach

## 📚 Documentation

- [Cookbook](./docs/cookbook.md) - Design system and conventions
- [Glossary](./docs/glossary.md) - Game terminology
- [Architecture](./docs/architecture.md) - Technical architecture

## 🤝 Contributing

1. Follow the design system in the cookbook
2. Add Storybook stories for new components
3. Use TypeScript for type safety
4. Follow the layered architecture
5. Test on multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Particle physics concepts from modern physics
- Design inspiration from scientific visualizations
- WebGPU community for graphics programming
