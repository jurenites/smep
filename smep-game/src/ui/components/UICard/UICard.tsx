import { UICardState, UISquareState } from '../../../lib/types';
import { UISquare } from '../Primitives/UISquare';
import { UIRectangleBig } from '../Primitives/UIRectangleBig';
import { UILabel } from '../Text/UILabel';
import { UIParticle } from '../Particles/UIParticle';
import { ParticleList } from '../../../lib/types/particle-types';
import { getFormattedParticleSymbol, isAntiparticle } from '../../../lib/utils/particle-symbols';
import styles from './UICard.module.css';

export type UICardSize = 'small' | 'mid' | 'big';

interface UICardProps {
    symbol: string;
    state?: UICardState;
    onClick?: () => void;
    // Size configuration
    size?: UICardSize;
    // UIParticle configuration options
    showParticle?: boolean;
    particleType?: ParticleList;
}

export function UICard({
    symbol,
    state = UICardState.NORMAL,
    onClick,
    size = 'small',
    showParticle = false,
    particleType = ParticleList.ELECTRON
}: UICardProps) {

    // Rectangle shape rendering - using UISquare component (always rectangular)
    const getSquareState = (): UISquareState => {
        switch (state) {
            case UICardState.DISABLED:
                return UISquareState.DISABLED;
            default:
                return UISquareState.INACTIVE; // NORMAL state
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

    // Get label color based on state
    const getLabelColor = (): 'primary' | 'secondary' => {
        return state === UICardState.DISABLED ? 'secondary' : 'primary';
    };

    // No special loading state handling needed

    return (
        <div className={getSizeClass()}>
            {size === 'big' ? (
                <div className={`${styles.bigCardShape} ${state === UICardState.DISABLED ? styles.disabled : ''}`} onClick={state === UICardState.DISABLED ? undefined : onClick}>
                    <div className={`${styles.contentContainer} ${styles.bigContentContainer} ${showParticle ? styles.withParticle : styles.withoutParticle}`}>
                        {showParticle && (
                            <div className={styles.particleAbove}>
                                <UIParticle
                                    particleType={particleType}
                                    onClick={onClick}
                                />
                            </div>
                        )}
                        <UILabel
                            fontVariant="body"
                            color={getLabelColor()}
                            align="center"
                            className={`${styles.symbol} ${showParticle && isAntiparticle(particleType) ? styles.antiparticle : ''}`}
                            interactive={false}
                        >
                            {showParticle ? getFormattedParticleSymbol(particleType) : symbol}
                        </UILabel>
                    </div>
                </div>
            ) : (
                <>
                    {getShapeComponent()}
                    {size === 'small' && (
                        <div className={`${styles.contentContainer} ${showParticle ? styles.withParticle : styles.withoutParticle}`}>
                            {showParticle && (
                                <div className={styles.particleAbove}>
                                    <UIParticle
                                        particleType={particleType}
                                        onClick={onClick}
                                    />
                                </div>
                            )}
                            <UILabel
                                fontVariant="body"
                                color={getLabelColor()}
                                align="center"
                                className={`${styles.symbol} ${showParticle && isAntiparticle(particleType) ? styles.antiparticle : ''}`}
                                interactive={false}
                            >
                                {showParticle ? getFormattedParticleSymbol(particleType) : symbol}
                            </UILabel>
                        </div>
                    )}
                    {size === 'mid' && (
                        <div className={`${styles.contentContainer} ${styles.midContentContainer} ${showParticle ? styles.withParticle : styles.withoutParticle}`}>
                            {showParticle && (
                                <div className={styles.particleAbove}>
                                    <UIParticle
                                        particleType={particleType}
                                        onClick={onClick}
                                    />
                                </div>
                            )}
                            <UILabel
                                fontVariant="body"
                                color={getLabelColor()}
                                align="center"
                                className={`${styles.symbol} ${showParticle && isAntiparticle(particleType) ? styles.antiparticle : ''}`}
                                interactive={false}
                            >
                                {showParticle ? getFormattedParticleSymbol(particleType) : symbol}
                            </UILabel>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}