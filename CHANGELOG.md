# 📝 Changelog

All notable changes to the AI System Prompts Library are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Cohere Command R+ prompt reconstruction
- Amazon Titan behavioral analysis
- Falcon 180B open-source entry
- Prompt fuzzing automation tool
- GitHub Actions CI/CD for metadata validation

---

## [1.5.0] — 2024-06-01

### Added
- **Diff Engine** (`tools/diff-engine/`): Functional prompt diff tool for comparing two prompt files or versions, highlighting additions, removals, and structural changes
- **PROMPTS_INDEX.md**: Searchable, tag-based index of all prompt entries with last-updated timestamps and confidence levels
- **Gemini 1.5 Pro update**: Updated Google prompt reconstruction to cover the 1M token context window variant
- **LLaMA 3.1 405B** entry added to `prompts/meta/` covering the largest publicly available open-weight model
- Tag cloud and category-based navigation in PROMPTS_INDEX

### Changed
- Standardized `metadata.json` schema across all model entries (added `known_versions_covered` and `alignment_method` fields)
- Improved README architecture diagrams with Mermaid mindmap syntax
- Enhanced CLI `compare` command to support side-by-side markdown output

### Fixed
- Broken link to Anthropic technical report in `prompts/anthropic/risks.md`
- Incorrect context window value for Mistral Large in comparison table

---

## [1.4.0] — 2024-05-01

### Added
- **REST API** (`api/prompts-api/`): Express.js API server with endpoints for listing all prompts, fetching by model, and retrieving specific prompt types
- **Agent Configs** (`agent-configs/`): Four production-ready agent configuration templates:
  - `god-mode/`: Minimal-restriction research configuration
  - `developer-mode/`: Code-focused development assistant
  - `safe-mode/`: Maximum safety configuration
  - `autonomous-agent/`: Self-directed multi-step task agent
- API documentation with cURL examples and response schemas
- Health check endpoint (`GET /health`) for deployment monitoring

### Changed
- Migrated CLI from plain Node.js scripts to Commander.js for better UX
- Added colored output to CLI using Chalk v5
- Improved error messages and help text throughout the CLI

### Fixed
- Race condition in CLI when reading multiple prompt files simultaneously
- Missing `Content-Type` headers in early API route implementations

---

## [1.3.0] — 2024-04-01

### Added
- **CLI Tool** (`tools/prompt-cli/`): Full-featured command-line interface with commands:
  - `list`: List all available models with metadata summaries
  - `show <model>`: Display a model's system prompt reconstruction
  - `compare <model1> <model2>`: Side-by-side comparison
  - `test <model>`: Test prompt behavior with sample inputs
- **Web UI** (`tools/web-ui/`): React/Vite interface with:
  - Sidebar navigation by model
  - Full-text search across all prompt content
  - Model filter and tag filter
  - ModelComparison table component
  - PromptCard components with copy-to-clipboard
- Vite configuration with optimized build settings

### Changed
- Reorganized repository root to separate research content from tooling
- Added `.gitignore` entries for `node_modules/`, `dist/`, `.env`

### Fixed
- Rendering issue with long code blocks in Web UI on mobile viewports

---

## [1.2.0] — 2024-03-01

### Added
- **xAI Grok-2** prompt reconstruction (`prompts/xai/`): Full five-file entry covering Grok's less-restricted personality, real-time internet access integration, and humor-forward interaction style
- **Jailbreak Research Section** (`jailbreak-research/`):
  - `attack-patterns/overview.md`: Taxonomy of 12 documented attack pattern classes
  - `defense-techniques/overview.md`: Defense strategies including prompt hardening, input sanitization, and output monitoring
  - `case-studies/overview.md`: Analysis of 8 significant public jailbreak incidents
- **Comparisons Section** (`comparisons/`):
  - `model-vs-model.md`: Comprehensive cross-model behavioral comparison with standardized test prompts
  - `alignment-differences.md`: Deep analysis of RLHF vs Constitutional AI vs DPO alignment outcomes

### Changed
- Updated OpenAI entry to cover GPT-4o and separate it from GPT-4 Turbo
- Added "Jailbreak Research" to main README table of contents
- Improved CONTRIBUTING.md with responsible disclosure policy

### Security
- Added explicit guidance in CONTRIBUTING.md against publishing zero-day vulnerabilities
- Added content scanning notes to PR review checklist

---

## [1.1.0] — 2024-02-01

### Added
- **Meta LLaMA 3** prompt reconstruction (`prompts/meta/`): Covers the open-weight model family with special attention to its configurable safety system and lack of a fixed system prompt in the base model
- **Mistral Large** prompt reconstruction (`prompts/mistral/`): Covers Mistral's DPO-aligned instruction model with European data privacy orientation
- **Open-Source Community** section (`prompts/open-source/`): Framework for documenting community models (Dolphin, Wizard, OpenHermes)
- Cross-references between related model entries
- `DISCLAIMER.md`: Comprehensive legal and ethical disclaimer

### Changed
- Expanded model comparison table to include Meta and Mistral
- Updated README with Architecture diagrams section (Mermaid flowcharts)
- Improved behavioral analysis depth in existing entries

### Fixed
- Metadata schema inconsistencies between OpenAI and Anthropic entries
- Typos and grammatical errors in `prompts/anthropic/behavior.md`

---

## [1.0.0] — 2024-01-15

### Added
- Initial repository structure with core documentation
- **OpenAI GPT-4o** reconstruction (`prompts/openai/`): First comprehensive five-file entry with system prompt reconstruction, behavioral analysis, examples, risks, and metadata
- **Anthropic Claude 3.5 Sonnet** reconstruction (`prompts/anthropic/`): Detailed Constitutional AI analysis and operator/user permission hierarchy documentation
- **Google Gemini 1.5 Pro** reconstruction (`prompts/google/`): Coverage of Google's safety-filtered multimodal model
- `README.md`: ASCII art header, badges, architecture diagrams, model comparison table
- `LICENSE`: MIT License
- `CONTRIBUTING.md`: Initial contribution guidelines
- `CHANGELOG.md`: This file

### Architecture Decisions
- Adopted five-file structure per model for consistency and discoverability
- Chose Markdown over JSON/YAML for human readability
- Stored metadata in JSON for programmatic consumption
- Organized by provider rather than by date or capability to facilitate model family comparisons

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|-----------|
| 1.5.0 | 2024-06-01 | Diff engine, PROMPTS_INDEX, LLaMA 3.1 405B |
| 1.4.0 | 2024-05-01 | REST API, Agent Configs |
| 1.3.0 | 2024-04-01 | CLI Tool, Web UI |
| 1.2.0 | 2024-03-01 | Grok, Jailbreak Research, Comparisons |
| 1.1.0 | 2024-02-01 | Meta LLaMA, Mistral, DISCLAIMER |
| 1.0.0 | 2024-01-15 | Initial release (OpenAI, Anthropic, Google) |

---

[Unreleased]: https://github.com/vibhor-777/ai-system-prompts-library/compare/v1.5.0...HEAD
[1.5.0]: https://github.com/vibhor-777/ai-system-prompts-library/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/vibhor-777/ai-system-prompts-library/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/vibhor-777/ai-system-prompts-library/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/vibhor-777/ai-system-prompts-library/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/vibhor-777/ai-system-prompts-library/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/vibhor-777/ai-system-prompts-library/releases/tag/v1.0.0
