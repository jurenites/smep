import { useMemo } from 'react';
import { UICircle } from '../Primitives/UICircle';
import { ParticleList, QCDColorCharge, getParticlePropertiesByType, getParticleShadowConfigByType, getParticleRenderConfigByType, shouldHaveBackgroundShadowByType, getQCDColorGradientByType, getQCDColorGradient } from '../../../lib/data/particle-quantum.data';
import styles from './UIParticle.module.css';

export interface UIParticleProps {
    /** The type of particle to display */
    particleType: ParticleList;
    /** Optional click handler */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
    // Position coordinates (center of the particle)
    x?: number; // X coordinate for center positioning
    y?: number; // Y coordinate for center positioning
    /** Optional QCD color override for quarks only. Use QCDColorCharge.COLORLESS for gray quarks */
    qcdColor?: QCDColorCharge;
}

// Re-export the centralized configuration functions for external use
export { getParticleCollisionBounds, getParticleShadowConfig } from '../../../lib/data/particle-quantum.data';

export function UIParticle({
    particleType,
    onClick,
    className = '',
    x,
    y,
    qcdColor
}: UIParticleProps) {
    var particleProps = getParticlePropertiesByType(particleType);
    var renderConfig = getParticleRenderConfigByType(particleType);
    var hasBackgroundShadow = shouldHaveBackgroundShadowByType(particleType);
    // Get shadow configuration using utility function (returns null if no shadow)
    var shadowConfig = hasBackgroundShadow ? getParticleShadowConfigByType(particleType) : null;

    // Enable sphere mode for quarks (family === 'Quark')
    var isSphereMode = particleProps.family === 'Quark';

    // Invert gradient colors for antimatter quarks (not position)
    // Matter: bright center → dark edges, Antimatter: dark center → bright edges
    var isAntimatter = particleProps.matterType === 'antimatter';

    // Get QCD color charge gradient for quarks
    // Reason: Allow override via qcdColor prop for quarks only, including colorless gray
    // For colorless quarks, use different gradient for matter vs antimatter
    var qcdGradient: string | null = null;
    if (isSphereMode) {
        if (qcdColor !== undefined) {
            // Use override color (red, green, blue, cyan, magenta, yellow, colorless)
            // Special handling for colorless: use colorless-anti gradient for antimatter
            if (qcdColor === QCDColorCharge.COLORLESS && isAntimatter) {
                qcdGradient = 'var(--qcd-gradient-colorless-anti)';
            } else {
                qcdGradient = getQCDColorGradient(qcdColor);
            }
        } else {
            // Use default color from particle data when qcdColor is undefined
            const defaultColor = getQCDColorGradientByType(particleType);
            // Check if default is colorless and antimatter
            const particleColorCharge = particleProps.colorCharge;
            if (particleColorCharge === QCDColorCharge.COLORLESS && isAntimatter) {
                qcdGradient = 'var(--qcd-gradient-colorless-anti)';
            } else {
                qcdGradient = defaultColor;
            }
        }
    }

    // Generate random animation delay and duration for quark glow
    // Each particle instance gets its own delay so they don't shine in sync
    // Delay: 0-10s, Duration: 8-12s (average ~10s)
    // Reason: useMemo ensures these values remain stable across re-renders so animation continues smoothly
    var glowAnimationDelay = useMemo(() => isSphereMode ? `${Math.random() * 10}s` : '0s', [isSphereMode]);
    var glowAnimationDuration = useMemo(() => isSphereMode ? `${8 + Math.random() * 4}s` : '10s', [isSphereMode]);

    return (
        <div
            className={`${styles.particleContainer} ${className}`}
            data-particle-list={particleType}
            data-particle-family={particleProps.family}
            style={{
                // Container size is only based on the UICircle, not the shadow
                width: renderConfig.coreDiameter,
                height: renderConfig.coreDiameter,
                // Position coordinates (center-based positioning)
                ...(x !== undefined && y !== undefined && {
                    position: 'absolute',
                    left: `${x - renderConfig.coreDiameter / 2}px`, // Center the particle on x coordinate
                    top: `${y - renderConfig.coreDiameter / 2}px`,  // Center the particle on y coordinate
                }),
            }}
        >
            {/* Optional shadow background for leptons only - positioned absolutely */}
            {shadowConfig && (
                <div
                    className={styles.shadowBackground}
                    style={{
                        width: `${shadowConfig.size}px`,
                        height: `${shadowConfig.size}px`,
                        background: shadowConfig.gradientToken,
                    }}
                />
            )}

            {/* Quark depth shadow - creates depth perception when quarks overlap */}
            {isSphereMode && (
                <div
                    className={styles.quarkDepthShadow}
                    aria-hidden="true"
                />
            )}

            {/* QCD Color Charge Layer - colored gradient for quarks */}
            {isSphereMode && qcdGradient && (
                <div
                    className={styles.qcdColorLayer}
                    aria-hidden="true"
                    style={{
                        background: qcdGradient,
                    }}
                />
            )}

            {/* Quark-specific glow animation - Pearl-like shining effect */}
            {isSphereMode && (
                <div
                    className={styles.quarkGlow}
                    aria-hidden="true"
                    style={{
                        animationDelay: glowAnimationDelay,
                        animationDuration: glowAnimationDuration,
                    }}
                />
            )}

            {/* UICircle positioned at top-left corner of container */}
            <UICircle
                logicalSize="dot" // Dummy value - actualSize overrides this
                actualSize={renderConfig.coreDiameter}
                color={renderConfig.coreColor}
                brightness="full"
                onClick={onClick}
                data-particle-core="true"
                x={x}
                y={y}
                sphereMode={isSphereMode}
                highlightOffsetX={-0.3}
                highlightOffsetY={-0.3}
                invertGradient={isAntimatter}
            />
        </div>
    );
}
