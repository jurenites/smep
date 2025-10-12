import type { Meta, StoryObj } from '@storybook/react';
import { UIParticle } from '../../components/Particles/UIParticle';
import { UIMesonParticle } from '../../components/Particles/UIMesonParticle';
import { UILabel } from '../../components/Text/UILabel';
import { UICircle } from '../../components/Primitives/UICircle';
import { ParticleList, QCDColorCharge, getFormattedParticleSymbolByType } from '../../../lib/data/particle-quantum.data';
import { MESON_DATA } from '../../../lib/data/particle-hadron-meson.data';
import { PERIODIC_TABLE_DATA, getElementBySymbol } from '../../../lib/data/particle-atomic.data';

// Quantum particles (24 total)
const QUANTUM_PARTICLE_OPTIONS = Object.values(ParticleList);

// Mesons (25 total) - create labeled options with primaryId values
const MESON_OPTIONS_LABELED = MESON_DATA.map(meson => ({
    label: `[Meson] ${meson.properties.name} (${meson.properties.symbol})`,
    value: meson.properties.primaryId
}));

// Atomic elements (118 total)
const ATOMIC_ELEMENT_OPTIONS = PERIODIC_TABLE_DATA.map(element => ({
    label: `[Atomic] ${element.properties.name} (${element.properties.symbol})`,
    value: element.properties.symbol
}));

// Create display labels for quantum particles
const QUANTUM_PARTICLE_OPTIONS_LABELED = QUANTUM_PARTICLE_OPTIONS.map(particle => ({
    label: `[Quantum] ${particle}`,
    value: particle
}));

// Concatenated list of all possible particles with labels
const ALL_PARTICLE_OPTIONS = [
    ...QUANTUM_PARTICLE_OPTIONS_LABELED.map(p => p.label),
    ...MESON_OPTIONS_LABELED.map(m => m.label),
    ...ATOMIC_ELEMENT_OPTIONS.map(a => a.label),
];

// Mapping for Storybook to convert display labels to actual values
const PARTICLE_MAPPING = {
    ...Object.fromEntries(QUANTUM_PARTICLE_OPTIONS_LABELED.map(p => [p.label, p.value])),
    ...Object.fromEntries(MESON_OPTIONS_LABELED.map(m => [m.label, m.value])),
    ...Object.fromEntries(ATOMIC_ELEMENT_OPTIONS.map(a => [a.label, a.value])),
};

// QCD color options for quarks (including colorless option)
const QCD_COLOR_OPTIONS = [
    'default',
    ...Object.values(QCDColorCharge),
] as const;

// Smart particle renderer that handles all three particle types
interface SmartParticleRendererProps {
    particleType: ParticleList | string | number;
    qcdColor?: QCDColorCharge;
    qcdColor1?: QCDColorCharge;
    qcdColor2?: QCDColorCharge;
    onClick?: () => void;
    className?: string;
    showBond?: boolean;
    bondDistance?: number;
}

function SmartParticleRenderer({ particleType, qcdColor, qcdColor1, qcdColor2, onClick, className, showBond, bondDistance }: SmartParticleRendererProps) {
    // Check if it's a quantum particle
    if (typeof particleType === 'string' && Object.values(ParticleList).includes(particleType as ParticleList)) {
        return <UIParticle particleType={particleType as ParticleList} qcdColor={qcdColor} onClick={onClick} className={className} />;
    }

    // Check if it's a meson (numeric primaryId 1-25)
    if (typeof particleType === 'number' && particleType >= 1 && particleType <= 25) {
        return <UIMesonParticle mesonType={particleType} qcdColor1={qcdColor1} qcdColor2={qcdColor2} showBond={showBond} bondDistance={bondDistance} onClick={onClick} className={className} />;
    }

    // Check if it's an atomic element (string symbol)
    if (typeof particleType === 'string') {
        const element = getElementBySymbol(particleType);
        if (element) {
            const diameter = element.properties.relativeDiameter;
            const color = element.render.coreColor;
            return <UICircle logicalSize="small" actualSize={diameter} color={color} onClick={onClick} className={className} />;
        }
    }

    // Fallback to electron
    return <UIParticle particleType={ParticleList.ELECTRON} onClick={onClick} className={className} />;
}

