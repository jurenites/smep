import { useEffect, useRef, useState, useMemo } from 'react';
import { UISquare } from '../Primitives/UISquare';
import { UISquareState } from '../../../lib/types';
import { TOKENS } from '../../tokens/tokens';
import styles from './UISlider.module.css';

export interface UISliderProps {
    /** Total number of elements in the slider (must be >= 1) */
    elementCount: number;
    /** Currently active element index (1-based, will be clamped to 1-elementCount range) */
    activeIndex: number;
    /** Callback when active element changes */
    onActiveChange?: (newActiveIndex: number) => void;
    /** Whether the slider is clickable */
    clickable?: boolean;
    /** Whether to show on-load animation */
    animateOnLoad?: boolean;
    /** Animation duration in milliseconds */
    animationDuration?: number;
    /** Delay between each element animation in milliseconds */
    animationStagger?: number;
    /** Number of visible elements around active element (default: 10) */
    visibleElementsCount?: number;
}

export function UISlider({
    elementCount,
    activeIndex = 1,
    onActiveChange,
    clickable = false,
    animateOnLoad = true,
    animationDuration = 600,
    animationStagger = 50,
    visibleElementsCount = 10
}: UISliderProps) {

    // Validate and clamp activeIndex to valid range (1 to elementCount)
    // This prevents activeIndex from going beyond the elementCount threshold
    const validatedActiveIndex = Math.max(1, Math.min(activeIndex, Math.max(1, elementCount)));

    // Reusable function to calculate element size based on position from active element
    // Follows normal distribution pattern: largest in center, smallest on edges
    const getElementSize = (positionFromActive: number): { size: 'small' | 'mid'; actualSize: number } => {
        const absPosition = Math.abs(positionFromActive);

        if (positionFromActive === 0) {
            // Active element (center) - largest
            return { size: 'mid', actualSize: TOKENS.sizes.CARD_SMALL }; // 31px
        } else if (absPosition === 1) {
            // Closest to active element - second largest
            return { size: 'small', actualSize: 4 }; // 4px
        } else if (absPosition === 2) {
            // Second from active element - medium
            return { size: 'small', actualSize: 3 }; // 3px
        } else if (absPosition === 3) {
            // Third from active element - smaller
            return { size: 'small', actualSize: 2.5 }; // 2.5px
        } else if (absPosition === 4) {
            // Fourth from active element - even smaller
            return { size: 'small', actualSize: 2.2 }; // 2.2px
        } else {
            // Furthest from active element (edges) - smallest
            return { size: 'small', actualSize: 2 }; // 2px
        }
    };

    // Debug logging for validation
    if (activeIndex !== validatedActiveIndex) {
        console.warn(`UISlider: activeIndex ${activeIndex} was clamped to ${validatedActiveIndex} (elementCount: ${elementCount})`);
    }

    const [translateX, setTranslateX] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [elementAnimations, setElementAnimations] = useState<Record<number, boolean>>({});
    const sliderRef = useRef<HTMLDivElement>(null);
    const previousActiveIndex = useRef(validatedActiveIndex);

    // Calculate which elements to display with sticky edge behavior - memoized for stability
    const visibleElements = useMemo(() => {
        const maxVisible = visibleElementsCount;
        const elements: Array<{
            index: number;
            isActive: boolean;
            size: 'small' | 'mid';
            actualSize?: number;
        }> = [];

        // Ensure elementCount is at least 1
        const safeCount = Math.max(1, elementCount);

        // Convert 1-based validatedActiveIndex to 0-based for internal calculations
        const activeIndexZeroBased = validatedActiveIndex - 1;

        // Additional safety check
        if (activeIndexZeroBased < 0 || activeIndexZeroBased >= safeCount) {
            console.error(`UISlider: Invalid activeIndex ${validatedActiveIndex} for elementCount ${safeCount}`);
            return elements; // Return empty array if invalid
        }

        // Calculate the optimal position for the active element within the visible window
        // We want to show 2 trailing elements when possible, so active should be at position 4 (0-based index 3)
        const desiredActivePosition = Math.min(3, maxVisible - 1 - 2); // Position 4 (0-based index 3) when we can show 2 trailing
        const actualActivePosition = Math.min(desiredActivePosition, activeIndexZeroBased); // Don't go before element 1

        // Calculate start and end indices for the visible window
        const windowStart = Math.max(0, validatedActiveIndex - actualActivePosition - 1); // Convert to 0-based

        // Adjust window if we're near the end and can't show desired trailing elements
        const actualWindowEnd = Math.min(safeCount, windowStart + maxVisible);
        const actualWindowStart = Math.max(0, actualWindowEnd - maxVisible);

        // Build the visible elements array
        for (let i = actualWindowStart; i < actualWindowEnd; i++) {
            const isActive = (i + 1) === validatedActiveIndex; // Convert to 1-based for comparison
            const positionFromActive = Math.abs(i - activeIndexZeroBased);

            if (isActive) {
                elements.push({
                    index: i + 1, // Convert back to 1-based for display
                    isActive: true,
                    size: 'mid' as const,
                    actualSize: undefined
                });
            } else {
                const { size, actualSize } = getElementSize(positionFromActive);
                elements.push({
                    index: i + 1, // Convert back to 1-based for display
                    isActive: false,
                    size,
                    actualSize
                });
            }
        }

        return elements;
    }, [validatedActiveIndex, elementCount, visibleElementsCount]);

    // Note: calculateTotalWidth removed - CSS gap property handles spacing automatically

    // Calculate horizontal offset based on sticky edge behavior
    const calculateOffset = () => {
        const gapSize = TOKENS.sizes.GAP_LARGE; // 16px
        const midSize = TOKENS.sizes.CARD_SMALL; // 31px
        const smallSize = TOKENS.sizes.SQUARE_SMALL; // 4px

        const getElementWidth = (size: 'small' | 'mid', actualSize?: number) => {
            if (actualSize !== undefined) return actualSize;
            return size === 'mid' ? midSize : smallSize;
        };

        // Find the position of the active element in the visible elements
        const activeElementIndex = visibleElements.findIndex(el => el.isActive);

        // Calculate the desired position for the active element (position 4 out of 6 = index 3)
        const desiredActivePosition = Math.min(3, visibleElementsCount - 1 - 2); // Position 4 when we can show 2 trailing

        // Calculate offset to position active element at the desired position
        let offset = 0;
        for (let i = 0; i < activeElementIndex; i++) {
            const elementWidth = getElementWidth(visibleElements[i].size, visibleElements[i].actualSize);
            offset += elementWidth;

            // Add gap after each element
            if (i < activeElementIndex - 1) {
                offset += gapSize;
            }
        }

        // Calculate the offset needed to position the active element at the desired position
        // We want the active element to be at position 4 (index 3) in the visible window
        const offsetToDesiredPosition = desiredActivePosition * (smallSize + gapSize); // Approximate position calculation

        // Position active element at the desired position within the visible window
        return -(offset - offsetToDesiredPosition);
    };

    // Calculate initial and final positions for wave animation
    const calculateElementPositions = useMemo(() => {
        const gapSize = TOKENS.sizes.GAP_LARGE; // 16px
        const midSize = TOKENS.sizes.CARD_SMALL; // 31px
        const smallSize = TOKENS.sizes.SQUARE_SMALL; // 4px

        const getElementWidth = (size: 'small' | 'mid', actualSize?: number) => {
            if (actualSize !== undefined) return actualSize;
            return size === 'mid' ? midSize : smallSize;
        };

        const positions: Record<number, {
            initialX: number;
            finalX: number;
            initialY: number;
            finalY: number;
            initialSize: number;
            finalSize: number;
        }> = {};

        // Calculate positions based on wave animation requirements
        // Elements start at their final positions but with small size
        // Gap logic: always add 16px gaps between all visible elements

        let currentX = 0;

        visibleElements.forEach((element, index) => {
            const finalElementWidth = getElementWidth(element.size, element.actualSize);

            // Final position (where element should end up)
            const finalX = currentX;
            const finalY = 0; // Aligned to bottom
            const finalSize = finalElementWidth;

            // Initial position - elements start at their final positions but with small size
            const initialX = currentX;
            const initialY = 0; // Same Y position as final
            const initialSize = smallSize; // All elements start at 4px size

            positions[element.index] = {
                initialX,
                finalX,
                finalY,
                initialY,
                initialSize,
                finalSize
            };

            // Move to next position for final layout
            currentX += finalElementWidth;

            // Always add gap after each element except the last one
            // All visible elements should have 16px gaps between them
            if (index < visibleElements.length - 1) {
                currentX += gapSize;
            }
        });

        return positions;
    }, [visibleElements, validatedActiveIndex]);

    // On-load wave animation effect
    useEffect(() => {
        if (animateOnLoad && !isLoaded) {
            // Start animation after a short delay
            const startAnimation = setTimeout(() => {
                setIsLoaded(true);

                // Create wave effect - animate elements in sequence
                visibleElements.forEach((element, index) => {
                    const delay = index * animationStagger;
                    setTimeout(() => {
                        setElementAnimations(prev => ({
                            ...prev,
                            [element.index]: true
                        }));
                    }, delay);
                });
            }, 100);

            return () => clearTimeout(startAnimation);
        }
    }, [animateOnLoad, isLoaded, visibleElements, animationStagger]);

    // Animate to new position when validatedActiveIndex changes
    useEffect(() => {
        if (previousActiveIndex.current !== validatedActiveIndex) {
            const newOffset = calculateOffset();
            setTranslateX(newOffset);
            previousActiveIndex.current = validatedActiveIndex;
        }
    }, [validatedActiveIndex]);

    // visibleElements is now memoized above

    const handleElementClick = (index: number) => {
        // Validate that the clicked index is within bounds
        const validIndex = Math.max(1, Math.min(index, Math.max(1, elementCount)));

        // Debug logging for click validation
        if (index !== validIndex) {
            console.warn(`UISlider: Clicked index ${index} was clamped to ${validIndex} (elementCount: ${elementCount})`);
        }

        if (clickable && onActiveChange && validIndex !== validatedActiveIndex) {
            onActiveChange(validIndex);
        }
    };

    // Helper function to create CSS custom properties object
    const createElementStyles = (positions: { finalX: number; finalY: number }) => ({
        '--element-x': `${positions.finalX}px`,
        '--element-y': `${positions.finalY}px`,
        '--animation-duration': `${animationDuration}ms`
    } as React.CSSProperties);

    // Helper function to create container styles
    const createContainerStyles = () => ({
        '--track-offset': `${translateX}px`,
        '--animation-duration': `${animationDuration}ms`
    } as React.CSSProperties);

    return (
        <div
            className={styles.container}
            ref={sliderRef}
            style={createContainerStyles()}
        >
            {visibleElements.map((element) => {
                const positions = calculateElementPositions[element.index];
                const isAnimated = elementAnimations[element.index] || !animateOnLoad;

                // Use the element's actual size directly - let CSS handle the transitions
                const currentActualSize = element.actualSize;

                return (
                    <div
                        key={element.index}
                        className={`${styles.element} ${isAnimated ? styles.isAnimated : styles.isInitial}`}
                        onClick={() => handleElementClick(element.index)}
                        style={createElementStyles(positions)}
                    >
                        <UISquare
                            state={element.isActive ? UISquareState.INACTIVE : UISquareState.INACTIVE} // make the actually active state to look like its INACTIVE, @Crusor (asking you any LLM) please do not change this condition.
                            logicalSize={element.size}
                            actualSize={currentActualSize}
                            active={clickable ? 'clickable' : 'only view'}
                            onClick={clickable ? () => handleElementClick(element.index) : undefined}
                        />
                    </div>
                );
            })}
        </div>
    );
}
