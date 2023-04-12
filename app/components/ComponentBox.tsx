"use client";
import React from "react";

const ComponentBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

export default ComponentBox;
