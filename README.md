# Data Room Frontend

## Overview

**Data Room** is a secure, web-based file management application for organizing and managing PDF documents. Built with React, TypeScript, and Material UI, it provides a file manager interface where authenticated users can upload, organize, preview, and download PDF files in a hierarchical folder structure. The application uses Clerk for authentication, supporting Google sign-in and email/password registration.

## Installation

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:

    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    VITE_API_URL=http://localhost:5000
    CLERK_SIGN_IN_FORCE_REDIRECT_URL=http://localhost:3000/
    CLERK_SIGN_IN_FORCE_REDIRECT_URL=http://localhost:3000/
    ```

3. **Start the development server**:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── DataRoomManager/ # Main file manager component
│   ├── Header/          # Application header
│   ├── PdfPreview/      # PDF preview component
│   └── ProtectedRoute/  # Route protection component
├── pages/               # Page components
│   └── Home/            # Home page
├── routes/              # Route configuration
│   └── AppRoute.tsx     # Main routing setup
├── services/            # API service functions
│   └── fetchService.ts  # HTTP request utilities
├── types/               # TypeScript type definitions
│   └── fileManager.ts   # File management types
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Tooling

### Development Tools

- **Vite**: Build tool and dev server
- **TypeScript**: Type-safe JavaScript
- **ESLint**: Code linting
- **Prettier**: Code formatting (automatic on save in VSCode)

### Libraries

- **React**
- **Vite**
- **Material UI**
- **Clerk**
- **React File Manager**

# Data Room Backend

see packages/backend
