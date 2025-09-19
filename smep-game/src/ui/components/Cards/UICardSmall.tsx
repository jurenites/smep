import { UICardState, UISquareState } from '../../../lib/types';
import { UICircle } from '../Primitives/UICircle';
import { UISquare } from '../Primitives/UISquare';
import { UILabel } from '../Text/UILabel';
import type { LogicalSize } from '../Primitives/UICircle';
import type { UILabelProps } from '../Text/UILabel';
import styles from './UICardSmall.module.css';

interface UICardSmallProps {
    symbol: string;
    state?: UICardState;
    onClick?: () => void;
    // Label configuration options
    labelFontVariant?: UILabelProps['fontVariant'];
    labelColor?: UILabelProps['color'];
    labelAlign?: UILabelProps['align'];
    labelClassName?: UILabelProps['className'];
    labelInteractive?: UILabelProps['interactive'];
    // UICircle configuration options (for the circle above the label)
    showCircle?: boolean;
    circleLogicalSize?: LogicalSize;
    circleActualSizeInner?: number;
    circleColor?: string;
    circleBrightness?: 'full' | 'dimmed';
}

export function UICardSmall({
    symbol,
    state = UICardState.NORMAL,
    onClick,
    labelFontVariant = 'body',
    labelColor = 'primary',
    labelAlign = 'center',
    labelClassName = '',
    labelInteractive = false,
    showCircle = false,
    circleLogicalSize = 'small',
    circleActualSizeInner,
    circleColor = '#FFFFFF',
    circleBrightness = 'full'
}: UICardSmallProps) {

    // Rectangle shape rendering - using UISquare component (always rectangular)
    const getSquareState = (): UISquareState => {
        switch (state) {
            case UICardState.SELECTED:
                return UISquareState.ACTIVE;
            case UICardState.LOADING:
                return UISquareState.DISABLED;
            default:
                return UISquareState.INACTIVE;
        }
    };

    if (state === UICardState.LOADING) {
        return (
            <div className={styles.rectangleContainer}>
                <UISquare
                    state={getSquareState()}
                    logicalSize="mid"
                    active="clickable"
                    onClick={onClick}
                />
            </div>
        );
    }

    return (
        <div className={styles.rectangleContainer}>
            <UISquare
                state={getSquareState()}
                logicalSize="mid"
                active="clickable"
                onClick={onClick}
            >
                <div className={`${styles.contentContainer} ${showCircle ? styles.withCircle : styles.withoutCircle}`}>
                    {showCircle && (
                        <div className={styles.circleAbove}>
                            <UICircle
                                logicalSize={circleLogicalSize}
                                actualSize={circleActualSizeInner}
                                color={circleColor}
                                brightness={circleBrightness}
                            />
                        </div>
                    )}
                    <UILabel
                        fontVariant={labelFontVariant}
                        color={labelColor}
                        align={labelAlign}
                        className={`${styles.symbol} ${labelClassName}`}
                        interactive={labelInteractive}
                    >
                        {symbol}
                    </UILabel>
                </div>
            </UISquare>
        </div>
    );
}