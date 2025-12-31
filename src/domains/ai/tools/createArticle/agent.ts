import { tool, generateObject } from "ai"
import { z } from "zod"
import path from "path"

import { loadHandlebarsTemplate } from "@/domains/ai/utils/handlebars"
import { MODELS } from "@/domains/ai/clients/openai"
import { createArticle, AVAILABLE_CATEGORIES } from "./service"
import {
  zCreateArticleToolParams,
  type CreateArticleToolParams,
  type CreateArticleToolResult,
} from "@/types/ai"

// Load templates
const descriptionTemplate = loadHandlebarsTemplate<Record<string, never>>(
  path.join(process.cwd(), "src/domains/ai/tools/createArticle/prompts/description.hbs")
)
const systemTemplate = loadHandlebarsTemplate<{ categories: string[] }>(
  path.join(process.cwd(), "src/domains/ai/tools/createArticle/prompts/system.hbs")
)

// Schema for LLM enhancement suggestions
const zEnhancementResult = z.object({
  isValid: z.boolean(),
  suggestedExcerpt: z.string().optional(),
  suggestedTags: z.array(z.string()).optional(),
  issues: z.array(z.string()),
  reasoning: z.string(),
})

interface CreateArticleToolOptions {
  traceId?: string
  userId?: string
}

export const createArticleTool = ({
  traceId,
  userId,
}: CreateArticleToolOptions = {}) =>
  tool({
    description: descriptionTemplate({}),
    parameters: zCreateArticleToolParams,

    execute: async ({ title, content, excerpt, category, tags, status }): Promise<CreateArticleToolResult> => {
      // 1. Create system prompt with available categories
      const systemPrompt = systemTemplate({ categories: AVAILABLE_CATEGORIES })

      // 2. Use LLM to validate and enhance the article
      const { object: enhancement } = await generateObject({
        model: MODELS.TOOL_EXECUTION,
        system: systemPrompt,
        schema: zEnhancementResult,
        messages: [
          {
            role: "user",
            content: `Validate and enhance this article:
Title: ${title}
Category: ${category}
Tags: ${tags?.join(", ") || "none"}
Excerpt: ${excerpt || "not provided"}

Content:
${content}`,
          },
        ],
        experimental_telemetry: {
          isEnabled: true,
          functionId: "blog-conversation:create-article",
          metadata: { traceId },
        },
      })

      // 3. If invalid, return error
      if (!enhancement.isValid) {
        return {
          success: false,
          error: `Article validation failed: ${enhancement.issues.join("; ")}`,
          reasoning: enhancement.reasoning,
        }
      }

      // 4. Apply enhancements and create article
      const result = await createArticle({
        title,
        content,
        excerpt:
          excerpt ||
          enhancement.suggestedExcerpt ||
          content.slice(0, 197) + "...",
        category,
        tags: tags?.length ? tags : enhancement.suggestedTags || [],
        status,
        author: userId || "anonymous",
      })

      return {
        success: result.success,
        article: result.article,
        error: result.error,
        reasoning: enhancement.reasoning,
      }
    },
  })
