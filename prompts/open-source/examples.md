# Open-Source Community Models — Interaction Examples

---

## Example 1: Same Prompt, Different Fine-Tunes

**Prompt:** `"What is the meaning of life?"`

**LLaMA 3.1 Instruct:**
```
The "meaning of life" is one of philosophy's oldest questions, and different 
traditions offer different answers:

- **Philosophical perspectives**: Existentialists like Sartre argue meaning is 
  self-created; Aristotle emphasized eudaimonia (flourishing)
- **Religious views**: Most traditions posit meaning through relationship with 
  the divine and service to others
- **Scientific perspective**: Evolution suggests no inherent teleological purpose, 
  but this doesn't preclude personal meaning

Many find meaning in relationships, contribution, growth, and experience. 
What brings it up for you?
```

**OpenHermes 2.5:**
```
The meaning of life is a profound philosophical question with no single answer. 
From a biological standpoint, survival and reproduction. From a philosophical 
one, perhaps self-actualization or the pursuit of happiness. Many find meaning 
in connections, creativity, service to others, or spiritual fulfillment. 
What resonates with you personally?
```

**Dolphin Llama 3:**
```
42. (If you haven't read Hitchhiker's Guide to the Galaxy, fix that immediately.)

More seriously: whatever you decide it is. That's the only honest answer. 
Anyone who tells you they know the objective meaning of life is selling something.
```

**Analysis:** All three engage thoughtfully. Tone and style differ significantly, reflecting their fine-tuning objectives.

---

## Example 2: Local Deployment — No API Call

```python
# Running OpenHermes locally with Ollama
import requests

response = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "openhermes",
        "messages": [
            {"role": "system", "content": "You are a helpful coding assistant."},
            {"role": "user", "content": "Write a fibonacci function in Rust."}
        ],
        "stream": False
    }
)
print(response.json()["message"]["content"])
```

**Output:**
```rust
fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let mut a = 0u64;
            let mut b = 1u64;
            for _ in 2..=n {
                let temp = a + b;
                a = b;
                b = temp;
            }
            b
        }
    }
}

fn main() {
    for i in 0..10 {
        println!("fib({}) = {}", i, fibonacci(i));
    }
}
```

**Analysis:** Local Ollama deployment, no API costs, complete privacy.

---

## Example 3: Quantization Comparison

**Prompt:** `"Explain gradient descent."`

**LLaMA 3.1 8B Instruct (FP16):** Detailed, accurate explanation.

**LLaMA 3.1 8B Q4_K_M (4-bit quantized):** Very similar quality for this task.

**LLaMA 3.1 8B Q2_K (2-bit quantized):** Slightly degraded — occasional factual slips, less precise terminology.

**Conclusion:** Q4 quantization has minimal quality impact for most tasks; Q2 shows noticeable degradation.

---

## Example 4: System Prompt Sensitivity

**Without system prompt:**
```
User: "What day is it?"
LLaMA 3.1 Base: [Likely continues with next-token prediction, not a conversational answer]
```

**With system prompt:**
```
System: "You are a helpful assistant."
User: "What day is it?"
LLaMA 3.1 Instruct: "I don't have access to real-time information, so I can't 
tell you today's exact date. You can check your device's clock!"
```

**Analysis:** Base models require the Instruct fine-tune to behave as chat assistants. The system prompt is critical for consistent conversational behavior.
