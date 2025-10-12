import React, { useState } from 'react';
import styles from './PlaygroundContentTemplate.module.css';
import { UICircle, LogicalSize } from '../../components/Primitives/UICircle';

export function PlaygroundContentTemplate() {
    const [selectedSize, setSelectedSize] = useState<LogicalSize>('middle');
    const [customSize, setCustomSize] = useState<number | undefined>(undefined);
    const [brightness, setBrightness] = useState<'full' | 'dimmed'>('full');

    const sizes: LogicalSize[] = ['dot', 'small', 'mini', 'middle', 'mega'];

    return (
        <div className={styles.content}>
            <div className={styles.playgroundSection}>
                <h3>UICircle Playground</h3>

                {/* Interactive Circle Display */}
                <div className={styles.circleDisplay}>
                    <UICircle
                        logicalSize={selectedSize}
                        actualSize={customSize}
                        brightness={brightness}
                        onClick={() => {/* console.log('Playground circle clicked!') */ }}
                    />
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <label>Logical Size:</label>
                        <div className={styles.buttonGroup}>
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => {
                                        setSelectedSize(size);
                                        setCustomSize(undefined);
                                    }}
                                    className={`${styles.sizeButton} ${selectedSize === size ? styles.active : ''}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.controlGroup}>
                        <label>Custom Size (px):</label>
                        <input
                            type="number"
                            min="0.1"
                            max="200"
                            step="0.01"
                            value={customSize || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCustomSize(value ? parseFloat(value) : undefined);
                            }}
                            placeholder="Enter custom size"
                            className={styles.sizeInput}
                        />
                        <button
                            onClick={() => setCustomSize(undefined)}
                            className={styles.resetButton}
                        >
                            Reset
                        </button>
                    </div>

                    <div className={styles.controlGroup}>
                        <label>Brightness (for dot):</label>
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={() => setBrightness('full')}
                                className={`${styles.brightnessButton} ${brightness === 'full' ? styles.active : ''}`}
                            >
                                Full
                            </button>
                            <button
                                onClick={() => setBrightness('dimmed')}
                                className={`${styles.brightnessButton} ${brightness === 'dimmed' ? styles.active : ''}`}
                            >
                                Dimmed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Size Comparison */}
                <div className={styles.comparisonSection}>
                    <h4>Size Comparison</h4>
                    <div className={styles.sizeComparison}>
                        {sizes.map((size) => (
                            <div key={size} className={styles.comparisonItem}>
                                <UICircle logicalSize={size} />
                                <span className={styles.sizeLabel}>{size}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}