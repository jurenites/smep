import { UICircle } from '../Primitives/UICircle';
import { ParticleList, getParticlePropertiesByType, getParticleShadowConfigByType, getParticleRenderConfigByType, shouldHaveBackgroundShadowByType } from '../../../lib/data/particle-quantum.data';
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
}

// Re-export the centralized configuration functions for external use
export { getParticleCollisionBounds, getParticleShadowConfig } from '../../../lib/data/particle-quantum.data';

export function UIParticle({
    particleType,
    onClick,
    className = '',
    x,
    y
}: UIParticleProps) {
    var particleProps = getParticlePropertiesByType(particleType);
    var renderConfig = getParticleRenderConfigByType(particleType);
    var hasBackgroundShadow = shouldHaveBackgroundShadowByType(particleType);
    // Get shadow configuration using utility function (returns null if no shadow)
    var shadowConfig = hasBackgroundShadow ? getParticleShadowConfigByType(particleType) : null;

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
                        width: shadowConfig.size,
                        height: shadowConfig.size,
                        background: shadowConfig.gradientToken,
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
            />
        </div>
    );
}
