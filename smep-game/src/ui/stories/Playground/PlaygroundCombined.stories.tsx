import type { Meta, StoryObj } from '@storybook/react-vite';
import { UISurface } from '../../components/Playground/UISurface';
import { UIPlayground } from '../../components/Playground/UIPlayground';
import { UIParticle } from '../../components/Particles/UIParticle';
import { ParticleList } from '../../../lib/data/particle-quantum.data';
import styles from './PlaygroundCombined.stories.module.css';

const meta: Meta = {
    title: 'Playground/UISurfacePlayground',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing UISurface + UIPlayground combination
export const Default: Story = {
    render: () => {
        // Select 10 different particles: 6 quarks + 4 leptons
        const selectedParticles = [
            // 6 Quarks (matter)
            ParticleList.UP,
            ParticleList.DOWN,
            ParticleList.CHARM,
            ParticleList.STRANGE,
            ParticleList.TOP,
            ParticleList.BOTTOM,
            // 4 Leptons (matter) - these will have shadows
            ParticleList.ELECTRON,
            ParticleList.MUON,
            ParticleList.TAU,
            ParticleList.POSITRON,
        ];

        // Generate random positions for particles
        const generateParticlePosition = (index: number) => {
            const angle = (index / selectedParticles.length) * 2 * Math.PI;
            const radius = 0.3; // 30% from center
            const centerX = 0.5; // 50% from left
            const centerY = 0.5; // 50% from top

            return {
                left: `${(centerX + radius * Math.cos(angle)) * 100}%`,
                top: `${(centerY + radius * Math.sin(angle)) * 100}%`,
            };
        };

        return (
            <div className={styles.storyContainer}>
                <UISurface
                    width={400}
                    height={800}
                    onMouseDown={(e) => console.log('Surface clicked:', e)}
                >
                    <UIPlayground
                        diameter={400}
                    >
                        {/* Render 10 different particles in a cycle using UIParticle component */}
                        {selectedParticles.map((particleType, index) => {
                            const position = generateParticlePosition(index);
                            return (
                                <div
                                    key={`${particleType}-${index}`}
                                    className={styles.particleWrapper}
                                    style={{
                                        left: position.left,
                                        top: position.top,
                                    }}
                                >
                                    <UIParticle
                                        particleType={particleType}
                                        onClick={() => console.log(`Clicked ${particleType}`)}
                                    />
                                </div>
                            );
                        })}

                        {/* NO label needed here */}

                    </UIPlayground>
                </UISurface>
            </div>
        );
    },
};