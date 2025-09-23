// import React from 'react'; // Not needed in this component
import { TOKENS } from '../../tokens/tokens';
import type {
    GridPaginationContext,
    GridPosition,
    GridPage
} from '../../../lib/types';
import { PaginationState, UISquareState, ClickableState } from '../../../lib/types';
import { UISquare } from '../Primitives/UISquare';
import styles from './UIPaginationGrid.module.css';

interface UIPaginationGridProps {
    // For simple pagination (replaces UIPaginationMini functionality)
    count?: number;
    activeIndex?: number;
    onPageChange?: (index: number) => void; // For simple pagination, returns 1-based index
    clickable?: ClickableState;
    elementStates?: UISquareState[];

    // For grid pagination (existing functionality)
    context?: GridPaginationContext;
    onGridPageChange?: (position: GridPosition, event: any) => void; // For grid pagination

    // Grid dimensions
    gridCols?: number;
    gridRows?: number;

    // Common props
    active?: 'clickable' | 'only view';
}

export function UIPaginationGrid({
    // Simple pagination props
    count,
    activeIndex = 1,
    onPageChange,
    clickable = ClickableState.ENABLED,
    elementStates,

    // Grid pagination props
    context,
    onGridPageChange,

    // Grid dimensions
    gridCols = 1,
    gridRows = 1,

    // Common props
    active = 'only view'
}: UIPaginationGridProps) {
    const sizes = TOKENS.sizes;

    // Determine if we're in simple pagination mode or grid pagination mode
    const isSimpleMode = count !== undefined;

    // For simple mode, create a virtual context
    const simpleContext = isSimpleMode ? {
        pages: Array.from({ length: count }, (_, i) => ({
            id: `page-${i + 1}`,
            position: { x: i % gridCols, y: Math.floor(i / gridCols) },
            title: `Page ${i + 1}`,
            state: PaginationState.ACTIVE, // Default to active state for simple mode
            isActive: i + 1 === activeIndex,
            metadata: {}
        })),
        gridDimensions: { width: gridCols, height: Math.ceil(count / gridCols) },
        currentPosition: { x: (activeIndex - 1) % gridCols, y: Math.floor((activeIndex - 1) / gridCols) },
        navigationRules: {}
    } : null;

    const currentContext = isSimpleMode ? simpleContext : context;

    if (!currentContext) {
        return null; // No context provided
    }

    const { pages, gridDimensions, currentPosition } = currentContext;

    // Create a 2D grid array for rendering
    const createGrid = () => {
        const grid: (GridPage | null)[][] = [];

        // Initialize empty grid
        for (let y = 0; y < gridDimensions.height; y++) {
            grid[y] = [];
            for (let x = 0; x < gridDimensions.width; x++) {
                grid[y][x] = null;
            }
        }

        // Fill in pages at their positions
        pages.forEach(page => {
            if (page.position.y < gridDimensions.height && page.position.x < gridDimensions.width) {
                grid[page.position.y][page.position.x] = page;
            }
        });

        return grid;
    };

    const grid = createGrid();

    // Determine if a square is clickable
    const isSquareClickable = (page: GridPage | null) => {
        if (!page) return false;
        if (active !== 'clickable') return false;

        if (isSimpleMode) {
            // For simple mode, use the clickable logic from UIPaginationMini
            const isClickable = clickable === ClickableState.ENABLED && !!onPageChange;
            return isClickable && page.state !== PaginationState.DISABLED;
        } else {
            // For grid mode, use existing logic
            if (!onGridPageChange) return false;
            if (page.state === PaginationState.DISABLED) return false;
            return true;
        }
    };

    // Get square state based on page and current position
    const getSquareState = (page: GridPage | null, index?: number): UISquareState => {
        if (!page) return UISquareState.DISABLED;

        if (isSimpleMode) {
            // For simple mode, use the state logic from UIPaginationMini
            if (elementStates && index !== undefined && elementStates[index] !== undefined) {
                return elementStates[index];
            }

            // Check if this page is currently active
            const isActive = index !== undefined && index + 1 === activeIndex;
            return isActive ? UISquareState.ACTIVE : UISquareState.INACTIVE;
        } else {
            // For grid mode, use existing logic
            if (page.state === PaginationState.DISABLED) return UISquareState.DISABLED;

            // Check if this page is currently active
            const isActive = page.position.x === currentPosition.x && page.position.y === currentPosition.y;

            // Only one element can be ACTIVE at a time, others should be INACTIVE (not DISABLED)
            return isActive ? UISquareState.ACTIVE : UISquareState.INACTIVE;
        }
    };

    // Handle square click
    const handleSquareClick = (page: GridPage, index?: number) => {
        if (isSimpleMode) {
            if (isSquareClickable(page) && onPageChange) {
                const pageNumber = index !== undefined ? index + 1 : 1;
                // console.log(`UIPaginationGrid: Clicked on page ${pageNumber}, current active: ${activeIndex}`);
                onPageChange(pageNumber);
            }
        } else {
            if (isSquareClickable(page) && onGridPageChange) {
                onGridPageChange(page.position, {
                    pageId: page.id,
                    title: page.title,
                    metadata: page.metadata
                });
            }
        }
    };

    // Calculate gap for simple mode (like UIPaginationMini)
    const gap = isSimpleMode && active === 'clickable' ? 0 : sizes.GAP_SMALL;

    // For simple mode with single row, use flex layout like UIPaginationMini
    if (isSimpleMode && gridRows === 1) {
        return (
            <div className={styles.simpleFlexContainer} style={{ gap }} data-testid="uipaginationgrid">
                {Array.from({ length: count! }, (_, i) => {
                    const pageNumber = i + 1;
                    const isActive = pageNumber === activeIndex;

                    const getSquareState = (): UISquareState => {
                        if (elementStates && elementStates[i] !== undefined) {
                            return elementStates[i];
                        }

                        return isActive ? UISquareState.ACTIVE : UISquareState.INACTIVE;
                    };

                    const isSquareClickableForPage = clickable === ClickableState.ENABLED && !!onPageChange;

                    // In "only view" mode, just show the small square without clickable area
                    if (active === 'only view') {
                        return (
                            <UISquare
                                key={i}
                                state={getSquareState()}
                                logicalSize="small"
                            />
                        );
                    }

                    // In "clickable" mode, show small square centered in invisible clickable area
                    return (
                        <div key={i} className={styles.clickableArea}>
                            <div className={styles.outerSquareWrapper}>
                                <UISquare
                                    state={UISquareState.INACTIVE}
                                    logicalSize="mid"
                                    onClick={isSquareClickableForPage ? () => {
                                        // console.log(`UIPaginationGrid: Clicked on page ${pageNumber}, current active: ${activeIndex}`);
                                        onPageChange?.(pageNumber);
                                    } : undefined}
                                >
                                    <UISquare
                                        state={getSquareState()}
                                        logicalSize="small"
                                    />
                                </UISquare>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    // For grid mode or multi-row simple mode, use grid layout
    return (
        <div className={styles.gridContainer} data-testid="uipaginationgrid">
            {grid.map((row, y) => (
                <div
                    key={y}
                    className={`${styles.gridRow} ${active === 'clickable' ? styles.gridRowClickable : styles.gridRowViewOnly}`}
                >
                    {row.map((page, x) => {
                        // Calculate index for simple mode
                        const index = isSimpleMode ? y * gridCols + x : undefined;

                        // Generate additional CSS classes for element information
                        const elementInfo = page ? {
                            shellGroup: page.metadata?.electronShellGroup || 'unknown',
                            coordinates: `x${x}y${y}`,
                            atomicNumber: page.metadata?.atomicNumber || 'unknown'
                        } : null;

                        const additionalClasses = elementInfo
                            ? `atomic-${elementInfo.atomicNumber}`
                            : 'empty-cell';

                        return (
                            <div
                                key={`${x}-${y}`}
                                className={`${styles.gridCell} ${additionalClasses}`}
                                data-shell-group={elementInfo?.shellGroup}
                                data-coordinates={elementInfo?.coordinates}
                                data-atomic-number={elementInfo?.atomicNumber}
                            >
                                {page ? (
                                    <UISquare
                                        state={getSquareState(page, index)}
                                        logicalSize="small"
                                        active={active}
                                        onClick={() => handleSquareClick(page, index)}
                                    />
                                ) : (
                                    // Empty space for gaps in the layout (like periodic table)
                                    <div
                                        className={styles.emptySpace}
                                        style={{
                                            width: active === 'clickable' ? sizes.MINI_CARD : sizes.SQUARE_SMALL,
                                            height: active === 'clickable' ? sizes.MINI_CARD : sizes.SQUARE_SMALL
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
