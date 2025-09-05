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
            control: {
                type: 'number',
                max: 1e18,
                min: 1e-27,
                step: (args: any) => {
                    // Dynamic step: round to nearest power of 10, then divide by 10
                    const currentScale = args.scale || 1;
                    const log10Scale = Math.log10(currentScale);
                    const roundedLog10 = Math.ceil(log10Scale);
                    const roundedScale = Math.pow(10, roundedLog10);
                    return roundedScale / 10;
                }
            },
            description: 'Scale factor to display (step = scale / 10)',
        },
        scaleType: {
            control: { type: 'select' },
            options: ['linear', 'logarithmic'],
            description: 'Type of scale to use for tick positioning',
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