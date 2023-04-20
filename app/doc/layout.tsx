import React from "react";

const DocLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="min-h-[calc(100vh-theme(height.navh))] ">{children}</div>
    </div>
  );
};

export default DocLayout;
