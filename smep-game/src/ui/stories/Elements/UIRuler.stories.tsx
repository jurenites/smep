import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIRuler } from '../../components/Elements/UIRuler';
import { FontProvider } from '../../components/Providers/FontProvider';
import '../../tokens/tokens.css';

// Direct font loading for Storybook
const load4PixelFont = async () => {
    try {
        console.log('Loading 4pixel font directly...');
        const fontFace = new FontFace('4pixel', 'url(/assets/fonts/4pixel.woff) format("woff")');
        await fontFace.load();
        document.fonts.add(fontFace);
        console.log('4pixel font loaded successfully');
    } catch (error) {
        console.error('Failed to load 4pixel font:', error);
    }
};

// Load font when module loads
load4PixelFont();

const meta: Meta<typeof UIRuler> = {
    title: 'UI/UIRuler',
    component: UIRuler,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            // Debug font loading
            console.log('UIRuler Story: FontProvider wrapper loaded');
            return (
                <FontProvider>
                    <div style={{
                        background: '#000',
                        padding: '20px',
                        fontFamily: '4pixel, monospace'
                    }}>
                        <Story />
                    </div>
                </FontProvider>
            );
        },
    ],
    argTypes: {
        scale: {
            control: { type: 'number', min: 0.001, max: 1000000, step: 0.1 },
            description: 'Scale factor to display',
        },
        scaleType: {
            control: 'select',
            options: ['linear', 'logarithmic'],
            description: 'Type of scale for tick distribution',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        scale: 1,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default ruler with linear scale, progressive tick visibility, and 109px width using 4pixel font.',
            },
        },
    },
};

export const Logarithmic: Story = {
    args: {
        scale: 1,
        scaleType: 'logarithmic',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler with logarithmic scale distribution and adaptive tick spacing.',
            },
        },
    },
};

export const ScientificNotation: Story = {
    args: {
        scale: 1000,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler with scientific notation annotation (X × 10^Y format) with positive/negative powers.',
            },
        },
    },
};

export const ZoomAnimation: Story = {
    args: {
        scale: 1.2,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler showing smooth zoom animation with progressive tick visibility (scale 1.2 shows 3 ticks with smooth transition).',
            },
        },
    },
};

export const SmoothTransition: Story = {
    args: {
        scale: 1.8,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler demonstrating smooth tick transition animation during zoom.',
            },
        },
    },
};

export const JumpOverEarly: Story = {
    args: {
        scale: 10.2,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler showing "jump over" behavior at scale 10.2 (should show ~4 ticks).',
            },
        },
    },
};

export const JumpOverMid: Story = {
    args: {
        scale: 10.5,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler showing "jump over" behavior at scale 10.5 (should show ~6 ticks).',
            },
        },
    },
};

export const JumpOverLate: Story = {
    args: {
        scale: 10.8,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler showing "jump over" behavior at scale 10.8 (should show ~8 ticks).',
            },
        },
    },
};

export const DynamicLabelKm: Story = {
    args: {
        scale: 1000,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler with dynamic label showing "km" for kilometer scale.',
            },
        },
    },
};

export const DynamicLabelGm: Story = {
    args: {
        scale: 1000000,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler with dynamic label showing "Gm" for Giga meter scale.',
            },
        },
    },
};

export const LogarithmicSpacing: Story = {
    args: {
        scale: 5,
        scaleType: 'logarithmic',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler showing proper logarithmic tick spacing with compressed gaps at the beginning.',
            },
        },
    },
};

export const LinearVsLogarithmic: Story = {
    render: () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#000', padding: '20px' }}>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Linear Scale (even spacing)</div>
                    <UIRuler scale={5} scaleType="linear" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Logarithmic Scale (compressed spacing)</div>
                    <UIRuler scale={5} scaleType="logarithmic" />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Comparison showing the difference between linear and logarithmic tick spacing.',
            },
        },
    },
};

export const SmoothAnimation39: Story = {
    args: {
        scale: 3.9,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler at scale 3.9 showing smooth animation with partial tick visibility.',
            },
        },
    },
};

export const SmoothAnimation35: Story = {
    args: {
        scale: 3.5,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler at scale 3.5 showing gradual tick and line growth.',
            },
        },
    },
};

