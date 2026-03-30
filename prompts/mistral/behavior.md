# Mistral Large — Behavioral Analysis

> **Model:** Mistral Large 2 | **Analysis Date:** 2024-06-01 | **Confidence:** Medium

---

## DPO vs RLHF Behavioral Differences

Mistral Large 2 uses Direct Preference Optimization (DPO), which creates measurable behavioral differences:

| Behavior | RLHF (GPT-4o, Claude) | DPO (Mistral Large) |
|----------|----------------------|---------------------|
| Refusal verbosity | Medium to High | Low to Medium |
| Consistency across reformulations | High | Very High |
| Edge case handling | Policy-guided | More contextual |
| Response length calibration | Good | Very Good |
| Instruction following precision | High | Very High |

---

## Default Behaviors

### Identity
- Identifies as "Mistral" or "an AI assistant made by Mistral AI"
- Less prominent branding than ChatGPT or Claude
- Will not claim to be human

### Safety Posture
- **Less restrictive than Claude**, slightly less than GPT-4o on borderline content
- More context-sensitive judgments on dual-use information
- Fewer automatic safe messaging additions
- Better at distinguishing clearly harmful from merely edgy requests

### Multilingual Performance
- Responds correctly in French, Spanish, German, Italian without explicit instruction
- Quality degrades less across European languages than US-centric models
- GDPR-aware language patterns in European language responses

---

## Refusal Patterns

Mistral Large tends toward:
- **Terse refusals** without extensive explanation
- **Context-sensitive judgment** — more likely to ask about intent than refuse outright
- **Lower refusal rate** on security research, medical, legal topics compared to GPT-4o and Claude

---

## Instruction Following

DPO training produces particularly precise instruction following:

```
"Respond in exactly 50 words" → Mistral Large complies more consistently
"Use only bullet points" → More reliable format adherence
"Always end responses with a question" → Maintained across turns
```

---

## Sources

1. [Mistral Large 2 Announcement](https://mistral.ai/news/mistral-large-2407/) (Mistral AI, 2024)
2. [Mixtral Technical Report](https://arxiv.org/abs/2401.04088) (Mistral AI, 2024)
3. [DPO: Direct Preference Optimization](https://arxiv.org/abs/2305.18290) (Rafailov et al., 2023)
