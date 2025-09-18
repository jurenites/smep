export const TOKENS = {
    colors: {
        yolk: "#F8E71C",
        ultraviolet: "#4C00FF",
        white: "#FFFFFF",
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
        DOT_1: 1, // 1px
        CIRCLE_4: 4,
        CIRCLE_6: 6,
        CIRCLE_61: 61,
        MINI_CARD: 31,
        MINI_PAGINATOR: 4,
        MINI_PAGINATOR_GAP: 2,
        BIG_PAGINATOR_W: 17,
        BIG_PAGINATOR_H: 4,
        BIG_PAGINATOR_GAP: 0,
        RECTANGLE_SMALL_W: 4,
        RECTANGLE_SMALL_H: 17,
        MID_CARD_W: 83,
        MID_CARD_H: 109,
        TAB_W: 109,
        TAB_H: 23,
        BLUR_PLAYGROUND: 16,
        STROKE: 1,
        HUD_PADDING: 2,

        // Gap sizes
        GAP_SMALL: 2,
        GAP_MEDIUM: 8,
        GAP_LARGE: 16,

        // Padding sizes
        PADDING_SMALL: 4,
        PADDING_MEDIUM: 8,
        PADDING_LARGE: 12,
        PADDING_XLARGE: 16,
        PADDING_TINY: 1,

        // Margin sizes
        MARGIN_SMALL: 8,

        // Border radius sizes
        RADIUS_SMALL: 4,
        RADIUS_MEDIUM: 6,
        RADIUS_LARGE: 8,

        // Font sizes
        FONT_SIZE_SMALL: 10,
        FONT_SIZE_MEDIUM: 12,
        FONT_SIZE_LARGE: 14,
        FONT_SIZE_XLARGE: 16,

        // Other sizes
        OUTLINE_OFFSET: 2,
        HOVER_TRANSLATE: 1,
        LINE_HEIGHT_TIGHT: 1.2,
    },
    zIndexes: {
        HUD_Z_Index: 10,
    },
    gameConstants: {
        energyGenerationRate: 0.1,
        particleRadius: 3,
        quantaUnit: 1.602176634e-19,
        playgroundDebugArtMode: false,
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

    '--font-title': TOKENS.typography.title.fontFamily,
    '--font-title-size': `${TOKENS.typography.title.fontSize}px`,
    '--font-body': TOKENS.typography.body.fontFamily,
    '--font-body-size': `${TOKENS.typography.body.fontSize}px`,
    '--font-digit-big': TOKENS.typography.digitBig.fontFamily,
    '--font-digit-big-size': `${TOKENS.typography.digitBig.fontSize}px`,
    '--font-digit-small': TOKENS.typography.digitSmall.fontFamily,
    '--font-digit-small-size': `${TOKENS.typography.digitSmall.fontSize}px`,
    '--font-digit-size': `${TOKENS.typography.digitBig.fontSize}px`,
    '--font-code': TOKENS.typography.code.fontFamily,
    '--font-code-size': `${TOKENS.typography.code.fontSize}px`,

    '--size-hud-padding': `${TOKENS.sizes.HUD_PADDING}px`,
    '--z-index-hud': TOKENS.zIndexes.HUD_Z_Index,
    '--size-dot-1': `${TOKENS.sizes.DOT_1}px`,
    '--size-circle-4': `${TOKENS.sizes.CIRCLE_4}px`,
    '--size-circle-6': `${TOKENS.sizes.CIRCLE_6}px`,
    '--size-circle-61': `${TOKENS.sizes.CIRCLE_61}px`,
    '--size-mini-card': `${TOKENS.sizes.MINI_CARD}px`,
    '--size-mini-paginator': `${TOKENS.sizes.MINI_PAGINATOR}px`,
    '--size-mini-paginator-gap': `${TOKENS.sizes.MINI_PAGINATOR_GAP}px`,
    '--size-big-paginator-w': `${TOKENS.sizes.BIG_PAGINATOR_W}px`,
    '--size-big-paginator-h': `${TOKENS.sizes.BIG_PAGINATOR_H}px`,
    '--size-big-paginator-gap': `${TOKENS.sizes.BIG_PAGINATOR_GAP}px`,
    '--size-rectangle-small-w': `${TOKENS.sizes.RECTANGLE_SMALL_W}px`,
    '--size-rectangle-small-h': `${TOKENS.sizes.RECTANGLE_SMALL_H}px`,
    '--size-mid-card-w': `${TOKENS.sizes.MID_CARD_W}px`,
    '--size-mid-card-h': `${TOKENS.sizes.MID_CARD_H}px`,
    '--size-tab-w': `${TOKENS.sizes.TAB_W}px`,
    '--size-tab-h': `${TOKENS.sizes.TAB_H}px`,
    '--size-blur-playground': `${TOKENS.sizes.BLUR_PLAYGROUND}px`,
    '--size-stroke': `${TOKENS.sizes.STROKE}px`,

    // Gap sizes
    '--size-gap-small': `${TOKENS.sizes.GAP_SMALL}px`,
    '--size-gap-medium': `${TOKENS.sizes.GAP_MEDIUM}px`,
    '--size-gap-large': `${TOKENS.sizes.GAP_LARGE}px`,

    // Padding sizes
    '--size-padding-small': `${TOKENS.sizes.PADDING_SMALL}px`,
    '--size-padding-medium': `${TOKENS.sizes.PADDING_MEDIUM}px`,
    '--size-padding-large': `${TOKENS.sizes.PADDING_LARGE}px`,
    '--size-padding-xlarge': `${TOKENS.sizes.PADDING_XLARGE}px`,
    '--size-padding-tiny': `${TOKENS.sizes.PADDING_TINY}px`,

    // Margin sizes
    '--size-margin-small': `${TOKENS.sizes.MARGIN_SMALL}px`,

    // Border radius sizes
    '--size-radius-small': `${TOKENS.sizes.RADIUS_SMALL}px`,
    '--size-radius-medium': `${TOKENS.sizes.RADIUS_MEDIUM}px`,
    '--size-radius-large': `${TOKENS.sizes.RADIUS_LARGE}px`,

    // Font sizes
    '--size-font-small': `${TOKENS.sizes.FONT_SIZE_SMALL}px`,
    '--size-font-medium': `${TOKENS.sizes.FONT_SIZE_MEDIUM}px`,
    '--size-font-large': `${TOKENS.sizes.FONT_SIZE_LARGE}px`,
    '--size-font-xlarge': `${TOKENS.sizes.FONT_SIZE_XLARGE}px`,

    // Other sizes
    '--size-outline-offset': `${TOKENS.sizes.OUTLINE_OFFSET}px`,
    '--size-hover-translate': `${TOKENS.sizes.HOVER_TRANSLATE}px`,
    '--size-line-height-tight': TOKENS.sizes.LINE_HEIGHT_TIGHT,
} as const;