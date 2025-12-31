# Website Builder

A Next.js web application for building and managing website content with AI assistance.

## Features

- **AI-Powered Assistant**: Conversational interface for managing website content
- **Content Management**: Create, search, and organize website content
- **Real-time Streaming**: Live responses from the AI assistant
- **Tool Integration**: AI tools for listing and creating articles

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **AI SDK** - Vercel AI SDK for streaming chat
- **OpenAI** - GPT models for AI assistance

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```
OPENAI_API_KEY=your-api-key-here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
website-builder/
├── app/
│   ├── page.tsx              # Main chat interface
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── chat/
│           └── route.ts      # Chat API endpoint
├── src/
│   ├── domains/
│   │   └── ai/
│   │       ├── agents/       # AI conversation agents
│   │       ├── tools/        # AI tool definitions
│   │       ├── clients/      # Model configurations
│   │       └── utils/        # Utility functions
│   └── types/
│       └── ai.ts             # Type definitions
└── next.config.js            # Next.js configuration
```

## Usage

1. **Start a Conversation**: Type your request in the chat input
2. **Ask for Content**: Request articles on specific topics
3. **Create Content**: Ask the assistant to create new articles
4. **Browse Content**: Ask to list existing articles by category

## License

MIT
