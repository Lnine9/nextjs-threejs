import React, { Suspense } from "react";
import SideBar from "@/app/components/siderBar/SideBar";
import { getAllPost } from "@/libs/postUtil";
import SmallMenu from "@/app/components/siderBar/SmallMenu";
import Loading from "@/app/loading";

const paths = getAllPost().map((item) => ({
  slug: item.data.slug,
  title: item.data.title,
}));

const DocLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <SideBar paths={paths} />
      <SmallMenu paths={paths} />
      <div className="flex-1 h-full bg-neutral-50">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default DocLayout;
