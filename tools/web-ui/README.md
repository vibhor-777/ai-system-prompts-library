# Web UI

A React-based web interface for exploring AI system prompt reconstructions from the AI System Prompts Library. Features search, filtering, and model comparison.

## Features

- 🔍 Full-text search across all prompt content
- 🏷️ Filter by model, safety level, and tags
- 📊 Model comparison table
- 📋 Copy-to-clipboard for any prompt
- 🌙 Dark mode optimized for readability
- 📱 Responsive design

## Getting Started

```bash
cd tools/web-ui
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview  # Preview production build
```

## Tech Stack

- **React 18** with hooks
- **Vite** for build and dev server
- **React Router** for navigation
- **Zustand** for state management
