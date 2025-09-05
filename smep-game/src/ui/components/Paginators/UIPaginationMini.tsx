import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { PaginationState, UISquareState, ClickableState } from '../../../lib/types';
import { UISquareSmall } from '../Primitives/UISquareSmall';
import styles from './UIPaginationMini.module.css';

interface UIPaginationMiniProps {
    count: number;
    activeIndex?: number; // Now optional with default value
    onPageChange?: (index: number) => void; // Returns 1-based index
    state?: PaginationState; // New state property
    clickable?: ClickableState; // New clickable property using enum
    active?: 'clickable' | 'only view'; // New property to control display mode
}

// Main paginator component that contains multiple squares
export function UIPaginationMini({
    count,
    activeIndex = 1, // Default to first page
    onPageChange,
    state = PaginationState.ACTIVE, // Default to active state
    clickable = ClickableState.ENABLED, // Default to enabled
    active = 'clickable' // Default to clickable mode
}: UIPaginationMiniProps) {
    const sizes = TOKENS.sizes;
    const items = Array.from({ length: count });

    // Determine if individual squares are clickable based on paginator state and clickable property
    const isSquareClickable = clickable === ClickableState.ENABLED && !!onPageChange && state !== PaginationState.DISABLED;

    // Calculate gap based on active mode
    const gap = active === 'clickable' ? 0 : sizes.MINI_PAGINATOR_GAP;

    return (
        <div style={{ display: 'flex', gap }}>
            {items.map((_, i) => {
                const pageNumber = i + 1; // Convert 0-based index to 1-based page number
                const currentActiveIndex = activeIndex || 1; // Ensure we have a valid active index
                const isActive = pageNumber === currentActiveIndex;

                // Map pagination state to square state
                const getSquareState = (): UISquareState => {
                    if (state === PaginationState.DISABLED) return UISquareState.DISABLED;
                    if (state === PaginationState.UNAVAILABLE) return UISquareState.DISABLED;

                    // For ACTIVE and INACTIVE pagination states
                    if (isActive) return UISquareState.ACTIVE;
                    return UISquareState.INACTIVE;
                };

                return (
                    <UISquareSmall
                        key={i}
                        state={getSquareState()}
                        active={active}
                        onClick={isSquareClickable ? () => {
                            console.log(`UIPaginationMini: Clicked on page ${pageNumber}, current active: ${currentActiveIndex}`);
                            onPageChange?.(pageNumber);
                        } : undefined}
                    />
                );
            })}
        </div>
    );
} 