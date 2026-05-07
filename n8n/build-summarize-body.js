// REPLACES Build Summarize Body code. Characterizes the HN person, not a company.

const firecrawlItems = $input.all();

let dedupItems = [];
try {
  dedupItems = $('Dedup · top 5 fresh leads').all();
} catch (e) {
  console.log('Dedup node lookup failed:', e.message);
}

const outputs = firecrawlItems.map((fcItem, idx) => {
  const firecrawl = fcItem.json;
  const markdown = (firecrawl.data && firecrawl.data.markdown) ? firecrawl.data.markdown : '';
  const lead = (dedupItems[idx] && dedupItems[idx].json) || {};

  const body = {
    model: 'claude-haiku-4-5',
    max_tokens: 300,
    system: 'You analyze a single Hacker News post or comment to extract context about the person who wrote it. Output 2 plain-text sentences: (1) what they were discussing or working on, (2) any signal about their role, project, or pain. No JSON, no markdown, no preamble. If the post is too thin to characterize, say so in 1 sentence.',
    messages: [
      {
        role: 'user',
        content: 'HN post or comment by ' + (lead.person || 'unknown') + ':\n\n'
          + markdown.slice(0, 3000)
          + '\n\nWrite 2 sentences capturing what this person is working on and what their signal suggests about their potential pain or interest.'
      }
    ]
  };

  return { json: { body, lead } };
});

return outputs;
