import React from 'react';
import { ParticleList, getParticlePropertiesByType, getParticleShadowConfigByType, getParticleRenderConfigByType, shouldHaveBackgroundShadowByType } from '../../../lib/data/particle-quantum.data';

export interface UIParticleSVGProps {
    /** The type of particle to display */
    particleType: ParticleList;
    /** Optional click handler */
    onClick?: () => void;
    /** Optional additional CSS class name */
    className?: string;
}

export function UIParticleSVG({
    particleType,
    onClick,
    className = ''
}: UIParticleSVGProps) {
    const particleProps = getParticlePropertiesByType(particleType);
    const renderConfig = getParticleRenderConfigByType(particleType);
    const hasBackgroundShadow = shouldHaveBackgroundShadowByType(particleType);
    const shadowConfig = hasBackgroundShadow ? getParticleShadowConfigByType(particleType) : null;

    // Container size is only based on the particle core, not the shadow
    const containerSize = renderConfig.coreDiameter;
    const particleRadius = renderConfig.coreDiameter / 2;

    // Shadow positioning - centered relative to the particle core
    const shadowRadius = shadowConfig ? shadowConfig.size / 2 : 0;
    const shadowOffsetX = containerSize / 2; // Center of container
    const shadowOffsetY = containerSize / 2; // Center of container

    return (
        <div
            className={className}
            data-particle-list={particleType}
            data-particle-family={particleProps.family}
            style={{
                width: containerSize,
                height: containerSize,
                display: 'inline-block',
                cursor: onClick ? 'pointer' : 'default',
                position: 'relative'
            }}
            onClick={onClick}
        >
            <svg
                width={containerSize}
                height={containerSize}
                viewBox={`0 0 ${containerSize} ${containerSize}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
            >
                {/* Shadow background for leptons */}
                {shadowConfig && (
                    <defs>
                        <radialGradient id={`shadow-${particleType}`}>
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="currentColor" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                )}

                {/* Shadow circle for leptons - positioned at center of container */}
                {shadowConfig && (
                    <circle
                        cx={shadowOffsetX}
                        cy={shadowOffsetY}
                        r={shadowRadius}
                        fill={`url(#shadow-${particleType})`}
                        style={{ color: particleProps.matterType === 'matter' ? 'var(--color-yolk)' : 'var(--color-ultraviolet)' }}
                    />
                )}

                {/* Particle core - positioned at top-left corner of container */}
                <circle
                    cx={particleRadius}
                    cy={particleRadius}
                    r={particleRadius}
                    fill={renderConfig.coreColor}
                    data-particle-core="true"
                    style={{
                        transition: 'transform 0.2s ease',
                    }}
                />

                {/* Hover effect */}
                <style>
                    {`
                        svg:hover circle[data-particle-core="true"] {
                            transform: scale(1.05);
                        }
                        svg:active circle[data-particle-core="true"] {
                            transform: scale(0.95);
                        }
                    `}
                </style>
            </svg>
        </div>
    );
}

// Re-export the centralized configuration functions for external use
export { getParticleCollisionBounds, getParticleShadowConfig } from '../../../lib/data/particle-quantum.data';
