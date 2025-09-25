import { UICard } from '../components/UICard/UICard';
import { UIPaginationGrid } from '../components/Paginators/UIPaginationGrid';
import { UIPaginationBig } from '../components/Paginators/UIPaginationBig';
import { UIRuler } from '../components/Elements/UIRuler';
import { UICardState, PaginationState } from '../../lib/types';
import styles from './AllPrimitivesShowcase.module.css';

export function AllPrimitivesShowcase() {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3>UICard Examples</h3>
                <div className={styles.cards}>
                    <UICard symbol="A" />
                    <UICard symbol="B" state={UICardState.DISABLED} />
                    <UICard symbol="C" state={UICardState.NORMAL} />
                    <UICard symbol="D" />
                </div>
            </div>

            <div className={styles.section}>
                <h3>UIPaginationGrid Examples</h3>
                <div className={styles.pagination}>
                    <UIPaginationGrid count={5} activeIndex={1} gridCols={5} gridRows={1} active="clickable" />
                    <UIPaginationGrid count={3} activeIndex={2} gridCols={3} gridRows={1} active="only view" />
                </div>
            </div>

            <div className={styles.section}>
                <h3>UIPaginationBig Examples</h3>
                <div className={styles.pagination}>
                    <UIPaginationBig count={5} activeIndex={1} />
                </div>
            </div>

            <div className={styles.section}>
                <h3>UIPaginationGrid Examples</h3>
                <div className={styles.pagination}>
                    <UIPaginationGrid
                        context={{
                            id: 'showcase-grid',
                            pages: [
                                { id: '1', position: { x: 0, y: 0 }, title: 'A', state: PaginationState.ACTIVE, isActive: true },
                                { id: '2', position: { x: 1, y: 0 }, title: 'B', state: PaginationState.ACTIVE, isActive: false },
                                { id: '3', position: { x: 0, y: 1 }, title: 'C', state: PaginationState.ACTIVE, isActive: false },
                                { id: '4', position: { x: 1, y: 1 }, title: 'D', state: PaginationState.ACTIVE, isActive: false },
                            ],
                            currentPosition: { x: 0, y: 0 },
                            gridDimensions: { width: 5, height: 5 },
                            state: PaginationState.ACTIVE,
                            navigationRules: undefined
                        }}
                        active="only view"
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h3>UIRuler Examples</h3>
                <div className={styles.rulers}>
                    <UIRuler scale={1000000} />
                </div>
            </div>
        </div>
    );
}