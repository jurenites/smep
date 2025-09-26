import React, { useState, useEffect, useRef } from 'react';
import { UILabel } from '../Text/UILabel';
import { UIProgressBar } from './UIProgressBar';
import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from './UISquare';
import styles from './UIButton.module.css';

export enum ButtonState {
    ENABLED = 'enabled',
    DISABLED = 'disabled',
    HOVER = 'hover',
    FOCUSED = 'focused',
    PRESSED = 'pressed',
    PROGRESS = 'progress',
    DONE = 'done',
    HOLD = 'hold',
}
export type ButtonStyle = 'filled' | 'outlined';

export interface UIButtonProps {
    /** Button text content */
    children: React.ReactNode;
    /** Button state */
    state?: ButtonState;
    /** Button style */
    buttonStyle?: ButtonStyle;
    /** Click handler */
    onClick?: () => void;
    /** Progress duration in milliseconds (for progress state) */
    progressDuration?: number;
    /** Hold duration in milliseconds (for hold state, default 2000ms) */
    holdDuration?: number;
    /** Completion handler (called when progress completes) */
    onComplete?: () => void;
    /** Optional CSS class name */
    className?: string;
    /** Whether the button is focusable */
    focusable?: boolean;
    /** Loading text to display during progress */
    loadingText?: string;
    /** Done text to display when completed */
    doneText?: string;
    /** Hold text to display during hold state */
    holdText?: string;
}

