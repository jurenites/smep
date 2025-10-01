import { useState, useCallback, useEffect } from 'react';
import { UIPaginationGrid } from './UIPaginationGrid';
import { UILabel } from '../Text/UILabel';
import { gridPaginationService } from '../../../lib/grid-pagination-service';
import { PaginationState } from '../../../lib/types';
import { getElementsByBlock } from '../../../lib/data/particle-atomic.data';
import styles from './UIPeriodicTableBlocks.module.css';

// TESTING CONSTANT - Remove this when implementing real game mechanics
// This makes every element with atomic number > 50 invisible (not researched yet)
const HIDE_ELEMENTS_BEYOND_50_FOR_TESTING = true;

interface UIPeriodicTableBlocksProps {
    viewMode: 'long' | 'short';
    onPageChange?: (position: { x: number; y: number }, event: any) => void;
    active?: 'clickable' | 'only view';
    activeIndex?: number; // 1-based atomic number to highlight
}

interface BlockGridProps {
    elements: any[];
    blockName: string;
    onPageChange?: (position: { x: number; y: number }, event: any) => void;
    active?: 'clickable' | 'only view';
    activeElementId: string; // Always has a value - never null
    onElementClick?: (elementId: string) => void;
}

function BlockGrid({ elements, blockName, onPageChange, active, activeElementId, onElementClick }: BlockGridProps) {
    // Convert elements to grid pages
    const pages = elements.map(element => {
        // Determine if element should be invisible (not researched yet)
        //TODO fix the posiitoning of D-block its off grid.
        const isInvisible = HIDE_ELEMENTS_BEYOND_50_FOR_TESTING && element.atomicNumber > 20;

        // Determine element state
        let state: PaginationState;
        if (isInvisible) {
            state = PaginationState.INVISIBLE; // Hidden from user - not researched yet
        } else if (activeElementId === element.symbol) {
            state = PaginationState.ACTIVE; // If this element is the active one, it's always ACTIVE
        } else {
            state = PaginationState.INACTIVE; // All other elements are inactive
        }

        return {
            id: element.symbol, // Use symbol as id
            position: element.position,
            title: element.symbol,
            state: state,
            metadata: {
                atomicNumber: element.atomicNumber,
                name: element.name,
                category: element.category,
                electronShellGroup: element.electronShellGroup,
                period: element.period
            }
        };
    });

    // Calculate grid dimensions for this block based only on visible elements
    const visibleElements = elements.filter(el => {
        const isInvisible = HIDE_ELEMENTS_BEYOND_50_FOR_TESTING && el.atomicNumber > 50;
        return !isInvisible;
    });

    // If no visible elements, use minimal dimensions
    const dimensions = visibleElements.length > 0
        ? {
            width: Math.max(...visibleElements.map(el => el.position.x)) + 1,
            height: Math.max(...visibleElements.map(el => el.position.y)) + 1
        }
        : { width: 1, height: 1 }; // Minimal dimensions when no visible elements

    // Find the active element's position for this block
    const activeElement = elements.find(el => el.symbol === activeElementId);
    const activePosition = activeElement ? activeElement.position : null;

    // Create context for this block with INACTIVE as default state
    const context = gridPaginationService.createContext(
        `block-${blockName}-${activeElementId}`, // Include activeElementId in context ID for uniqueness
        pages,
        dimensions,
        PaginationState.INACTIVE
    );

    // Only set current position if there's an active element in this block
    if (activeElement && activePosition) {
        context.currentPosition = activePosition;
        // Update the isActive property for all pages in this context
        context.pages = context.pages.map(page => ({
            ...page,
            isActive: page.position.x === activePosition.x && page.position.y === activePosition.y
        }));
    } else {
        // No active element in this block - set currentPosition to a position that doesn't exist
        // This ensures no element in this block will match the currentPosition
        context.currentPosition = { x: -1, y: -1 };
        // Ensure no pages are marked as active
        context.pages = context.pages.map(page => ({
            ...page,
            isActive: false
        }));
    }

    // Handle element click
    const handleElementClick = useCallback((position: { x: number; y: number }, event: any) => {
        const element = elements.find(el =>
            el.position.x === position.x && el.position.y === position.y
        );
        if (element && onElementClick) {
            onElementClick(element.symbol);
        }
        if (onPageChange) {
            onPageChange(position, event);
        }
    }, [elements, onElementClick, onPageChange]);

    return (
        <div className={styles.blockContainer} data-block={blockName}>
            <UIPaginationGrid
                context={context}
                onGridPageChange={handleElementClick}
                active={active}
            />
        </div>
    );
}

