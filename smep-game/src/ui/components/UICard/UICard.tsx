import { UISquare, UISquareState } from '../Primitives/UISquare';
import { UIRectangleBig } from '../Primitives/UIRectangleBig';
import { UILabel, type ColorList } from '../Text/UILabel';
import { UIParticle } from '../Particles/UIParticle';
import { ParticleList, getFormattedParticleSymbolByType, isAntiparticleByType } from '../../../lib/data/particle-quantum.data';
import styles from './UICard.module.css';

export enum UICardState {
    NORMAL = 'normal',
    DISABLED = 'disabled',
}

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
    const getLabelColor = (): ColorList => {
        return state === UICardState.DISABLED ? 'gray' : 'white';
    };

    // No special loading state handling needed

    // Render content (particle + label) - shared across all sizes
    const renderContent = () => (
        <>
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
                className={`${styles.symbol} ${showParticle && isAntiparticleByType(particleType) ? styles.antiparticle : ''}`}
                isAntiparticle={showParticle && isAntiparticleByType(particleType)}
            >
                {showParticle ? getFormattedParticleSymbolByType(particleType) : symbol}
            </UILabel>
        </>
    );

    return (
        <div className={getSizeClass()}>
            {size === 'big' ? (
                <div
                    className={`${styles.bigCardShape} ${state === UICardState.DISABLED ? styles.disabled : ''}`}
                    onClick={state === UICardState.DISABLED ? undefined : onClick}
                >
                    <div className={`${styles.contentContainer} ${styles.bigContentContainer} ${showParticle ? styles.withParticle : styles.withoutParticle}`}>
                        {renderContent()}
                    </div>
                </div>
            ) : (
                <>
                    {getShapeComponent()}
                    <div className={`${styles.contentContainer} ${size === 'mid' ? styles.midContentContainer : ''} ${showParticle ? styles.withParticle : styles.withoutParticle}`}>
                        {renderContent()}
                    </div>
                </>
            )}
        </div>
    );
}