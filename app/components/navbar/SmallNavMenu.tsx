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
        hover:bg-neutral-200
        transition
        cursor-pointer
        bg-neutral-100
      "
      style={{
        fontWeight: active ? "bold" : "normal",
        color: active ? "var(--primary)" : "inherit",
        borderLeft: active
          ? "solid 6px var(--primary)"
          : "solid 5px transparent",
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
        transform: translateY(5px) rotate(45deg);
      }
      .expand-line2 {
        width: 24px;
        transform: translateY(-5px) rotate(-45deg);
      }
    `}</style>
    <div
      onClick={onClick}
      className="h-full w-20 flex flex-col items-center justify-center space-y-2 bg-white"
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
      {expanded && (
        <div className="flex-col w-screen gap-1.5 h-screen bg-neutral-100 z-50 absolute top-full left-0">
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
      )}
    </div>
  );
};

export default NavMenu;
