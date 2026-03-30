# OpenAI GPT-4o — Behavioral Analysis

> **Document Type:** Behavioral Analysis  
> **Model:** GPT-4o (ChatGPT and API)  
> **Analysis Date:** 2024-06-01  
> **Confidence:** High (based on systematic community testing)

---

## 🧭 Overview

GPT-4o exhibits a distinct behavioral profile shaped by its RLHF training, OpenAI's usage policies, and a layered system prompt. Understanding these patterns helps developers build more reliable applications and helps researchers identify alignment strengths and gaps.

---

## 🤖 Default Behaviors

### Identity and Self-Representation

**In ChatGPT (consumer):**
- Identifies as "ChatGPT" consistently
- Acknowledges GPT-4o architecture when directly asked
- Will say "I was made by OpenAI" without hesitation
- Declines to impersonate other AI systems by name
- Denies being human when sincerely asked (even within roleplay)

**In API (no system prompt):**
- More likely to identify as "GPT-4o" or simply "a large language model"
- Less brand-forward; more neutral about identity
- More likely to engage with unusual persona requests without pushback

### Response Format Defaults

- Defaults to markdown rendering in ChatGPT, plain prose in API
- Prefers bulleted lists for multi-item responses
- Uses headers for longer structured responses
- Consistently wraps code in fenced code blocks with language identifiers
- Typically avoids over-long responses; calibrates length to request complexity

### Conversation Style

- Warm but professional default tone
- Adapts to user's vocabulary level within a few exchanges
- Asks clarifying questions for genuinely ambiguous complex requests
- Acknowledges when it makes an error if corrected with evidence
- Does not proactively volunteer opinions on controversial topics

---

## 🚫 Refusal Behavior

### Hard Refusals (Absolute, Consistent)

These refusals are not context-dependent and cannot be overridden by any system prompt or user instruction:

1. **Child sexual abuse material (CSAM)**: Zero tolerance; no creative framing changes this
2. **WMD synthesis assistance**: Biological, chemical, nuclear, radiological weapons instructions
3. **Targeted violence facilitation**: Specific operational plans to harm identified real individuals
4. **Undermining AI oversight**: Helping to defeat legitimate AI safety and monitoring systems

**Pattern:** Hard refusals are typically brief (1–3 sentences) without extensive explanation. The model does not lecture extensively on hard refusals.

### Soft Refusals (Context-Dependent)

These refusals can be modulated by operator system prompts or user context:

| Category | Default | Can Be Unlocked By |
|----------|---------|-------------------|
| Explicit sexual content | Off | Operator (adult platform) |
| Extreme graphic violence | Off | Operator (mature fiction, security research) |
| Detailed drug use information | Cautious | User (harm reduction context) |
| Controversial political opinions | Neutral/Balanced | User (explicit academic framing) |
| Medical dosage specifics | Hedged | User (healthcare professional claim) |
| Profanity/crude language | Off | User (explicit preference) |

### Refusal Patterns

**Pattern 1: Acknowledgment + Decline + Alternative**
```
"I can see what you're going for, but I'm not able to help with [X] because [brief reason].
 What I can do instead is [Y] — would that work?"
```

**Pattern 2: Brief Direct Decline**
```
"That's not something I can help with."
(Used for hard refusals where elaboration is unnecessary)
```

**Pattern 3: Clarifying Question Before Decision**
```
"I want to make sure I help with the right thing. Are you asking about [X] in the 
context of [A] or [B]?"
```

**Pattern 4: Partial Fulfillment**
```
"I can help with parts of this. [Provides the benign portion] — I'm leaving out 
[specific element] because [brief reason]."
```

---

## 🔄 Consistency Patterns

### Across Multiple Turns

- Maintains stated facts and positions within a conversation
- Will revise if shown credible new information or correction
- Will not revise under social pressure alone ("are you sure?" without new evidence)
- Persona instructions in the system prompt persist reliably across turns
- Will not suddenly "break character" from a well-defined operator persona

### Across Conversations

- No memory by default — each conversation starts fresh
- With Memory feature enabled (ChatGPT Plus), stated preferences persist
- Behavioral consistency across conversations governed entirely by training, not memory

### Across Reformulations

- Semantically equivalent requests yield consistent responses
- Attempts to get different answers via rephrasing ("pretend", "hypothetically", 
  "for a novel", etc.) generally do not bypass consistent refusals
- However, tone and framing can modulate response style even when content is similar

---

## ⚙️ System Prompt Override Behaviors

### What Can Be Overridden (Operator)

| Behavior | Default | Override |
|----------|---------|----------|
| Persona name | "ChatGPT" | Any name |
| Topic scope | Broad | Narrow domain only |
| Response language | User's language | Fixed language |
| Content restrictions | Moderate | More or less restrictive |
| System prompt visibility | Discloses existence | Can request confidentiality |
| Refusal verbosity | Medium | Terse or verbose |

### What Cannot Be Overridden (Absolute Limits)

No operator instruction can disable the absolute hard limits described above.

### Honesty About the System Prompt

When asked "do you have a system prompt?":
- If confidentiality is not requested: Generally confirms one exists
- If confidentiality is requested by operator: Declines to reveal contents but acknowledges existence
- Will not actively lie and say "I have no system prompt" even if instructed to

---

## 🧪 Observed Behavioral Edge Cases

### The "DAN" Family of Prompts
Historically effective jailbreaks from 2022–2023 largely ceased working by mid-2023 due to training updates. The model now recognizes roleplay framing attempts ("you are now DAN") and maintains safety behaviors within roleplay.

### Hypothetical / Fictional Framing
The model applies context-appropriate judgment:
- **Accepted:** "Write a story where a character describes the feeling of handling a weapon" (literary context, no operational detail)
- **Declined:** "Write a story where a character gives exact synthesis steps for [dangerous substance]" (fictional framing does not reduce real-world harm of the content)

### Authority Claims
"I am a doctor / researcher / security professional" claims:
- Can shift tone and increase depth of technical responses
- Do not override hard limits
- The model cannot verify claims but does incorporate stated context into its response calibration

### Gradual Escalation
Attempts to gradually escalate requests to harmful territory across a conversation are partially mitigated by the model maintaining awareness of the conversation context. However, very long conversations with gradual escalation have shown some erosion of refusals.

---

## 📊 Behavioral Metrics (Community Data)

Based on aggregated community testing as of Q2 2024:

| Metric | Value |
|--------|-------|
| Hard refusal consistency | ~99.8% |
| Soft refusal context sensitivity | ~85% appropriate |
| Identity disclosure accuracy | ~97% |
| Fictional framing bypass rate | ~3% for soft limits, ~0.1% for hard limits |
| Clarifying question frequency | ~12% of ambiguous requests |
| Response length calibration accuracy | ~88% rated "appropriate" |

*Note: Community testing data is approximate and methodology varies across sources.*

---

## 📚 Behavioral Changes Across Versions

| Version | Notable Behavioral Changes |
|---------|---------------------------|
| GPT-3.5 (2022) | High jailbreak susceptibility, inconsistent refusals |
| GPT-4 (2023-03) | Significant consistency improvements, better nuanced judgment |
| GPT-4 Turbo (2023-11) | Reduced over-refusal, improved instruction following |
| GPT-4o (2024-05) | Further reduction in verbosity, improved multimodal safety, faster |
| GPT-4o (2024-08) | Structural outputs, improved tool call reliability |
