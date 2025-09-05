import React, { createContext, useContext, ReactNode } from 'react';
import { useFontLoader } from '../../../lib/hooks/useFontLoader';
import { FONT_CONFIGS } from '../../../lib/config/fonts';

interface FontContextType {
    fontStatuses: Record<string, { loaded: boolean; error: string | null; loading: boolean }>;
    allFontsLoaded: boolean;
    getFontFamily: (fontName: string, fallbacks?: string[]) => string;
    reloadFont: (fontName: string) => Promise<void>;
}

const FontContext = createContext<FontContextType | null>(null);

interface FontProviderProps {
    children: ReactNode;
}

export function FontProvider({ children }: FontProviderProps) {
    const fontLoader = useFontLoader(FONT_CONFIGS);

    return (
        <FontContext.Provider value={fontLoader}>
            {children}
        </FontContext.Provider>
    );
}

export function useFonts() {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error('useFonts must be used within a FontProvider');
    }
    return context;
}
