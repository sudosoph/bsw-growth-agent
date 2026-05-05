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
