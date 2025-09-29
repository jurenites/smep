import type { Meta, StoryObj } from '@storybook/react';
import { UIParticleSVG } from '../../components/Particles/UIParticleSVG';
import { UILabel } from '../../components/Text/UILabel';
import { ParticleList, getFormattedParticleSymbolByType } from '../../../lib/data/particle-quantum.data';

const meta: Meta<typeof UIParticleSVG> = {
    title: 'Particles/UIParticleSVG',
    component: UIParticleSVG,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'SVG-based particle visualization component. Better rendering and animations compared to DOM-based version.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        particleType: {
            control: { type: 'select' },
            options: Object.values(ParticleList),
            description: 'Type of particle to display',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Electron with shadow
export const Default: Story = {
    args: {
        particleType: ParticleList.ELECTRON,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default electron particle with SVG-based rendering and shadow background.',
            },
        },
    },
};

// Quark example
export const Quark: Story = {
    args: {
        particleType: ParticleList.UP,
    },
    parameters: {
        docs: {
            description: {
                story: 'Quark particle (up quark) - smaller size, no shadow background.',
            },
        },
    },
};

// Antimatter example
export const Antimatter: Story = {
    args: {
        particleType: ParticleList.POSITRON,
    },
    parameters: {
        docs: {
            description: {
                story: 'Antimatter particle (positron) with purple shadow background.',
            },
        },
    },
};

// All particle types showcase
export const AllParticles: Story = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', padding: '20px' }}>
            {Object.values(ParticleList).slice(0, 18).map((particleType) => (
                <div key={particleType} style={{ textAlign: 'center' }}>
                    <UIParticleSVG particleType={particleType} />
                    <UILabel fontVariant="digitSmall" color="primary" style={{ marginTop: '8px', fontSize: '8px' }}>
                        {getFormattedParticleSymbolByType(particleType)}
                    </UILabel>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all particle types using SVG rendering.',
            },
        },
    },
};

