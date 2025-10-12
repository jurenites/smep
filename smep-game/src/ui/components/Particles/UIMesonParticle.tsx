import { ReactNode } from 'react';
import { UIParticle } from './UIParticle';
import { getMesonByPrimaryId, getMesonBySymbol, mapQuarkToParticleList, getParticleRenderConfigByType } from '../../../lib/data';
import { ParticleList, QCDColorCharge } from '../../../lib/data/particle-quantum.data';
import styles from './UIMesonParticle.module.css';
import React from 'react';

/**
 * UIMesonParticle - Composite particle renderer
 * 
 * Supports two modes:
 * 1. Legacy mode: Provide mesonType, auto-creates quarks
 * 2. Composition mode: Provide UIParticle children (scalable for Baryons)
 * 
 * Example composition:
 * <UIMesonParticle showBond={true}>
 *   <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.RED} />
 *   <UIParticle particleType={ParticleList.ANTI_DOWN} qcdColor={QCDColorCharge.CYAN} />
 * </UIMesonParticle>
 * 
 * For Baryons (3 quarks), create UIBaryonParticle following same pattern:
 * <UIBaryonParticle showGluons={true}>
 *   <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.RED} />
 *   <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.BLUE} />
 *   <UIParticle particleType={ParticleList.DOWN} qcdColor={QCDColorCharge.GREEN} />
 * </UIBaryonParticle>
 * 
 * Future: Replace bondLine with UIGluon component (8 QCD color variants)
 */
export interface UIMesonParticleProps {
    /** Meson identifier - either symbol (e.g., "π+") or primaryId (1-25). Optional if children provided */
    mesonType?: string | number;
    /** Optional bond distance override (center-to-center distance in px) */
    bondDistance?: number;
    /** Optional show bond flag (placeholder for future Gluon force carrier particles) */
    showBond?: boolean;
    /** Optional click handler */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
    //TODO: instead of throwing proeprties of a inenr cild . we need to throw here whole component of UIParticle = quark, 
    /** Optional QCD color override for first quark (legacy mode only) */
    qcdColor1?: QCDColorCharge;
    /** Optional QCD color override for second quark (legacy mode only) */
    qcdColor2?: QCDColorCharge;
    /** Optional UIParticle children for composition mode (requires exactly 2 UIParticle children) */
    children?: ReactNode;
}

export function UIMesonParticle({
    mesonType,
    bondDistance,
    showBond = false,
    onClick,
    className = '',
    qcdColor1,
    qcdColor2,
    children
}: UIMesonParticleProps) {
    // Composition mode: children provided
    if (children) {
        const childArray = React.Children.toArray(children);
        if (childArray.length !== 2) {
            console.error('UIMesonParticle requires exactly 2 UIParticle children');
            return null;
        }

        // Calculate positions for children
        const defaultBondDistance = 3;
        const centerToCenterDistance = bondDistance ?? defaultBondDistance;

        // Use standard quark size (6px)
        const quarkRadius = 3;

        // Position first child
        const particle1X = quarkRadius;
        const particle1Y = quarkRadius;

        // Position second child
        const particle2X = particle1X + centerToCenterDistance;
        const particle2Y = quarkRadius;

        // Calculate container dimensions
        const containerWidth = centerToCenterDistance + (quarkRadius * 2);
        const containerHeight = quarkRadius * 2;

        return (
            <div
                className={`${styles.mesonContainer} ${className}`}
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
                {showBond && (
                    <div
                        className={styles.bondLine}
                        aria-hidden="true"
                        style={{
                            left: `${particle1X}px`,
                            width: `${centerToCenterDistance}px`
                        }}
                    />
                )}
            </div>
        );
    }

    // Legacy mode: mesonType provided
    if (!mesonType) {
        console.error('UIMesonParticle requires either mesonType or children');
        return null;
    }

    // Find meson data by primaryId or symbol
    const mesonData = typeof mesonType === 'number'
        ? getMesonByPrimaryId(mesonType)
        : getMesonBySymbol(mesonType);

    if (!mesonData) {
        console.error(`Meson not found: ${mesonType}`);
        return null;
    }

    // Get quark composition and map to ParticleList enum
    // Reason: Mesons consist of one material quark and one antimaterial quark (marked with apostrophe)
    // The mapQuarkToParticleList function handles both matter and antimatter quarks
    const [quark1, quark2] = mesonData.properties.quarkComposition;
    const particleType1 = mapQuarkToParticleList(quark1) as ParticleList;
    const particleType2 = mapQuarkToParticleList(quark2) as ParticleList;

    // Get particle diameters for positioning calculation
    const renderConfig1 = getParticleRenderConfigByType(particleType1 as ParticleList);
    const renderConfig2 = getParticleRenderConfigByType(particleType2 as ParticleList);
    const diameter1 = renderConfig1.coreDiameter;
    const diameter2 = renderConfig2.coreDiameter;
    const maxDiameter = Math.max(diameter1, diameter2);

    // Use provided bondDistance or default from meson data
    // bondDistance is center-to-center distance
    const centerToCenterDistance = bondDistance ?? mesonData.render.bondDistance;

    // Calculate container dimensions
    // Width: enough to fit both particles with bondDistance between centers
    const containerWidth = centerToCenterDistance + maxDiameter;
    const containerHeight = maxDiameter;

    // Calculate particle positions (center coordinates)
    // Particle 1: centered vertically, positioned at radius from left
    const particle1X = maxDiameter / 2;
    const particle1Y = containerHeight / 2;

    // Particle 2: centered vertically, positioned at bondDistance from particle 1's center
    const particle2X = particle1X + centerToCenterDistance;
    const particle2Y = containerHeight / 2;

    return (
        <div
            className={`${styles.mesonContainer} ${className}`}
            onClick={onClick}
            data-meson-symbol={mesonData.properties.symbol}
            data-meson-family={mesonData.properties.family}
            data-bond-distance={centerToCenterDistance}
            style={{
                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
                position: 'relative'
            }}
        >
            {/* First quark - can be matter or antimatter */}
            <UIParticle
                particleType={particleType1}
                x={particle1X}
                y={particle1Y}
                qcdColor={qcdColor1}
            />
            {/* Second quark - can be matter or antimatter */}
            <UIParticle
                particleType={particleType2}
                x={particle2X}
                y={particle2Y}
                qcdColor={qcdColor2}
            />
            {showBond && (
                <div
                    className={styles.bondLine}
                    aria-hidden="true"
                    style={{
                        left: `${particle1X}px`,
                        width: `${centerToCenterDistance}px`
                    }}
                />
            )}
        </div>
    );
}

