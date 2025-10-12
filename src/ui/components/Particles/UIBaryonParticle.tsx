import { ReactNode } from 'react';
import { UIParticle } from './UIParticle';
import { getBaryonByPrimaryId, getBaryonBySymbol, mapBaryonQuarkToParticleList, getParticleRenderConfigByType } from '../../../lib/data';
import { ParticleList, QCDColorCharge } from '../../../lib/data/particle-quantum.data';
import styles from './UIBaryonParticle.module.css';
import React from 'react';

/**
 * Get baryon overlap color based on quark composition
 * Reason: When quarks are tightly bound (small bondDistance), they create a visible color-neutral core
 * - uud (Proton): 2 up + 1 down → Black sphere (most common positive baryon)
 * - udd (Neutron): 1 up + 2 down → White sphere (most common neutral baryon)
 * - Other combinations → Gray sphere (excited states and exotic baryons)
 */
function getBaryonOverlapColor(quarkComposition: [string, string, string]): string {
    const sorted = [...quarkComposition].sort().join('');

    // Proton: uud → Black
    if (sorted === 'duu') return '#000000';

    // Neutron: udd → White
    if (sorted === 'ddu') return '#FFFFFF';

    // All other combinations → Gray
    return '#808080';
}

/**
 * UIBaryonParticle - Composite particle renderer for baryons (3 quarks)
 * 
 * Baryons are always displayed in triangle arrangement (natural QCD structure).
 * 
 * Supports two modes:
 * 1. Legacy mode: Provide baryonType, auto-creates three quarks
 * 2. Composition mode: Provide UIParticle children (requires exactly 3)
 * 
 * Example composition:
 * <UIBaryonParticle>
 *   <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.RED} />
 *   <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.GREEN} />
 *   <UIParticle particleType={ParticleList.DOWN} qcdColor={QCDColorCharge.BLUE} />
 * </UIBaryonParticle>
 * 
 * Baryons must have color-neutral combinations:
 * - Matter baryons: RGB (red + green + blue)
 * - Antimatter baryons: CMY (cyan + magenta + yellow)
 * 
 * Visual overlap feature:
 * - When quarks are close together (bondDistance < 4), a central sphere appears
 * - Color indicates quark composition: Proton (black), Neutron (white), Others (gray)
 * 
 * Future: Replace bondLines with UIGluon components (8 QCD color variants)
 */
export interface UIBaryonParticleProps {
    /** Baryon identifier - either symbol (e.g., "p+") or primaryId (1-70). Optional if children provided */
    baryonType?: string | number;
    /** Optional bond distance override (center-to-center distance in px) */
    bondDistance?: number;
    /** Optional show bond flag (placeholder for future Gluon force carrier particles) */
    showBond?: boolean;
    /** Optional show overlap sphere flag (shows color-neutral core when quarks are close) */
    showOverlap?: boolean;
    /** Optional overlap threshold (distance below which overlap sphere appears, default: 4px) */
    overlapThreshold?: number;
    /** Optional click handler */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
    /** Optional QCD color override for first quark (legacy mode only) */
    qcdColor1?: QCDColorCharge;
    /** Optional QCD color override for second quark (legacy mode only) */
    qcdColor2?: QCDColorCharge;
    /** Optional QCD color override for third quark (legacy mode only) */
    qcdColor3?: QCDColorCharge;
    /** Optional UIParticle children for composition mode (requires exactly 3 UIParticle children) */
    children?: ReactNode;
}

