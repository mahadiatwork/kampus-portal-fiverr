import React from "react";

const HelperText = ({ helperText }) => {
  return (
    <p className="text-center font-normal text-sm md:text-base text-[#00000099] mb-8">
      {helperText}
    </p>
  );
};

export default HelperText;
