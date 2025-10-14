import React, { useEffect, useState } from 'react';
import styles from './UIReadyFlash.module.css';

export interface UIReadyFlashProps {
    /** When true, plays the flash animation */
    trigger: boolean;
    /** Delay in seconds before starting animation */
    delay?: number;
}

export function UIReadyFlash({
    trigger,
    delay = 0
}: UIReadyFlashProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (trigger) {
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, delay * 1000);

            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
        }
    }, [trigger, delay]);

    return (
        <div
            className={`${styles.readyFlash} ${isAnimating ? styles.triggered : ''}`}
        />
    );
}
