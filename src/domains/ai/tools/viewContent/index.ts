import { tool } from "ai"
import { viewContent } from "../contentService"
import {
  zViewContentToolParams,
  type ViewContentToolParams,
  type ViewContentToolResult,
} from "@/types/ai"

const DESCRIPTION = `View the full content of a specific page. Use this tool when you need to:
- Read the current content of a page before editing
- See the full markdown content
- Check what's currently on a page

Always use this before editing a page to understand its current state.`

export const viewContentTool = () =>
  tool({
    description: DESCRIPTION,
    inputSchema: zViewContentToolParams,

    execute: async (params: ViewContentToolParams): Promise<ViewContentToolResult> => {
      console.log("[viewContentTool] Viewing content", params.id)

      const page = await viewContent(params.id)

      if (page) {
        console.log("[viewContentTool] Found page:", page.title)
      } else {
        console.log("[viewContentTool] Page not found")
      }

      return {
        found: !!page,
        page,
      }
    },
  })
