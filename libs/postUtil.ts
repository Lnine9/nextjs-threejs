import matter from "gray-matter";
import { join } from "path";
import fs from "fs";
import { Post } from "@/types";

const POSTS_PATH = join(process.cwd(), "posts");

export function getPostsFilePaths(): string[] {
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.(md|mdx)$/.test(path));
}

export function getPost(slug: string): Post | undefined {
  try {
    const fullPath = join(POSTS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);
    data.slug = slug;
    return { data, content } as Post;
  } catch (e) {
    return undefined;
  }
}

export function _getPost(filePath: string): Post {
  const slug = filePath.replace(/\.mdx?$/, "");
  const post = getPost(slug)!;
  post.data.slug = slug;

  return post;
}

const compareDate = (str1?: string, str2?: string) => {
  const date1 = new Date(str1 || "1970/01/01");
  const date2 = new Date(str2 || "1970/01/01");
  return date1 > date2 ? 1 : -1;
};

export function getAllPost(): Post[] {
  const filePaths = getPostsFilePaths();
  const posts = filePaths
    .map((filePath) => _getPost(filePath))
    .sort((post1, post2) => compareDate(post1.data.date, post2.data.date));
  return posts;
}
