import matter from "gray-matter";
import { join } from "path";
import fs from "fs";
import { Doc } from "@/types";

const DOCS_PATH = join(process.cwd(), "mdx");

export function getDocsFilePaths(): string[] {
  return fs.readdirSync(DOCS_PATH).filter((path) => /\.mdx?$/.test(path));
}

export function getDoc(slug: string): Doc | undefined {
  try {
    const fullPath = join(DOCS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);
    data.slug = slug;
    return { data, content } as Doc;
  } catch (e) {
    return undefined;
  }
}

export function _getDoc(filePath: string): Doc {
  const slug = filePath.replace(/\.mdx?$/, "");
  const doc = getDoc(slug)!;
  doc.data.slug = slug;

  return doc;
}

const compareDate = (str1?: string, str2?: string) => {
  const date1 = new Date(str1 || "1970/01/01");
  const date2 = new Date(str2 || "1970/01/01");
  return date1 > date2 ? 1 : -1;
};

export function getAllDoc(): Doc[] {
  const filePaths = getDocsFilePaths();
  const docs = filePaths
    .map((filePath) => _getDoc(filePath))
    .sort((doc1, doc2) => compareDate(doc1.data.date, doc2.data.date));
  return docs;
}
