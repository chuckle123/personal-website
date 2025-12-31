"use client"

import { useChat } from "@ai-sdk/react"
import { FormEvent, useMemo } from "react"

// Create transport for the chat API
class ChatTransport {
  private api: string

  constructor(api: string) {
    this.api = api
  }

  async submitMessages(options: {
    chatId: string
    messages: Array<{ role: string; content: string }>
    abortSignal?: AbortSignal
  }) {
    const response = await fetch(this.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: options.messages, id: options.chatId }),
      signal: options.abortSignal,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  }
}

export default function ChatPage() {
  const transport = useMemo(() => new ChatTransport("/api/chat"), [])

  const { messages, input, setInput, handleSubmit, status, stop } = useChat({
    transport,
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  const isLoading = status === "streaming" || status === "submitted"

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Management Assistant</h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center mt-8">
            <p>Welcome! I can help you manage your blog.</p>
            <p className="text-sm mt-2">
              Try asking me to find articles or create new ones.
            </p>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="text-gray-500 animate-pulse">Thinking...</div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your blog..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={!input.trim()}
          >
            Send
          </button>
        )}
      </form>
    </div>
  )
}

// Message component with part rendering
function MessageBubble({
  message,
}: {
  message: { id: string; role: string; parts?: Array<{ type: string; text?: string; toolInvocation?: unknown }> }
}) {
  const isUser = message.role === "user"

  // Get text content from parts
  const textContent = message.parts
    ?.filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("") || ""

  // Get tool invocations from parts
  const toolInvocations = message.parts?.filter((part) => part.type === "tool-invocation") || []

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Main content */}
        {textContent && (
          <div className="whitespace-pre-wrap">{textContent}</div>
        )}

        {/* Tool invocations */}
        {toolInvocations.length > 0 && (
          <div className="mt-2 space-y-2">
            {toolInvocations.map((part, index) => {
              const tool = part.toolInvocation as {
                toolName: string
                args: unknown
                state: string
                result?: unknown
              }
              if (!tool) return null
              return (
                <div
                  key={index}
                  className="p-2 bg-white/10 rounded text-sm border border-gray-200"
                >
                  <div className="font-medium">Tool: {tool.toolName}</div>
                  <details className="mt-1">
                    <summary className="cursor-pointer text-xs opacity-70">
                      Input
                    </summary>
                    <pre className="mt-1 text-xs overflow-x-auto bg-gray-50 p-2 rounded">
                      {JSON.stringify(tool.args, null, 2)}
                    </pre>
                  </details>
                  {tool.state === "result" && tool.result && (
                    <details className="mt-1">
                      <summary className="cursor-pointer text-xs opacity-70">
                        Result
                      </summary>
                      <pre className="mt-1 text-xs overflow-x-auto bg-gray-50 p-2 rounded">
                        {JSON.stringify(tool.result, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
