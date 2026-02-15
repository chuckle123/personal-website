import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Cameron Spencer",
};

export default function About() {
  return (
    <div>
      <h1 className="text-[1.75rem] font-bold font-heading mb-6">About</h1>
      <div className="space-y-4">
        <p>
          I&apos;m a staff-level software engineer who&apos;s spent the last few years
          building at the intersection of AI and product. Most recently at Token
          Terminal, I built MCP servers and text-to-SQL agents over petabyte-scale
          data warehouses. Before that, I spent three years at The Rounds leading
          engineering on warehouse logistics, delivery systems, and an AI customer
          service platform.
        </p>
        <p>
          I started my career co-founding Vitris LLC, where I wore every hat from
          writing the first line of code to closing grants. That experience shaped
          how I think about building — scope ruthlessly, ship fast, measure
          everything. I&apos;ve carried that mindset through roles at Gopuff and The
          Rounds, where I consistently found ways to turn ambiguous problems into
          shipped features with real metrics behind them.
        </p>
        <p>
          Outside of engineering, I once acted in a South Indian movie called{" "}
          <em>Captain</em> alongside Jayasurya — I played the referee. I also
          built a ticket pricing aggregator that scraped 400K rows of data daily,
          mostly because I was curious whether I could. I&apos;m looking for my next
          role where I can push AI tooling forward and work with people who care
          about craft.
        </p>
      </div>
    </div>
  );
}
