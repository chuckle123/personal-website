import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai"
import path from "path"

import { loadHandlebarsTemplate } from "@/domains/ai/utils/handlebars"
import { MODELS } from "@/domains/ai/clients/openai"
import { listContentTool, viewContentTool, upsertContentTool } from "@/domains/ai/tools"

// Load system prompt template
const systemTemplate = loadHandlebarsTemplate<Record<string, never>>(
  path.join(process.cwd(), "src/domains/ai/agents/blog-conversation/prompts/system.hbs")
)

interface WebsiteBuilderAgentParams {
  messages: UIMessage[]
  traceId?: string
  userId?: string
}

export async function blogConversationAgent({
  messages,
  traceId,
  userId,
}: WebsiteBuilderAgentParams) {
  console.log("[websiteBuilderAgent] Starting", { traceId, userId, messageCount: messages.length })

  const systemPrompt = systemTemplate({})
  const modelMessages = await convertToModelMessages(messages)

  console.log("[websiteBuilderAgent] Converted messages, calling streamText")

  return streamText({
    model: MODELS.CONVERSATION,
    system: systemPrompt,
    messages: modelMessages,
    tools: {
      listContent: listContentTool(),
      viewContent: viewContentTool(),
      upsertContent: upsertContentTool({ userId }),
    },
    // Allow up to 5 tool-calling steps before stopping
    stopWhen: stepCountIs(5),
    // Telemetry for monitoring
    experimental_telemetry: {
      isEnabled: true,
      functionId: "website-builder-agent",
      metadata: { traceId: traceId ?? "", userId: userId ?? "" },
    },
    onStepFinish: (step) => {
      console.log("[websiteBuilderAgent] Step finished", {
        toolCalls: step.toolCalls?.map(tc => tc.toolName),
        finishReason: step.finishReason,
      })
    },
  })
}
