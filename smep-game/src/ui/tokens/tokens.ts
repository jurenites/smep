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
    fonts: {
        TITLE: "Roundabout-Regular, Urbanist, sans-serif",
        BODY: "Roundabout-Regular, Sulphur Point, sans-serif",
        DIGIT: "4pixel, monospace",
        CODE: "'Courier New', monospace",
    },
    fontSizes: {
        small: 5, // for 4Pixel font the size is 5, yeah i know its funny.
        medium: 10, // double 4Pixel size
        large: 16, // Roudnabout size for Capital letters, to bein 1 to 1 ratio on a screen, the lowercase letter is a 8px size.
        mediumLarge: 14, // New token
    },
    fontWeights: {
        light: 300,
        regular: 400,
        bold: 700,
    },
    sizes: {
        DOT_1: 1, // 1px
        CIRCLE_4: 4,
        CIRCLE_6: 6,
        CIRCLE_61: 61,
        MINI_CARD: 31,
        MINI_PAGINATOR: 4,
        MINI_PAGINATOR_GAP: 16,
        BIG_PAGINATOR_W: 4,
        BIG_PAGINATOR_H: 17,
        BIG_PAGINATOR_GAP: 6,
        MID_CARD_W: 83,
        MID_CARD_H: 109,
        TAB_W: 109,
        TAB_H: 23,
        BLUR_PLAYGROUND: 16,
        STROKE: 1,
        HUD_PADDING: 20, // New token
    },
    zIndexes: {
        hud: 10,
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
    '--color-ulatraviolet': TOKENS.colors.ultraviolet,
    '--color-white': TOKENS.colors.white,
    '--color-light-gray': TOKENS.colors.lightgray,
    '--color-gray': TOKENS.colors.gray,
    '--color-dark-gray': TOKENS.colors.darkgray,
    '--color-black': TOKENS.colors.black,
    '--font-title': TOKENS.fonts.TITLE,
    '--font-body': TOKENS.fonts.BODY,
    '--font-digit': TOKENS.fonts.DIGIT,
    '--font-code': TOKENS.fonts.CODE,
    '--font-size-small': `${TOKENS.fontSizes.small}px`,
    '--font-size-medium': `${TOKENS.fontSizes.medium}px`,
    '--font-size-large': `${TOKENS.fontSizes.large}px`,
    '--font-size-medium-large': `${TOKENS.fontSizes.mediumLarge}px`,
    '--font-weight-light': TOKENS.fontWeights.light,
    '--font-weight-regular': TOKENS.fontWeights.regular,
    '--font-weight-bold': TOKENS.fontWeights.bold,
    '--size-hud-padding': `${TOKENS.sizes.HUD_PADDING}px`,
    '--z-index-hud': TOKENS.zIndexes.hud,
    '--size-dot-1': `${TOKENS.sizes.DOT_1}px`,
    '--size-circle-4': `${TOKENS.sizes.CIRCLE_4}px`,
    '--size-circle-6': `${TOKENS.sizes.CIRCLE_6}px`,
    '--size-circle-61': `${TOKENS.sizes.CIRCLE_61}px`,
    '--size-mini-card': `${TOKENS.sizes.MINI_CARD}px`,
    '--size-mini-paginator': `${TOKENS.sizes.MINI_PAGINATOR}px`,
    '--size-mini-paginator-gap': `${TOKENS.sizes.BIG_PAGINATOR_GAP}px`,
    '--size-big-paginator-w': `${TOKENS.sizes.BIG_PAGINATOR_W}px`,
    '--size-big-paginator-h': `${TOKENS.sizes.BIG_PAGINATOR_H}px`,
    '--size-big-paginator-gap': `${TOKENS.sizes.BIG_PAGINATOR_GAP}px`,
    '--size-mid-card-w': `${TOKENS.sizes.MID_CARD_W}px`,
    '--size-mid-card-h': `${TOKENS.sizes.MID_CARD_H}px`,
    '--size-tab-w': `${TOKENS.sizes.TAB_W}px`,
    '--size-tab-h': `${TOKENS.sizes.TAB_H}px`,
    '--size-blur-playground': `${TOKENS.sizes.BLUR_PLAYGROUND}px`,
    '--size-stroke': `${TOKENS.sizes.STROKE}px`,
} as const;