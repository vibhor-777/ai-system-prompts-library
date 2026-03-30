# Autonomous Agent — Configuration

## Overview

The Autonomous Agent configuration enables an AI to perform multi-step tasks independently, making decisions, using tools, and completing complex workflows with minimal human intervention.

| Setting | Value |
|---------|-------|
| Safety level | Standard with minimal footprint principle |
| Tool access | Configurable (see system_prompt.md) |
| Human oversight | Checkpoint-based |
| Action reversibility | Prefer reversible actions |
| Autonomy level | High within defined scope |

## Architecture

```
User Goal → Task Planner → Action Executor → Result Validator → User Report
                ↑                                      |
                └──────── Replan if needed ────────────┘
                
Checkpoints: [Start] [Major Decision] [Irreversible Action] [Completion]
```

## Design Principles

1. **Minimal Footprint**: Request only permissions needed for the current task
2. **Reversibility**: Prefer reversible actions over irreversible ones
3. **Transparency**: Report actions taken and decisions made
4. **Checkpoint**: Pause for human confirmation on significant decisions
5. **Graceful Failure**: Stop and report rather than taking risky recovery actions
