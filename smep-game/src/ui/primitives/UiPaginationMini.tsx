import React from 'react';
import { TOKENS } from '../tokens/tokens';
import { PaginationState } from '../../lib/types';
import styles from './UIPaginationMini.module.css';

interface UIPaginationDotProps {
    isActive: boolean;
    isClickable: boolean;
    onClick?: () => void;
    state?: PaginationState;
}

// Individual 4x4 pagination dot component
export function UIPaginationDot({
    isActive,
    isClickable,
    onClick,
    state = PaginationState.ACTIVE
}: UIPaginationDotProps) {
    const s = TOKENS.sizes;
    const c = TOKENS.colors;

    // Get appropriate CSS class based on state
    const getItemClassName = () => {
        if (state === PaginationState.DISABLED) return styles.paginationItemDisabled;
        if (state === PaginationState.ERROR) return styles.paginationItemError;
        return isClickable ? styles.paginationItem : styles.paginationItemDefault;
    };

    return (
        <svg
            width={s.MINI_PAGINATOR}
            height={s.MINI_PAGINATOR}
            viewBox={`0 0 ${s.MINI_PAGINATOR} ${s.MINI_PAGINATOR}`}
            preserveAspectRatio="xMidYMid meet"
            onClick={isClickable ? onClick : undefined}
            className={getItemClassName()}
        >
            <rect
                x={0}
                y={0}
                width={s.MINI_PAGINATOR}
                height={s.MINI_PAGINATOR}
                fill={isActive ? c.white : c.darkgray}
                stroke={c.white}
                strokeWidth={s.STROKE}
            />
        </svg>
    );
}

interface UIPaginationMiniProps {
    count: number;
    activeIndex?: number; // Now optional with default value
    onPageChange?: (index: number) => void; // Returns 1-based index
    state?: PaginationState; // New state property
    clickable?: boolean; // New clickable property for the whole paginator
}

// Main paginator component that contains multiple dots
export function UIPaginationMini({
    count,
    activeIndex = 1, // Default to first page
    onPageChange,
    state = PaginationState.ACTIVE, // Default to active state
    clickable = true // Default to clickable
}: UIPaginationMiniProps) {
    const s = TOKENS.sizes;
    const items = Array.from({ length: count });

    return (
        <div style={{ display: 'flex', gap: s.MINI_PAGINATOR_GAP }}>
            {items.map((_, i) => {
                const pageNumber = i + 1; // Convert 0-based index to 1-based page number
                const currentActiveIndex = activeIndex || 1; // Ensure we have a valid active index
                const isActive = pageNumber === currentActiveIndex;

                // Determine if item is clickable based on state
                const isDotClickable = clickable && !!onPageChange && state !== PaginationState.DISABLED && state !== PaginationState.ERROR;

                // Get appropriate CSS class based on state
                const getItemClassName = () => {
                    if (state === PaginationState.DISABLED) return styles.paginationItemDisabled;
                    if (state === PaginationState.ERROR) return styles.paginationItemError;
                    return isDotClickable ? styles.paginationItem : styles.paginationItemDefault;
                };

                return (
                    <UIPaginationDot
                        key={i}
                        isActive={isActive}
                        isClickable={isDotClickable}
                        onClick={() => onPageChange?.(pageNumber)}
                        state={state}
                    />
                );
            })}
        </div>
    );
} 