export function UIButton({
    children,
    state = 'enabled',
    buttonStyle = 'filled',
    onClick,
    progressDuration = 30000, // 30 seconds default
    holdDuration = 2000, // 2 seconds default
    onComplete,
    className = '',
    focusable = true,
    loadingText = 'Loading...',
    doneText = 'Done',
    holdText = 'Hold'
}: UIButtonProps) {
    const [internalState, setInternalState] = useState<ButtonState>(state);
    const [progress, setProgress] = useState(0);
    const [isPressed, setIsPressed] = useState(false);
    const [pressStartTime, setPressStartTime] = useState<number | null>(null);
    const [isHolding, setIsHolding] = useState(false);
    const [holdStartTime, setHoldStartTime] = useState<number | null>(null);

    const pressTimerRef = useRef<number | null>(null);
    const progressTimerRef = useRef<number | null>(null);
    const holdTimerRef = useRef<number | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Sync internal state with prop changes
    useEffect(() => {
        setInternalState(state);
    }, [state]);

    // Handle pressed state with hold-to-complete functionality
    useEffect(() => {
        // TODO: fix the pressed state when button bevcome wider for abrief moment 
        if (isPressed && internalState === 'pressed') {
            setPressStartTime(Date.now());

            const updateProgress = () => {
                const elapsed = Date.now() - (pressStartTime || Date.now());
                const progressPercent = Math.min((elapsed / 2000) * 100, 100); // 2 seconds to complete
                setProgress(progressPercent);

                if (progressPercent >= 100) {
                    // Press completed - trigger completion
                    setIsPressed(false);
                    setProgress(0);
                    onClick?.();
                } else {
                    pressTimerRef.current = requestAnimationFrame(updateProgress);
                }
            };

            pressTimerRef.current = requestAnimationFrame(updateProgress);
        } else if (!isPressed) {
            // Reset progress when not pressed
            if (pressTimerRef.current) {
                cancelAnimationFrame(pressTimerRef.current);
                pressTimerRef.current = null;
            }
            setProgress(0);
            setPressStartTime(null);
        }

        return () => {
            if (pressTimerRef.current) {
                cancelAnimationFrame(pressTimerRef.current);
            }
        };
    }, [isPressed, internalState, pressStartTime, onClick]);

    // Handle progress state with fixed duration
    useEffect(() => {
        if (internalState === 'progress') {
            setProgress(0);

            const startTime = Date.now();
            const updateProgress = () => {
                const elapsed = Date.now() - startTime;
                const progressPercent = Math.min((elapsed / progressDuration) * 100, 100);
                setProgress(progressPercent);

                if (progressPercent >= 100) {
                    // Progress completed
                    setInternalState('done');
                    onComplete?.();
                } else {
                    progressTimerRef.current = requestAnimationFrame(updateProgress);
                }
            };

            progressTimerRef.current = requestAnimationFrame(updateProgress);
        }

        return () => {
            if (progressTimerRef.current) {
                cancelAnimationFrame(progressTimerRef.current);
            }
        };
    }, [internalState, progressDuration, onComplete]);

    // Handle hold progress animation
    useEffect(() => {
        if (isHolding && holdStartTime) {
            const updateHoldProgress = () => {
                const elapsed = Date.now() - holdStartTime;
                const progressPercent = Math.min((elapsed / holdDuration) * 100, 100);
                setProgress(progressPercent);

                if (progressPercent >= 100) {
                    // Hold completed - trigger action
                    setIsHolding(false);
                    setProgress(0);
                    setHoldStartTime(null);
                    onClick?.();
                } else {
                    holdTimerRef.current = requestAnimationFrame(updateHoldProgress);
                }
            };

            holdTimerRef.current = requestAnimationFrame(updateHoldProgress);
        }

        return () => {
            if (holdTimerRef.current) {
                cancelAnimationFrame(holdTimerRef.current);
            }
        };
    }, [isHolding, holdStartTime, holdDuration, onClick]);

    const handleMouseDown = () => {
        if (internalState === 'enabled' || internalState === 'disabled') {
            setIsPressed(true);
        } else if (internalState === 'hold') {
            // Start holding
            setIsHolding(true);
            setHoldStartTime(Date.now());
            setProgress(0);
        }
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        if (internalState === 'hold' && isHolding) {
            // Stop holding - reset progress
            setIsHolding(false);
            setProgress(0);
            setHoldStartTime(null);
        }
    };

    const handleMouseLeave = () => {
        setIsPressed(false);
        if (internalState === 'hold' && isHolding) {
            // Stop holding - reset progress
            setIsHolding(false);
            setProgress(0);
            setHoldStartTime(null);
        }
    };

    const handleClick = () => {
        if (internalState === 'enabled') {
            if (state === 'progress') {
                setInternalState('progress');
            } else {
                onClick?.();
            }
        }
    };

    const getButtonText = () => {
        switch (internalState) {
            case 'progress':
                return loadingText;
            case 'done':
                return doneText;
            case 'hold':
                return holdText;
            default:
                return children;
        }
    };

    const getProgressPercentage = () => {
        if (internalState === 'progress') {
            return Math.round(progress);
        }
        // For hold state, don't show percentage (as requested)
        return null;
    };

    const isProgressVisible = internalState === 'pressed' || internalState === 'progress' || (internalState === 'hold' && isHolding);

    return (
        <button
            ref={buttonRef}
            className={`${styles.uiButton} ${styles[`style${buttonStyle.charAt(0).toUpperCase() + buttonStyle.slice(1)}`]} ${(internalState === 'progress' || internalState === 'done') ? styles[`state${internalState.charAt(0).toUpperCase() + internalState.slice(1)}`] : ''} ${className}`}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            disabled={internalState === 'disabled' || internalState === 'done' || internalState === 'progress'}
            tabIndex={focusable ? 0 : -1}
            type="button"
        >
            {/* Progress bar background */}
            {isProgressVisible && (
                <div className={styles.progressContainer}>
                    <UIProgressBar
                        progress={progress / 100}
                        logicalSize="mid"
                        fillColor={internalState === 'hold' ? TOKENS.colors.gray : TOKENS.colors.white}
                        state={UISquareState.ACTIVE}
                        fullWidth={true}
                    />
                </div>
            )}

            {/* Button content */}
            <div className={styles.buttonContent}>
                <UILabel
                    fontVariant="digitBig"
                    className={styles.buttonText}
                >
                    {getButtonText()}
                </UILabel>

                {/* Progress percentage */}
                {internalState === 'progress' && (
                    <UILabel
                        fontVariant="digitSmall"
                        className={styles.progressPercentage}
                    >
                        {getProgressPercentage()}%
                    </UILabel>
                )}
            </div>
        </button>
    );
}
