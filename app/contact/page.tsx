import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Cameron Spencer",
};

export default function Contact() {
  return (
    <div>
      <h1 className="text-[1.75rem] font-bold font-heading mb-6">Contact</h1>
      <div className="space-y-2">
        <p>
          <a href="mailto:13spencerc@gmail.com">13spencerc@gmail.com</a>
        </p>
        <p>
          <a
            href="https://github.com/cameroncspencer"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
        <p>
          <a
            href="https://linkedin.com/in/cameroncspencer"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
      <p className="mt-6 text-fg-muted">Want to build something? Reach out.</p>
    </div>
  );
}
