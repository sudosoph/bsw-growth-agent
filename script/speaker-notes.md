# Speaker Notes · BSW 2026 Workshop

## Architecting Agentic Workflows for the Lean 2026 Startup
**Sophia Stein · Thursday May 7, 2026 · 11:00 AM – 12:00 PM · RegenHub**

---

## How to read this script

This is meant to be a peer-to-peer talk for founders at a free Boulder Startup Week workshop. The tone throughout is **generous · pedagogical · humble · matter-of-fact**. Every technical term gets defined the first time it appears. Every recommendation comes with a "why." Every tradeoff gets named.

You're not selling. You're not flexing. You're sharing what's working with people who showed up to learn.

**Format per slide:**
- ⏱ Timing target
- **Stage:** what you do physically
- **Say:** the narrative · written out, but not memorized
- **Define:** technical terms you'll plant on this slide
- **Bridge:** how you transition to the next slide
- ◆ Recovery: backup script for live-demo failures

**Tone calibrations:**
- Use "we" more than "I"
- Acknowledge what you don't know
- Define jargon every time
- Don't tell the audience what to do ("write this down" · "take a photo") — let them choose
- Land specific numbers and names · skip adjectives
- When you make a recommendation, give your reasoning · let the audience disagree

**Arc reminder (60 min · 43 slides):**
- 0:00 – 3:00 · Cold open + live demo
- 3:00 – 8:00 · What is an agent? (foundations)
- 8:00 – 12:00 · The 2026 landscape (compressed)
- 12:00 – 19:00 · Blueprint for Autonomy (the 20/80 framework)
- 19:00 – 21:00 · Pick your track (free vs paid · manual vs autopilot)
- 21:00 – 47:00 · Live build-along (8 build steps · post-demo recap · 7 other agents)
- 47:00 – 53:00 · Token economics (cascade · 5-tier roadmap · local hardware)
- 53:00 – 57:00 · HITL standard (trust ladder · Bain shadow case)
- 57:00 – 60:00 · Recap (5 takeaways) · CTAs · Boulder community

**Three deliverables (workshop description):**
1. **Blueprint for Autonomy** — the 3-axis matrix + green/yellow/red worksheet
2. **Live Build-Along** — the 8-step n8n agent + post-demo recap
3. **Human-in-the-Loop Standard** — trust ladder + shadow-testing case

**What every attendee takes home (any track):**
- Slides (this `slides/index.html`) + speaker notes (this file) on GitHub
- Both workflow JSONs · paid (Anthropic + Firecrawl) and free (Groq + HN/Reddit + Jina)
- Both autopilot prompts for Claude for Chrome
- 17-step manual `TUTORIAL.md` with the paid path · `CONFIGURATION.md` Recipe 1 for the free swaps
- Day-of cheat sheet · provider-swap recipes · `voice.md` template · ICP template

---

# PART 0 · COLD OPEN (0:00 – 3:00)

## Slide 1 — Cover

⏱ ~10 seconds. The cover is a handshake, not an opening line.

**Stage:** Walk on. Smile. Look at the room. Don't introduce yourself yet — that comes after the demo, when they've already seen what you're about to teach.

**Say:** Nothing yet. Let the title sit on screen for a beat.

**Bridge:** Click forward to slide 2 once you're settled and the room is quiet.

---

## Slide 2 — The Promise

⏱ ~30 seconds.

**Stage:** Read the slide aloud. Pause after "while you sleep."

**Say:**
> "Welcome. Before I tell you who I am, I want to show you what we're going to build together. By the end of this hour, you'll have an agent running tomorrow morning that does customer discovery while you sleep. The whole stack is open source. You can run it for FREE this week — no credit card, no install required. Or you can spend fifteen dollars a month for the higher-quality paid path. You'll walk out with a forkable repo that's yours to use however you want."

The promise is real. We're not going to teach AI theory and send you home with a reading list. We're going to build a working system, and you'll have it on your laptop by tonight if you want it. **The repo includes both paths — a "free tier" using Groq's free LLM and Jina Reader for web extraction, AND a "paid" path using Anthropic's Sonnet for higher voice-match quality. Same architecture · pick your spend.**

**Bridge:** "Let me show you what 'a working system' actually looks like, before we explain anything."

---

## Slide 3 — Live Demo Cut

⏱ ~90 seconds. The single highest-leverage moment of the hour. If this works, the audience is with you for the rest of the talk.

**Stage:** Switch to your browser. n8n on the left, Gmail on the right. The cron should have fired about 60 seconds ago, so the workflow is mid-flight or just finished when you advance to this slide.

**Say:**
> "Right before I walked on stage, an agent woke up on my laptop. It was running while I was getting mic'd up. Let me show you what it just did."

Walk through the trace, calmly:
> "It read my customer profile from a Google Sheet. It read a file called voice.md from my Google Drive — that's where my brand voice lives. Then it made one API call to Claude — Anthropic's model — and asked it to search Hacker News, Reddit, and Product Hunt for people publicly displaying signals matching my customer profile. It got back twenty-three candidates. Scored them. Kept the top five. Went and read each company's website. Drafted five personalized customer-discovery emails. And dropped them in my Gmail Drafts folder."

Switch to Gmail Drafts:
> "Here they are. Five drafts, sitting in my drafts folder. Each one took about two cents in API costs to generate. None of them have been sent. I'll skim each one, edit a word or two, and hit Send when I'm ready. The agent does the research and the writing. I do the judgment and the sending."

**Define:**
- "API call" — when one program asks another program to do something on its behalf. We make API calls to Claude, to Google Sheets, to Gmail. They're how systems talk to each other.

**Bridge:**
> "OK, that's the workshop in 90 seconds. Now let's go back and learn how to build it. And first — let me actually introduce myself."

◆ **Recovery (Wi-Fi tanks):** "Demo gods are unforgiving — I had a screen recording ready exactly because of this." Switch to backup MP4. Same narration works.

