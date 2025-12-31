import type { Article, CreateArticleToolParams } from "@/types/ai"
import { randomUUID } from "crypto"

// Available categories - in production, fetch from database
export const AVAILABLE_CATEGORIES = [
  "Technology",
  "Design",
  "Business",
  "Marketing",
  "Lifestyle",
]

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function createArticle(
  params: CreateArticleToolParams & { author: string }
): Promise<{ success: boolean; article?: Article; error?: string }> {
  // Validate category
  if (!AVAILABLE_CATEGORIES.includes(params.category)) {
    return {
      success: false,
      error: `Invalid category "${params.category}". Available: ${AVAILABLE_CATEGORIES.join(", ")}`,
    }
  }

  const now = new Date().toISOString()
  const article: Article = {
    id: randomUUID(),
    title: params.title,
    slug: generateSlug(params.title),
    content: params.content,
    excerpt: params.excerpt || params.content.slice(0, 197) + "...",
    author: params.author,
    category: params.category,
    tags: params.tags || [],
    status: params.status || "draft",
    publishedAt: params.status === "published" ? now : null,
    createdAt: now,
    updatedAt: now,
  }

  // In production, save to database here
  console.log("Created article:", article)

  return { success: true, article }
}
