// HN + Reddit discovery. ICP-agnostic: context filter derives from the user's
// own signal_keywords plus a generic-pain vocabulary. No sales jargon hardcoded.

const icp = $input.first().json;

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','for','with','too','very',
  'of','in','on','at','to','is','our','we','i','my','your',
  'that','this','these','those','it','as','by','from','be','are','was'
]);

// Generic pain/intent vocabulary — domain-agnostic.
// Drops a Windows firewall comment that just mentions "outbound" because
// it has none of these signals; keeps a "n8n is too expensive" complaint.
const GENERIC_PAIN = [
  'expensive','cheap','overpriced','too much','too many',
  'alternative','replace','replaced','switching','switched','migrating','migrated',
  'hate','sucks','annoying','frustrating','frustrated',
  'broken','issue','problem','bug','stuck','headache',
  'wish','need','want','looking for','any tool','any way','anyone','tried','tried out',
  'recommend','suggest','evaluating','comparing','vs ','versus',
  'cost','pricing','price','bill','invoice','seat','per user','per month','quota','credits',
  'self-host','self host','open source','open-source','free tier'
];

const phrases = (icp.signal_keywords || '')
  .split(',').map(s => s.trim()).filter(Boolean);

// Build MULTI-WORD search queries. HN Algolia and Reddit both treat
// space as implicit AND, so a query like "hired SDR" only returns posts
// containing BOTH words — drastically better precision than "hired" alone.
//
// Strategy per phrase:
//   - Drop stop words
//   - Keep up to 2 most-distinctive tokens (longer = more distinctive proxy)
//   - If only 1 token remains and it's <5 chars or a generic verb, skip
//     (prevents searching for "hired", "replaced", "running" alone)
const GENERIC_VERBS = new Set([
  'hired','replaced','running','looking','tried','using','used','want','need',
  'made','built','building','found','find','got','get','make','done','have'
]);

function buildQuery(phrase) {
  const tokens = phrase.split(/\s+/)
    .map(t => t.replace(/[,.;]+$/, ''))
    .filter(t => t.length > 2 && !STOP_WORDS.has(t.toLowerCase()));
  if (tokens.length === 0) return null;
  if (tokens.length === 1) {
    const t = tokens[0];
    // Reject solo generic verbs and short common words
    if (GENERIC_VERBS.has(t.toLowerCase())) return null;
    if (t.length < 5 && !/[A-Z]/.test(t) && !/\d/.test(t)) return null;
    return t;
  }
  // Sort by distinctiveness: contains digit/dot/capital first, then by length desc
  const sorted = [...tokens].sort((a, b) => {
    const aD = (/[0-9.]/.test(a) ? 2 : 0) + (/[A-Z]/.test(a) ? 1 : 0);
    const bD = (/[0-9.]/.test(b) ? 2 : 0) + (/[A-Z]/.test(b) ? 1 : 0);
    if (aD !== bD) return bD - aD;
    return b.length - a.length;
  });
  return sorted.slice(0, 2).join(' ');
}

const queries = [];
for (const phrase of phrases) {
  const q = buildQuery(phrase);
  if (q && !queries.includes(q)) queries.push(q);
}
const keywords = queries.slice(0, 8);

// For quality filter: collect every non-stop token from ICP phrases as required-context vocab.
const icpContextSet = new Set();
for (const phrase of phrases) {
  const tokens = phrase.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
  for (const t of tokens) icpContextSet.add(t);
}
const CONTEXT_WORDS = Array.from(new Set([...icpContextSet, ...GENERIC_PAIN]));

const subreddits = (icp.Subreddits || icp.subreddits || 'SaaS,Entrepreneur,AI_Agents,ChatGPTCoding,LocalLLaMA')
  .split(',').map(s => s.trim()).filter(Boolean);

const diag = {
  _diagnostic: true,
  search_terms: keywords,
  context_words_sample: CONTEXT_WORDS.slice(0, 12),
  subreddits: subreddits,
  hn_raw: 0, hn_filtered: 0,
  reddit_raw: 0, reddit_filtered: 0,
  results_per_keyword: {},
  errors: []
};

if (keywords.length === 0) {
  diag.step = 'no_keywords';
  return [{ json: diag }];
}

const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 3600);
const SKIP_DOMAINS = ['ycombinator.com','news.ycombinator.com','reddit.com','old.reddit.com','redd.it','twitter.com','x.com','linkedin.com','github.com','medium.com','substack.com','youtube.com','youtu.be'];

function isUsefulHost(host) {
  if (!host) return false;
  return !SKIP_DOMAINS.some(d => host === d || host.endsWith('.' + d));
}

