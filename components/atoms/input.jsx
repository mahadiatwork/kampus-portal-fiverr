import * as React from "react";
import Image from "next/image";

import eye from "/public/eye.svg";
import eyeOff from "/public/eye-off.svg";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <label className="relative block">
      <input
        type={showPassword ? "text" : type}
        className={cn(
          `flex h-10 w-full ${
            type == "password" ? "pl-3 pr-9" : "px-3"
          } rounded-md border border-input bg-transparent py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
      {type == "password" ? (
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          {showPassword ? (
            <Image
              src={eye}
              className="opacity-50 cursor-pointer"
              onClick={() => setShowPassword((pre) => !pre)}
            />
          ) : (
            <Image
              src={eyeOff}
              className="opacity-50 cursor-pointer"
              onClick={() => setShowPassword((pre) => !pre)}
            />
          )}
        </span>
      ) : null}
    </label>
  );
});

Input.displayName = "Input";

export { Input };
