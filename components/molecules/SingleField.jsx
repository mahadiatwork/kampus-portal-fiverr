import React from "react";
import { cn } from "@/lib/utils.js";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";

import {
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/atoms/form";

const SingleField = ({
  className,
  title,
  placeholder,
  field,
  type = "text",
}) => {
  return (
    <FormItem className={cn(className)}>
      <FormLabel>
        <Label
          htmlFor="item"
          className="font-medium text-sm text-[#fff] mb-1.5 leading-5"
        >
          {title}
        </Label>
      </FormLabel>
      <FormControl>
        <Input
          {...field}
          id="item"
          type={type}
          placeholder={placeholder}
          className={cn("border-[#CBD5E1]", className)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SingleField;