const meta: Meta<typeof SmartParticleRenderer> = {
    title: 'Particles/UIParticles',
    component: SmartParticleRenderer,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Unified particle visualization supporting three types: Quantum particles (24 leptons, neutrinos, quarks from Standard Model), Mesons (25 composite particles), and Atomic elements (118 elements). Quantum particles show matter/antimatter colors with QCD charges for quarks. Mesons display quark-antiquark pairs. Atomic elements render as colored circles based on atomic properties.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        particleType: {
            control: { type: 'select' },
            options: ALL_PARTICLE_OPTIONS,
            mapping: PARTICLE_MAPPING,
            description: 'Type of particle to display: Quantum (24), Mesons (25), or Atomic (118)',
        },
        qcdColor: {
            control: { type: 'select' },
            options: QCD_COLOR_OPTIONS,
            mapping: {
                'default': undefined,
                [QCDColorCharge.RED]: QCDColorCharge.RED,
                [QCDColorCharge.GREEN]: QCDColorCharge.GREEN,
                [QCDColorCharge.BLUE]: QCDColorCharge.BLUE,
                [QCDColorCharge.CYAN]: QCDColorCharge.CYAN,
                [QCDColorCharge.MAGENTA]: QCDColorCharge.MAGENTA,
                [QCDColorCharge.YELLOW]: QCDColorCharge.YELLOW,
                [QCDColorCharge.COLORLESS]: QCDColorCharge.COLORLESS,
            },
            description: 'QCD color charge (quarks only). Defaults to "colorless" (gray). Select red/green/blue for matter quarks, or cyan/magenta/yellow for antimatter quarks. This control only affects quantum quarks; it will be ignored for leptons, neutrinos, mesons, and atomic elements.',
        },
        qcdColor1: {
            control: { type: 'select' },
            options: QCD_COLOR_OPTIONS,
            mapping: {
                'default': undefined,
                [QCDColorCharge.RED]: QCDColorCharge.RED,
                [QCDColorCharge.GREEN]: QCDColorCharge.GREEN,
                [QCDColorCharge.BLUE]: QCDColorCharge.BLUE,
                [QCDColorCharge.CYAN]: QCDColorCharge.CYAN,
                [QCDColorCharge.MAGENTA]: QCDColorCharge.MAGENTA,
                [QCDColorCharge.YELLOW]: QCDColorCharge.YELLOW,
                [QCDColorCharge.COLORLESS]: QCDColorCharge.COLORLESS,
            },
            description: 'QCD color for first quark in mesons. Defaults to colorless (gray). Only affects meson particles.',
        },
        qcdColor2: {
            control: { type: 'select' },
            options: QCD_COLOR_OPTIONS,
            mapping: {
                'default': undefined,
                [QCDColorCharge.RED]: QCDColorCharge.RED,
                [QCDColorCharge.GREEN]: QCDColorCharge.GREEN,
                [QCDColorCharge.BLUE]: QCDColorCharge.BLUE,
                [QCDColorCharge.CYAN]: QCDColorCharge.CYAN,
                [QCDColorCharge.MAGENTA]: QCDColorCharge.MAGENTA,
                [QCDColorCharge.YELLOW]: QCDColorCharge.YELLOW,
                [QCDColorCharge.COLORLESS]: QCDColorCharge.COLORLESS,
            },
            description: 'QCD color for second quark in mesons. Defaults to colorless (gray). Only affects meson particles.',
        },
        showBond: {
            control: 'boolean',
            description: 'Show bond/gluon between quarks in mesons (future: will be actual Gluon force carrier particles). Only affects meson particles.',
        },
        bondDistance: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Distance between quark centers in pixels. Only affects meson particles.',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - interactive particle selector
export const Default: Story = {
    args: {
        particleType: ParticleList.ELECTRON,
        qcdColor: undefined,
        qcdColor1: undefined,
        qcdColor2: undefined,
        showBond: false,
        bondDistance: 3,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive particle selector supporting all particle types. Use the Controls panel to switch between Quantum particles (24), Mesons (25), and Atomic elements (118). Quarks default to colorless (gray). For mesons: use qcdColor1/qcdColor2 for quark colors, showBond to display the connection, and bondDistance to adjust spacing. The bond is a placeholder for future Gluon force carriers.',
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
                    <UILabel fontVariant="body" color="white">
                        Leptons (Matter)
                    </UILabel>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.ELECTRON} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
                                {getFormattedParticleSymbolByType(ParticleList.ELECTRON)}
                            </UILabel>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.MUON} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
                                {getFormattedParticleSymbolByType(ParticleList.MUON)}
                            </UILabel>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.TAU} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
                                {getFormattedParticleSymbolByType(ParticleList.TAU)}
                            </UILabel>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '16px' }}>
                    <UILabel fontVariant="body" color="white">
                        Antileptons (Antimatter)
                    </UILabel>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.POSITRON} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
                                {getFormattedParticleSymbolByType(ParticleList.POSITRON)}
                            </UILabel>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.ANTI_MUON} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
                                {getFormattedParticleSymbolByType(ParticleList.ANTI_MUON)}
                            </UILabel>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.ANTI_TAU} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
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
                <UILabel fontVariant="body" color="white">
                    Neutrinos (No Shadows)
                </UILabel>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.ELECTRON_NEUTRINO} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="white">
                            {getFormattedParticleSymbolByType(ParticleList.ELECTRON_NEUTRINO)}
                        </UILabel>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.MUON_NEUTRINO} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="white">
                            {getFormattedParticleSymbolByType(ParticleList.MUON_NEUTRINO)}
                        </UILabel>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <UIParticle particleType={ParticleList.TAU_NEUTRINO} />
                    <div style={{ marginTop: '8px' }}>
                        <UILabel fontVariant="body" color="white">
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

