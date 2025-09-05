import React, { useEffect, useState, useCallback } from 'react';
import { UIPaginationMini } from './UIPaginationMini';
import { paginationService } from '../../../lib/pagination-service';
import { PaginationContext, PaginationEvent, PaginationListener, PaginationState, ClickableState } from '../../../lib/types';

interface UIPaginationContainerProps {
    contextId: string;
    pages: Array<{
        id: string;
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
    const paginationListener: PaginationListener = useCallback({
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
    }, [contextId, onPageChange, onPageLoad, onPaginationReady]);

    // Initialize pagination context
    useEffect(() => {
        const paginationContext = paginationService.createContext(contextId, pages, initialState);
        setContext(paginationContext);

        // Register listener
        paginationService.addListener(contextId, paginationListener);

        // Cleanup on unmount
        return () => {
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
        <div className={className}>
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
