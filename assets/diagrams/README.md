# 📊 Diagrams

This directory contains architecture diagrams and visual assets for the AI System Prompts Library.

## Contents

| File | Description |
|------|-------------|
| `prompt-flow.png` | System prompt processing flow diagram |
| `alignment-layers.png` | AI alignment layer architecture |
| `model-architecture.png` | LLM architecture overview |
| `jailbreak-taxonomy.png` | Jailbreak attack taxonomy tree |

## Generating Diagrams

Most diagrams in this repository are defined as Mermaid.js code blocks in the README. To export them as images:

```bash
# Install mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Export a diagram
mmdc -i diagram.mmd -o assets/diagrams/output.png
```

## File Format Guidelines

- Use **SVG** for diagrams that need to scale
- Use **PNG** (2x resolution) for raster diagrams
- Export at minimum 1920px wide for landscape diagrams
- Use transparent backgrounds where possible
