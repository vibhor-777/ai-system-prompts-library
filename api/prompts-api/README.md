# Prompts REST API

A REST API server for the AI System Prompts Library, exposing all prompt reconstructions over HTTP.

## Quick Start

```bash
cd api/prompts-api
npm install
npm start

# Server starts at http://localhost:3000
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prompts` | List all models with metadata |
| GET | `/api/prompts/:model` | Get full metadata for a model |
| GET | `/api/prompts/:model/system_prompt` | Get system prompt reconstruction |
| GET | `/api/prompts/:model/behavior` | Get behavioral analysis |
| GET | `/api/prompts/:model/examples` | Get interaction examples |
| GET | `/api/prompts/:model/risks` | Get risk analysis |
| GET | `/api/compare` | Compare two models (query params: `m1`, `m2`) |
| GET | `/api/search` | Search across prompts (query param: `q`) |
| GET | `/health` | Health check |

## Examples

```bash
# List all models
curl http://localhost:3000/api/prompts

# Get OpenAI metadata
curl http://localhost:3000/api/prompts/openai

# Get Claude system prompt
curl http://localhost:3000/api/prompts/anthropic/system_prompt

# Compare two models
curl "http://localhost:3000/api/compare?m1=openai&m2=anthropic"

# Search for prompts
curl "http://localhost:3000/api/search?q=constitutional+ai"
```

## Response Format

All endpoints return JSON:

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-06-01T00:00:00.000Z"
}
```

Errors:

```json
{
  "success": false,
  "error": "Model not found: xyz",
  "timestamp": "2024-06-01T00:00:00.000Z"
}
```

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `PORT` | `3000` | Server port |
| `HOST` | `0.0.0.0` | Server host |
| `CORS_ORIGIN` | `*` | CORS allowed origins |
| `RATE_LIMIT_WINDOW` | `900000` | Rate limit window (ms) |
| `RATE_LIMIT_MAX` | `100` | Max requests per window |
