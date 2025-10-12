import { useState, useCallback, useEffect } from 'react';
import { UICard, UICardState } from '../Cards/UICard';
import { UISquare, UISquareState } from '../Primitives/UISquare';
import { UILabel } from '../Text/UILabel';
import { BARYON_DATA, getBaryonByPrimaryId, getFormattedBaryonQuarkComposition } from '../../../lib/data';
import styles from './UIBaryonTable.module.css';

interface UIBaryonTableProps {
    interactionMode?: 'clickable' | 'only view';
    activePrimaryId?: number; // 1-70 for baryons
    onPageChange?: (position: { x: number; y: number }, event: any) => void;
    displayMode?: 'symbol' | 'quarks'; // Display symbol or quark composition
}

export function UIBaryonTable({
    interactionMode = 'only view',
    activePrimaryId = 3, // Default to Proton
    onPageChange,
    displayMode = 'symbol'
}: UIBaryonTableProps) {
    // State for managing the active baryon (for click interactions)
    const [clickedPrimaryId, setClickedPrimaryId] = useState<number>(activePrimaryId);

    // Update clickedPrimaryId when activePrimaryId prop changes
    useEffect(() => {
        setClickedPrimaryId(activePrimaryId);
    }, [activePrimaryId]);

    // Handle baryon selection
    const handleBaryonClick = useCallback((baryon: typeof BARYON_DATA[0]) => {
        setClickedPrimaryId(baryon.properties.primaryId);
        if (onPageChange) {
            onPageChange(baryon.table, null);
        }
    }, [onPageChange]);

    // Get active baryon info for display
    const displayPrimaryId = clickedPrimaryId;
    const activeBaryon = getBaryonByPrimaryId(displayPrimaryId);

    // Calculate grid dimensions - 4 rows × 24 columns (horizontal layout)
    // Row layout:
    // Row 1: Nucleons (Delta++, Proton, Neutron, Delta−) - 8 baryons
    // Row 2: Sigma families (light, charmed, bottom) - 18 baryons
    // Row 3: Xi families (light, charmed, bottom, double-heavy) - 24 baryons
    // Row 4: Omega families (light to triple-heavy) - 20 baryons
    const gridWidth = 24;
    const gridHeight = 4;

    // Cell size based on interaction mode
    const cellSize = interactionMode === 'clickable' ? 31 : 4; // UICard small = 31px, UISquare small = 4px

    return (
        <div className={styles.baryonTableContainer}>
            {/* Active baryon info display */}
            {activeBaryon && (
                <div className={styles.activeBaryonInfo}>
                    <UILabel fontVariant="body" color="gray">
                        {activeBaryon.properties.primaryId} (
                    </UILabel>
                    <UILabel fontVariant="title" color="white">
                        {activeBaryon.properties.symbol}
                    </UILabel>
                    <UILabel fontVariant="body" color="gray">
                        ) - {activeBaryon.properties.name} - {activeBaryon.properties.massInMeV} MeV
                        {activeBaryon.properties.massPredicted && ' (predicted)'}
                        {' - '}
                        {getFormattedBaryonQuarkComposition(activeBaryon.properties.quarkComposition)}
                    </UILabel>
                </div>
            )}

            {/* Baryon table grid */}
            <div className={styles.baryonTableWrapper}>
                <div
                    className={styles.baryonGrid}
                    style={{
                        gridTemplateColumns: `repeat(${gridWidth}, ${cellSize}px)`,
                        gridTemplateRows: `repeat(${gridHeight}, ${cellSize}px)`
                    }}
                >
                    {BARYON_DATA.map((baryon) => {
                        const isActive = displayPrimaryId === baryon.properties.primaryId;
                        const squareState = isActive ? UISquareState.ACTIVE : UISquareState.INACTIVE;

                        // Get display text based on displayMode
                        const displayText = displayMode === 'symbol'
                            ? baryon.properties.symbol
                            : getFormattedBaryonQuarkComposition(baryon.properties.quarkComposition);

                        // Tooltip shows all relevant info
                        const tooltipText = `${baryon.properties.primaryId}: ${baryon.properties.symbol} (${baryon.properties.name}) - ${baryon.properties.massInMeV} MeV${baryon.properties.massPredicted ? ' (predicted)' : ''} - ${getFormattedBaryonQuarkComposition(baryon.properties.quarkComposition)}`;

                        return (
                            <div
                                key={baryon.properties.primaryId}
                                className={styles.baryonCell}
                                style={{
                                    gridColumn: baryon.table.x,
                                    gridRow: baryon.table.y
                                }}
                            >
                                {interactionMode === 'clickable' ? (
                                    <UICard
                                        textSymbol={displayText}
                                        textNumber={baryon.properties.primaryId}
                                        logicalSize="small"
                                        cardState={UICardState.NORMAL}
                                        showParticle={true}
                                        particleType={baryon.properties.primaryId}
                                        compositeParticleType="baryon"
                                        onClick={() => handleBaryonClick(baryon)}
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
                                        onClick={() => handleBaryonClick(baryon)}
                                        tooltipContent={tooltipText}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Row labels (families) on the left */}
                <div className={styles.familyLabels}>
                    <div className={styles.familyLabel} style={{ top: `${cellSize * 0}px` }}>
                        <UILabel fontVariant="digitSmall" color="gray">Nucleons</UILabel>
                    </div>
                    <div className={styles.familyLabel} style={{ top: `${cellSize * 1}px` }}>
                        <UILabel fontVariant="digitSmall" color="gray">Sigma</UILabel>
                    </div>
                    <div className={styles.familyLabel} style={{ top: `${cellSize * 2}px` }}>
                        <UILabel fontVariant="digitSmall" color="gray">Xi</UILabel>
                    </div>
                    <div className={styles.familyLabel} style={{ top: `${cellSize * 3}px` }}>
                        <UILabel fontVariant="digitSmall" color="gray">Omega</UILabel>
                    </div>
                </div>
            </div>
        </div>
    );
}

