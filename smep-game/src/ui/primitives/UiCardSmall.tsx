import React from 'react';
import { TOKENS } from '../tokens/tokens';
import styles from './UiCardSmall.module.css';

interface UiCardSmallProps {
    symbol: string;
    isLoading?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}

export function UiCardSmall({
    symbol,
    isLoading = false,
    isSelected = false,
    onClick
}: UiCardSmallProps) {
    const s = TOKENS.sizes;
    const c = TOKENS.colors;
    const fs = TOKENS.fontSizes;

    if (isLoading) {
        return (
            <svg
                width={s.MINI_CARD}
                height={s.MINI_CARD}
                onClick={onClick}
                className={onClick ? styles.card : styles.card_default}
            >
                <rect
                    width={s.MINI_CARD}
                    height={s.MINI_CARD}
                    fill={c.darkgray}
                    stroke={c.white}
                    strokeWidth={s.STROKE}
                />
            </svg>
        );
    }

    return (
        <svg
            width={s.MINI_CARD}
            height={s.MINI_CARD}
            onClick={onClick}
            className={onClick ? styles.card : styles.card_default}
        >
            <rect
                width={s.MINI_CARD}
                height={s.MINI_CARD}
                fill={c.black}
                stroke={isSelected ? c.yolk : c.white}
                strokeWidth={s.STROKE}
            />
            <text
                x={s.MINI_CARD / 2}
                y={s.MINI_CARD / 2 + 4}
                textAnchor="middle"
                fill={c.white}
                fontSize={fs.medium}
                fontFamily={TOKENS.fonts.BODY}
                className={styles.text}
            >
                {symbol}
            </text>
        </svg>
    );
}