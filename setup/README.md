# Setup README — Founder's Discovery Engine
## BSW 2026 Workshop · Day-of Logistics + Pre-Talk Setup

**Workshop:** Thursday, May 7, 2026 · 11:00 AM – 12:00 PM · RegenHub Boulder

---

## What's in this repo

```
/home/sophia-stein/bsw/
├── docs/superpowers/
│   ├── specs/2026-05-04-bsw-agentic-workflows-workshop-design.md
│   └── plans/2026-05-04-bsw-workshop-build.md
├── slides/
│   └── index.html                                    ← the deck (open in Chrome)
├── script/
│   └── speaker-notes.md                              ← 10K-word speaker script
├── n8n/
│   └── bsw-growth-agent.json                ← importable workflow
├── handouts/
│   ├── voice-md-template.md                          ← brand voice file
│   ├── icp-md-template.md                            ← ICP definition
│   ├── schemas-md-template.md                        ← agent JSON schemas
│   ├── do-not-contact-template.csv                   ← exclusion list
│   ├── 20-80-worksheet.md                            ← in-session printable
│   └── oss-growth-playbook.md                        ← take-home reference
├── setup/
│   └── README.md                                     ← THIS FILE
└── resources-landing.md                              ← QR-code destination
```

---

## Pre-talk setup checklist (do this Tue/Wed)

### Accounts you need

- [ ] **Anthropic API key** — platform.claude.com → Workbench → Settings → API Keys. Reserve $50 budget.
- [ ] **Firecrawl trial** — firecrawl.dev → free tier is 500 credits, plenty for the demo
- [ ] **n8n.cloud trial** — n8n.io/cloud (or self-host via `docker run -it --rm -p 5678:5678 n8nio/n8n` on a $5 Hetzner VPS)
- [ ] **Google Workspace** — your existing personal Gmail
- [ ] **GitHub repo** — create `sudosoph/bsw26-agentic-workflows` · MIT license · push the n8n JSON + handouts

### Google Drive folder structure

Create a folder called `agentic-architect/` in Drive containing:

- `voice.md` — copy contents of `handouts/voice-md-template.md`, edit to your voice
- `icp.md` — copy contents of `handouts/icp-md-template.md`, edit to your ICP
- `do-not-contact.csv` — copy from `handouts/do-not-contact-template.csv`

### Google Sheet

Create one Sheet with three tabs:

**Tab 1 — `ICP`** (read by the agent on every run)
| icp_description | signal_keywords |
|---|---|
| Early-stage SaaS founders, pre-PMF, technical-leaning, complaining about outbound costs | n8n cost, Lindy credits, hired SDR, founder-led sales, Sonnet 4.6 cost |

**Tab 2 — `Sent`** (idempotency log — agent appends each draft)
Headers: `date · person · signal_type · source_url · score · draft_subject · status`

**Tab 3 — `Runs`** (audit log — agent appends each run)
Headers: `date · leads_found · qualified · drafts · errors · notes`

### n8n workflow import

1. Open n8n
2. Click `+ Add Workflow` → menu (`...`) → `Import from File...`
3. Select `/home/sophia-stein/bsw/n8n/bsw-growth-agent.json`
4. Wire up credentials:
   - **Anthropic API · x-api-key** → HTTP Header Auth, name=`x-api-key`, value=your key
   - **Firecrawl API · Authorization Bearer** → HTTP Header Auth, name=`Authorization`, value=`Bearer fc-yourkey`
   - **Google Sheets account** → OAuth2 against your Google Workspace
   - **Google Drive account** → OAuth2 against your Google Workspace
   - **Gmail account** → OAuth2 against your Google Workspace
5. Replace placeholders in the workflow:
   - `REPLACE_WITH_YOUR_SHEET_ID` — your Google Sheet ID (from the URL)
   - `REPLACE_WITH_VOICE_MD_FILE_ID` — the voice.md file ID in Drive (right-click → Share → copy link → extract ID)
   - `REPLACE_WITH_YOUR_EMAIL@example.com` — your Gmail address
6. Toggle the workflow `Active`
7. Test with the Manual webhook trigger

---

## Day-of timeline

### T-60 minutes (10:00 AM)

- [ ] Arrive at RegenHub
- [ ] Find the AV tech, plug in
- [ ] Test screen mirroring
- [ ] Open `/home/sophia-stein/bsw/slides/index.html` in Chrome
- [ ] Press **F** to fullscreen, advance through 5 slides to verify rendering
- [ ] Close, return to slide 1

### T-30 minutes (10:30 AM)

- [ ] Run the n8n workflow ONCE manually to verify Anthropic + Firecrawl + Sheets all working
- [ ] Check Gmail Drafts folder — should see 5 fresh drafts from the test run
- [ ] Delete those test drafts (they were against test ICP, not real)

### T-10 minutes (10:50 AM)

