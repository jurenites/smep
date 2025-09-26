// TODO review this file probably no longer needed.
import { useState, useEffect, useCallback } from 'react';

interface FontStatus {
    loaded: boolean;
    error: string | null;
    loading: boolean;
}

interface FontConfig {
    name: string;
    url: string;
    format: 'woff' | 'woff2' | 'truetype' | 'opentype';
    weight?: string;
    style?: string;
}

export function useFontLoader(fonts: FontConfig[]) {
    const [fontStatuses, setFontStatuses] = useState<Record<string, FontStatus>>({});
    const [allFontsLoaded, setAllFontsLoaded] = useState(false);

    const loadFont = useCallback(async (font: FontConfig): Promise<FontStatus> => {
        try {
            // console.log(`Loading font: ${font.name} from ${font.url}`);

            // Check if font is already loaded
            if (document.fonts.check(`12px "${font.name}"`)) {
                // console.log(`Font ${font.name} already loaded`);
                return { loaded: true, error: null, loading: false };
            }

            // Create and load the font
            const fontFace = new FontFace(font.name, `url(${font.url}) format('${font.format}')`);
            //console.log(`Created FontFace for ${font.name}, loading...`);
            await fontFace.load();
            //console.log(`FontFace loaded for ${font.name}`);

            // Add to document fonts
            document.fonts.add(fontFace);
            //console.log(`Added ${font.name} to document.fonts`);

            // Wait for fonts to be ready
            await document.fonts.ready;
            //console.log(`Document fonts ready`);

            // Verify the font is actually available
            const isAvailable = document.fonts.check(`12px "${font.name}"`);
            // console.log(`Font ${font.name} available check:`, isAvailable);

            if (isAvailable) {
                //console.log(`Font ${font.name} successfully loaded and available`);
                return { loaded: true, error: null, loading: false };
            } else {
                //console.log(`Font ${font.name} loaded but not available for use`);
                return { loaded: false, error: 'Font loaded but not available for use', loading: false };
            }
        } catch (error) {
            console.error(`Error loading font ${font.name}:`, error);
            return {
                loaded: false,
                error: error instanceof Error ? error.message : String(error),
                loading: false
            };
        }
    }, []);

    const loadAllFonts = useCallback(async () => {
        const results: Record<string, FontStatus> = {};

        // Set all fonts to loading state
        fonts.forEach(font => {
            results[font.name] = { loaded: false, error: null, loading: true };
        });
        setFontStatuses(results);

        // Load fonts in parallel
        const fontPromises = fonts.map(async (font) => {
            const status = await loadFont(font);
            return { name: font.name, status };
        });

        const fontResults = await Promise.all(fontPromises);

        // Update statuses
        const newStatuses = { ...results };
        fontResults.forEach(({ name, status }) => {
            newStatuses[name] = status;
        });

        setFontStatuses(newStatuses);

        // Check if all fonts are loaded
        const allLoaded = Object.values(newStatuses).every(status => status.loaded);
        setAllFontsLoaded(allLoaded);
    }, [fonts, loadFont]);

    useEffect(() => {
        loadAllFonts();
    }, [loadAllFonts]);

    const getFontFamily = useCallback((fontName: string, fallbacks: string[] = ['monospace']) => {
        const status = fontStatuses[fontName];
        if (status?.loaded) {
            return `${fontName}, ${fallbacks.join(', ')}`;
        }
        return fallbacks.join(', ');
    }, [fontStatuses]);

    const reloadFont = useCallback(async (fontName: string) => {
        const font = fonts.find(f => f.name === fontName);
        if (font) {
            const status = await loadFont(font);
            setFontStatuses(prev => ({
                ...prev,
                [fontName]: status
            }));
        }
    }, [fonts, loadFont]);

    return {
        fontStatuses,
        allFontsLoaded,
        getFontFamily,
        reloadFont,
        loadAllFonts
    };
}
