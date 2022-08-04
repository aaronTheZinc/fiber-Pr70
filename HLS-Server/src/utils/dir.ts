export const findRootDir = (dir: string): string => {
  const s = dir.split("\\").join('/')
  console.log(dir)
  const sections = s.split("/");
  sections.pop();
  return sections.join("/");
};
