import React from "react";
import { docs } from "@/app/doc/test";
import { Doc } from "@/app/doc/type";
import Empty from "@/app/components/Empty";

export const dynamicParams = true;
const getDoc = (id: string) =>
  new Promise<Doc | undefined>((resolve) => {
    const doc = docs.find((item) => item.id === id);
    resolve(doc);
  });

const DocPage = async ({ params }: any) => {
  const doc = await getDoc(params.id);

  return <>{doc ? <div>{doc?.title}</div> : <Empty />}</>;
};

export function generateStaticParams() {
  return docs.map((item) => ({ id: item.id }));
}

export default DocPage;
