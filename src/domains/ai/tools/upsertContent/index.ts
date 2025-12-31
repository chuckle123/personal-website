import { tool } from "ai"
import { upsertContent, AVAILABLE_CATEGORIES } from "../contentService"
import {
  zUpsertContentToolParams,
  type UpsertContentToolParams,
  type UpsertContentToolResult,
} from "@/types/ai"

const DESCRIPTION = `Create a new page or update an existing page on the website. Use this tool when the user wants to:
- Create a new page
- Edit an existing page
- Update page content

For new pages: set id to null
For existing pages: provide the page id (use viewContent first to read current content)

Available categories: ${AVAILABLE_CATEGORIES.join(", ")}`

interface UpsertContentToolOptions {
  userId?: string
}

export const upsertContentTool = ({ userId }: UpsertContentToolOptions = {}) =>
  tool({
    description: DESCRIPTION,
    inputSchema: zUpsertContentToolParams,

    execute: async (params: UpsertContentToolParams): Promise<UpsertContentToolResult> => {
      console.log("[upsertContentTool] Upserting content", {
        id: params.id,
        title: params.title,
        isNew: !params.id,
      })

      const result = await upsertContent({
        ...params,
        author: userId || "anonymous",
      })

      if (result.success) {
        console.log("[upsertContentTool] Success:", result.created ? "created" : "updated", result.page?.id)
      } else {
        console.log("[upsertContentTool] Failed:", result.error)
      }

      return result
    },
  })
