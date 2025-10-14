import styles from './UIGlareAnimation.module.css';

export interface UIGlareAnimationProps {
    /** Whether the glare animation is active */
    isActive: boolean;
    /** Animation speed variant */
    speed?: 'slow' | 'normal' | 'fast';
    /** Whether the animation is paused (e.g., when tab is active) */
    isPaused?: boolean;
    /** Whether the animation should be disabled (e.g., when notification is read) */
    isDisabled?: boolean;
    /** Optional CSS class name */
    className?: string;
}

/**
 * UIGlareAnimation - Creates a vertical glare effect that moves from bottom to top
 * 
 * This component creates a subtle yellow gradient that sweeps vertically across
 * UI elements to draw attention, similar to the effect seen in Citizen Sleeper.
 * 
 * Features:
 * - Moves from 0 to 100% opacity in yolk color
 * - Sweeps vertically from bottom to top
 * - Automatically pauses when element becomes active
 * - Supports different animation speeds
 * - Respects reduced motion preferences
 */
export function UIGlareAnimation({
    isActive,
    speed = 'fast',
    isPaused = false,
    isDisabled = false,
    className = ''
}: UIGlareAnimationProps) {
    // Don't render if not active or disabled
    if (!isActive || isDisabled) {
        return null;
    }

    // Build CSS classes
    const cssClasses = [
        styles.glareEffect,
        speed !== 'normal' ? styles[speed] : '',
        isPaused ? styles.paused : '',
        className
    ].filter(Boolean).join(' ');

    return <div className={cssClasses} />;
}
