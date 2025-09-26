import { UICircle } from '../Primitives/UICircle';
import { ParticleList, getParticleProperties, ParticleProperties } from '../../../lib/types/particle-types';
import { getParticleShadowConfig, getParticleRenderConfig } from '../../../lib/config/particle-physics';
import styles from './UIParticle.module.css';

export interface UIParticleProps {
    /** The type of particle to display */
    particleType: ParticleList;
    /** Optional click handler */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
    /** Override particle size (optional) */
    size?: ParticleProperties.size;
}

// Re-export the centralized configuration functions for external use
export { getParticleCollisionBounds, getParticleShadowConfig } from '../../../lib/config/particle-physics';

export function UIParticle({
    particleType,
    onClick,
    className = '',
    size
}: UIParticleProps) {
    var particleProps = getParticleProperties(particleType);
    var renderConfig = getParticleRenderConfig(particleType);
    // Use provided size or particle's default size for shadow background
    var shadowSize = size || particleProps.size;
    // Get shadow configuration using utility function (returns null if no shadow)
    var shadowConfig = getParticleShadowConfig(particleType, shadowSize);


    return (
        <div
            className={`${styles.particleContainer} ${className}`}
            data-particle-type={particleType}
            data-particle-family={particleProps.family}
        >
            {/* Optional shadow background for leptons only */}
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

            {/* All particles use UICircle with actual diameter from ParticleConfig */}
            <UICircle
                logicalSize="dot" // Dummy value - actualSize overrides this
                actualSize={renderConfig.coreDiameter}
                color={shadowConfig?.particleColor || renderConfig.colors.matter}
                brightness="full"
                onClick={onClick}
            />
        </div>
    );
}
