import { UIParticle } from './UIParticle';
import { getMesonByPrimaryId, getMesonBySymbol, mapQuarkToParticleList, getParticleRenderConfigByType } from '../../../lib/data';
import { ParticleList, QCDColorCharge } from '../../../lib/data/particle-quantum.data';
import styles from './UIMesonParticle.module.css';

export interface UIMesonParticleProps {
    /** Meson identifier - either symbol (e.g., "π+") or primaryId (1-25) */
    mesonType: string | number;
    /** Optional bond distance override (center-to-center distance in px) */
    bondDistance?: number;
    /** Optional show bond flag (for future visual bond line) */
    showBond?: boolean;
    /** Optional click handler */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
    /** Optional QCD color override for first quark */
    qcdColor1?: QCDColorCharge;
    /** Optional QCD color override for second quark */
    qcdColor2?: QCDColorCharge;
}

export function UIMesonParticle({
    mesonType,
    bondDistance,
    showBond = false,
    onClick,
    className = '',
    qcdColor1,
    qcdColor2
}: UIMesonParticleProps) {
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

