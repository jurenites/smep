const fs = require('fs');
const path = require('path');
const { CSS_VARS } = require('../src/ui/tokens/tokens');

const tokensCssPath = path.resolve(__dirname, '../src/ui/tokens/tokens.css');

let cssContent = ':root {
';

for (const key in CSS_VARS) {
  if (Object.hasOwnProperty.call(CSS_VARS, key)) {
    const value = CSS_VARS[key];
    cssContent += `    ${key}: ${value};
`;
  }
}

cssContent += '}\n';

fs.writeFileSync(tokensCssPath, cssContent);

console.log('Generated tokens.css from tokens.ts');
