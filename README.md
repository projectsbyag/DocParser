# DocuParse

DocuParse is an interactive document automation service that turns unstructured text from invoices, receipts, and resumes into structured records. It combines a React workbench with an Express API and Gemini structured outputs so users can inspect extracted fields and reuse the resulting JSON in downstream workflows.

## Features

- Interactive overview of the document-processing workflow
- Test console for pasting custom document text
- Built-in invoice and resume examples
- Structured extraction for invoices, resumes, and custom document schemas
- Human-readable summaries and database-ready JSON output
- Health and service information endpoints for deployment monitoring

## Tech stack

- React 19 and TypeScript
- Vite with Tailwind CSS
- Express and `tsx` for the application server
- Google Gemini API for document extraction
- Motion and Lucide React for interface interactions and icons

## Getting started

### Prerequisites

- Node.js 20 or newer
- Bun, or an npm-compatible package manager
- A Gemini API key for live extraction

### Install and configure

```bash
bun install
cp .env.example .env
```

Set `GEMINI_API_KEY` in `.env`. The server also accepts `APP_URL` when the application is deployed behind a public URL.

### Run locally

```bash
bun run dev
```

The development server starts on port `3000` by default. Set `PORT` to use another port.

To create a production build:

```bash
bun run build
```

## API

### `POST /api/parse-document`

Parse document text by sending a JSON body containing `documentType` (`invoice`, `resume`, or `custom`) and `content`. The response contains the extracted structured data and processing metadata.

### `GET /api/healthz`

Returns service health, uptime, and runtime memory information for liveness and readiness checks.

### `GET /api/info`

Returns service version, supported document types, configured model, and infrastructure details.

## Project structure

- `src/components/` - interface sections and the interactive workbench
- `src/data/` - sample documents and supporting content
- `server.ts` - Express server and document parsing API
- `src/App.tsx` - application layout and view navigation
