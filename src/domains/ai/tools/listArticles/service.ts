import type { Article } from "@/types/ai"

// Mock data - replace with actual database queries
const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    slug: "getting-started-nextjs-14",
    content: "Full content here...",
    excerpt: "Learn how to build modern web applications with Next.js 14.",
    author: "Jane Doe",
    category: "Technology",
    tags: ["nextjs", "react", "web-development"],
    status: "published",
    publishedAt: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Design Systems: A Complete Guide",
    slug: "design-systems-complete-guide",
    content: "Full content here...",
    excerpt:
      "Everything you need to know about building scalable design systems.",
    author: "John Smith",
    category: "Design",
    tags: ["design-systems", "ui", "ux"],
    status: "published",
    publishedAt: "2024-01-20T14:00:00Z",
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-01-20T14:00:00Z",
  },
  {
    id: "3",
    title: "AI-Powered Content Creation",
    slug: "ai-powered-content-creation",
    content: "Full content here...",
    excerpt: "How artificial intelligence is transforming content creation workflows.",
    author: "Jane Doe",
    category: "Technology",
    tags: ["ai", "content", "automation"],
    status: "published",
    publishedAt: "2024-02-01T09:00:00Z",
    createdAt: "2024-01-28T11:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "4",
    title: "Building a Personal Brand Online",
    slug: "building-personal-brand-online",
    content: "Full content here...",
    excerpt: "Strategies for establishing your professional presence on the web.",
    author: "John Smith",
    category: "Marketing",
    tags: ["branding", "social-media", "career"],
    status: "published",
    publishedAt: "2024-02-10T16:00:00Z",
    createdAt: "2024-02-05T10:00:00Z",
    updatedAt: "2024-02-10T16:00:00Z",
  },
  {
    id: "5",
    title: "Remote Work Best Practices",
    slug: "remote-work-best-practices",
    content: "Full content here...",
    excerpt: "Tips and tools for productive remote work.",
    author: "Jane Doe",
    category: "Lifestyle",
    tags: ["remote-work", "productivity", "work-life-balance"],
    status: "draft",
    publishedAt: null,
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-02-15T08:00:00Z",
  },
]

export interface ListArticlesOptions {
  status?: "draft" | "published" | "archived" | "all"
  category?: string
  limit?: number
}

export async function listArticles(
  options: ListArticlesOptions = {}
): Promise<{
  articles: Article[]
  totalCount: number
}> {
  let filtered = [...MOCK_ARTICLES]

  // Filter by status
  if (options.status && options.status !== "all") {
    filtered = filtered.filter((a) => a.status === options.status)
  }

  // Filter by category
  if (options.category) {
    filtered = filtered.filter(
      (a) => a.category.toLowerCase() === options.category?.toLowerCase()
    )
  }

  const totalCount = filtered.length

  // Apply limit
  if (options.limit) {
    filtered = filtered.slice(0, options.limit)
  }

  return { articles: filtered, totalCount }
}
