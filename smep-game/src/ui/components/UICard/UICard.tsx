import { UISquareState } from '../../../lib/types';
import { ParticleList } from '../../../lib/data/particle-quantum.data';
import { UISquare } from '../Primitives/UISquare';
import { UIRectangleBig } from '../Primitives/UIRectangleBig';
import { UILabel } from '../Text/UILabel';
import { UIParticle } from '../Particles/UIParticle';
import { getFormattedParticleSymbolByType, isAntiparticleByType, getElementBySymbol } from '../../../lib/data';
import styles from './UICard.module.css';

export enum UICardState {
    NORMAL = 'normal',
    DISABLED = 'disabled',
}

export type UICardLogicalSize = 'small' | 'mid' | 'big';

// Union type for all possible particle types
export type ParticleType = ParticleList | string; // string for atomic element symbols

interface UICardProps {
    textSymbol?: string;
    cardState?: UICardState;
    onClick?: () => void;
    // Size configuration
    logicalSize?: UICardLogicalSize;
    // UIParticle configuration options
    showParticle?: boolean;
    particleType?: ParticleType;
    // Style override
    style?: React.CSSProperties;
}

export function UICard({
    textSymbol = '',
    cardState = UICardState.NORMAL,
    onClick,
    logicalSize = 'small',
    showParticle = false,
    particleType = ParticleList.ELECTRON,
    style
}: UICardProps) {

    // Rectangle shape rendering - using UISquare component (always rectangular)
    const getSquareState = (): UISquareState => {
        switch (cardState) {
            case UICardState.NORMAL:
                return UISquareState.ACTIVE;
            case UICardState.DISABLED:
                return UISquareState.DISABLED;
            default:
                return UISquareState.DISABLED;
        }
    };

    // Get size-specific container class with animation support
    const getSizeClass = (): string => {
        const baseClass = logicalSize === 'big' ? styles.bigContainer : styles.rectangleContainer;
        const sizeClass = getSizeSpecificClass();
        return `${baseClass} ${sizeClass}`;
    };

    // Get size-specific CSS class for smooth transitions
    const getSizeSpecificClass = (): string => {
        switch (logicalSize) {
            case 'small':
                return styles.cardSizeSmall;
            case 'mid':
                return styles.cardSizeMid;
            case 'big':
                return styles.cardSizeBig;
            default:
                return styles.cardSizeSmall;
        }
    };

    // Get size-specific shape component and props
    const getShapeComponent = () => {
        const isDisabled = cardState === UICardState.DISABLED;

        switch (logicalSize) {
            case 'small':
                return (
                    <UISquare
                        squareState={getSquareState()}
                        logicalSize="mid"
                        active="clickable"
                        onClick={isDisabled ? undefined : onClick}
                    />
                );
            case 'mid':
                return (
                    <UIRectangleBig
                        rectangleState={getSquareState()}
                        onClick={isDisabled ? undefined : onClick}
                    />
                );
            case 'big':
                // Big card doesn't use a separate shape component, it's handled by the wrapper
                return null;
            default:
                return (
                    <UISquare
                        squareState={getSquareState()}
                        logicalSize="mid"
                        active="clickable"
                        onClick={isDisabled ? undefined : onClick}
                    />
                );
        }
    };

    // Get label color based on state
    const getLabelColor = (): 'gray' | 'white' => {
        return cardState === UICardState.DISABLED ? 'gray' : 'white';
    };

    // Helper function to get particle symbol based on type
    const getParticleSymbol = (): string => {
        if (!showParticle) return textSymbol || '?';

        // Check if it's a quantum particle
        if (typeof particleType === 'string' && Object.values(ParticleList).includes(particleType as ParticleList)) {
            return getFormattedParticleSymbolByType(particleType as ParticleList);
        }

        // Check if it's an atomic element
        if (typeof particleType === 'string') {
            const element = getElementBySymbol(particleType);
            if (element) {
                return element.properties.symbol;
            }
        }

        // Default to textSymbol or particleType
        return textSymbol || particleType || '?';
    };

    // Helper function to check if particle is antiparticle (only for quantum particles)
    const isAntiparticle = (): boolean => {
        if (typeof particleType === 'string' && Object.values(ParticleList).includes(particleType as ParticleList)) {
            return isAntiparticleByType(particleType as ParticleList);
        }
        return false;
    };

    // Helper function to get the correct particle type for UIParticle component
    const getUIParticleType = (): ParticleList => {
        if (typeof particleType === 'string' && Object.values(ParticleList).includes(particleType as ParticleList)) {
            return particleType as ParticleList;
        }
        // For non-quantum particles, default to electron
        return ParticleList.ELECTRON;
    };

    // Render particle component based on state
    const renderParticle = () => {
        return (
            <UIParticle
                particleType={getUIParticleType()}
                onClick={cardState === UICardState.DISABLED ? undefined : onClick}
                className={cardState === UICardState.DISABLED ? styles.disabledParticle : ''}
            />
        );
    };

    // Render content (particle + label) - shared across all sizes
    const renderContent = () => (
        <>
            {showParticle && typeof particleType === 'string' && Object.values(ParticleList).includes(particleType as ParticleList) && (
                <div className={styles.circleAbove}>
                    {renderParticle()}
                </div>
            )}
            <UILabel
                fontVariant="body"
                color={getLabelColor()}
                className={`${styles.symbol} ${showParticle && isAntiparticle() ? styles.antiparticle : ''}`}
                isAntiparticle={showParticle && isAntiparticle()}
            >
                {getParticleSymbol()}
            </UILabel>
        </>
    );

    // Get content container classes
    const getContentClasses = (): string => {
        const baseClasses = styles.contentContainer;
        const shouldShowParticle = showParticle && typeof particleType === 'string' && Object.values(ParticleList).includes(particleType as ParticleList);
        const positionClasses = shouldShowParticle ? styles.withCircle : styles.withoutCircle;

        if (logicalSize === 'big') {
            return `${baseClasses} ${styles.bigContentContainer} ${positionClasses}`;
        } else if (logicalSize === 'mid') {
            return `${baseClasses} ${styles.midContentContainer} ${positionClasses}`;
        }
        return `${baseClasses} ${positionClasses}`;
    };

    // Get wrapper classes for disabled state
    const getWrapperClasses = (): string => {
        const baseClass = logicalSize === 'big' ? styles.bigCardShape : styles.cardWrapper;
        const disabledClass = cardState === UICardState.DISABLED ? styles.disabled : '';
        return `${baseClass} ${disabledClass}`.trim();
    };

    // Render card based on logical size
    const renderCardBySize = () => {
        const wrapperClasses = getWrapperClasses();
        const isDisabled = cardState === UICardState.DISABLED;

        switch (logicalSize) {
            case 'small':
                return (
                    <div
                        className={wrapperClasses}
                        onClick={isDisabled ? undefined : onClick}
                        style={style}
                    >
                        {getShapeComponent()}
                        <div className={getContentClasses()}>
                            {renderContent()}
                        </div>
                    </div>
                );
            case 'mid':
                return (
                    <div
                        className={wrapperClasses}
                        onClick={isDisabled ? undefined : onClick}
                        style={style}
                    >
                        {getShapeComponent()}
                        <div className={getContentClasses()}>
                            {renderContent()}
                        </div>
                    </div>
                );
            case 'big':
                return (
                    <div
                        className={wrapperClasses}
                        onClick={isDisabled ? undefined : onClick}
                        style={style}
                    >
                        <div className={getContentClasses()}>
                            {renderContent()}
                        </div>
                    </div>
                );
            default:
                return (
                    <div
                        className={wrapperClasses}
                        onClick={isDisabled ? undefined : onClick}
                        style={style}
                    >
                        {getShapeComponent()}
                        <div className={getContentClasses()}>
                            {renderContent()}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className={getSizeClass()} style={style}>
            {renderCardBySize()}
        </div>
    );
}