// Reusable function to render block grids with common props
function renderBlockGrids(
    blockElements: any,
    commonProps: {
        onPageChange?: (position: { x: number; y: number }, event: any) => void;
        active?: 'clickable' | 'only view';
        displayElementId: string;
        handleElementClick: (elementId: string) => void;
    },
    blockNames: string[]
) {
    return blockNames.map(blockName => (
        <BlockGrid
            key={blockName}
            elements={blockElements[blockName]}
            blockName={blockName}
            onPageChange={commonProps.onPageChange}
            active={commonProps.active}
            activeElementId={commonProps.displayElementId}
            onElementClick={commonProps.handleElementClick}
        />
    ));
}

export function UIPeriodicTableBlocks({
    viewMode,
    onPageChange,
    active = 'only view',
    activeIndex = 1 // Default to Hydrogen (atomic number 1) - always has at least one active element
}: UIPeriodicTableBlocksProps) {
    // Get elements for each block - note: positions are the same regardless of viewMode
    // The only difference is how blocks are arranged in the layout
    const blockElements = getElementsByBlock('long'); // Always use 'long' since positions don't change

    // Combine all elements from all blocks into one array
    const allElements = blockElements.s
        .concat(blockElements.p, blockElements.d, blockElements.f);

    // Helper function to check if an element is invisible
    const isElementInvisible = (element: any): boolean => {
        return HIDE_ELEMENTS_BEYOND_50_FOR_TESTING && element.atomicNumber > 50;
    };

    // Helper function to find the next available (non-invisible) element
    // Smart navigation: if target element is invisible, automatically jump to next available element
    const findNextAvailableElement = (targetAtomicNumber: number): any => {
        // First, try to find the target element
        const targetElement = allElements.find(el => el.atomicNumber === targetAtomicNumber);

        // If target element exists and is not invisible, use it
        if (targetElement && !isElementInvisible(targetElement)) {
            return targetElement;
        }

        // If target element is invisible or doesn't exist, find the next available element
        // Look for elements with atomic number >= targetAtomicNumber
        const availableElements = allElements.filter(el =>
            el.atomicNumber >= targetAtomicNumber && !isElementInvisible(el)
        );

        if (availableElements.length > 0) {
            // Return the element with the smallest atomic number >= target
            return availableElements.reduce((prev, current) =>
                prev.atomicNumber < current.atomicNumber ? prev : current
            );
        }

        // If no elements found after target, look backwards for any available element
        const allAvailableElements = allElements.filter(el => !isElementInvisible(el));
        if (allAvailableElements.length > 0) {
            // Return the element with the largest atomic number (closest to target going backwards)
            return allAvailableElements.reduce((prev, current) =>
                prev.atomicNumber > current.atomicNumber ? prev : current
            );
        }

        // Fallback: return first element (should never happen as we ensure at least one element)
        return allElements[0];
    };

    // Find the element symbol based on atomic number (activeIndex) with smart navigation
    // Always ensure at least one element is active - default to first available element if no valid activeIndex
    const targetAtomicNumber = activeIndex && activeIndex > 0 ? activeIndex : 1;
    const targetElement = findNextAvailableElement(targetAtomicNumber);
    const activeElementId = targetElement.symbol;

    // State for managing the single active element (for click interactions)
    const [clickedElementId, setClickedElementId] = useState<string>(activeElementId);

    // Update clickedElementId when activeIndex prop changes
    useEffect(() => {
        setClickedElementId(activeElementId);
    }, [activeIndex, activeElementId]);

    // Handle element selection
    const handleElementClick = useCallback((elementId: string) => {
        setClickedElementId(elementId);
    }, []);

    // Get active element info for display (use clickedElementId if user clicked, otherwise use activeIndex)
    const displayElementId = clickedElementId;
    const activeElement = allElements.find(el => el.symbol === displayElementId);

    // Common props for all block grids
    const commonBlockProps = {
        onPageChange,
        active,
        displayElementId,
        handleElementClick
    };

    // Active element info component (reusable)
    const ActiveElementInfo = () => (
        activeElement && (
            <div className={styles.activeElementInfo}>
                <UILabel fontVariant="body" color="gray">
                    Active Element: {activeElement.name}(
                </UILabel>
                <UILabel fontVariant="title" color="white">
                    {activeElement.symbol}
                </UILabel>
                <UILabel fontVariant="body" color="gray">
                    ) - Atomic Number: {activeElement.atomicNumber}
                </UILabel>
            </div>
        )
    );

    // Unified template with animated block repositioning
    return (
        <div className={styles.periodicTableContainer}>
            <ActiveElementInfo />
            <div className={styles.periodicTableWrapper} data-view-mode={viewMode}>
                <div className={styles.blockPositioner}>
                    {renderBlockGrids(blockElements, commonBlockProps, ['s', 'f', 'd', 'p'])}
                </div>
            </div>
        </div>
    );
}