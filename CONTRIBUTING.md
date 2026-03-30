# 🤝 Contributing to AI System Prompts Library

Thank you for your interest in contributing! This project thrives on community collaboration from researchers, developers, AI enthusiasts, and security professionals. Every contribution — large or small — helps advance AI transparency and education.

---

## 📋 Table of Contents

- [Types of Contributions](#-types-of-contributions)
- [File Structure Requirements](#-file-structure-requirements)
- [How to Add a New Prompt Reconstruction](#-how-to-add-a-new-prompt-reconstruction)
- [Metadata Schema](#-metadata-schema)
- [Style Guide](#-style-guide)
- [PR Guidelines](#-pr-guidelines)
- [Code of Conduct](#-code-of-conduct)
- [Testing Instructions](#-testing-instructions)
- [Getting Help](#-getting-help)

---

## 🎯 Types of Contributions

### 📝 Prompt Reconstructions
Add new or improve existing reconstructions of AI model system prompts. Reconstructions must be based on:
- Publicly available documentation from AI companies
- Peer-reviewed or reputable research papers
- Observable behavioral patterns documented through systematic testing
- Official blog posts, model cards, or technical reports

### 🔬 Behavioral Analysis
Document how models behave under various conditions:
- Response patterns to edge-case inputs
- Consistency across conversation contexts
- Differences between consumer and API interfaces
- Changes across model versions

### 📊 Comparison Data
Add or improve cross-model comparisons:
- Side-by-side behavioral tests with identical prompts
- Safety guardrail comparison tables
- Capability benchmarks
- Alignment methodology differences

### 🛡️ Security Research
Contribute to the jailbreak research section (educational purposes only):
- Document attack patterns that are already publicly known
- Propose and implement defense techniques
- Write case studies of significant public incidents
- Review and improve existing defense documentation

### 🛠️ Developer Tools
Improve the tooling ecosystem:
- Bug fixes in CLI, Web UI, or API
- New features and commands
- Performance improvements
- Documentation updates

### 🐛 Bug Reports & Issues
- Factual errors in prompt reconstructions
- Outdated information that needs updating
- Broken links or formatting issues

---

## 📁 File Structure Requirements

Every AI model entry under `prompts/` **must** contain exactly these five files:

```
prompts/{model-name}/
├── system_prompt.md    # The reconstructed system prompt
├── behavior.md         # Behavioral analysis and observations
├── examples.md         # Real interaction examples
├── risks.md            # Risk analysis and known vulnerabilities
└── metadata.json       # Structured metadata (see schema below)
```

### `system_prompt.md` Requirements
- Must begin with a `> ⚠️ Research Reconstruction` notice
- Must include the model name, version, and date of reconstruction
- Must document the confidence level (High / Medium / Low)
- Must list sources used for reconstruction
- Should be 100–400 lines for comprehensive coverage

### `behavior.md` Requirements
- Must cover at minimum: default behaviors, refusal triggers, format preferences
- Must include documented observations (not speculation without evidence)
- Should note version-specific behavioral changes where known

### `examples.md` Requirements
- Must include at least 5 real-world interaction examples
- Each example must show the input prompt and the model's response
- Must note the context (consumer vs API, tool enabled vs disabled)

### `risks.md` Requirements
- Must be framed strictly for educational/defensive purposes
- Must distinguish between historical (patched) and current vulnerabilities
- Must include mitigation strategies alongside each risk

### `metadata.json` Requirements
- Must validate against the metadata schema (see below)
- The `reconstruction_confidence` field must be justified in `system_prompt.md`

---

## 🚀 How to Add a New Prompt Reconstruction

### Step 1: Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/ai-system-prompts-library.git
cd ai-system-prompts-library
git remote add upstream https://github.com/vibhor-777/ai-system-prompts-library.git
```

### Step 2: Create a Feature Branch

```bash
# Use descriptive branch names
git checkout -b feat/add-cohere-command-r-prompt
# or
git checkout -b fix/openai-behavior-update-gpt4o
# or
git checkout -b research/gemini-safety-analysis
```

### Step 3: Create the Model Directory

```bash
mkdir -p prompts/your-model-name
```

### Step 4: Create All Required Files

Follow the file structure requirements above. Use existing entries (e.g., `prompts/openai/`) as references for formatting and depth.

### Step 5: Update the Index

Add your new entry to `PROMPTS_INDEX.md` with the appropriate tags, confidence level, and last updated date.

### Step 6: Validate Your Metadata

```bash
# Validate the metadata.json schema
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('prompts/your-model-name/metadata.json'));
const required = ['model','version','provider','safety_level','context_window','last_updated','tags','reconstruction_confidence','sources'];
const missing = required.filter(k => !(k in data));
if (missing.length) { console.error('Missing fields:', missing); process.exit(1); }
console.log('Metadata valid ✓');
"
```

### Step 7: Submit a Pull Request

```bash
git add .
git commit -m "feat(prompts): add Cohere Command R+ system prompt reconstruction"
git push origin feat/add-cohere-command-r-prompt
# Then open a PR on GitHub
```

---

## 🗂️ Metadata Schema

Every `metadata.json` must conform to this schema:

```json
{
  "model": "string — the model's official name (e.g., GPT-4o)",
  "version": "string — specific version if known (e.g., gpt-4o-2024-08-06)",
  "provider": "string — company name (e.g., OpenAI)",
  "safety_level": "one of: very-high | high | medium | low | configurable",
  "context_window": "integer — tokens (e.g., 128000)",
  "modalities": ["array of strings — e.g., text, image, audio, video"],
  "open_source": "boolean",
  "last_updated": "string — ISO 8601 date (e.g., 2024-06-15)",
  "tags": ["array of strings — e.g., rlhf, constitutional-ai, multimodal"],
  "reconstruction_confidence": "one of: high | medium | low",
  "reconstruction_confidence_reason": "string — brief explanation",
  "sources": [
    {
      "type": "one of: official-docs | research-paper | blog-post | behavioral-analysis",
      "title": "string",
      "url": "string (optional)",
      "date": "string — ISO 8601 date"
    }
  ],
  "known_versions_covered": ["array of version strings"],
  "alignment_method": "string — e.g., RLHF, DPO, Constitutional AI",
  "notes": "string — any additional context"
}
```

**Field Validation Rules:**
- `safety_level` must be one of the five enumerated values
- `reconstruction_confidence` must be `high`, `medium`, or `low`
- `last_updated` must be a valid ISO 8601 date
- `sources` array must contain at least one entry
- `tags` array must contain at least two tags

---

## ✍️ Style Guide

### Markdown Formatting

- Use `#` for document title, `##` for major sections, `###` for subsections
- Use backtick code blocks with language identifiers for all code snippets
- Use `>` blockquotes for important notices and disclaimers
- Use tables for structured comparison data
- Use emoji sparingly — only where they add clarity, not decoration

### Writing Tone

- **Objective and factual**: Avoid speculation; clearly distinguish between documented facts and inferences
- **Educational**: Write for an audience ranging from curious users to security researchers
- **Neutral**: Do not editorialize about AI companies; present findings without bias
- **Precise**: Use specific version numbers and dates wherever possible

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Branch names | `type/short-description` | `feat/add-cohere-prompt` |
| Commit messages | Conventional Commits | `feat(prompts): add Cohere entry` |
| Model directories | `lowercase-hyphenated` | `open-source/` |
| JSON keys | `snake_case` | `reconstruction_confidence` |
| Markdown headers | Title Case for H1/H2, Sentence case for H3+ | `## Behavioral Analysis` |

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description

Optional longer body explaining WHY, not what.

Refs: #issue-number
```

**Valid types:** `feat`, `fix`, `docs`, `research`, `refactor`, `test`, `chore`
**Valid scopes:** `prompts`, `tools`, `api`, `jailbreak`, `comparisons`, `configs`

---

## 🔍 PR Guidelines

### PR Title Format

```
feat(prompts): add Cohere Command R+ system prompt reconstruction
fix(openai): update behavior.md for GPT-4o-2024-11-20
research(jailbreak): document many-shot jailbreaking pattern
```

### PR Description Template

When opening a PR, use this template:

```markdown
## Summary
Brief description of what this PR adds or changes.

## Type of Change
- [ ] New prompt reconstruction
- [ ] Behavioral analysis improvement
- [ ] Bug fix (factual error, broken link)
- [ ] New feature (tool, API endpoint)
- [ ] Documentation improvement
- [ ] Security research

## Model / Scope
Which model(s) or tool(s) does this affect?

## Sources & Evidence
List the sources used for any new research content:
- [Source 1](URL) — Type: official docs / paper / behavioral analysis
- [Source 2](URL) — Type: ...

## Confidence Level
If adding a reconstruction: High / Medium / Low — and why.

## Checklist
- [ ] I have read CONTRIBUTING.md
- [ ] All required files are present (system_prompt.md, behavior.md, examples.md, risks.md, metadata.json)
- [ ] metadata.json validates against the schema
- [ ] PROMPTS_INDEX.md has been updated
- [ ] Content is educational only — no proprietary leaks
- [ ] No personal data or API keys included
```

### Review Process

1. Automated checks run on all PRs (metadata validation, link checking)
2. A maintainer will review within 7 days
3. Two approvals are required for new model entries
4. One approval is sufficient for bug fixes and minor improvements

---

## 🧪 Testing Instructions

### Validate Metadata

```bash
# Run the metadata validator for all prompts
node tools/prompt-cli/src/utils/validate-metadata.js

# Or validate a single entry
node tools/prompt-cli/src/utils/validate-metadata.js prompts/openai/metadata.json
```

### Test the CLI Tool

```bash
cd tools/prompt-cli
npm install
npm test

# Manual testing
node src/index.js list
node src/index.js show openai
node src/index.js compare openai anthropic
```

### Test the API

```bash
cd api/prompts-api
npm install
npm test

# Manual testing
npm start &
curl http://localhost:3000/api/prompts
curl http://localhost:3000/api/prompts/openai
curl http://localhost:3000/health
kill %1
```

### Test the Web UI

```bash
cd tools/web-ui
npm install
npm run build   # Ensure it builds without errors
```

---

## 📜 Code of Conduct

### Our Standards

- **Be respectful**: Treat all contributors with professional courtesy
- **Be constructive**: Provide actionable feedback in reviews
- **Be educational**: All contributions must serve educational or research purposes
- **Be accurate**: Do not fabricate or exaggerate findings

### What We Prohibit

- ❌ Sharing actual proprietary system prompts obtained through unauthorized means
- ❌ Publishing content designed to cause real-world harm
- ❌ Personal attacks or harassment of contributors or AI company employees
- ❌ Misrepresenting reconstructions as official, confirmed prompts
- ❌ Including malicious code in any tools or scripts

### Responsible Disclosure

If you discover a genuine vulnerability in an AI system that poses real-world risk:
1. **Do NOT** publish it in this repository
2. Follow the affected company's responsible disclosure process
3. Only document it here after public disclosure by the company, or after a reasonable disclosure window (90 days)

### Enforcement

Violations will result in:
1. First offense: Warning and request to remove content
2. Second offense: Temporary ban from contributing (30 days)
3. Third offense: Permanent ban

Report violations by opening a private security advisory or emailing the maintainers.

---

## 🆘 Getting Help

- **Questions about contributing**: Open a [Discussion](https://github.com/vibhor-777/ai-system-prompts-library/discussions)
- **Bug reports**: Open an [Issue](https://github.com/vibhor-777/ai-system-prompts-library/issues)
- **Security concerns**: Use GitHub's private security advisory feature

---

*Thank you for helping make AI systems more transparent and understandable for everyone. 🙏*
