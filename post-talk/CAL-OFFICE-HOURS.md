# Cal.com · Architect's Office Hours · Setup Pack

> Copy-paste ready. Set up at [cal.com](https://cal.com) → New Event Type. Should take about 5 minutes total.

---

## 1 · Cal.com profile · bio (short, fits the profile sidebar)

```
Sophia Stein · AI Architect · Local LLM & Agentic Workflows
Boulder, CO

I architect agentic systems for early-stage founders.
Open-source tooling, lean stacks, honest cost math.

agenticarchitect.ai/blog · github.com/sudosoph
```

---

## 2 · Event type configuration

### Event title
```
Architect's Office Hours · BSW
```

### Event slug (URL ending)
```
architect-audit-bsw
```
Final URL: `cal.com/sophia-stein/architect-audit-bsw`

### Duration
```
30 minutes
```

### Visibility
```
Public
```

### Booking limits (THIS IS THE CAP)
- **Booking frequency:** Limit total bookings → **5**
- **Date range:** Available May 8, 2026 → June 6, 2026 (4-week window after BSW)
- **Minimum notice:** 4 hours

### Availability schedule
Whatever your standard hours are. I'd suggest:
- Tue / Wed / Thu · 10 AM – 12 PM Mountain
- 30-min slots with 15-min buffers
- No back-to-backs (you'll need decompression time)

---

## 3 · Event description · the public-facing copy

```
30-minute audit for early-stage founders building (or thinking about building)
agentic workflows. Free for Boulder Startup Week 2026 attendees · capped at 5
sessions on a first-come basis.

You bring one specific bottleneck — outbound automation, customer discovery,
support triage, content ops, anything where you're tempted to throw an agent
at it. I tell you:

  · What's worth automating now vs. later
  · Which 3 tools to use (and which 3 to skip)
  · The cheapest viable stack for your case
  · Where to put HITL gates so you don't ship something that breaks

Honest answers. No sales pitch. If the right answer is "don't automate this
yet" or "the tool you picked is fine," I'll tell you that.

What you'll leave with: a one-page architecture diagram and three concrete
next steps.

What I'll ask you to bring: one specific question (not three) and links
to whatever you're already running.
```

---

## 4 · Booking form · intake questions

In Cal.com, go to **Event → Workflows → Booking questions**. Add these:

### Question 1 (required · short answer)
**Label:** What's the one bottleneck you want to discuss?
**Help text:** One sentence. Not three. The more specific, the more useful the call.

### Question 2 (required · multiple choice)
**Label:** What's your current AI/automation stack?
**Options:**
- Nothing yet
- ChatGPT or Claude in browser only
- Zapier / Make / n8n
- Lindy / Gumloop / Relevance
- Custom code (LangGraph / CrewAI / Mastra / Pydantic AI)
- Other

### Question 3 (optional · multiple choice)
**Label:** Monthly AI/automation budget?
**Options:**
- $0 (free tier only)
- Under $50
- $50 – $200
- $200 – $500
- Over $500
- Not sure / case-by-case

### Question 4 (optional · short answer)
**Label:** Anything else I should know before our call?
**Help text:** Optional. Background, links, or specific output you want from the call.

---

## 5 · Confirmation page copy (after they book)

```
You're booked. Looking forward to it.

A few things to do before our call · all optional, but you'll get more out
of the 30 minutes if you do them:

  1. Skim the BSW Growth Agent repo · github.com/sudosoph/bsw26-agentic-workflows
  2. Have ONE specific question ready · the most useful calls have one
     deep thread, not three shallow ones
  3. If your bottleneck involves outbound · paste 5 emails you've sent
     yourself · we'll talk voice match

See you on the other side · Sophia
sophia@agenticarchitect.ai
agenticarchitect.ai/blog
```

---

## 6 · Reminder email (24h before · auto-sent by Cal.com)

In Cal.com → **Event → Workflows → Add workflow → "Email reminder · 24 hours before"**:

### Subject
```
Tomorrow · Architect's Office Hours · {{EVENT_DATE}}
```

### Body
```
Tomorrow we have 30 minutes together. Two things to grab if you haven't:

  · Your one specific bottleneck question
  · (Optional) A link to your current workflow / system

If anything's changed since you booked and you want to redirect the call,
reply to this email. Otherwise see you tomorrow.

· Sophia
```

---

## 7 · Post-call follow-up email (24h after · auto-sent)

Add a second workflow: **Email follow-up · 24 hours after**:

### Subject
```
Yesterday's call · summary + next steps
```

### Body
```
Quick recap from yesterday's 30 minutes:

  · The bottleneck we discussed: [you'll fill this in manually after each call]
  · The architecture we sketched: [also manual]
  · The 3 tools I'd start with: [also manual]
  · Your three next steps:
      1. [first step]
      2. [second step]
      3. [third step]

If you ship something using the BSW Growth Agent template or a fork of it,
I'd love to hear about it · reply with a link.

If you got value from yesterday and want to pay it forward, the lowest-lift
thing is sharing the repo (github.com/sudosoph/bsw26-agentic-workflows) with one
founder you know who'd benefit.

· Sophia
agenticarchitect.ai/blog
```

**Note:** This email is a template. After each call you'll spend ~5 min filling in the [brackets] with what you actually discussed. That personal touch is what makes office hours referrals snowball.

---

## 8 · After the cap hits · what to do

When the 5th person books, Cal.com auto-shows "Fully booked" on the public link. You have two options:

**Option A · close it gracefully**
Update the event description to add a line at the top:
```
[FULLY BOOKED · 5 sessions claimed by BSW attendees]
```
And invite people to subscribe to the newsletter (agenticarchitect.ai/blog) for the next round.

**Option B · open paid slots**
Create a second event type called "Architect Audit · Paid" at $200 / 60-min, no cap. Move the unfortunate-timing folks there. Common pattern · respects the BSW free promise but doesn't leave money on the table.

Decide based on how energizing the first 5 felt. Don't decide today.

---

## 9 · QR code on slide 49

Once the Cal event is live, the QR code on slide 49 (autogenerated by `api.qrserver.com`) will point at the right URL. Verify it works:

```bash
# Open in your browser to confirm it leads to the booking page
open "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fcal.com%2Fsophia-stein%2Farchitect-audit-bsw"
```

If the slug is different from `architect-audit-bsw`, regenerate the slide's QR by editing `slides/index.html` line ~1500 (search for `architect-audit-bsw`).

---

*Toolkit v1 · Sophia Stein · MIT licensed · part of github.com/sudosoph/bsw26-agentic-workflows*
