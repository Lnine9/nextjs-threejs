"use client";
import React, { useCallback } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { docs } from "@/app/doc/test";

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
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        border
        cursor-pointer
      "
      style={{ border: active ? "solid 1px #34D399" : "transparent" }}
    >
      {label}
    </div>
  );
};

const SideBar = () => {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const jump = useCallback(
    (id: string) => {
      router.push(`/doc/${id}`);
    },
    [router]
  );
  return (
    <div className="flex-col w-full h-full">
      {docs.map((item) => (
        <MenuItem
          key={item.id}
          active={item.id === segment}
          onClick={() => {
            jump(item.id);
          }}
          label={item.title}
        />
      ))}
    </div>
  );
};

export default SideBar;
