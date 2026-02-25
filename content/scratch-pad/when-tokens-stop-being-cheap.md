---
title: "When tokens stop being cheap"
date: "2026-02-24"
---

I spent years in delivery logistics. During COVID, GoPuff, DoorDash, Uber Eats, and a wave of others showed up offering low to no fee delivery. As a consumer, it was great. As someone who worked in the space, I watched the whole thing play out in slow motion. VC money subsidized the experience. The market grew. People got hooked. Then the companies had to actually turn a profit. Prices went up. Demand dropped. People started walking to the grocery store again, or doing curbside pickup, which blew up seemingly overnight.

I think we're watching the same pattern with LLMs.

Right now, token prices are subsidized. We're all getting comfortable spinning up multiple agents, running them over long contexts, asking them to do more and more. A friend of mine told me about someone at their company using an LLM to format a file. That's the equivalent of paying for delivery on a bottle of water. It works when delivery is free. It doesn't when someone's paying real money per call.

When token prices rise, and I believe they will once we're all dependent enough, a few things will happen.

The least likely outcome is that we just go back to writing everything by hand. I don't see that happening at scale.

What I do see: companies getting serious about efficiency. Engineers who can distill context, who can build agents that do the job in 200 tokens instead of 17,000, who understand when to use an LLM and when not to. That becomes a real skill, not a nice-to-have.

I also see companies moving away from the big frontier models for a lot of use cases. Fine-tuning smaller models internally. Leveraging open source. Running inference on their own infrastructure. Not because the big models aren't good, but because the math stops working when you're paying premium token prices across every workflow in your org.

Prompt engineering has gotten a bad reputation lately, like it's a temporary hack that better models will make irrelevant. I think the opposite. When you're running a cheaper, less capable model because that's what the budget allows, prompt engineering is how you close the gap. Context engineering, intent engineering, knowing how to get the most out of limited resources. These skills become more valuable, not less.

I don't know the timeline. I'm not predicting next quarter. But the pattern is familiar. Subsidized access creates adoption. Adoption creates dependency. Dependency creates pricing power. And when prices rise, the engineers who built efficient systems from the start will be the ones who aren't scrambling.
