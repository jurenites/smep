import type { Meta, StoryObj } from '@storybook/react';
import { UIParticle } from '../../components/Particles/UIParticle';
import { ParticleType, ParticleMatterType, getParticlesByMatterType } from '../../../lib/types/particle-types';

const meta: Meta<typeof UIParticle> = {
    title: 'Particles/UIParticle',
    component: UIParticle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Particle visualization component based on Standard Model physics. Shows matter (yolk) and antimatter (ultraviolet) particles with radial gradient shadows.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        particleType: {
            control: { type: 'select' },
            options: Object.values(ParticleType),
            description: 'Type of particle to display',
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'mid', 'big'],
            description: 'Size of the shadow background (17px, 40px, 109px diameter)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Get all matter and antimatter particles
const matterParticles = getParticlesByMatterType(ParticleMatterType.MATTER);
const antimatterParticles = getParticlesByMatterType(ParticleMatterType.ANTIMATTER);

// Interactive particle comparison
export const ParticleComparison: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'white', marginBottom: '16px' }}>Matter</h3>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {matterParticles.map((particle) => (
                        <div key={particle.type} style={{ textAlign: 'center' }}>
                            <UIParticle particleType={particle.type} />
                            <div style={{ marginTop: '8px', fontSize: '12px', color: '#F8E71C' }}>
                                {particle.symbol}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#white', marginBottom: '16px' }}>Antimatter</h3>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {antimatterParticles.map((particle) => (
                        <div key={particle.type} style={{ textAlign: 'center' }}>
                            <UIParticle particleType={particle.type} />
                            <div style={{ marginTop: '8px', fontSize: '16px', color: '#4C00FF' }}>
                                {particle.symbol}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comparison of all elementary particles showing matter (yolk color) and antimatter (ultraviolet color) with their respective shadow sizes.',
            },
        },
    },
};