/**
 * Visual Design Tokens
 * 
 * This file contains visual design parameters for the UI system including:
 * - Colors, typography, sizes, spacing, and z-index values
 * - CSS variables for consistent styling across components
 * 
 * For game logic constants, see: src/lib/constants/game-constants.ts
 */
export const TOKENS = {
    // Colors
    colors: {
        yolk: "#F8E71C",
        ultraviolet: "#4C00FF",
        white: "#FFFFF5",
        lightgray: "#C0C0C0",
        gray: "#666666",
        darkgray: "#232323",
        black: "#000000",
    },
    // Typography
    typography: {
        title: {
            fontFamily: "Roundabout-Regular, Urbanist, sans-serif",
            fontSize: 16,
        },
        body: {
            fontFamily: "Roundabout-Regular, Sulphur Point, sans-serif",
            fontSize: 16,
        },
        digitBig: {
            fontFamily: "4pixel, monospace",
            fontSize: 10,
        },
        digitSmall: {
            fontFamily: "4pixel, monospace",
            fontSize: 5,
        },
        code: {
            fontFamily: "'Courier New', monospace",
            fontSize: 12,
        },
    },
    // Sizes
    sizes: {
        // Circle sizes
        CIRCLE_DOT_1: 1, // 1px
        CIRCLE_MICRO_4: 4,
        CIRCLE_MINI_6: 6,
        CIRCLE_MIDDLE_61: 61,
        CIRCLE_MEGA_109: 109,

        // Card sizes
        CARD_SMALL: 31,
        CARD_MID_W: 83,
        CARD_MID_H: 109,
        CARD_BIG: 175,

        // Component sizes
        SQUARE_SMALL: 4,
        RECTANGLE_SMALL: 17,
        TAB_MIN_W: 109,
        TAB_H: 23,
        BLUR_PLAYGROUND: 16,
        LINE: 1,

        // Gap sizes
        GAP_SMALL: 2,
        GAP_LARGE: 16,

        // Margin sizes
        MARGIN_SMALL: 8,

        // Other sizes
        OUTLINE_OFFSET: 2,
        ANIMATION_TRANSLATE_UP: 1,
    },
    // Shadows
    shadows: {
        textSubtle: "0 1px 2px rgba(0, 0, 0, 0.5)",
        boxSubtle: "0 2px 8px rgba(0, 0, 0, 0.1)",
        boxMedium: "0 4px 16px rgba(0, 0, 0, 0.15)",
        boxStrong: "0 8px 32px rgba(0, 0, 0, 0.2)",
    },

    // Shadow sizes
    shadowSizes: {
        SMALL: 17,
        MID: 40,
        BIG: 109,
    },
    // Z-indexes
    zIndexes: {
        HUD_Z_Index: 10,
    },
} as const;

// CSS Variables for global use
export const CSS_VARS = {
    '--color-yolk': TOKENS.colors.yolk,
    '--color-ultraviolet': TOKENS.colors.ultraviolet,
    '--color-white': TOKENS.colors.white,
    '--color-light-gray': TOKENS.colors.lightgray,
    '--color-gray': TOKENS.colors.gray,
    '--color-dark-gray': TOKENS.colors.darkgray,
    '--color-black': TOKENS.colors.black,

    '--shadow-text-subtle': TOKENS.shadows.textSubtle,
    '--shadow-box-subtle': TOKENS.shadows.boxSubtle,
    '--shadow-box-medium': TOKENS.shadows.boxMedium,
    '--shadow-box-strong': TOKENS.shadows.boxStrong,

    // Particle colors
    '--particle-lepton-matter': TOKENS.colors.yolk,
    '--particle-lepton-antimatter': TOKENS.colors.ultraviolet,
    '--particle-neutrino-matter': TOKENS.colors.white,
    '--particle-neutrino-antimatter': TOKENS.colors.white,
    '--particle-quark-matter': TOKENS.colors.gray,
    '--particle-quark-antimatter': TOKENS.colors.gray,

    '--font-title': TOKENS.typography.title.fontFamily,
    '--font-title-size': `${TOKENS.typography.title.fontSize}px`,
    '--font-body': TOKENS.typography.body.fontFamily,
    '--font-body-size': `${TOKENS.typography.body.fontSize}px`,
    '--font-digit-big': TOKENS.typography.digitBig.fontFamily,
    '--font-digit-big-size': `${TOKENS.typography.digitBig.fontSize}px`,
    '--font-digit-small': TOKENS.typography.digitSmall.fontFamily,
    '--font-digit-small-size': `${TOKENS.typography.digitSmall.fontSize}px`,
    '--font-code': TOKENS.typography.code.fontFamily,
    '--font-code-size': `${TOKENS.typography.code.fontSize}px`,

    '--z-index-hud': TOKENS.zIndexes.HUD_Z_Index,
    '--size-dot-1': `${TOKENS.sizes.CIRCLE_DOT_1}px`,
    '--size-circle-4': `${TOKENS.sizes.CIRCLE_MICRO_4}px`,
    '--size-circle-6': `${TOKENS.sizes.CIRCLE_MINI_6}px`,
    '--size-circle-61': `${TOKENS.sizes.CIRCLE_MIDDLE_61}px`,
    '--size-circle-109': `${TOKENS.sizes.CIRCLE_MEGA_109}px`,
    '--size-card-small': `${TOKENS.sizes.CARD_SMALL}px`,
    '--size-square-small': `${TOKENS.sizes.SQUARE_SMALL}px`,
    '--size-rectangle-small': `${TOKENS.sizes.RECTANGLE_SMALL}px`,
    '--size-card-mid-w': `${TOKENS.sizes.CARD_MID_W}px`,
    '--size-card-mid-h': `${TOKENS.sizes.CARD_MID_H}px`,
    '--size-tab-min-w': `${TOKENS.sizes.TAB_MIN_W}px`,
    '--size-tab-h': `${TOKENS.sizes.TAB_H}px`,
    '--size-card-big': `${TOKENS.sizes.CARD_BIG}px`,
    '--size-blur-playground': `${TOKENS.sizes.BLUR_PLAYGROUND}px`,
    '--size-line': `${TOKENS.sizes.LINE}px`,

    // Gap sizes
    '--size-gap-small': `${TOKENS.sizes.GAP_SMALL}px`,
    '--size-gap-large': `${TOKENS.sizes.GAP_LARGE}px`,

    // Margin sizes
    '--size-margin-small': `${TOKENS.sizes.MARGIN_SMALL}px`,

    // Other sizes
    '--size-outline-offset': `${TOKENS.sizes.OUTLINE_OFFSET}px`,
    '--animation-translate-up': `${TOKENS.sizes.ANIMATION_TRANSLATE_UP}px`,

    // Shadow sizes
    '--shadow-size-small': `${TOKENS.shadowSizes.SMALL}px`,
    '--shadow-size-mid': `${TOKENS.shadowSizes.MID}px`,
    '--shadow-size-big': `${TOKENS.shadowSizes.BIG}px`,
} as const;