import { UICardState, UISquareState } from '../../../lib/types';
import { UICircle } from '../Primitives/UICircle';
import { UISquare } from '../Primitives/UISquare';
import { UIRectangleBig } from '../Primitives/UIRectangleBig';
import { UILabel } from '../Text/UILabel';
import { UIParticle } from '../Particles/UIParticle';
import { TOKENS } from '../../tokens/tokens';
import { ParticleList } from '../../../lib/types/particle-list';
import { getFormattedParticleSymbol, isAntiparticle } from '../../../lib/utils/particle-symbols';
import type { LogicalSize } from '../Primitives/UICircle';
import type { UILabelProps } from '../Text/UILabel';
import styles from './UICardSmall.module.css';

export type UICardSize = 'small' | 'mid' | 'big';

interface UICardProps {
    symbol: string;
    state?: UICardState;
    onClick?: () => void;
    // Size configuration
    size?: UICardSize;
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
    // UIParticle configuration options (alternative to UICircle)
    showParticle?: boolean;
    particleList?: ParticleList;
}

export function UICard({
    symbol,
    state = UICardState.NORMAL,
    onClick,
    size = 'small',
    labelFontVariant = 'body',
    labelColor = 'primary',
    labelAlign = 'center',
    labelClassName = '',
    labelInteractive = false,
    showCircle = false,
    circleLogicalSize = 'small',
    circleActualSizeInner,
    circleColor = TOKENS.colors.white,
    circleBrightness = 'full',
    showParticle = false,
    particleList = ParticleList.ELECTRON
}: UICardProps) {

    // Rectangle shape rendering - using UISquare component (always rectangular)
    const getSquareState = (): UISquareState => {
        switch (state) {
            case UICardState.NORMAL:
                return UISquareState.ACTIVE;
            case UICardState.DISABLED:
                return UISquareState.DISABLED;
            default:
                return UISquareState.DISABLED;
        }
    };

    // Get size-specific container class
    const getSizeClass = (): string => {
        switch (size) {
            case 'small':
                return styles.rectangleContainer;
            case 'mid':
                return styles.rectangleContainer;
            case 'big':
                return styles.bigContainer;
            default:
                return styles.rectangleContainer;
        }
    };

    // Get size-specific shape component and props
    const getShapeComponent = () => {
        switch (size) {
            case 'small':
                return (
                    <UISquare
                        state={getSquareState()}
                        logicalSize="mid"
                        active="clickable"
                        onClick={onClick}
                    />
                );
            case 'mid':
                return (
                    <UIRectangleBig
                        state={getSquareState()}
                        onClick={onClick}
                    />
                );
            case 'big':
                return (
                    <div className={styles.bigCardShape} onClick={onClick}>
                        {/* Big card will be styled with CSS */}
                    </div>
                );
            default:
                return (
                    <UISquare
                        state={getSquareState()}
                        logicalSize="mid"
                        active="clickable"
                        onClick={onClick}
                    />
                );
        }
    };

    if (state === UICardState.DISABLED) {
        return (
            <div className={getSizeClass()}>
                {getShapeComponent()}
            </div>
        );
    }

    return (
        <div className={getSizeClass()}>
            {size === 'big' ? (
                <div className={styles.bigCardShape} onClick={onClick}>
                    <div className={`${styles.contentContainer} ${styles.bigContentContainer} ${showCircle || showParticle ? styles.withCircle : styles.withoutCircle}`}>
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
                        {showParticle && (
                            <div className={styles.circleAbove}>
                                <UIParticle
                                    particleType={particleList}
                                    onClick={onClick}
                                />
                            </div>
                        )}
                        <UILabel
                            fontVariant={labelFontVariant}
                            color={labelColor}
                            align={labelAlign}
                            className={`${styles.symbol} ${showParticle && isAntiparticle(particleList) ? styles.antiparticle : ''} ${labelClassName}`}
                            interactive={labelInteractive}
                        >
                            {showParticle ? getFormattedParticleSymbol(particleList) : symbol}
                        </UILabel>
                    </div>
                </div>
            ) : (
                <>
                    {getShapeComponent()}
                    {size === 'small' && (
                        <div className={`${styles.contentContainer} ${showCircle || showParticle ? styles.withCircle : styles.withoutCircle}`}>
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
                            {showParticle && (
                                <div className={styles.circleAbove}>
                                    <UIParticle
                                        particleType={particleList}
                                        onClick={onClick}
                                    />
                                </div>
                            )}
                            <UILabel
                                fontVariant={labelFontVariant}
                                color={labelColor}
                                align={labelAlign}
                                className={`${styles.symbol} ${showParticle && isAntiparticle(particleList) ? styles.antiparticle : ''} ${labelClassName}`}
                                interactive={labelInteractive}
                            >
                                {showParticle ? getFormattedParticleSymbol(particleList) : symbol}
                            </UILabel>
                        </div>
                    )}
                    {size === 'mid' && (
                        <div className={`${styles.contentContainer} ${styles.midContentContainer} ${showCircle || showParticle ? styles.withCircle : styles.withoutCircle}`}>
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
                            {showParticle && (
                                <div className={styles.circleAbove}>
                                    <UIParticle
                                        particleType={particleList}
                                        onClick={onClick}
                                    />
                                </div>
                            )}
                            <UILabel
                                fontVariant={labelFontVariant}
                                color={labelColor}
                                align={labelAlign}
                                className={`${styles.symbol} ${showParticle && isAntiparticle(particleList) ? styles.antiparticle : ''} ${labelClassName}`}
                                interactive={labelInteractive}
                            >
                                {showParticle ? getFormattedParticleSymbol(particleList) : symbol}
                            </UILabel>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}