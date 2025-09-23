import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIRuler } from '../../components/Elements/UIRuler';
import { FontProvider } from '../../components/Providers/FontProvider';
import { UILabel } from '../../components/Text/UILabel';
import '../../tokens/tokens.css';
import styles from './UIRuler.stories.module.css';

// Direct font loading for Storybook
const load4PixelFont = async () => {
    try {
        // console.log('Loading 4pixel font directly...');
        const fontFace = new FontFace('4pixel', 'url(/assets/fonts/4pixel.woff) format("woff")');
        await fontFace.load();
        document.fonts.add(fontFace);
        // console.log('4pixel font loaded successfully');
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
            // console.log('UIRuler Story: FontProvider wrapper loaded');
            return (
                <FontProvider>
                    <div className={styles.decoratorContainer}>
                        <UILabel fontVariant="digitSmall" color="primary">
                            <Story />
                        </UILabel>
                    </div>
                </FontProvider>
            );
        },
    ],
    argTypes: {
        scale: {
            control: {
                type: 'number',
                step: 1,
                min: 1,
                max: 1000
            },
            description: 'Scale multiplier displayed as "x{scale}" (e.g., x100)',
        },
        measurement: {
            control: {
                type: 'number',
                step: 0.1,
                min: 0.1,
                max: 1000
            },
            description: 'Measurement value displayed in ValueDisplay (e.g., 1m)',
        },
        customUnit: {
            control: { type: 'text' },
            description: 'Unit string for the measurement (default: "m")',
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
        measurement: 1,
        customUnit: 'm',
        scaleType: 'linear',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default ruler with separate scale multiplier (x1) and measurement value (1m). Scale controls the multiplier display, measurement controls the ValueDisplay value. Both can be adjusted independently.',
            },
        },
    },
};