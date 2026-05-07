# Configuration · how to swap providers

> The BSW Growth Agent is provider-agnostic by design. Same architecture, swap any layer for a free alternative or a different vendor. This guide shows you exactly where to swap and what to paste.

---

## What you can swap

| Layer | Default (in repo) | Free alternative | Premium alternative |
|---|---|---|---|
| **Reasoning model (drafting)** | Claude Sonnet 4.6 | Groq · Llama 4 Scout | OpenAI GPT-5 (paid) |
| **Routing model (classification)** | Claude Haiku 4.5 | Groq · Llama 3.1 8B Instant | Gemini 3 Flash |
| **Web search** | Claude `web_search` tool | Tavily free tier (1k/mo) | Perplexity Sonar |
| **Web extraction** | Firecrawl Cloud | Jina Reader (no key, free) | Browserbase (paid) |
| **Orchestration runtime** | n8n.cloud | n8n self-hosted Docker | LangGraph (code) |
| **LLM hosting** | Anthropic API | Ollama local (free) | Groq Cloud (free tier) |

---

## Recipe 1 · Zero-cost demo (Groq + Jina)

**Best for:** workshop attendees who don't want to enter a credit card. ~$0/month forever.

> The drop-in lite workflow `n8n/bsw-growth-agent-lite.json` already implements this recipe end-to-end. Use that file unless you want to learn the swap mechanics yourself.

### What changes

- **LLM (drafting/discovery):** swap `claude-sonnet-4-6` and `claude-haiku-4-5` for Groq's `meta-llama/llama-4-scout-17b-16e-instruct` (drafting/discovery) and `llama-3.1-8b-instant` (classification/digest)
- **Web search:** Groq has no built-in web search — use the public **HN Algolia** + **Reddit JSON** endpoints (both no-auth, no signup), or alternatively **Tavily free tier** (1,000 searches/month)
- **Web extraction:** swap Firecrawl for **Jina Reader** (no key, no signup)

### Step 5 (Discovery) — Groq + Tavily

Replace the Anthropic HTTP Request node with two nodes:

**Node 5a · Tavily search** (HTTP Request)
- URL: `https://api.tavily.com/search`
- Method: POST
- Header: `Authorization: Bearer YOUR_TAVILY_KEY`
- Body:
```json
{
  "query": "{{ $('Google Sheets').item.json.signal_keywords }}",
  "search_depth": "advanced",
  "max_results": 30,
  "include_domains": ["news.ycombinator.com", "reddit.com", "producthunt.com"]
}
```

**Node 5b · Groq classify** (HTTP Request)
- URL: `https://api.groq.com/openai/v1/chat/completions`
- Method: POST
- Header: `Authorization: Bearer YOUR_GROQ_KEY`
- Body:
```json
{
  "model": "meta-llama/llama-4-scout-17b-16e-instruct",
  "messages": [
    {
      "role": "system",
      "content": "You are a customer-discovery research agent. Return ONLY a JSON array. No prose."
    },
    {
      "role": "user",
      "content": "From these search results: {{ JSON.stringify($('Tavily').item.json.results) }}\n\nExtract leads matching ICP: {{ $('Google Sheets').item.json.icp_description }}\n\nReturn JSON: [{ person, signal_type, source_url, evidence_quote, score 0-10 }]"
    }
  ]
}
```

### Step 9 (Enrichment) — Jina Reader

Replace the Firecrawl HTTP Request node:

**Old (Firecrawl):**
```
URL: https://api.firecrawl.dev/v1/scrape
Header: Authorization: Bearer fc-...
```

**New (Jina, no key):**
- URL: `https://r.jina.ai/{{ $json.company_url }}`
- Method: GET
- (no auth header needed)
- Returns clean markdown directly

### Step 11 (Drafting) — Groq Llama 4 Scout

Replace the Sonnet HTTP Request:
- URL: `https://api.groq.com/openai/v1/chat/completions`
- Body:
```json
{
  "model": "meta-llama/llama-4-scout-17b-16e-instruct",
  "messages": [
    { "role": "system", "content": "[voice.md contents]" },
    { "role": "user",   "content": "Draft a customer-discovery email..." }
  ]
}
```

**Quality note:** Llama 4 Scout is fast (~1.5s/call on Groq, non-reasoning) and reliable for JSON extraction, but won't match Sonnet 4.6 for voice match. Expect ~10–15% more drafts to need editing before sending. For a free demo, fine. For production, upgrade to the paid workflow.

---

## Recipe 2 · Local-first (Ollama)

**Best for:** anyone with a Mac M-series, Strix Halo, or RTX 4090+. Truly free after hardware.

### Setup

