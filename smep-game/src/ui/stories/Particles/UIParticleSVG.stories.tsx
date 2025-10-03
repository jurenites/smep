import type { Meta, StoryObj } from '@storybook/react';
import { UIParticleSVG } from '../../components/Particles/UIParticleSVG';
import { UILabel } from '../../components/Text/UILabel';
import { ParticleList, getFormattedParticleSymbolByType } from '../../../lib/data/particle-quantum.data';
import '../../tokens/tokens.css';

// Direct font loading for Storybook - improved version
const load4PixelFont = async () => {
    try {
        // Check if font is already loaded
        if (document.fonts.check('16px "4pixel"')) {
            console.log('4pixel font already loaded');
            return;
        }

        console.log('Loading 4pixel font directly...');

        // Try WOFF first, then TTF as fallback
        const fontUrls = [
            'url(/assets/fonts/4pixel.woff) format("woff")',
            'url(/assets/fonts/4pixel.ttf) format("truetype")'
        ];

        const fontFace = new FontFace('4pixel', fontUrls.join(', '));
        const loadedFont = await fontFace.load();
        document.fonts.add(loadedFont);

        // Wait for fonts to be ready
        await document.fonts.ready;

        console.log('4pixel font loaded successfully');
    } catch (error) {
        console.error('Failed to load 4pixel font:', error);
    }
};

// Load font when module loads
load4PixelFont();

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
};

export default meta;
type Story = StoryObj<typeof meta>;

// All particle types showcase
export const AllParticles: Story = {
    render: () => {
        const amountParticles = 6 * 4; //fermions and leptons table
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', padding: '20px' }}>
                {Object.values(ParticleList).slice(0, amountParticles).map((particleType) => (
                    <div key={particleType} style={{ textAlign: 'center' }}>
                        <UIParticleSVG particleType={particleType} />
                        <div style={{ marginTop: '8px' }}>
                            <UILabel fontVariant="body" color="white">
                                {getFormattedParticleSymbolByType(particleType)}
                            </UILabel>
                        </div>
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all particle types using SVG rendering.',
            },
        },
    },
};

