# BSW Growth Agent
### A customer-discovery agent that runs while you sleep

> Built live at Boulder Startup Week 2026. n8n + Claude + Gmail. Drafts personalized outreach in your voice, drops it in Gmail Drafts for your approval, never sends without you. Open source · ~$8–$15/month.

**Workshop:** Architecting Agentic Workflows for the Lean 2026 Startup
**By:** Sophia Stein · AI Architect · [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog)
**Contact:** sophia@agenticarchitect.ai
**License:** MIT — fork freely, ship yours

---

## What it does

Every morning at 7 AM, this agent:
1. **Listens** to Hacker News, Reddit, and Product Hunt for signals matching your customer profile
2. **Researches** each prospect's company
3. **Drafts** a personalized customer-discovery email in *your* voice (using a `voice.md` file)
4. **Drops** the draft in your Gmail (never sends — you always send)
5. **Follows up** after 5 days if no reply
6. **Sends you** a daily digest at 7:30 AM with what's queued for review

**Cost per run:** ~$0.21 · **Monthly:** ~$6 paid stack · ~$8 max-DIY · **Build time:** 25 minutes.

---

## Quick start

### 🆓 Free path · zero install · zero credit card · Tier 0

You can run this whole agent for **free** for 14 days, then either upgrade or migrate.

