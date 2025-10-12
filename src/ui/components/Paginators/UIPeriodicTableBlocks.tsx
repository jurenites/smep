import { useState, useCallback, useEffect } from 'react';
import { UICard, UICardState } from '../Cards/UICard';
import { UISquare, UISquareState } from '../Primitives/UISquare';
import { UILabel } from '../Text/UILabel';
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
    // Calculate minimum coordinates in this block for relative positioning
    const minX = elements.length > 0 ? Math.min(...elements.map(el => el.position.x)) : 1;
    const minY = elements.length > 0 ? Math.min(...elements.map(el => el.position.y)) : 1;

    // Calculate grid dimensions for this block based on relative positions
    const dimensions = elements.length > 0
        ? {
            width: Math.max(...elements.map(el => el.position.x)) - minX + 1,
            height: Math.max(...elements.map(el => el.position.y)) - minY + 1
        }
        : { width: 1, height: 1 }; // Minimal dimensions when no elements

    // Handle element click
    const handleElementClick = useCallback((element: any) => {
        if (onElementClick) {
            onElementClick(element.symbol);
        }
        if (onPageChange) {
            onPageChange(element.position, null);
        }
    }, [onElementClick, onPageChange]);

    // Calculate cell size based on interaction mode
    const cellSize = interactionMode === 'clickable' ? 31 : 4; // UICard small = 31px, UISquare small = 4px

    // Common grid container for both modes
    return (
        <div className={styles.blockContainer} data-block={blockName}>
            <div
                className={styles.elementGrid}
                style={{
                    gridTemplateColumns: `repeat(${dimensions.width}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${dimensions.height}, ${cellSize}px)`
                }}
            >
                {elements.map((element) => {
                    const isActive = activeElementId === element.symbol;
                    const squareState = isActive ? UISquareState.ACTIVE : UISquareState.INACTIVE;

                    // Calculate relative position within the block
                    const relativeX = element.position.x - minX + 1;
                    const relativeY = element.position.y - minY + 1;

                    // Tooltip shows absolute coordinates
                    const tooltipText = `${element.atomicNumber} x:${element.position.x}, y:${element.position.y}`;

                    return (
                        <div
                            key={element.symbol}
                            className={styles.elementCell}
                            style={{
                                gridColumn: relativeX,
                                gridRow: relativeY
                            }}
                        >
                            {interactionMode === 'clickable' ? (
                                <UICard
                                    textSymbol={element.symbol}
                                    textNumber={element.atomicNumber}
                                    logicalSize="small"
                                    cardState={UICardState.NORMAL}
                                    showParticle={true}
                                    particleType={element.symbol}
                                    onClick={() => handleElementClick(element)}
                                    style={isActive ? {
                                        '--card-border-color': 'var(--color-white)',
                                        '--card-background-color': 'var(--color-gray)',
                                        boxShadow: 'var(--shadow-box-strong)',
                                        transform: 'scale(1.05)',
                                        zIndex: 10
                                    } as React.CSSProperties : undefined}
                                    tooltipContent={tooltipText}
                                />
                            ) : (
                                <UISquare
                                    squareState={squareState}
                                    logicalSize="small"
                                    active={interactionMode}
                                    onClick={() => handleElementClick(element)}
                                    tooltipContent={tooltipText}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={styles.blockLabel}>
                <UILabel fontVariant="digitSmall" color="gray">
                    {blockName}
                </UILabel>
            </div>
        </div>
    );
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
                    {activeElement.atomicNumber} (
                </UILabel>
                <UILabel fontVariant="title" color="white">
                    {activeElement.symbol}
                </UILabel>
                <UILabel fontVariant="body" color="gray">
                    ) - {activeElement.name}
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