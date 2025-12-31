import { streamText, UIMessage } from "ai"
import path from "path"

import { loadHandlebarsTemplate } from "@/domains/ai/utils/handlebars"
import { MODELS } from "@/domains/ai/clients/openai"
import { listArticlesTool, createArticleTool } from "@/domains/ai/tools"

// Load system prompt template
const systemTemplate = loadHandlebarsTemplate<Record<string, never>>(
  path.join(process.cwd(), "src/domains/ai/agents/blog-conversation/prompts/system.hbs")
)

interface BlogConversationAgentParams {
  messages: UIMessage[]
  traceId?: string
  userId?: string
}

export function blogConversationAgent({
  messages,
  traceId,
  userId,
}: BlogConversationAgentParams) {
  const systemPrompt = systemTemplate({})

  return streamText({
    model: MODELS.CONVERSATION,
    system: systemPrompt,
    messages,
    tools: {
      listArticlesTool: listArticlesTool({ traceId }),
      createArticleTool: createArticleTool({ traceId, userId }),
    },
    // Allow up to 5 tool-calling steps before stopping
    maxSteps: 5,
    // Telemetry for monitoring
    experimental_telemetry: {
      isEnabled: true,
      functionId: "blog-conversation-agent",
      metadata: { traceId, userId },
    },
  })
}
