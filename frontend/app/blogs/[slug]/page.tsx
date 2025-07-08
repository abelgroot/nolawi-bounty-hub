import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Dynamically import the MDX file as a compiled React component
  // Next.js + @next/mdx will compile it at build time
  // three “..” segments to go from app/blog/[slug]/page.tsx → /
  const { default: PostContent } = await import(`../../../content/${slug}.mdx`);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            {post.title}
          </h1>

          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <main className="container mx-auto px-4 py-8">
        <article className="prose prose-gray dark:prose-invert max-w-none mx-auto">
          {/* Front-matter excerpt */}
          <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>

          {/* Render the compiled MDX component */}
          <PostContent />
        </article>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t">
          <Link href="/blogs">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Posts
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
