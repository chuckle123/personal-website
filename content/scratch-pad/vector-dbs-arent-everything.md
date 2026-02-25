---
title: "Vector DBs aren't the answer to everything"
date: "2026-02-19"
---

My second architecture for entity resolution was vector search. I had 1,000+ companies, 800+ protocols, 10,000+ assets, 50+ chains, 10 market sectors to search across. Embeddings felt obvious. Semantic similarity should handle fuzzy lookups.

It fell apart on short strings.

Crypto tickers are three letters. "ETH." "SOL." "UNI." There's almost no semantic content for an embedding model to work with. The vectors land too close together and your similarity scores stop meaning anything. I was getting wrong matches on the exact queries that mattered most.

I ended up on SQLite with FTS5. Full-text search with stemming handled the structured, short-form lookups cleanly. "Lending" matched "lend," "lender," "lending" without embedding overhead. For precise lookups on tickers, project names, and metric identifiers, it just worked.

But I don't think the takeaway is "never use vector search." The real answer for most systems is probably hybrid.

Vector search is strong when you have rich, descriptive text. Long product descriptions, documentation, methodology explanations. Places where meaning lives in the full passage, not in three characters. FTS is better for short, structured lookups where you need exact or near-exact matches.

A scoring layer on top of both gives you the best of each. Run vector similarity and FTS in parallel, weight the results based on query shape.

I didn't need the vector side because my data was almost entirely short structured strings. But if I had a mix of tickers and natural language descriptions in the same search path, the hybrid approach with weighted scoring would have been the move.

Vector DBs are a tool, not a strategy. Match the search method to the shape of your data.
