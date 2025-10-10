# SMEP - Standard Model Elemetrary Particles

A web-based idle game that simulates particle physics and matter evolution from quantum scales to astronomical objects.

## Game Concept

SMEP is an idle game where players explore the universe at different scales, from quantum particles to galaxies. The game features:

## Architecture
The project follows a layered architecture as specified in the cookbook:

## Getting Started

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
- `npm run storybook` - Start Sotrybook for UI components
- `npm run dev` - Start Development server
- `npm run build` - Build for Production
- `npm run preview` - Preview Production build

## Technical Details

### Performance
- **60fps** target for smooth gameplay
- **GPU acceleration** for particle simulation
- **React 19** for optimized rendering
- **WebGPU** for modern graphics

### Browser Support
- **Modern browsers** with WebGPU support
- **WebGL2** fallback for older browsers
- **Progressive enhancement** approach

## Documentation

- [Cookbook](./docs/cookbook.md) - Design system and conventions
- [Glossary](./docs/glossary.md) - Game terminology
- [Architecture](./docs/architecture.md) - Technical architecture

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
