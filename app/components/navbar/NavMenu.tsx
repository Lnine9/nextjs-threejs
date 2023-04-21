"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Menus } from "@/app/consts/menu";
import Link from "next/link";

interface MenuItemProps {
  onClick?: () => void;
  to: string;
  label: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  to,
  label,
  active = false,
}) => {
  return (
    <div
      onClick={onClick}
      className="
        px-5
        py-4
        hover:bg-neutral-800
        hover:text-white
        transition
        cursor-pointer
      "
      style={{
        fontWeight: active ? "bold" : "normal",
        borderBottom: active
          ? "solid 3px rgb(23 23 23 / var(--tw-bg-opacity))"
          : "solid 2px transparent",
      }}
    >
      <Link href={to}>{label}</Link>
    </div>
  );
};

const NavMenu = () => {
  const segment = useSelectedLayoutSegment() || "";

  return (
    <div className="hidden md:flex gap-1.5 h-full items-end">
      {Menus.map((item) => (
        <MenuItem
          key={item.path}
          active={segment === item.path}
          to={"/" + item.path}
          label={item.title}
        />
      ))}
    </div>
  );
};

export default NavMenu;
