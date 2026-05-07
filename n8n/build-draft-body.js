// REPLACES Build Draft Body. Uses this.helpers.httpRequest (fetch unavailable in Code sandbox).

const summaryItems = $input.all();

let buildSummItems = [];
try {
  buildSummItems = $('Build Summarize Body').all();
} catch (e) {
  console.log('Build Summarize Body lookup failed:', e.message);
}

const DEFAULT_VOICE = 'Friendly, direct, founder-to-founder tone. Short sentences. No corporate speak. Reference what they posted specifically. Always end with a soft ask for a 15-min call.';

function looksLikePlainText(s) {
  if (!s || s.length < 20) return false;
  // DOCX/zip signature
  if (s.charCodeAt(0) === 0x50 && s.charCodeAt(1) === 0x4B) return false;
  // Count high-bit-clobbering binary bytes outside normal text range
  let bad = 0;
  const sample = s.slice(0, 2000);
  for (let i = 0; i < sample.length; i++) {
    const c = sample.charCodeAt(i);
    if (c === 9 || c === 10 || c === 13) continue;
    if (c < 32 || c === 0xFFFD) bad++;
  }
  return (bad / sample.length) < 0.05;
}

let voiceMd = DEFAULT_VOICE;
try {
  const voiceItem = $('Read voice.md from Drive').first();
  const voiceBuffer = voiceItem && voiceItem.binary && voiceItem.binary.voiceMd;
  if (voiceBuffer) {
    const decoded = Buffer.from(voiceBuffer.data, 'base64').toString('utf-8');
    if (looksLikePlainText(decoded)) {
      voiceMd = decoded;
    } else {
      console.log('voice.md is binary/DOCX (re-upload as plain .md). Using default voice.');
    }
  }
} catch (e) {
  console.log('voice.md not reachable, using default voice:', e.message);
}

const SKIP_DOMAINS = [
  'ycombinator.com', 'news.ycombinator.com', 'reddit.com', 'old.reddit.com',
  'twitter.com', 'x.com', 'linkedin.com', 'github.com',
  'medium.com', 'substack.com', 'youtube.com', 'youtu.be'
];

function isUsefulHost(host) {
  if (!host) return false;
  return !SKIP_DOMAINS.some(d => host === d || host.endsWith('.' + d));
}

function candidatesFromDomain(host) {
  return ['hello@' + host, 'info@' + host, 'contact@' + host, 'team@' + host];
}

async function fetchHnProfile(handle) {
  if (!handle) return null;
  try {
    return await this.helpers.httpRequest({
      method: 'GET',
      url: 'https://hacker-news.firebaseio.com/v0/user/' + encodeURIComponent(handle) + '.json',
      json: true
    });
  } catch (e) {
    console.log('HN profile fetch failed for', handle, ':', e.message);
    return null;
  }
}

async function fetchRedditProfile(handle) {
  if (!handle) return null;
  try {
    const data = await this.helpers.httpRequest({
      method: 'GET',
      url: 'https://www.reddit.com/user/' + encodeURIComponent(handle) + '/about.json',
      headers: { 'User-Agent': 'discovery-engine/1.0' },
      json: true
    });
    return data && data.data ? data.data : null;
  } catch (e) {
    console.log('Reddit profile fetch failed for', handle, ':', e.message);
    return null;
  }
}

