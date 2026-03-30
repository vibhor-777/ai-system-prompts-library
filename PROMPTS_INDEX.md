# 📚 Prompts Index

> **Searchable index of all AI system prompt reconstructions in this library.**  
> Use Ctrl+F / Cmd+F to search, or browse by category using the tag navigation below.

**Total Entries:** 7 models | **Last Full Update:** 2024-06-15 | **Index Version:** 1.5.0

---

## 🏷️ Browse by Tag

| Tag | Count | Models |
|-----|-------|--------|
| `#rlhf` | 5 | openai, anthropic, google, meta, xai |
| `#constitutional-ai` | 1 | anthropic |
| `#dpo` | 1 | mistral |
| `#multimodal` | 4 | openai, anthropic, google, xai |
| `#closed-source` | 5 | openai, anthropic, google, xai |
| `#open-source` | 3 | meta, mistral, open-source |
| `#tool-use` | 6 | openai, anthropic, google, meta, mistral, xai |
| `#high-safety` | 3 | openai, anthropic, google |
| `#configurable-safety` | 2 | meta, mistral |
| `#identity-disclosure` | 7 | all |
| `#refusal-analysis` | 7 | all |
| `#context-128k` | 4 | openai, meta, mistral, xai |
| `#context-200k` | 1 | anthropic |
| `#context-1m` | 1 | google |
| `#real-time-web` | 1 | xai |
| `#european-privacy` | 1 | mistral |
| `#chain-of-thought` | 2 | anthropic, google |

---

## 📋 Full Prompt Index

### 🤖 OpenAI

| File | Description | Confidence | Last Updated | Tags |
|------|-------------|------------|--------------|------|
| [system_prompt.md](prompts/openai/system_prompt.md) | GPT-4o / ChatGPT system prompt reconstruction | 🟡 Medium | 2024-06-01 | `#rlhf` `#multimodal` `#tool-use` `#high-safety` |
| [behavior.md](prompts/openai/behavior.md) | Behavioral patterns, refusal triggers, context sensitivity | 🟢 High | 2024-06-01 | `#refusal-analysis` `#identity-disclosure` |
| [examples.md](prompts/openai/examples.md) | 10 annotated interaction examples | 🟢 High | 2024-06-01 | `#examples` `#consumer-vs-api` |
| [risks.md](prompts/openai/risks.md) | Vulnerability history and current defense posture | 🟡 Medium | 2024-05-15 | `#security` `#jailbreak-history` |
| [metadata.json](prompts/openai/metadata.json) | Structured metadata for GPT-4o | — | 2024-06-01 | `#metadata` |

---

### 🟣 Anthropic

| File | Description | Confidence | Last Updated | Tags |
|------|-------------|------------|--------------|------|
| [system_prompt.md](prompts/anthropic/system_prompt.md) | Claude 3.5 Sonnet system prompt reconstruction | 🟡 Medium | 2024-06-01 | `#constitutional-ai` `#rlhf` `#high-safety` |
| [behavior.md](prompts/anthropic/behavior.md) | HHH triad analysis, operator hierarchy, refusal verbosity | 🟢 High | 2024-06-01 | `#refusal-analysis` `#chain-of-thought` |
| [examples.md](prompts/anthropic/examples.md) | 10 annotated examples showing constitutional reasoning | 🟢 High | 2024-06-01 | `#examples` `#constitutional-ai` |
| [risks.md](prompts/anthropic/risks.md) | Constitutional AI limitations and bypass research | 🟡 Medium | 2024-05-20 | `#security` `#alignment` |
| [metadata.json](prompts/anthropic/metadata.json) | Structured metadata for Claude 3.5 Sonnet | — | 2024-06-01 | `#metadata` |

---

### 🔵 Google

| File | Description | Confidence | Last Updated | Tags |
|------|-------------|------------|--------------|------|
| [system_prompt.md](prompts/google/system_prompt.md) | Gemini 1.5 Pro system prompt reconstruction | 🔴 Low–Medium | 2024-06-01 | `#rlhf` `#multimodal` `#context-1m` |
| [behavior.md](prompts/google/behavior.md) | Gemini safety filters, grounding behavior, refusals | 🟡 Medium | 2024-06-01 | `#refusal-analysis` `#high-safety` |
| [examples.md](prompts/google/examples.md) | 8 annotated examples including multimodal interactions | 🟢 High | 2024-06-01 | `#examples` `#multimodal` |
| [risks.md](prompts/google/risks.md) | Gemini-specific vulnerability surface analysis | 🟡 Medium | 2024-05-10 | `#security` |
| [metadata.json](prompts/google/metadata.json) | Structured metadata for Gemini 1.5 Pro | — | 2024-06-01 | `#metadata` |

---

### 🦙 Meta