// A multi-word keyword like "hired SDR" matches iff EVERY word is present in text.
function keywordMatches(keyword, lowerText) {
  const words = keyword.toLowerCase().split(/\s+/);
  return words.every(w => lowerText.includes(w));
}

function passesQualityCheck(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  if (text.length < 80) return false;

  const matchedQueries = keywords.filter(k => keywordMatches(k, lower));
  if (matchedQueries.length === 0) return false;

  // Any multi-word query that fully matched = strong signal (API already ANDed)
  if (matchedQueries.some(k => k.includes(' '))) return true;

  // 2+ distinct single-word queries matched = strong
  if (matchedQueries.length >= 2) return true;

  // Single word match — require ICP-derived context or generic pain signal
  const hasContext = CONTEXT_WORDS.some(c => lower.includes(c));
  return hasContext;
}

function deriveSignalType(text, isShowOrAskPost) {
  const lower = text.toLowerCase();
  if (lower.includes('hiring') || lower.includes('hired ')) return 'hiring';
  if (lower.includes('expensive') || lower.includes('overpriced') || lower.includes('too much') || lower.includes('rip off') || lower.includes('hate')) return 'complaint';
  if (isShowOrAskPost || lower.includes('alternative') || lower.includes('looking for') || lower.includes('anyone') || lower.includes('recommend') || lower.includes('any tool')) return 'tool_ask';
  return 'pain';
}

function computeScore(text, points, hasCompanyUrl) {
  const lower = text.toLowerCase();
  const matchedQueries = keywords.filter(k => keywordMatches(k, lower));
  const multiWordHits = matchedQueries.filter(k => k.includes(' ')).length;
  const singleWordHits = matchedQueries.filter(k => !k.includes(' ')).length;
  const contextHits = CONTEXT_WORDS.filter(c => lower.includes(c)).length;

  let score = 3
    + Math.min(multiWordHits * 2, 4)   // multi-word match = high precision, big boost
    + Math.min(singleWordHits, 2)
    + Math.min(contextHits, 2);
  if (points > 10) score += 1;
  if (points > 50) score += 1;
  if (hasCompanyUrl) score += 1;
  return Math.min(10, score);
}

const allLeads = [];
const self = this;

// Helper: bounded HTTP GET with short timeout
async function getJson(url, headers, timeoutMs) {
  return await self.helpers.httpRequest({
    method: 'GET',
    url: url,
    headers: headers || {},
    json: true,
    timeout: timeoutMs || 8000
  });
}

// ─── HN via Algolia (parallel) ────────────────────────────────
const hnHits = new Map();
await Promise.all(keywords.map(async (keyword) => {
  const url = 'https://hn.algolia.com/api/v1/search_by_date'
    + '?query=' + encodeURIComponent(keyword)
    + '&tags=(story,comment)'
    + '&numericFilters=created_at_i>' + thirtyDaysAgo
    + '&hitsPerPage=20';
  try {
    const data = await getJson(url, {}, 8000);
    const hits = (data && data.hits) || [];
    diag.results_per_keyword['hn:' + keyword] = hits.length;
    for (const hit of hits) {
      if (!hnHits.has(hit.objectID)) hnHits.set(hit.objectID, { hit, matchedKeyword: keyword });
    }
  } catch (e) {
    diag.results_per_keyword['hn:' + keyword] = 'ERROR';
    diag.errors.push('hn:' + keyword + ': ' + e.message);
  }
}));
diag.hn_raw = hnHits.size;

for (const { hit, matchedKeyword } of hnHits.values()) {
  const rawText = hit.story_text || hit.comment_text || hit.title || '';
  const text = rawText.replace(/<[^>]+>/g, '').trim();
  if (!passesQualityCheck(text)) continue;

  const tags = hit._tags || [];
  const isComment = tags.includes('comment');
  const title = hit.title || '';
  const isShowHN = /^show hn[:\s]/i.test(title);
  const isAskHN = /^ask hn[:\s]/i.test(title);

  let company = null, companyUrl = null;
  if (!isComment) {
    if (isShowHN) {
      const m = title.match(/^Show HN:\s*([^–\-:]+)/i);
      company = m ? m[1].trim() : title.replace(/^Show HN:\s*/i, '').trim();
      companyUrl = hit.url || null;
    } else if (!isAskHN) {
      company = title || null;
      companyUrl = hit.url || null;
    }
  }

  if (companyUrl) {
    try {
      const u = new URL(companyUrl);
      if (!isUsefulHost(u.hostname.replace(/^www\./, ''))) companyUrl = null;
    } catch (e) { companyUrl = null; }
  }

  allLeads.push({
    person: '@' + (hit.author || 'unknown'),
    signal_type: deriveSignalType(text, isShowHN || isAskHN),
    source_url: 'https://news.ycombinator.com/item?id=' + hit.objectID,
    evidence_quote: text.slice(0, 250),
    score: computeScore(text, hit.points || 0, !!companyUrl),
    company: company,
    company_url: companyUrl,
    matched_keyword: matchedKeyword,
    source: 'hn',
    post_type: isComment ? 'comment' : (isShowHN ? 'show_hn' : (isAskHN ? 'ask_hn' : 'story'))
  });
}
diag.hn_filtered = allLeads.length;