- [ ] Open ALL tabs in this exact order:
  - **⌘+1** → slides (Chrome)
  - **⌘+2** → n8n.cloud (workflow editor + execution view)
  - **⌘+3** → Gmail (Drafts folder)
  - **⌘+4** → Google Drive (showing voice.md / icp.md visible)
  - **⌘+5** → Google Sheets (Runs tab)
- [ ] Phone on Do Not Disturb
- [ ] Water bottle visible

### T-2 minutes (10:58 AM)

- [ ] **Set the manual trigger to fire RIGHT NOW** — webhook URL or "Execute Workflow" button. The cron should fire 60-90 seconds before the talk starts so the demo is mid-flight when you hit slide 3.

### T-0 (11:00 AM)

- [ ] Walk on stage. Smile. Look at the room.
- [ ] DON'T introduce yourself yet.
- [ ] Click Slide 1.

---

## Screen layout during the talk

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                       SLIDES (default)                       │
│                                                              │
│                                                              │
│   ⌘+1: SLIDES        ⌘+2: n8n         ⌘+3: GMAIL             │
│   ⌘+4: DRIVE         ⌘+5: SHEETS                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**During the live demo (slide 3):** ⌘+2 to n8n, then ⌘+3 to Gmail. Don't ⌘-tab through random tabs. Stay on script.

**During build-along (slides 22-30):** ⌘+2 to n8n. Walk through each node visually. Reference the architecture diagram on slide 21 as anchor.

---

## Wi-Fi failure recovery

**If the venue Wi-Fi tanks during the cold open (slide 3):**

1. Don't panic. Say: *"I had a screen recording ready exactly because demo gods are unforgiving."*
2. Open `backup-demo.mp4` (record this Tue/Wed — see below).
3. Play the screencast inline. Same narration script.

**If Wi-Fi tanks during the build-along (slides 22-30):**

1. The slides are self-contained HTML — they continue to render.
2. Skip the live n8n cuts. Walk through the diagrams + code blocks on the slides themselves.
3. Promise the audience: *"The full live workflow JSON is at the QR code at the close. You can fork it tonight."*

---

## Backup screencast spec

Record this Tuesday or Wednesday before the talk:

- **Tool:** QuickTime Player (Mac) or OBS (Win/Linux)
- **Length:** 90 seconds
- **What to capture:**
  - 0:00 — n8n workflow execution view, scroll through completed nodes
  - 0:20 — switch to Gmail, show 5 drafts populating in real time
  - 0:50 — open one draft, show the personalized email
  - 1:10 — switch back to n8n, show the Runs sheet log
- **Save as:** `~/Desktop/bsw-backup-demo.mp4` (so you can drag-drop into Chrome if needed)

---

## Post-talk (12:00 PM onwards)

### Immediately after the close

- [ ] Stay at the front for 5-10 min · take questions
- [ ] Have the QR codes still visible · screenshot the Office Hours QR for any attendee who didn't catch it
- [ ] Take 2-3 photos of the Sheets `Runs` log filled with workshop-day data — case study evidence for the next blog post

### Within 24 hours

- [ ] Tweet the GitHub repo link with #BSW2026 hashtag · tag @boulderstartupweek
- [ ] Push a commit to `sudosoph/bsw26-agentic-workflows` with the workshop date in the README ("v1.0.0 — shipped at BSW 2026")
- [ ] Write the workshop recap blog post for agenticarchitect.ai/blog
- [ ] Email anyone who DM'd you during the talk

### Within 7 days

- [ ] Send the recap email to all attendees who signed up for Office Hours
- [ ] Schedule the first 5 Office Hours audits
- [ ] Publish the recap blog post

---

## Common things that break (and how to fix them)

| Symptom | Likely cause | Fix |
|---|---|---|
| Anthropic 401 | API key not in n8n credential | Re-paste, check for trailing whitespace |
| Anthropic 400 — "model not found" | Wrong model ID string | Use `claude-sonnet-4-6` and `claude-haiku-4-5` exactly |
| Firecrawl 402 | Out of credits | Top up or swap for self-hosted Firecrawl image |
| Sheets append fails | OAuth scope missing | Re-auth Sheets credential, ensure write scope |
| Gmail draft creation fails | OAuth scope missing | Re-auth Gmail with `gmail.compose` scope |
| Drafts have wrong recipient | `person@unknown.example` placeholder | Add an email-resolution step (Apollo / Hunter API) — out of scope for the workshop demo |

---

## Resources for follow-up

- **Agentic Architect Blog:** agenticarchitect.ai/blog
- **Office Hours:** Cal.com link in resources-landing.md
- **GitHub:** github.com/sudosoph/bsw26-agentic-workflows
- **Twitter:** @sudosoph

---

*Setup guide v1.0 · Sophia Stein · MIT licensed — fork the repo and adapt for your own talk*