export function UIBaryonParticle({
    baryonType,
    bondDistance,
    showBond = false,
    showOverlap = true,
    overlapThreshold = 4,
    onClick,
    className = '',
    qcdColor1,
    qcdColor2,
    qcdColor3,
    children
}: UIBaryonParticleProps) {
    // Composition mode: children provided
    if (children) {
        const childArray = React.Children.toArray(children);
        if (childArray.length !== 3) {
            console.error('UIBaryonParticle requires exactly 3 UIParticle children');
            return null;
        }

        // Calculate positions for children
        const defaultBondDistance = 6;
        const centerToCenterDistance = bondDistance ?? defaultBondDistance;

        // Use standard quark size (6px)
        const quarkRadius = 3;

        // Equilateral triangle arrangement
        // Reason: Baryons naturally form triangular structure due to QCD color forces
        const height = (Math.sqrt(3) / 2) * centerToCenterDistance;

        // Center particle at top
        const particle1X = centerToCenterDistance / 2 + quarkRadius;
        const particle1Y = quarkRadius;

        // Bottom left particle
        const particle2X = quarkRadius;
        const particle2Y = height + quarkRadius;

        // Bottom right particle
        const particle3X = centerToCenterDistance + quarkRadius;
        const particle3Y = height + quarkRadius;

        const containerWidth = centerToCenterDistance + (quarkRadius * 2);
        const containerHeight = height + (quarkRadius * 2);

        // Calculate centroid for overlap sphere
        const centroidX = (particle1X + particle2X + particle3X) / 3;
        const centroidY = (particle1Y + particle2Y + particle3Y) / 3;

        // Show overlap sphere when quarks are close together
        const shouldShowOverlap = showOverlap && centerToCenterDistance < overlapThreshold;

        return (
            <div
                className={`${styles.baryonContainer} ${className}`}
                onClick={onClick}
                data-composition-mode="true"
                style={{
                    width: `${containerWidth}px`,
                    height: `${containerHeight}px`,
                    position: 'relative'
                }}
            >
                {React.cloneElement(childArray[0] as React.ReactElement, { x: particle1X, y: particle1Y })}
                {React.cloneElement(childArray[1] as React.ReactElement, { x: particle2X, y: particle2Y })}
                {React.cloneElement(childArray[2] as React.ReactElement, { x: particle3X, y: particle3Y })}

                {/* Overlap sphere - color-neutral core when quarks are tightly bound */}
                {shouldShowOverlap && (
                    <div
                        className={styles.overlapSphere}
                        aria-hidden="true"
                        style={{
                            left: `${centroidX}px`,
                            top: `${centroidY}px`,
                            width: `${quarkRadius * 2}px`,
                            height: `${quarkRadius * 2}px`,
                            backgroundColor: '#808080', // Default gray for composition mode
                            opacity: Math.max(0, 1 - (centerToCenterDistance / overlapThreshold))
                        }}
                    />
                )}

                {showBond && (
                    <>
                        <div
                            className={styles.bondLine}
                            aria-hidden="true"
                            data-bond="1-2"
                            style={{
                                left: `${particle1X}px`,
                                top: `${particle1Y}px`,
                                width: `${Math.sqrt(Math.pow(particle2X - particle1X, 2) + Math.pow(particle2Y - particle1Y, 2))}px`,
                                transform: `rotate(${Math.atan2(particle2Y - particle1Y, particle2X - particle1X)}rad)`
                            }}
                        />
                        <div
                            className={styles.bondLine}
                            aria-hidden="true"
                            data-bond="2-3"
                            style={{
                                left: `${particle2X}px`,
                                top: `${particle2Y}px`,
                                width: `${Math.sqrt(Math.pow(particle3X - particle2X, 2) + Math.pow(particle3Y - particle2Y, 2))}px`,
                                transform: `rotate(${Math.atan2(particle3Y - particle2Y, particle3X - particle2X)}rad)`
                            }}
                        />
                        <div
                            className={styles.bondLine}
                            aria-hidden="true"
                            data-bond="3-1"
                            style={{
                                left: `${particle3X}px`,
                                top: `${particle3Y}px`,
                                width: `${Math.sqrt(Math.pow(particle1X - particle3X, 2) + Math.pow(particle1Y - particle3Y, 2))}px`,
                                transform: `rotate(${Math.atan2(particle1Y - particle3Y, particle1X - particle3X)}rad)`
                            }}
                        />
                    </>
                )}
            </div>
        );
    }

    // Legacy mode: baryonType provided
    if (!baryonType) {
        console.error('UIBaryonParticle requires either baryonType or children');
        return null;
    }

    // Find baryon data by primaryId or symbol
    const baryonData = typeof baryonType === 'number'
        ? getBaryonByPrimaryId(baryonType)
        : getBaryonBySymbol(baryonType);

    if (!baryonData) {
        console.error(`Baryon not found: ${baryonType}`);
        return null;
    }

    // Get quark composition and map to ParticleList enum
    // Reason: Baryons consist of three quarks (all matter or all antimatter)
    const [quark1, quark2, quark3] = baryonData.properties.quarkComposition;
    const particleType1 = mapBaryonQuarkToParticleList(quark1) as ParticleList;
    const particleType2 = mapBaryonQuarkToParticleList(quark2) as ParticleList;
    const particleType3 = mapBaryonQuarkToParticleList(quark3) as ParticleList;

    // Get particle diameters for positioning calculation
    const renderConfig1 = getParticleRenderConfigByType(particleType1);
    const renderConfig2 = getParticleRenderConfigByType(particleType2);
    const renderConfig3 = getParticleRenderConfigByType(particleType3);
    const diameter1 = renderConfig1.coreDiameter;
    const diameter2 = renderConfig2.coreDiameter;
    const diameter3 = renderConfig3.coreDiameter;
    const maxDiameter = Math.max(diameter1, diameter2, diameter3);

    // Use provided bondDistance or default from baryon data
    const centerToCenterDistance = bondDistance ?? baryonData.render.bondDistance;

    // Equilateral triangle arrangement
    // Reason: Baryons naturally form triangular structure due to QCD color forces
    const height = (Math.sqrt(3) / 2) * centerToCenterDistance;

    // Center particle at top
    const particle1X = centerToCenterDistance / 2 + maxDiameter / 2;
    const particle1Y = maxDiameter / 2;

    // Bottom left particle
    const particle2X = maxDiameter / 2;
    const particle2Y = height + maxDiameter / 2;

    // Bottom right particle
    const particle3X = centerToCenterDistance + maxDiameter / 2;
    const particle3Y = height + maxDiameter / 2;

    const containerWidth = centerToCenterDistance + maxDiameter;
    const containerHeight = height + maxDiameter;

    // Calculate centroid for overlap sphere
    const centroidX = (particle1X + particle2X + particle3X) / 3;
    const centroidY = (particle1Y + particle2Y + particle3Y) / 3;

    // Show overlap sphere when quarks are close together
    const shouldShowOverlap = showOverlap && centerToCenterDistance < overlapThreshold;

    // Get overlap color based on quark composition
    const overlapColor = getBaryonOverlapColor(baryonData.properties.quarkComposition);

    // Calculate overlap sphere size based on bondDistance
    // Reason: Smaller bondDistance = larger overlap sphere (quarks merge more)
    const overlapSize = Math.max(maxDiameter * 0.8, maxDiameter * (1 - centerToCenterDistance / overlapThreshold));

    return (
        <div
            className={`${styles.baryonContainer} ${className}`}
            onClick={onClick}
            data-baryon-symbol={baryonData.properties.symbol}
            data-baryon-family={baryonData.properties.family}
            data-bond-distance={centerToCenterDistance}
            style={{
                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
                position: 'relative'
            }}
        >
            {/* First quark */}
            <UIParticle
                particleType={particleType1}
                x={particle1X}
                y={particle1Y}
                qcdColor={qcdColor1}
            />
            {/* Second quark */}
            <UIParticle
                particleType={particleType2}
                x={particle2X}
                y={particle2Y}
                qcdColor={qcdColor2}
            />
            {/* Third quark */}
            <UIParticle
                particleType={particleType3}
                x={particle3X}
                y={particle3Y}
                qcdColor={qcdColor3}
            />

            {/* Overlap sphere - color-neutral core when quarks are tightly bound */}
            {/* Reason: Shows QCD color confinement - when quarks are close, they form color-neutral core */}
            {shouldShowOverlap && (
                <div
                    className={styles.overlapSphere}
                    aria-hidden="true"
                    data-baryon-type={baryonData.properties.symbol}
                    style={{
                        left: `${centroidX}px`,
                        top: `${centroidY}px`,
                        width: `${overlapSize}px`,
                        height: `${overlapSize}px`,
                        backgroundColor: overlapColor,
                        opacity: Math.max(0.3, 1 - (centerToCenterDistance / overlapThreshold))
                    }}
                />
            )}

            {showBond && (
                <>
                    <div
                        className={styles.bondLine}
                        aria-hidden="true"
                        data-bond="1-2"
                        style={{
                            left: `${particle1X}px`,
                            top: `${particle1Y}px`,
                            width: `${Math.sqrt(Math.pow(particle2X - particle1X, 2) + Math.pow(particle2Y - particle1Y, 2))}px`,
                            transform: `rotate(${Math.atan2(particle2Y - particle1Y, particle2X - particle1X)}rad)`,
                            transformOrigin: '0 0'
                        }}
                    />
                    <div
                        className={styles.bondLine}
                        aria-hidden="true"
                        data-bond="2-3"
                        style={{
                            left: `${particle2X}px`,
                            top: `${particle2Y}px`,
                            width: `${Math.sqrt(Math.pow(particle3X - particle2X, 2) + Math.pow(particle3Y - particle2Y, 2))}px`,
                            transform: `rotate(${Math.atan2(particle3Y - particle2Y, particle3X - particle2X)}rad)`,
                            transformOrigin: '0 0'
                        }}
                    />
                    <div
                        className={styles.bondLine}
                        aria-hidden="true"
                        data-bond="3-1"
                        style={{
                            left: `${particle3X}px`,
                            top: `${particle3Y}px`,
                            width: `${Math.sqrt(Math.pow(particle1X - particle3X, 2) + Math.pow(particle1Y - particle3Y, 2))}px`,
                            transform: `rotate(${Math.atan2(particle1Y - particle3Y, particle1X - particle3X)}rad)`,
                            transformOrigin: '0 0'
                        }}
                    />
                </>
            )}
        </div>
    );
}

