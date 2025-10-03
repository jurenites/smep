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
        large: {
            fontFamily: "Roundabout-Regular, Urbanist, sans-serif",
            fontSize: 18,
        },
        small: {
            fontFamily: "Roundabout-Regular, Urbanist, sans-serif",
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
        BUTTON_MIN_WIDTH: 175,
        BUTTON_HEIGHT: 31,
        BLUR_PLAYGROUND: 16,
        BLUR_SMALL: 4,
        LINE: 1,

        // Gap sizes
        GAP_SMALL: 2,
        GAP_LARGE: 16,

        // Padding sizes
        PADDING_SMALL: 4,
        PADDING_MEDIUM: 8,

        // Margin sizes
        MARGIN_SMALL: 8,

        // Border radius
        BORDER_RADIUS_SMALL: 4,

        // Other sizes
        OUTLINE_OFFSET: 2,
        ANIMATION_TRANSLATE_UP: 1,

        // Playground specific sizes
        PLAYGROUND_MARGIN: 2, // Margin around playground circle
        PLAYGROUND_SHADOW_OPACITY: 0.1, // Shadow opacity for bottom blur
        PLAYGROUND_SHADOW_OFFSET: 0.5, // Shadow offset ratio (0.5 = half radius)

        // Opacity values
        OPACITY_SUBTLE: 0.3, // Subtle opacity for borders
        OPACITY_MEDIUM: 0.5, // Medium opacity for backgrounds
        OPACITY_LOW: 0.2, // Low opacity for shadows
        OPACITY_TEXT_SECONDARY: 0.7, // Secondary text opacity
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

    // Shadow gradients
    shadowGradients: {
        particleMatter: 'radial-gradient(circle, rgba(248, 231, 28, 0.3) 0%, rgba(248, 231, 28, 0.1) 50%, transparent 100%)',
        particleAntimatter: 'radial-gradient(circle, rgba(76, 0, 255, 0.3) 0%, rgba(76, 0, 255, 0.1) 50%, transparent 100%)',
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
    '--color-transparent': 'transparent',

    // Particle Colors
    '--particle-lepton-matter': TOKENS.colors.yolk,
    '--particle-lepton-antimatter': TOKENS.colors.ultraviolet,
    '--particle-neutrino-matter': TOKENS.colors.white,
    '--particle-neutrino-antimatter': TOKENS.colors.white,
    '--particle-quark-matter': TOKENS.colors.gray,
    '--particle-quark-antimatter': TOKENS.colors.gray,

    /* Particle Gradients */
    '--gradient-particle-quark-up': '',

    /* Shadows */
    '--shadow-text-subtle': TOKENS.shadows.textSubtle,
    '--shadow-box-subtle': TOKENS.shadows.boxSubtle,
    '--shadow-box-medium': TOKENS.shadows.boxMedium,
    '--shadow-box-strong': TOKENS.shadows.boxStrong,

    // Shadow sizes
    '--shadow-size-small': `${TOKENS.shadowSizes.SMALL}px`,
    '--shadow-size-mid': `${TOKENS.shadowSizes.MID}px`,
    '--shadow-size-big': `${TOKENS.shadowSizes.BIG}px`,

    // Shadow gradients
    '--particle-matter-shadow': TOKENS.shadowGradients.particleMatter,
    '--particle-antimatter-shadow': TOKENS.shadowGradients.particleAntimatter,

    // Blurs sizes 
    '--size-blur-playground': `${TOKENS.sizes.BLUR_PLAYGROUND}px`,
    '--size-blur-small': `${TOKENS.sizes.BLUR_SMALL}px`,

    // Fonts
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
    '--font-large': TOKENS.typography.large.fontFamily,
    '--font-large-size': `${TOKENS.typography.large.fontSize}px`,
    '--font-small': TOKENS.typography.small.fontFamily,
    '--font-small-size': `${TOKENS.typography.small.fontSize}px`,

    // Sizes
    '--z-index-hud': TOKENS.zIndexes.HUD_Z_Index,
    '--size-dot-1': `${TOKENS.sizes.CIRCLE_DOT_1}px`,
    '--size-circle-4': `${TOKENS.sizes.CIRCLE_MICRO_4}px`,
    '--size-circle-6': `${TOKENS.sizes.CIRCLE_MINI_6}px`,
    '--size-circle-61': `${TOKENS.sizes.CIRCLE_MIDDLE_61}px`,
    '--size-circle-109': `${TOKENS.sizes.CIRCLE_MEGA_109}px`,

    '--size-square-small': `${TOKENS.sizes.SQUARE_SMALL}px`,
    '--size-rectangle-small': `${TOKENS.sizes.RECTANGLE_SMALL}px`,
    '--size-card-small': `${TOKENS.sizes.CARD_SMALL}px`,
    '--size-card-mid-w': `${TOKENS.sizes.CARD_MID_W}px`,
    '--size-card-mid-h': `${TOKENS.sizes.CARD_MID_H}px`,

    '--size-tab-min-w': `${TOKENS.sizes.TAB_MIN_W}px`,
    '--size-tab-h': `${TOKENS.sizes.TAB_H}px`,

    '--size-button-width': `${TOKENS.sizes.BUTTON_MIN_WIDTH}px`,
    '--size-button-height': `${TOKENS.sizes.BUTTON_HEIGHT}px`,

    '--size-card-big': `${TOKENS.sizes.CARD_BIG}px`,

    // lines sizes
    '--size-line': `${TOKENS.sizes.LINE}px`,

    // Gap sizes
    '--size-gap-small': `${TOKENS.sizes.GAP_SMALL}px`,
    '--size-gap-large': `${TOKENS.sizes.GAP_LARGE}px`,

    // Padding sizes
    '--size-padding-small': `${TOKENS.sizes.PADDING_SMALL}px`,
    '--size-padding-medium': `${TOKENS.sizes.PADDING_MEDIUM}px`,

    // Margin sizes
    '--size-margin-small': `${TOKENS.sizes.MARGIN_SMALL}px`,

    // Border radius
    '--size-border-radius-small': `${TOKENS.sizes.BORDER_RADIUS_SMALL}px`,

    // Other sizes
    '--size-outline-offset': `${TOKENS.sizes.OUTLINE_OFFSET}px`,

    // Animation transition
    '--animation-translate-up': `${TOKENS.sizes.ANIMATION_TRANSLATE_UP}px`,

    // Playground specific
    '--playground-margin': `${TOKENS.sizes.PLAYGROUND_MARGIN}px`,
    '--playground-shadow-opacity': TOKENS.sizes.PLAYGROUND_SHADOW_OPACITY,
    '--playground-shadow-offset': TOKENS.sizes.PLAYGROUND_SHADOW_OFFSET,

    // Opacity values
    '--opacity-subtle': TOKENS.sizes.OPACITY_SUBTLE,
    '--opacity-medium': TOKENS.sizes.OPACITY_MEDIUM,
    '--opacity-low': TOKENS.sizes.OPACITY_LOW,
    '--opacity-text-secondary': TOKENS.sizes.OPACITY_TEXT_SECONDARY,

} as const;