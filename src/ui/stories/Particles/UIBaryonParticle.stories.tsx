import type { Meta, StoryObj } from '@storybook/react';
import { UIBaryonParticle } from '../../components/Particles/UIBaryonParticle';
import { UIParticle } from '../../components/Particles/UIParticle';
import { ParticleList, QCDColorCharge } from '../../../lib/data/particle-quantum.data';

const meta: Meta<typeof UIBaryonParticle> = {
    title: 'Particles/UIBaryonParticle',
    component: UIBaryonParticle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**UIBaryonParticle** - Composite particle renderer for baryons (3 quarks)

Baryons are composite particles made of three quarks bound by the strong nuclear force in a **triangle arrangement** (natural QCD structure). They must be color-neutral:
- **Matter baryons**: RGB (red + green + blue quarks)
- **Antimatter baryons**: CMY (cyan + magenta + yellow antiquarks)

### QCD Color Confinement (Overlap Effect)
When quarks are tightly bound (bondDistance < threshold), a central overlap sphere appears showing the color-neutral core:
- **Proton (uud)** = Black core (unique signature)
- **Neutron (udd)** = White core (unique signature)
- **Other combinations** = Gray core (default)

Adjust bondDistance in Controls to see the overlap effect in action!

### Baryon Families
- **Nucleons**: Proton (uud), Neutron (udd)
- **Delta**: Δ++ (uuu), Δ− (ddd)
- **Sigma**: Σ+ (uus), Σ0 (uds), Σ− (dds)
- **Xi**: Ξ0 (uss), Ξ− (dss)
- **Omega**: Ω− (sss)
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        baryonType: {
            control: 'select',
            options: [
                3, // Proton
                5, // Neutron
                1, // Delta++
                7, // Delta-
                9, // Sigma+
                11, // Sigma0
                13, // Sigma-
                27, // Xi0
                29, // Xi-
                51, // Omega-
            ],
            mapping: {
                'Proton (p+)': 3,
                'Neutron (n0)': 5,
                'Delta++ (Δ++)': 1,
                'Delta− (Δ−)': 7,
                'Sigma+ (Σ+)': 9,
                'Sigma0 (Σ0)': 11,
                'Sigma− (Σ−)': 13,
                'Xi0 (Ξ0)': 27,
                'Xi− (Ξ−)': 29,
                'Omega− (Ω−)': 51,
            },
            description: 'Baryon type by primaryId (1-70)',
        },
        bondDistance: {
            control: { type: 'range', min: 1, max: 20, step: 0.5 },
            description: 'Bond distance between quark centers (px)',
        },
        showBond: {
            control: 'boolean',
            description: 'Show bond lines between quarks (future: gluon visualization)',
        },
        showOverlap: {
            control: 'boolean',
            description: 'Show overlap sphere when quarks are close (bondDistance < threshold)',
        },
        overlapThreshold: {
            control: { type: 'range', min: 2, max: 10, step: 0.5 },
            description: 'Distance threshold for showing overlap sphere (px)',
        },
        qcdColor1: {
            control: 'select',
            options: Object.values(QCDColorCharge),
            description: 'QCD color for first quark',
        },
        qcdColor2: {
            control: 'select',
            options: Object.values(QCDColorCharge),
            description: 'QCD color for second quark',
        },
        qcdColor3: {
            control: 'select',
            options: Object.values(QCDColorCharge),
            description: 'QCD color for third quark',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// DEFAULT - Proton example with controls
// ============================================================================

export const Default: Story = {
    args: {
        baryonType: 3, // Proton (uud)
        showBond: true,
        bondDistance: 3,
        showOverlap: true,
        overlapThreshold: 5,
        qcdColor1: QCDColorCharge.RED,
        qcdColor2: QCDColorCharge.GREEN,
        qcdColor3: QCDColorCharge.BLUE,
    },
    parameters: {
        docs: {
            description: {
                story: '**Proton (p+)** - Most stable baryon, composed of two up quarks and one down quark (uud). Electric charge: +1. Mass: 938.2 MeV/c². Use the Controls tab to explore all 70 baryons and adjust bondDistance to see the overlap effect.',
            },
        },
    },
};

// ============================================================================
// OVERLAP EFFECT - QCD Color Confinement Visualization
// ============================================================================

export const OverlapComparison: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <UIBaryonParticle
                        baryonType={1} // Delta++ (uuu)
                        bondDistance={2}
                        showBond={true}
                        showOverlap={true}
                        qcdColor1={QCDColorCharge.RED}
                        qcdColor2={QCDColorCharge.GREEN}
                        qcdColor3={QCDColorCharge.BLUE}
                    />
                    <div style={{ marginTop: '8px', color: 'var(--color-gray)', fontSize: '12px' }}>
                        Delta++ (uuu)<br />Gray Core
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIBaryonParticle
                        baryonType={3} // Proton (uud)
                        bondDistance={2}
                        showBond={true}
                        showOverlap={true}
                        qcdColor1={QCDColorCharge.RED}
                        qcdColor2={QCDColorCharge.GREEN}
                        qcdColor3={QCDColorCharge.BLUE}
                    />
                    <div style={{ marginTop: '8px', color: 'var(--color-gray)', fontSize: '12px' }}>
                        Proton (uud)<br />Black Core
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIBaryonParticle
                        baryonType={5} // Neutron (udd)
                        bondDistance={2}
                        showBond={true}
                        showOverlap={true}
                        qcdColor1={QCDColorCharge.RED}
                        qcdColor2={QCDColorCharge.GREEN}
                        qcdColor3={QCDColorCharge.BLUE}
                    />
                    <div style={{ marginTop: '8px', color: 'var(--color-gray)', fontSize: '12px' }}>
                        Neutron (udd)<br />White Core
                    </div>
                </div>
            </div>
            <div style={{ color: 'var(--color-gray)', fontSize: '14px', maxWidth: '600px', textAlign: 'center' }}>
                When quarks are tightly bound (bondDistance = 2px), a color-neutral overlap sphere appears at the centroid.
                The color depends on quark composition: <strong>Proton (uud) = Black</strong>, <strong>Neutron (udd) = White</strong>, <strong>Others = Gray</strong>.
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '**QCD Color Confinement** - Comparison of three baryons with overlap spheres. Delta++ (uuu), Proton (uud), and Neutron (udd) show different core colors when quarks are tightly bound. This visualizes the color-neutral state formed by QCD confinement.',
            },
        },
    },
};