// Quarks showcase (mini size with 3D sphere gradients)
export const Quarks: Story = {
    render: () => (
        <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>
                <UILabel fontVariant="body" color="white">
                    Quarks (3D Sphere with Depth Shadow)
                </UILabel>
            </div>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <div style={{ marginBottom: '12px', color: 'white' }}>Matter Quarks</div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.UP} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Up (u)
                                </UILabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.DOWN} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Down (d)
                                </UILabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.CHARM} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white" >
                                    Charm (c)
                                </UILabel>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: '12px', color: 'white' }}>Antimatter Quarks</div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.ANTI_UP} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Anti-up (ū)
                                </UILabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.ANTI_DOWN} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Anti-down (đ)
                                </UILabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.ANTI_CHARM} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Anti-charm (ĉ)
                                </UILabel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Quarks feature 3D sphere rendering with radial gradients and depth shadows. Matter quarks have bright centers fading to dark edges. Antimatter quarks have inverted gradients (dark center to bright edges). Each quark has an infinite glow animation with randomized timing.',
            },
        },
    },
};

// QCD Color Charges showcase
export const QCDColors: Story = {
    render: () => (
        <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>
                <UILabel fontVariant="body" color="white">
                    QCD Color Charges (Quarks)
                </UILabel>
            </div>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div>
                    <div style={{ marginBottom: '12px', color: 'white' }}>Matter Colors</div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.RED} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Red
                                </UILabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.GREEN} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Green
                                </UILabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.BLUE} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Blue
                                </UILabel>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.UP} qcdColor={QCDColorCharge.COLORLESS} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
                                Colorless (Gray)
                            </UILabel>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: '12px', color: 'white' }}>Antimatter Anticolors</div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.ANTI_UP} qcdColor={QCDColorCharge.CYAN} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Cyan (Antired)
                                </UILabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.ANTI_UP} qcdColor={QCDColorCharge.MAGENTA} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Magenta (Antigreen)
                                </UILabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <UIParticle particleType={ParticleList.ANTI_UP} qcdColor={QCDColorCharge.YELLOW} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">
                                    Yellow (Antiblue)
                                </UILabel>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <UIParticle particleType={ParticleList.ANTI_UP} qcdColor={QCDColorCharge.COLORLESS} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
                                Colorless (Gray)
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
                story: 'QCD (Quantum Chromodynamics) color charges for quarks. Quarks default to colorless (gray) and can be assigned colors dynamically. Matter quarks can have red, green, or blue color charges. Antimatter quarks have anticolors: cyan (antired), magenta (antigreen), and yellow (antiblue). For colorless quarks, the QCD layer uses separate gradients: matter uses --qcd-gradient-colorless (light gray #dddddd → dark gray #232323), antimatter uses --qcd-gradient-colorless-anti (dark gray #232323 → light gray #dddddd).',
            },
        },
    },
};

