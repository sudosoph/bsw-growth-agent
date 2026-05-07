# `n8n/` — Workflow assets, code-node bodies, and fix recipes

This directory holds everything you need to import, configure, and debug the BSW Growth Agent in n8n Cloud or self-hosted n8n.

---

## 🔗 Published reference workflow

The author's working copy is published at:

> https://sophiastein.app.n8n.cloud/workflow/bd3bleAE0dPG4SgN

**Replace `sophiastein` with your own n8n Cloud subdomain** when running it on your instance. The workflow ID at the end (`bd3bleAE0dPG4SgN`) stays the same when you import the JSON file below — it's what n8n auto-assigns on import.

If you just want to inspect node-by-node configuration without importing, the URL above is a public read-only-style reference (you'll see node names, positions, expressions, but not the author's credentials).

---

## File index

### 🚀 Workflow JSON (import these into n8n)

| File | What it is | When to use |
|---|---|---|
| `bsw-growth-agent.json` | **Full paid stack with all fixes baked in** | Demo / production |
| `bsw-growth-agent-lite.json` | Free stack: Groq + Jina + HN/Reddit JSON | Workshop fallback, no billing (note: NOT yet updated with the fixes below — use the paid version for demo) |
| `bsw-growth-agent-fixed.json` | Older snapshot kept for reference | Don't use |

> **What "all fixes baked in" means:** the workflow JSON already contains the post-debug code in every Code node, the post-debug column expressions in Sheets nodes, the parallel-branch sheet logging, the Build Digest Body intermediary, the correct `={{ $json.sendTo }}` Gmail "To" field, and the Drive Google File Conversion option for voice.md. **You should not need to paste any code manually after import.** Just replace the `REPLACE_*` placeholders, wire your credentials, and run.

### 📝 Code-node bodies (reference copies of what's already inside the JSON)

These `.js` files are the **source of truth for the code** that lives inside the workflow's Code nodes. They exist as standalone files so you can:
- Read them in your editor with proper syntax highlighting
- Diff them against future updates
- Customize the logic and re-paste if you want to tweak behavior

| File | Inside JSON as Code node named… | Purpose |
|---|---|---|
| `fetch-hn-posts.js` | **Build Discovery Body** | Pulls leads from HN Algolia + Reddit (with cloud-IP fallback) + Lobsters with quality filtering |
| `build-summarize-body.js` | **Build Summarize Body** | Constructs Anthropic call body for per-lead Haiku summary |
| `build-draft-body.js` | **Build Draft Body** | Constructs Sonnet draft request + resolves recipient email + voice.md binary detection |
| `build-digest-body.js` | **Build Digest Body** | Builds the morning digest prompt with per-lead evidence + verification info |
| `parse-passthrough.js` | **Parse · Extract qualified leads** | Score-≥4 filter + 3 hardcoded fallback leads |
| `parse-subject-body.js` | **Parse · Subject + Body** | Parses Sonnet's SUBJECT/BODY response, forwards sendTo + footer |
| `build-discovery-body.js` | *(legacy)* | Old Anthropic-driven discovery — replaced by `fetch-hn-posts.js` |

### 🔧 Fix recipes (historical — most of these are now baked into the JSON above)

These docs describe the manual UI fixes we needed during demo prep. **They've been applied to the canonical `bsw-growth-agent.json`**, so a fresh import already has them. Keep these for reference if you're working on a forked/older variant.

| File | What it fixed | Status |
|---|---|---|
| `fix-discovery.txt` | Original Discovery web_search node body | ✅ Replaced — node is now `Build Discovery Body` Code node |
| `fix-summarize.txt` | Summarize prompt & reference | ✅ Baked into `Build Summarize Body` |
| `fix-draft.txt` | Draft sendTo expression + body shape | ✅ Baked into `Build Draft Body` |
| `fix-parse.txt` | Parse paired-item workarounds | ✅ Baked into `Parse · Extract qualified leads` |
| `fix-sheet-logging.txt` | Parallel branch + column expressions | ✅ Branch + columns fixed in JSON |
| `fix-digest.txt` | Insert Build Digest Body code node | ✅ Node + wiring done in JSON |

---

