import React from 'react';
import { TOKENS } from '../tokens/tokens';

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

    if (isLoading) {
        return (
            <svg
                width={s.MINI_CARD}
                height={s.MINI_CARD}
                onClick={onClick}
                style={{ cursor: onClick ? 'pointer' : 'default' }}
            >
                <rect
                    width={s.MINI_CARD}
                    height={s.MINI_CARD}
                    fill={c.DARK_GRAY}
                    stroke={c.WHITE}
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
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <rect
                width={s.MINI_CARD}
                height={s.MINI_CARD}
                fill={c.BLACK}
                stroke={isSelected ? c.PRIMARY : c.WHITE}
                strokeWidth={s.STROKE}
            />
            <text
                x={s.MINI_CARD / 2}
                y={s.MINI_CARD / 2 + 4}
                textAnchor="middle"
                fill={c.WHITE}
                fontSize="12"
                fontFamily={TOKENS.fonts.BODY}
                style={{ userSelect: 'none' }}
            >
                {symbol}
            </text>
        </svg>
    );
} 