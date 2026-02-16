import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Cameron Spencer",
};

const experience = [
  {
    company: "Token Terminal",
    roles: [
      {
        title: "Staff AI Software Engineer",
        dates: "Mar 2025 – Feb 2026",
      },
    ],
    bullets: [
      "Developed an MCP server enabling analysts to explore standardized blockchain metrics, consolidating 10+ tools down to 4 and reducing context per call from ~20,000 tokens to ~200 through progressive disclosure",
      "Designed a semantic discovery layer using SQLite and FTS5 full-text search within an isolated container, enabling agents to resolve ambiguous queries across thousands of different entities",
      "Engineered a text-to-SQL chat-based agent over a 2PB BigQuery data warehouse, replacing manual exploration of thousands of undocumented tables",
      "Automated table and column description generation across the data warehouse, providing the text-to-SQL agent with contextual metadata to improve query accuracy",
      "Created custom AI skills and commands for backlog management and standup generation, and authored reusable context files to accelerate AI-assisted development across coding tools",
    ],
  },
  {
    company: "The Rounds",
    note: "A16Z, Redpoint Ventures, Modern Ventures",
    roles: [
      {
        title: "Staff Software Engineer (Tech Lead)",
        dates: "Sep 2024 – Mar 2025",
      },
      {
        title: "Senior Software Engineer II (Tech Lead)",
        dates: "Sep 2023 – Sep 2024",
      },
      {
        title: "Senior Software Engineer (Tech Lead)",
        dates: "Jun 2022 – Sep 2023",
      },
    ],
    bullets: [
      "Halved warehouse packing times by rolling out a new version of the packing app to support batch sessions",
      "Architected a headless CMS with interchangeable designs and AI-powered content for the Discovery page",
      "Proposed and implemented flexible delivery days, increasing average order value by 31%",
      "Led the technical implementation for warehouse consolidation, reducing operational costs by 10% weekly",
      "Utilized Langchain and tool calling as a reasoning agent to build an AI-assisted customer service platform, servicing common customer requests",
      "Cut order pack errors by 65% after developing a custom packing app, enabling the delivery of 5MM+ products",
      "Implemented product catalog geofencing, unlocking temperature-controlled and regulated products",
      "Increased TypeScript coverage from 0% to 80% and added test cases across the frontend and backend",
      "Drove company-wide AI adoption as the go-to LLM resource, leading prompt engineering workshops across teams",
    ],
  },
  {
    company: "Gopuff",
    note: "SoftBank Vision Fund, Guggenheim Investments, Accel",
    roles: [
      {
        title: "Senior Software Engineer (Tech Lead)",
        dates: "Dec 2021 – Jun 2022",
      },
      {
        title: "Software Engineer II",
        dates: "Apr 2021 – Dec 2021",
      },
    ],
    bullets: [
      "Delivered Gopuff's scheduled delivery feature, allowing orders during warehouse closure",
      "Partnered with Data Science to build a driver forecasting model, optimizing delivery driver utilization and reducing operational costs during low-demand periods, streamlining 2MM rides yearly",
      "Developed a platform-agnostic ordering system using a workflow engine, launching an Uber Eats integration that increased total revenue by 8%",
    ],
  },
  {
    company: "Vitris LLC",
    roles: [
      {
        title: "Co-Founder, CTO",
        dates: "Jan 2018 – Apr 2021",
      },
    ],
    bullets: [
      "Amassed $100K in grants and reached $15K in monthly recurring revenue",
    ],
  },
];

const education = {
  school: "Drexel University",
  degree: "Bachelor of Science in Computer Science",
};

export default function Experience() {
  return (
    <div>
      <h1 className="text-[1.75rem] font-bold font-heading mb-6">
        Experience
      </h1>
      <div>
        {experience.map((job, i) => (
          <div key={i}>
            {i > 0 && <hr className="border-border my-6" />}
            <h2 className="text-[1.25rem] font-bold font-heading mb-0.5">
              {job.company}
            </h2>
            {job.note && (
              <p className="text-fg-muted text-xs italic mb-2">{job.note}</p>
            )}
            <p className="text-fg-muted text-xs mb-1">
              {[...job.roles].reverse().map((role, j) => (
                <span key={j}>
                  {j > 0 && " → "}
                  {role.title}
                </span>
              ))}
              {" "}&middot; {job.roles[job.roles.length - 1].dates.split(" – ")[0]} – {job.roles[0].dates.split(" – ")[1]}
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {job.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="border-border my-6" />
      <h2 className="text-[1.25rem] font-bold font-heading mb-2">Education</h2>
      <p className="font-bold">{education.school}</p>
      <p className="text-fg-muted text-xs">{education.degree}</p>
    </div>
  );
}
