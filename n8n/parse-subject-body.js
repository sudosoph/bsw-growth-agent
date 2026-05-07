// REPLACES Parse · Subject + Body. Forwards sendTo + appends candidates footer to body.

const draftItems = $input.all();

let buildDraftItems = [];
try {
  buildDraftItems = $('Build Draft Body').all();
} catch (e) {
  console.log('Build Draft Body lookup failed:', e.message);
}

const outputs = draftItems.map((draftItem, idx) => {
  const response = draftItem.json;
  const text = ((response.content && response.content[0] && response.content[0].text) || '').trim();

  const subjectMatch = text.match(/^SUBJECT:\s*(.+?)\s*\n/);
  const bodyMatch = text.match(/BODY:\s*\n([\s\S]+)$/);

  const subject = subjectMatch ? subjectMatch[1].trim() : 're: a quick question';
  let body = bodyMatch ? bodyMatch[1].trim() : text;

  const upstream = (buildDraftItems[idx] && buildDraftItems[idx].json) || {};
  const lead = upstream.lead || {};
  const sendTo = upstream.sendTo || 'TODO-resolve-recipient@placeholder.example';
  const sendToSource = upstream.sendToSource || 'unresolved';
  const sendToCandidates = upstream.sendToCandidates || [];
  const footerNote = upstream.footerNote || '';

  // Append recipient hint footer so founder can swap before sending
  if (footerNote) body = body + footerNote;

  return { json: { subject, body, lead, sendTo, sendToSource, sendToCandidates } };
});

return outputs;
