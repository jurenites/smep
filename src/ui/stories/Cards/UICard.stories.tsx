import type { Meta, StoryObj } from '@storybook/react';
import { UICard, UICardState } from '../../components/Cards/UICard';
import { ParticleList } from '../../../lib/data/particle-quantum.data';

// Get all atomic element symbols and meson data
import { PERIODIC_TABLE_DATA, MESON_DATA } from '../../../lib/data';

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

// Enhanced wrapper component for better Storybook controls
const UICardWithEnhancedControls = (props: any) => {
    return <UICard {...props} />;
};

const meta: Meta<typeof UICard> = {
    title: 'UI/UICard',
    component: UICardWithEnhancedControls,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        textSymbol: {
            control: 'text',
            description: 'The text symbol to display on the card',
        },
        textNumber: {
            control: 'number',
            description: 'Numeric identifier (atomic number, inventory count, etc.) - only shown on mid/big sizes',
        },
        cardState: {
            control: 'select',
            options: [UICardState.NORMAL, UICardState.DISABLED],
            description: 'State of the card',
        },
        logicalSize: {
            control: 'select',
            options: ['small', 'mid', 'big'],
            description: 'Logical size of the card',
        },
        showParticle: {
            control: 'boolean',
            description: 'Show particle circle (quantum particles use UIParticle, mesons use UIMesonParticle, atomic elements use UICircle)',
        },
        particleType: {
            control: 'select',
            options: ALL_PARTICLE_OPTIONS,
            mapping: PARTICLE_MAPPING,
            description: 'Type of particle to display: Quantum (24), Mesons (25 - auto-detected), or Atomic (118)',
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when card is clicked',
        },
    },
    args: {
        textSymbol: 'e⁻',
        cardState: UICardState.NORMAL,
        logicalSize: 'small',
        showParticle: true,
        particleType: ParticleList.ELECTRON,
        onClick: () => console.log('Card clicked!'),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;


// Default story - UICard with all controls
export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: `UICard component with all available controls. Use the Controls panel to modify properties and see real-time changes.`,
            },
        },
    },
};

// Test story to verify background color
export const BackgroundColorTest: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            gap: '20px',
            padding: '20px',
            background: '#000',
            flexWrap: 'wrap'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px' }}>Small Card</div>
                <div style={{
                    backgroundColor: '#232323',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #333'
                }}>
                    <UICard
                        logicalSize="small"
                        cardState={UICardState.NORMAL}
                        textSymbol="e⁻"
                        showParticle={true}
                        particleType={ParticleList.ELECTRON}
                        onClick={() => console.log('Small card clicked!')}
                        style={{
                            '--card-background-color': '#232323',
                            backgroundColor: '#232323'
                        } as React.CSSProperties}
                    />
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px' }}>Mid Card (Atomic Element)</div>
                <div style={{
                    backgroundColor: '#232323',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #333'
                }}>
                    <UICard
                        logicalSize="mid"
                        cardState={UICardState.NORMAL}
                        textSymbol="H"
                        textNumber={1}
                        showParticle={true}
                        particleType="H"
                        onClick={() => console.log('Mid card clicked!')}
                        style={{
                            '--card-background-color': '#232323',
                            backgroundColor: '#232323'
                        } as React.CSSProperties}
                    />
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px' }}>Big Card</div>
                <div style={{
                    backgroundColor: '#232323',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #333'
                }}>
                    <UICard
                        logicalSize="big"
                        cardState={UICardState.NORMAL}
                        textSymbol="Custom"
                        showParticle={false}
                        particleType="Custom"
                        onClick={() => console.log('Big card clicked!')}
                        style={{
                            '--card-background-color': '#232323',
                            backgroundColor: '#232323'
                        } as React.CSSProperties}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `Test story to verify that all UICard sizes have the correct dark-gray background color (#232323). The cards are wrapped in dark containers to make any white backgrounds visible.`,
            },
        },
    },
};

// Atomic Elements with UICircle story
export const AtomicElementsWithCircles: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            gap: '20px',
            padding: '20px',
            background: '#000',
            flexWrap: 'wrap'
        }}>
            {/* Hydrogen */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Hydrogen (H)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="H"
                    textNumber={1}
                    showParticle={true}
                    particleType="H"
                />
            </div>

            {/* Carbon */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Carbon (C)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="C"
                    textNumber={6}
                    showParticle={true}
                    particleType="C"
                />
            </div>

            {/* Oxygen */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Oxygen (O)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="O"
                    textNumber={8}
                    showParticle={true}
                    particleType="O"
                />
            </div>

            {/* Iron */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Iron (Fe)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="Fe"
                    textNumber={26}
                    showParticle={true}
                    particleType="Fe"
                />
            </div>

            {/* Gold */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Gold (Au)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="Au"
                    textNumber={79}
                    showParticle={true}
                    particleType="Au"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `Atomic elements displayed with UICircle component. Each circle's diameter is based on the 'relativeDiameter' property and colored with the 'coreColor' from atomic data. Use the Controls panel in the Default story to explore all 118 elements.`,
            },
        },
    },
};

// Meson particles story
export const MesonParticles: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            gap: '20px',
            padding: '20px',
            background: '#000',
            flexWrap: 'wrap'
        }}>
            {/* Charged Pion */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Charged Pion (π+)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="π+"
                    textNumber={1}
                    showParticle={true}
                    particleType={1}
                />
            </div>

            {/* Charged Kaon */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Charged Kaon (K+)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="K+"
                    textNumber={5}
                    showParticle={true}
                    particleType={5}
                />
            </div>

            {/* Charged D Meson */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Charged D Meson (D+)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="D+"
                    textNumber={9}
                    showParticle={true}
                    particleType={9}
                />
            </div>

            {/* Phi Meson */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Phi Meson (φ)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="φ"
                    textNumber={23}
                    showParticle={true}
                    particleType={23}
                />
            </div>

            {/* J/Psi */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>J/Psi (J/ψ)</div>
                <UICard
                    logicalSize="small"
                    cardState={UICardState.NORMAL}
                    textSymbol="J/ψ"
                    textNumber={25}
                    showParticle={true}
                    particleType={25}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `Meson particles displayed as composite particles (quark-antiquark pairs). Each meson shows two bonded quarks with proper matter/antimatter gradient rendering. Mesons are automatically detected when particleType is a number (1-25). Use the Controls panel in the Default story to explore all 25 mesons.`,
            },
        },
    },
};