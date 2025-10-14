import type { Meta, StoryObj } from '@storybook/react';
import { UIUpgradeItemLine } from '../../components/Upgrades/UIUpgradeItemLine';
import { UPGRADE_DATA, UpgradeId } from '../../../lib/data/upgrade.data';

const meta: Meta<typeof UIUpgradeItemLine> = {
    title: 'UI/UIUpgradeItemLine',
    component: UIUpgradeItemLine,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#000000' },
                { name: 'light', value: '#FFFFFF' },
            ],
        },
    },
    tags: ['autodocs'],
    argTypes: {
        viewMode: {
            control: 'select',
            options: ['full', 'mid', 'brief'],
            description: 'Display mode of the upgrade item',
        },
        itemState: {
            control: 'select',
            options: ['available', 'selected'],
            description: 'State of the item (available or selected)',
        },
        upgradeState: {
            control: 'select',
            options: ['not-started', 'in-progress', 'cancellation'],
            description: 'State of the upgrade research',
        },
        isAffordable: {
            control: 'boolean',
            description: 'Whether user can afford this upgrade',
        },
        progress: {
            control: { type: 'range', min: 0, max: 1, step: 0.01 },
            description: 'Progress value (0-1) for research progress bar',
        },
    },
};

export default meta;
type Story = StoryObj<typeof UIUpgradeItemLine>;

// Get sample upgrades for stories
const sampleUpgrade = UPGRADE_DATA[0]; // Parity
const sampleUpgrade2 = UPGRADE_DATA[7]; // Creatio ex nihilo
const sampleUpgrade3 = UPGRADE_DATA[1]; // Antiparticles

// Full Mode - Available State
export const FullModeAvailable: Story = {
    args: {
        upgrade: sampleUpgrade,
        viewMode: 'full',
        itemState: 'available',
        upgradeState: 'not-started',
        isAffordable: true,
        gainingIfResearched: 10.5,
        onSelect: () => console.log('Upgrade selected'),
    },
};

// Full Mode - Available State (Not Affordable)
export const FullModeNotAffordable: Story = {
    args: {
        upgrade: sampleUpgrade,
        viewMode: 'full',
        itemState: 'available',
        upgradeState: 'not-started',
        isAffordable: false,
        gainingIfResearched: 10.5,
        onSelect: () => console.log('Upgrade selected'),
    },
};

// Full Mode - Selected State
export const FullModeSelected: Story = {
    args: {
        upgrade: sampleUpgrade,
        viewMode: 'full',
        itemState: 'selected',
        upgradeState: 'not-started',
        isAffordable: true,
        gainingIfResearched: 10.5,
        onSelect: () => console.log('Upgrade selected'),
        onResearch: () => console.log('Research started'),
    },
};

// Full Mode - Selected State (Long Description)
export const FullModeSelectedLongDescription: Story = {
    args: {
        upgrade: sampleUpgrade2,
        viewMode: 'full',
        itemState: 'selected',
        upgradeState: 'not-started',
        isAffordable: true,
        gainingIfResearched: 125.75,
        onSelect: () => console.log('Upgrade selected'),
        onResearch: () => console.log('Research started'),
    },
};

// Mid Mode - Available State
export const MidModeAvailable: Story = {
    args: {
        upgrade: sampleUpgrade3,
        viewMode: 'mid',
        itemState: 'available',
        upgradeState: 'not-started',
        isAffordable: true,
        gainingIfResearched: 15.25,
        onSelect: () => console.log('Upgrade selected'),
    },
};

// Mid Mode - Selected State
export const MidModeSelected: Story = {
    args: {
        upgrade: sampleUpgrade3,
        viewMode: 'mid',
        itemState: 'selected',
        upgradeState: 'not-started',
        isAffordable: true,
        gainingIfResearched: 15.25,
        onSelect: () => console.log('Upgrade selected'),
        onResearch: () => console.log('Research started'),
    },
};

// Mid Mode - Not Affordable
export const MidModeNotAffordable: Story = {
    args: {
        upgrade: sampleUpgrade3,
        viewMode: 'mid',
        itemState: 'available',
        upgradeState: 'not-started',
        isAffordable: false,
        gainingIfResearched: 15.25,
        onSelect: () => console.log('Upgrade selected'),
    },
};

// Brief Mode - Available State
export const BriefModeAvailable: Story = {
    args: {
        upgrade: sampleUpgrade,
        viewMode: 'brief',
        itemState: 'available',
        upgradeState: 'not-started',
        isAffordable: true,
        gainingIfResearched: 20.0,
        onSelect: () => console.log('Upgrade selected'),
    },
};

