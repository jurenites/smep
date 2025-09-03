export const TOKENS = {
    colors: {
        PRIMARY: "#F8E71C", // #yolk
        SECONDARY: "#4C00FF", // #ultraviolet
        WHITE: "#FFFFFF", // #white
        LIGHT_GRAY: "#C0C0C0", // #lightgray
        GRAY: "#666666", // #gray
        DARK_GRAY: "#232323", // #darkgray
        BLACK: "#000000", // #black
    },
    fonts: {
        TITLE: "Urbanist, sans-serif",
        BODY: "Roundabout-Regular, Sulphur Point, sans-serif",
        DIGIT: "4pixel, monospace",
        CODE: "'Courier New', monospace",
    },
    sizes: {
        DOT_1: 1,
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
    },
} as const;

// CSS Variables for global use
export const CSS_VARS = {
    '--color-primary': TOKENS.colors.PRIMARY,
    '--color-secondary': TOKENS.colors.SECONDARY,
    '--color-white': TOKENS.colors.WHITE,
    '--color-light-gray': TOKENS.colors.LIGHT_GRAY,
    '--color-gray': TOKENS.colors.GRAY,
    '--color-dark-gray': TOKENS.colors.DARK_GRAY,
    '--color-black': TOKENS.colors.BLACK,
    '--font-title': TOKENS.fonts.TITLE,
    '--font-body': TOKENS.fonts.BODY,
    '--font-digit': TOKENS.fonts.DIGIT,
    '--font-code': TOKENS.fonts.CODE,
} as const; 