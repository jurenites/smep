import React, { useEffect, useState } from 'react';
import { UISurface, UIPlayground } from '../components/Playground';
import { UICard } from '../components/UICard/UICard';
import { UIPaginationGrid } from '../components/Paginators/UIPaginationGrid';
import { UIRuler } from '../components/Elements/UIRuler';
import { useGameStore } from '../../lib/game-state';
import { ParticleList, UICardState } from '../../lib/types';
import styles from './ScreenPlayground.module.css';

export function ScreenPlayground() {
    //const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [currentPage, setCurrentPage] = useState(0);

    const {
        wallet,
        playground,
        particles,
        tick,
        createParticle,
        //updatePlayground
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
        const particleTypes = Object.values(ParticleList);
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
        { symbol: 'e⁻', type: ParticleList.LEPTON },
        { symbol: 'p⁺', type: ParticleList.BARYON },
        { symbol: 'n⁰', type: ParticleList.BARYON },
        { symbol: 'γ', type: ParticleList.BOSON },
        { symbol: 'q', type: ParticleList.QUARK },
        { symbol: 'π', type: ParticleList.MESON },
    ];



    return (
        <div className={styles.screenPlayground}>
            {/* Main Playground */}
            <UISurface
                width={dimensions.width}
                height={dimensions.height}
                onMouseDown={handlePlaygroundClick}
            >
                {/* Playground circle and shadow */}
                <UIPlayground
                    diameter={Math.min(dimensions.width, dimensions.height)}
                >
                    {/* Render particles */}
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className={`${styles.particle} ${styles[`particle--${particle.type}`]}`}
                            style={{
                                left: particle.position.x - 3,
                                top: particle.position.y - 3,
                            }}
                        />
                    ))}
                </UIPlayground>
            </UISurface>

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
                                state={UICardState.NORMAL}
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