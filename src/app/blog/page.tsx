import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Cameron Spencer",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-[1.75rem] font-bold font-heading mb-6">Blog</h1>
      <div>
        {posts.map((post, i) => (
          <div key={post.slug}>
            {i > 0 && <hr className="border-border my-4" />}
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-baseline justify-between gap-4 no-underline group"
            >
              <span className="font-bold font-heading text-[1.05rem] group-hover:text-link-hover transition-colors">
                {post.title}
              </span>
              <span className="text-fg-muted text-xs font-body whitespace-nowrap">
                {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
