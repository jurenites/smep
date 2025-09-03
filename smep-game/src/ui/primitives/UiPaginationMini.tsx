import React from 'react';
import { TOKENS } from '../tokens/tokens';
import { PaginationState } from '../../lib/types';

interface UiPaginationMiniProps {
    count: number;
    activeIndex: number;
    onPageChange?: (index: number) => void;
}

export function UiPaginationMini({
    count,
    activeIndex,
    onPageChange
}: UiPaginationMiniProps) {
    const s = TOKENS.sizes;
    const c = TOKENS.colors;
    const items = Array.from({ length: count });

    const totalWidth = count * (s.MINI_PAGINATOR + s.MINI_PAGINATOR_GAP) - s.MINI_PAGINATOR_GAP;

    return (
        <svg
            width={totalWidth}
            height={s.MINI_PAGINATOR}
        >
            {items.map((_, i) => (
                <rect
                    key={i}
                    x={i * (s.MINI_PAGINATOR + s.MINI_PAGINATOR_GAP)}
                    y={0}
                    width={s.MINI_PAGINATOR}
                    height={s.MINI_PAGINATOR}
                    fill={i === activeIndex ? c.WHITE : c.DARK_GRAY}
                    stroke={c.WHITE}
                    strokeWidth={s.STROKE}
                    onClick={() => onPageChange?.(i)}
                    style={{
                        cursor: onPageChange ? 'pointer' : 'default',
                        userSelect: 'none'
                    }}
                />
            ))}
        </svg>
    );
} 