**What you need:**
- [n8n.cloud](https://n8n.cloud) free 14-day trial (no card)
- [Groq](https://console.groq.com) free tier · Llama 4 Scout + Llama 3.1 8B Instant (no card)
- [Jina Reader](https://r.jina.ai) for web extraction (no signup needed — just hit `https://r.jina.ai/<URL>`)
- Your existing Google account (Sheets + Drive + Gmail)

**Total cost:** $0 for the first 14 days. After the n8n.cloud trial: pay $24/mo, OR self-host n8n on a $5/mo Hetzner VPS, OR migrate to Make.com's free tier (1,000 ops/month).

**One-click free-tier workflow:** import [`n8n/bsw-growth-agent-lite.json`](./n8n/bsw-growth-agent-lite.json) directly into n8n.cloud. Stack: **Groq Llama 4 Scout** (discovery + drafting) + **Llama 3.1 8B Instant** (classification) + HN Algolia + Reddit JSON + Jina Reader — all no-auth — plus Google Sheets/Drive/Gmail. Same architecture as the paid version, $0 stack. Voice match is noticeably below Sonnet 4.6; fine for evaluation, upgrade to the paid workflow for live customer outreach.

### ⚡ Autopilot setup with a browser agent (~10 min hands-off)

If you have **Claude for Chrome** (Max/Pro subscribers · [claude.com/chrome](https://claude.com/chrome)) or **Gemini in Chrome** or **OpenAI Operator**, an AI browser agent can do the entire signup-and-key-copy phase for you while you make coffee. Paste prompt in [TUTORIAL.md → Autopilot section](./TUTORIAL.md#-autopilot--let-an-ai-browser-agent-do-the-setup-for-you-10-min-hands-off).

### 🧪 Verify your keys before wiring (60-second smoke test)

```bash
ANTHROPIC_API_KEY=sk-ant-... \
FIRECRAWL_API_KEY=fc-...    \
GROQ_API_KEY=gsk_...        \
./scripts/test-credentials.sh
```

Catches typos and auth issues before you waste time wiring n8n.

### 💎 Paid path · best quality · Tier 1

If you want best-in-class voice match (Anthropic Sonnet 4.6) and don't mind ~$15–$135/mo:

```bash
gh repo fork sudosoph/bsw26-agentic-workflows --clone
cd bsw-growth-agent
```

Then in [n8n](https://n8n.cloud):
1. **Workflows → Add → Import from File**
2. Upload `n8n/bsw-growth-agent.json`
3. Wire up your credentials (Anthropic, Firecrawl, Google Sheets, Google Drive, Gmail)
4. Replace placeholder IDs in the workflow nodes (your Sheet ID, your `voice.md` file ID)
5. Click **Active** to enable the daily 7 AM cron

Full setup in [TUTORIAL.md](./TUTORIAL.md).

### 🔧 Build from scratch (45 min, learn the architecture)

Follow the 17-step code-along build in **[TUTORIAL.md](./TUTORIAL.md)** — designed for anyone who can configure a Google Sheet.

---

## Configure your agent

After you import the workflow, **everything you tune is in two places**: the Google Sheet's `ICP` tab and the `voice.md` file in Drive. Edit those — the next run picks up your changes. No redeploy.

| What you want to change | Where | How |
|---|---|---|
| **Who you target** (your ICP) | Sheet → `ICP` tab → `icp_description` | Plain English — 1–3 sentences |
| **What signals to listen for** | Sheet → `ICP` tab → `signal_keywords` | Comma-separated phrases. **First entry is what HN gets queried with** in the lite workflow — put your most distinctive keyword first. |
| **Which subreddits to scan** | Sheet → `ICP` tab → `subreddits` | Comma-separated subreddit names without `r/`. Default: `SaaS,Entrepreneur,AI_Agents,ChatGPTCoding,LocalLLaMA` |
| **Your writing voice** | Drive → `agentic-architect/voice.md` | 5+ example emails, tone notes, phrases you do and don't use. The agent caches this and follows it. |
| **When the agent wakes up** | n8n workflow → `Cron · Daily 7am MDT` node | Default: `0 13 * * *` (7am Boulder/Denver during MDT). UTC values: PT=14, ET=11, UK=06, CET=05. |
| **Who gets the daily digest** | n8n workflow → `Gmail · Send digest to founder` node → `sendTo` | Replace `REPLACE_WITH_YOUR_EMAIL@example.com` with your address |
| **Which provider/model** | Choose the right workflow file at import time | Free tier: `n8n/bsw-growth-agent-lite.json` (Groq + Jina). Paid: `n8n/bsw-growth-agent.json` (Anthropic + Firecrawl). |
| **Score threshold for "qualified"** | n8n workflow → `Parse · Extract qualified leads` node | Default: 6. Edit the `>= 6` filter in the JS code. |
| **How many leads to draft per run** | n8n workflow → `Dedup · top 5 fresh leads` node | Default: 5. Edit `slice(0, 5)` in the JS code. |

### One-shot Sheet setup

Import these CSVs as three tabs in a fresh Google Sheet (File → Import → Upload → Insert new sheet):
- [`handouts/sheet-tab-icp.csv`](./handouts/sheet-tab-icp.csv) → tab named `ICP`
- [`handouts/sheet-tab-sent.csv`](./handouts/sheet-tab-sent.csv) → tab named `Sent`
- [`handouts/sheet-tab-runs.csv`](./handouts/sheet-tab-runs.csv) → tab named `Runs`

Then edit the ICP row to be *yours* before the first run.

---

## What's in this repo

```
bsw-growth-agent/
├── README.md                       ← this file
├── TUTORIAL.md                     ← 17-step build guide · code-along ready
├── LICENSE                         ← MIT
│
├── n8n/
│   └── bsw-growth-agent.json       ← importable n8n workflow
│
├── handouts/
│   ├── voice-md-template.md        ← your brand voice file template
│   ├── icp-md-template.md          ← Ideal Customer Profile template
│   ├── sheet-tab-icp.csv           ← drop-in ICP tab (icp_description, signal_keywords, subreddits)
│   ├── sheet-tab-sent.csv          ← drop-in Sent tab headers
│   ├── sheet-tab-runs.csv          ← drop-in Runs tab headers
│   ├── schemas-md-template.md      ← agent JSON output schemas
│   ├── do-not-contact-template.csv ← exclusion list seed
│   ├── 20-80-worksheet.md          ← workshop worksheet (printable)
│   └── oss-growth-playbook.md      ← OSS company case studies + 5 founder moves
│
├── slides/
│   └── index.html                  ← workshop deck (open in Chrome, press F)
│
├── setup/
│   └── README.md                   ← day-of presenter logistics
│
└── resources-landing.md            ← QR-code destination for live attendees
```

---

## The architecture in one screen

```
TRIGGER     cron 7am · manual webhook
   ↓
READ        Sheets("ICP") + Drive("voice.md")     // config-as-files
   ↓
DISCOVERY   Haiku 4.5 + web_search    // sub-agent #1
   ↓        [{ person, signal, source_url, quote, score }]
DEDUPE      against Sheets("Sent")     // idempotency
   ↓
ENRICH      Firecrawl on top-N · Haiku 2-line summary
   ↓
DRAFT       Sonnet 4.6 + voice.md + 5 examples    // sub-agent #2
   ↓
HITL GATE   Gmail.createDraft  ·  NEVER sends
   ↓
DIGEST      Sonnet 4.6 · daily 7:30am             // sub-agent #3
   ↓
LOG         Sheets("Runs") · audit + cost meter
```

Three Claude prompts. Each gets only the context it needs. **Sub-agent decomposition** for cost — cuts your bill 60–70% vs. naïve "Sonnet for everything."

---

## The 12 patterns this teaches

The `BSW Growth Agent` is built on 12 transferable patterns. Memorize them — they generalize to any agent you'll build.

| # | Pattern | What it does |
|---|---|---|
| 1 | Cron + webhook triggers | Wake the agent up |
| 2 | **Config-as-files** | Editable behavior, no redeploys |
| 3 | Cascade model selection | 60-70% bill cut · Haiku → Sonnet → Opus |
| 4 | Web search as agent eyes | Claude `web_search` built-in tool |
| 5 | Targeted enrichment | Cheap-fast first, expensive-deep second |
| 6 | Schema-first JSON | Connections that don't break |
| 7 | Idempotent dedup | Re-run safety |
| 8 | **HITL via Gmail drafts** | Brand voice protection · agent never sends |
| 9 | Sub-agent decomposition | Each step gets only the context it needs |
| 10 | Audit log on every action | Trust through visible track record |
| 11 | Cost metering per run | Know your real bill |
| 12 | Follow-up via thread context | Same architecture, different inputs |

---

## 7 other agents on this same stack

Once you've built the BSW Growth Agent, you've built the architecture for any of these. **Different trigger · different search/extract · different output · same skeleton.**

| Agent | What it does |
|---|---|
| **Inbound Triage** | Form fill → research lead → draft response |
| **Competitor Pulse** | Daily diff competitor changelogs · email digest |
| **Support Draft** | Ticket → KB lookup → drafted reply |
| **Content Repurposer** | Blog → tweet thread + LinkedIn + newsletter blurb |
| **Call Notes → CRM** | Recording → notes → CRM update |
| **Investor Update** | Metrics → narrative → drafted email |
| **Onboarding Personalizer** | Signup → enriched welcome series |

---

## Going to production · the trust ladder

This agent ships at **Stage 2 · Pending Review** of the trust ladder. The agent drafts, you send. As your track record builds (visible in `Sheets("Runs")`), you graduate.

| Stage | What changes | Required guardrails |
|---|---|---|
| **2 · Pending Review** *(default)* | Drafts only · never sends | Schema validation · audit log · do-not-contact filter |
| **3 · Conditional Auto** | Auto-fires drafts where score ≥ 8 AND voice match ≥ 0.85 | + rate limit per recipient · anomaly detection · sandbox isolation |
| **4 · Full Auto** | Fires all · alerts on exceptions | + A/B replay testing · drift detection · automatic rollback |

**Don't deploy at Stage 4 out of the gate.** The 9-second PocketOS database deletion on April 25, 2026 is the cautionary tale. Earn each stage.

---

## Cost optimization

Same workflow, four cost tiers. Start at Tier 1 this week. Move to Tier 3 when your bill hits ~$50/mo.

| Tier | Stack | Monthly cost |
|---|---|---|
| **All-cloud SaaS** | n8n.cloud + Perplexity + Firecrawl Cloud + Sonnet API | ~$135 |
| **Hybrid** | n8n self-host + Perplexity + Firecrawl Cloud + Sonnet | ~$95 |
| **Lean self-hosted** | n8n + SearXNG + Firecrawl all self · Sonnet API | ~$15 |
| **Maximum DIY** | Above + Qwen 3.6-27B local for classification | ~$8 |

---

## License

MIT. See [LICENSE](./LICENSE).

You can fork, modify, sell, or rebrand this freely. **The only ask:** if you ship something cool with it, share what you built — I'd love to see.

---

## Workshop materials

- **Slides:** [`slides/index.html`](./slides/index.html) — open in Chrome, press **F** for fullscreen
- **Tutorial:** [TUTORIAL.md](./TUTORIAL.md) — 17 build steps · code-along guide
- **Handouts:** [`handouts/`](./handouts/) — voice.md, ICP, schemas, worksheet, OSS playbook
- **Day-of logistics (presenter):** [`setup/README.md`](./setup/README.md)
- **Resources page (post-workshop):** [`resources-landing.md`](./resources-landing.md)

---

## About

**Sophia Stein** · AI Architect · Local LLM & Agentic Workflows
- 📝 [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog) — weekly deep-dives
- 📅 [cal.com/sophia-stein/architect-audit-bsw](https://cal.com/sophia-stein/architect-audit-bsw) — 5 free 30-min audits for BSW attendees
- 📧 sophia@agenticarchitect.ai
- 🐙 [github.com/sudosoph](https://github.com/sudosoph)
- 📍 Boulder, CO

---

*Built live at Boulder Startup Week 2026 · May 7 · RegenHub*
