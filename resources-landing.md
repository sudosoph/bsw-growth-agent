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
