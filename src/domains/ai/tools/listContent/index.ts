import { tool } from "ai"
import { listContent } from "../contentService"
import {
  zListContentToolParams,
  type ListContentToolParams,
  type ListContentToolResult,
} from "@/types/ai"

const DESCRIPTION = `List and search website pages/content. Use this tool when the user wants to:
- Find existing pages
- Browse content by category
- Search for specific content
- See what pages exist on the website

Returns a list of matching pages with their basic info.`

export const listContentTool = () =>
  tool({
    description: DESCRIPTION,
    inputSchema: zListContentToolParams,

    execute: async (params: ListContentToolParams): Promise<ListContentToolResult> => {
      console.log("[listContentTool] Searching content", params)

      const { pages, totalCount } = await listContent(params)

      console.log("[listContentTool] Found", pages.length, "pages")

      return {
        pages: pages.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          category: p.category,
          status: p.status,
          updatedAt: p.updatedAt,
        })),
        totalCount,
      }
    },
  })
