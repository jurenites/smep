import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import type {
    GridPaginationContext,
    GridPosition,
    GridPage
} from '../../../lib/types';
import { PaginationState, UISquareState } from '../../../lib/types';
import { UISquareSmall } from '../Primitives/UISquareSmall';
import styles from './UIPaginationGrid.module.css';

interface UIPaginationGridProps {
    context: GridPaginationContext;
    onPageChange?: (position: GridPosition, event: any) => void;
    active?: 'clickable' | 'only view';
}

export function UIPaginationGrid({
    context,
    onPageChange,
    active = 'only view' // Default to read-only for table view
}: UIPaginationGridProps) {
    const sizes = TOKENS.sizes;
    const { pages, gridDimensions, currentPosition, navigationRules } = context;

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
        if (!onPageChange) return false;
        if (page.state === PaginationState.DISABLED || page.state === PaginationState.UNAVAILABLE) return false;
        return true;
    };

    // Get square state based on page and current position
    const getSquareState = (page: GridPage | null): UISquareState => {
        if (!page) return UISquareState.DISABLED;
        if (page.state === PaginationState.DISABLED) return UISquareState.DISABLED;
        if (page.state === PaginationState.UNAVAILABLE) return UISquareState.DISABLED;

        // Check if this page is currently active
        const isActive = page.position.x === currentPosition.x && page.position.y === currentPosition.y;

        return isActive ? UISquareState.ACTIVE : UISquareState.INACTIVE;
    };

    // Handle square click
    const handleSquareClick = (page: GridPage) => {
        if (isSquareClickable(page)) {
            onPageChange?.(page.position, {
                pageId: page.id,
                title: page.title,
                metadata: page.metadata
            });
        }
    };

    return (
        <div className={styles.gridContainer} data-testid="uipaginationgrid">
            {grid.map((row, y) => (
                <div
                    key={y}
                    className={`${styles.gridRow} ${active === 'clickable' ? styles.gridRowClickable : styles.gridRowViewOnly}`}
                >
                    {row.map((page, x) => {
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
                                    <UISquareSmall
                                        state={getSquareState(page)}
                                        active={active}
                                        onClick={() => handleSquareClick(page)}
                                    />
                                ) : (
                                    // Empty space for gaps in the layout (like periodic table)
                                    <div
                                        className={styles.emptySpace}
                                        style={{
                                            width: active === 'clickable' ? sizes.MINI_CARD : sizes.MINI_PAGINATOR,
                                            height: active === 'clickable' ? sizes.MINI_CARD : sizes.MINI_PAGINATOR
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
