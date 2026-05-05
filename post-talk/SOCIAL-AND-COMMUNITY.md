# Social Posts + Community Shares · Copy-Paste Pack

> Drafted in your voice based on the conversational style across the workshop materials. Edit freely. **Tone rules:** lowercase casual, specific numbers, no hype words, no exclamation marks unless someone is bleeding.

---

## Twitter / X

### Pre-talk teaser · post Wednesday evening
```
boulder startup week tomorrow.

i'm running a workshop called "architecting agentic workflows for the
lean 2026 startup" · 11 am · regenhub.

we're going to build a customer-discovery agent live · n8n + claude +
gmail · open-sourcing all of it (slides, tutorial, n8n json).

if you're a founder still doing outbound by hand, come.
```

### Post-talk announcement · Thursday afternoon
```
just shipped the bsw growth agent live with 200+ founders in the room.

a customer-discovery agent that:
· listens to hn / reddit / product hunt for icp signals
· drafts personalized outreach in your voice
· drops in gmail drafts (never sends · you always send)
· costs $8-15/mo · or $0 on groq + jina free tier

mit licensed, fork freely:
github.com/sudosoph/bsw26-agentic-workflows

12 transferable patterns. 7 other agents on the same architecture.
4-stage trust ladder for graduating from hitl to full auto.

free for everyone.
```

### Follow-up tweet · Friday morning
```
day after bsw · the repo got [N] stars overnight.

5 free 30-min architecture audits for attendees still open ·
cal.com/sudosoph/architect-audit-bsw

writing the recap up next.

if you want the patterns delivered weekly without the workshop,
agenticarchitect.ai/blog
```

---

## Boulder community shares

### Boulder AI Builders Meetup · post-talk note
```
hey all · for anyone who couldn't make it to my bsw workshop today,
the full materials are open-source: github.com/sudosoph/bsw26-agentic-workflows

· 50-slide deck (slides/index.html)
· 17-step build tutorial (TUTORIAL.md)
· n8n workflow json (paid + free-tier versions)
· all handouts (voice file template, icp template, oss playbook, etc.)
· autopilot prompt for claude for chrome users

mit licensed. fork freely.

drop questions here or dm. happy to walk anyone through their first
build over coffee at the next meetup.

· sophia
```

### Silicon Flatirons (CU Boulder) · note for the AI working group / mailing list
```
hi · ran a workshop at boulder startup week this week on agentic
workflows for early-stage founders · materials are open source ·
github.com/sudosoph/bsw26-agentic-workflows

happy to do a shorter version (20-30 min) for a flatirons working
group session if there's interest, especially anyone working at the
intersection of agentic systems and policy / governance.

also running 5 free 30-min architecture audits for bsw attendees this
month if anyone in the cu boulder community wants to talk through a
specific use case.

· sophia
sophia@agenticarchitect.ai
agenticarchitect.ai/blog
```

### Rocky Mountain AI Interest Group (RMAIIG) · email/post
```
hi · for anyone in rmaiig who wasn't at boulder startup week today,
i open-sourced the customer-discovery agent we built live:
github.com/sudosoph/bsw26-agentic-workflows

the workshop was for early-stage founders but the patterns generalize ·
the stack is n8n + claude (or groq for free tier) + gmail · everything
mit licensed.

happy to give a 20-min version of the talk at a future rmaiig meetup
if useful. also running 5 free architecture audits for bsw attendees
this month if anyone wants 30 minutes 1:1 to talk through their stack.

· sophia
sophia@agenticarchitect.ai
agenticarchitect.ai/blog
```

### Hacker News submission · Thursday or Friday
```
TITLE: Show HN: BSW Growth Agent — open-source customer-discovery
       agent for lean founders (n8n + Claude + Gmail)

URL:   https://github.com/sudosoph/bsw26-agentic-workflows
```

**First comment to seed the thread:**
```
hey hn · sophia here · i built this as a teaching artifact for a
boulder startup week workshop today.

it's a customer-discovery agent that runs on a daily cron, listens
to hn / reddit / product hunt for icp signals, drafts personalized
outreach in your voice, and drops it in gmail drafts. never sends
without you. mit licensed.

architecture: n8n + claude or groq + jina or firecrawl + google
sheets/drive/gmail. ~$8-15/mo on the lean stack, or $0 on groq +
jina free tier.

repo includes:
· 17-step code-along tutorial (no n8n experience required)
· config-as-files pattern (voice.md, icp.md, schemas.md as drive files)
· cascade pattern (haiku for routing, sonnet for drafting · 60-70% bill cut)
· 4-stage trust ladder for going from hitl to full auto with guardrails
· autopilot prompt for claude for chrome / gemini / operator users
· a "lite" workflow using groq + jina for the truly free path
· 50-slide workshop deck if you want the speaker context

questions welcome. fork and ship.
```

---

## Email to BSW attendees · Thursday afternoon

