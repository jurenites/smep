import React, { useState, useEffect, useRef } from 'react';
import { UILabel } from '../Text/UILabel';
import { UIProgressBar } from './UIProgressBar';
// import { ValueDisplay } from '../Text/ValueDisplay'; // Temporarily commented out
import { TOKENS } from '../../tokens/tokens';
import { UISquareState } from './UISquare';
import { getNestedTranslation } from '../../../lib/data/translations';
import styles from './UIButton.module.css';

export enum ButtonState {
    HOLD = 'hold',        // Button type that requires holding with progress bar
    PROGRESS = 'progress', // Button that shows progress over time
    DONE = 'done',        // Button that has completed its action
}
export enum ButtonStyle {
    FILLED = 'filled',
    OUTLINED = 'outlined',
}

export enum ButtonSize {
    SMALL = 'small',  // Fixed width: 31px
    BIG = 'big',      // Min-width: 175px
}

export interface UIButtonProps {
    /** Button text content */
    buttonText: React.ReactNode;
    /** Button logical state (hold, progress, done) */
    buttonState?: ButtonState;
    /** Button style */
    buttonStyle?: ButtonStyle;
    /** Button size */
    buttonSize?: ButtonSize;
    /** Click handler */
    onClick?: () => void;
    /** Whether the button is disabled */
    isDisabled?: boolean;
    /** Progress duration in milliseconds (for progress state) */
    progressDuration?: number;
    /** Hold duration in milliseconds (for hold state, default 2000ms) */
    holdDuration?: number;
    /** Completion handler (called when progress completes) */
    onComplete?: () => void;
    /** Optional CSS class name */
    className?: string;
    /** Loading text to display during progress */
    loadingText?: string;
    /** Done text to display when completed */
    doneText?: string;
    /** Hold text to display during hold state */
    holdText?: string;
}

export function UIButton({
    buttonText,
    buttonState,
    buttonStyle = ButtonStyle.FILLED,
    buttonSize = ButtonSize.BIG,
    onClick,
    isDisabled = false,
    progressDuration = 5000, // 5 seconds default
    holdDuration = 2000, // 2 seconds default
    onComplete,
    className = '',
    loadingText = getNestedTranslation('button.loading'),
    doneText = getNestedTranslation('button.done'),
    holdText = getNestedTranslation('button.hold')
}: UIButtonProps) {
    const [internalState, setInternalState] = useState<ButtonState | undefined>(buttonState);
    const [progress, setProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const [holdStartTime, setHoldStartTime] = useState<number | null>(null);
    const [isProgressRunning, setIsProgressRunning] = useState(false);

    const progressTimerRef = useRef<number | null>(null);
    const holdTimerRef = useRef<number | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Sync internal state with prop changes
    useEffect(() => {
        setInternalState(buttonState);
    }, [buttonState]);

    // No more pressed state logic - handled by CSS :active

    // Handle progress state with fixed duration - only when actively running
    useEffect(() => {
        if (internalState === 'progress' && isProgressRunning) {
            setProgress(0);

            const startTime = Date.now();
            const updateProgress = () => {
                const elapsed = Date.now() - startTime;
                const progressPercent = Math.min((elapsed / progressDuration) * 100, 100);
                setProgress(progressPercent);

                if (progressPercent >= 100) {
                    // Progress completed
                    setInternalState(ButtonState.DONE);
                    setIsProgressRunning(false);
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
    }, [internalState, isProgressRunning, progressDuration, onComplete]);

    // Handle hold progress animation
    useEffect(() => {
        if (isHolding && holdStartTime) {
            const updateHoldProgress = () => {
                const elapsed = Date.now() - holdStartTime;
                const progressPercent = Math.min((elapsed / holdDuration) * 100, 100);
                setProgress(progressPercent);

                if (progressPercent >= 100) {
                    // Hold completed - transition to done state
                    setIsHolding(false);
                    setProgress(0);
                    setHoldStartTime(null);
                    setInternalState(ButtonState.DONE);
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
        if (internalState === 'hold' && !isDisabled) {
            // Start holding
            setIsHolding(true);
            setHoldStartTime(Date.now());
            setProgress(0);
        }
        // Disabled buttons cannot be pressed - no action taken
    };

    const handleMouseUp = () => {
        if (internalState === 'hold' && isHolding) {
            // Stop holding - reset progress
            setIsHolding(false);
            setProgress(0);
            setHoldStartTime(null);
        }
    };

    const handleMouseLeave = () => {
        if (internalState === 'hold' && isHolding) {
            // Stop holding - reset progress
            setIsHolding(false);
            setProgress(0);
            setHoldStartTime(null);
        }
    };

    const handleClick = () => {
        if (!isDisabled) {
            if (internalState === 'progress' && !isProgressRunning) {
                // Start progress when user clicks on progress state button
                setIsProgressRunning(true);
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
                return buttonText;
        }
    };

    const getProgressPercentage = () => {
        if (internalState === 'progress') {
            return Math.round(progress);
        }
        // For hold state, don't show percentage (as requested)
        return null;
    };

    const isProgressVisible = (internalState === 'hold' && isHolding) || (internalState === 'progress' && isProgressRunning);
    const isButtonDisabled = isDisabled || internalState === 'done' || (internalState === 'progress' && isProgressRunning);

    return (
        <button
            ref={buttonRef}
            className={`${styles.uiButton} ${styles[`style${buttonStyle.charAt(0).toUpperCase() + buttonStyle.slice(1)}`]} ${styles[`size${buttonSize.charAt(0).toUpperCase() + buttonSize.slice(1)}`]} ${internalState ? styles[`state${internalState.charAt(0).toUpperCase() + internalState.slice(1)}`] : ''} ${className}`}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            disabled={isButtonDisabled}
            tabIndex={isButtonDisabled ? -1 : 0}
            type="button"
        >
            {/* Progress bar background */}
            {isProgressVisible && (
                <div className={styles.progressContainer}>
                    <UIProgressBar
                        progress={progress / 100}
                        logicalSize="mid"
                        fillColor={internalState === 'hold' ? TOKENS.colors.gray : TOKENS.colors.white}
                        progressState={UISquareState.ACTIVE}
                        fullWidth={true}
                    />
                </div>
            )}

            {/* Button content */}
            <UILabel
                fontVariant="digitBig"
                className={styles.buttonText}
            >
                {getButtonText()}
            </UILabel>

            {/* Progress display - percentage when running, duration when not running */}
            {internalState === 'progress' && (
                <div className={styles.progressPercentage}>
                    {isProgressRunning ? (
                        <UILabel fontVariant="digitSmall">
                            {getProgressPercentage()}%
                        </UILabel>
                    ) : (
                        <UILabel fontVariant="digitSmall">
                            {Math.round(progressDuration / 1000)}s
                        </UILabel>
                    )}
                </div>
            )}
        </button>
    );
}