// Brief Mode - Selected State
export const BriefModeSelected: Story = {
    args: {
        upgrade: sampleUpgrade,
        viewMode: 'brief',
        itemState: 'selected',
        upgradeState: 'not-started',
        isAffordable: true,
        gainingIfResearched: 20.0,
        onSelect: () => console.log('Upgrade selected'),
        onResearch: () => console.log('Research started'),
    },
};

// In Progress State
export const InProgress: Story = {
    args: {
        upgrade: sampleUpgrade,
        viewMode: 'full',
        itemState: 'selected',
        upgradeState: 'in-progress',
        progress: 0.45,
        isAffordable: true,
        gainingIfResearched: 10.5,
        onStopImmediate: () => console.log('Research stopped immediately'),
    },
};

// In Progress - Almost Complete
export const InProgressAlmostComplete: Story = {
    args: {
        upgrade: sampleUpgrade3,
        viewMode: 'mid',
        itemState: 'selected',
        upgradeState: 'in-progress',
        progress: 0.92,
        isAffordable: true,
        gainingIfResearched: 15.25,
        onStopImmediate: () => console.log('Research stopped immediately'),
    },
};

// In Progress - Just Started
export const InProgressJustStarted: Story = {
    args: {
        upgrade: sampleUpgrade2,
        viewMode: 'brief',
        itemState: 'selected',
        upgradeState: 'in-progress',
        progress: 0.08,
        isAffordable: true,
        gainingIfResearched: 125.75,
        onStopImmediate: () => console.log('Research stopped immediately'),
    },
};

// Cancellation State
export const CancellationState: Story = {
    args: {
        upgrade: sampleUpgrade,
        viewMode: 'full',
        itemState: 'selected',
        upgradeState: 'cancellation',
        progress: 0.65,
        isAffordable: true,
        gainingIfResearched: 10.5,
        onStopFinal: () => console.log('Research stopped (final)'),
        onContinue: () => console.log('Research continued'),
    },
};

// Cancellation State - Mid Mode
export const CancellationStateMid: Story = {
    args: {
        upgrade: sampleUpgrade3,
        viewMode: 'mid',
        itemState: 'selected',
        upgradeState: 'cancellation',
        progress: 0.35,
        isAffordable: true,
        gainingIfResearched: 15.25,
        onStopFinal: () => console.log('Research stopped (final)'),
        onContinue: () => console.log('Research continued'),
    },
};

// List of Multiple Upgrades - Full Mode
export const MultipleUpgradesFullMode: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '320px' }}>
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[0]}
                viewMode="full"
                itemState="available"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={10.5}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[1]}
                viewMode="full"
                itemState="selected"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={15.25}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[2]}
                viewMode="full"
                itemState="available"
                upgradeState="not-started"
                isAffordable={false}
                gainingIfResearched={20.0}
            />
        </div>
    ),
};

// List of Multiple Upgrades - Mid Mode
export const MultipleUpgradesMidMode: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '320px' }}>
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[3]}
                viewMode="mid"
                itemState="available"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={25.5}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[4]}
                viewMode="mid"
                itemState="selected"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={30.75}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[5]}
                viewMode="mid"
                itemState="available"
                upgradeState="not-started"
                isAffordable={false}
                gainingIfResearched={35.0}
            />
        </div>
    ),
};

// List of Multiple Upgrades - Brief Mode
export const MultipleUpgradesBriefMode: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '320px' }}>
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[6]}
                viewMode="brief"
                itemState="available"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={40.5}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[7]}
                viewMode="brief"
                itemState="selected"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={45.25}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[8]}
                viewMode="brief"
                itemState="available"
                upgradeState="not-started"
                isAffordable={false}
                gainingIfResearched={50.0}
            />
        </div>
    ),
};

// Mixed States Demo
export const MixedStatesDemo: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
            <div style={{ color: '#FFFFF5', marginBottom: '8px' }}>Full Mode:</div>
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[0]}
                viewMode="full"
                itemState="available"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={10.5}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[1]}
                viewMode="full"
                itemState="selected"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={15.25}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[2]}
                viewMode="full"
                itemState="selected"
                upgradeState="in-progress"
                progress={0.6}
                isAffordable={true}
                gainingIfResearched={20.0}
            />

            <div style={{ color: '#FFFFF5', marginTop: '16px', marginBottom: '8px' }}>Mid Mode:</div>
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[3]}
                viewMode="mid"
                itemState="available"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={25.5}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[4]}
                viewMode="mid"
                itemState="selected"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={30.75}
            />

            <div style={{ color: '#FFFFF5', marginTop: '16px', marginBottom: '8px' }}>Brief Mode:</div>
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[5]}
                viewMode="brief"
                itemState="available"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={35.0}
            />
            <UIUpgradeItemLine
                upgrade={UPGRADE_DATA[6]}
                viewMode="brief"
                itemState="selected"
                upgradeState="not-started"
                isAffordable={true}
                gainingIfResearched={40.5}
            />
        </div>
    ),
};

