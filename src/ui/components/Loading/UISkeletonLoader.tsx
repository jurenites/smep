import React, { useEffect, useState } from 'react';
import { UIReadyFlash } from './UIReadyFlash';
import styles from './UISkeletonLoader.module.css';

export type AnimationDuration = 'immediate' | 'fast' | 'slow';

export interface UISkeletonLoaderProps {
    /** Whether content is still loading */
    isLoading: boolean;
    /** Skeleton placeholder to show while loading */
    skeleton: React.ReactNode;
    /** Actual content to show when loaded */
    children: React.ReactNode;
    /** Animation duration for reveal effect */
    animationDuration?: AnimationDuration;
    /** Delay in seconds before revealing this item (for staggered effects) */
    staggerDelay?: number;
    /** Whether to show the "ready to interact" flash animation */
    showReadyFlash?: boolean;
    /** Optional CSS class name */
    className?: string;
}

export function UISkeletonLoader({
    isLoading,
    skeleton,
    children,
    animationDuration = 'fast',
    staggerDelay = 0,
    showReadyFlash = false,
    className = ''
}: UISkeletonLoaderProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            // Apply stagger delay before revealing
            const revealTimer = setTimeout(() => {
                setIsRevealed(true);

                // Trigger flash animation after reveal completes
                if (showReadyFlash) {
                    const flashTimer = setTimeout(() => {
                        setShowFlash(true);
                    }, getAnimationDuration(animationDuration) * 1000);

                    return () => clearTimeout(flashTimer);
                }
            }, staggerDelay * 1000);

            return () => clearTimeout(revealTimer);
        } else {
            setIsRevealed(false);
            setShowFlash(false);
        }
    }, [isLoading, staggerDelay, animationDuration, showReadyFlash]);

    const getAnimationDuration = (duration: AnimationDuration): number => {
        switch (duration) {
            case 'immediate': return 0;
            case 'fast': return 0.1;
            case 'slow': return 0.3;
            default: return 0.1;
        }
    };

    const contentClasses = [
        styles.content,
        isRevealed ? styles.revealed : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.container}>
            {isLoading && (
                <div className={styles.skeleton}>
                    {skeleton}
                </div>
            )}

            <div className={contentClasses}>
                {children}
            </div>

            {showReadyFlash && (
                <UIReadyFlash
                    trigger={showFlash}
                    delay={0}
                />
            )}
        </div>
    );
}
