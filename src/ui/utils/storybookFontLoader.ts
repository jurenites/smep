/**
 * Shared font loading utility for Storybook
 * 
 * This utility ensures fonts are loaded explicitly and visible in the Network tab
 * for debugging purposes.
 */

/**
 * Loads the 4pixel font explicitly for Storybook
 * This will show network requests in the browser's Network tab
 * Even if the font is already loaded by CSS, this will force a visible network request
 */
export const load4PixelFont = async (): Promise<void> => {
    try {
        console.log('Forcing 4pixel font network request for Storybook debugging...');

        // Always create explicit network requests that will show in Network tab
        // This is for debugging purposes in Storybook
        const fontUrls = [
            '/assets/fonts/4pixel.woff',
            '/assets/fonts/4pixel.ttf'
        ];

        // Force network requests to be visible in Network tab
        for (const url of fontUrls) {
            try {
                console.log(`Fetching font from ${url}...`);
                const response = await fetch(url);
                if (response.ok) {
                    const fontData = await response.arrayBuffer();
                    console.log(`Successfully fetched font data from ${url} (${fontData.byteLength} bytes)`);

                    // Add the font to document.fonts
                    const fontFace = new FontFace('4pixel', fontData);
                    await fontFace.load();
                    document.fonts.add(fontFace);
                    console.log(`Successfully loaded 4pixel font from ${url}`);
                    break; // Use first successful font
                }
            } catch (fetchError) {
                console.warn(`Failed to fetch font from ${url}:`, fetchError);
            }
        }

        // Wait for fonts to be ready
        await document.fonts.ready;
        console.log('4pixel font loading completed');

    } catch (error) {
        console.error('Failed to load 4pixel font:', error);
    }
};

/**
 * Auto-loads the 4pixel font when the module is imported
 * Call this at the top of story files
 */
export const autoLoad4PixelFont = (): void => {
    load4PixelFont();
};
