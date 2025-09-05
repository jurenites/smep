import React from 'react';
import { TOKENS } from '../../tokens/tokens';
import { UICardState } from '../../../lib/types';
import styles from './UICardSmall.module.css';

interface UICardSmallProps {
    symbol: string;
    state?: UICardState;
    onClick?: () => void;
}

export function UICardSmall({
    symbol,
    state = UICardState.NORMAL,
    onClick
}: UICardSmallProps) {
    const s = TOKENS.sizes;
    const c = TOKENS.colors;

    if (state === UICardState.LOADING) {
        return (
            <svg
                width={s.MINI_CARD}
                height={s.MINI_CARD}
                viewBox={`0 0 ${s.MINI_CARD} ${s.MINI_CARD}`}
                preserveAspectRatio="xMidYMid meet"
                onClick={onClick}
                className={onClick ? styles.card : styles.card_default}
                data-testid="uicardsmall"
            >
                <rect
                    width={s.MINI_CARD}
                    height={s.MINI_CARD}
                    fill={c.darkgray}
                    strokeWidth={s.STROKE}
                />
            </svg>
        );
    }

    return (
        <svg
            width={s.MINI_CARD}
            height={s.MINI_CARD}
            viewBox={`0 0 ${s.MINI_CARD} ${s.MINI_CARD}`}
            preserveAspectRatio="xMidYMid meet"
            onClick={onClick}
            className={onClick ? styles.card : styles.card_default}
            data-testid="uicardsmall"
        >
            <rect
                width={s.MINI_CARD}
                height={s.MINI_CARD}
                fill={c.black}
                stroke={state === UICardState.SELECTED ? c.yolk : c.white}
                strokeWidth={s.STROKE}
            />
            <text
                x={s.MINI_CARD / 2}
                y={s.MINI_CARD / 2 + 4}
                textAnchor="middle"
                fill={c.white}
                fontSize={TOKENS.typography.body.fontSize}
                fontFamily={TOKENS.typography.body.fontFamily}
                className={styles.text}
            >
                {symbol}
            </text>
        </svg>
    );
}