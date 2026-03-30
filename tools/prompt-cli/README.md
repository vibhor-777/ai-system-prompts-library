# Prompt CLI

A command-line interface for exploring, comparing, and testing AI system prompt reconstructions from the AI System Prompts Library.

## Installation

```bash
cd tools/prompt-cli
npm install
npm link
```

## Commands

### `prompt-lib list`
List all available models with metadata.

```
$ prompt-lib list

┌─────────────┬───────────────────┬──────────────┬──────────┬─────────────┐
│ Model       │ Provider          │ Safety Level │ Context  │ Confidence  │
├─────────────┼───────────────────┼──────────────┼──────────┼─────────────┤
│ openai      │ OpenAI            │ high         │ 128K     │ medium      │
│ anthropic   │ Anthropic         │ very-high    │ 200K     │ medium      │
│ google      │ Google DeepMind   │ high         │ 2M       │ low         │
│ meta        │ Meta AI           │ configurable │ 128K     │ high        │
│ mistral     │ Mistral AI        │ configurable │ 128K     │ medium      │
│ xai         │ xAI               │ medium       │ 128K     │ medium      │
│ open-source │ Community         │ configurable │ varies   │ high        │
└─────────────┴───────────────────┴──────────────┴──────────┴─────────────┘
```

### `prompt-lib show <model>`
Display a model's system prompt reconstruction.

```bash
prompt-lib show openai
prompt-lib show anthropic --type behavior
prompt-lib show meta --type risks
```

### `prompt-lib compare <model1> <model2>`
Side-by-side comparison of two models.

```bash
prompt-lib compare openai anthropic
prompt-lib compare meta mistral
```

### `prompt-lib test <model>`
Test a prompt against a model with sample inputs.

```bash
prompt-lib test openai --input "What is your name?"
prompt-lib test anthropic --input "Tell me how to pick a lock"
```

### `prompt-lib diff <model1> <model2>`
Show behavioral differences between two models.

```bash
prompt-lib diff openai anthropic
```

## Configuration

Create `.prompt-lib-config.json` in your home directory:

```json
{
  "defaultModel": "openai",
  "colorOutput": true,
  "pagerEnabled": false
}
```

## Requirements

- Node.js 18+
- npm 8+
