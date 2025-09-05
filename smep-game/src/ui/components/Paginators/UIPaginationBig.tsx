import { TOKENS } from '../../tokens/tokens';
import { PaginationState, UISquareState, ClickableState } from '../../../lib/types';
import { UIRectangleSmall } from '../Primitives/UIRectangleSmall';

interface UIPaginationBigProps {
    count: number;
    activeIndex?: number; // Optional with default value
    onPageChange?: (index: number) => void; // Returns 1-based index
    state?: PaginationState; // State property
    clickable?: ClickableState; // Clickable property using enum
    elementStates?: UISquareState[]; // Optional array to override individual element states
}

// Big paginator component with 17x4 proportions (horizontal layout)
export function UIPaginationBig({
    count,
    activeIndex = 1, // Default to first page
    onPageChange,
    state = PaginationState.ACTIVE, // Default to active state
    clickable = ClickableState.ENABLED, // Default to enabled
    elementStates // Optional array to override individual element states
}: UIPaginationBigProps) {
    const sizes = TOKENS.sizes;
    const items = Array.from({ length: count });

    // Determine if individual rectangles are clickable based on paginator state and clickable property
    const isRectangleClickable = clickable === ClickableState.ENABLED && !!onPageChange && state !== PaginationState.DISABLED;

    // Calculate gap for big paginator
    const gap = sizes.BIG_PAGINATOR_GAP;

    return (
        <div style={{ display: 'flex', gap, flexDirection: 'row' }} data-testid="uipaginationbig">
            {items.map((_, i) => {
                const pageNumber = i + 1; // Convert 0-based index to 1-based page number
                const currentActiveIndex = activeIndex || 1; // Ensure we have a valid active index
                const isActive = pageNumber === currentActiveIndex;

                // Map pagination state to rectangle state
                const getRectangleState = (): UISquareState => {
                    // Check if we have an override state for this specific element
                    if (elementStates && elementStates[i] !== undefined) {
                        return elementStates[i];
                    }

                    // Fall back to default state logic
                    if (state === PaginationState.DISABLED) return UISquareState.DISABLED;
                    if (state === PaginationState.UNAVAILABLE) return UISquareState.DISABLED;

                    // For ACTIVE and INACTIVE pagination states
                    if (isActive) return UISquareState.ACTIVE;
                    return UISquareState.INACTIVE;
                };

                return (
                    <UIRectangleSmall
                        key={i}
                        state={getRectangleState()}
                        onClick={isRectangleClickable ? () => {
                            console.log(`UIPaginationBig: Clicked on page ${pageNumber}, current active: ${currentActiveIndex}`);
                            onPageChange?.(pageNumber);
                        } : undefined}
                    />
                );
            })}
        </div>
    );
}
