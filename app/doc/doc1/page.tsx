"use client";
import React from "react";
import IndexMDX from "@/posts/index.mdx";
import { MDXProvider } from "@mdx-js/react";
import Button from "@/app/components/Button";

const Index = () => {
  return (
    <div className="prose">
      <MDXProvider components={{ Button }}>
        <IndexMDX />
      </MDXProvider>
    </div>
  );
};

export default Index;
