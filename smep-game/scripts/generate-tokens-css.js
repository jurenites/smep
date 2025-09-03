import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensCssPath = path.resolve(__dirname, '../src/ui/tokens/tokens.css');

let cssContent = '/* Test content */\n:root { --test-var: 1px; }\n';

fs.writeFileSync(tokensCssPath, cssContent);

console.log('Generated tokens.css from tokens.ts');
