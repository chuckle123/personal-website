import { createOpenAI } from "@ai-sdk/openai"

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Model aliases for different use cases
export const MODELS = {
  CONVERSATION: openai("gpt-4o"), // Main orchestration
  TOOL_EXECUTION: openai("gpt-4o-mini"), // Fast tool reasoning
} as const
