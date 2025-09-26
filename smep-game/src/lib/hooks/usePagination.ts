//TODO: make sure we need this file and take it out of this folder /hooks/usePagination.ts if this file no longer needed it can be deleted.
import { useState, useEffect, useCallback } from 'react';
import { paginationService } from '../pagination-service';
import { PaginationContext, PaginationEvent, PaginationListener, PaginationState } from '../types';

interface UsePaginationOptions {
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
}

interface UsePaginationReturn {
    context: PaginationContext | undefined;
    isReady: boolean;
    currentPageIndex: number;
    totalPages: number;
    state: PaginationState;
    changePage: (pageIndex: number) => boolean;
    updateState: (state: PaginationState) => void;
    goToNextPage: () => boolean;
    goToPreviousPage: () => boolean;
    goToFirstPage: () => boolean;
    goToLastPage: () => boolean;
}

export function usePagination({
    contextId,
    pages,
    initialState = PaginationState.ACTIVE,
    onPageChange,
    onPageLoad,
    onPaginationReady,
}: UsePaginationOptions): UsePaginationReturn {
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

    // Navigation methods
    const changePage = useCallback((pageIndex: number): boolean => {
        return paginationService.changePage(contextId, pageIndex);
    }, [contextId]);

    const updateState = useCallback((state: PaginationState): void => {
        paginationService.updateState(contextId, state);
        setContext(paginationService.getContext(contextId));
    }, [contextId]);

    const goToNextPage = useCallback((): boolean => {
        if (!context) return false;
        const nextPage = context.currentPageIndex + 1;
        return nextPage <= context.totalPages ? changePage(nextPage) : false;
    }, [context, changePage]);

    const goToPreviousPage = useCallback((): boolean => {
        if (!context) return false;
        const prevPage = context.currentPageIndex - 1;
        return prevPage >= 1 ? changePage(prevPage) : false;
    }, [context, changePage]);

    const goToFirstPage = useCallback((): boolean => {
        return changePage(1);
    }, [changePage]);

    const goToLastPage = useCallback((): boolean => {
        if (!context) return false;
        return changePage(context.totalPages);
    }, [context, changePage]);

    return {
        context,
        isReady,
        currentPageIndex: context?.currentPageIndex ?? 1,
        totalPages: context?.totalPages ?? 0,
        state: context?.state ?? initialState,
        changePage,
        updateState,
        goToNextPage,
        goToPreviousPage,
        goToFirstPage,
        goToLastPage,
    };
}
