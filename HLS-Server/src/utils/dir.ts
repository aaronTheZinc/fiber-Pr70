import fs from "fs";

export const findRootDir = (dir: string): string => {
  const s = dir.split("\\").join('/')
  console.log(dir)
  const sections = s.split("/");
  sections.pop();
  return sections.join("/");
};

export const deleteFile = (path: string) => {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.log(err)
  }
}