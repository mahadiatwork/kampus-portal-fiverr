import React from "react";
import Image from "next/image";
import TokenExpired from "/public/assets/TokenExpired.png";

const TokenExpiredImage = () => {
  return (
    <div className="h-[150px] w-[150px] rounded-full mb-8 mx-auto">
      <Image src={TokenExpired} width={150} height={150} alt="Red Tick" />
    </div>
  );
};

export default TokenExpiredImage;
