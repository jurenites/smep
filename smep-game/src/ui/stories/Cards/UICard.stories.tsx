import type { Meta, StoryObj } from '@storybook/react';
import { UICard } from '../../components/UICard/UICard';
import { ParticleList, UICardState } from '../../../lib/types';

const meta: Meta<typeof UICard> = {
    title: 'UI/UICard',
    component: UICard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        symbol: {
            control: 'text',
            description: 'The symbol to display on the card',
        },
        state: {
            control: 'select',
            options: ['normal', 'disabled'],
            description: 'State of the card',
        },
        // Size configuration
        size: {
            control: 'select',
            options: ['small', 'mid', 'big'],
            description: 'Size of the card',
        },
        // Particle configuration options
        showParticle: {
            control: 'boolean',
            description: 'Show particle instead of circle',
        },
        particleType: {
            control: 'select',
            options: Object.values(ParticleList),
            description: 'Type of particle to display',
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when card is clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - UICard with particle example
export const Default: Story = {
    args: {
        symbol: 'H',
        state: UICardState.NORMAL,
        size: 'small',
        showParticle: true,
        particleType: ParticleList.ELECTRON,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UICard component with UIParticle above the label. Use the Controls tab to select different particle types and sizes.',
            },
        },
    },
}; 