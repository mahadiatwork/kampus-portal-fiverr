import React from "react";
import Image from "next/image";
import red from "@/public/assets/red.png";

const RedTick = () => {
  return (
    <div className="h-4 w-4 rounded-full mr-2">
      <Image src={red} alt="Red Tick" />
    </div>
  );
};

export default RedTick;
