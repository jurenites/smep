import React, { useState, useCallback } from 'react';
import { UIPaginationGrid } from './UIPaginationGrid';
import { gridPaginationService } from '../../../lib/grid-pagination-service';
import { PaginationState } from '../../../lib/types';
import { getElementsByBlock, mapAtomicDataToLayout } from '../../../lib/constants/periodic-table-mapper';
import styles from './UIPeriodicTableBlocks.module.css';

interface UIPeriodicTableBlocksProps {
    viewMode: 'long' | 'short';
    onPageChange?: (position: { x: number; y: number }, event: any) => void;
    active?: 'clickable' | 'only view';
}

interface BlockGridProps {
    elements: any[];
    blockName: string;
    onPageChange?: (position: { x: number; y: number }, event: any) => void;
    active?: 'clickable' | 'only view';
    disabledThreshold?: number;
    activeElementId?: string;
    onElementClick?: (elementId: string) => void;
}

function BlockGrid({ elements, blockName, onPageChange, active, disabledThreshold = 90, activeElementId, onElementClick }: BlockGridProps) {
    // Convert elements to grid pages
    const pages = elements.map(element => ({
        id: element.symbol, // Use symbol as id
        position: element.position,
        title: element.symbol,
        state: element.atomicNumber > disabledThreshold
            ? PaginationState.DISABLED
            : (activeElementId === element.symbol ? PaginationState.ACTIVE : PaginationState.UNAVAILABLE),
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

    // Create context for this block
    const context = gridPaginationService.createContext(
        `block-${blockName}`,
        pages,
        dimensions,
        PaginationState.ACTIVE
    );

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
            <div className={styles.blockLabel}>{blockName.toUpperCase()}-Block</div>
            <UIPaginationGrid
                context={context}
                onPageChange={handleElementClick}
                active={active}
            />
        </div>
    );
}

export function UIPeriodicTableBlocks({
    viewMode,
    onPageChange,
    active = 'only view'
}: UIPeriodicTableBlocksProps) {
    // State for managing the single active element
    const [activeElementId, setActiveElementId] = useState<string>('H'); // Start with Hydrogen

    // Get elements for each block using the new abstraction
    const blockElements = getElementsByBlock(viewMode);

    // Handle element selection
    const handleElementClick = useCallback((elementId: string) => {
        setActiveElementId(elementId);
    }, []);

    // Get active element info for display
    const activeElement = blockElements.s
        .concat(blockElements.p, blockElements.d, blockElements.f)
        .find(el => el.symbol === activeElementId);

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
                        activeElementId={activeElementId}
                        onElementClick={handleElementClick}
                    />
                    <BlockGrid
                        elements={blockElements.f}
                        blockName="f"
                        onPageChange={onPageChange}
                        active={active}
                        activeElementId={activeElementId}
                        onElementClick={handleElementClick}
                    />
                    <BlockGrid
                        elements={blockElements.d}
                        blockName="d"
                        onPageChange={onPageChange}
                        active={active}
                        activeElementId={activeElementId}
                        onElementClick={handleElementClick}
                    />
                    <BlockGrid
                        elements={blockElements.p}
                        blockName="p"
                        onPageChange={onPageChange}
                        active={active}
                        activeElementId={activeElementId}
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
                            activeElementId={activeElementId}
                            onElementClick={handleElementClick}
                        />
                        <BlockGrid
                            elements={blockElements.d}
                            blockName="d"
                            onPageChange={onPageChange}
                            active={active}
                            activeElementId={activeElementId}
                            onElementClick={handleElementClick}
                        />
                        <BlockGrid
                            elements={blockElements.p}
                            blockName="p"
                            onPageChange={onPageChange}
                            active={active}
                            activeElementId={activeElementId}
                            onElementClick={handleElementClick}
                        />
                    </div>
                    <div className={styles.fBlockBelow}>
                        <BlockGrid
                            elements={blockElements.f}
                            blockName="f"
                            onPageChange={onPageChange}
                            active={active}
                            activeElementId={activeElementId}
                            onElementClick={handleElementClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
