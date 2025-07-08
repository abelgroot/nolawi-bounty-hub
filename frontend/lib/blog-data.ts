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
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
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

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    console.log(data);
    console.log(
      "------------------------------------------------------------------------------\n\n\n",
    );
    console.log(content);

    return {
      slug,
      title: data.title || "Untitled",
      excerpt: data.excerpt || "",
      author: data.author || "Anonymous",
      date: data.date || "",
      readTime: data.readTime || "5 min read",
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(contentDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => fileName.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Error reading blog slugs:", error);
    return [];
  }
}
