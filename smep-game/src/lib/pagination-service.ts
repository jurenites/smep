import type { PaginationContext, PaginationEvent, PaginationListener, PaginationPage } from './types';
import { PaginationState } from './types';

// Pagination Service - Manages pagination contexts and events
class PaginationService {
    private contexts: Map<string, PaginationContext> = new Map();
    private listeners: Map<string, PaginationListener[]> = new Map();
    private eventHistory: PaginationEvent[] = [];

    // Create or update a pagination context
    createContext(
        contextId: string,
        pages: Omit<PaginationPage, 'isActive'>[],
        initialState: PaginationState = PaginationState.ACTIVE
    ): PaginationContext {
        // Ensure at least one page is available and active
        const availablePages = pages.filter(page =>
            page.state === PaginationState.ACTIVE || page.state === PaginationState.INACTIVE
        );

        let activePageIndex = 0; // Default to first page

        if (availablePages.length > 0) {
            // Find the first available page to make active
            activePageIndex = pages.findIndex(page =>
                page.state === PaginationState.ACTIVE || page.state === PaginationState.INACTIVE
            );
        } else {
            console.warn(`No available pages found for context '${contextId}'. Making first page active by default.`);
        }

        const paginationPages: PaginationPage[] = pages.map((page, index) => ({
            ...page,
            index: index + 1,
            isActive: index === activePageIndex,
        }));

        const context: PaginationContext = {
            id: contextId,
            pages: paginationPages,
            currentPageIndex: activePageIndex + 1, // 1-based index
            totalPages: paginationPages.length,
            state: initialState,
        };

        this.contexts.set(contextId, context);

        // Emit pagination ready event
        this.emitEvent({
            type: 'PAGINATION_READY',
            contextId,
            pageIndex: activePageIndex + 1,
            timestamp: Date.now(),
        });

        return context;
    }

    // Get a pagination context
    getContext(contextId: string): PaginationContext | undefined {
        return this.contexts.get(contextId);
    }

    // Change to a specific page
    changePage(contextId: string, pageIndex: number): boolean {
        const context = this.contexts.get(contextId);
        if (!context) {
            console.warn(`Pagination context '${contextId}' not found`);
            return false;
        }

        if (pageIndex < 1 || pageIndex > context.totalPages) {
            console.warn(`Invalid page index: ${pageIndex} for context '${contextId}'`);
            return false;
        }

        const targetPage = context.pages.find(page => page.index === pageIndex);
        if (!targetPage || targetPage.state === PaginationState.UNAVAILABLE) {
            console.warn(`Page ${pageIndex} is not available in context '${contextId}' (state: ${targetPage?.state})`);
            return false;
        }

        // Debug: Log the state change
        // console.log(`Pagination: Changing from page ${context.currentPageIndex} to page ${pageIndex} in context '${contextId}'`);

        // Update context
        const updatedPages = context.pages.map(page => ({
            ...page,
            isActive: page.index === pageIndex,
        }));

        const updatedContext: PaginationContext = {
            ...context,
            pages: updatedPages,
            currentPageIndex: pageIndex,
        };

        this.contexts.set(contextId, updatedContext);

        // Debug: Log the updated state
        // console.log(`Pagination: Updated context '${contextId}' - Active pages:`,
        updatedPages.filter(p => p.isActive).map(p => p.index));

        // Emit page changed event
        this.emitEvent({
            type: 'PAGE_CHANGED',
            contextId,
            pageIndex,
            timestamp: Date.now(),
            metadata: {
                previousPage: context.currentPageIndex,
                pageTitle: targetPage.title,
            },
        });

