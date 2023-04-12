"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useCallback } from "react";
import { MenuPath, Menus } from "@/app/consts/menu";

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
        px-5
        py-4
        hover:bg-neutral-100
        transition
        cursor-pointer
      "
      style={{
        fontWeight: active ? "bold" : "normal",
        color: active ? "var(--primary)" : "inherit",
        borderBottom: active
          ? "solid 3px var(--primary)"
          : "solid 2px transparent",
      }}
    >
      {label}
    </div>
  );
};

const NavMenu = () => {
  const segment = useSelectedLayoutSegment() || "";
  const router = useRouter();
  const jump = useCallback(
    (path: MenuPath) => {
      router.push("/" + path);
    },
    [router]
  );

  return (
    <div className="hidden md:flex gap-1.5 h-full items-end">
      {Menus.map((item) => (
        <MenuItem
          key={item.path}
          active={segment === item.path}
          onClick={() => {
            jump(item.path);
          }}
          label={item.title}
        />
      ))}
    </div>
  );
};

export default NavMenu;
