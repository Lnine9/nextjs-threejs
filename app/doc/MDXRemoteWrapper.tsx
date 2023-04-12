"use client";
import React from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import NavMenu from "@/app/components/navbar/NavMenu";
import SmallNavMenu from "@/app/components/navbar/SmallNavMenu";

const components = {
  NavMenu,
  SmallNavMenu,
};
const MDXRemoteWrapper = (props: MDXRemoteProps) => {
  return <MDXRemote {...props} components={components} />;
};

export default MDXRemoteWrapper;
