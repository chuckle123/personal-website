import type { Content, ListContentToolParams, UpsertContentToolParams } from "@/types/ai"
import { put, list, del } from "@vercel/blob"
import { randomUUID } from "crypto"

const BLOB_PREFIX = "content/"
const CONTENT_STORE_KEY = "content/store.json"

// Available categories
export const AVAILABLE_CATEGORIES = [
  "Home",
  "About",
  "Services",
  "Blog",
  "Contact",
  "Portfolio",
]

async function loadFromBlob(): Promise<Map<string, Content> | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX })
    const storeBlob = blobs.find((b) => b.pathname === CONTENT_STORE_KEY)

    if (storeBlob) {
      const response = await fetch(storeBlob.url)
      const data = await response.json() as Record<string, Content>
      console.log("[contentService] Loaded", Object.keys(data).length, "items from blob storage")
      return new Map(Object.entries(data))
    }
  } catch (error) {
    console.error("[contentService] Error loading from blob:", error)
  }
  return null
}

async function saveToBlob(store: Map<string, Content>): Promise<void> {
  const data = Object.fromEntries(store)

  try {
    // Delete old blob first (Vercel Blob doesn't support overwrite directly)
    const { blobs } = await list({ prefix: BLOB_PREFIX })
    const storeBlob = blobs.find((b) => b.pathname === CONTENT_STORE_KEY)
    if (storeBlob) {
      await del(storeBlob.url)
    }

    // Save new blob
    await put(CONTENT_STORE_KEY, JSON.stringify(data, null, 2), {
      access: "public",
      contentType: "application/json",
    })
    console.log("[contentService] Saved", store.size, "items to blob storage")
  } catch (error) {
    console.error("[contentService] Error saving to blob:", error)
    throw error
  }
}

function createSeedData(): Map<string, Content> {
  const store = new Map<string, Content>()
  const now = new Date().toISOString()

  const examples: Omit<Content, "id" | "createdAt" | "updatedAt">[] = [
    {
      title: "Home",
      slug: "home",
      content: "# Welcome to Our Website\n\nThis is the home page content.",
      excerpt: "Welcome to our website",
      author: "system",
      category: "Home",
      tags: ["homepage", "welcome"],
      status: "published",
      publishedAt: now,
    },
    {
      title: "About Us",
      slug: "about",
      content: "# About Us\n\nLearn more about our company and mission.",
      excerpt: "Learn about our company",
      author: "system",
      category: "About",
      tags: ["about", "company"],
      status: "published",
      publishedAt: now,
    },
  ]

  examples.forEach((page) => {
    const id = randomUUID()
    store.set(id, {
      ...page,
      id,
      createdAt: now,
      updatedAt: now,
    })
  })

  return store
}

async function getContentStore(): Promise<Map<string, Content>> {
  // Always read fresh from blob to avoid stale data across processes
  const store = await loadFromBlob()

  if (store) {
    return store
  }

  // Initialize with seed data if no store exists
  console.log("[contentService] No blob store found, initializing with seed data")
  const seedStore = createSeedData()
  await saveToBlob(seedStore)
  return seedStore
}

export async function listContent(
  params: ListContentToolParams
): Promise<{ pages: Content[]; totalCount: number }> {
  const store = await getContentStore()
  const allContent = Array.from(store.values())

  let filtered = allContent

  // Filter by status
  if (params.status && params.status !== "all") {
    filtered = filtered.filter((c) => c.status === params.status)
  }

  // Filter by category
  if (params.category) {
    filtered = filtered.filter((c) => c.category === params.category)
  }

  // Simple text search in title and content
  if (params.query) {
    const query = params.query.toLowerCase()
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.content.toLowerCase().includes(query) ||
        c.excerpt.toLowerCase().includes(query)
    )
  }

  // Sort by updatedAt descending
  filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  // Apply limit
  const limited = filtered.slice(0, params.limit)

  return {
    pages: limited,
    totalCount: filtered.length,
  }
}

export async function viewContent(id: string): Promise<Content | null> {
  const store = await getContentStore()
  return store.get(id) || null
}

export async function getContentBySlug(slug: string): Promise<Content | null> {
  const store = await getContentStore()
  const allContent = Array.from(store.values())
  console.log("[contentService] getContentBySlug:", slug)
  console.log("[contentService] Available slugs:", allContent.map((c) => `${c.slug} (${c.status})`))
  const found = allContent.find((c) => c.slug === slug && c.status === "published") || null
  console.log("[contentService] Found:", found ? found.title : "null")
  return found
}

export async function upsertContent(
  params: UpsertContentToolParams & { author: string }
): Promise<{ success: boolean; page: Content | null; error: string | null; created: boolean }> {
  // Validate category
  if (!AVAILABLE_CATEGORIES.includes(params.category)) {
    return {
      success: false,
      page: null,
      error: `Invalid category "${params.category}". Available: ${AVAILABLE_CATEGORIES.join(", ")}`,
      created: false,
    }
  }

  const store = await getContentStore()
  const now = new Date().toISOString()
  let created = false
  let page: Content

  if (params.id && store.has(params.id)) {
    // Update existing
    const existing = store.get(params.id)!
    page = {
      ...existing,
      title: params.title,
      slug: params.slug,
      content: params.content,
      excerpt: params.excerpt,
      category: params.category,
      tags: params.tags,
      status: params.status,
      publishedAt: params.status === "published" && !existing.publishedAt ? now : existing.publishedAt,
      updatedAt: now,
    }
  } else {
    // Create new
    created = true
    page = {
      id: params.id || randomUUID(),
      title: params.title,
      slug: params.slug,
      content: params.content,
      excerpt: params.excerpt,
      author: params.author,
      category: params.category,
      tags: params.tags,
      status: params.status,
      publishedAt: params.status === "published" ? now : null,
      createdAt: now,
      updatedAt: now,
    }
  }

  store.set(page.id, page)
  await saveToBlob(store)
  console.log(`[contentService] ${created ? "Created" : "Updated"} page:`, page.id, page.title, `(${page.status})`)

  return { success: true, page, error: null, created }
}
