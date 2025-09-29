import type { Meta, StoryObj } from '@storybook/react';
import { ValueDisplay } from '../../components/Text/ValueDisplay';
import { useState, useEffect } from 'react';
import type { DisplayMode } from '../../../formatters/formatValue';
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

const meta: Meta<typeof ValueDisplay> = {
    title: 'Text/ValueDisplay',
    component: ValueDisplay,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: 'Numeric value to display (can include + prefix for positive numbers)',
        },
        measurementType: {
            control: 'select',
            options: ['temperature', 'distance', 'energy', 'time', 'custom'],
            description: 'Type of measurement (temperature, distance, energy, time, custom)',
        },
        customUnit: {
            control: 'text',
            description: 'Custom unit string when measurementType is "custom"',
        },
        displayMode: {
            control: 'select',
            options: ['full', 'shortened', 'scientific'],
            description: 'Display mode (full, shortened, scientific)',
        },
        valueColor: {
            control: 'select',
            options: ['primary', 'secondary', 'accent'],
            description: 'Color variant for the value label',
        },
        unitColor: {
            control: 'select',
            options: ['primary', 'secondary', 'accent'],
            description: 'Color variant for the unit and exponent labels',
        },
        valueFontVariant: {
            control: 'select',
            options: ['body', 'digitSmall', 'digitBig'],
            description: 'Font variant for the value (body, digitSmall, digitBig)',
        },
        labelFontVariant: {
            control: 'select',
            options: ['body', 'digitSmall', 'digitBig'],
            description: 'Font variant for the unit labels (body, digitSmall, digitBig)',
        },
        clickable: {
            control: 'boolean',
            description: 'Whether the display mode can be clicked to cycle through modes',
        },
        onDisplayModeChange: {
            action: 'displayModeChanged',
            description: 'Callback when display mode changes',
        },
        className: {
            control: 'text',
            description: 'Optional CSS class name',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with controls
export const Default: Story = {
    render: (args) => {
        const [displayMode, setDisplayMode] = useState<DisplayMode>(args.displayMode || 'shortened');

        // Sync internal state with args changes
        useEffect(() => {
            setDisplayMode(args.displayMode || 'shortened');
        }, [args.displayMode]);

        const handleDisplayModeChange = (newMode: DisplayMode) => {
            setDisplayMode(newMode);
            console.log('displayModeChanged:', newMode);
        };

        return (
            <ValueDisplay
                {...args}
                displayMode={displayMode}
                onDisplayModeChange={handleDisplayModeChange}
            />
        );
    },
    args: {
        value: '12000',
        measurementType: 'energy',
        customUnit: '',
        displayMode: 'shortened',
        valueColor: 'primary',
        unitColor: 'secondary',
        valueFontVariant: 'digitBig',
        labelFontVariant: 'body',
        clickable: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Unified value display component combining SizeDisplay functionality with multiple display modes and measurement types. Choose from temperature (°C), distance (m/km/cm/mm), energy (eV/keV/MeV/μeV), time (sec/hour/day/week/year), or custom units. Display modes include full precision, shortened with unit conversion, and scientific notation with order of magnitude. Enable clickable mode to cycle through display modes on click. Use "+1231" format in value field to preserve plus signs for positive numbers.',
            },
        },
    },
};
