export type Post = {
  content: string;
  data: {
    slug: string;
    date?: string;
    [key: string]: any;
  };
};
