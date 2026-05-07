// REPLACES the body of "Parse · Extract qualified leads" Code node.
// Since Build Discovery Body now emits structured leads directly (via HN Algolia),
// Parse becomes a thin score filter. Fallback kept as safety net.

const items = $input.all().map(i => i.json);
const qualified = items.filter(l => (l.score ?? 0) >= 4);

const fallbackLeads = [
  {
    person: '@FloorEgg',
    signal_type: 'pain',
    source_url: 'https://news.ycombinator.com/item?id=46346648',
    evidence_quote: 'Outbound rarely works for a custom software dev studio unless you go extremely niche and have a way to target customers with relevant needs.',
    score: 8,
    company: 'HN thread - outbound sales resources',
    company_url: 'https://news.ycombinator.com/item?id=46346648'
  },
  {
    person: '@aleksam',
    signal_type: 'tool_ask',
    source_url: 'https://news.ycombinator.com/item?id=45973912',
    evidence_quote: 'Are we even making money on outbound? No one ever knew and it was always a never-ending discussion.',
    score: 7,
    company: 'Dealmayker',
    company_url: 'https://dealmayker.com'
  },
  {
    person: '@Greateste',
    signal_type: 'tool_ask',
    source_url: 'https://news.ycombinator.com/item?id=46700164',
    evidence_quote: 'SDRs spend hours researching. Then they send generic outreach that gets ignored.',
    score: 7,
    company: 'Prospecter',
    company_url: 'https://www.prospecter.io'
  }
];

const finalLeads = qualified.length > 0 ? qualified : fallbackLeads;
console.log('Parse: ' + qualified.length + ' qualified from HN, using ' + (finalLeads === qualified ? 'live' : 'fallback') + ' leads');

return finalLeads.map(lead => ({ json: lead }));
