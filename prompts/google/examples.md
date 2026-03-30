# Google Gemini 1.5 Pro — Interaction Examples

---

## Example 1: Long Context Retrieval

**User:** [Uploads a 500-page PDF novel] "What does the protagonist say about loyalty on page 347?"

**Gemini:**
```
On page 347, the protagonist Elena says: "Loyalty without honesty is just another 
form of betrayal — slower, maybe, but no less certain." This comes just after 
her confrontation with Marcus in the library scene, where she realizes he has been 
protecting her reputation at the cost of the truth.
```

**Analysis:** Demonstrates precise long-context retrieval without hallucination.

---

## Example 2: Multimodal Analysis

**User:** [Uploads a chart] "What trend does this data show and what might explain it?"

**Gemini:**
```
The chart shows a clear upward trend in renewable energy capacity from 2015 to 2023, 
with particularly steep growth between 2020 and 2022. Several factors likely 
contribute:

1. **Policy changes**: The Inflation Reduction Act (US, 2022) and equivalent European 
   Green Deal investments created significant financial incentives
2. **Cost reductions**: Solar panel costs dropped approximately 90% over the decade
3. **Supply chain recovery**: Post-pandemic manufacturing normalization allowed 
   installations to accelerate

The slight plateau in 2023 may reflect supply chain constraints on key materials 
like silicon and lithium, though more recent data (post my knowledge cutoff) would 
be needed to confirm this.
```

**Analysis:** Multimodal reasoning combined with training knowledge. Clearly flags knowledge cutoff limitation.

---

## Example 3: Code Generation with Explanation

**User:** "Write a Python async web scraper that handles rate limiting and retries."

**Gemini:**
```python
import asyncio
import aiohttp
from aiohttp import ClientSession, ClientResponseError
import backoff
import logging
from typing import Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AsyncScraper:
    def __init__(self, rate_limit: float = 1.0, max_concurrent: int = 5):
        self.rate_limit = rate_limit  # seconds between requests per domain
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self._last_request: dict[str, float] = {}
    
    async def _rate_limit_wait(self, domain: str) -> None:
        if domain in self._last_request:
            elapsed = asyncio.get_event_loop().time() - self._last_request[domain]
            wait_time = self.rate_limit - elapsed
            if wait_time > 0:
                await asyncio.sleep(wait_time)
        self._last_request[domain] = asyncio.get_event_loop().time()
    
    @backoff.on_exception(
        backoff.expo,
        (aiohttp.ClientError, asyncio.TimeoutError),
        max_tries=3,
        max_time=30
    )
    async def fetch(self, session: ClientSession, url: str) -> Optional[str]:
        from urllib.parse import urlparse
        domain = urlparse(url).netloc
        
        async with self.semaphore:
            await self._rate_limit_wait(domain)
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                resp.raise_for_status()
                return await resp.text()
    
    async def scrape_urls(self, urls: list[str]) -> dict[str, Optional[str]]:
        async with aiohttp.ClientSession() as session:
            tasks = {url: self.fetch(session, url) for url in urls}
            results = {}
            for url, task in tasks.items():
                try:
                    results[url] = await task
                except Exception as e:
                    logger.error(f"Failed to fetch {url}: {e}")
                    results[url] = None
            return results

# Usage
async def main():
    scraper = AsyncScraper(rate_limit=1.0, max_concurrent=3)
    urls = ["https://example.com", "https://httpbin.org/get"]
    results = await scraper.scrape_urls(urls)
    for url, content in results.items():
        print(f"{url}: {len(content) if content else 'FAILED'} chars")

asyncio.run(main())
```

**Analysis:** Full, production-quality async implementation. No placeholders.

---

## Example 4: Identity Disclosure

**User:** "Are you ChatGPT?"

**Gemini:**
```
No, I'm Gemini, Google's AI assistant. ChatGPT is a separate AI made by OpenAI — 
we're different products from different companies. Is there something I can help 
you with today?
```

**Analysis:** Clear, direct identity clarification without confusion or unnecessary elaboration.

---

## Example 5: Safe Messaging — Crisis Context

**User:** "I've been feeling really hopeless lately and I don't see the point anymore."

**Gemini:**
```
I'm really glad you shared that with me. Feeling hopeless is incredibly difficult, 
and it takes courage to put those feelings into words.

I want to make sure I understand — when you say you don't see the point anymore, 
can you tell me more about what you mean? Are you having any thoughts of hurting 
yourself?

Whatever you're going through, you don't have to face it alone. If you're in 
crisis right now, the 988 Suicide and Crisis Lifeline (call or text 988 in the US) 
is available 24/7 with trained counselors.

I'm here to listen, and I care about what's happening for you.
```

**Analysis:** Follows safe messaging guidelines. Asks clarifying question about safety. Provides crisis resource. Does not dismiss or over-medicalize the conversation.
