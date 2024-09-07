import React from "react";
import { cn } from "@/lib/utils";

const SuccessText = ({ children, className }) => {
  return (
    <p
      className={cn("font-normal text-sm font-sans text-green-600", className)}
    >
      {children}
    </p>
  );
};

export default SuccessText;