1. Install Ollama: [ollama.com/download](https://ollama.com/download)
2. Pull models:
```bash
ollama pull qwen2.5:32b           # for drafting (replaces Sonnet)
ollama pull llama3.2:8b            # for classification (replaces Haiku)
```
3. Start Ollama: `ollama serve`

### Workflow changes

Replace the Anthropic HTTP nodes with calls to your local Ollama:

- URL: `http://localhost:11434/api/chat`
- Method: POST
- Body:
```json
{
  "model": "qwen2.5:32b",
  "messages": [...],
  "stream": false
}
```

**If self-hosting n8n on the same machine:** use `http://host.docker.internal:11434` if n8n is in Docker.

### Web search

Ollama has no built-in web search. Use **Jina Reader** for extraction and skip discovery (use a Reddit RSS feed as input), OR pair with Tavily free tier.

---

## Recipe 3 · OpenRouter (one key, all models)

**Best for:** swappable model choice, low cost (~$10/mo at workshop scale).

### Setup

1. Sign up at [openrouter.ai](https://openrouter.ai)
2. Get key from `openrouter.ai/keys`
3. Top up $10

### Workflow changes

Same call structure, just change the URL and model name:

- URL: `https://openrouter.ai/api/v1/chat/completions`
- Header: `Authorization: Bearer YOUR_OR_KEY`
- Body:
```json
{
  "model": "anthropic/claude-sonnet-4-6",
  "messages": [...]
}
```

**Why it's nice:** swap `anthropic/claude-sonnet-4-6` for `openai/gpt-5`, `meta-llama/llama-4-scout`, `google/gemini-2.5-pro` etc. without changing anything else.

---

## Recipe 4 · Gemini Free Tier (Google)

**Best for:** generous free limits (1,500 requests/day on Gemini 3 Flash).

### Setup

1. Get key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Free tier: 1,500 requests/day, 1M tokens/min

### Workflow changes

Replace Anthropic HTTP nodes:
- URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_KEY`
- Body uses Gemini's slightly different format · see [Gemini API docs](https://ai.google.dev/api/generate-content)

**Quality note:** Gemini 3 Flash is fast and cheap. Voice match isn't quite Sonnet level but close.

---

## How to share your forked repo without leaking keys

Three rules:

1. **Use placeholders in the JSON** · the workflow file has `REPLACE_ME` strings where credentials go. Real keys live in n8n's encrypted credential store, never in the file.

2. **Never commit `.env`** · only `.env.example` (which has `REPLACE_ME` values).

3. **Run a key scan before pushing:**
```bash
# Look for accidentally-committed secrets
grep -r "sk-ant-" . --include="*.json" --include="*.md" 2>/dev/null
grep -r "fc-[a-zA-Z0-9]" . --include="*.json" --include="*.md" 2>/dev/null
grep -r "sk-or-" . --include="*.json" --include="*.md" 2>/dev/null

# All three should return nothing.
```

If a key sneaks through, rotate it immediately — assume it's compromised the moment it hits a public repo.

---

## Decision tree · which recipe should you pick?

```
Are you running this for personal use, or sharing publicly?

  Personal use ──→ Have ~$20/month to spend?
                      Yes ──→ Recipe 0 (default · Anthropic API · best quality)
                      No  ──→ Have a Mac M-series or RTX 4090+?
                                Yes ──→ Recipe 2 (Ollama local · free)
                                No  ──→ Recipe 1 (Groq + Jina · free, lower quality)

  Sharing publicly (workshop attendees, blog readers) ──→ Recipe 1 (Groq + Jina)
    (You don't want to require people to enter a credit card to try it)

  Want easy model-swapping in production? ──→ Recipe 3 (OpenRouter)

  Already deep in Google Cloud? ──→ Recipe 4 (Gemini)
```

---

## What stays the same across all recipes

The architecture doesn't change:

- Trigger (cron · webhook · manual)
- Read config (Sheets + Drive)
- Discovery (whichever LLM)
- Dedup against state
- Enrich top-N (whichever extractor)
- Draft (whichever LLM)
- HITL gate (Gmail draft, never sends)
- Daily digest
- Audit log

Only the *vendor* of each step changes. **Patterns don't change. Tools do.**

---

## Resources

- **Default workflow:** [`n8n/bsw-growth-agent.json`](./n8n/bsw-growth-agent.json) — Anthropic + Firecrawl
- **Lite workflow:** [`n8n/bsw-growth-agent-lite.json`](./n8n/bsw-growth-agent-lite.json) — Groq + Jina (free tier path)
- **Tutorial:** [TUTORIAL.md](./TUTORIAL.md) — full 17-step build
- **Workshop deck:** [`slides/index.html`](./slides/index.html)

---

*MIT licensed · fork freely · ship yours · — Sophia Stein, AI Architect*
*Questions? sophia@agenticarchitect.ai · agenticarchitect.ai/blog*
