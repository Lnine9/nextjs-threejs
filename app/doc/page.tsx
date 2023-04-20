"use client";
import React from "react";
import { DOCS, Item } from "@/app/doc/list";
import Image from "next/image";
import ReactIcon from "@/public/react.svg";
import Link from "next/link";

const Item = (props: Item) => (
  <Link
    href={"/doc/" + props.path}
    className="
    flex
    gap-4
    w-full
    h-48
    items-center
    shadow-xl
    shadow-neutral-200
    bg-white
    hover:bg-neutral-100
    border-2
    rounded-2xl
    "
  >
    <Image
      src={props.img || ReactIcon}
      alt={props.title}
      className="
      mx-8
      bg-white
      h-36
      w-56
      rounded-xl
      "
    />
    <div className="flex-1">
      <h2 className="text-2xl whitespace-pre-wrap">{props.title}</h2>
      <p className="text-neutral-600 whitespace-pre-wrap">
        {props.description}
      </p>
    </div>
  </Link>
);

const Page = () => {
  return (
    <div className="w-3/4 mx-auto my-8 flex flex-col gap-6">
      {DOCS.map((item) => (
        <Item {...item} />
      ))}
    </div>
  );
};

export default Page;
