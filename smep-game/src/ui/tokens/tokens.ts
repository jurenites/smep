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
} as const; 
