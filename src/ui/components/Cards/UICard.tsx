import { UISquareState } from '../../../lib/types';
import { ParticleList } from '../../../lib/data/particle-quantum.data';
import { UISquare } from '../Primitives/UISquare';
import { UIRectangleBig } from '../Primitives/UIRectangleBig';
import { UICircle } from '../Primitives/UICircle';
import { UIRadiationPulse } from '../Primitives/UIRadiationPulse';
import { UILabel } from '../Text/UILabel';
import { UIParticle } from '../Particles/UIParticle';
import { UIMesonParticle } from '../Particles/UIMesonParticle';
import { UITooltip } from '../Text/UITooltip';
import { getFormattedParticleSymbolByType, isAntiparticleByType, getElementBySymbol, getMesonByPrimaryId } from '../../../lib/data';
import styles from './UICard.module.css';

export enum UICardState {
    NORMAL = 'normal',
    DISABLED = 'disabled',
}

export type UICardLogicalSize = 'small' | 'mid' | 'big';

// Union type for all possible particle types
export type ParticleType = ParticleList | string | number; // string for atomic element symbols, number for meson primaryId

interface UICardProps {
    textSymbol?: string;
    textNumber?: string | number; // Numeric identifier (atomic number, inventory count, etc.) - only displayed on mid/big sizes
    cardState?: UICardState;
    onClick?: () => void;
    // Size configuration
    logicalSize?: UICardLogicalSize;
    // UIParticle configuration options
    showParticle?: boolean;
    particleType?: ParticleType;
    // Composite particle configuration
    compositeParticleType?: 'meson' | 'baryon';
    // Style override
    style?: React.CSSProperties;
    // Tooltip configuration
    tooltipContent?: string;
}

export function UICard({
    textSymbol = '',
    textNumber,
    cardState = UICardState.NORMAL,
    onClick,
    logicalSize = 'small',
    showParticle = false,
    particleType = ParticleList.ELECTRON,
    compositeParticleType,
    style,
    tooltipContent
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

        // Check if it's a meson (numeric primaryId)
        if (isMeson() && typeof particleType === 'number') {
            const meson = getMesonByPrimaryId(particleType);
            if (meson) {
                return meson.properties.symbol;
            }
        }

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

        // Default to textSymbol or particleType (convert to string if number)
        return textSymbol || String(particleType) || '?';
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

    // Helper function to check if particle is an atomic element (not a quantum particle)
    const isAtomicElement = (): boolean => {
        if (typeof particleType === 'string' && !Object.values(ParticleList).includes(particleType as ParticleList)) {
            const element = getElementBySymbol(particleType);
            return element !== undefined;
        }
        return false;
    };

    // Helper function to check if particle is a meson (numeric primaryId 1-25)
    // Reason: Automatically detect mesons without requiring compositeParticleType property
    const isMeson = (): boolean => {
        return typeof particleType === 'number' && particleType >= 1 && particleType <= 25;
    };

    // Render particle component based on state (quantum particle or composite particle)
    const renderParticle = () => {
        // Automatically detect and render meson if particleType is a number (primaryId)
        if (isMeson() || compositeParticleType === 'meson') {
            return (
                <UIMesonParticle
                    mesonType={particleType}
                    onClick={cardState === UICardState.DISABLED ? undefined : onClick}
                    className={cardState === UICardState.DISABLED ? styles.disabledParticle : ''}
                />
            );
        }

        // Render baryon (future implementation)
        if (compositeParticleType === 'baryon') {
            // TODO: Implement baryon rendering
            return null;
        }

        // Render single quantum particle
        return (
            <UIParticle
                particleType={getUIParticleType()}
                onClick={cardState === UICardState.DISABLED ? undefined : onClick}
                className={cardState === UICardState.DISABLED ? styles.disabledParticle : ''}
            />
        );
    };

    // Render atomic element circle based on atomic data
    const renderAtomicCircle = () => {
        if (!isAtomicElement() || typeof particleType !== 'string') return null;

        const element = getElementBySymbol(particleType);
        if (!element) return null;

        // Use relativeDiameter from atomic data for UICard display
        const diameter = element.properties.relativeDiameter;
        const color = element.render.coreColor;
        const showRadiation = element.properties.radioactivity?.isRadioactive === true;

        return (
            <div style={{ position: 'relative', width: diameter, height: diameter }}>
                {showRadiation && (
                    <div className={styles.circleAbove} style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
                        <UIRadiationPulse coreDiameter={diameter} color={color} speedSeconds={0.5} maxScale={3} rings={2} />
                    </div>
                )}
                <UICircle
                    logicalSize="small"
                    actualSize={diameter}
                    color={color}
                    onClick={cardState === UICardState.DISABLED ? undefined : onClick}
                    className={cardState === UICardState.DISABLED ? styles.disabledParticle : ''}
                />
            </div>
        );
    };

    // Render content (particle + label) - shared across all sizes
    const renderContent = () => (
        <>
            {textNumber !== undefined && logicalSize !== 'small' && (
                <div className={styles.atomicNumber}>
                    <UILabel
                        fontVariant="digitSmall"
                        color={getLabelColor()}
                    >
                        {textNumber}
                    </UILabel>
                </div>
            )}
            {showParticle && typeof particleType === 'string' && Object.values(ParticleList).includes(particleType as ParticleList) && (
                <div className={styles.circleAbove}>
                    {renderParticle()}
                </div>
            )}
            {showParticle && isMeson() && (
                <div className={styles.circleAbove}>
                    {renderParticle()}
                </div>
            )}
            {showParticle && isAtomicElement() && (
                <div className={styles.circleAbove}>
                    {renderAtomicCircle()}
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
        const shouldShowQuantumParticle = showParticle && typeof particleType === 'string' && Object.values(ParticleList).includes(particleType as ParticleList);
        const shouldShowMeson = showParticle && isMeson();
        const shouldShowAtomicCircle = showParticle && isAtomicElement();
        const positionClasses = (shouldShowQuantumParticle || shouldShowMeson || shouldShowAtomicCircle) ? styles.withCircle : styles.withoutCircle;

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

    const cardElement = (
        <div className={getSizeClass()} style={style}>
            {renderCardBySize()}
        </div>
    );

    // Wrap with tooltip if tooltipContent is provided
    if (tooltipContent) {
        return (
            <UITooltip content={tooltipContent} position="top" delay={1000}>
                {cardElement}
            </UITooltip>
        );
    }

    return cardElement;
}