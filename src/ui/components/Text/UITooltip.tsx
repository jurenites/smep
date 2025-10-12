import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { UIBadge } from './UIBadge';
import styles from './UITooltip.module.css';

export interface UITooltipProps {
    /** Content to display in tooltip */
    content: string;
    /** Element that triggers the tooltip */
    children: ReactNode;
    /** Delay before showing tooltip in milliseconds */
    delay?: number;
    /** Tooltip position */
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export function UITooltip({
    content,
    children,
    delay = 1000,
    position = 'top'
}: UITooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className={styles.tooltipContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isVisible && (
                <UIBadge
                    labelColor="gray"
                    badgeColor="dark-gray"
                    variant="outline"
                    className={`${styles.tooltip} ${styles[`tooltip-${position}`]}`}
                >
                    {content}
                </UIBadge>
            )}
        </div>
    );
}

