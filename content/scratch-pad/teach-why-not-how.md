---
title: "Teach models why, not how"
date: "2026-02-22"
---

I tried writing rules for my MCP server's prompts. "If the user mentions a token name, search the assets table first." "If the query includes a chain name, filter by chain before searching projects."

It worked until someone asked something I hadn't thought of. Then it broke.

Rule-based prompts are brittle because you're encoding your own decision tree into the instructions. Every edge case needs another rule. Every new pattern needs another branch. You end up maintaining a growing list of if/then logic that the model follows without understanding any of it. And boom we are writing code all over again...

What worked was explaining the domain.

Instead of "search assets first when you see a token name," I wrote something closer to: "A token can appear as both a product (business product offering) and an asset (the tradeable token). These are separate entities with different available metrics, usage and TVL describes products, price and market cap describe assets."

That's not a rule. That's context. The model understands why the distinction exists, so it handles queries I never coded for. When someone asks "How is DAI's lending doing?" the model looks at DAI as a product (the lending protocol feature) rather than as an asset (the token), because lending metrics live on products. I never wrote a rule for that. The model worked it out from understanding the domain.

This also made prompts easier to maintain. When new entity types or metrics were added to the system, I updated the domain and taxonomy explanation. Not a rule set. The model generalized from the updated context without new conditional logic.

I think this applies beyond MCP servers. Anytime you're prompting a model for a specialized domain, explain the reasoning behind distinctions. Don't list rules. Models reason well from principles. They lose the thread when they're 40 branches deep in a decision tree you wrote.
