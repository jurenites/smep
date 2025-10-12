import { useState, useCallback, useEffect } from 'react';
import { UICard, UICardState } from '../Cards/UICard';
import { UISquare, UISquareState } from '../Primitives/UISquare';
import { UILabel } from '../Text/UILabel';
import { MESON_DATA, getMesonByPrimaryId, getFormattedQuarkComposition } from '../../../lib/data';
import styles from './UIMesonTable.module.css';

interface UIMesonTableProps {
    interactionMode?: 'clickable' | 'only view';
    activePrimaryId?: number; // 1-25 for mesons
    onPageChange?: (position: { x: number; y: number }, event: any) => void;
    displayMode?: 'symbol' | 'quarks'; // Display Greek symbol or quark composition
}

export function UIMesonTable({
    interactionMode = 'only view',
    activePrimaryId = 1, // Default to π+ (charged Pion)
    onPageChange,
    displayMode = 'symbol'
}: UIMesonTableProps) {
    // State for managing the active meson (for click interactions)
    const [clickedPrimaryId, setClickedPrimaryId] = useState<number>(activePrimaryId);

    // Update clickedPrimaryId when activePrimaryId prop changes
    useEffect(() => {
        setClickedPrimaryId(activePrimaryId);
    }, [activePrimaryId]);

    // Handle meson selection
    const handleMesonClick = useCallback((meson: typeof MESON_DATA[0]) => {
        setClickedPrimaryId(meson.properties.primaryId);
        if (onPageChange) {
            onPageChange(meson.table, null);
        }
    }, [onPageChange]);

    // Get active meson info for display
    const displayPrimaryId = clickedPrimaryId;
    const activeMeson = getMesonByPrimaryId(displayPrimaryId);

    // Calculate grid dimensions - 4 rows × 7 columns
    const gridWidth = 7;
    const gridHeight = 4;

    // Cell size based on interaction mode
    const cellSize = interactionMode === 'clickable' ? 31 : 4; // UICard small = 31px, UISquare small = 4px

    return (
        <div className={styles.mesonTableContainer}>
            {/* Active meson info display */}
            {activeMeson && (
                <div className={styles.activeMesonInfo}>
                    <UILabel fontVariant="body" color="gray">
                        {activeMeson.properties.primaryId} (
                    </UILabel>
                    <UILabel fontVariant="title" color="white">
                        {activeMeson.properties.symbol}
                    </UILabel>
                    <UILabel fontVariant="body" color="gray">
                        ) - {activeMeson.properties.name} - {activeMeson.properties.massInMeV} MeV - {getFormattedQuarkComposition(activeMeson.properties.quarkComposition)}
                    </UILabel>
                </div>
            )}

            {/* Meson table grid */}
            <div className={styles.mesonTableWrapper}>
                <div
                    className={styles.mesonGrid}
                    style={{
                        gridTemplateColumns: `repeat(${gridWidth}, ${cellSize}px)`,
                        gridTemplateRows: `repeat(${gridHeight}, ${cellSize}px)`
                    }}
                >
                    {MESON_DATA.map((meson) => {
                        const isActive = displayPrimaryId === meson.properties.primaryId;
                        const squareState = isActive ? UISquareState.ACTIVE : UISquareState.INACTIVE;

                        // Get display text based on displayMode
                        const displayText = displayMode === 'symbol'
                            ? meson.properties.symbol
                            : getFormattedQuarkComposition(meson.properties.quarkComposition);

                        // Tooltip shows all relevant info
                        const tooltipText = `${meson.properties.primaryId}: ${meson.properties.symbol} (${meson.properties.name}) - ${meson.properties.massInMeV} MeV - ${getFormattedQuarkComposition(meson.properties.quarkComposition)}`;

                        return (
                            <div
                                key={meson.properties.primaryId}
                                className={styles.mesonCell}
                                style={{
                                    gridColumn: meson.table.x,
                                    gridRow: meson.table.y
                                }}
                            >
                                {interactionMode === 'clickable' ? (
                                    <UICard
                                        textSymbol={displayText}
                                        textNumber={meson.properties.primaryId}
                                        logicalSize="small"
                                        cardState={UICardState.NORMAL}
                                        showParticle={true}
                                        particleType={meson.properties.primaryId}
                                        compositeParticleType="meson"
                                        onClick={() => handleMesonClick(meson)}
                                        style={isActive ? {
                                            '--card-border-color': 'var(--color-white)',
                                            '--card-background-color': 'var(--color-gray)',
                                            boxShadow: 'var(--shadow-box-strong)',
                                            transform: 'scale(1.05)',
                                            zIndex: 10
                                        } as React.CSSProperties : undefined}
                                        tooltipContent={tooltipText}
                                    />
                                ) : (
                                    <UISquare
                                        squareState={squareState}
                                        logicalSize="small"
                                        active={interactionMode}
                                        onClick={() => handleMesonClick(meson)}
                                        tooltipContent={tooltipText}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Family labels */}
                <div className={styles.familyLabels}>
                    <div className={styles.familyLabel} style={{ gridColumn: 1 }}>
                        <UILabel fontVariant="digitSmall" color="gray">Pion</UILabel>
                    </div>
                    <div className={styles.familyLabel} style={{ gridColumn: 2 }}>
                        <UILabel fontVariant="digitSmall" color="gray">Kaon</UILabel>
                    </div>
                    <div className={styles.familyLabel} style={{ gridColumn: '3 / 5' }}>
                        <UILabel fontVariant="digitSmall" color="gray">D Meson</UILabel>
                    </div>
                    <div className={styles.familyLabel} style={{ gridColumn: '5 / 7' }}>
                        <UILabel fontVariant="digitSmall" color="gray">B Meson</UILabel>
                    </div>
                    <div className={styles.familyLabel} style={{ gridColumn: 7 }}>
                        <UILabel fontVariant="digitSmall" color="gray">Heavy</UILabel>
                    </div>
                </div>
            </div>
        </div>
    );
}

