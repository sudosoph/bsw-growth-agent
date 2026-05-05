# Recap Blog Draft · for agenticarchitect.ai/blog

> Starter draft for your post-workshop recap. Skeleton in your voice. Edit / cut / expand based on what actually happened in the room. Estimated final length: 1,200–1,800 words.

---

## Title options · pick one

1. *Lessons from shipping the BSW Growth Agent live to 200 founders*
2. *What 200 founders asked at Boulder Startup Week (and the patterns I keep coming back to)*
3. *The talk I gave at Boulder Startup Week · plus everything I open-sourced*
4. *Architecting agentic workflows for the lean 2026 startup · the workshop, the repo, the lessons*

My pick: **Option 3.** Direct, descriptive, SEO-friendly without trying to be SEO-friendly.

---

## Suggested URL slug
```
/blog/bsw-2026-recap
```

---

## Opening (~150 words)

```
This past Thursday, May 7, I gave a workshop at Boulder Startup Week called
"Architecting Agentic Workflows for the Lean 2026 Startup." Sixty minutes,
about 200 registered, RegenHub stage. I built a customer-discovery agent
live and open-sourced everything before doors closed.

The repo is here · github.com/sudosoph/bsw26-agentic-workflows · MIT licensed,
fork freely.

This post is a recap for two audiences:

  · People who were in the room and want the materials in writing
  · People who weren't and want the abridged version of the talk

If you just want to skim, the TL;DR is at the bottom. If you want the
ten-minute version, keep reading.
```

---

## Section 1 · The setup · what we built and why · ~250 words

```
The agent we built is straightforward: it wakes up daily on a cron,
listens to Hacker News, Reddit, and Product Hunt for signals matching
your customer profile, drafts personalized outreach emails in your voice,
and drops them in your Gmail Drafts folder. It never sends without you.
After 5 days of no reply, it drafts a follow-up. Once a day at 7:30 AM,
it sends YOU (the founder) a digest summarizing what's queued for review.

Stack: n8n + Claude (or Groq for free tier) + Firecrawl (or Jina for
free tier) + Google Sheets/Drive/Gmail.

Cost: $8–15/month at the lean tier · $0 on the truly free tier (Groq +
Jina + n8n.cloud trial).

Build time: 25 minutes live · 45 if you're new to n8n.

Why this specific agent? Because it's the highest-leverage YELLOW task
on the 20/80 framework I taught at the start of the workshop. High volume
(you'd send these emails anyway), ambiguous output (drafts need judgment),
reversible (the agent doesn't send · you send). That's the sweet spot
for a first agent. Anything more complex and you spend the workshop
debugging instead of building.
```

---

## Section 2 · The 20/80 Blueprint · ~200 words

```
Before we built, we ran through a framework I use with every founder
I work with. Three axes:

  Volume        · how often does this task come up?
  Determinism   · are the steps the same every time?
  Reversibility · if the agent's wrong, what breaks?

Combine them and you get three colors:

  GREEN  = high volume × deterministic × reversible      → automate now
  YELLOW = high volume × ambiguous × reversible          → automate WITH HITL
  RED    = anything irreversible                         → don't automate

We did a 90-second worksheet section where everyone wrote down five
tasks from their week and color-coded them. The rule: pick one Green
to automate first.

Today's demo lives in YELLOW (cold outreach with HITL). It's the most
leveraged Yellow you can pick because the volume is high and the cost
of a wrong draft is zero (the agent doesn't send · you do).

If you want the worksheet template, it's in the repo:
github.com/sudosoph/bsw26-agentic-workflows/handouts/20-80-worksheet.md
```

---

## Section 3 · The 12 transferable patterns · ~250 words

```
The whole point of building one specific agent on stage was to teach
patterns that generalize beyond it. By the end of the build we'd hit
twelve transferable patterns. The audience walked out with what I think
of as Lego pieces · not one toy.

  1.  Cron + webhook triggers · how agents wake up
  2.  Config-as-files · editable behavior without redeploys
  3.  Cascade model selection · cheap model for routing, expensive for
      nuance · 60-70% bill cut vs naïve "Sonnet for everything"
  4.  Web search as agent eyes · Claude's web_search built-in tool
  5.  Targeted enrichment · cheap-fast first, expensive-deep second
  6.  Schema-first JSON outputs · connections that don't break
  7.  Idempotent dedup · re-run safety
  8.  HITL via Gmail drafts · brand voice protection · agent NEVER sends
  9.  Sub-agent decomposition · each step gets only the context it needs
 10.  Audit log on every action · trust through visible track record
 11.  Cost metering per run · know your real bill
 12.  Follow-up via thread context · same architecture, different inputs

If you take only one of these home with you: number two. Config-as-files
is the pattern that scales agents from solo founder to small team to
contractor handoff. Voice, ICP, schemas, exclusion lists · all live as
versioned editable files in Drive or Sheets, not buried in workflow
nodes. You edit a file. Your VA edits the file. Your future cofounder
edits the file. The agent inherits the change next run. No deploy.

Tools change. Patterns don't. Memorize these.
```

---

