import { UICircle } from '../Primitives/UICircle';
import { ParticleList, getParticleProperties, getParticleShadowConfig, getParticleRenderConfig } from '../../../lib/data/particle-quantum.data';
import { shouldHaveBackgroundShadow } from '../../../lib/data/particle-symbols';
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
    var particleProps = getParticleProperties(particleType);
    var renderConfig = getParticleRenderConfig(particleType);
    var hasBackgroundShadow = shouldHaveBackgroundShadow(particleType);
    // Get shadow configuration using utility function (returns null if no shadow)
    var shadowConfig = hasBackgroundShadow ? getParticleShadowConfig(particleType) : null;

    return (
        <div
            className={`${styles.particleContainer} ${className}`}
            data-particle-list={particleType}
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
                color={renderConfig.coreColor}
                brightness="full"
                onClick={onClick}
            />
        </div>
    );
}
