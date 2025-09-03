# UI Primitives Storybook

This directory contains Storybook stories for the SMEP game UI primitives.

## Components

### UiCardSmall
A small card component that displays a symbol with optional loading and selection states.

**Props:**
- `symbol: string` - The symbol to display
- `isLoading?: boolean` - Shows loading state
- `isSelected?: boolean` - Highlights the card when selected
- `onClick?: () => void` - Click handler

### UiPlaygroundSurface
An interactive playground surface with a circular boundary and gradient background.

**Props:**
- `width: number` - Surface width
- `height: number` - Surface height
- `children?: React.ReactNode` - Content to render inside
- `onMouseMove?: (event: React.MouseEvent) => void` - Mouse move handler
- `onMouseDown?: (event: React.MouseEvent) => void` - Mouse down handler
- `onMouseUp?: (event: React.MouseEvent) => void` - Mouse up handler

### UiRuler
A ruler component that displays scale information with tick marks.

**Props:**
- `scale: number` - Scale factor to display
- `width: number` - Ruler width
- `height: number` - Ruler height
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Ruler position

### UiPaginationMini
A minimal pagination component with dots.

**Props:**
- `count: number` - Number of pages
- `activeIndex: number` - Currently active page
- `onPageChange?: (index: number) => void` - Page change handler

## Design Tokens

All components use the design tokens defined in `../ui/tokens/tokens.ts` for consistent styling.

## Usage

Run Storybook to view and interact with these components:

```bash
npm run storybook
```

The stories are organized under "UI Primitives" in the Storybook sidebar. 