        return true;
    }

    // Update pagination state
    updateState(contextId: string, state: PaginationState): void {
        const context = this.contexts.get(contextId);
        if (!context) {
            console.warn(`Pagination context '${contextId}' not found`);
            return;
        }

        const updatedContext: PaginationContext = {
            ...context,
            state,
        };

        this.contexts.set(contextId, updatedContext);
    }

    // Ensure there's always an active page
    private ensureActivePage(contextId: string): void {
        const context = this.contexts.get(contextId);
        if (!context) return;

        const hasActivePage = context.pages.some(page => page.isActive);

        if (!hasActivePage) {
            // Find the first available page to make active
            const firstAvailablePageIndex = context.pages.findIndex(page =>
                page.state === PaginationState.ACTIVE || page.state === PaginationState.INACTIVE
            );

            if (firstAvailablePageIndex !== -1) {
                // Make the first available page active
                const updatedPages = context.pages.map((page, index) => ({
                    ...page,
                    isActive: index === firstAvailablePageIndex,
                }));

                const updatedContext: PaginationContext = {
                    ...context,
                    pages: updatedPages,
                    currentPageIndex: firstAvailablePageIndex + 1,
                };

                this.contexts.set(contextId, updatedContext);
                console.warn(`No active page found for context '${contextId}'. Made page ${firstAvailablePageIndex + 1} active.`);
            } else {
                // If no available pages, make the first page active regardless of state
                const updatedPages = context.pages.map((page, index) => ({
                    ...page,
                    isActive: index === 0,
                }));

                const updatedContext: PaginationContext = {
                    ...context,
                    pages: updatedPages,
                    currentPageIndex: 1,
                };

                this.contexts.set(contextId, updatedContext);
                console.warn(`No available pages found for context '${contextId}'. Made first page active.`);
            }
        }
    }

    // Update page states and ensure there's always an active page
    updatePageStates(contextId: string, pageUpdates: Array<{ index: number; state: PaginationState }>): void {
        const context = this.contexts.get(contextId);
        if (!context) {
            console.warn(`Pagination context '${contextId}' not found`);
            return;
        }

        // Apply updates
        const updatedPages = context.pages.map(page => {
            const update = pageUpdates.find(u => u.index === page.index);
            return update ? { ...page, state: update.state } : page;
        });

        const updatedContext: PaginationContext = {
            ...context,
            pages: updatedPages,
        };

        this.contexts.set(contextId, updatedContext);

        // Ensure there's still an active page after updates
        this.ensureActivePage(contextId);
    }

    // Register a listener for a specific context
    addListener(contextId: string, listener: PaginationListener): void {
        if (!this.listeners.has(contextId)) {
            this.listeners.set(contextId, []);
        }
        this.listeners.get(contextId)!.push(listener);
    }

    // Remove a listener
    removeListener(contextId: string, listener: PaginationListener): void {
        const contextListeners = this.listeners.get(contextId);
        if (contextListeners) {
            const index = contextListeners.indexOf(listener);
            if (index > -1) {
                contextListeners.splice(index, 1);
            }
        }
    }

    // Emit an event to all listeners
    private emitEvent(event: PaginationEvent): void {
        this.eventHistory.push(event);

        // Keep only last 100 events
        if (this.eventHistory.length > 100) {
            this.eventHistory = this.eventHistory.slice(-100);
        }

        const contextListeners = this.listeners.get(event.contextId);
        if (contextListeners) {
            contextListeners.forEach(listener => {
                try {
                    switch (event.type) {
                        case 'PAGE_CHANGED':
                            listener.onPageChange(event);
                            break;
                        case 'PAGE_LOADED':
                            listener.onPageLoad?.(event);
                            break;
                        case 'PAGINATION_READY':
                            listener.onPaginationReady?.(event);
                            break;
                    }
                } catch (error) {
                    console.error('Error in pagination listener:', error);
                }
            });
        }
    }

    // Get event history for debugging
    getEventHistory(contextId?: string): PaginationEvent[] {
        if (contextId) {
            return this.eventHistory.filter(event => event.contextId === contextId);
        }
        return [...this.eventHistory];
    }

    // Clear all contexts and listeners (useful for testing)
    clear(): void {
        this.contexts.clear();
        this.listeners.clear();
        this.eventHistory = [];
    }
}

// Export singleton instance
export const paginationService = new PaginationService();
