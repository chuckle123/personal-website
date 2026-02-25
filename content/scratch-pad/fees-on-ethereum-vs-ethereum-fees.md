---
title: "\"Fees on Ethereum\" is not the same as \"Ethereum Fees\", but how do you convey this to an MCP client"
date: "2026-02-22"
---

"What are fees on Ethereum?"

"What are Ethereum's fees?"

These sound like the same question. They're not even close.

"Ethereum fees" means how much revenue the Ethereum protocol itself generated. Gas fees paid to validators. A question about Ethereum as a business.

"Fees on Ethereum" means how much fee activity happened across applications deployed on the Ethereum network. Uniswap, Aave, Lido, all of them. A question about the ecosystem on top of Ethereum.

I hit this building an MCP server for Token Terminal, where AI queries financial data across 10s of thousands of crypto entities. Early versions returned the same results for both queries. Both contain "Ethereum" and "fees," so the system treated them the same. That's a real problem when your customers are making billions of dollars in financial decisions on the response.

This is entity ambiguity and intent ambiguity stacked on each other. "Ethereum" is both a protocol (the chain itself) and a platform (the ecosystem). "Fees" is both a metric for a single project and an aggregate across a chain. Six words, four possible interpretations.

It gets worse. "USDC" is simultaneously a project (Circle), a product (the stablecoin), and an asset (the token). Each has different metrics. "How is USDC doing?" could mean market cap, supply growth, holder count, or trading volume depending on which entity type you're actually asking about.

I solved this with an explicit disambiguation layer. A sandboxed agent queries a SQLite database with structured taxonomies and interconnected relationships. This sandboxed agent represented a single tool call to the MCP client, instead of putting the onus of knowing this disambiguation logic (a lot of context) on the MCP client, we handled this as a sub-agent tool call where we could control the system prompt and underlying model. MCP clients can be a 1 year old model lacking any of the deep training and knowledge of a frontier model. This sub-agent MCP tool architecture allowed us to return consistent results no matter the client.

Of course Skills might also be a solution to this knowledge sharing, but do people really trust skills yet?
