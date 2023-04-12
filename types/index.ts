export type Doc = {
  content: string;
  data: {
    slug: string;
    date?: string;
    [key: string]: any;
  };
};
