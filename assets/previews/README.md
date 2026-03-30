# 👁️ Previews

This directory contains preview images and screenshots for the AI System Prompts Library tools and interfaces.

## Contents

| File | Description |
|------|-------------|
| `web-ui-preview.png` | Screenshot of the Web UI interface |
| `cli-preview.png` | Terminal screenshot of the CLI tool |
| `api-preview.png` | API response example screenshot |
| `comparison-preview.png` | Model comparison UI screenshot |

## Screenshot Guidelines

- Capture at **1440×900px** minimum resolution
- Use a clean, neutral terminal/browser theme
- Redact any personal API keys or tokens
- Compress with `pngquant` or similar before committing

```bash
# Optimize PNG before adding
pngquant --quality=80-95 --strip preview.png
```

## Contributing Previews

When adding a new tool or significant UI change, include a preview screenshot:

1. Take a screenshot of the working feature
2. Optimize the image
3. Add it here with a descriptive filename
4. Reference it in the relevant README
