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
}

// Re-export the centralized configuration functions for external use
export { getParticleCollisionBounds, getParticleShadowConfig } from '../../../lib/data/particle-quantum.data';

export function UIParticle({
    particleType,
    onClick,
    className = ''
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
            />
        </div>
    );
}
