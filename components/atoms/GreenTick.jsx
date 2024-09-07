import React from "react";
import Image from "next/image";
import green from "@/public/assets/green.png";

const GreenTick = () => {
  return (
    <div className="h-4 w-4 rounded-full mr-2">
      <Image src={green} alt="Green Tick" />
    </div>
  );
};

export default GreenTick;
