import React, { cache } from "react";
import { getAllPost, getPost as getOneDoc } from "@/libs/postUtil";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import usedComponents from "@/app/post/[slug]/usedComponents";

export const dynamicParams = true;

const getDoc = cache(async (slug: string) => {
  console.log("generate post: ", slug);
  const post = getOneDoc(slug);
  if (!post) {
    return undefined;
  }
  const source = await compileMDX({
    source: post.content,
    options: {
      scope: post.data,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          [remarkFootnotes, { inlineNotes: true }],
        ], // posts 支持的插件
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,
          [rehypePrismPlus, { ignoreMissing: true }],
        ], // posts 支持的插件
        format: "mdx",
      },
    },
    components: usedComponents,
  });
  return { source, data: post.data };
});

const DocPage = async ({ params }: any) => {
  const post = await getDoc(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="px-6 md:px-16 py-8 w-full bg-white min-h-[calc(100vh-theme(height.navh))]">
      <article className="prose p-4">
        <h1>{post.data.title}</h1>
        <p className="text-neutral-500">{post.data.date}</p>
        {post.source.content}
      </article>
    </div>
  );
};

export function generateStaticParams() {
  return getAllPost().map((item) => ({ slug: item.data.slug }));
}

export default DocPage;
