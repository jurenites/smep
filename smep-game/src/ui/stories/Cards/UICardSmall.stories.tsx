import type { Meta, StoryObj } from '@storybook/react';
import { UICardSmall } from '../../components/Cards/UICardSmall';
import { UICardState } from '../../../lib/types';

const meta: Meta<typeof UICardSmall> = {
    title: 'UI/Cards/UICardSmall',
    component: UICardSmall,
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
            options: Object.values(UICardState),
            description: 'State of the card',
        },
        shape: {
            control: 'select',
            options: ['rectangle', 'circle'],
            description: 'Shape of the card (rectangle or circle)',
        },
        circleSize: {
            control: 'select',
            options: ['dot', 'small', 'mini', 'middle', 'mega'],
            description: 'Size of the circle when shape is circle',
        },
        circleActualSize: {
            control: { type: 'number', min: 0.1, max: 200, step: 0.01 },
            description: 'Custom size override for circle (up to 2 decimal places)',
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when card is clicked',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        symbol: 'A',
        onClick: () => console.log('Card clicked!'),
    },
};

export const RectangleShapes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <UICardSmall symbol="A" state={UICardState.NORMAL} />
            <UICardSmall symbol="B" state={UICardState.SELECTED} />
            <UICardSmall symbol="C" state={UICardState.LOADING} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Default rectangle shapes with different states.',
            },
        },
    },
};

export const CircleShapes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="H" shape="circle" circleSize="dot" />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Dot</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="Li" shape="circle" circleSize="small" />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Small</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="C" shape="circle" circleSize="mini" />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Mini</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="O" shape="circle" circleSize="middle" />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Middle</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="Fe" shape="circle" circleSize="mega" />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Mega</div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Circle shapes with different logical sizes.',
            },
        },
    },
};

export const CircleStates: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="H" shape="circle" circleSize="middle" state={UICardState.NORMAL} />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Normal</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="He" shape="circle" circleSize="middle" state={UICardState.SELECTED} />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Selected</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="Li" shape="circle" circleSize="middle" state={UICardState.LOADING} />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>Loading</div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Circle shapes with different states.',
            },
        },
    },
};

export const CustomCircleSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="H" shape="circle" circleSize="dot" circleActualSize={3.5} />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>3.5px</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="C" shape="circle" circleSize="small" circleActualSize={12.75} />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>12.75px</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="O" shape="circle" circleSize="mini" circleActualSize={25.33} />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>25.33px</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="Fe" shape="circle" circleSize="middle" circleActualSize={75.67} />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>75.67px</div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <UICardSmall symbol="Au" shape="circle" circleSize="mega" circleActualSize={150.99} />
                <div style={{ fontSize: '12px', marginTop: '4px' }}>150.99px</div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Circle shapes with custom sizes using actualSize parameter.',
            },
        },
    },
};

export const InteractiveCircle: Story = {
    args: {
        symbol: 'H',
        shape: 'circle',
        circleSize: 'middle',
        onClick: () => console.log('Interactive circle clicked!'),
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive circle card with click handler.',
            },
        },
    },
}; 