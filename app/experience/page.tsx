import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Cameron Spencer",
};

const experience = [
  {
    company: "Token Terminal",
    role: "Staff AI Software Engineer",
    dates: "Mar 2025 – Feb 2026",
    bullets: [
      "Built an MCP server consolidating 10+ tools to 4, reducing context per call from ~20K tokens to ~200",
      "Engineered a text-to-SQL agent over a 2PB BigQuery data warehouse",
      "Created custom AI skills and context files to accelerate AI-assisted development across coding tools",
    ],
  },
  {
    company: "The Rounds",
    role: "Staff Software Engineer (Tech Lead)",
    dates: "Jun 2022 – Mar 2025",
    note: "A16Z, Redpoint Ventures, Modern Ventures",
    bullets: [
      "Halved warehouse packing times by rolling out batch packing sessions",
      "Increased average order value by 31% through flexible delivery days",
      "Cut order pack errors by 65% with a custom packing app, enabling 5MM+ product deliveries",
      "Led warehouse consolidation, reducing operational costs by 10% weekly",
    ],
  },
  {
    company: "Gopuff",
    role: "Senior Software Engineer (Tech Lead)",
    dates: "Apr 2021 – Jun 2022",
    note: "SoftBank Vision Fund, Guggenheim Investments, Accel",
    bullets: [
      "Delivered scheduled delivery feature, allowing orders during warehouse closure",
      "Built a platform-agnostic ordering system, launching Uber Eats integration that increased revenue by 8%",
      "Partnered with Data Science on a driver forecasting model, streamlining 2MM rides yearly",
    ],
  },
  {
    company: "Vitris LLC",
    role: "Co-Founder, CTO",
    dates: "Jan 2018 – Apr 2021",
    bullets: [
      "Amassed $100K in grants and reached $15K in monthly recurring revenue",
    ],
  },
];

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
            <p className="text-fg-muted text-xs mb-1">
              {job.role} &middot; {job.dates}
            </p>
            {job.note && (
              <p className="text-fg-muted text-xs italic mb-2">{job.note}</p>
            )}
            <ul className="list-disc list-inside space-y-1 mt-2">
              {job.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
