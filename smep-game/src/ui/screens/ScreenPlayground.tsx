import React, { useRef, useEffect, useState } from 'react';
import { UIPlaygroundSurface } from '../components/Playground/UIPlaygroundSurface';
import { UICard } from '../components/UICard/UICard';
import { UIPaginationGrid } from '../components/Paginators/UIPaginationGrid';
import { UIRuler } from '../components/Elements/UIRuler';
import { useGameStore } from '../../lib/game-state';
import { ParticleType, UICardState } from '../../lib/types';

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
        <div className="screen-playground">
            {/* Main Playground */}
            <UIPlaygroundSurface
                width={dimensions.width}
                height={dimensions.height}
                onMouseDown={handlePlaygroundClick}
            >
                {/* Render particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: particle.position.x - 3,
                            top: particle.position.y - 3,
                        }}
                    />
                ))}
            </UIPlaygroundSurface>

            {/* HUD Overlay */}
            <div className="hud-overlay">
                {/* Top HUD */}
                <div className="hud-top">
                    {/* Wallet */}
                    <div className="wallet-display">
                        {formatEnergy(wallet.currencyEv)}
                    </div>

                    {/* Inventory */}
                    <div className="inventory">
                        {sampleParticles.slice(0, 6).map((particle, index) => (
                            <UICard
                                key={index}
                                symbol={particle.symbol}
                                state={index === currentPage ? UICardState.SELECTED : UICardState.NORMAL}
                                onClick={() => setCurrentPage(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom HUD */}
                <div className="hud-bottom">
                    {/* Ruler */}
                    <UIRuler
                        scale={playground.scale}
                        width={200}
                        position="bottom"
                    />

                    {/* Pagination */}
                    <UIPaginationGrid
                        count={sampleParticles.length}
                        activeIndex={currentPage + 1}
                        gridCols={sampleParticles.length}
                        gridRows={1}
                        active="clickable"
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber - 1)}
                    />

                    {/* Level indicator */}
                    <div className="level-indicator">
                        {playground.level}
                    </div>
                </div>
            </div>
        </div>
    );
} 