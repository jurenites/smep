import React from 'react';
import { UIProgressBar } from '../../components/Primitives/UIProgressBar';
import { UISquareState } from '../../../lib/types';
import { TOKENS } from '../../tokens/tokens';
import styles from './UIProgressBarExample.module.css';

/**
 * Example wrapper element demonstrating UIProgressBar usage
 * Container width is fixed at 31px as specified
 */
export function UIProgressBarExample() {
    return (
        <div className={styles.container}>
            <UIProgressBar
                state={UISquareState.ACTIVE}
                logicalSize="mid"
                progress={0.75}
                fillColor={TOKENS.colors.white}
            />
        </div>
    );
}
