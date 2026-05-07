// REPLACES the Digest · Sonnet 4.6 HTTP-node body construction.
// Convert the existing "Digest · Sonnet 4.6" HTTP node OR add a Code node
// before it that builds the body, then point the HTTP node at $json.body.
//
// This pulls actual lead details (person, signal, evidence, sendTo) into the
// digest prompt so the email tells the founder WHAT to review, not just counts.

let parseSubjectItems = [];
let buildDraftItems = [];
let buildDiscoveryItems = [];
let parseExtractItems = [];

try { parseSubjectItems   = $('Parse · Subject + Body').all(); } catch (e) {}
try { buildDraftItems     = $('Build Draft Body').all(); } catch (e) {}
try { buildDiscoveryItems = $('Build Discovery Body').all(); } catch (e) {}
try { parseExtractItems   = $('Parse · Extract qualified leads').all(); } catch (e) {}

const today = new Date().toISOString().slice(0, 10);
const totalDiscovered = buildDiscoveryItems.length;
const totalQualified = parseExtractItems.length;
const totalDrafted = parseSubjectItems.length;

// Source breakdown across the drafts that actually got created (hn / reddit / lobsters)
const sourceCounts = {};
for (const item of parseSubjectItems) {
  const src = (item.json && item.json.lead && item.json.lead.source) || 'unknown';
  sourceCounts[src] = (sourceCounts[src] || 0) + 1;
}
const sourceBreakdown = Object.entries(sourceCounts)
  .map(([s, n]) => n + ' from ' + s)
  .join(', ') || 'none';

// Build a per-draft summary block.
const draftSummaries = parseSubjectItems.map((item, idx) => {
  const j = item.json || {};
  const lead = j.lead || {};
  const upstream = (buildDraftItems[idx] && buildDraftItems[idx].json) || {};
  const sendTo = j.sendTo || upstream.sendTo || 'unresolved';
  const sendToSource = j.sendToSource || upstream.sendToSource || 'unresolved';
  const profileUrl = (upstream.sendToCandidates || []).find(c => /^https?:\/\//.test(c)) || '';
  return [
    '— Lead ' + (idx + 1) + ': ' + (lead.person || 'unknown'),
    '  Signal: ' + (lead.signal_type || 'n/a') + ' (score ' + (lead.score || 'n/a') + ', via ' + (lead.source || 'n/a') + ')',
    '  Evidence: "' + ((lead.evidence_quote || '').slice(0, 180)).replace(/\s+/g, ' ').trim() + '"',
    '  Source post: ' + (lead.source_url || 'n/a'),
    '  Draft sendTo: ' + sendTo + ' (resolved via ' + sendToSource + ')',
    profileUrl ? '  Profile to verify: ' + profileUrl : '',
    '  Subject: ' + (j.subject || '(missing)')
  ].filter(Boolean).join('\n');
}).join('\n\n');

const userContent = 'You are writing the morning digest email to the founder. Today is '
  + today + '.\n\n'
  + 'Pipeline run summary:\n'
  + '  • Discovered: ' + totalDiscovered + ' raw leads (HN + Reddit + Lobsters)\n'
  + '  • Qualified (score ≥ 4): ' + totalQualified + '\n'
  + '  • Drafts created in Gmail: ' + totalDrafted + ' (' + sourceBreakdown + ')\n\n'
  + 'Each draft below is sitting in the founder\'s Gmail Drafts folder, awaiting review:\n\n'
  + (draftSummaries || '(no drafts created today)') + '\n\n'
  + 'Write a tight, friendly digest email. Format:\n'
  + 'SUBJECT: Discovery pulse — ' + today + ' — N drafts ready\n'
  + 'BODY:\n'
  + 'Open with one sentence on what got drafted. Then list each draft with the person, '
  + 'a one-line summary of why they\'re a good lead (use the evidence quote), and the '
  + 'verification step the founder should take (profile URL or recipient candidate). '
  + 'Close with: "Approve drafts before 5pm." No corporate fluff.';

const body = {
  model: 'claude-sonnet-4-6',
  max_tokens: 800,
  system: 'You write a brief daily digest email for a founder running a customer-discovery agent. Friendly, specific, actionable. Always include the per-lead evidence and verification steps so the founder can review without leaving the email.',
  messages: [
    { role: 'user', content: userContent }
  ]
};

return [{ json: { body, totalDiscovered, totalQualified, totalDrafted } }];
