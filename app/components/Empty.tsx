import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

const Empty = () => {
  return (
    <div className="container h-96 flex justify-center items-center">
      <div className="h-fit text-6xl flex items-center">
        <AiFillExclamationCircle className="text-rose-400" />
        404
      </div>
    </div>
  );
};

export default Empty;
