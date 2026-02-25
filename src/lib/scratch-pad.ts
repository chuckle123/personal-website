import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const scratchPadDir = path.join(process.cwd(), "content/scratch-pad");

export interface ScratchPadPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export function getAllPosts(): Omit<ScratchPadPost, "content">[] {
  const files = fs.readdirSync(scratchPadDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(scratchPadDir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<ScratchPadPost> {
  const raw = fs.readFileSync(
    path.join(scratchPadDir, `${slug}.md`),
    "utf-8",
  );
  const { data, content } = matter(raw);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    content: result.toString(),
  };
}
