import type { FontConfig } from '../hooks/useFontLoader';

export const FONT_CONFIGS: FontConfig[] = [
    {
        name: '4pixel',
        url: '/assets/fonts/4pixel.woff',
        format: 'woff',
        weight: 'normal',
        style: 'normal'
    },
    {
        name: 'Roundabout-Regular',
        url: '/assets/fonts/Roundabout-Regular.ttf',
        format: 'truetype',
        weight: 'normal',
        style: 'normal'
    },
    {
        name: 'Sulphur Point',
        url: '/assets/fonts/SulphurPoint-Light.ttf',
        format: 'truetype',
        weight: '300',
        style: 'normal'
    },
    {
        name: 'Urbanist',
        url: '/assets/fonts/Urbanist-ExtraLight.ttf',
        format: 'truetype',
        weight: '200',
        style: 'normal'
    }
];

// Font family presets for common use cases
export const FONT_PRESETS = {
    pixel: ['4pixel', 'monospace'],
    title: ['Roundabout-Regular', 'Urbanist', 'sans-serif'],
    body: ['Roundabout-Regular', 'Sulphur Point', 'sans-serif'],
    code: ['4pixel', 'Courier New', 'monospace']
} as const;
