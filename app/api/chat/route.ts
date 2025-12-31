import { blogConversationAgent } from "@/domains/ai/agents/blog-conversation"
import { UIMessage } from "ai"
import { headers } from "next/headers"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
  try {
    const { messages, id }: { messages: UIMessage[]; id?: string } =
      await req.json()

    // Generate trace ID for telemetry
    const traceId = id || randomUUID()

    // Get user ID from auth (implement your auth logic)
    const headersList = await headers()
    const userId = headersList.get("x-user-id") || "anonymous"

    // Create streaming response
    const result = blogConversationAgent({
      messages,
      traceId,
      userId,
    })

    // Return streaming response
    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Disable body parsing for streaming
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
