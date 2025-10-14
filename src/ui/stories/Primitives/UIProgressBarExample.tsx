import React from 'react';
import { UIProgressBar } from '../../components/Primitives/UIProgressBar';
import { UISquareState } from '../../../lib/types';
import styles from './UIProgressBarExample.module.css';

/**
 * Example wrapper element demonstrating UIProgressBar usage
 * Container width is fixed at 31px as specified
 */
export function UIProgressBarExample() {
    return (
        <div className={styles.container}>
            <UIProgressBar
                progressState={UISquareState.ACTIVE}
                logicalSize="mid"
                progress={0.75}
                fillColor="white"
            />
        </div>
    );
}
