import { notFound } from "next/navigation"
import { getContentBySlug } from "@/domains/ai/tools/contentService"

export const dynamicParams = false

export async function generateStaticParams() {
  return []
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params
  console.log("[pages/[slug]] Requested slug:", slug)

  const content = await getContentBySlug(slug)
  console.log("[pages/[slug]] Content found:", content ? content.title : "null")

  if (!content) {
    console.log("[pages/[slug]] Returning 404 for slug:", slug)
    notFound()
  }

  return (
    <main className="min-h-screen p-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
          <div className="text-gray-500 text-sm">
            <span>{content.category}</span>
            {content.publishedAt && (
              <span> • {new Date(content.publishedAt).toLocaleDateString()}</span>
            )}
          </div>
          {content.tags.length > 0 && (
            <div className="mt-2 flex gap-2">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </article>
    </main>
  )
}
