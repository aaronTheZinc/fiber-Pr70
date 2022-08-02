export const findRootDir = (dir: string): string => {
  const sections = dir.split("/");
  sections.pop();
  return sections.join("/");
};
