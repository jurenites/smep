import React, { useState, useEffect } from 'react';
import { UILabel } from '../Text/UILabel';
import { ValueDisplay } from '../Text/ValueDisplay';
import { UIProgressBar } from '../Primitives/UIProgressBar';
import { UISquareState } from '../Primitives/UISquare';
import { UIUpgradeIcon } from './UIUpgradeIcon';
import { TOKENS } from '../../tokens/tokens';
import type { UpgradeData } from '../../../lib/data/upgrade.data';
import styles from './UIUpgradeItemLine.module.css';

export type ViewMode = 'full' | 'mid' | 'brief';
export type ItemState = 'available' | 'selected';
export type UpgradeState = 'not-started' | 'in-progress' | 'cancellation';

export interface UIUpgradeItemLineProps {
    /** Upgrade data */
    upgrade: UpgradeData;
    /** View mode for display */
    viewMode?: ViewMode;
    /** Item state (available/selected) */
    itemState?: ItemState;
    /** Upgrade state (not-started/in-progress/cancellation) */
    upgradeState?: UpgradeState;
    /** Progress value (0-1) for progress bar */
    progress?: number;
    /** Whether user can afford this upgrade */
    isAffordable?: boolean;
    /** Calculated gaining per second if researched */
    gainingIfResearched: number;
    /** Callback when item is selected/clicked */
    onSelect?: () => void;
    /** Callback when research button is clicked */
    onResearch?: () => void;
    /** Callback for immediate stop (X button during progress) */
    onStopImmediate?: () => void;
    /** Callback for final stop (Stop button during cancellation) */
    onStopFinal?: () => void;
    /** Callback for continue (Continue button during cancellation) */
    onContinue?: () => void;
    /** Optional CSS class name */
    className?: string;
}

