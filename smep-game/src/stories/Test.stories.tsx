import type { Meta, StoryObj } from '@storybook/react';
import styles from './Test.stories.module.css';

const meta: Meta = {
    title: 'Test/Basic',
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
    render: () => (
        <div className={styles.container}>
            <h1>Storybook is working! </h1>
            <p> If you can see this, the basic setup is working correctly.</p>
        </div>
    ),
};