## 🚦 Path to a working run (with the post-debug JSON)

If you're starting from a fresh import of `bsw-growth-agent.json`, do these in order:

1. **Import** `bsw-growth-agent.json` into n8n. Open the workflow.
2. **Wire credentials** — see `setup/README.md` for the full list (Anthropic, Firecrawl, Google Sheets, Drive, Gmail). Each node's "Credentials" dropdown needs your account selected.
3. **Replace `REPLACE_*` placeholders** — open each node and search for `REPLACE_`. There are about 6 spots:
   - `REPLACE_WITH_YOUR_SHEET_ID` (3 Sheets nodes — ICP, Sent log, Runs log)
   - `REPLACE_WITH_VOICE_MD_FILE_ID` (Drive node)
   - `REPLACE_WITH_YOUR_EMAIL@example.com` (Gmail digest node)
4. **Verify voice.md upload** — your voice.md needs to be **plain text or markdown in Drive**, not converted to a Google Doc. Either disable Drive's auto-convert setting before uploading, or rely on the Drive node's `Google File Conversion → text/plain` option (already set in the JSON).
5. **Run once manually** — click "Execute Workflow" in n8n and watch the execution panel. Code-node console output appears in the bottom log panel.

That's it. No code-pasting. No re-wiring nodes. The JSON has been pre-fixed with everything we learned during demo prep.

---

## ⚠️ Known platform constraints (read this before debugging)

These are the hard limits we hit during demo prep. Save yourself an hour:

### Reddit blocks n8n Cloud IPs
n8n Cloud shares its egress IPs across many tenants. Reddit (and most cloud-IP rate-limit lists) block them aggressively in 2024+. Result:
```
reddit:probe: ALL HOSTS FAILED
old.reddit.com Request failed with status code 403
api.reddit.com Request failed with status code 403
www.reddit.com Request failed with status code 403
safereddit.com Request failed with status code 403
redlib.catsarch.com Request failed with status code 403
libreddit.privacydev.net timeout of 7000ms exceeded
```
**Workarounds:**
- Self-host n8n on your own IP (Docker on a VPS or your laptop)
- Use Reddit OAuth via the official n8n Reddit node (registers an app — much higher rate limits)
- Drop Reddit and rely on HN + Lobsters

The current `fetch-hn-posts.js` tries 6 Reddit endpoints with `Promise.any` and fails fast. If all fail, the workflow continues with just HN + Lobsters.

### `fetch()` is blocked in Code nodes
n8n's Code-node sandbox does not expose the global `fetch`. Use:
```js
const data = await this.helpers.httpRequest({ method: 'GET', url, json: true, timeout: 8000 });
```
Every code file in this directory uses this pattern.

### 60-second Code-node timeout
Long-running sequential HTTP calls hit it fast. The current `fetch-hn-posts.js` parallelizes everything with `Promise.all` / `Promise.any` and uses 7-8s per-request timeouts so worst case is ~30s.

### Paired-item lookups break across HTTP nodes
`$('SomeNode').item.json` triggers a paired-item lookup that fails after some n8n nodes (HTTP, Gmail, Sheets) with `Cannot assign to read only property 'name' of object 'Error: Referenced node doesn't exist'`. **Use `.all()[$itemIndex]` or `.all()[idx]` instead** — index-based lookup never throws.

### Code-node auto-naming
When you create a Code node, n8n names it "Code", "Code1", etc. **You must rename it to the exact name that downstream nodes expect** (e.g., "Build Discovery Body"). Otherwise the digest node and audit-log node fail with "Referenced node doesn't exist" — visible in their output as empty/error.

### Sheet rows don't appear after Gmail
Gmail's response REPLACES the input JSON. So if `Append · Sent log` sits AFTER `Gmail · createDraft`, all `$json.lead.*` expressions are undefined → row is silently empty. **Fix:** move the Sheets node to a parallel branch off `Parse · Subject + Body`. See `fix-sheet-logging.txt`.

### voice.md as Google Doc
Drive auto-converts `.md` uploads to Google Docs format unless you turn it off. Result: `download` returns a binary `.gdoc` shortcut. The current `build-draft-body.js` detects this (`looksLikePlainText()`) and falls back to a built-in voice. To use your real voice, either:
- Disable Drive's "Convert uploads" setting before re-uploading, OR
- In the Drive node Options, set **Google File Conversion → Google Docs → text/plain**

