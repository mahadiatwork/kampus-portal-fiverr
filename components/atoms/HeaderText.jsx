import React from "react";

const HeaderText = ({ headerText }) => {
  return (
    <h1 className="text-center font-semibold text-2xl md:text-3xl text-white">
      {headerText}
    </h1>
  );
};

export default HeaderText;
