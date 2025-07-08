import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  content?: string;
}

const contentDirectory = path.join(process.cwd(), "content");

export function getBlogPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(contentDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(contentDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || "Untitled",
          excerpt: data.excerpt || "",
          author: data.author || "Anonymous",
          date: data.date || "",
          readTime: data.readTime || "5 min read",
          tags: data.tags || [],
        };
      })
      .sort((a, b) => {
        // Sort by date (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    return allPostsData;
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const contentDirectory = path.join(process.cwd(), "content");
  const blogPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(blogPath, "utf8");
  const { data, content } = matter(fileContents);

  const excerpt =
    data.excerpt ||
    content
      .split("\n")
      .find((line) => line.trim())
      ?.slice(0, 200) ||
    "";

  return {
    slug,
    title: data.title,
    excerpt,
    author: data.author,
    date: data.date,
    readTime: data.readTime,
    tags: data.tags || [],
    content,
  };
}

export function getAllBlogSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(contentDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading blog slugs:", error);
    return [];
  }
}
