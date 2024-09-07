"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LinkButton from "@/components/atoms/LinkButton";
import SingleField from "@/components/molecules/SingleField";
import PageTitle from "@/components/molecules/PageTitle";
import { Button } from "@/components/atoms/button";
import { Form, useForm, FormField } from "@/components/atoms/form";
import { sign, verify } from "@/app/lib/utils";
import ErrorLine from "@/components/atoms/ErrorLine";
import Divider from "@/components/atoms/Divider";
import CustomTimer from "./timer";
import FilterPassword from "@/./helper/FilterPassword";
import RegexPattern from "@/./helper/RegexPattern";
import ErrorFields from "@/components/atoms/ErrorFields";
import RedTick from "@/components/atoms/RedTick";
import GreenTick from "@/components/atoms/GreenTick";
import TokenExpiredPage from "./TokenExpiredPage";

// const component = ({ data, tokenExpired, seconds }) => {
//   const [password, setPassword] = useState("");
//   const [password_repeat, set_password_repeat] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);
//   const router = useRouter();

//   if (tokenExpired) {
//     return (
//       <div>
//         <p>Token Expired</p>
//         <button onClick={() => router.push("/dashboard")}>Go To Logout</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <input
//         placeholder="password"
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//       />
//       <input
//         placeholder="Password Repeat"
//         onChange={(e) => {
//           set_password_repeat(e.target.value);
//         }}
//         value={password_repeat}
//       />
//       <button
//         onClick={async () => {
//           const { email, record_id, name } = data;

//           fetch("../api/reset_password", {
//             method: "POST",
//             body: JSON.stringify({
//               password,
//               password_repeat,
//               email,
//               name,
//               record_id,
//             }),
//           })
//             .then((res) => {
//               return res.json();
//             })
//             .then((res) => {
//               console.log({ res });
//               if (res.ok) {
//                 return router.push("/dashboard");
//               }
//             });
//         }}
//       >
//         Save
//       </button>
//       <p style={{ color: "#fff" }}>token expires in</p>{" "}
//       <CustomTimer propTime={seconds} />
//     </div>
//   );
// };

// export default component;

const formSchema = z.object({
  password: z.any(),
  password_repeat: z.any(),
});

const ResetPassword = ({ data, tokenExpired, seconds }) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      password_repeat: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const { email, record_id, name } = data;

    setBtnDisabled(true);
    fetch("../api/reset_password", {
      method: "POST",
      body: JSON.stringify({
        password: values.password,
        password_repeat: values.password_repeat,
        email,
        name,
        record_id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setBtnDisabled(false);
        console.log({ res });
        if (res.ok) {
          return router.push("/");
        }
      });
  }
  if (tokenExpired) {
    return <TokenExpiredPage />;
  }

  return (
    <>
      <div className="bg-[#FFFFFF] rounded-3xl p-4 md:p-9 w-full sm:w-[576px]">
        <PageTitle
          headerText="Set your new password"
          helperText="Lets’s Set your new password"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <SingleField
                  field={field}
                  title="Password"
                  type="password"
                  placeholder="Enter your password"
                  className="mb-6"
                />
              )}
            />
            <FormField
              control={form.control}
              name="password_repeat"
              render={({ field }) => (
                <SingleField
                  field={field}
                  title="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  className="mb-4"
                />
              )}
            />
            <div>
              <p className="text-[#00000099] mb-2 font-medium">
                Your password must contain:
              </p>

              {FilterPassword({
                RegexPattern,
                password: form.watch().password,
                passwordRepeat: form.watch().password_repeat,
              }).map((pattern, index) => (
                <div className="flex space-x-1 items-center">
                  {pattern.checkMark ? <GreenTick /> : <RedTick />}
                  <p className="text-base text-[#00000099] font-medium">
                    {pattern.text}
                  </p>
                </div>
              ))}
            </div>

            <Button
              className="w-full mb-4 text-white mt-8"
              btnDisabled={btnDisabled}
              disabled={
                FilterPassword({
                  RegexPattern,
                  password: form.watch().password,
                  passwordRepeat: form.watch().password_repeat,
                }).some((pattern) => pattern.checkMark === false) || false
              }
            >
              Save password
            </Button>
          </form>
        </Form>
        <Divider />
        <p className="font-normal text-sm text-black/[.6] text-center">
          Kindly reset your password within a 5-minute time frame.
        </p>
        <p className="text-base font-semibold text-black/[.6] text-center">
          Time remaining:{" "}
          <span className="text-[#D32F2F]">
            <CustomTimer propTime={seconds} />
          </span>
        </p>
      </div>
    </>
  );
};
export default ResetPassword;
