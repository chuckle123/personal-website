import { tool, generateObject } from "ai"
import { z } from "zod"
import path from "path"

import { loadHandlebarsTemplate } from "@/domains/ai/utils/handlebars"
import { MODELS } from "@/domains/ai/clients/openai"
import { listArticles } from "./service"
import {
  zListArticlesToolParams,
  type ListArticlesToolParams,
  type ListArticlesToolResult,
} from "@/types/ai"

// Load templates
const descriptionTemplate = loadHandlebarsTemplate<Record<string, never>>(
  path.join(process.cwd(), "src/domains/ai/tools/listArticles/prompts/description.hbs")
)
const systemTemplate = loadHandlebarsTemplate<{ articlesYaml: string }>(
  path.join(process.cwd(), "src/domains/ai/tools/listArticles/prompts/system.hbs")
)

// Output schema for LLM selection
const zArticleSelection = z.array(
  z.object({
    id: z.string(),
    reasoning: z.string().describe("Why this article was selected"),
  })
)

interface ListArticlesToolOptions {
  traceId?: string
}

export const listArticlesTool = ({ traceId }: ListArticlesToolOptions = {}) =>
  tool({
    description: descriptionTemplate({}),
    parameters: zListArticlesToolParams,

    execute: async ({ context, status, category, limit }): Promise<ListArticlesToolResult> => {
      // 1. Fetch articles from database/service
      const { articles, totalCount } = await listArticles({
        status,
        category,
        limit: limit ?? 10,
      })

      if (articles.length === 0) {
        return {
          articles: [],
          totalCount: 0,
        }
      }

      // 2. Format articles for LLM (YAML for better comprehension)
      const articlesYaml = articles
        .map(
          (a) =>
            `- id: "${a.id}"
  title: "${a.title}"
  excerpt: "${a.excerpt}"
  category: "${a.category}"
  tags: [${a.tags.map((t) => `"${t}"`).join(", ")}]
  status: "${a.status}"
  publishedAt: "${a.publishedAt}"`
        )
        .join("\n")

      // 3. Create system prompt with context
      const systemPrompt = systemTemplate({ articlesYaml })

      // 4. Use LLM to filter and rank articles
      const { object: selectedIds } = await generateObject({
        model: MODELS.TOOL_EXECUTION,
        system: systemPrompt,
        schema: zArticleSelection,
        messages: [
          {
            role: "user",
            content: `Find articles matching this request: "${context}"`,
          },
        ],
        experimental_telemetry: {
          isEnabled: true,
          functionId: "blog-conversation:list-articles",
          metadata: { traceId },
        },
      })

      // 5. Map selected IDs back to full article data with reasoning
      const selectedArticles = selectedIds
        .map((selection) => {
          const article = articles.find((a) => a.id === selection.id)
          if (!article) return null
          return {
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            author: article.author,
            category: article.category,
            status: article.status,
            publishedAt: article.publishedAt,
            reasoning: selection.reasoning,
          }
        })
        .filter(Boolean) as ListArticlesToolResult["articles"]

      return {
        articles: selectedArticles,
        totalCount,
      }
    },
  })
