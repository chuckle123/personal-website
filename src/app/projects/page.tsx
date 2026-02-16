import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Cameron Spencer",
};

const projects = [
  {
    title: "MCP Server for Blockchain Analytics",
    description:
      "Built an MCP server enabling analysts to explore standardized blockchain metrics. Consolidated 10+ tools down to 4 to minimize agent decision complexity, and reduced context per call from ~20,000 tokens to ~200 through progressive disclosure.",
    tech: "TypeScript, MCP, Claude API, SQLite, FTS5",
  },
  {
    title: "Text-to-SQL Agent over 2PB Data Warehouse",
    description:
      "Engineered a chat-based agent that translates natural language into SQL queries against thousands of undocumented BigQuery tables. Automated table and column description generation to provide the agent with contextual metadata and improve query accuracy.",
    tech: "TypeScript, Vercel AI SDK, BigQuery, LLM Agents",
  },
  {
    title: "Semantic Discovery Layer",
    description:
      "Designed a discovery system using SQLite and FTS5 full-text search within an isolated container, enabling agents to resolve ambiguous queries across thousands of different entities.",
    tech: "SQLite, FTS5, TypeScript, Cloudflare Workers, Docker",
  },
  {
    title: "Warehouse Packing Application",
    description:
      "Developed a custom packing app that cut order pack errors by 65% and enabled delivery of 5MM+ products. Later rolled out batch packing sessions that halved warehouse packing times.",
    tech: "TypeScript, React, Next.js, Node.js",
  },
  {
    title: "Platform-Agnostic Ordering System",
    description:
      "Developed an ordering system using a workflow engine, launching an Uber Eats integration that increased total revenue by 8%.",
    tech: "TypeScript, Node.js, Workflow Engine",
  },
  {
    title: "Event Ticket Pricing Aggregator",
    description:
      "Scraped ticket sites, storing 400K rows of sales and listing data daily using automated scripts and browser tools.",
    tech: "Python, Web Scraping, Data Pipelines",
  },
];

export default function Projects() {
  return (
    <div>
      <h1 className="text-[1.75rem] font-bold font-heading mb-6">Projects</h1>
      <div>
        {projects.map((project, i) => (
          <div key={i}>
            {i > 0 && <hr className="border-border my-6" />}
            <h2 className="text-[1.25rem] font-bold font-heading mb-1">
              {project.title}
            </h2>
            <p className="mb-2">{project.description}</p>
            <p className="text-xs text-fg-muted">{project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
