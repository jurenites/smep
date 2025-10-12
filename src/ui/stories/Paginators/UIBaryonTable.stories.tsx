import type { Meta, StoryObj } from '@storybook/react';
import { UIBaryonTable } from '../../components/Paginators/UIBaryonTable';

const meta: Meta<typeof UIBaryonTable> = {
    title: 'UI/Pagination/UIBaryonTable',
    component: UIBaryonTable,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**UIBaryonTable** - Complete table of all 70 baryons

Displays all baryons organized by families in a **4×24 horizontal grid** (4 rows, wide columns):

### Row Layout
- **Row 1: Nucleons** (8 baryons) - Delta++, Proton, Neutron, Delta−  
- **Row 2: Sigma** (18 baryons) - Light, charmed, bottom variants  
- **Row 3: Xi** (24 baryons) - Light, charmed, bottom, double-heavy  
- **Row 4: Omega** (20 baryons) - Light to triple-heavy exotic baryons  

Matter/antimatter pairs alternate in columns (odd = matter, even = antimatter).

### Features
- **Horizontal layout** - easier to scan families left-to-right
- Switch between **symbol** (p+, Δ++) and **quarks** (uud, uuu) display modes
- Toggle between **clickable** (UICards) and **only view** (UISquares) modes
- Shows predicted masses with indication
- Row labels for each baryon family
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        interactionMode: {
            control: 'select',
            options: ['clickable', 'only view'],
            description: 'Interaction mode - clickable shows UICards, only view shows UISquares',
        },
        activePrimaryId: {
            control: { type: 'number', min: 1, max: 70, step: 1 },
            description: 'Active baryon primary ID (1-70) to highlight',
        },
        displayMode: {
            control: 'select',
            options: ['symbol', 'quarks'],
            description: 'Display mode - symbol shows particle symbols (p+), quarks shows quark composition (uud)',
        },
        onPageChange: {
            action: 'page changed',
            description: 'Callback when page/position changes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing the baryon table
export const Default: Story = {
    args: {
        interactionMode: 'clickable',
        activePrimaryId: 3, // Proton
        displayMode: 'symbol',
    },
    parameters: {
        docs: {
            description: {
                story: 'UIBaryonTable component displaying all 70 baryons in a 4×24 horizontal grid organized by families. Use the Controls tab to switch between interaction modes (clickable/only view), display modes (symbol/quarks), and change the active baryon by primaryId (1-70).',
            },
        },
    },
};
