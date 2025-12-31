import { z } from "zod"

// ============== Content/Page Entity ==============

export const zContent = z.object({
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

export type Content = z.infer<typeof zContent>

// ============== List Content Tool ==============

export const zListContentToolParams = z.object({
  query: z.string().describe("Search query to find content"),
  status: z.enum(["draft", "published", "archived", "all"]).default("all"),
  category: z.string().nullable().default(null),
  limit: z.number().min(1).max(50).default(10),
})

export type ListContentToolParams = z.infer<typeof zListContentToolParams>

export const zListContentToolResult = z.object({
  pages: z.array(
    zContent.pick({
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      status: true,
      updatedAt: true,
    })
  ),
  totalCount: z.number(),
})

export type ListContentToolResult = z.infer<typeof zListContentToolResult>

// ============== View Content Tool ==============

export const zViewContentToolParams = z.object({
  id: z.string().describe("The ID of the content to view"),
})

export type ViewContentToolParams = z.infer<typeof zViewContentToolParams>

export const zViewContentToolResult = z.object({
  found: z.boolean(),
  page: zContent.nullable(),
})

export type ViewContentToolResult = z.infer<typeof zViewContentToolResult>

// ============== Upsert Content Tool ==============

export const zUpsertContentToolParams = z.object({
  id: z.string().nullable().default(null).describe("The ID of existing content to update, or null to create new"),
  title: z.string().min(1).describe("The page title"),
  slug: z.string().min(1).describe("URL slug for the page"),
  content: z.string().min(1).describe("The page content in markdown"),
  excerpt: z.string().describe("A short summary of the page"),
  category: z.string().describe("The page category"),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
})

export type UpsertContentToolParams = z.infer<typeof zUpsertContentToolParams>

export const zUpsertContentToolResult = z.object({
  success: z.boolean(),
  page: zContent.nullable(),
  error: z.string().nullable(),
  created: z.boolean().describe("True if new page was created, false if existing was updated"),
})

export type UpsertContentToolResult = z.infer<typeof zUpsertContentToolResult>