export const OverlapTransition: Story = {
    render: (args) => {
        const distance = args.bondDistance ?? 6;
        return (
            <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
                <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-end' }}>
                    <div style={{ textAlign: 'center' }}>
                        <UIBaryonParticle
                            baryonType={1} // Delta++ (uuu)
                            bondDistance={distance}
                            showBond={true}
                            showOverlap={true}
                            overlapThreshold={6}
                            qcdColor1={QCDColorCharge.RED}
                            qcdColor2={QCDColorCharge.GREEN}
                            qcdColor3={QCDColorCharge.BLUE}
                        />
                        <div style={{ marginTop: '12px', color: 'var(--color-gray)', fontSize: '13px' }}>
                            <strong>Delta++ (uuu)</strong><br />
                            Gray Core
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIBaryonParticle
                            baryonType={3} // Proton (uud)
                            bondDistance={distance}
                            showBond={true}
                            showOverlap={true}
                            overlapThreshold={6}
                            qcdColor1={QCDColorCharge.RED}
                            qcdColor2={QCDColorCharge.GREEN}
                            qcdColor3={QCDColorCharge.BLUE}
                        />
                        <div style={{ marginTop: '12px', color: 'var(--color-gray)', fontSize: '13px' }}>
                            <strong>Proton (uud)</strong><br />
                            Black Core
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIBaryonParticle
                            baryonType={5} // Neutron (udd)
                            bondDistance={distance}
                            showBond={true}
                            showOverlap={true}
                            overlapThreshold={6}
                            qcdColor1={QCDColorCharge.RED}
                            qcdColor2={QCDColorCharge.GREEN}
                            qcdColor3={QCDColorCharge.BLUE}
                        />
                        <div style={{ marginTop: '12px', color: 'var(--color-gray)', fontSize: '13px' }}>
                            <strong>Neutron (udd)</strong><br />
                            White Core
                        </div>
                    </div>
                </div>
                <div style={{
                    background: 'var(--color-background)',
                    padding: '16px',
                    borderRadius: '8px',
                    maxWidth: '700px',
                    textAlign: 'center'
                }}>
                    <div style={{ color: 'var(--color-white)', fontSize: '16px', marginBottom: '12px' }}>
                        <strong>Interactive Bond Distance Control</strong>
                    </div>
                    <div style={{ color: 'var(--color-gray)', fontSize: '14px', lineHeight: '1.5' }}>
                        Use the <strong>bondDistance</strong> control below to adjust quark proximity (1-20px).
                        <br />
                        When bondDistance {'<'} 6px, the overlap sphere appears showing QCD color confinement:
                        <br /><br />
                        <span style={{ color: '#808080' }}>● <strong>Delta++</strong> (uuu) = Gray</span> |
                        <span style={{ color: '#FFFFFF' }}> ● <strong>Proton</strong> (uud) = Black</span> |
                        <span style={{ color: '#FFFFFF' }}> ● <strong>Neutron</strong> (udd) = White</span>
                        <br /><br />
                        <em>Smaller distances = larger, more opaque overlap (stronger confinement)</em>
                    </div>
                </div>
            </div>
        );
    },
    args: {
        bondDistance: 3,
    },
    argTypes: {
        bondDistance: {
            control: { type: 'range', min: 1, max: 20, step: 0.5 },
            description: 'Adjust to see overlap animation (threshold: 6px)',
        },
    },
    parameters: {
        docs: {
            description: {
                story: '**Interactive Overlap Transition** - Live demonstration of QCD color confinement. Adjust bondDistance slider to see all three baryons transition from separated quarks to merged color-neutral cores. Each baryon type produces a unique overlap color based on quark composition.',
            },
        },
    },
};