export function UIUpgradeItemLine({
    upgrade,
    viewMode = 'full',
    itemState = 'available',
    upgradeState = 'not-started',
    progress = 0,
    isAffordable = true,
    gainingIfResearched,
    onSelect,
    onResearch,
    onStopImmediate,
    onStopFinal,
    onContinue,
    className = ''
}: UIUpgradeItemLineProps) {
    const [rollbackProgress, setRollbackProgress] = useState<number | null>(null);

    // Handle rollback animation when final stop is clicked
    useEffect(() => {
        if (rollbackProgress !== null) {
            const timer = setTimeout(() => {
                setRollbackProgress(null);
                if (onStopFinal) {
                    onStopFinal();
                }
            }, 300); // 300ms rollback animation

            return () => clearTimeout(timer);
        }
    }, [rollbackProgress, onStopFinal]);

    // Get border color based on affordability
    const borderColor = isAffordable ? TOKENS.colors.white : TOKENS.colors.gray;

    // Get background color based on item state
    const backgroundColor = itemState === 'selected' ? TOKENS.colors.darkgray : 'transparent';

    // Get icon color based on affordability
    const iconColor = isAffordable ? TOKENS.colors.white : TOKENS.colors.gray;

    // Build CSS classes
    const containerClasses = [
        styles.container,
        styles[`viewMode${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}`],
        styles[`itemState${itemState.charAt(0).toUpperCase() + itemState.slice(1)}`],
        styles[`upgradeState${upgradeState.charAt(0).toUpperCase() + upgradeState.slice(1).replace('-', '')}`],
        className
    ].filter(Boolean).join(' ');

    // Handle click on container (select)
    const handleContainerClick = () => {
        if (upgradeState === 'not-started' && onSelect) {
            onSelect();
        }
    };

    // Handle research button click
    const handleResearchClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onResearch && isAffordable) {
            onResearch();
        }
    };

    // Handle stop button click
    const handleStopClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onStopImmediate) {
            onStopImmediate();
        }
    };

    // Handle final stop button click (with rollback animation)
    const handleFinalStopClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setRollbackProgress(progress);
    };

    // Handle continue button click
    const handleContinueClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onContinue) {
            onContinue();
        }
    };

    // Render research button (upward arrow)
    const renderResearchButton = () => {
        const arrowColor = isAffordable ? TOKENS.colors.white : TOKENS.colors.gray;

        return (
            <button
                className={styles.researchButton}
                onClick={handleResearchClick}
                disabled={!isAffordable}
                aria-label="Research upgrade"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                >
                    {/* Vertical arrow pointing up */}
                    <line
                        x1="15.5"
                        y1="23"
                        x2="15.5"
                        y2="8"
                        stroke={arrowColor}
                        strokeWidth="1"
                    />
                    {/* Arrow head */}
                    <polyline
                        points="11,12 15.5,8 20,12"
                        fill="none"
                        stroke={arrowColor}
                        strokeWidth="1"
                    />
                </svg>
            </button>
        );
    };

    // Render stop button (X)
    const renderStopButton = () => {
        return (
            <button
                className={styles.stopButton}
                onClick={handleStopClick}
                aria-label="Stop research"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                >
                    {/* X icon */}
                    <line
                        x1="10"
                        y1="10"
                        x2="21"
                        y2="21"
                        stroke={TOKENS.colors.white}
                        strokeWidth="1"
                    />
                    <line
                        x1="21"
                        y1="10"
                        x2="10"
                        y2="21"
                        stroke={TOKENS.colors.white}
                        strokeWidth="1"
                    />
                </svg>
            </button>
        );
    };

    // Render cancellation buttons
    const renderCancellationButtons = () => {
        return (
            <div className={styles.cancellationButtons}>
                <button
                    className={styles.actionButton}
                    onClick={handleFinalStopClick}
                >
                    <UILabel fontVariant="digitBig" color="white">STOP</UILabel>
                </button>
                <button
                    className={styles.actionButton}
                    onClick={handleContinueClick}
                >
                    <UILabel fontVariant="digitBig" color="white">CONTINUE</UILabel>
                </button>
            </div>
        );
    };

    // Render content based on view mode
    const renderContent = () => {
        if (upgradeState === 'in-progress') {
            return (
                <div className={styles.contentInProgress}>
                    <div className={styles.topRow}>
                        <UIUpgradeIcon color={iconColor} />
                        <UILabel fontVariant="title" color="white">upgrading</UILabel>
                        {renderStopButton()}
                    </div>
                    <div className={styles.progressBarContainer}>
                        <UIProgressBar
                            progressState={UISquareState.ACTIVE}
                            logicalSize="small"
                            progress={rollbackProgress !== null ? rollbackProgress : progress}
                            fillColor={TOKENS.colors.white}
                            fullWidth={true}
                        />
                    </div>
                </div>
            );
        }

        if (upgradeState === 'cancellation') {
            return (
                <div className={styles.contentCancellation}>
                    <div className={styles.topRow}>
                        <UIUpgradeIcon color={iconColor} />
                        <UILabel fontVariant="title" color="white">{upgrade.name}</UILabel>
                    </div>
                    {renderCancellationButtons()}
                </div>
            );
        }

        // Normal states (not-started)
        if (viewMode === 'full') {
            return (
                <div className={styles.contentFull}>
                    <div className={styles.topRow}>
                        <UIUpgradeIcon color={iconColor} />
                        <UILabel fontVariant="title" color={isAffordable ? 'white' : 'gray'}>
                            {upgrade.name}
                        </UILabel>
                    </div>
                    <div className={styles.descriptionRow}>
                        <UILabel fontVariant="body" color={isAffordable ? 'white' : 'gray'}>
                            {upgrade.description}
                        </UILabel>
                    </div>
                    <div className={styles.bottomRow}>
                        {itemState === 'selected' ? (
                            <>
                                {renderResearchButton()}
                                <div className={styles.gainingDisplay}>
                                    <ValueDisplay
                                        displayValue={gainingIfResearched}
                                        measurementType="energy"
                                        displayMode="shortened"
                                        valueColor="white"
                                        unitColor="gray"
                                        valueFontVariant="digitBig"
                                        labelFontVariant="body"
                                    />
                                    <UILabel fontVariant="body" color="gray">/s</UILabel>
                                </div>
                            </>
                        ) : (
                            <div className={styles.costDisplay}>
                                <ValueDisplay
                                    displayValue={upgrade.costInEv}
                                    measurementType="energy"
                                    displayMode="shortened"
                                    valueColor={isAffordable ? 'white' : 'gray'}
                                    unitColor="gray"
                                    valueFontVariant="digitBig"
                                    labelFontVariant="body"
                                />
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (viewMode === 'mid') {
            return (
                <div className={styles.contentMid}>
                    <div className={styles.topRow}>
                        <div className={styles.iconNameGroup}>
                            <UIUpgradeIcon color={iconColor} />
                            <UILabel fontVariant="title" color={isAffordable ? 'white' : 'gray'}>
                                {upgrade.name}
                            </UILabel>
                        </div>
                        {itemState === 'selected' ? renderResearchButton() : (
                            <div className={styles.costDisplay}>
                                <ValueDisplay
                                    displayValue={upgrade.costInEv}
                                    measurementType="energy"
                                    displayMode="shortened"
                                    valueColor={isAffordable ? 'white' : 'gray'}
                                    unitColor="gray"
                                    valueFontVariant="digitBig"
                                    labelFontVariant="body"
                                />
                            </div>
                        )}
                    </div>
                    {itemState === 'selected' && (
                        <div className={styles.bottomRow}>
                            <div className={styles.gainingDisplay}>
                                <ValueDisplay
                                    displayValue={gainingIfResearched}
                                    measurementType="energy"
                                    displayMode="shortened"
                                    valueColor="white"
                                    unitColor="gray"
                                    valueFontVariant="digitBig"
                                    labelFontVariant="body"
                                />
                                <UILabel fontVariant="body" color="gray">/s</UILabel>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // Brief mode
        return (
            <div className={styles.contentBrief}>
                <div className={styles.iconNameGroup}>
                    <UIUpgradeIcon color={iconColor} />
                    <UILabel fontVariant="title" color={isAffordable ? 'white' : 'gray'}>
                        {upgrade.name}
                    </UILabel>
                </div>
                {itemState === 'selected' ? renderResearchButton() : (
                    <div className={styles.costDisplay}>
                        <ValueDisplay
                            displayValue={upgrade.costInEv}
                            measurementType="energy"
                            displayMode="shortened"
                            valueColor={isAffordable ? 'white' : 'gray'}
                            unitColor="gray"
                            valueFontVariant="digitBig"
                            labelFontVariant="body"
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={containerClasses}
            style={{
                borderLeftColor: borderColor,
                backgroundColor: backgroundColor,
            }}
            onClick={handleContainerClick}
        >
            {renderContent()}
        </div>
    );
}

