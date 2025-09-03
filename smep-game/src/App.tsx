import React from 'react';
import { ScreenPlayground } from './ui/screens/ScreenPlayground';
import { TOKENS } from './ui/tokens/tokens';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        background: TOKENS.colors.BLACK,
        fontFamily: TOKENS.fonts.BODY,
        color: TOKENS.colors.WHITE,
        overflow: 'hidden',
      }}
    >
      <ScreenPlayground />
    </div>
  );
}

export default App;