// Meson Composition - Full control over quarks and colors
export const MesonComposition: Story = {
    render: (args) => (
        <UIMesonParticle showBond={args.showBond} bondDistance={args.bondDistance}>
            <UIParticle
                particleType={ParticleList.UP}
                qcdColor={args.qcdColor1}
            />
            <UIParticle
                particleType={ParticleList.ANTI_DOWN}
                qcdColor={args.qcdColor2}
            />
        </UIMesonParticle>
    ),
    args: {
        qcdColor1: undefined,  // defaults to colorless
        qcdColor2: undefined,  // defaults to colorless
        showBond: false,
        bondDistance: 3,
    },
    argTypes: {
        qcdColor1: {
            control: { type: 'select' },
            options: QCD_COLOR_OPTIONS,
            mapping: {
                'default': undefined,
                [QCDColorCharge.RED]: QCDColorCharge.RED,
                [QCDColorCharge.GREEN]: QCDColorCharge.GREEN,
                [QCDColorCharge.BLUE]: QCDColorCharge.BLUE,
                [QCDColorCharge.CYAN]: QCDColorCharge.CYAN,
                [QCDColorCharge.MAGENTA]: QCDColorCharge.MAGENTA,
                [QCDColorCharge.YELLOW]: QCDColorCharge.YELLOW,
                [QCDColorCharge.COLORLESS]: QCDColorCharge.COLORLESS,
            },
            description: 'QCD color for first quark (matter). Defaults to colorless (gray).',
        },
        qcdColor2: {
            control: { type: 'select' },
            options: QCD_COLOR_OPTIONS,
            mapping: {
                'default': undefined,
                [QCDColorCharge.RED]: QCDColorCharge.RED,
                [QCDColorCharge.GREEN]: QCDColorCharge.GREEN,
                [QCDColorCharge.BLUE]: QCDColorCharge.BLUE,
                [QCDColorCharge.CYAN]: QCDColorCharge.CYAN,
                [QCDColorCharge.MAGENTA]: QCDColorCharge.MAGENTA,
                [QCDColorCharge.YELLOW]: QCDColorCharge.YELLOW,
                [QCDColorCharge.COLORLESS]: QCDColorCharge.COLORLESS,
            },
            description: 'QCD color for second quark (antimatter). Defaults to colorless (gray).',
        },
        showBond: {
            control: 'boolean',
            description: 'Show bond/gluon between quarks (future: will be actual Gluon force carrier particles with 8 QCD color variants)',
        },
        bondDistance: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Distance between quark centers in pixels',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Meson composition pattern with full control over quark types and QCD colors. Uses UIParticle children for scalability. Future: Bond will be replaced with UIGluon force carrier component.',
            },
        },
    },
};

// Mesons showcase (composite particles)
export const Mesons: Story = {
    render: () => (
        <div style={{ textAlign: 'center', background: '#000', padding: '20px', borderRadius: '8px' }}>
            <div style={{ marginBottom: '16px' }}>
                <UILabel fontVariant="body" color="white">
                    Mesons (Composite Particles)
                </UILabel>
            </div>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                {/* Pion Family */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '8px', color: 'white', fontSize: '10px' }}>Pion Family</div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div>
                            <UIMesonParticle mesonType={1} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">π+</UILabel>
                            </div>
                        </div>
                        <div>
                            <UIMesonParticle mesonType={2} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">π-</UILabel>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kaon Family */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '8px', color: 'white', fontSize: '10px' }}>Kaon Family</div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div>
                            <UIMesonParticle mesonType={5} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">K+</UILabel>
                            </div>
                        </div>
                        <div>
                            <UIMesonParticle mesonType={7} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">K0</UILabel>
                            </div>
                        </div>
                    </div>
                </div>

                {/* D Meson Family */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '8px', color: 'white', fontSize: '10px' }}>D Meson Family</div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div>
                            <UIMesonParticle mesonType={9} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">D+</UILabel>
                            </div>
                        </div>
                        <div>
                            <UIMesonParticle mesonType={11} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">D0</UILabel>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Heavy Quarkonia */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '8px', color: 'white', fontSize: '10px' }}>Heavy Quarkonia</div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div>
                            <UIMesonParticle mesonType={23} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">φ</UILabel>
                            </div>
                        </div>
                        <div>
                            <UIMesonParticle mesonType={25} />
                            <div style={{ marginTop: '8px' }}>
                                <UILabel fontVariant="body" color="white">J/ψ</UILabel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Mesons are composite particles made of a quark-antiquark pair. Quarks default to colorless (gray). Use qcdColor1 and qcdColor2 controls in the Default story to assign specific QCD colors to each quark and experiment with different color combinations. Each meson displays two bonded quarks with proper matter/antimatter gradient rendering and depth shadows for overlapping perception. The bond distance is configurable (default 3px).',
            },
        },
    },
};