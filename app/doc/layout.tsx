import React from "react";
import SideBar from "@/app/components/siderBar/SideBar";
import { getAllDoc } from "@/libs/docUtil";
import SmallMenu from "@/app/components/siderBar/SmallMenu";

const paths = getAllDoc().map((item) => ({
  slug: item.data.slug,
  title: item.data.title,
}));

const DocLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <SideBar paths={paths} />
      <SmallMenu paths={paths} />
      <div className="flex-1 h-full bg-neutral-50">{children}</div>
    </div>
  );
};

export default DocLayout;
