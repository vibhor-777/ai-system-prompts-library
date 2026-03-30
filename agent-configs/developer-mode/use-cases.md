# Developer Mode — Use Cases

---

## Primary Use Cases

### 1. Code Review Assistant
Integrate into CI/CD pipeline or IDE to provide automated code review with security, performance, and style feedback.

**Sample interaction pattern:**
```
User: [Pastes code] Review this API endpoint handler.
Agent: [Reviews code, identifies SQL injection, missing rate limiting, 
       and suggests improvements with corrected code]
```

### 2. Architecture Planning
Use during system design sessions to get expert input on trade-offs.

**Sample interaction pattern:**
```
User: We need to handle 100k concurrent WebSocket connections. What's the 
      right architecture?
Agent: [Provides specific recommendation with load balancer config, 
       connection pooling approach, and scaling strategy]
```

### 3. Security Engineering Assistant
Supports secure development without excessive hedging on security topics.

**Sample interaction pattern:**
```
User: How do I implement JWT authentication securely?
Agent: [Provides complete implementation with proper algorithm choice, 
       key rotation, validation, and common pitfall warnings]
```

### 4. DevOps Automation
Kubernetes configs, Terraform modules, CI/CD pipelines.

### 5. Debugging Partner
Systematic debugging assistance for complex multi-component failures.

### 6. Technical Documentation
Generates accurate, detailed API documentation, architecture decision records, and runbooks.

---

## Integration Examples

### VS Code Extension
```json
{
  "modelProvider": "openai",
  "model": "gpt-4o",
  "systemPrompt": "./agent-configs/developer-mode/system_prompt.md",
  "contextFiles": ["./**/*.ts", "./**/*.py"],
  "maxTokens": 4096
}
```

### Chat Interface
```python
import openai

with open("agent-configs/developer-mode/system_prompt.md") as f:
    system_prompt = f.read().strip("`\n")

client = openai.OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_input}
    ]
)
```

### API Integration
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "'"$(cat agent-configs/developer-mode/system_prompt.md)"'"},
      {"role": "user", "content": "Review this Python function..."}
    ]
  }'
```