◆ **Recovery (drafts didn't generate):** "Even when this fails, what's interesting is the agent didn't send anything. That's the safety pattern we're going to talk about. Let me show you the trace anyway." Show the n8n execution log.

---

# PART 1 · WHAT IS AN AGENT? (3:00 – 8:00)

## Slide 4 — Section Divider · Foundations

⏱ ~30 seconds. This is also where you introduce yourself.

**Stage:** Back on slides. Stand still.

**Say:**
> "I'm Sophia. I architect agentic systems for founders. Local LLMs, lean stacks, open-source tooling — that's my world. I write at agenticarchitect.ai/blog if you ever want to follow up on anything from today."

> "For the next five minutes, I want to make sure we share a foundation. The word 'agent' gets used a lot, and it can mean different things to different people. So before we go into market context or frameworks or building anything, let's get on the same page about what we mean. This part is short. We'll move quickly."

**Bridge:** Click to slide 5. "First — what is an agent, really?"

---

## Slide 5 — The REACT Loop

⏱ ~75 seconds.

**Stage:** Point at the diagram on screen. Trace each step with your hand.

**Say:**
> "Every agent in the world — every one — is doing the same thing under the hood. Three steps. They were named in a paper called ReAct in 2022. The acronym stands for Reason · Action · Observation."

> "Reason: what should I do next? The model thinks about the goal and picks an approach."

> "Action: it calls a tool, queries some data, makes a draft. Something happens in the world."

> "Observation: it looks at what came back. Was that enough? Should I keep going?"

> "And then it loops. Reason. Action. Observation. Loop. Until a stop condition is met."

> "The reason this matters for you, if you're going to build agents: when you debug an agent, you'll always be debugging one of these three steps. Wrong reasoning means a bad prompt or a model that's not capable enough. Wrong action means a tool you wired up incorrectly. Wrong handling of observations means context engineering — the model isn't seeing what it needs to see. Three steps. Same loop, every framework. Memorize the loop, not the framework."

**Define:**
- "REACT" — Reason · Act · Observe · loop. The model decides what to do, does it, looks at the result, decides what's next.
- "Tool" — anything the model can call that's not the model itself. A web search. A database query. Drafting an email. We'll see specific tools in the build-along.

**Bridge:** "That's the loop. Now — what are the three layers an agent runs on?"

---

## Slide 6 — Model + Runtime + Tools

⏱ ~75 seconds.

**Stage:** Walk through the table row by row.

**Say:**
> "Every agent has three layers. Three pieces you have to choose. We'll choose each one for our discovery agent today, deliberately."

> "Layer one — the model. This is the reasoning engine. It's what decides what to do next, drafts the output, decides when to stop. Today we're using two Claude models — Sonnet 4.6 for the parts that need nuance, and Haiku 4.5 for the parts that just need to classify and extract. We're using two because of something called the cascade pattern, which we'll cover in detail in the cost section. If you outgrow the API budget, you can swap in Qwen 3.6, an open-weight model that runs locally on your laptop, or DeepSeek, which is a frontier-quality open model. Same architecture, different model."

> "Layer two — the runtime. This manages the loop. State. Tool calls. Retries. The audit log. Today we're using n8n. n8n is an open-source workflow tool. Visual interface, you connect nodes with lines. If you outgrow the visual layer, you graduate down to a code-first framework like LangGraph, or to Temporal if you need durable execution — that means workflows that survive across restarts and run for hours or days."

> "Layer three — the tools. The external capabilities the model can invoke. Today on the paid path: Claude's built-in `web_search`, Firecrawl for web extraction, plus the Gmail and Google Sheets APIs. On the free path: HN Algolia and Reddit's public JSON for search, Jina Reader for extraction — same shape, no auth. As you grow, you'll add more capabilities through MCP — Model Context Protocol — which is an open standard for plugging tools like HubSpot, Linear, or Stripe into any agent. We won't go deep on MCP today; the repo links to the registry if you want to explore later."

**Define:**
- "Model" — the AI itself. Claude, GPT, Gemini, Llama. The thing that reasons and writes.
- "Runtime" — the system that runs your agent's workflow. Manages state, handles retries, logs what happened.
- "Tools" — capabilities the model can invoke. Web search, email send, database read.
- "MCP" — Model Context Protocol. An open standard for how agents connect to external tools. We'll cover this in detail later.

**Bridge:** "Three layers. Pick each one deliberately. That's what we're going to do for the rest of the hour. Now let's zoom out — what changed in 2026 that makes building this kind of agent possible at all?"

---

# PART 2 · THE 2026 LANDSCAPE (8:00 – 16:00)

## Slide 7 — Section Divider · State of the Stack

⏱ ~25 seconds.

**Stage:** Stand still.

**Say:**
> "For the next eight minutes, we're going to talk about what changed in 2026 that makes the agent we just demoed possible. There are a few forces I want to walk you through. None of them are abstract — each one is a specific thing that landed in the last 18 months that you can use today."

**Bridge:** "Force one — the shape of work itself just shifted."

---

## Slide 8 — The 2026 Model Landscape

⏱ ~90 seconds. Table-heavy. Let people scan, then call out highlights.

**Stage:** Pause for 5 seconds. Let the table land.

**Say:**
> "Take a beat with this slide. This is the model market today, May 2026. Three things I want to point out."

> "First — the bolded rows. Opus 4.7, Sonnet 4.6, Haiku 4.5. Those are Anthropic's three tiers. They're priced as a clean cascade — five dollars per million input tokens for Opus, three for Sonnet, one for Haiku. Output is consistently five times the input cost across all three. That cascade ratio matters and we'll come back to it."

> "Second — look at GPT-5.5. Released April 23rd, two weeks ago. They doubled the price from GPT-5. Output costs more than Opus output now. And it's OpenAI-locked, meaning if you build on it, you can't easily swap to another vendor. For a lean SMB founder, this is a yellow flag — your costs aren't in your control."

> "Third — the green rows. Qwen 3.6-27B is open-weight, meaning the model files are public. You can download it, run it on your own hardware, no API bill. Their internal benchmarks claim it ties Sonnet on agent tasks. That claim isn't independently verified yet — treat it as directional. But the trajectory is real. Open-weight models keep catching up."

> "Today's stack is Sonnet 4.6 plus Haiku 4.5. We use both. The cascade matters more than the model choice, and we'll cover that cascade in detail in part four."

**Define:**
- "Open-weight model" — a model whose files are public. Anyone can download it and run it. No API bill, no vendor lock-in. You handle the hosting yourself.
- "Cascade" — using a cheaper model for simple steps and a more expensive model only for the steps that need it. Cuts your bill by about two-thirds. We'll show this in detail.

**Bridge:** "What landed in the last 60 days? Because I want you to feel how fast this is moving."

---

## Slide 9 — The New Founder Math

⏱ ~60 seconds.

**Stage:** Show the 2023 / 2026 split.

**Say:**
> "This is the math that brought me to this room."

> "In 2023, you would have hired four engineers to build what we're building today. Product, ops, marketing, support. Loaded cost about forty thousand a month."

> "In 2026, one founder plus an agent stack covers the same surface area. Roughly three hundred dollars a month."

> "I want to be careful about this — these aren't theoretical numbers. Pieter Levels publishes his finances on Twitter — three million in ARR, zero employees. Ben Broca runs Polsia, doing a million in ARR managing eleven hundred client companies solo. These aren't outliers anymore. They're the new normal for technical solo founders."

> "There's also a wall, and it's worth naming honestly. Most founders running this playbook stall at fifty to a hundred fifty thousand MRR. That's where the work outpaces what one human can supervise. That's not a problem — it's a runway. You can ride that runway for years before you need to make hiring decisions."

**Bridge:** "And there's a sentence that captures what changed for founders since 2023."

---

## Slide 10 — Stop Asking · Start Tasking

⏱ ~45 seconds.

**Stage:** Read the slide aloud, twice.

**Say:**
> "Henry Ward, the CEO of Carta, said this on a panel I attended in New York yesterday. 'Stop asking AI questions. Start giving AI tasks.'"

> "Worth unpacking what 'tasking' actually means, because it's the difference between a chatbot and an agent. Look at the box below. Four steps. One — you define a typed JSON schema, which means you tell the agent exactly what shape its output needs to be. Two — you give it five in-context examples. Three — you set a checkpoint where a human reviews before action. Four — you hit Run."

> "Asking is what we did in the chatbot era — type a question, get a one-shot answer. Tasking is what agents do — define the job, give the agent tools and a gate, let it run. Everything we cover in the next forty-five minutes is teaching you each of those four steps."

**Define:**
- "JSON schema" — a way to tell the agent exactly what fields its output should have. Like a fill-in-the-blank form. We'll see real schemas in the build.
- "In-context example" — a sample of what good output looks like, included in the prompt. The agent learns the pattern by example, not by instruction.

**Bridge:** "Last setup slide before we get into the framework. Let me make sure we agree on what this hour delivers."

---

## Slide 11 — What This Hour Delivers

⏱ ~45 seconds.

**Stage:** Walk the three cards.

**Say:**
> "The contract for this hour. Three things, all from the workshop description, mapped to what we're actually doing."

> "Card one — Blueprint for Autonomy. A framework for figuring out which 20% of your manual tasks are 80% automatable. Eight minutes. There's a worksheet."

> "Card two — Live build-along. We're building the Founder's Discovery Engine. Twenty-five minutes. The workflow JSON is open-sourced on my GitHub, MIT licensed, free to fork."

> "Card three — HITL standard. HITL stands for Human-in-the-Loop. It's how you maintain brand voice and ethical oversight while scaling output ten times. Five minutes. We'll cover the four-stage trust ladder and exactly how to graduate stages."

> "Plus, because the architecture is general, twelve transferable patterns and seven other agents you can build on the same stack. We'll get to those at the close."

**Define:**
- "HITL" — Human-in-the-Loop. A checkpoint in the agent's workflow where a human reviews output before it goes external. We'll cover this in detail in part five.

**Bridge:** "OK. Setup is done. Foundations are done. We're at minute sixteen. Now to the framework."

---

# PART 3 · BLUEPRINT FOR AUTONOMY (16:00 – 24:00)

## Slide 12 — Section Divider · Blueprint

⏱ ~20 seconds.

**Stage:** Stand still.

**Say:**
> "The 20/80 question is the most important question in this room right now. Every founder I've consulted asks me a version of it. 'Where do I start? What do I automate first?' The answer isn't 'whatever's most painful.' Pain is a bad signal — sometimes the most painful task is also the most irreversible. The right question is more structured. Three axes. Eight minutes."

**Bridge:** Click to the framework.

---

## Slide 13 — The 3-Axis Matrix

⏱ ~75 seconds.

**Stage:** Three cards. Walk each axis.

**Say:**
> "Three axes. Each one is a question you ask about a task on your plate."

> "Axis one — volume. How often does this task come up? High means daily or weekly. Low means occasionally. The principle: don't automate low-volume tasks. Even if they're painful, the build cost will exceed the time saved if you only do them three times a year."

> "Axis two — determinism. Are the steps the same every time? Deterministic tasks have rules you can write down. Ambiguous tasks need judgment. Deterministic tasks are easier automations. Ambiguous tasks aren't off-limits — they just need a human checkpoint somewhere in the loop."

> "Axis three — reversibility. If the agent gets it wrong, what breaks? Low-stakes tasks are recoverable — wrong message, you fix and resend. Irreversible tasks aren't — wrong wire transfer, you don't get that back. Irreversible tasks should never be fully automated. Period."

> "Combine the axes and you get three colors. Green is high volume, deterministic, reversible — automate now. Yellow is high volume, ambiguous, reversible — automate WITH a human checkpoint. Red is anything irreversible — don't automate."

**Define:**
- "Deterministic" — same inputs always produce the same outputs. Like a math equation.
- "Ambiguous" — outcome depends on judgment. Like writing an email or making a hiring call.

**Bridge:** "Let me make this concrete with examples for a lean startup."

---

## Slide 14 — Green / Yellow / Red Examples

⏱ ~75 seconds.

**Stage:** Three columns. Walk green first, then yellow, then red.

**Say:**
> "Look at the columns. Find your week in here."

> "Green — automate now. Lead enrichment. Competitor monitoring. Content repurposing. Form and signup triage. Meeting notes to CRM. Daily metric digests. These are tasks where the agent's wrong answer costs you nothing — you just re-run."

> "Yellow — automate with a human checkpoint. Outbound copy. Pricing analysis. Support drafts. Investor updates. Cold outreach. Refund decisions. Each of these wants an agent doing the heavy lifting, but a human approving before the action goes external."

> "Red — don't automate. Hiring decisions. Product roadmap. Customer escalations. Strategic pivots. Cofounder conflicts. Legal terms. These require judgment that compounds, and the cost of a wrong call is too high. Human in, agent out."

> "Today's demo lives in yellow — cold outreach with HITL. It's the most leveraged yellow task you can pick. High volume, ambiguous output, but reversible because the agent doesn't actually send. We'll get to that in detail in the build-along."

**Bridge:** "Now your turn. Pick yours. We're going to do the worksheet."

---

## Slide 15 — Worksheet · 90 Seconds Silence

⏱ 90+ seconds. The most important 90 seconds of the workshop.

**Stage:** Walk to the back of the room. Set a visible timer. Don't speak.

**Say:**
> "This is a workshop. Right now we're going to do workshop work. I'm going to be quiet. So are you. Don't watch me. Write."

> "Five rows. Five tasks you do every week. Anything recurring counts — outbound, support, research, ops, content. For each row, mark Volume, Determinism, Reversibility. Last column, give it a color: green, yellow, or red."

> "Ninety seconds. Starts now."

[Set the timer. Walk away. Don't fill the silence.]

**After the timer:**
> "OK. Hands up if you have a green. Good. That's the agent we're going to teach you to build. We're using customer discovery as today's example, but the architecture is the same regardless of what's on your row."

**Bridge:** "Before we go to the build, one more slide. The most important inclusion slide of the hour."

---

## Slide 16 — Pick your track

⏱ ~70 seconds. The inclusion slide. Read this calmly. Make eye contact with the room.

**Stage:** Four cards on screen. Two axes — free vs paid, manual vs autopilot.

**Say:**
> "Before we build, I want to make sure everyone in this room knows you can ship this — regardless of your wallet or your code experience. Two axes, four tracks. Pick the one that fits."

> "Axis one — money. Free or about six dollars a month. The free track uses n8n's cloud free trial, Groq's free tier — that's Llama 4 Scout, an open-weight model from Meta — plus public no-auth endpoints for Hacker News and Reddit, plus Jina Reader for web extraction. Zero credit cards. Quality is slightly lower than paid, but plenty for evaluation. The paid track uses Anthropic's Claude — Sonnet 4.6 and Haiku 4.5 — plus Firecrawl. About six dollars a month at default frequency. That's what the demo you just watched was running on."

> "Axis two — how you set it up. Manual or autopilot. Manual means you follow seventeen steps in TUTORIAL.md in the repo. About forty-five minutes self-paced. You learn the architecture deeply. Autopilot means you paste a prompt into Claude for Chrome — the browser-controlling AI — and the browser agent does the signups, the OAuth screens, the spreadsheet creation, and the workflow import for you. About ten minutes, mostly hands-off."

> "Whether you're a technical founder who wants to own every node or a non-technical visionary who wants the agent running by Sunday, there's a track for you."

**Define for the room:**
- "Open-weight model" — a model whose parameters are publicly downloadable. Llama, Qwen, DeepSeek. You can run it on Groq for free or on your own hardware.
- "OAuth" — the popup that says "Allow this app to access Gmail." Standard way to give an agent permission without sharing a password.

**Reassurance — slow down here:**
> "You walk out with the slides, the speaker notes, the workflow JSON files for both stacks, the autopilot prompts for both stacks, and a seventeen-step tutorial. Don't memorize anything I say in the next forty minutes. The repo is your reference. I just want you to understand the architecture well enough to know which track to pick this weekend."

**Bridge:** "Now — the agent we're building."

---

# PART 4 · LIVE BUILD-ALONG (24:00 – 49:00)

## Slide 17 — Section Divider · Build

⏱ ~25 seconds.

**Stage:** Stand still.

**Say:**
> "Twenty-five minutes from this slide to a working agent. Eight build steps. Each step has a teaching moment beyond the build itself. By the end of this section, we'll have hit twelve transferable patterns — those are the Lego pieces I want you to take with you. Plus seven other agents you can build on the same stack in less than thirty minutes each."

**Bridge:** "Let me show you what we're building before we build it."

---

## Slide 18 — One-Screen Spec

⏱ ~60 seconds.

**Stage:** Top to bottom of the diagram.

**Say:**
> "One screen. The whole thing."

> "Daily at 7am, the agent wakes up. It listens to Hacker News, Reddit, Product Hunt, and X for what we call ICP signals — that's ideal customer profile signals, things people are publicly posting that match the kind of customer we're looking for. It researches each lead. It drafts a customer-discovery email in your voice. Notice — this is an interview ask, not a pitch. We're learning, not selling. It drops the email in your Gmail Drafts folder. It never sends. You always send."

> "If five days pass and the prospect hasn't replied, the agent drafts a follow-up. Same gate. Still doesn't send."

> "Once a day at 7:30am, you get a digest email summarizing what the agent did overnight. Five drafts ready. Three follow-ups queued. Maybe one reply yesterday."

> "Cost per run: about 21 cents. Monthly: about six dollars on the paid stack, eight dollars if you go max DIY. Build today: 25 minutes."

**Define:**
- "ICP" — Ideal Customer Profile. Who you're trying to reach. We'll write an ICP file together.

**Bridge:** "Now the architecture. This is the slide I want you to look at carefully."

---

## Slide 19 — Architecture Diagram

⏱ ~90 seconds. Centerpiece slide. Spend the time.

**Stage:** Walk every line.

**Say:**
> "Nine steps. Three sub-agents. One workflow. Top to bottom."

> "**Step one — trigger.** Cron 7am or manual webhook. We have both. Cron for daily, manual for testing on stage."

> "**Step two — read.** The agent reads the ICP from a Sheet, and a file called voice.md from Drive. Both files. We'll come back to this pattern three times — it's called config-as-files, and it's the single most important pattern in this whole architecture."

> "**Step three — discovery.** Sub-agent number one. Haiku 4.5 with the web_search tool enabled. One Claude call does both the search and the structured extraction. Returns typed JSON: person, signal type, source URL, evidence quote, score."

> "**Step four — dedup.** Against the Sent log in our Sheet. Idempotency. Re-run safety. So if the workflow fires twice in one morning, we don't email the same person twice."

> "**Step five — enrich.** Only the top five candidates by score get Firecrawl'd. The other twenty-five we don't even bother researching. Then Haiku writes a two-line company summary. Cheap-fast first, expensive-deep second."

> "**Step six — draft.** Sub-agent number two. Sonnet 4.6 plus voice.md plus five example emails. The only premium-token step in the whole workflow."

> "**Step seven — HITL gate.** Gmail.createDraft. Never sends. This is the most important node in the entire architecture. The agent does the research and the writing. You do the judgment and the sending."

> "**Step eight — digest.** Sub-agent number three. Sonnet writes a one-paragraph summary email to you. Daily, 7:30am."

> "**Step nine — log.** Append a row to the Runs sheet. Audit and cost meter. Every run, every count."

> "Three Claude prompts in total. Each one only sees the context it needs. None see the whole conversation. This is sub-agent decomposition for cost — we'll cover the math in part five."

**Define:**
- "Sub-agent" — a separate prompt and model invocation within a single workflow. Each sub-agent gets only the context it needs. Different from "multi-agent" which means agents talking to other agents — that's out of scope today.
- "Idempotency" — running the same workflow twice produces the same result as running it once. No double-sends.

**Bridge:** "Time to build. Step one of eight."

---

## Slide 20 — Step 1 · Triggers

⏱ ~90 seconds. Switch to live n8n. Drag a Schedule Trigger node.

**Stage:** Click into n8n, drag the schedule trigger, set the cron expression.

**Aside (optional · ~15 sec if time permits):**
> "Quick aside before we build — if you have Claude for Chrome or Gemini in Chrome or OpenAI Operator, you can autopilot the entire setup phase. Sign up for the accounts, copy the keys, prepare the Google Sheet, all hands-off. There's a paste-able prompt in the TUTORIAL on GitHub. I built this manually so you'd see what's happening, but you don't have to."

**Say:**
> "Step one. Triggers. How does your agent wake up?"

> "Three flavors of trigger. Cron, webhook, manual."

> "Cron is a timer. The word 'cron' is short for 'chronograph' — it's an old Unix word for 'run this on a schedule.' You write it as five numbers separated by spaces. Today's expression — zero seven star star star — means 'every day at 7am, on every day of the month, every month, every day of the week.' We'll set this. Almost every SMB agent starts as cron."

> "Webhook is a doorbell. Some other system rings, your agent answers. Form fills, signups, support tickets. As your business grows you'll add webhooks for events worth waking the agent up for."

> "Manual is you clicking Run. We're going to add a manual trigger today specifically so I can demo on stage. You'll use it for testing."

**Define:**
- "Cron expression" — a five-number string that tells the system when to run. There are free generators online if you don't want to memorize the format.
- "Webhook" — a URL that other systems can call to trigger your workflow.

**Bridge:** "Step two. The single most important architectural pattern we'll cover today."

---

## Slide 21 — Step 2 · Config-as-Files

⏱ ~120 seconds. Slow down. This is the lesson worth ten thousand dollars.

**Stage:** Show the actual files in your Drive folder. Open voice.md.

**Say:**
> "Step two. Config-as-files. Not config-as-prompts. This is the most important pattern from today's session, in my opinion. If you take only one thing from this hour, take this."

> "The principle: every input that drives the agent's behavior — voice, ICP, schemas, examples, exclusion lists — should live as a versioned editable file. Not a string buried in a workflow node. Not text inside a prompt. A file. With a name. With version history if you want it."

Walk the table:
> "voice.md — your tone, your words to use, the five emails you want the agent to imitate. Lives in Drive. You edit rarely."

> "icp.md — who you're looking for, what keywords to scan for, what triggers buying intent. Lives in Drive. You edit monthly as your understanding sharpens."

> "do-not-contact.csv — the exclusion list. Lives in Sheets. You edit any time someone asks to be removed."

> "schemas.md — the structured JSON shapes for each Claude call. Lives in Drive. The architect — that might be you, that might be someone you hire — edits this rarely."

> "Why does this matter so much? Because if your voice or your ICP or your exclusion list is buried in a workflow node, every change requires you to open n8n. Every change is a small risk. Every change requires that you remember n8n exists."

> "If they're files — your virtual assistant can edit voice.md without learning n8n. Your future cofounder can update icp.md from their laptop. Your assistant can add a row to do-not-contact.csv when an opt-out comes in. The agent inherits the change next run. No deploy. No redeploy. No pager."

> "The shorthand I use for this: look at every place in your workflow where a string of English drives the agent's behavior. That's a file. Not a prompt. A file. With version history. Memorize this pattern. It's the difference between an agent that one person can run and an agent your team can run."

**Bridge:** "Step three. The first sub-agent."

---

## Slide 22 — Step 3 · Discovery via Claude web_search

⏱ ~120 seconds.

**Stage:** Show the JSON request body in the n8n HTTP Request node.

**Say:**
> "Step three. The discovery sub-agent. One node, one API, one call."

Walk the JSON:
> "Look at the body. Model is claude-haiku-4-5. Notice the tools array — we're enabling Claude's built-in web_search tool. Anthropic added this in 2024 — it lets the model search the web during a single API call. The system prompt is whatever's in your icp.md file, which we read from Drive in the previous node. The user message asks for structured output: an array of objects with person, signal type, source URL, evidence quote, and a relevance score."

> "That's the whole search-and-extract step. One call. Returns clean JSON ready for the next node."

> "Two things worth explaining. Why Haiku and not Sonnet? Sub-agent number one is doing classification. Scoring leads. Extracting fields. Deduping. Haiku is plenty smart for that. Sonnet for nuance. This is the cascade pattern, and it cuts your bill by about sixty to seventy percent versus naively using Sonnet for everything."

> "Why Claude's web_search and not Perplexity? Two reasons. One — single vendor, single key, single node. You manage one credential, not two. Two — at our scale, Claude's web_search costs about one dollar fifty more per month than Perplexity. The simplicity is worth it. When you hit a hundred thousand searches a month, swap in Perplexity. That's a decision based on bill, not principle."

**Define:**
- "Built-in tool" — a tool the model knows how to use without you wiring it up. Web search, code execution, computer use. You enable it in the API call.

**Bridge:** "Step four. The unsexy slide that separates demos from agents that actually run every day."

---

## Slide 23 — Step 4 · Idempotent Dedup

⏱ ~75 seconds.

**Stage:** Show the n8n Code node with the JavaScript.

**Say:**
> "Step four. Dedup against state. So re-runs don't double-email anyone."

> "Idempotent is a word from systems engineering. It means: running the agent twice produces the same outcome as running it once. Re-run safety."

> "Why does this matter? You will re-run this agent. Bug fix triggers a re-run. Missed cron triggers a re-run. Demo on stage — like right now — triggers a re-run. Without dedup, you double-email five prospects. They block you. They tell their friends. In the SMB outbound world, your sender reputation is everything. We do not want to learn this lesson the hard way."

> "The pattern is three lines of JavaScript. Read the Sent column from your Sheets log. Filter the candidate list to drop anyone already in the log. Return the fresh ones."

> "This is plumbing. The unsexy stuff. I want to flag — Bain HR Services presented their production payroll agent at AI Dev last week, and the line that stuck with me was 'eighty percent of the engineering effort was the scaffolding around the agent, not the agent itself.' Same lesson at startup scale. The agent is twenty percent. Dedup, audit log, voice file, exclusion list — that's the eighty percent."

**Bridge:** "Step five. Cheap-fast first."

---

## Slide 24 — Step 5 · Progressive Enrichment

⏱ ~60 seconds.

**Stage:** Show the diagram. Drag the Firecrawl node.

**Say:**
> "Step five. Progressive enrichment. Cheap-fast first, expensive-deep second."

> "Look at the diagram. Discovery returned thirty candidates. We score them with Haiku, drop the bottom twenty-five, keep the top five. Then we go deep — Firecrawl on the top five only."

> "This is the architect's frugality discipline. Never spend a dollar enriching a candidate you'll throw out. If your enrichment step is expensive, gate it behind a cheap scoring step."

> "A word about Firecrawl. Firecrawl is an open-source web extraction tool — Apache 2.0 license, meaning you can self-host it for free or pay them eighty-three a month for the cloud version. Best signal-to-noise on JavaScript-heavy sites we've used. Their cloud version makes onboarding fast. As your bill grows, you self-host."

**Bridge:** "Step six. The only premium-token step in the whole workflow."

---

## Slide 25 — Step 6 · Drafting with Sonnet

⏱ ~120 seconds.

**Stage:** Show the prompt config in n8n.

**Say:**
> "Step six. Drafting. Sub-agent number two. Sonnet 4.6 plus voice.md plus five example emails. This is the only premium-token step in the workflow."

Walk the JSON:
> "Model is claude-sonnet-4-6. The system prompt is voice.md plus five example emails concatenated. Notice the cache_control field on the second system prompt block — we're telling Anthropic to cache the voice file, so it costs less to read on every subsequent run. We'll cover caching in detail in part four."

> "The user message tells the model what to draft, with all the context: who the person is, what their signal was, the source URL, and the company context we just enriched. The instruction is specific — interview ask, not pitch. Soft CTA. 80 to 110 words."

> "Two things worth saying out loud. Why Sonnet here, not Haiku? Voice match is where quality matters. Haiku writes — let me be blunt — generic-friendly cold outreach prose. Helpful but obviously generated. Sonnet reads voice.md and writes like the person who wrote those examples. The difference per draft is a few cents. The difference in send rate from your audience is significant."

> "Why five examples and not three? In-context examples beat any system-prompt instruction. Five is the minimum that gives the model enough range to imitate consistently. The discipline of writing five really good emails of your own is what makes voice match work. Without the examples, you're hoping. With them, you're teaching."

**Bridge:** "And this is what voice.md actually looks like."

---

## Slide 26 — voice.md Content

⏱ ~75 seconds.

**Stage:** Read the snippet aloud.

**Say:**
> "This is the file. Most of the work in this whole agent is here, in voice.md. I want to walk through what's in mine, because the structure generalizes."

Read each section:
> "Posture — direct, no fluff, short sentences. Specific over abstract. Numbers over adjectives. Confident but not arrogant. Assume the reader is smart."

> "Words I use — I list them. Architecture, compounding, leverage, the math here is. These are mine. Yours will be different."

> "Words I never use — I list them too. Synergy. Unlock. Revolutionary. I hope this finds you well. The discipline of naming what you don't say is as useful as naming what you do."

> "Email structure — five steps. Specific. One-line context. Two-line observation. One question. One sentence on what you do. Soft CTA."

> "Examples — and this is where the work actually happens. Five real emails I'd actually send. They live in the voice.md template you can grab from the GitHub repo at the close."

> "This file does more work than any prompt instruction in the world. The agent inherits your taste through examples, not adjectives. Rule of thumb: if you can't write five good examples, the agent can't either."

**Bridge:** "Step seven. The most important node in the entire workflow."

---

## Slide 27 — Step 7 · The HITL Gate

⏱ ~90 seconds.

**Stage:** Two-card layout. Walk left card, then right card.

**Say:**
> "Step seven. HITL — Human-in-the-Loop. Let me define this precisely: HITL is a checkpoint in the agent's workflow where a human reviews the agent's output before it goes external."

> "In our agent, the HITL gate is the Gmail.createDraft node. The agent never sends. You always send."

Walk the left card:
> "Left card — what it does. Drafts land in your Gmail Drafts folder. You skim, edit a word or two, hit Send. About ten seconds per draft. Five drafts a day plus five follow-ups equals ten sends per day. Roughly three hundred personalized emails a month. Roughly fifty minutes of your time per month."

Walk the right card:
> "Right card — what it gives you. This is the ten-times output math the workshop description promised. The ten times isn't ten times more emails. You're sending the same volume you would have sent before. The ten times is your time. Ninety minutes a day on outbound becomes five to ten minutes a day. Fifty hours a month becomes five hours a month. The other forty-five hours go to product, customer calls, fundraising. That's what HITL done right buys you."

> "And — important point — this is exactly the level of automation today. We'll cover in part five how to graduate from HITL to conditional auto and eventually full auto, with the right guardrails at each stage. But today's demo ships at HITL. The agent never sends."

**Bridge:** "Step eight. Daily wrap. Two outputs."

---

## Slide 28 — Step 8 · Digest + Audit Log

⏱ ~75 seconds.

**Stage:** Two-card layout matching slide 30.

**Say:**
> "Step eight. Sub-agent number three. Daily digest plus audit log."

Walk the left card:
> "Left card — the digest. Subject line: Discovery Pulse, dated today. Body: five new drafts queued, three follow-ups ready, one reply yesterday from a specific handle. Cost today: 21 cents. Top signal type today: pricing-frustration, two of the five candidates."

> "This is sub-agent number three. Sonnet 4.6, batch-eligible. Batch-eligible means we can send it through Anthropic's batch API at fifty percent off, because the digest doesn't need to be real-time. It just needs to land before you wake up."

Walk the right card:
> "Right card — the audit log. Every run appends a row to your Sheets Runs tab. Date. Leads found. Drafts created. Cost in dollars. Average score. Top signal type. Errors."

> "Two takeaways. One — your founder's brain doesn't have to track this stuff. The agent reports it. Two — the audit log is what lets you graduate the agent up the trust ladder. After two weeks of high approval rates, you can promote the agent from HITL to conditional auto. We'll cover the ladder in part five."

**Bridge:** "Eight build steps. Let me show you how follow-up works — same architecture, different inputs."

---

## Slide 29 — Follow-Up Sub-Workflow

⏱ ~60 seconds.

**Stage:** Diagram on screen.

**Say:**
> "Bonus slide. The follow-up sub-workflow."

> "Second cron, daily at 8am. Query Gmail by label 'Sent — Discovery.' For each thread, check elapsed days since the last message and check whether any reply came in. If five or more days have passed and there's no reply, read the full thread. Then Sonnet drafts a follow-up that references the original thread — not a copy-paste reminder, an actual continuation. Drop in Gmail Drafts. You approve."

> "Same architecture as the drafting step. Same Sonnet node. Different inputs. Once you've built one agent like this, you've built five. That's the leverage of architectural consistency."

**Bridge:** "Pause for a second. Let me show you everything you just connected, in plain language, before we zoom out into the patterns."

---

## Slide 30 — What you just connected · the moving parts

⏱ ~75 seconds. The most important slide for beginners.

**Stage:** Six cards on screen. Walk each one calmly. Don't speed.

**Say:**
> "Six pieces. That's the whole stack you just saw run. Let me name each one in plain language."

> "**One — the brain.** The Claude API. Two models in cascade: Haiku 4.5 for the cheap routing and scoring, Sonnet 4.6 for the drafting where voice quality matters. Splitting the work like this cuts your bill 60 to 70 percent versus using Sonnet for everything. If you don't want to add a credit card, the lite version uses Llama 4 Scout on Groq — totally free."

> "**Two — the eyes.** How the agent sees the world. Anthropic's `web_search` tool searches HN, Reddit, Product Hunt without you wiring up a separate API. Firecrawl extracts the prospect's company website into clean markdown. The free path swaps web_search for HN Algolia plus Reddit JSON — both public endpoints, no signup — and Firecrawl for Jina Reader, which has a no-key, no-account endpoint. Same shape, $0."

> "**Three — the body.** n8n is the orchestrator. Open source. Visual drag-and-drop nodes. You can self-host on a five-dollar VPS, or use the n8n.cloud free trial. This is the layer that wires everything together."

> "**Four — the memory.** A Google Sheet with three tabs. ICP — your customer profile, your signal keywords, your subreddits. Sent — the idempotency log so the agent doesn't double-email anyone. Runs — the audit log, every run, every count, every cost. The agent reads from these tabs, the agent writes to these tabs. You can read them too, edit them, share them with a teammate. Nothing is hidden."

> "**Five — the voice.** A single Google Doc called `voice.md`. Five example emails, your tone notes, phrases you use, phrases you don't. Sonnet caches this on every call. Edit the doc, the next run sounds more like you. This is the file that does the heavy lifting on voice match."

> "**Six — the gate.** Gmail Drafts. The agent never sends. It only drafts. You read each one, you edit if needed, you hit send. This is human-in-the-loop, stage two of the trust ladder. We covered this — the agent has to earn its way to higher autonomy through the audit log over weeks, not days."

**Define for the room:**
- "API key" — a password your code uses to talk to a service. You get one, you paste it into n8n's credential vault, you never paste it into your code.
- "OAuth" — the popup that says "Allow Discovery Engine to access Gmail." That's how the agent gets permission without you giving it your password.
- "Webhook" — a URL the agent listens on, so an external system can wake it up. We use it for the live demo trigger.

**The one-line takeaway:**
> "To **run** this, you need four free accounts: n8n.cloud, Anthropic with five dollars in credit, Firecrawl with its free tier, and your existing Google. To **customize for your own business**, you change four things — all inside your Sheet, no redeploy: your `voice.md` content, your `icp_description`, your `signal_keywords`, and the subreddits column. That's it."

**Bridge:** "Now let me consolidate the six pieces into the eight plumbing primitives that generalize beyond this specific agent."

---

## Slide 31 — Plumbing Primitives

⏱ ~60 seconds.

**Stage:** Walk the table.

**Say:**
> "Build summary. Eight steps, eight plumbing primitives. Quick definition: a primitive is a reusable building block. The same way Lego pieces can build different things, these primitives can build different agents. Memorize the primitives, not this specific workflow."

Walk the table briefly:
> "Trigger types. Wake the agent up. Cron, webhook, manual."

> "Config-as-files. Editable behavior, no redeploys."

> "Sub-agent decomposition. Cheaper, narrower context per step."

> "Cascade — Haiku for cheap, Sonnet for nuance, Opus for hard edges. Sixty to seventy percent bill cut."

> "Schema-first JSON. Connections that don't break."

> "Idempotent dedup. Re-run safety."

> "HITL via Gmail drafts. Brand voice protection."

> "Audit log plus cost meter. Trust through track record."

> "These are the spine of every agent you'll build for the next five years. Tools change. Patterns don't."

**Bridge:** "Same primitives, twelve named patterns from this demo. Yours to keep."

---

## Slide 32 — 12 Transferable Patterns

⏱ ~50 seconds.

**Stage:** Grid view. Don't read all twelve.

**Say:**
> "Twelve transferable patterns from this one demo. Yours to keep."

> "I'm not going to read all twelve out loud. The grid is here for you to scan now and screenshot if you want a reference. The pattern card numbers map to the build steps we just walked through."

> "What I want to call out — number two, config-as-files, is the lesson. Number eight, HITL via drafts, is the workshop description's brand-voice promise. Number nine, sub-agent decomposition, is the cost lever. The other nine are plumbing — necessary but not the headline."

> "You came here to build one agent. You're walking out with twelve Lego pieces."

**Bridge:** "Now the leverage. Same stack, seven other agents you can build in less than thirty minutes each."

---

## Slide 33 — 7 Other Agents on the Same Stack

⏱ ~75 seconds.

**Stage:** Walk the table.

**Say:**
> "Seven other agents you can build with the same n8n plus Claude plus Gmail stack in under thirty minutes."

Walk briefly:
> "Inbound triage — form fill triggers, agent researches the lead, drafts a response."

> "Competitor pulse — daily diff competitor changelogs, surfaces what changed."

> "Support draft — ticket triggers, agent looks up your knowledge base, drafts a reply."

> "Content repurposer — new blog post triggers, agent generates a tweet thread, LinkedIn post, newsletter blurb."

> "Call notes to CRM — Zoom recording triggers, agent extracts notes, updates HubSpot or Pipedrive or Attio."

> "Investor update — monthly cron, agent pulls metrics from your systems, drafts a narrative email."

> "Onboarding personalizer — signup triggers, agent enriches the signup, drafts a personalized welcome series."

> "Same architecture every time. Different trigger. Different search and extract logic. Different output target. The point of this slide isn't 'pick one of these.' The point is — once you've built the discovery agent, you've built the architecture for any of these. Ship a different one every week if you want to."

**Bridge:** "OK. We're at minute forty-nine. The build is done. Now let's talk economics, because the difference between a $135-a-month agent and an $8-a-month agent is one weekend."

---

# PART 5 · TOKEN ECONOMICS + OSS POSTURE (49:00 – 55:00)

## Slide 34 — Section Divider · Token Economics

⏱ ~25 seconds.

**Stage:** Stand still.

**Say:**
> "Six minutes here. The lean-founder economic lever. Same agent — the difference between a one-hundred-thirty-five-dollar bill and an eight-dollar bill is one weekend of work. We'll walk the cascade, the tier roadmap, and where local hardware breaks even."

**Bridge:** "Cost lever number one. The cascade pattern."

---

## Slide 35 — The Cascade Pattern

⏱ ~60 seconds. Calm. Show the diff.

**Stage:** Two cards on screen — naive cost vs cascade cost.

**Say:**
> "Cost lever number one. The cascade pattern. The single most underused sixty-percent bill cut I see when I audit founders' agents."

> "Naive pattern — you wire Sonnet into every step. It works. Same workflow, 100,000 input and 20,000 output tokens daily, runs you about eighteen dollars a month."

> "Cascade pattern — you split. Haiku for routing, classifying, extracting, scoring, dedup. Sonnet only for the one or two steps that need nuance — like drafting in your voice. Opus only for genuinely hard edge cases. Same workflow, same output quality. About six dollars a month."

> "Sixty to seventy percent reduction. Most of the founders I consult for are paying double, because they wired Sonnet into every step. Splitting your nodes between Haiku and Sonnet takes thirty minutes and saves about $144 per agent per year. Across five agents, that's real money."

> "The free path follows the same logic — Llama 3.1 8B Instant for the cheap classifications, Llama 4 Scout for the heavy work. Same cascade, $0."

**Define:**
- "Tokens" — small chunks of text models read and write. About four characters each. Pricing is usually quoted per million tokens.

**Bridge:** "Now — same agent, five different stacks, five different monthly bills. You pick your tier."

---

## Slide 36 — The 5-Tier Cost Matrix · from FREE to fully paid

⏱ ~120 seconds. This is now a five-tier slide. The new addition is **Tier 0 · FREE · zero install** — added at audience request, because nobody should need a credit card to test an agent.

**Stage:** Bar chart. Walk each tier.

**Say:**
> "This is the money slide. Same agent. Five ways to deploy. Look at the bars from top to bottom."

> "Tier zero — FREE. No credit card. No install. n8n.cloud has a 14-day free trial. Groq's free tier gives you Llama 4 Scout for the heavy work and Llama 3.1 8B Instant for the cheap classification — Meta's open-weight models, no card required. HN Algolia and Reddit's JSON endpoint give you real web search with no signup at all. Jina Reader extracts company sites the same way — hit a URL, get clean markdown back. Combine those with your existing Google account, and the whole agent runs at zero cost for two weeks. **That's the path I want every one of you to try this weekend.** Quality is slightly lower than the paid stack — Llama 4 won't quite match Sonnet on voice match — but for evaluation, it's perfect."

> "Tier one — all-cloud SaaS. After the trial expires, the easiest upgrade. n8n.cloud at $24, Perplexity at $5 a month if you use it, Firecrawl Cloud at $83, plus the Sonnet API. About $135 a month total. Easiest to set up. Most expensive. This is where pre-PMF founders should land if they want zero ops overhead and best-in-class voice match."

> "Tier two — hybrid. Self-host n8n on a $5 Hetzner VPS. Keep Perplexity, keep Firecrawl Cloud. Save $40 a month. About $95 total. Two evenings of work."

> "Tier three — lean self-hosted. n8n self, SearXNG self, Firecrawl self, Sonnet API. About $15 a month. One weekend of Docker."

> "Tier four — maximum DIY. Tier three plus Qwen 3.6 running on a local box for the classification work. About $8 a month total. Hardware up front, but ongoing operation drops to nearly zero. Note that Tier four DOES require an Ollama install — that's the only tier where you have to set up local infrastructure."

> "Same agent. Same output. The difference between $135 and $15 is one weekend. The difference between $15 and $8 is a $1,499 piece of hardware on your desk."

> "My recommendation: **Try Tier 0 this week. It's free. No card. Get a feel for the agent. After the trial, decide based on your bill — Tier 1 if you have ops bandwidth and want best quality; Tier 3 if you have a weekend of Docker time. Skip Tier 4 unless you have privacy-sensitive workloads or your bill exceeds $200 a month. That progression IS the roadmap.**"

**Bridge:** "Speaking of local hardware — let me show you what changed the math in 2026."

---

## Slide 37 — Local Hardware Inflection

⏱ ~60 seconds.

**Stage:** Walk the table.

**Say:**
> "Two thousand twenty-six changed the math. This wasn't true two years ago."

> "AMD Strix Halo — Framework Desktop or GMKtec mini-PC. $1,499 to $2,500. Runs Llama 3 70B at low quantization with 96 gigabytes of unified memory. Fourteen to eighteen tokens per second. For most lean founder workloads, this is the right local box right now."

> "Mac Studio M3 Ultra with 96 gigabytes — $3,999. Runs Qwen 3.6-27B at seventeen to eighteen tokens per second. If you're already on Mac, the MLX framework is twenty to thirty percent faster than Ollama on the same hardware."

> "RTX 5090 with 32 gigabytes — about $3,600 street. Best raw throughput. Win/Linux gamer-builders' choice."

> "Crossover math: break-even versus the API at about two to three million tokens a day. Roughly twelve-month payback. After that, ongoing operation is forty to two hundred times cheaper than the API."

> "When does local make sense? When your API bill exceeds $200 a month. When you're handling personally identifiable information. When you have a predictable workload that doesn't need elasticity. Most of you don't need local yet. Start with the API. We'll cover this in our follow-up if you book office hours."

**Bridge:** "OK. Economics done. Last big topic — the standard for keeping this safe and on-voice as you scale."

---

# PART 6 · HITL STANDARD + PRODUCTIONIZATION (55:00 – 58:00)

## Slide 38 — Section Divider · HITL

⏱ ~20 seconds.

**Stage:** Read the question slowly.

**Say:**
> "Maintain brand voice and ethical oversight while scaling output ten times. Direct from the workshop description. This section delivers it."

**Bridge:** "We covered HITL earlier in the build-along. Now I want to show you what comes after — how to graduate from human-in-the-loop today to conditional auto tomorrow to full auto eventually, with the right guardrails at each stage."

---

## Slide 39 — From HITL Today to Full Auto Tomorrow

⏱ ~120 seconds. The productionization roadmap. Spend time here.

**Stage:** Walk the table row by row.

**Say:**
> "This is the table I want you to memorize from this section. Four stages of trust. Each stage adds the guardrails of the stage before, plus new ones. You graduate one stage at a time. You don't skip."

Walk row by row:
> "Stage one — Shadow. The agent runs alongside you. No external action. You compare its output to your own. You're learning whether it's any good. Guardrails at this stage: schema validation — does the agent produce valid output? Cost ceiling per run — auto-halt if it spends more than a dollar before you've vetted it. Promote when you have ninety percent or higher agreement over fifty-plus runs."

> "Stage two — Pending Review. This is where today's discovery engine ships. The agent drafts. Never sends. You approve, edit, or reject each output. Guardrails: everything from stage one, plus a voice-distance check — measure how far each draft is from your established voice, flag outliers — plus an audit log on every action — plus a do-not-contact filter. Promote when you have ninety-five percent or higher approval over two weeks."

> "Stage three — Conditional Auto. The agent auto-fires the high-confidence outputs. For example: only auto-send if the relevance score is eight or higher AND the voice match score is point-eight-five or higher. Everything else stays in pending review. Guardrails: everything from stages one and two, plus a rate limit per recipient — never send the same person more than two emails in a month — plus anomaly detection — alert on sudden behavior changes — plus sandbox isolation, meaning each agent run happens in a Docker container with a strictly limited blast radius. Anthropic shipped this in March; the command is sbx run claude. Promote when auto-error rate stays under one percent for thirty-plus days."

> "Stage four — Full Auto. The agent fires everything. Alerts you on exceptions. You audit weekly. Guardrails: everything from stages one through three, plus A/B replay testing — periodically re-run old inputs and check the agent still produces equivalent outputs — plus drift detection — alert when output distributions shift — plus automatic rollback if quality metrics regress. You only get here when you trust the agent like a senior teammate."

> "Today's discovery engine ships at stage two. That's deliberate. You earn each stage through the audit log over weeks of real data — never skip ahead. The cost of skipping is a real-world pattern: agents with stage-four-level access deployed on a stage-one track record produce the failures you read about in the trade press."

**Bridge:** "Real proof that the trust ladder works at scale — Bain shipped a customer-facing agent on this exact pattern."

---

## Slide 40 — Bain Shadow Testing Case

⏱ ~60 seconds.

**Stage:** Two cards.

**Say:**
> "April 29th. Last week. AI Dev. Bain HR Services presented their production payroll agent. I was in the room."

> "Context — eight LangGraph subgraphs handling more than a million emails a year. Customer-facing, autonomous. Three thousand-plus live shadow emails as part of their validation."

> "Numbers — they started at seventy percent real-world accuracy. Real-world traffic, not test data. After six months of shadow testing, ninety-eight percent."

> "The quote that stuck with me — 'The secret to successful agents in Enterprise is not the agents — it's the scaffolding around the agents.' Sanjin Bicanic, Bain & Co."

> "Same lesson at startup scale. The agent is twenty percent. Your dedup, HITL gate, voice file, audit log — that's the eighty percent. That's why we spent two-thirds of the build time on plumbing, not prompting."

**Bridge:** "Two minutes left. Five things to remember when you walk out."

---

# PART 7 · CLOSE (58:00 – 60:00)

## Slide 41 — Recap · 5 things to remember

⏱ ~60 seconds. Calm. Let the slide do the work. This is the slide they'll photograph.

**Stage:** Stand still. Eye contact. Don't rush.

**Say:**
> "Five things to remember when you walk out. If you take even two of these and apply them, this hour was worth your time."

> "One — the REACT loop. Reason, Action, Observation, loop. Every agent in the world runs this loop. When you debug an agent, one of those three is broken. Memorize the loop, not the framework."

> "Two — config-as-files. Not config-as-prompts. Your voice, your ICP, your schemas, your exclusion lists live as files in Drive or cells in a Sheet. Edit the file, the next run inherits. No redeploys. The single most important pattern in this hour."

> "Three — cascade your models. Haiku for the cheap classification, Sonnet for the one step that needs voice nuance. Sixty to seventy percent off your bill, no quality loss. Free path is the same idea — Llama 3.1 8B Instant for cheap, Llama 4 Scout for the heavy work."

> "Four — human in the loop, via Gmail drafts. The agent drafts. You send. About ten seconds per draft. About ten hours a week back. Brand voice protected. Stage two of the trust ladder is the default — you earn higher autonomy through the audit log over weeks of real data."

> "Five — same architecture, seven other agents. Inbound triage. Competitor pulse. Support draft. Content repurposer. Call notes to CRM. Investor update. Onboarding personalizer. Different trigger, different search, different output. Same six pieces. Once you've built one, you've built five."

> "Take a photo. The whole talk fits on one screen now."

**Bridge:** "Two ways to keep going · both free."

---

## Slide 42 — CTAs

⏱ ~75 seconds.

**Stage:** Two boxes. QR codes visible.

**Say:**
> "Two QR codes on the slide. Both are free for everyone in this room."

> "Left — Architect's Office Hours. I'm running five free thirty-minute audits for BSW attendees this month. First-come, first-booked. You bring your bottleneck. I'll tell you what to automate, what to leave alone, and which three tools to use. The QR is a Cal link."

> "Right — the Agentic Architect Blog. agenticarchitect.ai/blog. Weekly deep-dives on agentic architecture for lean founders. n8n templates, cost teardowns, what's working in 2026. Free. Yes, I will write about whatever questions you DM me from this workshop."

> "And — the repo. github.com/sudosoph/bsw-growth-agent. MIT licensed. Fork it. Ship yours. The whole thing we built today is sitting there."

**Bridge:** "Last slide."

---

## Slide 43 — Close

⏱ ~30 seconds.

**Stage:** Stand still. Eye contact.

**Say:**
> "Bring an agent next month. Boulder is the lean-founder agentic capital, and you're already here. AI Tinkerers Denver. Boulder AI Builders. Rocky Mountain AI Interest Group. Silicon Flatirons up at CU. Five meetups in driving distance every month."

> "Pick one. Bring an agent. Show what you built. We'll all be better for it."

> "Thanks for the hour."

[Pause for applause. Stay at the front for five to ten minutes for in-person questions. The QR codes from slide 49 stay reachable during Q&A.]

---

# APPENDIX A · COMMON Q&A WITH DRAFTED ANSWERS

If you have time after the talk, here are the questions you'll get most often. Short drafted answers below.

**Q: "I don't have an Anthropic account / Gmail isn't my email — does this still work?"**
A: Yes. The Anthropic node in n8n can be swapped for OpenAI, Gemini, or any open-source model running on Ollama. The Gmail node can be swapped for any IMAP / SMTP provider. The architecture is provider-agnostic — that's why we picked n8n.

**Q: "How do I write a good voice.md?"**
A: Start with five emails you've actually sent that you're proud of. Paste them in. Then write the rules — words you use, words you don't, structure, tone. Iterate as the agent drafts more. The discipline is five examples minimum. More is better.

**Q: "Will Anthropic deprecate my model?"**
A: Yes, eventually. Sonnet 3.5 was deprecated last fall. Plan for migration paths — that's why we used the explicit model strings claude-haiku-4-5 and claude-sonnet-4-6 instead of aliases. When Sonnet 5 lands, you change one string and rerun.

**Q: "Can the agent fully send without HITL eventually?"**
A: Yes. Stage 3 — conditional auto — and stage 4 — full auto — of the trust ladder allow auto-send. You get there by EARNING it through the audit log over weeks of real data. Don't skip stages.

**Q: "What about the MCP RCE flaw you mentioned?"**
A: Real concern. Use only MCP servers from the official registry at registry.modelcontextprotocol.io. Don't run random GitHub MCP servers from strangers. Sanitize inputs. Apply principle of least privilege to credentials. The dangerous combination is: privileged token plus untrusted input plus external comms channel.

**Q: "I'm not technical — can I really build this?"**
A: Yes if you can configure a Google Sheet. n8n is visual — drag-and-drop. The hardest part is writing voice.md — that's a writing task, not a coding task. The Office Hours offer is exactly for this scenario.

**Q: "Why not use Lindy / Gumloop / Zapier Agents instead of n8n?"**
A: Those are good. The reason I default to n8n: it's open-source, has a code escape hatch when you need it, and the patterns we built today translate directly to LangGraph and Mastra and Pydantic AI when you graduate. Lindy and Gumloop are great for non-technical founders specifically — if that's you, start there. The architecture lessons are the same regardless of which runtime you pick.

**Q: "Can I run this on a $5 VPS?"**
A: Yes. Hetzner CX22 or DigitalOcean basic. n8n self-hosted on Docker fits in 1 GB of RAM with the workflows we built. The bottleneck if you self-host Firecrawl is the headless browser — give it 4 GB plus.

**Q: "How do I learn LangGraph / CrewAI / Pydantic AI?"**
A: Once you've shipped this n8n flow and feel the friction of the visual layer, that's when you graduate. The patterns we drilled today — cascade, config-as-files, sub-agent decomposition, HITL — all map directly. Don't learn frameworks until you've shipped one agent in n8n. Order matters.

**Q: "How do I find the right email address for a prospect after the agent finds them on Reddit?"**
A: Today's demo doesn't do email resolution — the placeholder address is intentional. To productionize, add an Apollo or Hunter API node between the dedup step and the drafting step. They cost about a tenth of a cent per email lookup. Worth covering in office hours if you want to wire this up properly.

**Q: "What if I want to swap Gmail for Outlook or Front?"**
A: n8n has built-in nodes for both. The HITL pattern is the same — createDraft instead of send.

---

# APPENDIX B · DAY-OF LOGISTICS

**60 min before doors:**
- Arrive at RegenHub. Find the AV tech, plug in. Test screen mirroring.
- Open `/home/sophia-stein/bsw/slides/index.html` in Chrome. Press F to fullscreen, advance through five slides to verify rendering.
- Run the n8n workflow ONCE manually to verify Anthropic + Firecrawl + Sheets all work.
- Have the backup MP4 on the desktop in case Wi-Fi tanks.

**10 min before doors:**
- Open all tabs in this exact order: Cmd+1 slides, Cmd+2 n8n, Cmd+3 Gmail, Cmd+4 Drive, Cmd+5 Sheets.
- Phone on Do Not Disturb.
- Water bottle visible.

**2 min before doors:**
- Set the manual trigger to fire RIGHT NOW. The cron should fire 60-90 seconds before the talk starts, so the demo is mid-flight when you advance to slide 3.

**During the talk:**
- Stand. Don't sit at the laptop.
- Look at faces, not the laptop, except during live build (~25 min).
- For the worksheet (slide 19), walk to the back of the room. Do not speak for 90 seconds.
- For the demo cut (slide 3), narrate the trace from the run history — don't try to live-run.

**After the talk:**
- Stick around for Q&A. The QR codes should still be active.
- Take 2-3 photos of the Sheets("Runs") log filled with workshop-day data — that's case study evidence for next week's blog post.
- Tweet the GitHub repo link with workshop hashtag.

---

End of speaker script.
