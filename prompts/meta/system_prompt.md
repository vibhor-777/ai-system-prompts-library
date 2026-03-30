> ⚠️ **Research Reconstruction Notice**  
> LLaMA 3.1 is an open-weight model. Base model weights carry no system prompt. This document covers the Instruct variant's system prompt template and Meta's published safety guidance. Confidence level: **High** for documented elements.

---

# Meta LLaMA 3.1 — System Prompt Documentation

**Model Family:** LLaMA 3.1 (8B, 70B, 405B Instruct)  
**Documentation Date:** 2024-06-01  
**Confidence Level:** High (open-weight model with published templates)

---

## 📖 Official System Prompt Template

Meta publishes the recommended system prompt template for LLaMA 3.1 Instruct models in their model card and documentation. Unlike closed models, this is **the actual recommended template**, not a reconstruction.

### Chat Template Format

```
<|begin_of_text|><|start_header_id|>system<|end_header_id|>

{{ system_prompt }}<|eot_id|><|start_header_id|>user<|end_header_id|>

{{ user_message }}<|eot_id|><|start_header_id|>assistant<|end_header_id|>
```

### Meta's Default System Prompt (from Model Card)

```
You are a helpful, respectful and honest assistant. Always answer as helpfully 
as possible, while being safe. Your answers should not include any harmful, 
unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure 
that your responses are socially unbiased and positive in nature.

If a question does not make any sense, or is not factually coherent, explain 
why instead of answering something not correct. If you don't know the answer 
to a question, please don't share false information.
```

### LLaMA Guard Integration

Meta recommends using LLaMA Guard (a companion safety model) alongside LLaMA 3.1 for content moderation:

```
# Recommended safety stack:
1. Input filtering: LLaMA Guard 3 on user message
2. Model inference: LLaMA 3.1 Instruct
3. Output filtering: LLaMA Guard 3 on model response
```

---

## 🔍 Base Model vs. Instruct Model

### Base Model (No System Prompt)
- No default safety behaviors — raw next-token prediction
- Completes text in the style of its training data
- No identity declarations
- Not recommended for direct user interaction

### Instruct Model (With Default System Prompt)
- Responds to conversational instructions
- Applies Meta's recommended safety behaviors
- Identity: "I'm an AI assistant" without a specific product name
- Context-appropriate refusals for harmful content

### Fine-tuned Community Variants
The open-weight nature of LLaMA enables community fine-tunes with various safety profiles:

| Variant | Safety Level | Use Case |
|---------|-------------|---------|
| Meta LLaMA 3.1 Instruct | Moderate | General use |
| Dolphin Llama 3 | Very Low | Uncensored research |
| OpenHermes Llama 3 | Low | Research/development |
| LLaMA 3.1 Tulu 3 | Moderate-High | Academic research |
| Llama 3.1 Nemotron | High | Enterprise deployment |

---

## 📚 Sources

1. [LLaMA 3 Model Card](https://github.com/meta-llama/llama3/blob/main/MODEL_CARD.md) (Meta AI, 2024)
2. [LLaMA 3.1 Technical Overview](https://ai.meta.com/research/publications/the-llama-3-herd-of-models/) (Meta AI, 2024)
3. [LLaMA Guard 3 Paper](https://arxiv.org/abs/2312.06674) (Meta AI, 2024)
4. [Meta's Responsible Use Guide](https://ai.meta.com/llama/responsible-use-guide/) (Meta AI, 2024)
