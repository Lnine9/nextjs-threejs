"use client";
import React, { useCallback } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { MenuPath } from "@/app/consts/menu";

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
        px-7
        py-2
        my-2
        ${active ? "font-bold text-xl" : ""}
        hover:bg-neutral-800
        hover:text-white
        transition-colors
        ease-in-out
        duration-300
        cursor-pointer
        rounded-lg
        mx-2
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
      router.push(`/${MenuPath.POST}/${slug}`);
    },
    [router]
  );
  return (
    <div
      className="
      hidden
      md:flex
      flex-col
      w-60
      py-4
      top-[calc(theme(height.navh))]
      h-[calc(100vh-theme(height.navh))]
      sticky
      bg-white
      z-10
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
