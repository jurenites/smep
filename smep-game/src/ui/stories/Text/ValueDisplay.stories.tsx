import type { Meta, StoryObj } from '@storybook/react';
import { ValueDisplay } from '../../components/Text/ValueDisplay';
import { useState } from 'react';
import type { DisplayMode } from '../../../formatters/formatValue';

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
            options: ['temperature', 'distance', 'energy', 'custom'],
            description: 'Type of measurement (temperature, distance, energy, custom)',
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
        clickable: {
            control: 'boolean',
            description: 'Whether the display mode can be clicked to cycle through modes',
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

        return (
            <ValueDisplay
                {...args}
                displayMode={displayMode}
                onDisplayModeChange={setDisplayMode}
            />
        );
    },
    args: {
        value: '1231',
        measurementType: 'energy',
        customUnit: '',
        displayMode: 'shortened',
        valueColor: 'primary',
        unitColor: 'primary',
        clickable: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Unified value display component combining SizeDisplay functionality with multiple display modes and measurement types. Choose from temperature (°C), distance (m/km/cm/mm), energy (eV/keV/MeV/μeV), or custom units. Display modes include full precision, shortened with unit conversion, and scientific notation with order of magnitude. Enable clickable mode to cycle through display modes on click. Use "+1231" format in value field to preserve plus signs for positive numbers.',
            },
        },
    },
};

// Interactive story demonstrating clickable functionality
export const Clickable: Story = {
    render: (args) => {
        const [displayMode, setDisplayMode] = useState<DisplayMode>('shortened');

        const handleDisplayModeChange = (newMode: DisplayMode) => {
            setDisplayMode(newMode);
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ValueDisplay
                    {...args}
                    displayMode={displayMode}
                    clickable={true}
                    onDisplayModeChange={handleDisplayModeChange}
                />
                <p style={{ fontSize: '12px', color: '#666' }}>
                    Click the value above to cycle through display modes: {displayMode}
                </p>
            </div>
        );
    },
    args: {
        value: '+1234567',
        measurementType: 'energy',
        customUnit: '',
        valueColor: 'primary',
        unitColor: 'secondary',
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive ValueDisplay with clickable functionality. Click to cycle through display modes (full → shortened → scientific → full). Note how the plus sign is preserved from the input value "+1234567".',
            },
        },
    },
};