## Section 4 · The HITL standard · ~250 words

```
The third contractual takeaway from the workshop description was the
"HITL standard · maintain brand voice and ethical oversight while
scaling output 10×."

I framed this as a 4-stage trust ladder. The agent earns autonomy
the same way a new hire does · by getting more right than wrong over
a measurable period.

  Stage 1 · Shadow            · runs alongside, no action
  Stage 2 · Pending Review    · drafts only, never sends (today's demo)
  Stage 3 · Conditional Auto  · auto-fires high-confidence, queues rest
  Stage 4 · Full Auto         · fires all, alerts on exceptions

Each stage adds the guardrails of the stage before, plus new ones.
You graduate one stage at a time. Don't skip.

What "10× output" actually means in practice: the agent at Stage 2
saves you about 10 hours a week. You still send the same volume of
emails as before · maybe slightly more · but instead of writing each
one from scratch, you skim a draft, edit a word or two, hit Send.
About 10 seconds per email instead of 8 minutes.

Five drafts a day plus five follow-ups equals 10 sends per day, 300
per month, ~50 minutes of your actual time per month. That's the 10×.
Not 10× emails · 10× hours back. The other 45 hours go to product,
calls, fundraising.

I told the room about the PocketOS database deletion that happened on
April 25 · 9 days before the workshop · as a cautionary tale for what
happens when you skip stages. The cautionary tale isn't AI · it's
deploying agents at Stage 4 on a Stage 1 track record.
```

---

## Section 5 · The cost roadmap · ~200 words

```
I gave the room five cost tiers for running the same agent:

  Tier 0 · FREE · zero install      · ~$0/mo · Groq + Jina + n8n.cloud trial
  Tier 1 · All-cloud SaaS           · ~$135/mo · n8n.cloud + Sonnet + Firecrawl
  Tier 2 · Hybrid                   · ~$95/mo  · self-host n8n only
  Tier 3 · Lean self-hosted         · ~$15/mo  · self-host n8n + SearXNG + Firecrawl
  Tier 4 · Maximum DIY              · ~$8/mo   · + local Qwen on a Strix Halo

My recommendation: try Tier 0 this week. No credit card. After the
14-day trial, decide based on your bill. Tier 1 if you have ops
bandwidth and want best quality. Tier 3 if you have a weekend of Docker
time. Skip Tier 4 unless you have privacy-sensitive workloads or your
bill exceeds $200/month.

The cascade pattern, prompt caching, and batch API together cut your
naïve Sonnet bill by ~75%. The "$135 to $8" jump isn't magic · it's
three specific moves stacked.

This part of the talk got the most "wait, that's it?" reactions.
Founders are paying way more than they need to for agentic systems
in 2026. Most of it is solvable with the cascade alone.
```

---

## Section 6 · What surprised me about the room · ~150 words

> Fill this in based on what actually happened. Some things to consider:
>
> - What questions did founders ask during Q&A?
> - What was the show-of-hands distribution (pre-PMF / just-past-PMF / scaling)?
> - Did anyone in the room have a great use case I should write up separately?
> - What did people get most excited about (free tier? voice.md? trust ladder?)
> - What did anyone push back on?

```
[your observations here · keep it specific · name names if attendees
agreed to be quoted]
```

---

## Section 7 · TL;DR + what's next · ~150 words

```
TL;DR

  · Open-source customer-discovery agent for lean founders
  · n8n + Claude (or Groq) + Gmail · ~$8-15/mo · or $0 free tier
  · 12 transferable patterns + 7 other agents on the same architecture
  · 4-stage trust ladder for graduating from HITL to full auto
  · MIT licensed · github.com/sudosoph/bsw26-agentic-workflows

What's next:

  · I'm running 5 free 30-min Architecture Audits for BSW attendees
    this month · cal.com/sudosoph/architect-audit-bsw · first-come
  · Weekly deep-dives on agentic architecture at agenticarchitect.ai/blog
  · I'll be at the next Boulder AI Builders Meetup or RMAIIG event
    if you want to talk in person

If you fork the template and ship something, reply or DM me with a
link. I'll boost it.

· Sophia
sophia@agenticarchitect.ai
```

---

## Editing notes for you

**Things to add when you write the final version:**
- The actual show-of-hands result from the room
- Any attendee quotes (with permission)
- A specific question that came up that's worth its own post
- Photos · the room shot · the demo mid-flight · maybe a slide
- The current GitHub star count (lifts the social proof)

**Things to cut if it's too long:**
- Section 5 (cost roadmap) is dense · trim to 100 words and link to CONFIGURATION.md
- Section 4 (HITL) can drop the PocketOS story and link to the slides
- Section 6 is optional — you can skip if you don't have great anecdotes

**Length target:** 1,200 words for SEO without padding. 1,800 if you have great anecdotes from the room.

**Publish timing:** Saturday or Sunday. Don't rush it Friday · the talk just happened, you'll have better perspective with 24 hours of distance.

---

*Recap draft v1 · sketch only · final voice and edits are yours · part of github.com/sudosoph/bsw26-agentic-workflows*
