/**
 * Translation Data for SMEP Game
 * 
 * This file contains all translatable text strings used in UI components.
 * Designed to work with third-party translation services like Lokalise.
 * 
 * NAMING CONVENTION:
 * - Use camelCase for keys (e.g., 'helloWorld', 'antiUp')
 * - Group by feature/component (e.g., 'button', 'particles', 'ui')
 * - Use descriptive names that indicate context (e.g., 'playgroundCircle' not just 'circle')
 * - For scientific terms, use standard names (e.g., 'up', 'down', 'charm' for quarks)
 * - For UI elements, use component context (e.g., 'button.loading', 'ui.badge')
 * 
 * STRUCTURE:
 * - Keys are organized by component/feature
 * - Values are the default English text
 * - Keys should be descriptive and hierarchical
 * - Use nested objects for logical grouping
 * 
 * USAGE:
 * 1. Import: import { getNestedTranslation } from './translations'
 * 2. Use: getNestedTranslation('button.loading') // Returns 'Loading...'
 * 3. In templates: Replace hardcoded strings with translation keys
 * 
 * LOKALISE INTEGRATION:
 * 1. Export this file to Lokalise
 * 2. Translate to target languages
 * 3. Import translated files back
 * 4. Replace values with translated text
 */

export interface TranslationData {
    // UI Button component translations
    button: {
        loading: string;
        done: string;
        hold: string;
        continue: string;
    };

    // Accessibility labels
    accessibility: {
        playgroundCircle: string;
        playgroundSurface: string;
    };

    // UI Component labels and text
    ui: {
        badge: string;
        helloWorld: string;
        page: string;
    };

    // Tab navigation labels
    tabs: {
        particle: string;
        field: string;
        wave: string;
    };

    // Particle names (scientific terms)
    particles: {
        quarks: {
            up: string;
            down: string;
            charm: string;
            strange: string;
            top: string;
            bottom: string;
            antiUp: string;
            antiDown: string;
        };
        families: {
            quark: string;
            lepton: string;
            neutrino: string;
        };
    };

    // Navigation directions
    navigation: {
        up: string;
        down: string;
        left: string;
        right: string;
    };

    // Future: Add more translation categories as needed
    // game: { ... }
    // menu: { ... }
    // settings: { ... }
}

/**
 * Default English translations
 * These serve as the source language and fallback
 */
export const DEFAULT_TRANSLATIONS: TranslationData = {
    button: {
        loading: 'Loading...',
        done: 'Done',
        hold: 'Hold',
        continue: 'Continue',
    },

    accessibility: {
        playgroundCircle: 'Playground circle with shadow effects',
        playgroundSurface: 'Playground surface',
    },

    ui: {
        badge: 'Badge',
        helloWorld: 'Hello World',
        page: 'Page',
    },

    tabs: {
        particle: 'particle',
        field: 'field',
        wave: 'wave',
    },

    particles: {
        quarks: {
            up: 'up',
            down: 'down',
            charm: 'charm',
            strange: 'strange',
            top: 'top',
            bottom: 'bottom',
            antiUp: 'anti up',
            antiDown: 'anti down',
        },
        families: {
            quark: 'Quark',
            lepton: 'Lepton',
            neutrino: 'Neutrino',
        },
    },

    navigation: {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right',
    },
};

/**
 * Translation key type for type safety
 */
export type TranslationKey = keyof TranslationData;

/**
 * Get translation for a specific key
 * @param key - The translation key
 * @param translations - Optional custom translations (defaults to DEFAULT_TRANSLATIONS)
 * @returns The translated text
 */
export function getTranslation<K extends TranslationKey>(
    key: K,
    translations: TranslationData = DEFAULT_TRANSLATIONS
): TranslationData[K] {
    return translations[key];
}

/**
 * Get nested translation value
 * @param key - The translation key path (e.g., 'button.loading')
 * @param translations - Optional custom translations
 * @returns The translated text
 */
export function getNestedTranslation(
    key: string,
    translations: TranslationData = DEFAULT_TRANSLATIONS
): string {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            console.warn(`Translation key not found: ${key}`);
            return key; // Return key as fallback
        }
    }

    return typeof value === 'string' ? value : key;
}

/**
 * Translation hook for React components
 * This can be extended to support dynamic language switching
 */
export function useTranslations(translations?: TranslationData) {
    const t = translations || DEFAULT_TRANSLATIONS;

    return {
        t,
        get: getNestedTranslation,
    };
}

/**
 * Helper functions for common translation patterns
 */

/**
 * Get a page title with number (e.g., "Page 1", "Page 2")
 */
export function getPageTitle(pageNumber: number, translations: TranslationData = DEFAULT_TRANSLATIONS): string {
    return `${translations.ui.page} ${pageNumber}`;
}

/**
 * Get a particle name by type
 */
export function getParticleName(particleType: string, translations: TranslationData = DEFAULT_TRANSLATIONS): string {
    const key = `particles.quarks.${particleType}` as keyof TranslationData;
    return getNestedTranslation(key, translations);
}

/**
 * Get a navigation direction name
 */
export function getNavigationDirection(direction: 'up' | 'down' | 'left' | 'right', translations: TranslationData = DEFAULT_TRANSLATIONS): string {
    return translations.navigation[direction];
}

/**
 * Future: Language switching functionality
 * This can be implemented when integrating with Lokalise
 */
export interface LanguageConfig {
    code: string;
    name: string;
    translations: TranslationData;
}

// Example of how this would work with Lokalise integration:
/*
export const LANGUAGES: LanguageConfig[] = [
    {
        code: 'en',
        name: 'English',
        translations: DEFAULT_TRANSLATIONS,
    },
    {
        code: 'es',
        name: 'Español',
        translations: {
            button: {
                loading: 'Cargando...',
                done: 'Hecho',
                hold: 'Mantener',
                continue: 'Continuar',
            },
            accessibility: {
                playgroundCircle: 'Círculo de juego con efectos de sombra',
                playgroundSurface: 'Superficie de juego',
            },
            ui: {
                badge: 'Insignia',
                helloWorld: 'Hola Mundo',
                page: 'Página',
            },
            tabs: {
                particle: 'partícula',
                field: 'campo',
                wave: 'onda',
            },
            particles: {
                quarks: {
                    up: 'arriba',
                    down: 'abajo',
                    charm: 'encanto',
                    strange: 'extraño',
                    top: 'cima',
                    bottom: 'fondo',
                    antiUp: 'anti arriba',
                    antiDown: 'anti abajo',
                },
                families: {
                    quark: 'Quark',
                    lepton: 'Leptón',
                    neutrino: 'Neutrino',
                },
            },
            navigation: {
                up: 'arriba',
                down: 'abajo',
                left: 'izquierda',
                right: 'derecha',
            },
        },
    },
];
*/
