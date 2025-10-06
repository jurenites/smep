import type { Meta, StoryObj } from '@storybook/react';
import { UICard, UICardState } from '../../components/UICard/UICard';
import { ParticleList } from '../../../lib/data/particle-quantum.data';

// Get all atomic element symbols from the data
import { PERIODIC_TABLE_DATA } from '../../../lib/data';

const QUANTUM_PARTICLE_OPTIONS = Object.values(ParticleList);
const ATOMIC_ELEMENT_SYMBOLS = PERIODIC_TABLE_DATA.map(element => element.properties.symbol);

// Concatenated list of all possible particles
const ALL_PARTICLE_OPTIONS = [
    ...QUANTUM_PARTICLE_OPTIONS,
    ...ATOMIC_ELEMENT_SYMBOLS,
];

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
            description: 'Show particle instead of circle',
        },
        particleType: {
            control: 'select',
            options: ALL_PARTICLE_OPTIONS,
            description: 'Type of particle to display (quantum particles, atomic elements)',
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
                <div style={{ color: 'white', marginBottom: '10px' }}>Mid Card</div>
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
                        showParticle={false}
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