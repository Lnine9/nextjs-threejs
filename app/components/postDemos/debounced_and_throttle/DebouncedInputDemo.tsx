"use client";
import React, { useCallback, useEffect, useState } from "react";
import Input from "@/app/components/inputs/Input";
import { debounce } from "@/libs/func";

function DebouncedInputDemo(props) {
  const [value, setValue] = useState<string>("");
  const [log, setLog] = useState<string[]>([]);

  const printValue = useCallback(
    debounce((value) => {
      setLog(value);
    }, 500),
    []
  );

  useEffect(() => {
    printValue(value);
  }, [value, printValue]);

  return (
    <div className="m-4">
      <Input
        label="测试"
        onInput={(event: any) => {
          setValue(event.target.value);
        }}
      />
      <div className="mt-4 border-2 p-2 min-h-[3rem]">
        <span className="text-neutral-500 mr-2">log:</span>
        <span>{log}</span>
      </div>
    </div>
  );
}

export default DebouncedInputDemo;
