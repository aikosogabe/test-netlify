import fs from "fs";
import path from "path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const generatedDir = path.join(publicDir, "generated");

export async function generateWebpImage(imagePath: string, width: number) {
  const imageFullPath = path.join(publicDir, imagePath);

  const dir = path.dirname(imagePath);
  const dest = path.join(generatedDir, dir);

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // 拡張子
  const ext = path.extname(imageFullPath);
  // ディレクトリのパスを除いたファイル名
  const basename = path.basename(imageFullPath, ext);

  const sharpStream = await sharp(imageFullPath);
  await sharpStream
    .clone()
    .resize({ width })
    .toFile(
      path.format({
        dir: dest,
        name: basename,
        ext: ext,
      })
    );

  const srcPath = path.join(
    "/generated",
    dir,
    path.format({ name: basename, ext: ext })
  );

  return srcPath;
}
