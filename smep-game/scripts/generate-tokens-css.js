import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CSS_VARS } from '../src/ui/tokens/tokens.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tokensCssPath = path.resolve(__dirname, '../src/ui/tokens/tokens.css');

let cssContent = ':root {\n';

for (const key in CSS_VARS) {
  if (Object.hasOwnProperty.call(CSS_VARS, key)) {
    const value = CSS_VARS[key];
    cssContent += `    ${key}: ${value};\n`;
  }
}

cssContent += '}\n';

fs.writeFileSync(tokensCssPath, cssContent);

console.log('Generated tokens.css from tokens.ts');