// ─── Reddit: official hosts + public proxies as fallback ─────
// Reddit blocks cloud-provider IPs aggressively. Public redlib/safereddit/libreddit
// instances proxy Reddit content and usually accept cloud traffic.
const REDDIT_UA = 'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0';
const REDDIT_OFFICIAL = ['old.reddit.com', 'api.reddit.com', 'www.reddit.com'];
const REDDIT_PROXIES = ['safereddit.com', 'redlib.catsarch.com', 'libreddit.privacydev.net'];

function normalizeRedditPost(post, host) {
  // Official Reddit returns { data: { children: [{ data: post }] } }; many proxies match.
  return {
    id: post.id || post.name || (post.permalink || '').split('/').filter(Boolean).pop(),
    title: post.title || '',
    selftext: post.selftext || post.body || '',
    author: post.author || 'unknown',
    permalink: post.permalink || '',
    url: post.url || post.link || '',
    score: post.score || post.ups || 0,
    subreddit: post.subreddit || ''
  };
}

// Step 1: probe all hosts in parallel against the FIRST subreddit. First host
// to return >0 posts wins; we reuse it for the rest. Bounded total time ≈ 8s.
async function probeRedditHost(firstSub) {
  const candidates = [
    ...REDDIT_OFFICIAL.map(h => ({ host: h, suffix: '?limit=100&raw_json=1' })),
    ...REDDIT_PROXIES.map(h => ({ host: h, suffix: '?limit=100' }))
  ];
  const probes = candidates.map(({ host, suffix }) => (async () => {
    const url = 'https://' + host + '/r/' + encodeURIComponent(firstSub) + '/new.json' + suffix;
    try {
      const data = await getJson(url, { 'User-Agent': REDDIT_UA, 'Accept': 'application/json,text/json,*/*' }, 7000);
      const children = (data && data.data && data.data.children) || [];
      if (children.length > 0) return { host, posts: children.map(c => normalizeRedditPost(c.data || c, host)) };
      throw new Error(host + ' empty');
    } catch (e) {
      throw new Error(host + ' ' + (e.statusCode || '') + ' ' + (e.message || '').slice(0, 60));
    }
  })());

  // Promise.any returns the first to FULFILL. If all reject, throws AggregateError.
  try {
    return await Promise.any(probes);
  } catch (agg) {
    const errs = (agg && agg.errors) ? agg.errors.map(e => e.message).join(' | ') : 'all hosts rejected';
    throw new Error('reddit probe failed: ' + errs);
  }
}

const redditHits = new Map();
let redditHostUsed = null;

if (subreddits.length > 0) {
  try {
    const probe = await probeRedditHost(subreddits[0]);
    redditHostUsed = probe.host;
    diag.results_per_keyword['reddit:' + subreddits[0]] = probe.posts.length + ' (via ' + probe.host + ')';
    for (const post of probe.posts) {
      if (post.id && !redditHits.has(post.id)) redditHits.set(post.id, { post });
    }
  } catch (e) {
    diag.errors.push('reddit-probe: ' + e.message);
    diag.results_per_keyword['reddit:probe'] = 'ALL HOSTS FAILED';
  }

  // Step 2: if we have a working host, fan out remaining subs in parallel.
  if (redditHostUsed) {
    const suffix = REDDIT_PROXIES.includes(redditHostUsed) ? '?limit=100' : '?limit=100&raw_json=1';
    await Promise.all(subreddits.slice(1).map(async (sub) => {
      const url = 'https://' + redditHostUsed + '/r/' + encodeURIComponent(sub) + '/new.json' + suffix;
      try {
        const data = await getJson(url, { 'User-Agent': REDDIT_UA, 'Accept': 'application/json,text/json,*/*' }, 7000);
        const children = (data && data.data && data.data.children) || [];
        diag.results_per_keyword['reddit:' + sub] = children.length + ' (via ' + redditHostUsed + ')';
        for (const child of children) {
          const post = normalizeRedditPost(child.data || child, redditHostUsed);
          if (post.id && !redditHits.has(post.id)) redditHits.set(post.id, { post });
        }
      } catch (e) {
        diag.results_per_keyword['reddit:' + sub] = 'ERROR: ' + e.message.slice(0, 120);
        diag.errors.push('reddit:' + sub + ': ' + e.message);
      }
    }));
  }
}
diag.reddit_raw = redditHits.size;
diag.reddit_host_used = redditHostUsed;

