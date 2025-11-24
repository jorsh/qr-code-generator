# Gemini Context: QR Code Generator

## Project Overview
QR Code Generator is a React-based web application designed to create QR codes for URLs, text, and contact information (vCard). It features a clean UI styled with Tailwind CSS and supports English and Spanish via a custom internationalization system.

## Tech Stack
- **Frontend Framework:** React (v19)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (loaded via CDN)
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint (Flat Config)
- **QR Libraries:** QRious (Primary, CDN), Google Charts API (Fallback), QR Server API (Secondary Fallback)

## Key Commands
| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the development server with HMR. |
| `npm run build` | Build the application for production (`dist/`). |
| `npm run preview` | Preview the production build locally. |
| `npm test` | Run the Jest test suite. |
| `npm run lint` | Run ESLint to check code quality. |

## Architecture & Core Concepts

### Component Structure
- **`src/App.jsx`**: Entry point wrapper.
- **`src/components/QRCodeGenerator.jsx`**: The core component containing all logic, UI, and state. It handles:
    - Tab switching (URL, Text, Contact).
    - Form input management.
    - QR code generation logic.
    - Download and Copy-to-Clipboard features.

### QR Code Generation Strategy
The app ensures reliability through a fallback mechanism:
1.  **Primary:** Uses the **QRious** library (loaded dynamically via CDN) to render on a `<canvas>`.
2.  **Fallback 1:** **Google Charts API** (if QRious fails).
3.  **Fallback 2:** **QR Server API** (if Google Charts fails).

### Internationalization (i18n)
- **Storage:** Translations are stored in `src/constants/translations.js`.
- **Logic:** `src/hooks/useTranslations.js` detects the locale (defaulting to `en-US`) and provides a `t()` helper.
- **Supported Locales:** `en-US`, `es-ES`.

### Styling
- **Tailwind CSS:** Integrated via a CDN link in `index.html`.
- **Conventions:** Utility-first, inline class names. No external CSS compilation step for Tailwind.

## Development Conventions

### Testing
- **Location:** Tests are located in the `tests/` directory.
- **Naming:** Files should end with `.test.jsx`.
- **Tools:** Jest with `jsdom` environment.

### Code Quality
- **Linting:** ESLint is configured with `eslint.config.js`.
- **Rules:** Standard React hooks and refresh rules. Unused variables matching `^[A-Z_]` are allowed.

### Implementation Specifics
- **Dynamic Loading:** The QRious script is injected into the `<head>` only when needed.
- **vCard:** Contact info is formatted as vCard 3.0.
- **URL Handling:** URLs are automatically prefixed with `https://` if missing.
