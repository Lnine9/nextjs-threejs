"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import { Menus } from "@/app/consts/menu";
import Link from "next/link";

interface MenuItemProps {
  onClick?: () => void;
  label: string;
  to: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  to,
  active = false,
}) => {
  return (
    <div
      onClick={onClick}
      className="
        px-5
        py-4
        hover:bg-white
        hover:text-neutral-800
        transition
        cursor-pointer
        bg-neutral-800
        text-white
      "
      style={{
        fontSize: active ? "large" : "normal",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      <Link href={to}>{label}</Link>
    </div>
  );
};

const MenuButton = ({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) => (
  <>
    <style jsx>{`
      .line1,
      .line2 {
        display: block;
        height: 2px;
        width: 22px;
        background: #1d1f21;
        transition: transform 0.15s ease;
      }
      .expand-line1 {
        width: 24px;
        background: white;
        transform: translateY(5px) rotate(45deg);
      }
      .expand-line2 {
        width: 24px;
        background: white;
        transform: translateY(-5px) rotate(-45deg);
      }
    `}</style>
    <div
      onClick={onClick}
      className="h-full w-20 flex flex-col items-center justify-center space-y-2 z-50 absolute right-2 top-2"
    >
      <div className={`line1 ${expanded && "expand-line1"}`} />
      <div className={`line2 ${expanded && "expand-line2"}`} />
    </div>
  </>
);
const NavMenu = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const segment = useSelectedLayoutSegment() || "";

  return (
    <div className="md:hidden">
      <MenuButton
        onClick={() => {
          setExpanded(!expanded);
        }}
        expanded={expanded}
      />
      <div
        style={{
          visibility: expanded ? "visible" : "hidden",
          opacity: expanded ? 1 : 0,
        }}
        className="flex-col w-2/5 pt-20 pb-4 rounded-xl gap-1.5
         h-fit bg-neutral-800 z-40 absolute top-2 right-2 transition-opacity ease-in-out"
      >
        {Menus.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => {
              setExpanded(false);
            }}
            active={segment === item.path}
            to={"/" + item.path}
            label={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
