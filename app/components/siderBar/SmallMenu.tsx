"use client";
import React, { useCallback, useState } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { SlArrowRight } from "react-icons/sl";
import { MenuPath } from "@/app/consts/menu";

const MenuButton = ({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="w-full h-14 flex px-4 bg-neutral-700 text-white items-center cursor-pointer"
  >
    <SlArrowRight
      className={`mr-2 transform ${
        expanded ? "rotate-90" : "rotate-0"
      } transition-transform ease-in-out`}
    />
    Menu
  </div>
);
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
        px-10
        py-3
        hover:bg-neutral-100
        transition
        cursor-pointer
        ${active ? "font-bold text-xl" : ""}
      `}
    >
      {label}
    </div>
  );
};

interface SmallMenuProps {
  paths: {
    slug: string;
    title: string;
  }[];
}

const SmallMenu = ({ paths }: SmallMenuProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const jump = useCallback(
    (slug: string) => {
      setExpanded(false);
      router.push(`/${MenuPath.POST}/${slug}`);
    },
    [router]
  );
  return (
    <div className="w-full relative md:hidden">
      <MenuButton
        expanded={expanded}
        onClick={() => {
          setExpanded(!expanded);
        }}
      />
      {expanded && (
        <div
          className="flex-col w-full min-h-[calc(100vh-theme(height.navh))] z-20 bg-neutral-50 absolute top-[4rem]
        transition-all ease-in-out"
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
      )}
    </div>
  );
};

export default SmallMenu;
