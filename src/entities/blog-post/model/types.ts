export type BlogKind = "post" | "changelog";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  kind: BlogKind;
  summary: string;
  tags: string[];
  content: string;
};
