/**
 * Font loading utility for SMEP game
 * Provides centralized font loading functionality for both main app and Storybook
 */

export interface FontLoadResult {
    success: boolean;
    fontFamily: string;
    error?: string;
}

/**
 * Loads a font using the FontFace API with fallback support
 * @param fontFamily - The font family name
 * @param fontUrl - The URL to the font file
 * @param format - The font format (woff, ttf, etc.)
 * @returns Promise<FontLoadResult>
 */
export async function loadFont(
    fontFamily: string, 
    fontUrl: string, 
    format: string = 'woff'
): Promise<FontLoadResult> {
    try {
        // Check if font is already loaded
        if (document.fonts.check(`16px "${fontFamily}"`)) {
            return { success: true, fontFamily };
        }

        // Create FontFace object
        const fontFace = new FontFace(fontFamily, `url(${fontUrl}) format("${format}")`);
        
        // Load the font
        const loadedFont = await fontFace.load();
        
        // Add to document fonts
        document.fonts.add(loadedFont);
        
        // Verify font is loaded
        await document.fonts.ready;
        
        return { success: true, fontFamily };
    } catch (error) {
        console.error(`Failed to load font ${fontFamily}:`, error);
        return { 
            success: false, 
            fontFamily, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        };
    }
}

/**
 * Loads the 4pixel font with multiple format fallbacks
 * @returns Promise<FontLoadResult>
 */
export async function load4PixelFont(): Promise<FontLoadResult> {
    const fontFormats = [
        { url: '/assets/fonts/4pixel.woff', format: 'woff' },
        { url: '/assets/fonts/4pixel.ttf', format: 'truetype' }
    ];

    for (const { url, format } of fontFormats) {
        const result = await loadFont('4pixel', url, format);
        if (result.success) {
            return result;
        }
    }

    return { 
        success: false, 
        fontFamily: '4pixel', 
        error: 'Failed to load 4pixel font with any available format' 
    };
}

/**
 * Loads all required fonts for the SMEP game
 * @returns Promise<FontLoadResult[]>
 */
export async function loadAllFonts(): Promise<FontLoadResult[]> {
    const fonts = [
        { family: 'Roundabout-Regular', url: '/assets/fonts/Roundabout-Regular.ttf', format: 'truetype' },
        { family: 'Sulphur Point', url: '/assets/fonts/SulphurPoint-Light.ttf', format: 'truetype' },
        { family: 'Urbanist', url: '/assets/fonts/Urbanist-ExtraLight.ttf', format: 'truetype' }
    ];

    const results: FontLoadResult[] = [];

    // Load 4pixel font first (most critical)
    const pixelResult = await load4PixelFont();
    results.push(pixelResult);

    // Load other fonts
    for (const font of fonts) {
        const result = await loadFont(font.family, font.url, font.format);
        results.push(result);
    }

    return results;
}

/**
 * Preloads fonts for better performance
 * This should be called early in the application lifecycle
 */
export function preloadFonts(): void {
    // Create link elements for preloading
    const fontUrls = [
        '/assets/fonts/4pixel.woff',
        '/assets/fonts/4pixel.ttf',
        '/assets/fonts/Roundabout-Regular.ttf',
        '/assets/fonts/SulphurPoint-Light.ttf',
        '/assets/fonts/Urbanist-ExtraLight.ttf'
    ];

    fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'font';
        link.type = 'font/woff';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}
