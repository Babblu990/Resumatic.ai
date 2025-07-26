# Resumatic.ai - AI Resume Builder

This is a Next.js application for building and improving resumes with the power of AI.

## Features

- **AI Resume Improver**: Get suggestions on how to improve your resume based on a job description.
- **AI Content Tools**: Summarize documents and rewrite resume sections to be more impactful.
- **Structured Editor**: Edit your resume in a structured format with a live preview.
- **Export Options**: Export your final resume to various formats.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Firebase Setup (Backend)

This project is intended to be used with Firebase for backend services like Authentication and Firestore database.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Setup Instructions

1.  **Install Firebase CLI** if you haven't already:
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to your Firebase account**:
    ```bash
    firebase login
    ```

3.  **Initialize Firebase in your project directory**:
    From the root of this project, run:
    ```bash
    firebase init
    ```

4.  **When prompted, choose**:
    - Firestore Database
    - Authentication
    - Hosting
    - Emulators (for local testing)

5.  **Configure Firebase**:
    - **Firestore**: You can start in test mode for development.
    - **Authentication**: Follow the prompts to set up authentication.
    - **Hosting**: Set the public directory as `out`. When asked to configure as a single-page app, say **No**. This project uses Next.js static export.

6.  **Start local emulators** (optional, for local testing):
    ```bash
    firebase emulators:start
    ```

7.  **Deploy to Firebase Hosting**:
    First, build the application for production:
    ```bash
    npm run build
    ```
    Then, deploy to Firebase:
    ```bash
    firebase deploy
    ```
