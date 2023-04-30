import React from "react";
import { DOCS, Item } from "@/app/works/list";
import Image from "next/image";
import ReactIcon from "@/public/react.svg";
import Link from "next/link";

const Item = (props: Item) => (
  <Link
    href={"/works/" + props.path}
    className="
    flex
    flex-col
    sm:flex-row
    gap-4
    w-full
    py-8
    sm:items-center
    border
    shadow-xl shadow-neutral-100
    bg-white
    hover:bg-neutral-700
    hover:text-white
    rounded-2xl
    transition-colors ease-in-out
    "
  >
    <Image
      src={props.img || ReactIcon}
      width={240}
      height={130}
      alt={props.title}
      className="
      mx-8
      bg-white
      rounded-xl
      "
    />
    <div className="flex-1 mx-8">
      <h2 className="text-2xl whitespace-pre-wrap mb-2">{props.title}</h2>
      <p className="text-neutral-500 whitespace-pre-wrap">
        {props.description}
      </p>
    </div>
  </Link>
);

const Page = () => {
  return (
    <div className="w-3/4 mx-auto my-8 flex flex-col gap-6">
      {DOCS.map((item) => (
        <Item {...item} key={item.path} />
      ))}
    </div>
  );
};

export default Page;
