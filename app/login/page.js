"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LinkButton from "@/components/atoms/LinkButton";
import SingleField from "@/components/molecules/SingleField";
import PageTitle from "@/components/molecules/PageTitle";
import { Button } from "@/components/atoms/button";
import { Form, useForm, FormField } from "@/components/atoms/form";
import ErrorLine from "@/components/atoms/ErrorLine";
import logo from "../../public/assets/Kampus logo.png";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 4000);
  }, [errorMessage]);

  // Define your form
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define a submit handler
  function onSubmit(values) {
    console.log({ form, getValues: form.getValues() });
    console.log(values);
    setBtnDisabled(true);

    fetch("../api/login", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        setBtnDisabled(false);
        // If something went wrong
        if (!res.ok) return setErrorMessage(res.error);
        console.log({ res, path: res.path });

        router.push(`/reset_password/${res.path}`);
      });
  }

  return (
    <div className="bg-ellipse">
      <div className="bg-[#623CEA] rounded-3xl p-4 md:p-9 w-full sm:w-[576px]">
        <div className="flex justify-center">
          <Image
            src={logo} // Path relative to the public directory
            alt="Logo Kampus"
            width={200} // Desired width of the image
            height={100} // Desired height of the image
            priority // Optional: if you want to prioritize loading of this image
          />
        </div>
        <PageTitle
          headerText="Connectez-vous à votre compte"
          className="text-white"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <SingleField
                  field={field}
                  title="Email"
                  placeholder="exemple@xyz.com"
                  className="mb-6 text-white"
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <SingleField
                  type="password"
                  field={field}
                  title="Mot de passe"
                  placeholder="Entrez votre mot de passe"
                  className="mb-3 text-white"
                />
              )}
            />
            <LinkButton
              onClick={() => {
                router.push("/forgotpassword");
              }}
              className="text-right text-[#fff] mb-6 hover:underline"
            >
              Mot de passe oublié
            </LinkButton>

            <Button
              type="submit"
              btnDisabled={btnDisabled}
              className="w-full mb-4 text-[#00000]"
            >
              Connexion
            </Button>
          </form>
        </Form>

        {/* Register Link */}
        <div className="text-center mt-4 text-white">
          Vous n'avez pas de compte ?{" "}
          <LinkButton
            onClick={() => {
              router.push("/register");
            }}
            className="text-[#FFCF56] hover:underline"
          >
            Inscrivez-vous
          </LinkButton>
        </div>

        <ErrorLine className="text-center">{errorMessage}</ErrorLine>
      </div>
    </div>
  );
};

export default LoginPage;
