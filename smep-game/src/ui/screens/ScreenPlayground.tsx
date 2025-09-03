import React, { useRef, useEffect, useState } from 'react';
import { UiPlaygroundSurface } from '../primitives/UiPlaygroundSurface';
import { UiCardSmall } from '../primitives/UiCardSmall';
import { UiPaginationMini } from '../primitives/UiPaginationMini';
import { UiRuler } from '../primitives/UiRuler';
import { useGameStore } from '../../lib/game-state';
import { TOKENS } from '../tokens/tokens';
import { ParticleType } from '../../lib/types';

export function ScreenPlayground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [currentPage, setCurrentPage] = useState(0);

    const {
        wallet,
        playground,
        particles,
        tick,
        createParticle,
        updatePlayground
    } = useGameStore();

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Game loop
    useEffect(() => {
        let lastTime = performance.now();
        let animationId: number;

        const gameLoop = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
            lastTime = currentTime;

            tick(deltaTime);
            animationId = requestAnimationFrame(gameLoop);
        };

        animationId = requestAnimationFrame(gameLoop);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [tick]);

    // Handle playground interactions
    const handlePlaygroundClick = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Create a particle at click position
        const particleTypes = Object.values(ParticleType);
        const randomType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        createParticle(randomType, { x, y });
    };

    // Format energy display
    const formatEnergy = (energy: number) => {
        if (energy >= 1e9) return `${(energy / 1e9).toFixed(1)}G eV`;
        if (energy >= 1e6) return `${(energy / 1e6).toFixed(1)}M eV`;
        if (energy >= 1e3) return `${(energy / 1e3).toFixed(1)}K eV`;
        return `${energy.toFixed(1)} eV`;
    };

    // Sample particles for UI display
    const sampleParticles = [
        { symbol: 'e⁻', type: ParticleType.LEPTON },
        { symbol: 'p⁺', type: ParticleType.BARYON },
        { symbol: 'n⁰', type: ParticleType.BARYON },
        { symbol: 'γ', type: ParticleType.BOSON },
        { symbol: 'q', type: ParticleType.QUARK },
        { symbol: 'π', type: ParticleType.MESON },
    ];

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: TOKENS.colors.BLACK,
            fontFamily: TOKENS.fonts.BODY,
            color: TOKENS.colors.WHITE,
            overflow: 'hidden',
        }}>
            {/* Main Playground */}
            <UiPlaygroundSurface
                width={dimensions.width}
                height={dimensions.height}
                onMouseDown={handlePlaygroundClick}
            >
                {/* Render particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        style={{
                            position: 'absolute',
                            left: particle.position.x - 3,
                            top: particle.position.y - 3,
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${TOKENS.colors.WHITE} 0%, ${TOKENS.colors.LIGHT_GRAY} 100%)`,
                            border: `1px solid ${TOKENS.colors.WHITE}`,
                            pointerEvents: 'none',
                        }}
                    />
                ))}
            </UiPlaygroundSurface>

            {/* HUD Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 10,
            }}>
                {/* Top HUD */}
                <div style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    right: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pointerEvents: 'auto',
                }}>
                    {/* Wallet */}
                    <div style={{
                        background: TOKENS.colors.DARK_GRAY,
                        padding: '8px 16px',
                        border: `1px solid ${TOKENS.colors.WHITE}`,
                        fontFamily: TOKENS.fonts.DIGIT,
                        fontSize: '14px',
                    }}>
                        {formatEnergy(wallet.currencyEv)}
                    </div>

                    {/* Inventory */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        pointerEvents: 'auto',
                    }}>
                        {sampleParticles.slice(0, 6).map((particle, index) => (
                            <UiCardSmall
                                key={index}
                                symbol={particle.symbol}
                                isSelected={index === currentPage}
                                onClick={() => setCurrentPage(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom HUD */}
                <div style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pointerEvents: 'auto',
                }}>
                    {/* Ruler */}
                    <UiRuler
                        scale={playground.scale}
                        width={200}
                        height={20}
                        position="bottom"
                    />

                    {/* Pagination */}
                    <UiPaginationMini
                        count={sampleParticles.length}
                        activeIndex={currentPage}
                        onPageChange={setCurrentPage}
                    />

                    {/* Level indicator */}
                    <div style={{
                        background: TOKENS.colors.DARK_GRAY,
                        padding: '8px 16px',
                        border: `1px solid ${TOKENS.colors.WHITE}`,
                        fontFamily: TOKENS.fonts.BODY,
                        fontSize: '12px',
                        textTransform: 'capitalize',
                    }}>
                        {playground.level}
                    </div>
                </div>
            </div>
        </div>
    );
} 