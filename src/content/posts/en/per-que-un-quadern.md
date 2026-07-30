---
title: "Why a notebook"
subtitle: "Notes in the margin of work that moves too fast"
description: "I'm opening a notebook to write down the decisions that normally stay in my head. What goes in it, why there's no schedule, and why in three languages."
date: 2026-07-29
tags: ["meta", "writing", "engineering"]
---

Every project I finish leaves a residue that ends up nowhere. Not the code —
that survives, with a history attached — but the layer underneath it: why we
picked this database and not the other one, what we assumed without
measuring, which decision from six months ago cost us a week just now. That
layer lives in my head, and my head is a terrible storage medium.

This notebook is an attempt to write it down.

:::marge
The idea isn't new — it's the old engineering notebook. What I'm adding is
taking the calendar off its back, which for me is what makes it survive.
:::

## No schedule

Writing to a schedule would go badly for me. I've tried, and the predictable
outcome is half-finished notes published to keep a streak alive. So there's
no cadence here: the unit isn't the week or the month, it's the **issue**.
Numbered and dated, like a small magazine that comes out when it has
something to say.

One month there may be three; the next, none at all. That isn't neglect —
it's the condition. What decides that an issue ships isn't the date, it's
that the idea held up. What looks brilliant on a Thursday at eleven at night
often doesn't survive three weeks, and it's better to find that out before
publishing than after.

:::destacat
Publishing to a calendar ends up as filling pages. An issue ships once the
idea has survived the cooling, and not before.
:::

## What it's about

Things I've touched with my hands. The short list:

- **Applied AI, for real.** Not what a model does in a demo, but what breaks
  when the corpus grows, when the user types badly, or when the invoice
  arrives at the end of the month.
- **Systems and infrastructure.** Self-hosted servers, containers, domains,
  certificates. Boring until they fall over.
- **Decisions and what they cost.** This is the one I care about most. Every
  technical decision is a bet with an expiry date, and we almost never write
  down how it turned out.

What won't be here: tutorials for things I've never used, and opinions about
technologies I've only read about.

:::nota[About the examples]
When there's code, it'll be code that actually ran, patches and all. A
snippet that only works inside the article teaches nothing.
:::

## How this is built

The site is static: Markdown compiled to HTML, and that's all. No database,
no live process, no third-party services. A container with an nginx inside,
same as everything else I serve.

```bash
# A new issue is a file. Publishing it is a commit.
vim src/content/posts/en/my-issue.md
npm run build
git commit -am "No. 02"
```

I mention it because it's consistent with what I plan to write: if I argue
for deciding deliberately, it's worth showing the decisions made here. The
most debatable one is about languages.

## Three languages, no promises

The notebook is set up in Catalan, Spanish and English, but **each issue
decides where it exists**. Translating everything would triple the part of
the work that gives me the least, and the predictable outcome is that I stop
writing.

So the rule is this: I write in whichever language fits the topic, and I
translate what I think is worth translating. If you land on an issue that
isn't in your language, the switcher at the top will take you to the front
page instead of leaving you at a dead end.

---

This is issue 01. If you want the next ones, there's [a feed](/en/rss.xml);
if you want to argue about any of them,
[write to me](mailto:victor@victormartinc.com). Both work better than a
comment form.
