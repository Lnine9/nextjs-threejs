"use client";
import React, { useCallback } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  active = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        px-4
        py-3
        hover:bg-neutral-100
        transition
        cursor-pointer
        ${active ? "text-primary font-bold" : ""}
      `}
    >
      {label}
    </div>
  );
};

interface SideBarProps {
  paths: {
    slug: string;
    title: string;
  }[];
}

const SideBar = ({ paths }: SideBarProps) => {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const jump = useCallback(
    (slug: string) => {
      router.push(`/doc/${slug}`);
    },
    [router]
  );
  return (
    <div
      className="
      hidden
      md:flex
      flex-col
      w-48
      top-[calc(theme(height.navh))]
      h-[calc(100vh-theme(height.navh))]
      sticky
      "
    >
      {paths.map((item) => (
        <MenuItem
          key={item.slug}
          active={item.slug === segment}
          onClick={() => {
            jump(item.slug);
          }}
          label={item.title}
        />
      ))}
    </div>
  );
};

export default SideBar;
