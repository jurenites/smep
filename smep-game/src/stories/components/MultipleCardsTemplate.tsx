import React from 'react';
import { UiCardSmall } from '../../ui/primitives/UiCardSmall';
import styles from './MultipleCardsTemplate.module.css';

export function MultipleCardsTemplate() {
    return (
        <div className={styles.container}>
            <UiCardSmall symbol="A" />
            <UiCardSmall symbol="B" isSelected={true} />
            <UiCardSmall symbol="C" isLoading={true} />
            <UiCardSmall symbol="D" />
        </div>
    );
}