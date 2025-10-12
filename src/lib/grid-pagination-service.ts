import type {
    GridPaginationContext,
    GridPaginationEvent,
    GridPosition,
    GridPage
} from './types';
import { PaginationState } from './types';

// Re-export PaginationState for external use
export { PaginationState } from './types';

// Grid Pagination Service - Manages 2D grid pagination contexts and events
class GridPaginationService {
    private contexts: Map<string, GridPaginationContext> = new Map();
    private listeners: Map<string, any[]> = new Map();
    private eventHistory: GridPaginationEvent[] = [];

    // Create or update a grid pagination context
    createContext(
        contextId: string,
        pages: Omit<GridPage, 'isActive'>[],
        gridDimensions: { width: number; height: number },
        initialState: PaginationState = PaginationState.ACTIVE,
        navigationRules?: GridPaginationContext['navigationRules']
    ): GridPaginationContext {
        // Ensure at least one page is available and active
        const availablePages = pages.filter(page =>
            page.state === PaginationState.ACTIVE || page.state === PaginationState.INACTIVE
        );

        let activePosition: GridPosition = { x: 0, y: 0 };

        if (availablePages.length > 0) {
            // Find the first available page to make active
            const firstAvailablePage = availablePages[0];
            activePosition = firstAvailablePage.position;
        } else {
            console.warn(`No available pages found for grid context '${contextId}'. Making first page active by default.`);
        }

        const gridPages: GridPage[] = pages.map(page => ({
            ...page,
            isActive: page.position.x === activePosition.x && page.position.y === activePosition.y,
        }));

        const context: GridPaginationContext = {
            id: contextId,
            pages: gridPages,
            currentPosition: activePosition,
            gridDimensions,
            state: initialState,
            navigationRules,
        };

        this.contexts.set(contextId, context);

        // Emit pagination ready event
        this.emitEvent({
            type: 'PAGINATION_READY',
            contextId,
            pageIndex: 1,
            timestamp: Date.now(),
            position: activePosition,
        });

        return context;
    }

    // Get context by ID
    getContext(contextId: string): GridPaginationContext | undefined {
        return this.contexts.get(contextId);
    }

    // Change to a specific position
    changePosition(contextId: string, position: GridPosition): boolean {
        const context = this.contexts.get(contextId);
        if (!context) {
            console.warn(`Grid pagination context '${contextId}' not found`);
            return false;
        }

        const targetPage = context.pages.find(page =>
            page.position.x === position.x && page.position.y === position.y
        );

        if (!targetPage || targetPage.state === PaginationState.UNAVAILABLE) {
            console.warn(`Page at position (${position.x}, ${position.y}) is not available in context '${contextId}'`);
            return false;
        }

        // Update context
        const updatedPages = context.pages.map(page => ({
            ...page,
            isActive: page.position.x === position.x && page.position.y === position.y,
        }));

        const updatedContext: GridPaginationContext = {
            ...context,
            pages: updatedPages,
            currentPosition: position,
        };

        this.contexts.set(contextId, updatedContext);

        // Emit page changed event
        this.emitEvent({
            type: 'PAGE_CHANGED',
            contextId,
            pageIndex: 1, // Not used in grid context
            timestamp: Date.now(),
            position,
            metadata: {
                previousPosition: context.currentPosition,
                pageTitle: targetPage.title,
                pageMetadata: targetPage.metadata,
            },
        });

        return true;
    }

    // Navigate in a specific direction
    navigate(contextId: string, direction: 'up' | 'down' | 'left' | 'right'): boolean {
        const context = this.contexts.get(contextId);
        if (!context) {
            console.warn(`Grid pagination context '${contextId}' not found`);
            return false;
        }

        let nextPosition: GridPosition | null = null;

        // Use custom navigation if provided
        if (context.navigationRules?.customNavigation) {
            nextPosition = context.navigationRules.customNavigation(context.currentPosition, direction);
        } else {
            // Default grid navigation
            nextPosition = this.getDefaultNextPosition(context, direction);
        }

        if (nextPosition) {
            return this.changePosition(contextId, nextPosition);
        }

        return false;
    }

    // Get default next position for grid navigation
    private getDefaultNextPosition(context: GridPaginationContext, direction: 'up' | 'down' | 'left' | 'right'): GridPosition | null {
        const { currentPosition, gridDimensions, pages } = context;
        let nextPosition: GridPosition;

        switch (direction) {
            case 'up':
                nextPosition = { x: currentPosition.x, y: currentPosition.y - 1 };
                break;
            case 'down':
                nextPosition = { x: currentPosition.x, y: currentPosition.y + 1 };
                break;
            case 'left':
                nextPosition = { x: currentPosition.x - 1, y: currentPosition.y };
                break;
            case 'right':
                nextPosition = { x: currentPosition.x + 1, y: currentPosition.y };
                break;
        }

        // Check if position is within grid bounds
        if (nextPosition.x < 0 || nextPosition.x >= gridDimensions.width ||
            nextPosition.y < 0 || nextPosition.y >= gridDimensions.height) {
            return null;
        }

        // Check if position has a valid page
        const targetPage = pages.find(page =>
            page.position.x === nextPosition.x && page.position.y === nextPosition.y
        );

        if (!targetPage || targetPage.state === PaginationState.UNAVAILABLE) {
            return null;
        }

        return nextPosition;
    }

    // Update pagination state
    updateState(contextId: string, state: PaginationState): void {
        const context = this.contexts.get(contextId);
        if (!context) {
            console.warn(`Grid pagination context '${contextId}' not found`);
            return;
        }

        const updatedContext: GridPaginationContext = {
            ...context,
            state,
        };

        this.contexts.set(contextId, updatedContext);
    }

    // Event system
    private emitEvent(event: GridPaginationEvent): void {
        this.eventHistory.push(event);
        const listeners = this.listeners.get(event.contextId) || [];
        listeners.forEach(listener => {
            if (listener.onPageChange && event.type === 'PAGE_CHANGED') {
                listener.onPageChange(event);
            }
            if (listener.onPaginationReady && event.type === 'PAGINATION_READY') {
                listener.onPaginationReady(event);
            }
        });
    }

    // Add listener
    addListener(contextId: string, listener: any): void {
        const listeners = this.listeners.get(contextId) || [];
        listeners.push(listener);
        this.listeners.set(contextId, listeners);
    }

    // Remove listener
    removeListener(contextId: string, listener: any): void {
        const listeners = this.listeners.get(contextId) || [];
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
            this.listeners.set(contextId, listeners);
        }
    }
}

// Export singleton instance
export const gridPaginationService = new GridPaginationService();
