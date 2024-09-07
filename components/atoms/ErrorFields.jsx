import React from "react";
import GreenTick from "@/components/atoms/GreenTick";
import RedTick from "@/components/atoms/RedTick";
import ErrorLine from "@/components/atoms/ErrorLine";

const LineElements = ({ msg }) => {
  return (
    <li className="flex justify-start items-center">
      {msg.checkMark ? <GreenTick /> : <RedTick />}
      <ErrorLine>{msg.text}</ErrorLine>
    </li>
  );
};

const ErrorFields = ({ arr }) => {
  // const arr = [
  //   { checkMark: true, text: "a minimum of 10 characters" },
  //   { checkMark: true, text: "an uppercase characters" },
  //   { checkMark: false, text: "a lawercase characters" },
  //   { checkMark: true, text: "a number" },
  //   { checkMark: false, text: "a special character" },
  // ];
  return (
    <div className="mb-11">
      <ErrorLine
        className=" text-black/[.87] font-medium"
        text="Your password must contain:"
      />
      <ul>
        {arr.map((el, index) => (
          <LineElements key={index} msg={el} />
        ))}
      </ul>
    </div>
  );
};

export default ErrorFields;
