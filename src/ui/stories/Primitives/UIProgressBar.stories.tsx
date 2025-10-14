import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIProgressBar } from '../../components/Primitives/UIProgressBar';
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
            control: { type: 'range', min: 0, max: 1, step: 0.02 },
            description: 'Progress value from 0 to 1 (0 = empty, 1 = full)',
        },
        fillColor: {
            control: 'select',
            //TODO: change this list to take them directly from the Token file or something.
            options: ['yolk', 'ultraviolet', 'white', 'lightgray', 'gray', 'darkgray', 'black'],
            description: 'Fill color for the progress bar from theme colors',
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
        fillColor: 'white',
        segmentCount: 5,
        activeSegmentIndex: 1,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UIProgressBar component with 50% progress. Use the Controls tab to change state, size, progress, fill color, and other properties.',
            },
        },
    },
};

// Segmented progress bar story
export const SegmentedProgressBar: Story = {
    args: {
        progressState: UISquareState.ACTIVE,
        logicalSize: 'small',
        progress: 0.5,
        fillColor: 'white',
        progressMode: 'segmented',
        segmentCount: 5,
        activeSegmentIndex: 1,
    },
    parameters: {
        docs: {
            description: {
                story: 'Segmented UIProgressBar with multiple progress bars in sequence. When activeSegmentIndex changes (e.g., from 1 to 3), segments 2-3 will show yolk-colored preview before filling with white. Completed segments (< activeSegmentIndex) are 100% filled, the current segment shows the progress value, and future segments are empty or show yolk preview.',
            },
        },
    },
    argTypes: {
        progressMode: {
            control: 'select',
            options: ['single', 'segmented'],
            description: 'Progress bar display mode',
        },
        segmentCount: {
            control: { type: 'number', min: 1, max: 10, step: 1 },
            description: 'Number of segments in segmented mode',
        },
        activeSegmentIndex: {
            control: { type: 'number', min: 1, max: 10, step: 1 },
            description: 'Currently active segment (1-based index). Change this to see yolk preview on future segments.',
        },
    },
};

