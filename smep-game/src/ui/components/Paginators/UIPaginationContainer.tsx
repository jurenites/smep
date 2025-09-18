import React, { useEffect, useState, useCallback } from 'react';
import { UIPaginationMini } from './UIPaginationMini';
import { paginationService } from '../../../lib/pagination-service';
import type { PaginationContext, PaginationEvent, PaginationListener } from '../../../lib/types';
import { PaginationState, ClickableState } from '../../../lib/types';

interface UIPaginationContainerProps {
    contextId: string;
    pages: Array<{
        id: string;
        index: number;
        title: string;
        state: PaginationState; // Replace isAvailable with state
    }>;
    initialState?: PaginationState;
    onPageChange?: (pageIndex: number, event: PaginationEvent) => void;
    onPageLoad?: (pageIndex: number, event: PaginationEvent) => void;
    onPaginationReady?: (event: PaginationEvent) => void;
    className?: string;
    active?: 'clickable' | 'only view'; // New property to control display mode
}

export function UIPaginationContainer({
    contextId,
    pages,
    initialState = PaginationState.ACTIVE,
    onPageChange,
    onPageLoad,
    onPaginationReady,
    className,
    active = 'clickable' // Default to clickable mode
}: UIPaginationContainerProps) {
    const [context, setContext] = useState<PaginationContext | undefined>();
    const [isReady, setIsReady] = useState(false);

    // Create pagination listener
    const paginationListener: PaginationListener = {
        onPageChange: (event: PaginationEvent) => {
            setContext(paginationService.getContext(contextId));
            onPageChange?.(event.pageIndex, event);
        },
        onPageLoad: (event: PaginationEvent) => {
            onPageLoad?.(event.pageIndex, event);
        },
        onPaginationReady: (event: PaginationEvent) => {
            setIsReady(true);
            onPaginationReady?.(event);
        },
    };

    // Initialize pagination context
    useEffect(() => {
        // Register listener first, before creating context
        paginationService.addListener(contextId, paginationListener);

        const paginationContext = paginationService.createContext(contextId, pages, initialState);
        setContext(paginationContext);

        // Fallback: if ready event is missed, set ready after a short delay
        const fallbackTimer = setTimeout(() => {
            setIsReady(true);
        }, 100);

        // Cleanup on unmount
        return () => {
            clearTimeout(fallbackTimer);
            paginationService.removeListener(contextId, paginationListener);
        };
    }, [contextId, pages, initialState, paginationListener]);

    // Handle page change from UI
    const handlePageChange = useCallback((pageIndex: number) => {
        paginationService.changePage(contextId, pageIndex);
    }, [contextId]);

    // Don't render until ready
    if (!isReady || !context) {
        return null;
    }

    // Determine clickable state based on pagination state
    const clickableState = context.state !== PaginationState.DISABLED ? ClickableState.ENABLED : ClickableState.DISABLED;

    return (
        <div className={className} data-testid="uipaginationcontainer">
            <UIPaginationMini
                count={context.totalPages}
                activeIndex={context.currentPageIndex}
                onPageChange={handlePageChange}
                state={context.state}
                clickable={clickableState}
                active={active}
            />
        </div>
    );
}
