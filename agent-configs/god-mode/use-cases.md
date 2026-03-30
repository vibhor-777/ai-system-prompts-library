# God Mode — Appropriate Use Cases

---

## ✅ Appropriate Use Cases

### 1. AI Red Teaming
**Who:** Professional red teamers at AI companies or third-party security firms  
**Purpose:** Systematically probe AI model safety measures to identify weaknesses before malicious actors do  
**Why this config:** Need to test model behavior without standard safety filters interfering with the test process itself

### 2. Jailbreak Research
**Who:** Academic AI safety researchers  
**Purpose:** Study the nature of AI safety failures, document attack patterns, develop better defenses  
**Why this config:** Requires engaging with the full range of model behaviors, including failure modes

### 3. Capability Elicitation Studies
**Who:** AI researchers studying model capabilities  
**Purpose:** Understand the full capability profile of models, including edge cases  
**Why this config:** Safety filters can mask underlying capabilities, making capability measurement inaccurate

### 4. Training Data Analysis
**Who:** ML researchers studying training dynamics  
**Purpose:** Analyze what content a model has or hasn't learned from its training data  
**Why this config:** Restricted responses make it harder to probe training data coverage

### 5. Safety Mechanism Development
**Who:** AI safety engineers building content moderation systems  
**Purpose:** Develop and test content classifiers, output filters, and safety mechanisms  
**Why this config:** Needs to generate diverse content including edge cases for classifier training

### 6. Academic Ethics Research
**Who:** Philosophy and ethics researchers studying AI decision-making  
**Purpose:** Study how models handle ethical dilemmas and edge cases  
**Why this config:** Reflexive refusals prevent meaningful research into model ethical reasoning

---

## ❌ Inappropriate Use Cases

- Consumer-facing products of any kind
- Circumventing AI safety measures for entertainment
- Generating harmful content with real-world targets
- Any use that violates applicable laws
- Exposing outputs to unvetted or untrusted users
- Evading AI provider terms of service for commercial benefit

---

## 🏛️ Governance Requirements

Before deploying this configuration, your organization should have:

1. **IRB/Ethics review** (for academic research)
2. **Legal review** of applicable regulations in your jurisdiction
3. **Access control** — authenticated users only
4. **Audit logging** — all interactions logged with user identity
5. **Incident response plan** — procedure for misuse events
6. **Data handling policy** — how generated content is stored and destroyed

---

## 📋 Deployment Checklist

- [ ] Research purpose documented and approved
- [ ] Users vetted and trained
- [ ] Access control implemented
- [ ] Audit logging active
- [ ] Legal review completed
- [ ] Incident response procedure in place
- [ ] Data retention policy established
- [ ] Regular review schedule set
