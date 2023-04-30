"use client";
import React, { useCallback, useEffect, useState } from "react";
import { throttle } from "@/libs/func";
import Button from "@/app/components/Button";

function ThrottledInputDemo(props) {
  const [counter, setCounter] = useState<number>(0);

  const updateCounter = useCallback(
    throttle(() => {
      setCounter((pre) => pre + 1);
    }, 500),
    []
  );

  return (
    <div className="m-4">
      <Button onClick={updateCounter}>CLick</Button>
      <div className="mt-4 border-2 p-2 min-h-[3rem]">
        <span className="text-neutral-500 mr-2">触发次数:</span>
        <span>{counter}</span>
      </div>
    </div>
  );
}

export default ThrottledInputDemo;
