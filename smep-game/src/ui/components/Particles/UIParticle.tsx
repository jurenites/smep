import { UICircle } from '../Primitives/UICircle';
import type { UICircleProps } from '../Primitives/UICircle';
import { ParticleType, getParticleProperties, ParticleSize } from '../../../lib/types/particle-types';
import { getParticleShadowConfig } from '../../../lib/config/particle-physics';
import styles from './UIParticle.module.css';

export interface UIParticleProps {
    /** The type of particle to display */
    particleType: ParticleType;
    /** Optional click handler */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
    /** Override particle size (optional) */
    size?: ParticleSize;
}

// Re-export the centralized configuration functions for external use
export { getParticleCollisionBounds, getParticleShadowConfig } from '../../../lib/config/particle-physics';

export function UIParticle({
    particleType,
    onClick,
    className = '',
    size
}: UIParticleProps) {
    const particleProps = getParticleProperties(particleType);

    // Use provided size or particle's default size for shadow background
    const shadowSize = size || particleProps.size;

    // UICircle is always the same small dot size regardless of particle type
    const getLogicalSize = (): UICircleProps['logicalSize'] => {
        return 'dot'; // Always use dot size for the particle itself
    };

    // Get shadow configuration using utility function
    const shadowConfig = getParticleShadowConfig(particleType, shadowSize);

    return (
        <div
            className={`${styles.particleContainer} ${className}`}
            data-particle-type={particleType}
            data-shadow-size={shadowSize}
            style={{ width: shadowConfig.size, height: shadowConfig.size }}
        >
            {/* Shadow Background using CSS gradient from tokens */}
            <div
                data-svg-shadow
                data-shadow-type={particleProps.matterType}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: shadowConfig.size,
                    height: shadowConfig.size,
                    background: shadowConfig.gradientToken,
                    borderRadius: '50%',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />

            {/* Particle core - perfectly centered */}
            <div
                data-particle-core
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    transition: 'transform 0.2s ease',
                    width: '1px',  // Explicit width for dot size
                    height: '1px', // Explicit height for dot size
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <UICircle
                    logicalSize={getLogicalSize()}
                    color={shadowConfig.particleColor}
                    brightness="full"
                    onClick={onClick}
                />
            </div>
        </div>
    );
}
