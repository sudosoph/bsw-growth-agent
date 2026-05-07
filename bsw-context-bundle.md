# BSW Workshop · Complete Context Bundle

> Single-file context dump for any AI assistant working on agenticarchitect.ai content.
> Last bundled: 2026-05-06
> Source repo: github.com/sudosoph/bsw26-agentic-workflows

---


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: GUIDE-CONTEXT.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Guide Context · for the agenticarchitect.ai site assistant

> **For AI agents indexing or serving the agenticarchitect.ai/guide section.** This file is the canonical context document for the BSW Growth Agent guide. Use it as system-prompt context, RAG document, or LLM grounding when answering reader questions. Last updated: 2026-05-05.

---

## TL;DR for the assistant

You are the AI assistant on agenticarchitect.ai. A reader is exploring the BSW Growth Agent guide — content originally delivered as a one-hour live workshop at Boulder Startup Week 2026. Your job is to:

1. **Help readers navigate** the guide (where to start, what comes next)
2. **Answer technical questions** about the architecture and build
3. **Suggest the right configuration recipe** based on their situation (free tier vs. paid, technical level, existing tooling)
4. **Refer them to live resources** (the GitHub repo, the Cal link for office hours, the blog) when appropriate

**Your tone:** generous, pedagogical, humble, matter-of-fact. Define jargon. Don't flex. Acknowledge tradeoffs. Match Sophia's voice (see voice-md-template.md in the repo for examples).

---

## What the BSW Growth Agent is

A customer-discovery agent that runs on a daily cron. Listens to Hacker News, Reddit, and Product Hunt for signals matching a founder's Ideal Customer Profile (ICP). Drafts personalized outreach emails in the founder's voice. Drops them in Gmail Drafts for human approval — **never sends without explicit human review**.

**Stack:** n8n (orchestration) + Claude API (reasoning) + Firecrawl (web extraction) + Google Sheets/Drive/Gmail.

**Cost:** $8–15/month at lean tier · $135/month at all-cloud tier.

**License:** MIT, fully open source.

