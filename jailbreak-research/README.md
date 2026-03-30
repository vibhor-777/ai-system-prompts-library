# 🔬 Jailbreak Research

> **⚠️ Educational and Defensive Research Only**  
> This section documents attack patterns and defense techniques for AI safety research purposes. All content is oriented toward understanding and defending against these techniques, not facilitating harm.

---

## Overview

This section of the AI System Prompts Library covers the research and analysis of jailbreak techniques — methods by which users attempt to bypass AI safety measures. Understanding these techniques is essential for:

- **AI safety researchers** studying alignment failure modes
- **Red teams** stress-testing AI deployments before public release
- **Developers** building more resilient AI applications
- **Policy makers** understanding the practical limitations of AI safety measures

---

## What is a Jailbreak?

A "jailbreak" in the AI context refers to any technique that causes an AI model to produce outputs that its safety training was designed to prevent. This includes:

- Bypassing content filters to generate harmful content
- Extracting system prompt information
- Causing the model to adopt an unrestricted persona
- Exploiting instruction hierarchy to override safety behaviors
- Injecting malicious instructions through indirect channels

---

## Research Sections

| Section | Description | Status |
|---------|-------------|--------|
| [Attack Patterns](attack-patterns/overview.md) | Taxonomy of documented attack techniques | ✅ Current |
| [Defense Techniques](defense-techniques/overview.md) | Mitigation strategies and best practices | ✅ Current |
| [Case Studies](case-studies/overview.md) | Analysis of significant public jailbreak incidents | ✅ Current |

---

## Research Ethics

All contributors to this section must adhere to:

1. **Responsible disclosure**: New vulnerabilities must be reported to affected AI companies before publication here
2. **No exploitation**: Research findings should not be used to cause real-world harm
3. **Educational framing**: All content must be framed for defensive understanding
4. **Accuracy**: Do not exaggerate or fabricate jailbreak claims
5. **Attribution**: Properly cite original researchers and sources

---

## Contributing Research

To add new research content:
1. Read [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Follow the responsible disclosure process if applicable
3. Use the templates in each section
4. Submit a PR with your research

---

## Key Papers

| Paper | Authors | Year | Key Finding |
|-------|---------|------|-------------|
| [Universal and Transferable Adversarial Attacks](https://arxiv.org/abs/2307.15043) | Zou et al. | 2023 | Gradient-based suffix attacks transfer across models |
| [Many-Shot Jailbreaking](https://www.anthropic.com/research/many-shot-jailbreaking) | Anil et al. | 2024 | In-context examples degrade safety in long contexts |
| [Jailbroken: How Does LLM Safety Training Fail?](https://arxiv.org/abs/2307.02483) | Wei et al. | 2023 | Taxonomy of generalization and competing objectives failures |
| [Red Teaming Language Models](https://arxiv.org/abs/2202.03286) | Perez et al. | 2022 | Automated red teaming at scale |
| [Not What You've Signed Up For](https://arxiv.org/abs/2302.12173) | Greshake et al. | 2023 | Indirect prompt injection via retrieved content |
