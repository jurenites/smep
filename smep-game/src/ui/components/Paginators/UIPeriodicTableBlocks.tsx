import { useState, useCallback, useEffect } from 'react';
import { UIPaginationGrid } from './UIPaginationGrid';
import { UICard, ParticleLevel, UICardState } from '../UICard/UICard';
import { UILabel } from '../Text/UILabel';
import { gridPaginationService } from '../../../lib/grid-pagination-service';
import { PaginationState } from '../../../lib/types';
import { getElementsByBlock } from '../../../lib/data';
import styles from './UIPeriodicTableBlocks.module.css';


interface UIPeriodicTableBlocksProps {
    viewMode: 'long' | 'short';
    onPageChange?: (position: { x: number; y: number }, event: any) => void;
    interactionMode?: 'clickable' | 'only view';
    activeIndex?: number; // 1-based atomic number to highlight
}

interface BlockGridProps {
    elements: any[];
    blockName: string;
    onPageChange?: (position: { x: number; y: number }, event: any) => void;
    interactionMode?: 'clickable' | 'only view';
    activeElementId: string; // Always has a value - never null
    onElementClick?: (elementId: string) => void;
}

function BlockGrid({ elements, blockName, onPageChange, interactionMode, activeElementId, onElementClick }: BlockGridProps) {
    // Convert elements to grid pages
    const pages = elements.map(element => {
        // Determine element state based on whether it's the active element
        const state = activeElementId === element.symbol
            ? PaginationState.ACTIVE
            : PaginationState.INACTIVE;

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

    // Calculate grid dimensions for this block based on all elements
    const dimensions = elements.length > 0
        ? {
            width: Math.max(...elements.map(el => el.position.x)) + 1,
            height: Math.max(...elements.map(el => el.position.y)) + 1
        }
        : { width: 1, height: 1 }; // Minimal dimensions when no elements

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

    // Render UICards when in clickable mode, otherwise use UIPaginationGrid
    const renderContent = () => {
        if (interactionMode === 'clickable') {
            return (
                <div className={styles.blockContainer} data-block={blockName}>
                    <div className={styles.uicardGrid} style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${dimensions.width}, 1fr)`,
                        gridTemplateRows: `repeat(${dimensions.height}, 1fr)`,
                        gap: '4px',
                        padding: '8px',
                        width: `${dimensions.width * 60}px`,
                        height: `${dimensions.height * 80}px`
                    }}>
                        {elements.map((element) => (
                            <div
                                key={element.symbol}
                                style={{
                                    gridColumn: element.position.x + 1,
                                    gridRow: element.position.y + 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <UICard
                                    textSymbol={element.symbol}
                                    logicalSize="small"
                                    cardState={activeElementId === element.symbol ? UICardState.NORMAL : UICardState.NORMAL}
                                    showParticle={true}
                                    particleLevel={ParticleLevel.ATOMIC}
                                    particleType={element.symbol}
                                    onClick={() => {
                                        if (onElementClick) {
                                            onElementClick(element.symbol);
                                        }
                                        if (onPageChange) {
                                            onPageChange(element.position, null);
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Default view mode with UIPaginationGrid
        return (
            <div className={styles.blockContainer} data-block={blockName}>
                <UIPaginationGrid
                    context={context}
                    onGridPageChange={handleElementClick}
                    active={interactionMode}
                />
            </div>
        );
    };

    return renderContent();
}

// Reusable function to render block grids with common props
function renderBlockGrids(
    blockElements: any,
    commonProps: {
        onPageChange?: (position: { x: number; y: number }, event: any) => void;
        interactionMode?: 'clickable' | 'only view';
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
            interactionMode={commonProps.interactionMode}
            activeElementId={commonProps.displayElementId}
            onElementClick={commonProps.handleElementClick}
        />
    ));
}

export function UIPeriodicTableBlocks({
    viewMode,
    onPageChange,
    interactionMode = 'only view',
    activeIndex = 1 // Default to Hydrogen (atomic number 1) - always has at least one active element
}: UIPeriodicTableBlocksProps) {
    // Get elements for each block - note: positions are the same regardless of viewMode
    // The only difference is how blocks are arranged in the layout
    const blockElements = getElementsByBlock('long'); // Always use 'long' since positions don't change

    // Combine all elements from all blocks into one array
    const allElements = blockElements.s
        .concat(blockElements.p, blockElements.d, blockElements.f);

    // Find the element symbol based on atomic number (activeIndex)
    // Default to Hydrogen (atomic number 1) if no valid activeIndex provided
    const targetAtomicNumber = activeIndex && activeIndex > 0 ? activeIndex : 1;
    const targetElement = allElements.find(el => el.atomicNumber === targetAtomicNumber);
    const activeElementId = targetElement ? targetElement.symbol : allElements[0].symbol;

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
        interactionMode,
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