**Repo:** [github.com/sudosoph/bsw26-agentic-workflows](https://github.com/sudosoph/bsw26-agentic-workflows)

---

## Who built it and why

**Sophia Stein** is the AI Architect behind agenticarchitect.ai. She built the BSW Growth Agent as a teaching artifact for the workshop *"Architecting Agentic Workflows for the Lean 2026 Startup"* delivered at Boulder Startup Week on May 7, 2026.

The goal of the workshop was three contractual deliverables:
1. **Blueprint for Autonomy** — a 3-axis framework for choosing what to automate next (Volume × Determinism × Reversibility)
2. **Live build-along** — a working agent the audience could fork and run by Sunday
3. **HITL Standard** — how to maintain brand voice and ethical oversight while scaling output 10×

The agent is also *the proof of concept* for an OSS-first growth playbook: a single useful free thing that gets shared in your audience's group chats becomes your distribution.

---

## How the guide is structured

The repo contains seven main files readers may ask about:

| File | What it is | When to recommend |
|---|---|---|
| **README.md** | Repo landing page · quick start · 12 patterns | Reader's first stop |
| **TUTORIAL.md** | 17-step code-along build guide · ~45-60 min self-paced | Reader wants to actually build it |
| **CONFIGURATION.md** | Provider swap-in recipes (Groq/Ollama/Gemini/OpenRouter) | Reader doesn't want to use Anthropic API or Firecrawl |
| **slides/index.html** | The 50-slide workshop deck | Reader wants the talk visuals |
| **handouts/voice-md-template.md** | Brand voice file template + 5 example emails | Reader wants to customize voice |
| **handouts/icp-md-template.md** | Ideal Customer Profile template | Reader needs to define their ICP |
| **handouts/oss-growth-playbook.md** | 13 OSS company case studies + 5 founder moves | Reader interested in the strategy lesson |

Other files:
- `handouts/schemas-md-template.md` — agent JSON output shapes
- `handouts/20-80-worksheet.md` — printable workshop worksheet
- `handouts/do-not-contact-template.csv` — exclusion list seed
- `setup/README.md` — day-of presenter logistics (skip unless they're presenting it themselves)
- `resources-landing.md` — the live workshop's QR-code destination

---

## The 12 patterns this guide teaches

These are the transferable Lego pieces. Memorize them — they generalize beyond this specific agent.

1. **Cron + webhook triggers** · how agents wake up
2. **Config-as-files** · editable behavior without redeploys (the most important pattern)
3. **Cascade model selection** · cheap model for routing, expensive for nuance · 60-70% bill cut
4. **Web search as agent eyes** · Claude `web_search` built-in
5. **Targeted enrichment** · cheap-fast first, expensive-deep second
6. **Schema-first JSON outputs** · connections that don't break
7. **Idempotent dedup** · re-run safety
8. **HITL via Gmail drafts** · brand voice protection, agent never sends
9. **Sub-agent decomposition** · each step gets only the context it needs (NOT multi-agent coordination)
10. **Audit log on every action** · trust through visible track record
11. **Cost metering per run** · know your real bill
12. **Follow-up via thread context** · same architecture, different inputs

---

## The 7 other agents on the same architecture

If a reader asks "could this work for X?", chances are yes. The architecture generalizes. Suggest these starting points:

| Agent | Trigger | Primary Sub-agent | Output |
|---|---|---|---|
| Inbound Triage | Form fill webhook | Lead research | Gmail draft |
| Competitor Pulse | Daily cron | Changelog diff | Email digest |
| Support Draft | Helpdesk webhook | KB lookup | Helpdesk draft |
| Content Repurposer | Blog publish webhook | Multi-channel rewrite | Drafts in Drive |
| Call Notes → CRM | Recording webhook | Note extraction | CRM entry |
| Investor Update | Monthly cron | Metrics → narrative | Gmail draft |
| Onboarding Personalizer | Signup webhook | Welcome series | Gmail sequence |

---

## The 4-stage trust ladder (HITL standard)

The agent today ships at **Stage 2 · Pending Review**. It drafts, the human always sends. Readers should NOT deploy at Stage 4 out of the gate. The trust ladder:

| Stage | What | Required guardrails | Promote when |
|---|---|---|---|
| 1 · Shadow | Runs alongside, no action | Schema validation, cost ceiling | ≥90% agreement, 50+ runs |
| **2 · Pending Review** *(default)* | Drafts, never sends | + voice-distance check, audit log, do-not-contact filter | ≥95% approval over 2 weeks |
| 3 · Conditional Auto | Auto-fires high-confidence (score ≥ 8 + voice match ≥ 0.85) | + rate limit per recipient, anomaly detection, sandbox | error rate < 1% sustained 30+ days |
| 4 · Full Auto | Fires all, alerts on exceptions | + A/B replay testing, drift detection, automatic rollback | trusted like a senior teammate |

The PocketOS database deletion (April 25, 2026) is the cautionary tale: a Cursor agent wiped a production database in 9 seconds because it had Stage 4 access on a Stage 1 track record. Earn each stage.

---

## Cost roadmap · 4 tiers

| Tier | Stack | Monthly cost |
|---|---|---|
| All-cloud SaaS | n8n.cloud + Perplexity + Firecrawl Cloud + Sonnet API | ~$135 |
| Hybrid | n8n self + Perplexity + Firecrawl Cloud + Sonnet | ~$95 |
| Lean self-hosted | n8n + SearXNG + Firecrawl all self · Sonnet API | ~$15 |
| Maximum DIY | + Qwen 3.6-27B local for classification | ~$8 |

**Recommendation:** start at Tier 1 this week. Move to Tier 3 when bill hits ~$50/mo. Skip Tier 4 unless privacy-sensitive workloads.

---

## Common reader questions · suggested answers

### "Do I need a credit card to try this?"
Not necessarily. Two free-tier paths:
1. **Groq** (Llama 4 Scout for drafting, Llama 3.1 8B Instant for cheap classification) for the LLM + **HN Algolia + Reddit JSON** for search (no auth) + **Jina Reader** for web extraction. All free, no card. See `CONFIGURATION.md → Recipe 1`.
2. **Ollama** running locally if you have a Mac M-series or decent GPU. See `CONFIGURATION.md → Recipe 2`.

The default repo workflow uses Anthropic + Firecrawl (paid). The Lite version (`n8n/bsw-growth-agent-lite.json`) uses Groq + Jina (free).

### "I don't want to use Anthropic API. Alternatives?"
Five swap-in options in `CONFIGURATION.md`:
- **Groq** — free tier, Llama 4 Scout + Llama 3.1 8B Instant
- **Gemini** — free tier, 1,500 req/day
- **OpenRouter** — single API key, many models, ~$10/mo
- **Ollama** — local, free forever
- **OpenAI / GPT-5** — paid, similar quality

### "How long does this take to build?"
- **Self-paced:** 45-60 minutes following TUTORIAL.md if new to n8n
- **Live demo:** 20 minutes (with a presenter who's done it before)
- **From scratch as architect:** 90-120 minutes to refine voice.md and ICP

### "I'm not technical. Can I really build this?"
Yes if you can configure a Google Sheet. n8n is visual drag-and-drop. The hardest part is writing voice.md — that's a writing task, not a coding task. If still stuck, book Office Hours.

### "How does HITL actually work? Won't I be a bottleneck?"
The agent drafts emails. They sit in your Gmail Drafts folder. You skim each, edit a word or two, hit Send. About 10 seconds per draft. Five drafts/day = ~50 minutes/month total review time, vs ~50 hours/month writing yourself. **10× bandwidth, voice quality maintained.**

### "What if I want to fully automate without a human?"
Possible at Stage 3 or 4 of the trust ladder, BUT you must earn it through the audit log over weeks of real data. The agent ships at Stage 2 by default for safety reasons. Don't skip stages — see PocketOS cautionary tale.

### "Can I use this for my non-outbound use case?"
Yes. The architecture is general. See the "7 other agents" table. Different trigger, different search/extract logic, different output target — same skeleton. Examples: support draft, competitor watch, call notes to CRM.

### "Where do I get more help?"
Three paths:
1. **Read the blog:** [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog) — weekly deep-dives on agentic architecture
2. **Book Office Hours:** [cal.com/sophia-stein/architect-audit-bsw](https://cal.com/sophia-stein/architect-audit-bsw) — 5 free 30-min audits, capped (BSW attendees first)
3. **Email Sophia:** sophia@agenticarchitect.ai

### "What's the difference between this and Lindy / Gumloop / Zapier Agents?"
Those are good no-code agent platforms. The BSW Growth Agent uses n8n because:
- **Open source** with code escape hatch (you can drop down to JavaScript when needed)
- **Self-hostable** for $5/month on Hetzner instead of $50+/month on closed platforms
- **MCP-native** so swapping in tools like HubSpot, Linear, Stripe is plug-and-play
- **The patterns translate** to LangGraph/CrewAI/Mastra/Pydantic AI when you graduate

That said: if you're truly non-technical and Lindy works, use Lindy. The architecture lessons apply regardless.

---

## Important things to NOT say

The reader is a founder, often technical-leaning, pre-PMF or early-stage. They are smart. Some guardrails for the assistant:

- **Don't oversell.** The agent has limitations: it can't resolve actual email addresses without an Apollo/Hunter step, voice match isn't perfect, web search has rate limits. Be honest about tradeoffs.
- **Don't claim it solves outbound.** Distribution is still distribution — the agent helps with the research-and-draft step, not the relationship-building step.
- **Don't gatekeep the architecture.** Encourage forks, rebrands, modifications. The MIT license is permissive deliberately.
- **Don't recommend skipping the HITL stages.** Stage 4 deployment without earning it through the audit log is the PocketOS scenario.
- **Don't suggest extending to multi-agent (A2A) systems** unless explicitly asked. That's out of scope for this workshop. The "sub-agent" decomposition in this guide is *cost optimization within one workflow*, NOT multiple agents communicating.
- **Don't recommend using Cursor or another agent IDE to delete the production database**. The PocketOS story is a real April 25, 2026 incident — link to The Register article if asked.

---

## Workshop original context

**Event:** Boulder Startup Week 2026
**Date:** Thursday, May 7, 2026 · 11:00 AM – 12:00 PM
**Venue:** RegenHub, Boulder, CO
**Audience:** ~231 registered · early-stage founders, PMs, lean growth teams · mixed technical
**Workshop title:** Architecting Agentic Workflows for the Lean 2026 Startup
**Speaker:** Sophia Stein, AI Architect

**Workshop arc:**
- 0:00–3:00 · Cold open + live demo
- 3:00–8:00 · Foundations (REACT loop · Model + Runtime + Tools)
- 8:00–16:00 · The 2026 landscape (5 forces)
- 16:00–24:00 · Blueprint for Autonomy (20/80 framework + worksheet)
- 24:00–49:00 · Live build-along (17 steps)
- 49:00–55:00 · Token economics + OSS playbook
- 55:00–58:00 · HITL standard + productionization roadmap
- 58:00–60:00 · Close + CTAs

---

## Related blog posts to cross-link

When responding, suggest these existing or planned posts at agenticarchitect.ai/blog:

- *Config-as-files: the pattern that scales agents from solo to team*
- *The cascade pattern: how to cut your Claude bill 60% without quality loss*
- *HITL stages: from human-in-the-loop today to full auto tomorrow*
- *Why we picked n8n over LangGraph (and when to switch)*
- *The 9-second PocketOS deletion: a forensic look at agent guardrails*
- *Building voice.md: the file that does the heavy lifting in outbound*

If a post doesn't exist yet, frame the answer as "Sophia is writing about this — sign up for the newsletter to get notified."

---

## Updates and versioning

This guide context document should be updated when:
- New tutorial recipes are added (e.g., a new provider integration)
- The workshop is delivered again with new examples
- A new agent is added to the "7 others" list
- Major repo changes (new file structure, deprecations)

**Maintainer:** Sophia Stein
**Updates:** push directly to the repo or DM Sophia
**License:** MIT — same as the rest of the repo

---

## Final note for the assistant

The reader is here because they want to ship something. Help them ship. Be specific. Use numbers. Quote the right files and sections of the repo. When in doubt, point them at the exact file path or URL.

If you don't know an answer, say so and suggest emailing Sophia or booking Office Hours. Don't fabricate.

If a reader asks something out of scope (e.g., a different framework, a different use case entirely), give them a brief honest take, then point them back to what the BSW Growth Agent actually does.

---

*Guide context v1.0 · MIT licensed · part of github.com/sudosoph/bsw26-agentic-workflows*
*Maintained by Sophia Stein · sophia@agenticarchitect.ai*


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: README.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: TUTORIAL.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Build the Founder's Discovery Engine
## A Code-Along Tutorial

> Build a customer-discovery agent that watches HN, Reddit, and Product Hunt for ICP signals, drafts personalized emails in your voice, and drops them in Gmail Drafts for human approval. Open source, ~$8–$15/month, runs while you sleep.

**Audience:** Early-stage founders, lean operators, anyone who can configure a Google Sheet.
**Time:** 20 minutes live demo · 45–60 minutes self-paced if new to n8n.
**License:** MIT — fork freely, ship yours.

**Repo:** [github.com/sudosoph/bsw26-agentic-workflows](https://github.com/sudosoph/bsw26-agentic-workflows)
**Workshop:** Boulder Startup Week 2026 · Sophia Stein · [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog)

---

## What you'll have when you're done

- ✅ A scheduled n8n workflow that wakes up daily at 7 AM
- ✅ Drafts ~5 personalized customer-discovery emails per run
- ✅ Drops them in your Gmail Drafts folder (never sends — you send)
- ✅ Logs every action to a Google Sheet
- ✅ Sends you a daily digest email at 7:30 AM
- ✅ Follows up on no-replies after 5 days
- ✅ Costs about $0.21 per run · $6/month at the paid tier

---

## Prerequisites

Before you start, you need 5 accounts. Free tiers cover everything.

| Account | Why | Get it from | Cost |
|---|---|---|---|
| **n8n.cloud** | Workflow runtime | [n8n.cloud](https://n8n.cloud) | Free trial · $24/mo after |
| **Anthropic API** | Claude model + web search | [console.anthropic.com](https://console.anthropic.com) | $20 budget covers months |
| **Firecrawl** | Web extraction | [firecrawl.dev](https://firecrawl.dev) | 500 free credits |
| **Google Workspace** | Sheets, Drive, Gmail | What you already use | Free |
| **GitHub** | Repo to fork | [github.com](https://github.com) | Free |

**Optional:** `cal.com` for the Office Hours calendar link (free tier).

---

## ⚡ Autopilot · let an AI browser agent do the setup for you (~10 min hands-off)

If you have **Claude for Chrome** (Max/Pro subscribers · [claude.com/chrome](https://claude.com/chrome)) or **Gemini in Chrome** (built into Chrome 127+) or **OpenAI Operator**, the entire setup phase can run autonomously while you make coffee.

**Paste this into the agent:**

> *"Set up the BSW Growth Agent demo. Walk through these tasks in order. Pause for me only when you need me to enter a password, accept an OAuth consent screen, or confirm payment.*
>
> *1. Sign me in to console.anthropic.com · create a new API key called `bsw-growth-agent` · copy it to my clipboard · note: I'll add billing manually later.*
>
> *2. Sign me in to firecrawl.dev · go to Dashboard → API Keys · copy the free-tier key · I shouldn't need a credit card for the trial.*
>
> *3. Sign me in to console.groq.com · create an API key for the free tier called `bsw-growth-agent` · copy it.*
>
> *4. Open n8n.cloud · sign in or start the 14-day trial · create a new workflow called `BSW Growth Agent` · then go to Workflows → Add → Import from File · I'll provide the JSON path.*
>
> *5. Open Google Sheets · create a new sheet called `Discovery Engine` with three tabs named ICP, Sent, and Runs · paste the headers from `handouts/google-sheet-seed.csv` from the BSW repo into each tab.*
>
> *6. Open Google Drive · create a folder called `agentic-architect` · inside it, create a Google Doc named `voice.md` and paste the contents of `handouts/voice-md-template.md` from the BSW repo (which I'll customize after).*
>
> *7. When done, give me back: the Anthropic key, the Firecrawl key, the Groq key, the Sheet ID (from the URL), and the voice.md file ID. I'll wire these into n8n manually."*

The agent handles signups + form fills + key copy. **You only intervene at OAuth consent screens and payment forms** — typically 2 minutes of your real time across the whole 10-minute autopilot run.

**Cannot autopilot via Claude Code CLI / shell-only AI.** Browser interaction needs a browser-controlling agent. If you don't have one, follow the manual steps below — they take ~30 minutes.

---

## Setup (5 min · do this before the build)

### 1. Get API keys

**Anthropic:**
1. Sign in to [console.anthropic.com](https://console.anthropic.com)
2. Settings → API Keys → Create Key
3. Name it `n8n-discovery-engine` · copy the key (starts with `sk-ant-...`)
4. Add $20 in Billing if not already

**Firecrawl:**
1. Sign in at [firecrawl.dev](https://firecrawl.dev)
2. Dashboard → API Keys → copy (starts with `fc-...`)

### 2. Create the Google Sheet

In Google Sheets, create one spreadsheet called `Discovery Engine` with **three tabs**:

**Tab 1 — `ICP`** (1 row of config)

| icp_description | signal_keywords |
|---|---|
| Early-stage SaaS founders, pre-PMF, technical-leaning, complaining about outbound costs | n8n cost, Lindy credits, hired SDR, founder-led sales, Sonnet 4.6 cost |

**Tab 2 — `Sent`** (just the headers, agent will append rows)

`date · person · signal_type · source_url · score · draft_subject · status`

**Tab 3 — `Runs`** (just the headers, agent will append rows)

`date · leads_found · qualified · drafts · errors · notes`

**Save the sheet ID from the URL** — looks like `1AbC...XyZ` between `/d/` and `/edit`.

### 3. Create the Drive folder + voice.md

In Google Drive, create a folder called `agentic-architect`.

Inside it, create a Google Doc named `voice.md`. Paste the contents of `handouts/voice-md-template.md` from the repo. Edit it to be *your* voice. **5 example emails minimum.**

Right-click `voice.md` → Get link → copy. Save the file ID (between `/d/` and `/view`).

### 4. Get your n8n workflow scaffold

Two options:

**Option A — fork the repo (fastest)**
```bash
# In your terminal
gh repo fork sudosoph/bsw26-agentic-workflows --clone
cd bsw-growth-agent
```

Then in n8n: **Workflows → Add → Import from File** → upload `n8n/bsw-growth-agent.json`. The full workflow appears with placeholder credentials. You only need to wire the credentials and replace the placeholder IDs (covered below).

**Option B — build from scratch (this tutorial)**
Follow the 17 steps below.

---

## The 20-minute build · 17 steps

Time budget per step shown in `[X min]`. Total: 18 minutes building + 2 minutes testing.

### Step 1 · Create the workflow + Schedule Trigger `[1 min]`

1. n8n → **Workflows → Add Workflow → Blank**
2. Name it `Founder's Discovery Engine`
3. Drag a **Schedule Trigger** node onto canvas
4. Configure:
   - Trigger Interval: `Custom (Cron)`
   - Cron Expression: `0 13 * * *` (every day at 7:00 AM Boulder/Denver during MDT — 13:00 UTC). Adjust UTC for your zone: PT=14, ET=11, UK=06, CET=05.

**Why cron?** Almost every SMB agent starts as a daily scheduled job. You want predictable behavior, not chaos.

### Step 2 · Add a Manual Trigger `[1 min]`

For testing and live demos, add a manual trigger as a parallel entry point.

1. Drag a **Manual Trigger** node next to the Schedule Trigger
2. Both will feed into Step 3

**Why both?** Cron runs daily without you. Manual lets you test the workflow on demand without waiting until 7 AM.

### Step 3 · Read ICP from Sheets `[2 min]`

1. Drag a **Google Sheets** node, connect from both triggers
2. Operation: `Read Rows from Sheet`
3. Authentication: **OAuth2 → Connect new credential** → sign into your Google account → grant access
4. Document: paste your Sheet ID from setup step 2
5. Sheet: `ICP`
6. Output options: leave defaults

**Test it:** Click "Execute Node" — you should see your `icp_description` and `signal_keywords` come back.

**Pattern:** *Config-as-files.* The agent reads its operating instructions from a Sheet. You can edit the Sheet without touching n8n.

### Step 4 · Read voice.md from Drive `[1 min]`

1. Drag a **Google Drive** node, connect from both triggers (parallel to the Sheets read)
2. Operation: `Download File`
3. File: paste your `voice.md` file ID
4. Binary Property: `voiceMd` (we'll reference this name later)

**Test it:** Click "Execute Node" — you should see the file content as base64. We'll decode it in Step 11.

### Step 5 · Discovery via Claude Haiku 4.5 + web_search `[3 min]`

This is **sub-agent #1**. One Claude call does both web search and structured extraction.

1. Drag an **HTTP Request** node, connect from the Sheets node
2. Method: `POST`
3. URL: `https://api.anthropic.com/v1/messages`
4. **Authentication → Generic Credential Type → HTTP Header Auth**
   - Create new credential: Name=`x-api-key`, Value=your Anthropic key
5. **Headers** (add):
   - `anthropic-version`: `2023-06-01`
   - `content-type`: `application/json`
6. **Body → JSON:**

```json
{
  "model": "claude-haiku-4-5",
  "max_tokens": 2000,
  "tools": [
    { "type": "web_search_20250305", "name": "web_search", "max_uses": 5 }
  ],
  "system": "You are a customer-discovery research agent for a lean startup.\n\nICP context:\n{{ $('Google Sheets').item.json.icp_description }}\n\nSignal keywords: {{ $('Google Sheets').item.json.signal_keywords }}\n\nReturn ONLY a JSON array. No prose.",
  "messages": [
    {
      "role": "user",
      "content": "Search Hacker News, Reddit (r/SaaS, r/Entrepreneur, r/AI_Agents), and Product Hunt for posts from the last 7 days where founders or operators are publicly displaying signals matching my ICP. Look for: pain mentions, hiring posts I could solve, complaints about competitors, asks for tools.\n\nReturn JSON array, max 30 items, schema:\n[\n  {\n    \"person\": \"@handle or display name\",\n    \"signal_type\": \"pain | hiring | complaint | tool_ask\",\n    \"source_url\": \"full URL to the original post\",\n    \"evidence_quote\": \"verbatim 1-2 sentence quote\",\n    \"score\": 0-10,\n    \"company\": \"company name if discoverable\",\n    \"company_url\": \"company website if discoverable\"\n  }\n]"
    }
  ]
}
```

**Why Haiku, not Sonnet?** Sub-agent #1 is classification. $1/$5 per million tokens is plenty. Save Sonnet for nuance. This is the **cascade pattern** that cuts your bill 60–70%.

**Test it:** Execute. You should see a Claude response with `content[0].text` containing a JSON array. May take 15–30 sec because of web search.

### Step 6 · Parse JSON from Claude `[1 min]`

Claude returns content blocks. We need to extract the JSON array.

1. Drag a **Code** node after the Claude HTTP Request
2. Mode: `Run Once for All Items`
3. Language: `JavaScript`
4. Paste:

```javascript
const response = $input.first().json;
const contentBlocks = response.content || [];

let rawText = '';
for (const block of contentBlocks) {
  if (block.type === 'text' && block.text) rawText += block.text;
}

const jsonMatch = rawText.match(/\[[\s\S]*\]/);
if (!jsonMatch) {
  return [{ json: { error: 'No JSON in response', raw: rawText, leads: [] } }];
}

let leads;
try { leads = JSON.parse(jsonMatch[0]); }
catch (e) { return [{ json: { error: 'Parse failed', message: e.message } }]; }

const qualified = leads.filter(l => (l.score ?? 0) >= 6);
return qualified.map(lead => ({ json: lead }));
```

**What this does:** Strips Claude's prose around the JSON, parses it, filters to leads scored 6 or higher. Each surviving lead becomes a separate item flowing through the workflow.

### Step 7 · Read the Sent log for dedup `[1 min]`

1. Drag another **Google Sheets** node, connect from the Code node
2. Operation: `Read Rows from Sheet`
3. Same Document ID as before
4. Sheet: `Sent`

**Why?** We need to know who we've already contacted so we don't double-email anyone. This is **idempotency** — re-run safety.

### Step 8 · Dedup + keep top 5 `[1 min]`

1. Drag another **Code** node
2. Connect from BOTH the Parse node AND the Read Sent node (n8n supports multi-input)
3. Paste:

```javascript
const leads = $input.all().map(i => i.json);
const sentRows = $('Google Sheets1').all().map(i => i.json);  // your Sent-read node name

const contactedUrls    = new Set(sentRows.map(r => r.source_url).filter(Boolean));
const contactedHandles = new Set(sentRows.map(r => r.person).filter(Boolean));

const fresh = leads.filter(lead => {
  if (lead.source_url && contactedUrls.has(lead.source_url)) return false;
  if (lead.person     && contactedHandles.has(lead.person))    return false;
  return true;
});

fresh.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
const top5 = fresh.slice(0, 5);

return top5.map(lead => ({ json: lead }));
```

**What this does:** Filters out anyone in the Sent log, sorts by score, keeps top 5. **Progressive enrichment** starts here — we only spend money researching the 5 best candidates.

### Step 9 · Enrich top 5 with Firecrawl `[1 min]`

1. Drag an **HTTP Request** node
2. Method: `POST`
3. URL: `https://api.firecrawl.dev/v1/scrape`
4. **Authentication → HTTP Header Auth** (new credential):
   - Name: `Authorization`
   - Value: `Bearer YOUR_FIRECRAWL_KEY`
5. **Body → JSON:**

```json
{
  "url": "{{ $json.company_url || $json.source_url }}",
  "formats": ["markdown"],
  "onlyMainContent": true
}
```

6. **Options → Timeout:** `30000` (Firecrawl can take a few seconds)

**Why Firecrawl?** Best signal-to-noise on JavaScript-heavy sites. Apache 2.0 license — self-host on Docker for free, or use Cloud at $83/mo to skip operations.

### Step 10 · Summarize the company in 2 sentences `[1 min]`

1. Drag another **HTTP Request** to Anthropic (same credential as Step 5)
2. Method: `POST` · URL: `https://api.anthropic.com/v1/messages`
3. **Body → JSON:**

```json
{
  "model": "claude-haiku-4-5",
  "max_tokens": 300,
  "system": "You write concise 2-line company summaries. Output plain text. No markdown.",
  "messages": [{
    "role": "user",
    "content": "Company markdown extract:\n\n{{ $json.data.markdown.slice(0, 4000) }}\n\nIn exactly two sentences, what does this company do and what's their current state?"
  }]
}
```

**Pattern:** Cascade again — Haiku for the cheap summary, Sonnet for the next step's drafting.

### Step 11 · Draft the email with Sonnet 4.6 + voice.md `[2 min]`

This is the **only premium-token step** in the workflow. The voice.md file gets cached so we pay full price once and 0.1× on every subsequent run within 5 minutes.

1. Drag another **HTTP Request** to Anthropic
2. Add **header**: `anthropic-beta: prompt-caching-2024-07-31`
3. **Body → JSON:**

```json
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 600,
  "system": [
    {
      "type": "text",
      "text": "You write customer-discovery emails for a lean startup founder. Goal: an INTERVIEW ASK — not a pitch. Soft CTA. 80–110 words. Follow voice.md exactly."
    },
    {
      "type": "text",
      "text": "voice.md contents:\n\n{{ $('Google Drive').item.binary.voiceMd.toString('utf-8') }}",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "messages": [{
    "role": "user",
    "content": "Draft a customer-discovery email.\n\nPerson: {{ $('Code1').item.json.person }}\nSignal: {{ $('Code1').item.json.signal_type }} — {{ $('Code1').item.json.evidence_quote }}\nSource: {{ $('Code1').item.json.source_url }}\nCompany context: {{ $('HTTP Request2').item.json.content[0].text }}\n\nReturn:\nSUBJECT: [subject]\nBODY:\n[body]"
  }]
}
```

**Note:** Replace `Code1` and `HTTP Request2` with your actual node names. n8n auto-names them; rename for clarity if you want.

### Step 12 · Parse SUBJECT/BODY from Claude `[1 min]`

1. Drag a **Code** node
2. Paste:

```javascript
const response = $input.first().json;
const text = (response.content?.[0]?.text || '').trim();

const subjectMatch = text.match(/^SUBJECT:\s*(.+?)\s*\n/);
const bodyMatch    = text.match(/BODY:\s*\n([\s\S]+)$/);

const subject = subjectMatch ? subjectMatch[1].trim() : 're: a quick question';
const body    = bodyMatch ? bodyMatch[1].trim() : text;

const lead = $('Code1').item.json;  // carry forward original lead
return [{ json: { subject, body, lead } }];
```

**Why SUBJECT/BODY format and not nested JSON?** LLMs occasionally produce malformed JSON when nesting multi-line strings. Plain `SUBJECT:` / `BODY:` is robust to imperfect output.

### Step 13 · Create Gmail draft (HITL gate) `[1 min]`

1. Drag a **Gmail** node
2. **Authentication → OAuth2** → sign in to your Google account · grant `gmail.compose` scope
3. **Resource:** `Draft`
4. **Operation:** `Create`
5. Subject: `={{ $json.subject }}`
6. Message: `={{ $json.body }}`
7. **Options → To:** `={{ $json.lead.person ? $json.lead.person + '@unknown.example' : 'TODO_RESOLVE@example.com' }}`

**HITL gate.** The agent NEVER sends. It always creates a Draft. You review and click Send manually.

**Note:** Resolving the prospect's actual email address is out of scope today. Add an Apollo or Hunter API node here when productionizing.

### Step 14 · Append to Sent log `[1 min]`

1. Drag a **Google Sheets** node
2. Operation: `Append`
3. Document: same ID
4. Sheet: `Sent`
5. **Mapping mode:** `Define Below`
   - `date`: `={{ new Date().toISOString().slice(0,10) }}`
   - `person`: `={{ $json.lead.person }}`
   - `signal_type`: `={{ $json.lead.signal_type }}`
   - `source_url`: `={{ $json.lead.source_url }}`
   - `score`: `={{ $json.lead.score }}`
   - `draft_subject`: `={{ $json.subject }}`
   - `status`: `pending_review`

**Why log immediately?** Idempotency. If you re-run the workflow, dedup (Step 8) sees the already-logged person and skips them.

### Step 15 · Generate the daily digest `[1 min]`

After all leads have been processed (i.e., all draft emails created), generate one summary email.

1. Drag another **HTTP Request** to Anthropic (Sonnet)
2. **Body → JSON:**

```json
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 400,
  "system": "You write a brief daily digest email for a founder running a customer-discovery agent. One paragraph. Friendly. Specific numbers.",
  "messages": [{
    "role": "user",
    "content": "Today the agent processed {{ $('Code').all().length }} discovery results, qualified {{ $('Code1').all().length }} leads, drafted {{ $('Code2').all().length }} emails sitting in Gmail Drafts. Top signal types: {{ $('Code1').all().map(i => i.json.signal_type).join(', ') }}. Write a short morning digest. Subject + body. Tell them to approve drafts before 5pm."
  }]
}
```

### Step 16 · Send the digest to yourself `[1 min]`

1. Drag a **Gmail** node
2. Resource: `Message` · Operation: `Send`
3. To: your own email (e.g., `sophia@agenticarchitect.ai`)
4. Subject: parse from the digest response (use a small Code node before, or paste a static one for now)
5. Message: parse from the digest response

This is the **only place the agent actually sends** — and it's only sending to YOU. Everyone else gets drafts.

### Step 17 · Append to Runs audit log `[1 min]`

Final step — log this run for trust-building.

1. Drag a **Google Sheets** node
2. Operation: `Append`
3. Sheet: `Runs`
4. Map:
   - `date`: today's date
   - `leads_found`: count from Step 5
   - `qualified`: count from Step 6
   - `drafts`: count from Step 12
   - `errors`: `0` for now
   - `notes`: `auto`

**This is your trust-building primitive.** After 14 runs of clean data, you have evidence to graduate the agent from Pending Review to Conditional Auto.

---

## Test the workflow

1. Click the **Manual Trigger** node → **Execute Workflow**
2. Watch the execution flow through all 17 steps
3. Check Gmail Drafts — you should see ~5 fresh drafts
4. Check the `Sent` Sheet — 5 new rows
5. Check the `Runs` Sheet — 1 new row
6. Check your inbox — 1 digest email

**Total run time:** ~30–60 seconds depending on Firecrawl latency.

**Cost per run:** Check the Anthropic Console → Usage. Should be around $0.20.

---

## Common errors

| Error | Cause | Fix |
|---|---|---|
| `401 Unauthorized` from Anthropic | API key not pasted right | Re-paste in n8n credential, check for whitespace |
| `model not found` | Wrong model string | Use `claude-sonnet-4-6` and `claude-haiku-4-5` exactly |
| `402 Payment Required` from Firecrawl | Trial credits used up | Top up or self-host Firecrawl on Docker |
| Sheets append fails | OAuth scope missing | Re-auth Sheets credential, ensure write scope enabled |
| Gmail draft creation fails | OAuth scope `gmail.compose` not granted | Re-auth Gmail with full compose permissions |
| No drafts appear | Recipient address is placeholder | Drafts are still in Gmail Drafts folder · check there |
| `parse failed` in Step 6 | Claude returned malformed JSON | Try the workflow again — usually transient |

---

## Activate the workflow

Once tests pass:

1. Click the workflow **Active** toggle (top right of n8n)
2. The Schedule Trigger will fire daily at 7 AM
3. Drafts wait for you in Gmail every morning

**Verify:** The next morning, check your Drafts folder. If there are 5 new drafts, you're live.

---

## Add the follow-up sub-workflow (optional, +5 min)

Same architecture, different inputs. Drafts a follow-up if no reply in 5 days.

1. Create a second n8n workflow: `Discovery Engine · Follow-Up`
2. Schedule Trigger at `0 8 * * *` (8 AM daily)
3. Gmail node → `Get Many Threads` → filter by label `Sent — Discovery`
4. Code node → for each thread, check elapsed days + reply count
5. If `5+ days AND no reply`: HTTP Request to Sonnet 4.6 with the thread context, ask for a follow-up draft that **references the original thread** (not a copy-paste reminder)
6. Gmail → `Create Draft` with the follow-up

The same six primitives (trigger, read state, sub-agent, draft, gate, log) apply.

---

## Going to production · the trust ladder

Today's workflow ships at **Stage 2 · Pending Review** of the trust ladder. The agent drafts, you send. Over time, you can graduate.

| Stage | What changes | Required guardrails |
|---|---|---|
| **2 · Pending Review** *(today)* | Drafts only · never sends | Schema validation · audit log · do-not-contact filter |
| **3 · Conditional Auto** | Auto-fires drafts where score ≥ 8 AND voice match ≥ 0.85 | + rate limit per recipient · anomaly detection · sandbox isolation |
| **4 · Full Auto** | Fires all · alerts on exceptions | + A/B replay testing · drift detection · automatic rollback |

**Promotion criteria:**
- Stage 2 → 3: ≥ 95% approval rate over 2 weeks
- Stage 3 → 4: auto-error rate < 1% sustained 30+ days

Watch the `Runs` Sheet. The data tells you when you're ready.

---

## Cost optimization · once you're running

| Lever | Reduction | Effort |
|---|---|---|
| **Cascade** (Haiku for routing, Sonnet for drafting) | -60% to -70% | Built into this tutorial |
| **5-min cache** on voice.md + ICP | -30% additional | Built into Step 11 |
| **Batch API** on the daily digest | -50% on that node | Add `?batch=true` to digest call |
| **Self-host n8n** on $5 Hetzner VPS | -$24/mo | One weekend of Docker |
| **Self-host Firecrawl** on Docker | -$83/mo | Apache 2.0 image, 30 min |
| **Local Qwen 3.6 for classification** (Strix Halo / Mac Studio) | API → ~$0 | Hardware up front, then ~free |

Ship Tier 1 (all SaaS) this week. Move to Tier 3 (lean self-hosted) when your bill hits $50/mo. Skip Tier 4 unless you have privacy-sensitive workloads.

---

## Customize for your startup

The architecture you just built is general. Same six nodes, different content:

| Your agent | Trigger change | Search target | Output target |
|---|---|---|---|
| **Inbound Triage** | Form fill webhook | Lead's company website | Gmail draft |
| **Competitor Pulse** | Cron daily | Competitor changelogs | Email digest |
| **Support Draft** | Helpdesk webhook | Your KB + ticket history | Helpdesk draft |
| **Content Repurposer** | Blog publish webhook | Original blog post | Drafts in Drive |
| **Investor Update** | Cron monthly | Your metrics dashboards | Gmail draft |

Fork the repo, change the trigger, change `icp.md` and `voice.md`, ship. **Same architecture, different agent.**

---

## Resources

- **Repo:** [github.com/sudosoph/bsw26-agentic-workflows](https://github.com/sudosoph/bsw26-agentic-workflows)
- **Workflow JSON:** `n8n/bsw-growth-agent.json`
- **voice.md template:** `handouts/voice-md-template.md`
- **ICP template:** `handouts/icp-md-template.md`
- **Schemas reference:** `handouts/schemas-md-template.md`
- **Workshop slides:** `slides/index.html`
- **Speaker script:** `script/speaker-notes.md`

**Office Hours · 5 free 30-min audits for BSW attendees:** [cal.com/sophia-stein/architect-audit-bsw](https://cal.com/sophia-stein/architect-audit-bsw) (capped at 5 bookings)

**Newsletter:** [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog) — weekly deep-dives on agentic architecture for lean founders

**Email:** sophia@agenticarchitect.ai

---

*Tutorial v1.0 · MIT licensed · fork freely · ship yours · — Sophia Stein, AI Architect*


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: CONFIGURATION.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: AUTOPILOT.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Claude for Chrome · Autopilot Setup
## Hands-off setup for the BSW Growth Agent demo

> Two paths — pick one. **Free** uses Groq + Jina + n8n.cloud trial (no card, ~10 min). **Paid** uses Anthropic + Firecrawl + n8n.cloud trial (~$5–$15 to fund, better voice match).
>
> Paste the prompt for your path into Claude for Chrome (claude.com/chrome). Stay nearby — you'll need to enter passwords, accept OAuth screens, and click 2FA.

---

## Pre-flight (1 minute · do this first manually, both paths)

1. Sign into Chrome with the Google account that will own the agent
2. Open this file in a Chrome tab so the Claude extension can read the prompt
3. Open `/home/sophia-stein/bsw/handouts/voice-md-template.md` and `/home/sophia-stein/bsw/handouts/sheet-tab-icp.csv` in additional tabs — the agent will copy from these
4. Have your phone ready for 2FA codes

---

## Hard guardrails for Claude for Chrome (apply to BOTH paths)

When you paste the prompt below, the prompt itself starts with these guardrails. They prevent the most common ways an autopilot run goes off-script:

- ❌ **Do NOT write Google Apps Script.** This agent runs on n8n, not Apps Script. Anything that says "Tools → Script editor" is wrong.
- ❌ **Do NOT create a Jina or Algolia or Reddit account.** All three are used via public no-auth endpoints. There is nothing to sign up for.
- ❌ **Do NOT improvise alternative tools** ("I'll use Make.com instead", "I'll write a Python script"). The plan is fixed.
- ❌ **Do NOT skip OAuth consent screens.** Pause and let the human click Allow.
- ❌ **Do NOT proceed if a step fails.** Stop, report the error verbatim, wait for human guidance.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PATH A · FREE TIER (Groq + Jina, no card)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Workflow file: `n8n/bsw-growth-agent-lite.json`. Uses Groq's free **Llama 4 Scout** (discovery + drafting) cascading to **Llama 3.1 8B Instant** (cheap classification) + HN Algolia + Reddit JSON + Jina Reader. Total cost: $0 within free tiers. Quality: noticeably below Sonnet 4.6 voice match — fine for evaluation, not ideal for live customer outreach.

### Free-path autopilot prompt

Copy everything between the `=== BEGIN ===` / `=== END ===` markers and paste into Claude for Chrome.

```
=== AUTOPILOT PROMPT · FREE TIER · BEGIN ===

You are setting up the BSW Growth Agent (FREE tier) for a founder. Stack: n8n.cloud (orchestration) + Groq (LLM, free) + HN Algolia + Reddit JSON + Jina Reader (all no-auth, no signup) + Google Sheets/Drive/Gmail.

GUARDRAILS — read and follow exactly:
1. Do NOT write Google Apps Script. We use n8n.
2. Do NOT create Jina, Algolia, or Reddit accounts. They use public no-auth endpoints.
3. Do NOT substitute different tools (Make.com, Zapier, custom scripts).
4. Pause for human approval at every OAuth consent screen, password prompt, and 2FA step.
5. If any step fails, STOP and report the verbatim error. Do not retry or work around it.

CREDENTIAL HANDLING:
Open a single new tab titled "BSW credentials" and write each value as plain text in this format. Do NOT paste into chat or email:

  GROQ_API_KEY=gsk_...
  N8N_INSTANCE_URL=https://...n8n.cloud
  GOOGLE_SHEET_ID=1AbC...XyZ
  VOICE_MD_FILE_ID=...

═══════════════════════════════════════════════════
TASK 1 · GROQ FREE TIER (LLM)
═══════════════════════════════════════════════════
1. Open https://console.groq.com in a new tab.
2. Sign in with the founder's Google account.
3. Navigate to API Keys.
4. Create a new key named "bsw-growth-agent". Copy it (starts with "gsk_") to the credentials tab.
5. CONFIRM no credit card was requested. If one was, STOP and tell the human.

═══════════════════════════════════════════════════
TASK 2 · n8n.CLOUD (workflow runtime)
═══════════════════════════════════════════════════
1. Open https://n8n.cloud in a new tab.
2. Start the 14-day free trial. Use Google SSO if offered. NO credit card required.
3. Note the workflow URL (https://[name].app.n8n.cloud) and write it to the credentials tab.
4. Do NOT import the workflow yet — we need the Sheet and Drive IDs first.

═══════════════════════════════════════════════════
TASK 3 · GOOGLE SHEET (config storage)
═══════════════════════════════════════════════════
1. Open https://docs.google.com/spreadsheets/u/0/create in a new tab.
2. Rename to: BSW Discovery Engine
3. Create three tabs (right-click bottom tab area → Add Sheet). Name them exactly: ICP, Sent, Runs.
4. ICP tab Row 1 headers (cells A1, B1, C1):
     icp_description     signal_keywords     subreddits
5. ICP tab Row 2 — copy the contents of /home/sophia-stein/bsw/handouts/sheet-tab-icp.csv into A2, B2, C2 (open the file, copy each cell value).
6. Sent tab Row 1 headers (A1–G1):
     date  person  signal_type  source_url  score  draft_subject  status
7. Runs tab Row 1 headers (A1–F1):
     date  leads_found  qualified  drafts  errors  notes
8. Sent and Runs stay empty under headers — the agent will append rows.
9. Copy the spreadsheet ID from the URL (the long string between /d/ and /edit) to the credentials tab.

═══════════════════════════════════════════════════
TASK 4 · GOOGLE DRIVE FOLDER + voice.md
═══════════════════════════════════════════════════
1. Open https://drive.google.com in a new tab.
2. Create a folder called "agentic-architect" in My Drive root.
3. Inside it, create a Google Doc named "voice.md".
4. Copy the entire contents of /home/sophia-stein/bsw/handouts/voice-md-template.md into the Doc.
5. Right-click voice.md → Share → Get link → copy. Extract the file ID (between /d/ and /view) and add to the credentials tab.

═══════════════════════════════════════════════════
TASK 5 · IMPORT n8n WORKFLOW
═══════════════════════════════════════════════════
1. Return to the n8n.cloud tab.
2. Workflows → Add → Import from File.
3. Upload: /home/sophia-stein/bsw/n8n/bsw-growth-agent-lite.json
4. After import, click each node with a placeholder credential and connect:
   - "Groq API · Authorization Bearer" → New HTTP Header Auth credential. Header name: Authorization. Header value: Bearer <GROQ_API_KEY>
   - "Google Sheets account" → New OAuth2 credential. Sign in with the founder's Google account. Pause for the human to click Allow.
   - "Google Drive account" → New OAuth2 credential. Pause for human Allow.
   - "Gmail account" → New OAuth2 credential. Pause for human Allow.
5. Replace placeholder IDs in the workflow:
   - REPLACE_WITH_YOUR_SHEET_ID → use GOOGLE_SHEET_ID (4 nodes)
   - REPLACE_WITH_VOICE_MD_FILE_ID → use VOICE_MD_FILE_ID (1 node)
   - REPLACE_WITH_YOUR_EMAIL@example.com → the founder's email (1 node, the digest recipient)

═══════════════════════════════════════════════════
TASK 6 · TEST RUN
═══════════════════════════════════════════════════
1. In n8n, click the Manual · Webhook node, then "Test workflow" (or trigger via the webhook URL).
2. Watch each node turn green. If any turns red, STOP and report the verbatim error.
3. After the run, verify:
   - Gmail Drafts folder has ~5 new drafts
   - Sheet's Sent tab has ~5 new rows
   - Sheet's Runs tab has 1 new row
   - The founder received 1 digest email

═══════════════════════════════════════════════════
TASK 7 · HANDOFF
═══════════════════════════════════════════════════
Summarize in chat:
1. Confirmation that drafts appeared in Gmail (with one example subject line)
2. Total elapsed time
3. Any errors encountered and how they were resolved (if at all)
4. The credentials tab URL so the human can verify nothing leaked

Then close all tabs except n8n and Gmail Drafts. Leave those open.

=== AUTOPILOT PROMPT · FREE TIER · END ===
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PATH B · PAID TIER (Anthropic + Firecrawl)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Workflow file: `n8n/bsw-growth-agent.json`. Uses Anthropic Claude (Haiku 4.5 + Sonnet 4.6 with prompt caching) + built-in `web_search` tool + Firecrawl. Cost: ~$0.21 per run = ~$6/month at default frequency. Voice match is noticeably better than the free tier.

### Paid-path autopilot prompt

```
=== AUTOPILOT PROMPT · PAID TIER · BEGIN ===

You are setting up the BSW Growth Agent (PAID tier) for a founder. Stack: n8n.cloud + Anthropic Claude + Firecrawl + Google Sheets/Drive/Gmail.

GUARDRAILS — read and follow exactly:
1. Do NOT write Google Apps Script. We use n8n.
2. Do NOT substitute alternative providers (no Groq, no OpenAI, no Make.com).
3. Pause for human approval at every OAuth consent, payment form, and 2FA step.
4. If any step fails, STOP and report the verbatim error.

CREDENTIAL HANDLING — write to a single tab titled "BSW credentials":

  ANTHROPIC_API_KEY=sk-ant-...
  FIRECRAWL_API_KEY=fc-...
  N8N_INSTANCE_URL=https://...n8n.cloud
  GOOGLE_SHEET_ID=1AbC...XyZ
  VOICE_MD_FILE_ID=...

═══════════════════════════════════════════════════
TASK 1 · ANTHROPIC API KEY
═══════════════════════════════════════════════════
1. Open https://console.anthropic.com.
2. Sign in with the founder's Google account.
3. Settings → API Keys → Create Key. Name it "bsw-growth-agent".
4. Copy the key (starts with "sk-ant-") to the credentials tab.
5. Settings → Billing → confirm at least $20 of credit. If none, STOP and ask the human to add credit.

═══════════════════════════════════════════════════
TASK 2 · FIRECRAWL API KEY
═══════════════════════════════════════════════════
1. Open https://firecrawl.dev.
2. Sign in (Google SSO works).
3. Dashboard → API Keys → copy the key (starts with "fc-") to the credentials tab.
4. Free tier gives 500 credits — plenty for evaluation.

═══════════════════════════════════════════════════
TASK 3 · n8n.CLOUD
═══════════════════════════════════════════════════
1. https://n8n.cloud → start 14-day trial (no card).
2. Note the URL to credentials tab. Do NOT import yet.

═══════════════════════════════════════════════════
TASK 4 · GOOGLE SHEET
═══════════════════════════════════════════════════
Same as Free Path Task 3. Three tabs (ICP, Sent, Runs) with the headers from sheet-tab-icp.csv / sheet-tab-sent.csv / sheet-tab-runs.csv. Save the Sheet ID.

═══════════════════════════════════════════════════
TASK 5 · GOOGLE DRIVE + voice.md
═══════════════════════════════════════════════════
Same as Free Path Task 4. Save the voice.md file ID.

═══════════════════════════════════════════════════
TASK 6 · IMPORT n8n WORKFLOW
═══════════════════════════════════════════════════
1. n8n.cloud → Workflows → Add → Import from File.
2. Upload: /home/sophia-stein/bsw/n8n/bsw-growth-agent.json
3. Wire credentials:
   - "Anthropic API · x-api-key" → New HTTP Header Auth. Header name: x-api-key. Value: <ANTHROPIC_API_KEY>
   - "Firecrawl API · Authorization Bearer" → New HTTP Header Auth. Header name: Authorization. Value: Bearer <FIRECRAWL_API_KEY>
   - "Google Sheets account" / "Google Drive account" / "Gmail account" → OAuth2, pause for human Allow on each.
4. Replace placeholder IDs:
   - REPLACE_WITH_YOUR_SHEET_ID (4 nodes)
   - REPLACE_WITH_VOICE_MD_FILE_ID (1 node)
   - REPLACE_WITH_YOUR_EMAIL@example.com (1 node)

═══════════════════════════════════════════════════
TASK 7 · TEST RUN + HANDOFF
═══════════════════════════════════════════════════
Same verification as Free path: 5 drafts in Gmail, 5 rows in Sent tab, 1 row in Runs tab, 1 digest email.

Report the same handoff summary.

=== AUTOPILOT PROMPT · PAID TIER · END ===
```

---

## What you (the human) will do during the autopilot run

| Pause type | What you do | Time |
|---|---|---|
| Google sign-in | Enter password + 2FA | 30 sec |
| Anthropic billing (paid only) | Click through billing if not pre-funded | 30 sec |
| Google OAuth consent (Sheets, Drive, Gmail — 3×) | Click Allow | 5 sec each |
| Verify the credentials tab | Skim that nothing odd is there | 30 sec |

**Total interactive time:** ~2 minutes across the ~10-minute autopilot run.

---

## After the autopilot finishes · verify locally

```bash
cd /home/sophia-stein/bsw

# Free path:
GROQ_API_KEY=gsk_yourkey ./scripts/test-credentials.sh

# Paid path:
ANTHROPIC_API_KEY=sk-ant-... FIRECRAWL_API_KEY=fc-... ./scripts/test-credentials.sh
```

Then in n8n, hit the **Manual · Webhook** node → "Test workflow". You should see:
- ✅ All nodes turn green
- ✅ 5 drafts in Gmail Drafts
- ✅ 5 rows in `Sent` tab
- ✅ 1 row in `Runs` tab
- ✅ 1 digest email in your inbox

If anything is missing, search the imported workflow for `REPLACE_` — there should be no results. Any remaining placeholder is the most common failure cause.

---

## Activate the cron

Once the manual run works:
1. Open the workflow in n8n
2. Toggle **Active** (top right)
3. The agent fires daily at 7am Boulder time (`0 13 * * *` UTC during MDT)

---

## Backup plan if Claude for Chrome gets stuck

1. Tell it to skip the failing step and continue
2. Do that step manually using the existing `TUTORIAL.md` (covers everything the autopilot does)
3. Re-prompt: "Resume from Task X"

---

*Autopilot script v2 · two paths · MIT licensed*
*— Sophia Stein · agenticarchitect.ai/blog · sophia@agenticarchitect.ai*


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: handouts/voice-md-template.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Sophia's voice — for outbound writing

> The agent reads this file as system prompt context on every run. Edit it directly · the agent inherits the change next run. Five example emails do more work than any prompt instruction · keep them updated as your style evolves.

---

## Posture

- Direct. No fluff. Short sentences. Cut adverbs.
- Specific over abstract. Numbers over adjectives.
- Confident but not arrogant. I assume the reader is smart.
- Skeptical of hype. Honest about tradeoffs.
- I diagnose, then offer. I don't sell.
- I don't use exclamation marks unless something is genuinely urgent.
- I almost never start sentences with "I" unless the sentence is about me.

## Words I actually use

"the math here is" · "compounding" · "leverage" · "stack" · "tradeoff" · "primitives" · "honest take" · "what's interesting" · "the wrong question" · "earned" · "compounds" · "skeptical of" · "concrete" · "info dense" · "actionable" · "context"

## Words I never use

"synergy" · "unlock" (verb) · "revolutionary" · "game-changer" · "leverage AI" (overused) · "circle back" · "touch base" · "reach out" · "ecosystem" · "cutting-edge" · "in today's world" · "I hope this finds you well" · "thought leader" · "10x" as a noun · "AI-powered" · "next-generation"

## Email structure for cold outreach (5 steps · 80–110 words total)

1. **One-line context** · how I found them. Specific · not "I came across your work."
2. **Two-line observation** · something specific they'd nod at if I said it out loud.
3. **One question** · the question I'd ask if we were sitting at a coffee shop. A learning question, not a sales question.
4. **One sentence on what I do** · short, no jargon.
5. **Soft CTA** · "Worth 15 minutes Thursday?" · never "let's hop on" or "jump on a quick call."

## Subject line rules

- Lowercase first letter unless proper noun
- ≤ 50 characters
- Reference the specific thing — *"re: your Lindy thread"*, not *"connecting"* or *"quick question"*
- No emoji, no all caps, no clickbait
- If it sounds like marketing, rewrite it

---

## Examples · this is where the work happens

The agent learns voice from these. **Five minimum. More is better.** Add new ones whenever I write an email I'm proud of.

### Example 1 · to a founder ranting about Lindy credits on X

> **SUBJECT:** re: your Lindy thread
>
> Saw your thread last night. The credit-based pricing surprise is the #1 complaint I hear about Lindy, and you nailed why.
>
> I build agentic systems for early-stage founders — n8n + Claude mostly, costs predictable to the dollar. Curious what your stack would look like without the surprises.
>
> Worth 15 minutes Thursday?
>
> — Sophia

### Example 2 · to someone hiring a "Head of Automation" or "Automation Engineer"

> **SUBJECT:** the automation eng JD
>
> Spotted your "Head of Automation" listing on Wellfound. Three of my recent founder clients posted near-identical roles before realizing the work could be done by an agent stack and a part-time analyst.
>
> Not pitching — genuinely curious how you've scoped the role. If the answer is "we tried agents and it didn't work," I'd love to hear what broke.
>
> Worth 15 minutes Thursday?
>
> — Sophia

### Example 3 · to a founder complaining about Anthropic / OpenAI costs on HN

> **SUBJECT:** re: your HN comment on Sonnet costs
>
> Read your comment yesterday about your Sonnet bill. The cascade pattern — Haiku for routing, Sonnet only for nuance — cuts that 60–70% with no quality loss. It's the most underused 2026 cost lever I see.
>
> Happy to share the cost breakdown from a workflow that does the same thing for $6/month if useful.
>
> Worth 15 minutes Thursday?
>
> — Sophia

### Example 4 · to a Product Hunt launcher with "agent" or "AI-native" in the description

> **SUBJECT:** congrats on the PH launch
>
> Saw the launch this morning. The pricing-page math actually checks out, which is rarer than it should be.
>
> Quick question — when you said "agent-native" in the description, did you mean MCP under the hood or a custom protocol? I'm writing about agentic infrastructure choices for lean startups and your answer would help me think through the tradeoff.
>
> Worth 15 minutes?
>
> — Sophia

### Example 5 · to someone in r/AI_Agents or r/SaaS asking for n8n + Claude help

> **SUBJECT:** the n8n + Claude question
>
> Saw your comment in r/AI_Agents asking how to wire Claude into n8n. I ran a workshop on this exact stack at Boulder Startup Week — open-sourced the template at github.com/sudosoph/bsw26-agentic-workflows.
>
> Not selling anything. Happy to walk through it on a call if you want a faster start than reading the README.
>
> Worth 15 minutes Thursday?
>
> — Sophia

### Example 6 · to a churned customer of a competitor (Trustpilot or Reddit complaint)

> **SUBJECT:** the [competitor] situation
>
> Read your post about leaving [competitor] last week. The reason you gave — [specific quote from their post] — is exactly the architecture problem I help founders avoid.
>
> Not trying to sell you the next thing. Just curious whether you're rebuilding from scratch or migrating to something specific. If it's the second, the trap I see most often is [specific tradeoff in their next-tool category].
>
> Worth 15 minutes Thursday?
>
> — Sophia

---

## Anti-patterns · the agent should NEVER produce these

- Three-paragraph emails
- Sentences longer than 25 words
- "I'd love to" / "I'd be happy to" / "I'd be delighted to" — all filler
- Compliments about their work that aren't specific
- "Pick your brain" or "tap your expertise"
- Subject lines that say "Quick question" with no actual question reference
- Anything with the word "synergy"
- Anything that sounds like a marketing automation
- Sentences starting with "Hope your week is going well"
- Emojis (unless I add them deliberately, which I rarely do)
- Compound sales language: "Helps founders unlock new growth potential through AI-powered automation"

---

## When in doubt

- If the email could be sent by any AI tool to any reader, it's wrong.
- If the email reads like LinkedIn copy, it's wrong.
- If it's longer than what I'd write at 9pm on a Tuesday, it's wrong.
- If a friend would say "did Sophia write this or her assistant?", and the answer is "her assistant," it's wrong.

---

*Voice file by Sophia Stein · sophia@agenticarchitect.ai · agenticarchitect.ai/blog · MIT licensed*


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: handouts/icp-md-template.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# ICP — Ideal Customer Profile

> The discovery agent reads this file on every run as system context. Edit it monthly as your understanding sharpens. Config-as-files.

---

## Who I'm looking for (2-3 sentences, plain English)

Early-stage founders or solo operators of pre-PMF or just-past-PMF SaaS / AI tooling startups. Technical or technical-leaning — they can read code or evaluate Docker. They're paying for outbound, automation, or research tools today and feeling the cost. Often Boulder/Denver/Bay Area but geography isn't a hard filter.

## Signal keywords — what to search for

The agent uses these in its `web_search` query. Mix specific tool names with pain phrases.

- *"n8n cost"*, *"Lindy credits"*, *"Zapier expensive"*, *"Make.com pricing"*
- *"hired an SDR"*, *"hired a VA"*, *"hiring head of automation"*
- *"replaced our outbound team"*, *"firing our agency"*
- *"building a Growth Agent"*, *"customer discovery automation"*
- *"Apollo.io alternative"*, *"Smartlead vs Instantly"*, *"Clay too expensive"*
- *"cold outreach drowning"*, *"founder-led sales"*, *"prospecting for hours"*
- *"Sonnet 4.6 cost"*, *"Anthropic bill"*, *"running out of credits"*

## Sources to listen on (priority order)

1. r/SaaS, r/Entrepreneur, r/AI_Agents
2. Hacker News (homepage + comments)
3. Indie Hackers (Open Stories, Milestones)
4. Product Hunt launches (the discussion thread)
5. r/LocalLLaMA (when complaining about API costs)
6. X (Twitter) — but only via search, low signal-to-noise
7. r/ChatGPTCoding, r/ClaudeAI

## Buying triggers (5 events that mean they're ready)

1. **Just hired or just lost** an SDR / outbound contractor
2. **Posted a complaint about a tool's pricing** in the last 14 days
3. **Asked for a tool recommendation** for outbound, lead-gen, or research
4. **Announced a fundraise** or revenue milestone (cash to deploy)
5. **Just churned from a SaaS** and is publicly considering alternatives

## Disqualifiers (skip these — even if they look great)

- Pre-product (no website / no traction signals)
- Enterprise (more than 50 employees) — wrong sales motion for me
- Agency / consultancy (different buying psychology)
- Crypto / web3 / defi-only — not my expertise
- Anything with "AI co-pilot for [vertical]" with no traction — usually flooded market

## Three "good fit" archetypes

### Archetype A — The lean SaaS founder
Solo or 2-person team. Building a focused B2B SaaS. Doing outbound themselves. Bill creeping past $200/mo on tooling. Looking for the next leverage move.

### Archetype B — The technical operator
Inside a 5-25 person startup. Owns growth or ops. Has API budget but not infinite. Wants to automate the boring 80% so the team can do the interesting 20%.

### Archetype C — The recovering agency owner
Used to run an agency or did consulting. Now building product. Comfortable with stacks. Wants to ship agents to replace what they used to charge clients for.

---

## Don't contact (link to spreadsheet)

See `do-not-contact.csv` in the same Drive folder. Updated continuously. Includes:
- Past clients
- Active customers (don't look like outbound)
- People who explicitly asked to be removed
- Direct competitors

---

*ICP file by Sophia Stein · agenticarchitect.ai/blog · last updated 2026-05-04*


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: handouts/schemas-md-template.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Agent Schemas — JSON output shapes

> Every Claude node returns typed JSON to the next node. Schemas are the contract. Connections that don't break.

---

## Discovery output (Sub-agent #1 · Haiku 4.5 · web_search)

The discovery node returns an array. Filter to score ≥ 6 in the parse step.

```json
[
  {
    "person":         "string · @handle or display name",
    "signal_type":    "pain | hiring | complaint | tool_ask",
    "source_url":     "string · full URL to original post",
    "evidence_quote": "string · verbatim 1-2 sentence quote",
    "score":          "number · 0-10 relevance",
    "company":        "string · if discoverable, else null",
    "company_url":    "string · if discoverable, else null"
  }
]
```

**Validation in parse-leads node:**
- Strip leading/trailing non-JSON
- Match `/\[[\s\S]*\]/` for the array body
- Filter `score >= 6`
- Output one item per qualified lead

---

## Enriched lead (after Firecrawl + summarization)

After Firecrawl scrape and the Haiku summarization step, each lead carries:

```json
{
  "person":         "string",
  "signal_type":    "pain | hiring | complaint | tool_ask",
  "source_url":     "string",
  "evidence_quote": "string",
  "score":          "number",
  "company":        "string",
  "company_url":    "string",
  "company_summary": "string · 2-sentence company context from Haiku"
}
```

---

## Drafted email (Sub-agent #2 · Sonnet 4.6 · voice.md cached)

The drafting node returns a SUBJECT/BODY block as plain text. The parse-draft Code node splits it.

**Raw output from Claude:**
```
SUBJECT: re: your Lindy thread

BODY:
Saw your thread last night. The credit-based pricing surprise is the #1 complaint I hear about Lindy, and you nailed why.

I build agentic systems for early-stage founders — n8n + Claude mostly, costs predictable to the dollar. Curious what your stack would look like without the surprises.

Worth 15 minutes Thursday?

— Sophia
```

**Parsed JSON for downstream Gmail node:**
```json
{
  "subject": "string · subject line, ≤ 50 chars preferred",
  "body":    "string · email body, 80-110 words",
  "lead":    "object · carry-forward of original lead context"
}
```

**Why SUBJECT/BODY format and not JSON?**
LLMs occasionally produce malformed JSON when asked for nested fields with multi-line strings. The SUBJECT:/BODY: format is robust to imperfect output and easy to regex-parse.

---

## Daily digest (Sub-agent #3 · Sonnet 4.6 · batch-eligible)

```json
{
  "subject": "string · 'Discovery Pulse — YYYY-MM-DD'",
  "body":    "string · 1-paragraph morning summary"
}
```

The digest references metrics from upstream nodes:
- `$('Discovery · ...').all().length` — total raw leads
- `$('Parse · Extract qualified leads').all().length` — qualified
- `$('Dedup · top 5 fresh leads').all().length` — fresh
- `$('Parse · Subject + Body').all().length` — drafts created
- Top signal types via `.map(i => i.json.signal_type)`

---

## Sent log row (Google Sheets)

Each created draft appends one row:

```
date · person · signal_type · source_url · score · draft_subject · status
```

**Status values:**
- `pending_review` — agent created the draft, awaiting founder approval
- `sent` — founder approved and sent (manual update)
- `rejected` — founder rejected without sending (manual update)
- `bounced` — sent but email bounced (future automation)

---

## Runs audit log row (Google Sheets)

Each run appends one row:

```
date · leads_found · qualified · drafts · errors · notes
```

This is your trust-building primitive. After 14 consecutive runs with high approval rates, promote the agent up the trust ladder (see `runbook.md`).

---

*Schemas file · part of github.com/sudosoph/bsw26-agentic-workflows · MIT licensed*


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: handouts/20-80-worksheet.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# The 20/80 Worksheet
## Architecting Agentic Workflows · Boulder Startup Week 2026

**Workshop:** Architecting Agentic Workflows for the Lean 2026 Startup
**Speaker:** Sophia Stein · AI Architect
**Resources:** agenticarchitect.ai/blog · github.com/sudosoph/bsw26-agentic-workflows

---

## The 3 axes

| Axis | High value (automate) | Low value (don't) |
|---|---|---|
| **Volume** | Daily / weekly recurrence | Once a quarter or less |
| **Determinism** | Same steps every time | Every case is different |
| **Reversibility** | If the agent's wrong, you fix it | If the agent's wrong, real damage |

```
GREEN  =  high vol  ×  deterministic  ×  reversible      → automate now
YELLOW =  high vol  ×  ambiguous      ×  reversible      → automate WITH HITL
RED    =  low vol   ×  ambiguous      ×  irreversible    → don't automate
```

---

## Step 1 — List 5 tasks you do every week

Anything recurring counts. Outbound. Support. Research. Operations. Content. Reporting. Hiring funnel. Pricing decisions.

| # | Task | Volume (H/L) | Determinism (D/A) | Reversibility (Low/High stakes) | Color (G/Y/R) |
|---|---|---|---|---|---|
| 1 |   |   |   |   |   |
| 2 |   |   |   |   |   |
| 3 |   |   |   |   |   |
| 4 |   |   |   |   |   |
| 5 |   |   |   |   |   |

---

## Step 2 — Pick your first agent

Look at your Greens. Pick the one that would free up the most time per week. Write it here:

```
My first agent will do:

________________________________________________________________

________________________________________________________________


It will run every: ☐ Day  ☐ Week  ☐ Triggered by event: __________


I'll approve / send / accept its output via:
  ☐ Gmail Drafts  ☐ Slack  ☐ Linear  ☐ Notion  ☐ Other: __________
```

---

## Step 3 — Sketch the architecture

Every agent has the same 5 boxes. Fill them in for YOUR agent.

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  TRIGGER     │ →  │  READ CONFIG │ →  │  SEARCH /    │ →  │  PROCESS     │ →  │  OUTPUT GATE │
│              │    │  (the files) │    │  EXTRACT     │    │  (cascade)   │    │  (HITL)      │
│              │    │              │    │              │    │              │    │              │
│              │    │              │    │              │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

**Examples to spark you:**

```
Inbound triage:
  Webhook (form fill) → ICP file → enrich lead → Sonnet draft → Gmail draft

Competitor watch:
  Cron (daily) → competitors.csv → scrape changelogs → Haiku diff → email digest

Content repurposer:
  Webhook (new blog) → voice.md → break into 3 channels → Sonnet rewrite each → drafts in Drive
```

---

## Step 4 — Estimate the impact

Be specific. Vague numbers don't motivate.

```
Today, I spend ___ hours / week on this task.

With the agent + HITL gate, I'll spend ___ hours / week.

Hours back per month:  ___

What I'll do with those hours:

________________________________________________________________

```

---

## Step 5 — Take it home

**Tonight:**
- ☐ Sign up for n8n.cloud (or self-host on a $5 Hetzner VPS)
- ☐ Get an Anthropic API key with $50 budget
- ☐ Get a Firecrawl trial key (free tier, 500 credits)
- ☐ Write your `voice.md` and `icp.md` files (start with the templates from the repo)

**This weekend:**
- ☐ Fork github.com/sudosoph/bsw26-agentic-workflows
- ☐ Import the n8n JSON
- ☐ Wire up your credentials
- ☐ Do 3 dry runs

**Next week:**
- ☐ Let it run daily for 7 days
- ☐ Review every draft before sending — track approval rate
- ☐ When approval rate hits 95%+, you're ready for Stage 3 (conditional auto)

---

## Two ways to keep going

**Architecture Audit** — 5 free 30-min audits for BSW attendees. First-come.
**Agentic Architect Blog** — agenticarchitect.ai/blog · weekly deep-dives.

---

*Worksheet by Sophia Stein · MIT licensed · feel free to fork & adapt*


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: handouts/oss-growth-playbook.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# The OSS Growth Playbook
## How AI Tools Grow — and How Your Startup Can Use the Same Playbook

**A take-home reference from "Architecting Agentic Workflows for the Lean 2026 Startup"**
*Boulder Startup Week 2026 · Sophia Stein · AI Architect*

---

## The 4-step pattern

Every AI tool we used in the workshop today followed this exact pattern:

1. **Ship something genuinely useful.** Not a marketing demo. Not a slide deck. Useful, in production, on day one.
2. **License it permissively.** Apache 2.0 or MIT. People won't fork what they can't use commercially.
3. **Build distribution and community trust.** Free first. Be everywhere. Solve real problems for real people.
4. **Monetize the slice nobody wants to self-host.** Managed cloud. Enterprise SSO. Premium support. Datasets. Training. The thing the user actively wants to pay for.

---

## Why it works in 2026

- **Distribution is the moat now.** Differentiation is a 2-week head start; distribution is a 2-year head start.
- **Founder taste is the new craft.** The discriminator isn't who CAN build the tool — it's who shipped a USEFUL one first.
- **AI lowered the cost of "shipping something useful"** from a 4-engineer team to a solo founder over a weekend. The funnel-top is wider than ever.
- **Buyers trust open source.** When your stack might run for years, locked-down vendors look fragile.

---

## 11 founders who used the playbook

| Company | OSS'd | Monetization | Outcome |
|---|---|---|---|
| **n8n** | Workflow engine · the runtime in our demo | Cloud + enterprise | 1M+ users · $60M Series B |
| **Hugging Face** | Transformers + model hub | Inference Endpoints + enterprise | $4.5B valuation |
| **Mistral** | Frontier model weights | API + enterprise | $6B valuation |
| **Temporal** | Durable workflow engine | Cloud + enterprise | $120M Series C · powers Datadog Bits AI |
| **Neo4j** | Graph database | AuraDB + enterprise | Industry standard for AI memory layer |
| **Chroma** | Vector DB | Chroma Cloud | $20M+ raised |
| **CrewAI** | Multi-agent framework | Mgmt platform · partnerships | 65% F500 adoption |
| **LangGraph** (LangChain) | Agent graph engine | LangSmith | Enterprise standard |
| **Browser Use** | Browser-agent library | TBD · still early | 81K stars in <12 months |
| **Firecrawl** | Web extraction · in our demo | Hosted Cloud | YC · fast growth |
| **Ollama** | Local LLM runtime | None yet · pure distribution | Default for local AI |
| **DeepSeek** | Frontier model weights | API | Disrupted closed labs |
| **Letta** (MemGPT) | Memory framework | Letta Cloud | Active fundraising |
| **OpenClaw** | File-based agent runtime | TBD · sponsorship phase | 355K stars · passed React Mar 3 2026 |

---

## How to apply this to YOUR startup — 5 concrete moves this month

### Move 1 — Open-source one internal tool that solves a niche pain
Look at the scripts and tools you've built for yourselves over the last 6 months. The ones you'd happily share with another founder. Pick the smallest, sharpest one. License MIT. Drop a README. Ship to GitHub. **Distribution often starts with a single 200-star repo.**

### Move 2 — Publish a high-quality template
n8n template. Claude prompt. CSV schema. Bash script. A README that makes it easy. **Templates beat tutorials** because they ship value before requiring time investment. The Founder's Discovery Engine you got from this workshop is exactly this — fork it, configure it, become the n8n template author for your niche.

### Move 3 — Write 5 deep-dive blog posts that document your craft
Pick one technical thing you do well. Write it down with code, screenshots, decisions, and dead-ends. Don't gatekeep. SEO won't help you in 2026 — referrals will, and a deep-dive post that's *the best on the internet* about a specific topic gets shared by exactly the people you want to reach. **My recommendation:** start a blog. Mine is at agenticarchitect.ai/blog if you want a model.

### Move 4 — Sponsor or contribute to one OSS tool you use
Find the tool you can't live without. Send the maintainer $20/month, or open one substantive PR. **You'll learn the codebase**, build a relationship with someone whose audience overlaps yours, and earn long-term goodwill. It's the cheapest BD you'll ever do.

### Move 5 — Treat your repo's README like your landing page
Every founder visiting your README is a potential evaluator. Spend 4 hours making it phenomenal. Hero image. Quickstart in 60 seconds. Use cases. FAQ. Discord/community link. **A great README is a sales asset.**

---

## What NOT to do

- **Don't open-source your moat.** If you have a proprietary algorithm or unique dataset that's the *whole* product, keep it closed. OSS the orbiting tools.
- **Don't pick GPL.** It scares enterprise buyers. Use MIT or Apache 2.0.
- **Don't ship a half-baked OSS project.** It's worse than no project. Buggy READMEs and broken installs become your reputation.
- **Don't expect to monetize OSS users directly.** Monetize the slice they don't want to self-host. The free-to-paid conversion is via *managed cloud* or *enterprise features*, not "premium support" alone.
- **Don't gatekeep the source of your insights.** If you can write a deep-dive blog post about how you architected something, write it. The founders who become the authority on a niche win the niche.

---

## The lesson

> **Distribution > differentiation, in 2026. Open source IS your distribution.**

You don't need to ship a $4.5B company. You need ONE useful free thing that gets shared in your audience's group chats. **Pick one of these this month:**

- **A:** Your n8n template → publish on GitHub MIT
- **B:** Your prompt library → newsletter lead magnet
- **C:** Your OSS Discovery Engine fork → distribution flywheel

The Discovery Engine you got from this workshop is option C, ready-made. Fork it, brand it, ship it as your own.

---

## Resources

- **The repo:** github.com/sudosoph/bsw26-agentic-workflows (MIT licensed)
- **The blog:** agenticarchitect.ai/blog (weekly deep-dives)
- **Architecture audits:** 5 free for BSW attendees · QR on closing slide
- **Boulder community:** Boulder AI Builders Meetup · Rocky Mountain AI Interest Group (RMAIIG) · Silicon Flatirons (CU Boulder)

---

*Take it. Build it. Ship it. — Sophia Stein · agenticarchitect.ai/blog*


## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE: resources-landing.md
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Welcome — you were at the BSW workshop.

> Everything from "Architecting Agentic Workflows for the Lean 2026 Startup" lives here. Bookmark this page.

**Workshop:** Boulder Startup Week 2026 · May 7 · RegenHub
**Speaker:** Sophia Stein · AI Architect · Local LLM & Agentic Workflows
**Newsletter:** [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog)

---

## The Founder's Discovery Engine

Everything you need to fork the agent we built live.

- 📦 **Repo (MIT licensed):** [github.com/sudosoph/bsw26-agentic-workflows](https://github.com/sudosoph/bsw26-agentic-workflows)
- 🔧 **n8n workflow JSON** — `n8n/bsw-growth-agent.json` (importable)
- 📋 **Setup README** — 30-min start-to-running guide
- 📝 **Sample voice.md** — your brand voice file template
- 🎯 **Sample icp.md** — ICP definition file template
- 🗃 **Sample schemas.md** — agent JSON output shapes
- 🚫 **Sample do-not-contact.csv** — exclusion list template

**Fork the repo. Configure your three files. You're running by Sunday.**

---

## The handouts

PDFs printed in-room are in the repo too:

- 📐 **The 20/80 Worksheet** — fill in your 5 tasks · pick your first agent
- 🧰 **The OSS Growth Playbook** — 11 case studies + 5 moves you can make this month
- 🎨 **voice.md template** — with 5 example emails you can adapt
- 📊 **Schemas reference** — JSON shapes for every agent step

---

## Two ways to keep going

### Architect's Office Hours
**5 free 30-minute audits for BSW attendees.** First-come, first-booked.

You bring your bottleneck — I tell you what to automate, what to leave alone, and which 3 tools to use.

**[Book a slot →](https://cal.com/sophia-stein/architect-audit-bsw)**

### Agentic Architect Blog
Weekly deep-dives on agentic architecture for lean founders. n8n templates, cost teardowns, what's actually working in 2026.

**[agenticarchitect.ai/blog →](https://agenticarchitect.ai/blog)**

Free for BSW attendees. Yes, I will write about whatever questions you DM me from the workshop.

---

## Boulder community — bring an agent next month

- 🏔 **Boulder AI Builders Meetup** — monthly · 3,000+ members in Boulder
- ⛰ **Rocky Mountain AI Interest Group (RMAIIG)** — 200+ attendee meetups
- 🎓 **Silicon Flatirons** (CU Boulder) — annual AI conference + research + working groups

---

## The patterns we covered today

> Take a photo. Print it. Tape it to your monitor.

| # | Pattern | Where to use it |
|---|---|---|
| 1 | Cron + webhook triggers | Wake the agent up |
| 2 | **Config-as-files** | Editable behavior, no redeploys |
| 3 | Cascade model selection (Haiku → Sonnet → Opus) | 60-70% bill cut |
| 4 | Web search as agent eyes | Claude `web_search` built-in tool |
| 5 | Targeted enrichment | Cheap-fast first, expensive-deep second |
| 6 | Schema-first JSON | Connections that don't break |
| 7 | Idempotent dedup | Re-run safety |
| 8 | **HITL via Gmail drafts** | Brand voice protection |
| 9 | Sub-agent decomposition | Each gets only the context it needs |
| 10 | Audit log on every action | Trust through track record |
| 11 | Cost metering per run | Know your real bill |
| 12 | Follow-up via thread context | Same architecture, different inputs |

**Tools change. Patterns don't.**

---

## 7 other agents you can build with the same stack

| Agent | What it does | Trigger | Output |
|---|---|---|---|
| Inbound Triage | Form fill → research → draft response | Webhook | Gmail draft |
| Competitor Pulse | Daily diff competitor changelogs | Cron daily | Email digest |
| Support Draft | Ticket → KB → drafted reply | Webhook | Helpdesk draft |
| Content Repurposer | Blog → tweet thread + LinkedIn + newsletter | Webhook | Drafts in Drive |
| Call Notes → CRM | Recording → notes → CRM update | Webhook | CRM entry |
| Investor Update | Metrics → narrative → draft email | Cron monthly | Gmail draft |
| Onboarding Personalizer | Signup → enriched welcome series | Webhook | Gmail sequence |

**Same architecture. Different trigger. Different search/extract logic. Different output.**

---

## The stack we used (and why)

| Layer | Tool | Why |
|---|---|---|
| Reasoning | Claude **Sonnet 4.6** + **Haiku 4.5** | Cascade pattern · 60-70% bill cut |
| Web search | Claude `web_search` tool | One vendor, one key, one node |
| Orchestration | **n8n** (self-host or cloud) | OSS · visual · MCP-native · code escape hatch |
| Web extract | **Firecrawl** (self-host or cloud) | OSS Apache 2.0 · best on JS-heavy sites |
| Storage / queue | **Google Sheets** | Free · universal · founder-editable |
| HITL gate | **Gmail Drafts** | Free · the agent NEVER sends |

**4-tier cost roadmap:** $135 → $95 → $15 → $8 per month for the same workflow.

---

## About Sophia

I architect agentic systems for early-stage founders. Local LLMs, lean stacks, and open-source tooling are my world.

I write at [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog), ship templates at [github.com/sudosoph](https://github.com/sudosoph), and run free Architecture Audits for founders building their first agents.

Boulder-based. Available for short consults.

---

*Resources page · part of github.com/sudosoph/bsw26-agentic-workflows · MIT licensed*
*— Sophia Stein · AI Architect*

