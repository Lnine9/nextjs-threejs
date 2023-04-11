import React from "react";
import SideBar from "@/app/doc/SideBar";

const DocLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="w24 h-full">
        <SideBar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DocLayout;
