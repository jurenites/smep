import React from 'react';
import { UICardSmall } from '../../ui/primitives/UICardSmall';
import { UIPaginationMini } from '../../ui/primitives/UIPaginationMini';
import { UIRuler } from '../../ui/primitives/UIRuler';
import { UICardState } from '../../lib/types';
import styles from './AllPrimitivesShowcase.module.css';

export function AllPrimitivesShowcase() {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3>UICardSmall Examples</h3>
                <div className={styles.cards}>
                    <UICardSmall symbol="A" />
                    <UICardSmall symbol="B" state={UICardState.SELECTED} />
                    <UICardSmall symbol="C" state={UICardState.LOADING} />
                    <UICardSmall symbol="D" />
                </div>
            </div>

            <div className={styles.section}>
                <h3>UIPaginationMini Examples</h3>
                <div className={styles.pagination}>
                    <UIPaginationMini count={5} activeIndex={1} />
                    <UIPaginationMini count={3} activeIndex={2} />
                </div>
            </div>

            <div className={styles.section}>
                <h3>UIRuler Examples</h3>
                <div className={styles.rulers}>
                    <UIRuler scale={1} width={200} position="bottom" />
                    <UIRuler scale={0.001} width={200} position="top" />
                </div>
            </div>
        </div>
    );
}