import React, { Suspense } from "react";
import { getAllPost, getPost as getOneDoc } from "@/libs/postUtil";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFootnotes from "remark-footnotes";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import Loading from "@/app/loading";
import MDXRemoteWrapper from "@/app/post/MDXRemoteWrapper";

export const dynamicParams = true;
const getDoc = async (slug: string) => {
  const doc = getOneDoc(slug);
  if (!doc) {
    return undefined;
  }
  const source = await serialize(doc.content, {
    scope: doc.data,
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
  });
  return { source, data: doc.data };
};

const DocPage = async ({ params }: any) => {
  const doc = await getDoc(params.slug);
  if (!doc) {
    notFound();
  }

  return (
    <div className="px-6 md:px-16 py-8 w-full min-h-[calc(100vh-theme(height.navh))]">
      <article className="prose p-4">
        <p>{doc.data.date}</p>
        <Suspense fallback={<Loading />}>
          <MDXRemoteWrapper {...doc.source} />
        </Suspense>
      </article>
    </div>
  );
};

export function generateStaticParams() {
  return getAllPost().map((item) => ({ params: { slug: item.data.slug } }));
}

export default DocPage;