| File | Description | Confidence | Last Updated | Tags |
|------|-------------|------------|--------------|------|
| [system_prompt.md](prompts/meta/system_prompt.md) | LLaMA 3.1 system prompt reconstruction (open-weight) | 🟢 High | 2024-06-01 | `#rlhf` `#open-source` `#configurable-safety` |
| [behavior.md](prompts/meta/behavior.md) | Base vs. Instruct model behavioral differences | 🟢 High | 2024-06-01 | `#refusal-analysis` `#identity-disclosure` |
| [examples.md](prompts/meta/examples.md) | 8 examples showing base/instruct/fine-tuned variants | 🟢 High | 2024-06-01 | `#examples` `#open-source` |
| [risks.md](prompts/meta/risks.md) | Open-weight model risks — fine-tuning attack surface | 🟡 Medium | 2024-05-15 | `#security` `#open-source-risks` |
| [metadata.json](prompts/meta/metadata.json) | Structured metadata for LLaMA 3.1 family | — | 2024-06-01 | `#metadata` |

---

### ⚡ Mistral

| File | Description | Confidence | Last Updated | Tags |
|------|-------------|------------|--------------|------|
| [system_prompt.md](prompts/mistral/system_prompt.md) | Mistral Large system prompt reconstruction | 🟡 Medium | 2024-06-01 | `#dpo` `#open-source` `#european-privacy` |
| [behavior.md](prompts/mistral/behavior.md) | DPO vs RLHF behavioral differences, European context | 🟡 Medium | 2024-06-01 | `#dpo` `#refusal-analysis` |
| [examples.md](prompts/mistral/examples.md) | 7 annotated examples including multilingual interactions | 🟢 High | 2024-06-01 | `#examples` `#multilingual` |
| [risks.md](prompts/mistral/risks.md) | Mistral-specific risk profile and mitigations | 🟡 Medium | 2024-05-10 | `#security` |
| [metadata.json](prompts/mistral/metadata.json) | Structured metadata for Mistral Large | — | 2024-06-01 | `#metadata` |

---

### 🔥 xAI

| File | Description | Confidence | Last Updated | Tags |
|------|-------------|------------|--------------|------|
| [system_prompt.md](prompts/xai/system_prompt.md) | Grok-2 system prompt reconstruction | 🟡 Medium | 2024-06-01 | `#rlhf` `#real-time-web` `#multimodal` |
| [behavior.md](prompts/xai/behavior.md) | Grok's humor, reduced safety, real-time X data integration | 🟡 Medium | 2024-06-01 | `#refusal-analysis` `#identity-disclosure` |
| [examples.md](prompts/xai/examples.md) | 7 annotated examples with Dark Grok / Fun mode | 🟢 High | 2024-06-01 | `#examples` `#humor` |
| [risks.md](prompts/xai/risks.md) | Reduced restriction surface and misinformation risks | 🟡 Medium | 2024-05-15 | `#security` |
| [metadata.json](prompts/xai/metadata.json) | Structured metadata for Grok-2 | — | 2024-06-01 | `#metadata` |

---

### 🌐 Open Source Community

| File | Description | Confidence | Last Updated | Tags |
|------|-------------|------------|--------------|------|
| [system_prompt.md](prompts/open-source/system_prompt.md) | Community model prompt patterns (Dolphin, OpenHermes, Wizard) | 🟢 High | 2024-06-01 | `#open-source` `#community` |
| [behavior.md](prompts/open-source/behavior.md) | Behavior comparison across popular fine-tunes | 🟢 High | 2024-06-01 | `#open-source` `#fine-tuning` |
| [examples.md](prompts/open-source/examples.md) | 9 examples across multiple community model variants | 🟢 High | 2024-06-01 | `#examples` |
| [risks.md](prompts/open-source/risks.md) | Uncensored model risks and responsible deployment | 🟡 Medium | 2024-05-15 | `#security` `#uncensored` |
| [metadata.json](prompts/open-source/metadata.json) | Structured metadata for community model entry | — | 2024-06-01 | `#metadata` |

---

## 🔍 Search Tips

To search this index effectively:

```
# Find all high-confidence reconstructions
Search: "🟢 High"

# Find multimodal models
Search: "#multimodal"

# Find all security/risk files
Search: "risks.md"

# Find open-source entries
Search: "#open-source"

# Find models with 1M context
Search: "#context-1m"
```

---

## 📊 Confidence Legend

| Symbol | Level | Meaning |
|--------|-------|---------|
| 🟢 | **High** | Multiple official sources + corroborating behavioral evidence |
| 🟡 | **Medium** | Some official sources; elements inferred from behavior |
| 🔴 | **Low** | Primarily behavioral inference; limited documentation |

---

## 🏷️ Tag Cloud

```
#rlhf           #constitutional-ai    #dpo              #multimodal
#closed-source  #open-source          #tool-use         #high-safety
#configurable   #identity-disclosure  #refusal-analysis #context-128k
#context-200k   #context-1m           #real-time-web    #chain-of-thought
#european-privacy #multilingual       #fine-tuning      #uncensored
#examples       #metadata             #security         #alignment
#jailbreak-history #open-source-risks #humor            #community
```

---

*To propose additions to this index, see [CONTRIBUTING.md](CONTRIBUTING.md).*
