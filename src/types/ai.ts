import { z } from "zod"

// ============== Article Entity ==============

export const zArticle = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  author: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  status: z.enum(["draft", "published", "archived"]),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Article = z.infer<typeof zArticle>

// ============== List Articles Tool ==============

export const zListArticlesToolParams = z.object({
  context: z.string().describe("The user context for filtering articles"),
  status: z.enum(["draft", "published", "archived", "all"]).optional(),
  category: z.string().optional(),
  limit: z.number().min(1).max(50).optional().default(10),
})

export type ListArticlesToolParams = z.infer<typeof zListArticlesToolParams>

export const zListArticlesToolResult = z.object({
  articles: z.array(
    zArticle
      .pick({
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        author: true,
        category: true,
        status: true,
        publishedAt: true,
      })
      .extend({
        reasoning: z.string().describe("Why this article was selected"),
      })
  ),
  totalCount: z.number(),
})

export type ListArticlesToolResult = z.infer<typeof zListArticlesToolResult>

// ============== Create Article Tool ==============

export const zCreateArticleToolParams = z.object({
  title: z.string().min(1).describe("The article title"),
  content: z.string().min(1).describe("The article content in markdown"),
  excerpt: z.string().optional().describe("A short summary of the article"),
  category: z.string().describe("The article category"),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(["draft", "published"]).optional().default("draft"),
})

export type CreateArticleToolParams = z.infer<typeof zCreateArticleToolParams>

export const zCreateArticleToolResult = z.object({
  success: z.boolean(),
  article: zArticle.optional(),
  error: z.string().optional(),
  reasoning: z.string().describe("Explanation of the creation process"),
})

export type CreateArticleToolResult = z.infer<typeof zCreateArticleToolResult>
