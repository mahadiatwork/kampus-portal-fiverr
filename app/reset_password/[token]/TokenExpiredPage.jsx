"use client";
import Image from "next/image";
import React from "react";
import PageTitle from "@/components/molecules/PageTitle";
import { Button } from "@/components/atoms/button";
import TokenExpiredImage from "@/components/atoms/TokenExpired";
import BackIcon from "/public/back-icon.svg";
import { useRouter } from "next/navigation";

const TokenExpiredPage = () => {
  const router = useRouter();
  return (
    <div className="bg-ellipse">
      <div className="bg-[#FFFFFF] rounded-3xl p-4 md:p-9 w-full sm:w-[576px]">
        <TokenExpiredImage />
        <PageTitle
          headerText="Your Token Has Expired"
          helperText=" your password reset link has expired after 5 minutes. To resolve this issue, please proceed to the login page and initiate the password reset process once more."
        />

        <Button
          type="submit"
          onClick={() => router.replace("/login")}
          className="w-full mb-4 text-white flex space-x-2 items-center"
        >
          <Image src={BackIcon} alt="back icon" width={12} priority />
          <p>Back to Sign In</p>
        </Button>
      </div>
    </div>
  );
};

export default TokenExpiredPage;
