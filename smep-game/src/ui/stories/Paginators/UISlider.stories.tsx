import type { Meta, StoryObj } from '@storybook/react-vite';
import { UISlider } from '../../components/Paginators/UISlider';

const meta: Meta<typeof UISlider> = {
    title: 'UI/Pagination/UISlider',
    component: UISlider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        count: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Total number of elements in the slider',
        },
        activeIndex: {
            control: {
                type: 'number',
                min: 1,
                max: 20
            },
            description: 'Currently active element index (1-based, max value is limited by count)',
        },
        visibleElementsCount: {
            control: { type: 'number', min: 3, max: 15 },
            description: 'Number of visible elements around active element',
        },
        clickable: {
            table: { disable: true },
        },
        onActiveChange: {
            action: 'activeChanged',
            description: 'Callback when active element changes',
        },
        // Hide animation-related controls
        animateOnLoad: {
            table: { disable: true },
        },
        animationDuration: {
            table: { disable: true },
        },
        animationStagger: {
            table: { disable: true },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        count: 10,
        activeIndex: 1,
        clickable: true,
        visibleElementsCount: 6,
        animateOnLoad: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default UISlider component with sticky edge behavior and proper SVG scaling. The active element should properly scale from 4px to 31px during animation. All elements maintain INACTIVE state but with proper size transitions. Supports counts up to 10 with configurable visibleElementsCount.',
            },
        },
    },
};