const redditFilteredStart = allLeads.length;
for (const { post } of redditHits.values()) {
  const text = (post.title + '\n' + post.selftext).trim();
  if (!passesQualityCheck(text)) continue;

  const lower = text.toLowerCase();
  const matchedQuery = keywords.find(k => keywordMatches(k, lower)) || 'unknown';

  let companyUrl = null;
  if (post.url && !post.url.includes('reddit.com')) {
    try {
      const u = new URL(post.url);
      if (isUsefulHost(u.hostname.replace(/^www\./, ''))) companyUrl = post.url;
    } catch (e) {}
  }

  // Always link back to canonical reddit.com so the founder can verify
  const sourceUrl = post.permalink
    ? ('https://www.reddit.com' + (post.permalink.startsWith('/') ? '' : '/') + post.permalink)
    : (post.url || 'https://www.reddit.com/');

  allLeads.push({
    person: 'u/' + post.author,
    signal_type: deriveSignalType(text, false),
    source_url: sourceUrl,
    evidence_quote: text.slice(0, 250),
    score: computeScore(text, post.score, !!companyUrl),
    company: companyUrl ? (post.title || null) : null,
    company_url: companyUrl,
    matched_keyword: matchedQuery,
    source: 'reddit',
    post_type: 'reddit_post',
    subreddit: post.subreddit
  });
}
diag.reddit_filtered = allLeads.length - redditFilteredStart;

// ─── Lobsters: parallel /hottest + /newest ────────────────────
const lobstersStories = new Map();
await Promise.all(['/hottest.json', '/newest.json'].map(async (path) => {
  try {
    const data = await getJson('https://lobste.rs' + path, { 'User-Agent': 'n8n-discovery/1.0', 'Accept': 'application/json' }, 8000);
    const stories = Array.isArray(data) ? data : (data && data.stories) || [];
    diag.results_per_keyword['lobsters:' + path] = stories.length;
    for (const story of stories) {
      const id = story && (story.short_id || story.short_id_url || story.url);
      if (!id) continue;
      if (!lobstersStories.has(id)) lobstersStories.set(id, story);
    }
  } catch (e) {
    diag.results_per_keyword['lobsters:' + path] = 'ERROR: ' + e.message.slice(0, 120);
    diag.errors.push('lobsters' + path + ': ' + e.message);
  }
}));
diag.lobsters_raw = lobstersStories.size;

const lobstersFilteredStart = allLeads.length;
for (const story of lobstersStories.values()) {
  const text = ((story.title || '') + '\n' + (story.description_plain || story.description || '')).trim();
  if (!passesQualityCheck(text)) continue;

  const lower = text.toLowerCase();
  const matchedQuery = keywords.find(k => keywordMatches(k, lower)) || 'unknown';

  let companyUrl = null;
  if (story.url) {
    try {
      const u = new URL(story.url);
      if (isUsefulHost(u.hostname.replace(/^www\./, ''))) companyUrl = story.url;
    } catch (e) {}
  }

  const author = (story.submitter_user && (story.submitter_user.username || story.submitter_user)) || story.submitter || 'unknown';
  allLeads.push({
    person: '@' + author,
    signal_type: deriveSignalType(text, false),
    source_url: story.comments_url || story.url || 'https://lobste.rs/',
    evidence_quote: text.slice(0, 250),
    score: computeScore(text, story.score || 0, !!companyUrl),
    company: companyUrl ? (story.title || null) : null,
    company_url: companyUrl,
    matched_keyword: matchedQuery,
    source: 'lobsters',
    post_type: 'lobsters_story'
  });
}
diag.lobsters_filtered = allLeads.length - lobstersFilteredStart;

console.log('Discovery: HN ' + diag.hn_raw + '→' + diag.hn_filtered
  + ' | Reddit ' + diag.reddit_raw + '→' + diag.reddit_filtered + ' (' + (diag.reddit_host_used || 'none') + ')'
  + ' | Lobsters ' + diag.lobsters_raw + '→' + diag.lobsters_filtered
  + ' | total ' + allLeads.length);
console.log('Per-source detail: ' + JSON.stringify(diag.results_per_keyword, null, 2));
if (diag.errors.length) console.log('Errors: ' + JSON.stringify(diag.errors, null, 2));

if (allLeads.length === 0) {
  diag.step = 'no_quality_hits';
  return [{ json: diag }];
}

allLeads.sort((a, b) => (b.score || 0) - (a.score || 0));
return allLeads.map(lead => ({ json: lead }));
