import type { Meta, StoryObj } from '@storybook/react';
import { UIParticle } from '../../components/Particles/UIParticle';
import { UILabel } from '../../components/Text/UILabel';
import { ParticleList, getFormattedParticleSymbolByType } from '../../../lib/data/particle-quantum.data';

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
            options: Object.values(ParticleList),
            description: 'Type of particle to display',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing electron
export const Default: Story = {
    args: {
        particleType: ParticleList.ELECTRON,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default electron particle with shadow background.',
            },
        },
    },
};

// Interactive particle comparison
export const ParticleComparison: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '16px' }}>
                    <UILabel fontVariant="body" color="primary" align="center">
                        Leptons (Matter)
                    </UILabel>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.ELECTRON} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="primary" align="center">
                                {getFormattedParticleSymbolByType(ParticleList.ELECTRON)}
                            </UILabel>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.MUON} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="primary" align="center">
                                {getFormattedParticleSymbolByType(ParticleList.MUON)}
                            </UILabel>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.TAU} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="primary" align="center">
                                {getFormattedParticleSymbolByType(ParticleList.TAU)}
                            </UILabel>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '16px' }}>
                    <UILabel fontVariant="body" color="primary" align="center">
                        Antileptons (Antimatter)
                    </UILabel>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.POSITRON} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="primary" align="center">
                                {getFormattedParticleSymbolByType(ParticleList.POSITRON)}
                            </UILabel>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.ANTI_MUON} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="primary" align="center">
                                {getFormattedParticleSymbolByType(ParticleList.ANTI_MUON)}
                            </UILabel>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.ANTI_TAU} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="primary" align="center">
                                {getFormattedParticleSymbolByType(ParticleList.ANTI_TAU)}
                            </UILabel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comparison of leptons (matter) and antileptons (antimatter) showing different shadow sizes and colors.',
            },
        },
    },
};

// Neutrinos showcase (no shadows)
export const Neutrinos: Story = {
    render: () => (
        <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>
                <UILabel fontVariant="body" color="primary" align="center">
                    Neutrinos (No Shadows)
                </UILabel>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.ELECTRON_NEUTRINO} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="primary" align="center">
                            {getFormattedParticleSymbolByType(ParticleList.ELECTRON_NEUTRINO)}
                        </UILabel>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.MUON_NEUTRINO} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="primary" align="center">
                            {getFormattedParticleSymbolByType(ParticleList.MUON_NEUTRINO)}
                        </UILabel>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.TAU_NEUTRINO} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="primary" align="center">
                            {getFormattedParticleSymbolByType(ParticleList.TAU_NEUTRINO)}
                        </UILabel>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Neutrinos are neutral particles that do not have shadow backgrounds.',
            },
        },
    },
};

// Quarks showcase (mini size)
export const Quarks: Story = {
    render: () => (
        <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>
                <UILabel fontVariant="body" color="white">
                    Quarks (Mini Size)
                </UILabel>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.UP} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="white">
                            {getFormattedParticleSymbolByType(ParticleList.UP)}
                        </UILabel>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.DOWN} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="white">
                            {getFormattedParticleSymbolByType(ParticleList.DOWN)}
                        </UILabel>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.CHARM} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="white" >
                            {getFormattedParticleSymbolByType(ParticleList.CHARM)}
                        </UILabel>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.STRANGE} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="white">
                            {getFormattedParticleSymbolByType(ParticleList.STRANGE)}
                        </UILabel>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Quarks are smaller particles (mini size) with gray coloring and no shadows.',
            },
        },
    },
};