export const ProtonTightBinding: Story = {
    args: {
        baryonType: 3, // Proton (uud)
        bondDistance: 1.5,
        showBond: true,
        showOverlap: true,
        overlapThreshold: 5,
        qcdColor1: QCDColorCharge.RED,
        qcdColor2: QCDColorCharge.GREEN,
        qcdColor3: QCDColorCharge.BLUE,
    },
    parameters: {
        docs: {
            description: {
                story: '**Proton Tight Binding** - Extremely small bondDistance (1.5px) shows maximum overlap with **black core**. This represents high-energy confinement state where quarks are squeezed together.',
            },
        },
    },
};

export const NeutronTightBinding: Story = {
    args: {
        baryonType: 5, // Neutron (udd)
        bondDistance: 1.5,
        showBond: true,
        showOverlap: true,
        overlapThreshold: 5,
        qcdColor1: QCDColorCharge.RED,
        qcdColor2: QCDColorCharge.GREEN,
        qcdColor3: QCDColorCharge.BLUE,
    },
    parameters: {
        docs: {
            description: {
                story: '**Neutron Tight Binding** - Extremely small bondDistance (1.5px) shows maximum overlap with **white core**. The white sphere distinguishes neutron from proton at high confinement.',
            },
        },
    },
};

export const DeltaTightBinding: Story = {
    args: {
        baryonType: 1, // Delta++ (uuu)
        bondDistance: 1.5,
        showBond: true,
        showOverlap: true,
        overlapThreshold: 5,
        qcdColor1: QCDColorCharge.RED,
        qcdColor2: QCDColorCharge.GREEN,
        qcdColor3: QCDColorCharge.BLUE,
    },
    parameters: {
        docs: {
            description: {
                story: '**Delta++ Tight Binding** - Extremely small bondDistance (1.5px) shows maximum overlap with **gray core**. Three identical quarks (uuu) produce neutral gray.',
            },
        },
    },
};

export const NormalBaryon: Story = {
    args: {
        baryonType: 3, // Proton
        bondDistance: 8,
        showBond: true,
        showOverlap: true,
        overlapThreshold: 4,
        qcdColor1: QCDColorCharge.RED,
        qcdColor2: QCDColorCharge.GREEN,
        qcdColor3: QCDColorCharge.BLUE,
    },
    parameters: {
        docs: {
            description: {
                story: '**Normal State** - At typical bondDistance (8px), quarks are separated and no overlap sphere appears. This represents normal baryon ground state.',
            },
        },
    },
};

export const CustomComposition: Story = {
    render: () => (
        <UIBaryonParticle showBond={true} showOverlap={true} bondDistance={2}>
            <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.RED} />
            <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.GREEN} />
            <UIParticle particleType={ParticleList.DOWN} qcdColor={QCDColorCharge.BLUE} />
        </UIBaryonParticle>
    ),
    parameters: {
        docs: {
            description: {
                story: '**Composition Mode** - Manually specify quarks as children. This gives full control over particle types and QCD colors. Shows overlap sphere (gray by default in composition mode).',
            },
        },
    },
};
