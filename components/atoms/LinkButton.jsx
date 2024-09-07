import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils.js";

const LinkButton = ({ className, children, onClick }) => {
  return (
    <a
      onClick={onClick}
      className={cn(
        "text-black/[.6] text-sm font-medium block cursor-pointer",
        className
      )}
    >
      {children}
    </a>
  );
};

export default LinkButton;
