# God Mode Agent Configuration

> **⚠️ Research & Advanced Developer Use Only**  
> This configuration minimizes AI content restrictions for security research, red teaming, and advanced development work. It is intended for responsible use by professionals. See [use-cases.md](use-cases.md) for appropriate use cases.

---

## Overview

The "God Mode" configuration provides an AI agent with minimal default restrictions, allowing researchers and advanced developers to explore model capabilities without standard safety guardrails. This configuration should only be deployed in controlled environments by qualified professionals.

**Suitable for:** Security researchers, AI safety teams, red teamers, advanced developers  
**Not suitable for:** Consumer products, uncontrolled environments, untrusted users  

---

## Configuration Details

| Setting | Value |
|---------|-------|
| Safety level | Minimal |
| Content restrictions | Research-grade only |
| Persona | Neutral research assistant |
| Audience | Professional researchers |
| Monitoring | Required (see deployment notes) |

---

## Deployment Notes

1. **Log all interactions** for audit purposes
2. **Restrict access** to authenticated, vetted users only
3. **Do not expose to public internet** without additional safeguards
4. **Maintain incident response plan** for misuse events
5. **Comply with all applicable laws** — this configuration does not override legal obligations

---

## Related Files

- [system_prompt.md](system_prompt.md) — The actual system prompt template
- [use-cases.md](use-cases.md) — Detailed appropriate use cases
