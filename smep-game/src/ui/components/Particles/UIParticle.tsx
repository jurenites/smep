import { UICircle } from '../Primitives/UICircle';
import type { UICircleProps } from '../Primitives/UICircle';
import { ParticleType, getParticleProperties, ParticleSize, ParticleMatterType } from '../../../lib/types/particle-types';
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

/**
 * Get particle shadow configuration for canvas rendering
 */
export function getParticleShadowConfig(particleType: ParticleType, shadowSize: 'small' | 'mid' | 'big') {
    const particleProps = getParticleProperties(particleType);

    const getShadowSize = (): number => {
        switch (shadowSize) {
            case 'small': return 17;
            case 'mid': return 40;
            case 'big': return 109;
            default: return 17;
        }
    };

    const getShadowGradient = () => {
        switch (particleProps.matterType) {
            case ParticleMatterType.MATTER:
                return {
                    centerColor: 'rgba(248, 231, 28, 0.41)',
                    edgeColor: 'rgba(255, 236, 0, 0)'
                };
            case ParticleMatterType.ANTIMATTER:
                return {
                    centerColor: 'rgba(134, 0, 255, 0.72)',
                    edgeColor: 'rgba(134, 0, 255, 0)'
                };
            default:
                return {
                    centerColor: 'rgba(248, 231, 28, 0.41)',
                    edgeColor: 'rgba(255, 236, 0, 0)'
                };
        }
    };

    return {
        size: getShadowSize(),
        gradient: getShadowGradient(),
        particleColor: getParticleColor(particleProps)
    };
}

function getParticleColor(particleProps: any): string {
    switch (particleProps.matterType) {
        case ParticleMatterType.MATTER:
            return 'var(--color-yolk)';
        case ParticleMatterType.ANTIMATTER:
            return 'var(--color-ultraviolet)';
        default:
            return 'var(--color-yolk)';
    }
}

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
    const shadowId = `particle-shadow-${particleType}-${shadowSize}`;

    return (
        <div className={`${styles.particleContainer} ${className}`}>
            {/* SVG Shadow Background */}
            <svg
                width={shadowConfig.size}
                height={shadowConfig.size}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            >
                <defs>
                    <radialGradient id={shadowId} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={shadowConfig.gradient.centerColor} />
                        <stop offset="100%" stopColor={shadowConfig.gradient.edgeColor} />
                    </radialGradient>
                </defs>
                <circle
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fill={`url(#${shadowId})`}
                />
            </svg>

            {/* Particle core */}
            <div style={{ position: 'relative', zIndex: 2 }}>
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
