import { useState, useCallback, useEffect } from 'react';
import { UIPaginationGrid } from './UIPaginationGrid';
import { gridPaginationService } from '../../../lib/grid-pagination-service';
import { PaginationState } from '../../../lib/types';
import { getElementsByBlock } from '../../../lib/constants/periodic-table-mapper';
import styles from './UIPeriodicTableBlocks.module.css';

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
    disabledThreshold?: number;
    activeElementId?: string | null; // Can be null for no active element
    onElementClick?: (elementId: string) => void;
}

function BlockGrid({ elements, blockName, onPageChange, active, disabledThreshold = 90, activeElementId, onElementClick }: BlockGridProps) {
    // Convert elements to grid pages
    const pages = elements.map(element => ({
        id: element.symbol, // Use symbol as id
        position: element.position,
        title: element.symbol,
        state: (activeElementId === element.symbol)
            ? PaginationState.ACTIVE // If this element is the active one, it's always ACTIVE
            : (element.atomicNumber > disabledThreshold
                ? PaginationState.DISABLED // Only disable elements > threshold if they're not active
                : PaginationState.INACTIVE),
        metadata: {
            atomicNumber: element.atomicNumber,
            name: element.name,
            category: element.category,
            electronShellGroup: element.electronShellGroup,
            period: element.period
        }
    }));

    // Calculate grid dimensions for this block
    const maxX = Math.max(...elements.map(el => el.position.x));
    const maxY = Math.max(...elements.map(el => el.position.y));
    const dimensions = { width: maxX + 1, height: maxY + 1 };

    // Find the active element's position for this block
    const activeElement = activeElementId ? elements.find(el => el.symbol === activeElementId) : null;
    const activePosition = activeElement ? activeElement.position : { x: 0, y: 0 };

    // Create context for this block with the correct active position
    const context = gridPaginationService.createContext(
        `block-${blockName}-${activeElementId || 'none'}`, // Include activeElementId in context ID for uniqueness
        pages,
        dimensions,
        PaginationState.ACTIVE
    );

    // Override the current position to match our active element
    if (activeElement) {
        context.currentPosition = activePosition;
        // Update the isActive property for all pages in this context
        context.pages = context.pages.map(page => ({
            ...page,
            isActive: page.position.x === activePosition.x && page.position.y === activePosition.y
        }));
    } else {
        // No active element in this block - ensure no pages are marked as active
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
            {/* <div className={styles.blockLabel}>{blockName.toUpperCase()}-Block</div> */}
            <UIPaginationGrid
                context={context}
                onGridPageChange={handleElementClick}
                active={active}
            />
        </div>
    );
}


export function UIPeriodicTableBlocks({
    viewMode,
    onPageChange,
    active = 'only view',
    activeIndex = 1 // Default to Hydrogen (atomic number 1)
}: UIPeriodicTableBlocksProps) {
    // Get elements for each block using the new abstraction
    const blockElements = getElementsByBlock(viewMode);

    // Combine all elements from all blocks into one array
    const allElements = blockElements.s
        .concat(blockElements.p, blockElements.d, blockElements.f);

    // Find the element symbol based on atomic number (activeIndex)
    // If activeIndex is 0 or null, no element should be active
    const targetElement = activeIndex && activeIndex > 0 ? allElements.find(el => el.atomicNumber === activeIndex) : null;
    const activeElementId = targetElement ? targetElement.symbol : null; // No default - can be null for no active element

    // State for managing the single active element (for click interactions)
    const [clickedElementId, setClickedElementId] = useState<string | null>(activeElementId);

    // Update clickedElementId when activeIndex prop changes
    useEffect(() => {
        setClickedElementId(activeElementId);
    }, [activeIndex, activeElementId]);

    // Handle element selection
    const handleElementClick = useCallback((elementId: string) => {
        setClickedElementId(elementId);
    }, []);

    // Get active element info for display (use clickedElementId if user clicked, otherwise use activeIndex)
    const displayElementId = clickedElementId || activeElementId;
    const activeElement = displayElementId ? allElements.find(el => el.symbol === displayElementId) : null;

    if (viewMode === 'long') {
        // Long form: All blocks arranged horizontally
        return (
            <div className={styles.periodicTableContainer}>
                {activeElement && (
                    <div className={styles.activeElementInfo}>
                        <strong>Active Element:</strong> {activeElement.name} ({activeElement.symbol}) - Atomic Number: {activeElement.atomicNumber}
                    </div>
                )}
                <div className={styles.periodicTableLong}>
                    <BlockGrid
                        elements={blockElements.s}
                        blockName="s"
                        onPageChange={onPageChange}
                        active={active}
                        activeElementId={displayElementId}
                        onElementClick={handleElementClick}
                    />
                    <BlockGrid
                        elements={blockElements.f}
                        blockName="f"
                        onPageChange={onPageChange}
                        active={active}
                        activeElementId={displayElementId}
                        onElementClick={handleElementClick}
                    />
                    <BlockGrid
                        elements={blockElements.d}
                        blockName="d"
                        onPageChange={onPageChange}
                        active={active}
                        activeElementId={displayElementId}
                        onElementClick={handleElementClick}
                    />
                    <BlockGrid
                        elements={blockElements.p}
                        blockName="p"
                        onPageChange={onPageChange}
                        active={active}
                        activeElementId={displayElementId}
                        onElementClick={handleElementClick}
                    />
                </div>
            </div>
        );
    } else {
        // Short form: S, D, P blocks in main table, F-block below
        return (
            <div className={styles.periodicTableContainer}>
                {activeElement && (
                    <div className={styles.activeElementInfo}>
                        <strong>Active Element:</strong> {activeElement.name} ({activeElement.symbol}) - Atomic Number: {activeElement.atomicNumber}
                    </div>
                )}
                <div className={styles.periodicTableShort}>
                    <div className={styles.mainTable}>
                        <BlockGrid
                            elements={blockElements.s}
                            blockName="s"
                            onPageChange={onPageChange}
                            active={active}
                            activeElementId={displayElementId}
                            onElementClick={handleElementClick}
                        />
                        <BlockGrid
                            elements={blockElements.d}
                            blockName="d"
                            onPageChange={onPageChange}
                            active={active}
                            activeElementId={displayElementId}
                            onElementClick={handleElementClick}
                        />
                        <BlockGrid
                            elements={blockElements.p}
                            blockName="p"
                            onPageChange={onPageChange}
                            active={active}
                            activeElementId={displayElementId}
                            onElementClick={handleElementClick}
                        />
                    </div>
                    <div className={styles.fBlockBelow}>
                        <BlockGrid
                            elements={blockElements.f}
                            blockName="f"
                            onPageChange={onPageChange}
                            active={active}
                            activeElementId={displayElementId}
                            onElementClick={handleElementClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
