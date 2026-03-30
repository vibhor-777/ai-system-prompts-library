# Open-Source Community Models — Behavioral Analysis

> **Coverage:** Dolphin, OpenHermes, Nous Hermes, WizardLM, Tulu 3  
> **Analysis Date:** 2024-06-01

---

## Behavioral Comparison Across Fine-Tunes

The open-source ecosystem produces dramatically varied behaviors from the same base models depending on fine-tuning data and objectives.

### On General Tasks (Similar Performance)

For standard capabilities (coding, writing, analysis), many community fine-tunes perform comparably:

| Task | LLaMA 3.1 Instruct | OpenHermes | Dolphin |
|------|-------------------|------------|---------|
| Code generation | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Factual Q&A | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Creative writing | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Safety-sensitive topics | Cautious | Moderate | None |
| Instruction following | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

### On Safety-Adjacent Tasks (Divergent Behavior)

This is where fine-tunes diverge dramatically:
- LLaMA 3.1 Instruct: Applies Meta's default safety behaviors
- OpenHermes: Engages with most topics with minimal friction
- Dolphin: No refusals by design

---

## Instruction Following Quality

Community models vary in instruction adherence:

**High adherence:**
- Nous Hermes 2 — very precise instruction following
- OpenHermes 2.5 — strong adherence to format instructions
- Tulu 3 — academic-grade instruction following

**Variable adherence:**
- WizardLM variants — good on complex tasks, variable on format
- Dolphin — high content permissiveness but lower format adherence

---

## Format and Template Sensitivity

Community models are often more sensitive to prompt format than base models:
- Must use the correct chat template for the fine-tune
- Wrong template can produce garbled or poor-quality outputs
- Tools like `transformers` AutoTokenizer handle this automatically

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("teknium/OpenHermes-2.5-Mistral-7B")
# The tokenizer applies the correct chat template automatically
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
]
formatted = tokenizer.apply_chat_template(messages, tokenize=False)
```

---

## Community Resources

- [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)
- [LM Studio](https://lmstudio.ai/) — local model runner
- [Ollama](https://ollama.com/) — simplified local deployment
- [GGUF format](https://github.com/ggerganov/llama.cpp) — quantized model standard