### Gmail "To" field gotcha
If you type `=$json.sendTo` (without curly braces) in the To field, Gmail receives the literal string `=somebody@example.com` and rejects it with "Invalid To header". The expression form is `{{ $json.sendTo }}` with the field toggled to expression mode (the `=` button next to the field).

### HN profile email scraping is best-effort
Only ~30% of HN users put a contact email or URL in their `about` field. For the rest, `build-draft-body.js` falls back to `<handle>@verify-on-hn.example` and includes the HN profile URL in the draft footer so the founder can manually verify before sending.

Example output you should expect to see in the Build Draft Body console log:
```
voice.md is binary/DOCX (re-upload as plain .md). Using default voice.
Lead 0 [@codazoda] sendTo: joel@joeldare.com (profile_email)
Lead 1 [@arctide] sendTo: arctide@verify-on-hn.example (handle_placeholder_no_contact)
Lead 2 [@huxingyi] sendTo: huxingyi@verify-on-hn.example (handle_placeholder_no_contact)
```

---

## 🔍 How to read the diagnostic logs

Open the n8n workflow → click the **Build Discovery Body** node → run it (or run the whole workflow). The execution panel shows a console section. Look for:

```
[Node: "Build Discovery Body"] 'Discovery: HN 50→25 | Reddit 0→0 (none) | Lobsters 35→0 | total 25'
[Node: "Build Discovery Body"] 'Per-source detail: {
  "hn:n8n cost": 20,
  "hn:Sonnet 4.6 cost": 20,
  "hn:Apollo.io alternative": 0,
  "reddit:probe": "ALL HOSTS FAILED",
  "lobsters:/hottest.json": 25,
  "lobsters:/newest.json": 25
}'
[Node: "Build Discovery Body"] 'Errors: [...]'
```

The format is `<source> <raw>→<filtered>`. Raw = how many posts the API returned. Filtered = how many passed the quality check (keyword + min-length + ICP-context match).

If HN raw is 0 → ICP keywords are too obscure. Edit the `signal_keywords` cell in your Sheet.

If HN filtered is 0 but raw is high → quality filter is too strict for your ICP. Loosen `passesQualityCheck()` in `fetch-hn-posts.js` or add ICP-relevant words to the `GENERIC_PAIN` array.

If Reddit raw is 0 → cloud IP block (see above). Switch to OAuth or self-host.

If Lobsters raw is 50 but filtered is 0 → Lobsters' content (general dev) doesn't intersect your ICP keywords. Normal for AI/sales ICPs. Lobsters lights up for ICPs about programming languages, OS internals, security research.

---

## 🧪 Running manually + reading the console

In n8n's editor:
1. Open the workflow at `https://<your-subdomain>.app.n8n.cloud/workflow/<workflow-id>`
2. Click any node to open its detail panel
3. Click **Execute step** to run just that node, or **Test workflow** to run end-to-end
4. After execution, the panel shows: **Input** | **Output** | **Settings** tabs. Click **Output** to see the JSON each node emitted.
5. Console.log lines from Code nodes appear in the top-of-window log panel (toggle the bottom-left log icon if you don't see it).

For browser DevTools console (e.g., to fire a webhook trigger from outside n8n):
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Click the **Console** tab
3. Paste:
```js
fetch('https://<your-subdomain>.app.n8n.cloud/webhook-test/discovery-engine-manual', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{}'
})
```
4. Hit enter. Returns a Promise. Switch back to the n8n tab to watch execution.

The 500 errors you'll see in the console are usually the webhook returning 500 because no node returned a response — that's expected for the trigger webhook in this workflow. The execution itself runs in the background.

---

## 📚 Further reading

- `../TUTORIAL.md` — the full code-along
- `../setup/README.md` — credential setup, Sheet schema, smoke tests
- `../CONFIGURATION.md` — provider swap recipes (Groq, Tavily, Jina alternatives)
- `../handouts/voice-md-template.md` — example voice.md to start from
- `../handouts/icp-md-template.md` — example ICP definition
