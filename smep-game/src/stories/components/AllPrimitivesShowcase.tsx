import React from 'react';
import { UiCardSmall } from '../../ui/primitives/UiCardSmall';
import { UiPlaygroundSurface } from '../../ui/primitives/UiPlaygroundSurface';
import { UiRuler } from '../../ui/primitives/UiRuler';
import { UiPaginationMini } from '../../ui/primitives/UiPaginationMini';
import { TOKENS } from '../../ui/tokens/tokens';
import styles from './AllPrimitivesShowcase.module.css';

export function AllPrimitivesShowcase() {
    const s = TOKENS.sizes;

    return (
        <div className={styles.showcaseContainer}>
            <h2 className={styles.showcaseHeading}>
                UI Primitives Showcase
            </h2>

            <div>
                <h3>UiCardSmall Components</h3>
                <div className={styles.cardContainer}>
                    <UiCardSmall symbol="A" />
                    <UiCardSmall symbol="B" isSelected={true} />
                    <UiCardSmall symbol="C" isLoading={true} />
                    <UiCardSmall symbol="D" />
                </div>
            </div>

            <div>
                <h3>UiRuler Components</h3>
                <div className={styles.rulerContainer}>
                    <UiRuler scale={1} width={200} height={s.MINI_PAGINATOR_GAP} position="bottom" />
                    <UiRuler scale={1000} width={200} height={s.MINI_PAGINATOR_GAP} position="top" />
                    <div className={styles.rulerInnerContainer}>
                        <UiRuler scale={1} width={s.MINI_PAGINATOR_GAP} height={100} position="left" />
                        <div className={styles.rulerContentBox}>

                        </div>
                        <UiRuler scale={1} width={s.MINI_PAGINATOR_GAP} height={100} position="right" />
                    </div>
                </div>
            </div>

            <div>
                <h3>UiPaginationMini Components</h3>
                <div className={styles.paginationContainer}>
                    <UiPaginationMini count={5} activeIndex={0} />
                    <UiPaginationMini count={5} activeIndex={2} />
                    <UiPaginationMini count={8} activeIndex={3} />
                </div>
            </div>

            <div>
                <h3>UiPlaygroundSurface</h3>
                <UiPlaygroundSurface width={360} height={640}>
                    <div className={styles.playgroundContent}>

                    </div>
                </UiPlaygroundSurface>
            </div>
        </div>
    );
}