import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export function readContent(filename: string) {
  const filePath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(fileContents);
  return { content, data };
}
