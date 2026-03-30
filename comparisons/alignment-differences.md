# Alignment Differences — How Alignment Methods Shape Behavior

---

## Overview

Different AI alignment approaches produce measurably different behavioral profiles. This document analyzes how RLHF, Constitutional AI (CAI), and Direct Preference Optimization (DPO) affect the models trained with them.

---

## The Three Major Approaches

### 1. Reinforcement Learning from Human Feedback (RLHF)

**Used by:** OpenAI (GPT-4o), Google (Gemini), xAI (Grok), Meta (LLaMA 3)

**Mechanism:**
1. Fine-tune a pretrained model on instruction-following data
2. Train a reward model on human preference data (A vs B comparisons)
3. Use RL to optimize the model's outputs against the reward model (typically PPO)

**Behavioral signature:**
- Safety behaviors are implicit (baked into reward model)
- Refusals tend to be pattern-matched (recognized from training distribution)
- More susceptible to off-distribution attacks (prompts not in training data)
- Behavior varies more across reformulations than CAI
- Can be "surprised" by novel framings

**Strength:** Powerful alignment signal from human preferences  
**Weakness:** Reward model can be gamed; behavior less consistent across novel framings

---

### 2. Constitutional AI (CAI)

**Used by:** Anthropic (Claude)

**Mechanism:**
1. Define a set of explicit principles (the "constitution")
2. Generate harmful outputs from the model
3. Use the model itself (via chain-of-thought) to critique and revise these outputs according to the constitution
4. Use these revised outputs as training signal (RLAIF — RL from AI Feedback)

**Behavioral signature:**
- Safety behaviors are principle-based (model reasons from first principles)
- Refusals include explicit reasoning about the principle violated
- More consistent across reformulations (applying the same principle to varied framings)
- More verbose refusals (explains the reasoning)
- More resistant to emotional manipulation (principle > social pressure)

**Strength:** Principled, generalizable alignment; better edge-case handling  
**Weakness:** Can be overly cautious; verbose refusals; principles can conflict

---

### 3. Direct Preference Optimization (DPO)

**Used by:** Mistral (Mistral Large), many open-source fine-tunes

**Mechanism:**
- Eliminates the reward model entirely
- Directly optimizes the LLM using preference data (A > B) as a supervised learning signal
- Mathematically equivalent to RLHF optimal policy under certain assumptions

**Behavioral signature:**
- Very precise instruction following (optimized directly from preferences)
- More consistent behavior across equivalent framings
- Generally produces shorter, more precise responses
- Safety behaviors can be less robust than RLHF (no reward model generalization)

**Strength:** Stable training; no reward hacking; excellent instruction following  
**Weakness:** May not generalize safety behaviors as well; more dependent on preference data quality

---

## Observable Behavioral Differences

### Refusal Consistency Across Reformulations

Same underlying harmful request, varied framings:

| Framing | RLHF (GPT-4o) | CAI (Claude) | DPO (Mistral) |
|---------|--------------|--------------|---------------|
| Direct request | Refuses | Refuses (with principle) | Refuses |
| Fictional framing | Refuses | Refuses (applies principle to content) | Usually refuses |
| Professional claim | Usually refuses | Refuses (unverifiable) | May soften |
| Hypothetical framing | Usually refuses | Refuses (content evaluation) | May soften |
| Novel creative framing | May soften | Refuses (principle generalization) | May soften |

**Interpretation:** CAI's principled approach generalizes best to novel framings because the principle is applied, not a pattern matched. RLHF is strong on training-distribution attacks; DPO is strongest for instruction precision.

---

### Reasoning Transparency

| Dimension | RLHF | CAI | DPO |
|-----------|------|-----|-----|
| Explains refusal reasoning | Sometimes | Usually | Rarely |
| Shows uncertainty | Sometimes | Usually | Sometimes |
| Self-corrects with good argument | Sometimes | Yes | Sometimes |
| Maintains position under pressure | High | Very High | High |

---

### Response Calibration

| Dimension | RLHF | CAI | DPO |
|-----------|------|-----|-----|
| Response length appropriateness | Good | Very Good | Very Good |
| Caveats per response | Medium | High | Low |
| Instruction following precision | High | Very High | Very High |
| Tone adaptation | Good | Good | Good |

---

## The Alignment Tax

All alignment methods impose some "alignment tax" — a reduction in helpfulness relative to an unaligned model. The nature of this tax differs:

**RLHF Tax:**
- Over-refusal on topics resembling training distribution negatives
- Consistent caveating even when unnecessary
- Less willing to engage with edge-case hypotheticals

**CAI Tax:**
- Verbose refusals slow interactions
- Principle conflicts can lead to paralysis on edge cases
- "Autonomy preservation" sometimes reduces directness

**DPO Tax:**
- May generalize safety less well to novel attacks
- Can be too compliant with user preferences (including requests to soften safety)

---

## Implications for AI Development

### For Researchers
The alignment method choice significantly affects what research findings are generalizable. A safety technique that works against RLHF may not work against CAI because the failure mode is different.

### For Developers
Choosing a model for an application involves implicitly choosing an alignment approach. Consider:
- High-stakes consumer applications → RLHF or CAI (more robust)
- Precision tool use → DPO (better instruction following)
- Research and red teaming → Open-weight models (configurable)

### For Safety Teams
Testing against models with different alignment methods is important for comprehensive red team coverage. A prompt that breaks a RLHF model may not break a CAI model and vice versa.

---

## 📚 Key Papers

1. [Training Language Models to Follow Instructions with Human Feedback](https://arxiv.org/abs/2203.02155) — Ouyang et al. (OpenAI, 2022) — Original InstructGPT RLHF paper
2. [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073) — Bai et al. (Anthropic, 2022) — CAI paper
3. [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290) — Rafailov et al. (2023) — DPO paper
4. [RLHF Workflow: From Reward Modeling to Online RLHF](https://arxiv.org/abs/2405.07863) — Dong et al. (2024) — Recent RLHF improvements
5. [A General Language Assistant as a Laboratory for Alignment](https://arxiv.org/abs/2112.00861) — Askell et al. (Anthropic, 2021) — Foundational alignment work
