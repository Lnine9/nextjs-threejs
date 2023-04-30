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
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row shadow-neutral-300 shadow-2xl">
      <SideBar paths={paths} />
      <SmallMenu paths={paths} />
      <div className="md:ml-2 flex-1">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default DocLayout;
