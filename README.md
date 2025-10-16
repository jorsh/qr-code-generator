# QR Code Generator

## Project Overview

QR Code Generator is a React-based web application that generates QR codes for URLs, text, and contact information (vCard format). The application supports internationalization (i18n) with English and Spanish translations and uses Vite as the build tool.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with hot module replacement (HMR)
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm test` - Run Jest test suite
- `npm run lint` - Run ESLint on all files

## Architecture

### QR Code Generation Strategy
The application uses a **fallback chain** for QR code generation to ensure reliability:

1. **Primary**: QRious library (loaded via CDN) - Generates QR codes using canvas element
2. **Fallback 1**: Google Charts API - Used if QRious fails to load
3. **Fallback 2**: QR Server API - Used if Google Charts API fails

This is implemented in `QRCodeGenerator.jsx:25-106` through three functions:
- `generateQRCode()` - Orchestrates loading and generation
- `createQR()` - Uses QRious library with canvas
- `generateFallbackQR()` - Creates img element with external APIs

### Internationalization (i18n)
The app implements a custom translation system without external libraries:

- **Translation Storage**: `src/constants/translations.js` - Object containing all translations keyed by locale
- **Translation Hook**: `src/hooks/useTranslations.js` - Custom hook that:
  - Detects locale from build-time variable `{{APP_LOCALE}}` or browser settings
  - Falls back to language prefix matching (e.g., `es-MX` → `es-ES`)
  - Defaults to `en-US` if no match found
  - Returns `t()` function for key-based translation lookup

Supported locales: `en-US`, `es-ES`

### Component Structure
- **Main App**: `App.jsx` - Minimal wrapper that renders QRCodeGenerator
- **Core Component**: `QRCodeGenerator.jsx` - Handles all UI, state management, and QR generation
  - Tab-based interface for URL, Text, and Contact modes
  - Form state management for each tab type
  - QR code generation with dynamic ref manipulation
  - Download and copy-to-clipboard functionality

### State Management
All state is managed with React hooks (no external state management):
- `activeTab` - Current tab selection (url/text/contact)
- `qrData` - Final encoded data for QR code generation
- `urlInput`, `textInput`, `contactInfo` - Form state for each tab
- `copied` - Temporary state for copy feedback

### Styling
- **Tailwind CSS**: Loaded via CDN in `index.html:8`
- No custom CSS compilation required
- Utility-first approach with inline classes
- Gradient theme (purple to blue)

## Testing

### Test Configuration
- **Framework**: Jest with jsdom environment
- **Testing Library**: React Testing Library
- **Setup**: `jest-setup.js` imports `@testing-library/jest-dom`
- **Location**: Tests in `tests/` directory

### Running Tests
- Run all tests: `npm test`
- Tests use `.jsx` extension and are located in `tests/` directory

## Build System

### Vite Configuration
- Plugin: `@vitejs/plugin-react` for React Fast Refresh
- Default Vite configuration with minimal customization
- Build output: `dist/` directory (gitignored)

## Code Quality

### ESLint
- Flat config format (`eslint.config.js`)
- Extends: `@eslint/js` recommended, React hooks recommended, React Refresh for Vite
- Custom rule: Allows unused variables matching `^[A-Z_]` pattern (useful for React components)
- Ignores: `dist/` directory

## Key Implementation Details

### VCard Generation
Contact information is formatted as vCard 3.0 in `generateVCard()` function (`QRCodeGenerator.jsx:118-129`). All contact fields are included in the vCard even if empty.

### URL Formatting
URLs are auto-prefixed with `https://` if no protocol is specified (see `formatUrl()` in `QRCodeGenerator.jsx:108-116`).

### Dynamic Script Loading
QRious library is loaded dynamically on first QR code generation to avoid blocking initial page load. Script tag is added to document head with onload callback.

### Canvas vs Image Elements
- Canvas element used when QRious library is available (allows direct download)
- Image element used for fallback APIs
- Both support download functionality with different implementations

## Adding New Features

### Adding a New Translation Locale
1. Add locale object to `TRANSLATIONS` in `src/constants/translations.js`
2. Include all translation keys (copy from existing locale)
3. Hook will automatically detect and use new locale based on browser settings

### Adding a New QR Code Type
1. Add new tab to `tabs` array in `QRCodeGenerator.jsx:204-208`
2. Add state for new input type
3. Add form UI in the tab content area (around line 250)
4. Add case in `useEffect` to handle data formatting (around line 134)

### Testing New Components
- Place test files in `tests/` directory with `.test.jsx` extension
- Import component from `src/` directory
- Use React Testing Library utilities (`render`, `screen`, etc.)
