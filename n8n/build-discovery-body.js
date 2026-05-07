// Build Discovery request body. Pasted into a Code node between
// "Read ICP from Sheets" and "Discovery · Claude Haiku 4.5 + web_search".

const icp = $input.first().json;

const subreddits = (icp.subreddits || 'SaaS,Entrepreneur,AI_Agents')
  .split(',')
  .map(s => 'r/' + s.trim())
  .join(', ');

const body = {
  model: 'claude-haiku-4-5',
  max_tokens: 2000,
  tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
  system: `You are a customer-discovery research agent for a lean startup.

ICP context:
${icp.icp_description || ''}

Signal keywords: ${icp.signal_keywords || ''}

Return ONLY a JSON array. No prose. No explanation.`,
  messages: [
    {
      role: 'user',
      content: `Use web_search to find recent (last 7 days) public posts on Hacker News, Reddit (${subreddits}), and Product Hunt where founders or operators are publicly displaying signals matching my ICP. Look for: pain mentions, hiring posts I could solve, complaints about competitors, asks for tools.

Return a JSON array, max 30 items. Each item has: person (handle), signal_type (pain|hiring|complaint|tool_ask), source_url, evidence_quote (verbatim), score (0-10), company, company_url.`
    }
  ]
};

return [{ json: { body } }];
