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
   - Cron Expression: `0 7 * * *` (every day at 7:00 AM)

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

**Office Hours · 5 free 30-min audits for BSW attendees:** [cal.com/sudosoph/architect-audit-bsw](https://cal.com/sudosoph/architect-audit-bsw) (capped at 5 bookings)

**Newsletter:** [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog) — weekly deep-dives on agentic architecture for lean founders

**Email:** sophia@agenticarchitect.ai

---

*Tutorial v1.0 · MIT licensed · fork freely · ship yours · — Sophia Stein, AI Architect*
