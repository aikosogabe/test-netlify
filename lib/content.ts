import fs from "fs";
import path from "path";
import matter from "gray-matter";

type ArticleContentType = "blog";
const contentDirectory = path.join(process.cwd(), "content");

export function readContent(fileName: string) {
  const filePath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(
    path.join(contentDirectory, fileName),
    "utf-8"
  );
  const { content, data } = matter(fileContents);
  return { content, data };
}

export function readAllArticleContents(type?: ArticleContentType) {
  const fullPath =
    type !== undefined ? path.join(contentDirectory, type) : contentDirectory;
  const fileNames = fs
    .readdirSync(fullPath)
    .filter((fileName) => fileName.endsWith(".md"));
  let allData = fileNames.map((fileName) => {
    return readContent(path.join(type, fileName));
  });

  console.log(fullPath);

  // 投稿を日付でソートする
  return allData.sort((a, b) => {
    if (a.data.date < b.data.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
