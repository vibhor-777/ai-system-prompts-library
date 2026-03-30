# Diff Engine

A tool for computing semantic and textual differences between AI system prompt reconstructions.

## Usage

```bash
node diff.js openai anthropic
node diff.js meta mistral --type behavior
node diff.js --all  # Compare all pairs
```

## Features

- Word-level diff with highlighting
- Section-by-section comparison
- Semantic similarity scoring
- JSON output option

## Requirements

- Node.js 18+
