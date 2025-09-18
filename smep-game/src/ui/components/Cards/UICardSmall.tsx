import { TOKENS } from '../../tokens/tokens';
import { UICardState } from '../../../lib/types';
import { UICircle } from '../Primitives/UICircle';
import type { LogicalSize } from '../Primitives/UICircle';
import styles from './UICardSmall.module.css';

interface UICardSmallProps {
    symbol: string;
    state?: UICardState;
    onClick?: () => void;
    shape?: 'rectangle' | 'circle';
    circleSize?: LogicalSize;
    circleActualSize?: number;
}

export function UICardSmall({
    symbol,
    state = UICardState.NORMAL,
    onClick,
    shape = 'rectangle',
    circleSize = 'middle',
    circleActualSize
}: UICardSmallProps) {
    const sizes = TOKENS.sizes;
    const colors = TOKENS.colors;

    // Circle shape rendering
    if (shape === 'circle') {
        if (state === UICardState.LOADING) {
            return (
                <div className={styles.circleContainer}>
                    <UICircle
                        logicalSize={circleSize}
                        actualSize={circleActualSize}
                        brightness="dimmed"
                        onClick={onClick}
                        className={styles.circleLoading}
                    />
                </div>
            );
        }

        return (
            <div className={styles.circleContainer}>
                <UICircle
                    logicalSize={circleSize}
                    actualSize={circleActualSize}
                    onClick={onClick}
                    className={`${styles.circleCard} ${state === UICardState.SELECTED ? styles.selected : ''}`}
                />
                <div className={styles.circleSymbol}>
                    {symbol}
                </div>
            </div>
        );
    }

    // Rectangle shape rendering (default)
    if (state === UICardState.LOADING) {
        return (
            <svg
                width={sizes.MINI_CARD}
                height={sizes.MINI_CARD}
                viewBox={`0 0 ${sizes.MINI_CARD} ${sizes.MINI_CARD}`}
                preserveAspectRatio="xMidYMid meet"
                onClick={onClick}
                className={onClick ? styles.card : styles.card_default}
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
            className={onClick ? styles.card : styles.card_default}
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
                className={styles.text}
            >
                {symbol}
            </text>
        </svg>
    );
}