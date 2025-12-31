import { blogConversationAgent } from "@/domains/ai/agents/blog-conversation"
import { UIMessage } from "ai"
import { headers } from "next/headers"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
  console.log("[chat/route] POST request received")
  try {
    const { messages, id }: { messages: UIMessage[]; id?: string } =
      await req.json()

    console.log("[chat/route] Messages received:", messages.length)

    // Generate trace ID for telemetry
    const traceId = id || randomUUID()

    // Get user ID from auth (implement your auth logic)
    const headersList = await headers()
    const userId = headersList.get("x-user-id") || "anonymous"

    console.log("[chat/route] Calling blogConversationAgent", { traceId, userId })

    // Create streaming response
    const result = await blogConversationAgent({
      messages,
      traceId,
      userId,
    })

    console.log("[chat/route] Agent completed, returning stream")

    // Return streaming response
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[chat/route] Error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Disable body parsing for streaming
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
