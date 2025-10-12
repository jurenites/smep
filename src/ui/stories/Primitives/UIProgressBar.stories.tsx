import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIProgressBar } from '../../components/Primitives/UIProgressBar';
import { UIProgressBarExample } from './UIProgressBarExample';
import { UISquareState } from '../../../lib/types';

const meta: Meta<typeof UIProgressBar> = {
    title: 'UI/UIProgressBar',
    component: UIProgressBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        progressState: {
            control: 'select',
            options: Object.values(UISquareState),
            description: 'Current state of the progress bar',
        },
        logicalSize: {
            control: 'select',
            options: ['small', 'mid'],
            description: 'Logical size of the progress bar (small: 4px height, mid: 31px height)',
        },
        progress: {
            control: { type: 'range', min: 0, max: 1, step: 0.01 },
            description: 'Progress value from 0 to 1 (0 = empty, 1 = full)',
        },
        fillColor: {
            control: 'color',
            description: 'Fill color for the progress bar',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler function',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        progressState: UISquareState.ACTIVE,
        logicalSize: 'small',
        progress: 0.5,
        fillColor: '#FFFFFF',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UIProgressBar component with 50% progress. Use the Controls tab to change state, size, progress, fill color, and other properties.',
            },
        },
    },
};

