import React from "react";
import { cn } from "@/lib/utils";

const ErrorLine = ({ children, className }) => {
  return (
    <p className={cn("font-normal text-sm font-sans text-red-600", className)}>
      {children}
    </p>
  );
};

export default ErrorLine;
