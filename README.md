# Overview

**Data Room** is a secure, web-based file management application for organizing and managing PDF documents. The application supports Google sign-in and email/password registration.
Key features include drag-and-drop file uploads, folder creation, file/folder renaming and deletion, bulk downloads, and an integrated PDF previewer with page navigation.

**Authentication**: Clerk handles authentication (Google sign-in and email/password). The frontend uses Clerk React SDK to get JWT tokens, which are sent as Authorization: Bearer <token> headers. The backend uses Clerk Express middleware to validate tokens, extract the user ID, and attach it to requests for user-scoped operations.

**Frontend**: React + TypeScript app built with Vite. Uses Material UI, React Query for data fetching/caching, and React Router with protected routes. The main component is a file manager (@cubone/react-file-manager) that communicates with the backend API via authenticated REST calls.

**Backend**: Express.js REST API with Clerk middleware for authentication. File metadata is stored in-memory (lost on restart), there is no persistance layer, database support can be added later. Actual files are stored on disk in user-specific directories (/public/uploads/{userId}/). All files and folders are deleted when the application is initialized.

# Data Room Frontend

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

# Data Room Backend

see packages/backend
