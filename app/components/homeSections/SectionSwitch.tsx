"use client";
import React from "react";
import { motion } from "framer-motion";

const SectionSwitch = ({ id }: { id: string }) => {
  return (
    <div className="absolute bottom-20 w-full flex place-content-center">
      <a href={id}>
        <div
          className="w-[35px] h-[64px] rounded-3xl border-4 border-neutral-600
          flex justify-center items-start p-2"
        >
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-3 h-3 rounded-full bg-neutral-600"
          />
        </div>
      </a>
    </div>
  );
};

export default SectionSwitch;
