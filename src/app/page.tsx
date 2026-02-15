import Link from "next/link";

const projects = [
  {
    title: "MCP Server for Blockchain Analytics",
    description:
      "Built an MCP server enabling analysts to explore standardized blockchain metrics. Consolidated 10+ tools to 4 and reduced context per call from ~20K tokens to ~200 through progressive disclosure.",
    tech: "TypeScript, MCP, Claude API, SQLite, FTS5",
  },
  {
    title: "Text-to-SQL Agent over 2PB Data Warehouse",
    description:
      "Engineered a chat-based agent that translates natural language to SQL queries over thousands of undocumented BigQuery tables, with automated metadata generation for improved accuracy.",
    tech: "Python, BigQuery, LLM Agents, Langchain",
  },
  {
    title: "AI-Assisted Customer Service Platform",
    description:
      "Used Langchain and tool calling to build a reasoning agent that handled common customer requests, reducing support team workload.",
    tech: "TypeScript, Langchain, Tool Calling, Node.js",
  },
  {
    title: "Warehouse Packing Application",
    description:
      "Developed a custom packing app that cut order errors by 65% and enabled delivery of 5MM+ products. Later added batch packing to halve packing times.",
    tech: "TypeScript, React, Next.js, Node.js",
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-[1.75rem] font-bold font-heading mb-1">
        Cameron Spencer
      </h1>
      <p className="text-fg-muted mb-8">AI Engineer / Staff Software Engineer</p>

      <h2 className="text-[1.25rem] font-bold font-heading mb-4">
        Project Highlights
      </h2>
      <div>
        {projects.map((project, i) => (
          <div key={i}>
            {i > 0 && <hr className="border-border my-6" />}
            <h3 className="text-base font-bold font-heading mb-1">
              {project.title}
            </h3>
            <p className="mb-2">{project.description}</p>
            <p className="text-xs text-fg-muted">{project.tech}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/projects">View all projects</Link>
      </div>
    </div>
  );
}
