---
title: "Start agent observability in dev, not prod"
date: "2026-02-25"
---

I spent months building an MCP server that queries financial data across 10s of thousands of entities. Four completely different architectures. Each one needed to be measurably better than the last.

You can't easily console.log your way through LLM development. The output isn't deterministic. The same prompt gives different results. The same query can cost wildly different token counts depending on how the model reasons through it. Traditional logging doesn't cut it.

I set up Langfuse early. Not because I was thinking about production monitoring. I was just tired of guessing. I wanted to see exactly what each call cost, how long it took, and whether the model found the right answer. When I dropped from 17,000 tokens per call to ~200, that wasn't something I eyeballed from terminal output. I watched the cost curve fall off a cliff in real traces, version over version.

When I moved from vector search (v2) to a file sandbox (v3) to SQLite with FTS5 (v4), every architecture swap showed up clearly in the traces. Latency, cost, accuracy. Side by side. No custom dashboards. No grep-ing through logs. Just structured traces that told the story. Simply input-output LLM requests can be logged, sure. But, when you have a sandbox agent doing a multi-step workflow with decision logic between, you need something more robust even when testing.

Here's what I think most teams miss: you need this infrastructure in production anyway. Cost tracking per call. Latency percentiles. Error rates. Trace visualization for debugging weird model behavior. Every team building with LLMs eventually builds or buys this.

So starting in development isn't extra work. It's the same work, done earlier. By the time you ship, your observability is already tested because you've been living in it through every iteration.

For traditional software, treating observability as a production concern is fine. For anything involving models, you're flying blind without it. The feedback loops are too unpredictable and the costs are too real to just hope for the best.

Set it up on day one. Future you will appreciate it.