function extractFromText(text) {
  if (!text) return { email: null, url: null };
  const stripped = text.replace(/<[^>]+>/g, ' ');
  const emailMatch = stripped.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const urlMatch = stripped.match(/https?:\/\/[^\s<>"')]+/);
  return {
    email: emailMatch ? emailMatch[0] : null,
    url: urlMatch ? urlMatch[0] : null
  };
}

const self = this;

async function enrichSendTo(lead) {
  const handle = (lead.person || '').replace(/^@/, '').replace(/^u\//, '').replace(/[^a-zA-Z0-9_-]/g, '');
  const sourceUrl = lead.source_url || '';
  const isHN = sourceUrl.includes('ycombinator.com');
  const isReddit = sourceUrl.includes('reddit.com');

  const result = { sendTo: 'TODO-resolve-recipient@placeholder.example', source: 'unresolved', candidates: [], profileUrl: null };

  // Build profile URL for visibility (always shown to founder in footer)
  if (isHN && handle) result.profileUrl = 'https://news.ycombinator.com/user?id=' + handle;
  else if (isReddit && handle) result.profileUrl = 'https://www.reddit.com/user/' + handle;

  // Step 1: lead's company_url (Show HN, Reddit external link, etc.)
  if (lead.company_url) {
    try {
      const u = new URL(lead.company_url);
      const host = u.hostname.replace(/^www\./, '');
      if (isUsefulHost(host)) {
        const cands = candidatesFromDomain(host);
        result.sendTo = cands[0];
        result.source = 'lead_company_url';
        result.candidates = cands;
        return result;
      }
    } catch (e) {}
  }

  // Step 2: scrape profile to find email or url
  let profileText = '';
  if (isHN && handle) {
    const profile = await fetchHnProfile.call(self, handle);
    if (profile && profile.about) profileText = profile.about;
  } else if (isReddit && handle) {
    const profile = await fetchRedditProfile.call(self, handle);
    if (profile) {
      profileText = (profile.subreddit && profile.subreddit.public_description) || profile.public_description || '';
    }
  }

  const extracted = extractFromText(profileText);

  if (extracted.email) {
    result.sendTo = extracted.email;
    result.source = 'profile_email';
    result.candidates = [extracted.email];
    return result;
  }

  if (extracted.url) {
    try {
      const u = new URL(extracted.url);
      const host = u.hostname.replace(/^www\./, '');
      if (isUsefulHost(host)) {
        const cands = candidatesFromDomain(host);
        result.sendTo = cands[0];
        result.source = 'profile_url';
        result.candidates = cands;
        return result;
      }
    } catch (e) {}
  }

  // Step 3: handle-based placeholder. Surface profile URL prominently so the
  // founder can open it and verify before sending.
  if (handle) {
    result.sendTo = handle + '@verify-on-' + (isHN ? 'hn' : (isReddit ? 'reddit' : 'profile')) + '.example';
    result.source = 'handle_placeholder_no_contact';
    const cands = [result.sendTo];
    if (result.profileUrl) cands.push(result.profileUrl);
    result.candidates = cands;
  }
  return result;
}

const outputs = await Promise.all(summaryItems.map(async (summItem, idx) => {
  const summary = summItem.json;
  const summaryText = (summary.content && summary.content[0] && summary.content[0].text) ? summary.content[0].text : '';
  const lead = (buildSummItems[idx] && buildSummItems[idx].json && buildSummItems[idx].json.lead) || {};

  const recipient = await enrichSendTo(lead);
  console.log('Lead ' + idx + ' [' + (lead.person || 'unknown') + '] sendTo: ' + recipient.sendTo + ' (' + recipient.source + ')');

  const footerLines = [];
  footerLines.push('Source post: ' + (lead.source_url || 'n/a'));
  if (recipient.profileUrl) footerLines.push('Profile (verify before sending): ' + recipient.profileUrl);
  footerLines.push('Resolved via: ' + recipient.source);
  if (recipient.candidates.length > 1) {
    footerLines.push('Recipient candidates: ' + recipient.candidates.join(', '));
  }
  const footerNote = '\n\n---\n' + footerLines.join('\n');

  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 600,
    system: [
      {
        type: 'text',
        text: [
          'You write customer-discovery emails for a lean startup founder.',
          'Goal: a 15-min INTERVIEW ASK, not a pitch.',
          'Length: 70-100 words. No more.',
          'Tone: peer-to-peer, plainspoken, slightly skeptical. Like one builder talking to another over DM.',
          '',
          'STRICT RULES — DO NOT VIOLATE:',
          '• NO opener phrases: "I hope this finds you well", "I came across your post and...", "Just wanted to reach out", "Love what you\'re doing", "I\'m a huge fan", "Quick question", "I noticed".',
          '• NO buzzwords: "synergy", "leverage", "circle back", "deep dive", "passionate", "exciting", "innovative", "game-changer", "level up", "unlock".',
          '• NO compliment-sandwiches. No flattery before the ask.',
          '• NO "let me know if interested" or "would love to chat" — be specific about the ask.',
          '• NO emojis. NO exclamation marks unless quoting the prospect.',
          '• NO "I\'m building X to solve Y" pitch structure.',
          '',
          'STRUCTURE:',
          '1. First sentence: reference exactly what they posted, in their language. Quote a fragment if useful.',
          '2. Second sentence: name the specific thing you\'re trying to learn from them (not "your thoughts" — something concrete).',
          '3. Third sentence: the ask. "15 min next week?" or "happy to send 3 questions over email if a call is too much."',
          '4. Sign-off: just first name. No title, no company line, no postscript.',
          '',
          'If voice.md content is provided below and looks like real writing, mirror its rhythm and word choice.'
        ].join('\n')
      },
      {
        type: 'text',
        text: 'voice.md contents:\n\n' + voiceMd,
        cache_control: { type: 'ephemeral' }
      }
    ],
    messages: [
      {
        role: 'user',
        content: 'Draft the email.\n\n'
          + 'Person: ' + (lead.person || 'unknown') + '\n'
          + 'Company (if applicable): ' + (lead.company || 'n/a') + '\n'
          + 'Signal type: ' + (lead.signal_type || '') + '\n'
          + 'What they posted (verbatim, may include HTML entities): ' + (lead.evidence_quote || '') + '\n'
          + 'Source URL: ' + (lead.source_url || '') + '\n'
          + 'Two-sentence context: ' + summaryText + '\n\n'
          + 'Return ONLY this format, nothing else:\n'
          + 'SUBJECT: [subject — 6 words max, lowercase if it fits the voice, no "re:" prefix unless quoting them]\n'
          + 'BODY:\n'
          + '[email body — open by referencing their post directly, then your specific question, then the soft 15-min ask]'
      }
    ]
  };

  return { json: { body, lead, sendTo: recipient.sendTo, sendToSource: recipient.source, sendToCandidates: recipient.candidates, footerNote } };
}));

return outputs;
