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
    colors: {
        yolk: "#F8E71C",
        ultraviolet: "#4C00FF",
        white: "#FFFFF5",
        lightgray: "#C0C0C0",
        gray: "#666666",
        darkgray: "#232323",
        black: "#000000",
    },
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
    sizes: {
        CIRCLE_DOT_1: 1, // 1px
        CIRCLE_MICRO_4: 4,
        CIRCLE_MINI_6: 6,
        CIRCLE_MIDDLE_61: 61,
        CIRCLE_MEGA_109: 109,

        MINI_CARD: 31,
        SQUARE_SMALL: 4,
        BIG_PAGINATOR_W: 17,
        MID_CARD_W: 83,
        MID_CARD_H: 109,
        TAB_MIN_W: 109,
        TAB_H: 23,
        BUTTON_MIN_WIDTH: 175,
        BLUR_PLAYGROUND: 16,
        LINE: 1,

        // Gap sizes
        GAP_SMALL: 2,
        GAP_LARGE: 16,

        // Margin sizes
        MARGIN_SMALL: 8,

        // Other sizes
        OUTLINE_OFFSET: 2,
        HOVER_TRANSLATE: 1,

        // Particle shadow sizes
        PARTICLE_SHADOW_SMALL: 17,
        PARTICLE_SHADOW_MID: 40,
        PARTICLE_SHADOW_BIG: 109,
    },
    shadows: {
        textSubtle: "0 1px 2px rgba(0, 0, 0, 0.5)",
        textStrong: "0 2px 4px rgba(0, 0, 0, 0.8)",

        boxSubtle: "0 2px 8px rgba(0, 0, 0, 0.1)",
        boxMedium: "0 4px 16px rgba(0, 0, 0, 0.15)",
        boxStrong: "0 8px 32px rgba(0, 0, 0, 0.2)",
        // Particle shadows for matter/antimatter visualization
        particleMatter: "radial-gradient(circle, rgba(248, 231, 28, 0.41) 0%, rgba(255, 236, 0, 0) 100%)",
        particleAntimatter: "radial-gradient(circle, rgba(134, 0, 255, 0.72) 0%, rgba(134, 0, 255, 0) 100%)",
    },
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
    '--shadow-text-strong': TOKENS.shadows.textStrong,
    '--shadow-box-subtle': TOKENS.shadows.boxSubtle,
    '--shadow-box-medium': TOKENS.shadows.boxMedium,
    '--shadow-box-strong': TOKENS.shadows.boxStrong,
    '--shadow-particle-matter': TOKENS.shadows.particleMatter,
    '--shadow-particle-antimatter': TOKENS.shadows.particleAntimatter,

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
    '--size-mini-card': `${TOKENS.sizes.MINI_CARD}px`,
    '--size-square-small': `${TOKENS.sizes.SQUARE_SMALL}px`,
    '--size-big-paginator-w': `${TOKENS.sizes.BIG_PAGINATOR_W}px`,
    '--size-mid-card-w': `${TOKENS.sizes.MID_CARD_W}px`,
    '--size-mid-card-h': `${TOKENS.sizes.MID_CARD_H}px`,
    '--size-tab-min-w': `${TOKENS.sizes.TAB_MIN_W}px`,
    '--size-tab-h': `${TOKENS.sizes.TAB_H}px`,
    '--size-button-min-width': `${TOKENS.sizes.BUTTON_MIN_WIDTH}px`,
    '--size-blur-playground': `${TOKENS.sizes.BLUR_PLAYGROUND}px`,
    '--size-line': `${TOKENS.sizes.LINE}px`,

    // Gap sizes
    '--size-gap-small': `${TOKENS.sizes.GAP_SMALL}px`,
    '--size-gap-large': `${TOKENS.sizes.GAP_LARGE}px`,

    // Margin sizes
    '--size-margin-small': `${TOKENS.sizes.MARGIN_SMALL}px`,

    // Other sizes
    '--size-outline-offset': `${TOKENS.sizes.OUTLINE_OFFSET}px`,
    '--size-hover-translate': `${TOKENS.sizes.HOVER_TRANSLATE}px`,

    // Particle shadow sizes
    '--size-particle-shadow-small': `${TOKENS.sizes.PARTICLE_SHADOW_SMALL}px`,
    '--size-particle-shadow-mid': `${TOKENS.sizes.PARTICLE_SHADOW_MID}px`,
    '--size-particle-shadow-big': `${TOKENS.sizes.PARTICLE_SHADOW_BIG}px`,
} as const;