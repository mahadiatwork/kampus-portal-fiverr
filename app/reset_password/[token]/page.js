import React from "react";

import { sign, verify } from "@/app/lib/utils";
import Component from "./component";

const ResetPassword = async ({ params }) => {
  const tokenValue = await verify(params.token, process.env.JWT_SECRET);

  console.log({ tokenValue });

  const issuedTime = new Date(tokenValue.iat * 1000).getTime();
  const currentTime = new Date().getTime();

  const diffInMilliseconds = currentTime - issuedTime;
  const diffInMinutes = (diffInMilliseconds / 60000).toFixed(1);
  const diffInSeconds = diffInMinutes * 60;

  console.log({
    diffInMinutes,
    diffInSeconds,
  });
  if (diffInMinutes > 5.0) {
    console.log("5 minutes exceeds");
    return <Component tokenExpired={true} />;
  }

  return (
    <div className="bg-ellipse">
      <Component
        data={tokenValue}
        tokenExpired={false}
        seconds={300 - diffInSeconds}
      />
    </div>
  );
};

export default ResetPassword;
