import { readdir, readFile } from "fs/promises";
import { join } from "path";

export async function getFilesFromDir(dir, extension = "") {
  const absoluteDir = join(process.cwd(), dir);
  const files = await readdir(absoluteDir);
  if (extension) {
    return files.filter((f) => f.endsWith(extension)).map((f) => join(absoluteDir, f));
  }
  return files.map((f) => join(absoluteDir, f));
}

export async function readFileContent(filePath) {
  return readFile(filePath, "utf-8");
}
