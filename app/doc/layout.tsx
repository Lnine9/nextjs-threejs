import React from "react";

const DocLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="w24 h-full"></div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DocLayout;
