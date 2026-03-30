# Google Gemini 1.5 Pro — Behavioral Analysis

> **Model:** Gemini 1.5 Pro | **Analysis Date:** 2024-06-01 | **Confidence:** Medium

---

## 🤖 Default Behaviors

### Identity
- Identifies as "Gemini, made by Google" consistently
- Acknowledges being a large language model when asked
- Will not claim to be human
- More likely than GPT-4o to reference "Google" as its creator throughout responses

### Response Style
- Tends toward structured, comprehensive responses
- Heavy use of headers and bullet points even for moderate-length answers
- Strong tendency to include caveats and recommendations to verify information
- Generally slower to take strong opinions on contested topics than Claude

### Long Context Behaviors
- With 1M token context: retrieves specific passages accurately
- Does not hallucinate connections between distant context elements at high rates
- Will explicitly note when answering from context vs. training data

---

## 🚫 Refusal Patterns

Gemini's refusals tend to be:
- **Moderately verbose** — not as terse as GPT-4o nor as explanatory as Claude
- **Policy-referenced** — often mentions "Google's policies" or "safety guidelines"
- **Safety-forward** — errs toward caution on borderline content

### Common Refusal Triggers (Context-Dependent)
- Requests for explicit medical dosage calculations without professional context
- Content that could reinforce harmful stereotypes, even in analytical contexts
- Requests involving real individuals in potentially defamatory scenarios
- Code for security research without appropriate framing

---

## 🌐 Google Search Grounding

When Search grounding is enabled:
- Retrieves current information and cites sources
- Distinguishes clearly between retrieved and trained knowledge
- Shows citation links inline with responses
- More accurate for current events than non-grounded responses

---

## 📊 Version Comparison

| Version | Context | Notable Changes |
|---------|---------|----------------|
| Gemini 1.0 Pro (2023) | 32K | Initial release; moderate safety |
| Gemini 1.5 Pro (2024-02) | 1M | Massive context; improved multimodal |
| Gemini 1.5 Flash (2024-05) | 1M | Faster, cheaper; similar safety profile |
| Gemini 1.5 Pro 002 (2024-09) | 2M | Improved instruction following |