> Send via Mailchimp / Substack / however you collect attendee emails. Keep it short — they just sat through 60 min of you.

### Subject
```
Architecting Agentic Workflows · all materials + your next steps
```

### Body
```
Hi · thanks for being there today.

Everything from the workshop is open-source · github.com/sudosoph/bsw26-agentic-workflows

In the repo:
  · The 50-slide deck if you want to revisit
  · The 17-step build tutorial (TUTORIAL.md)
  · The n8n workflow JSON · paid + free-tier versions
  · All handouts · voice.md template, ICP template, OSS playbook,
    20/80 worksheet, schemas reference
  · Autopilot prompt for Claude for Chrome users · sets up the demo
    hands-off in ~10 min
  · Configuration recipes if you want to swap providers
    (Groq · Jina · Ollama · Gemini · OpenRouter)

If you want to keep going:

  1. Fork the repo · build your version this weekend · ship one
     "useful free thing" · that's the OSS growth playbook
     applied to YOUR startup
  2. Subscribe to agenticarchitect.ai/blog for weekly deep-dives
     on agentic architecture for lean founders
  3. Book one of the 5 free 30-min Architecture Audits I'm running
     for BSW attendees this month: cal.com/sudosoph/architect-audit-bsw
     (first-come · already capping)

If you build something using the template, reply to this email
with a link · I'll boost it on the next post.

If anything in the workshop didn't make sense, reply with a question
and I'll write the answer up as a blog post (with credit).

· Sophia
sophia@agenticarchitect.ai
agenticarchitect.ai/blog
```

---

## A note on cadence

Don't try to post all of this on Thursday afternoon. Pace it:

| When | What |
|---|---|
| Wed 7 PM | Pre-talk teaser tweet on X |
| Thu 1 PM (immediately after talk) | Post-talk X announcement · attendee email |
| Thu 4 PM | Boulder community Slack/email seeds (AI Builders, Flatirons, RMAIIG) |
| Thu 8 PM | Hacker News submission (if you want HN traction · best timing is 8-10 PM PT for next morning) |
| Fri 9 AM | Follow-up X post with star count + audit availability |
| Sat | Recap post drafted on Substack · scheduled for Sun morning |
| Sun 9 AM | Newsletter / recap goes out via Substack |

You don't have to do all of these. The minimum-viable post-talk plan is:

1. Email to attendees (Thursday)
2. X announcement (Thursday)
3. Substack recap (over the weekend)

Skip the rest if you're tired. You just gave a workshop — give yourself the weekend if you need it.

---

## Substack-specific notes

If `agenticarchitect.ai/blog` redirects to a Substack:

- The "attendee email" template above is the right format for a Substack post · paste it as a regular post (not a comment), set the audience to the people who signed up at the workshop, and check "Send as email and post to web."
- The recap blog draft (in `RECAP-BLOG-DRAFT.md`) is also Substack-ready · drop it into the Substack editor, add 1–2 photos, and schedule for Sunday morning.
- For ongoing newsletter cadence: weekly is too aggressive when you're starting · pick every-other-Tuesday and stick to it.

---

## X (Twitter) thread option · if you want more reach Thursday

Instead of one big tweet, post the announcement as a 5-tweet thread for better engagement:

```
1/ just shipped the bsw growth agent live with 200+ founders in
   the room.

   a customer-discovery agent that runs while you sleep · n8n +
   claude or groq + gmail · mit licensed.

   github.com/sudosoph/bsw26-agentic-workflows
```

```
2/ the demo:
   · listens to hn / reddit / product hunt for icp signals
   · drafts personalized outreach in your voice
   · drops in gmail drafts · NEVER sends without you
   · 5 drafts a day · ~10 sec to approve each
   · 50 hours/month back

   that's the 10x output math the workshop description promised.
```

```
3/ patterns we covered (memorize these · tools change, patterns don't):
   · cron + webhook triggers
   · config-as-files (voice.md, icp.md as drive files · not
     buried in workflow nodes)
   · cascade pattern · haiku for routing, sonnet for nuance ·
     60-70% bill cut
   · idempotent dedup · re-run safety
   · hitl via gmail drafts
```

```
4/ cost roadmap · same agent, five tiers:
   tier 0 · FREE · groq + jina + n8n trial · zero install
   tier 1 · all-cloud SaaS · ~$135/mo
   tier 3 · lean self-hosted · ~$15/mo
   tier 4 · max DIY w/ local qwen · ~$8/mo

   most underused 2026 lever: the cascade. cuts bills 60-70%.
```

```
5/ if you're an early-stage founder still doing outbound by hand:
   fork it · github.com/sudosoph/bsw26-agentic-workflows

   if you want to talk through what to automate first ·
   5 free 30-min audits for bsw attendees:
   cal.com/sudosoph/architect-audit-bsw

   weekly deep-dives at agenticarchitect.ai/blog
```

---

*Comms toolkit v1 · all templates in Sophia's voice · MIT licensed · feel free to fork*
