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
    const sizes = TOKENS.sizes;
    const colors = TOKENS.colors;

    if (state === UICardState.LOADING) {
        return (
            <svg
                width={sizes.MINI_CARD}
                height={sizes.MINI_CARD}
                viewBox={`0 0 ${sizes.MINI_CARD} ${sizes.MINI_CARD}`}
                preserveAspectRatio="xMidYMid meet"
                onClick={onClick}
                className={onClick ? stylesizes.card : stylesizes.card_default}
                data-testid="uicardsmall"
            >
                <rect
                    width={sizes.MINI_CARD}
                    height={sizes.MINI_CARD}
                    fill={colors.darkgray}
                    strokeWidth={sizes.STROKE}
                />
            </svg>
        );
    }

    return (
        <svg
            width={sizes.MINI_CARD}
            height={sizes.MINI_CARD}
            viewBox={`0 0 ${sizes.MINI_CARD} ${sizes.MINI_CARD}`}
            preserveAspectRatio="xMidYMid meet"
            onClick={onClick}
            className={onClick ? stylesizes.card : stylesizes.card_default}
            data-testid="uicardsmall"
        >
            <rect
                width={sizes.MINI_CARD}
                height={sizes.MINI_CARD}
                fill={colors.black}
                stroke={state === UICardState.SELECTED ? colors.yolk : colors.white}
                strokeWidth={sizes.STROKE}
            />
            <text
                x={sizes.MINI_CARD / 2}
                y={sizes.MINI_CARD / 2 + 4}
                textAnchor="middle"
                fill={colors.white}
                fontSize={TOKENS.typography.body.fontSize}
                fontFamily={TOKENS.typography.body.fontFamily}
                className={stylesizes.text}
            >
                {symbol}
            </text>
        </svg>
    );
}