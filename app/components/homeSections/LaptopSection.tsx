"use client";
import React from "react";
import LaptopCanvas from "@/app/components/homeSections/LaptopCanvas";
import SectionWrapper from "@/app/components/hocs/SectionWrapper";
import SectionSwitch from "@/app/components/homeSections/SectionSwitch";

const Section = () => {
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full hidden md:block">
        <LaptopCanvas />
      </div>
      <div className="absolute top-12 ml-4 sm:right-36 pointer-events-none flex">
        <div className="w-[2px] h-[300px] bg-black mr-8 my-8 hidden sm:block" />
        <div>
          <p className="text-[5rem]">
            Hi, I'm
            <span className="text-emerald-800 ml-2 font-bold">L</span>
            nine
          </p>
          <p className="text-2xl ml-2 mb-1">I am a student from China</p>
          <p className="text-2xl ml-2 mb-1">and a Web Developer</p>
          <p className="text-2xl ml-2 my-6 tracking-wider">
            欢迎浏览我的Blog🥰
          </p>
        </div>
      </div>
      <SectionSwitch id="#burger" />
    </div>
  );
};

export default SectionWrapper(Section, "laptop");