export const SmoothAnimation32: Story = {
    args: {
        scale: 3.2,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler at scale 3.2 showing early stage of tick animation.',
            },
        },
    },
};

export const DynamicTickDemo: Story = {
    args: {
        scale: 3.7,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler showing the dynamic tick that follows the growing edge of the scale (1px height, 70% opacity).',
            },
        },
    },
};

export const DynamicTickLogarithmic: Story = {
    args: {
        scale: 4.3,
        scaleType: 'logarithmic',
    },
    parameters: {
        docs: {
            description: {
                story: 'Logarithmic ruler showing dynamic tick with proper logarithmic spacing.',
            },
        },
    },
};

export const JumpOver10to100: Story = {
    args: {
        scale: 50.0,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler at scale 50.0 showing jump over from 10.01-100.0 range (powers of 10).',
            },
        },
    },
};

export const JumpOver100to1000: Story = {
    args: {
        scale: 500.0,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler at scale 500.0 showing jump over from 100.01-1000.0 range (powers of 10).',
            },
        },
    },
};

export const JumpOver1000to10000: Story = {
    args: {
        scale: 5000.0,
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Ruler at scale 5000.0 showing jump over from 1000.01-10000.0 range (powers of 10).',
            },
        },
    },
};

export const LinearScaleDemo: Story = {
    render: () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#000', padding: '20px' }}>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 1.0 (1m range)</div>
                    <UIRuler scale={1.0} scaleType="linear" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 10.0 (10m range)</div>
                    <UIRuler scale={10.0} scaleType="linear" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 50.0 (50m range - jump over)</div>
                    <UIRuler scale={50.0} scaleType="linear" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 100.0 (100m range)</div>
                    <UIRuler scale={100.0} scaleType="linear" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 500.0 (500m range - jump over)</div>
                    <UIRuler scale={500.0} scaleType="linear" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 1000.0 (1km range)</div>
                    <UIRuler scale={1000.0} scaleType="linear" />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstration of linear scale behavior with jump overs: 1.0→10.0→100.0→1000.0 with jump overs at 10.01-100.0, 100.01-1000.0, etc. Ticks are evenly spaced.',
            },
        },
    },
};

export const LogarithmicScaleDemo: Story = {
    render: () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#000', padding: '20px' }}>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 1.0 (1m range)</div>
                    <UIRuler scale={1.0} scaleType="logarithmic" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 10.0 (10m range)</div>
                    <UIRuler scale={10.0} scaleType="logarithmic" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 50.0 (50m range - jump over)</div>
                    <UIRuler scale={50.0} scaleType="logarithmic" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 100.0 (100m range)</div>
                    <UIRuler scale={100.0} scaleType="logarithmic" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 500.0 (500m range - jump over)</div>
                    <UIRuler scale={500.0} scaleType="logarithmic" />
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Scale 1000.0 (1km range)</div>
                    <UIRuler scale={1000.0} scaleType="logarithmic" />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstration of logarithmic scale behavior with powers of 10 jump overs: 1.0→10.0→100.0→1000.0 with jump overs at 10.01-100.0, 100.01-1000.0, etc. Ticks are logarithmically spaced.',
            },
        },
    },
};

export const LinearVsLogarithmicComparison: Story = {
    render: () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#000', padding: '20px' }}>
                <div>
                    <div style={{ color: '#fff', fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>Scale 50.0 (Jump Over Range)</div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div>
                            <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Linear Scale (Even Spacing)</div>
                            <UIRuler scale={50.0} scaleType="linear" />
                        </div>
                        <div>
                            <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Logarithmic Scale (Compressed Spacing)</div>
                            <UIRuler scale={50.0} scaleType="logarithmic" />
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>Scale 100.0 (Full Range)</div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div>
                            <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Linear Scale (Even Spacing)</div>
                            <UIRuler scale={100.0} scaleType="linear" />
                        </div>
                        <div>
                            <div style={{ color: '#fff', fontSize: '12px', marginBottom: '5px' }}>Logarithmic Scale (Compressed Spacing)</div>
                            <UIRuler scale={100.0} scaleType="logarithmic" />
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Side-by-side comparison showing both scale types have jump over behavior, but differ in tick positioning: linear uses even spacing, logarithmic uses compressed spacing.',
            },
        },
    },
};
