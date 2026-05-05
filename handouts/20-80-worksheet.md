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
