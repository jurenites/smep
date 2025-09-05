import React from 'react';
import { FontProvider } from './ui/components/Providers/FontProvider';
import { ScreenPlayground } from './ui/screens/ScreenPlayground';

function App() {
    return (
        <FontProvider>
            <div className="app-root">
                <ScreenPlayground />
            </div>
        </FontProvider>
    );
}

export default App; 