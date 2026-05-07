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
