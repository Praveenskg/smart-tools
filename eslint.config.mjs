import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['src/app/image-tools/page.tsx'],
    rules: {
      'jsx-a11y/alt-text': 'off',
    },
  },
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'build/',
      'dist/',
      'public/sw.js',
      'public/sw.js.map',
      '*.tsbuildinfo',
      '.env*',
      '*.log',
      'coverage/',
      '.vscode/',
      '.idea/',
      '.DS_Store',
      'Thumbs.db',
      '*.tmp',
      '*.temp',
    ],
  },
];

export default eslintConfig;
