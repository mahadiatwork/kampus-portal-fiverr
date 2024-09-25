"use client"; // Ensure this is a client component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import LinkButton from "@/components/atoms/LinkButton";
import SingleField from "@/components/molecules/SingleField";
import PageTitle from "@/components/molecules/PageTitle";
import { Button } from "@/components/atoms/button";
import { Form, useForm, FormField } from "@/components/atoms/form";
import ErrorLine from "@/components/atoms/ErrorLine";
import SuccessText from "@/components/atoms/SuccessText";
import BackIcon from "/public/back-icon.svg";

// export default Login;
const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/login");
      }, 5000);
    }
  }, [successMessage]);

  // 1. Define your form.
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ form, getValues: form.getValues() });
    console.log(values);
    setBtnDisabled(true);
    fetch("../api/forgotPassword", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setBtnDisabled(false);
        if (!res.ok) return setErrorMessage(res.error);
        console.log({ res });
        if (res.ok) {
          setSuccessMessage(res.message);
        }
      });
  }

  return (
    <div className="bg-ellipse">
      <div className="bg-[#FFFFFF] rounded-3xl p-4 md:p-9 w-full sm:w-[576px]">
        <LinkButton
          onClick={() => router.back()}
          className="font-medium text-base mb-8 hover:underline flex space-x-2 items-center"
        >
          <Image src={BackIcon} alt="back icon" width={12} priority />
          <p>Retour à la connexion</p>
        </LinkButton>

        <PageTitle
          headerText="Mot de passe oublié"
          helperText="Entrez l'adresse e-mail que vous avez utilisée pour vous inscrire sur le portail, et nous vous enverrons les instructions pour réinitialiser votre mot de passe."
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
                  className="mb-6"
                />
              )}
            />
            <Button
              type="submit"
              btnDisabled={btnDisabled}
              className="w-full mb-4 text-white"
            >
              Réinitialiser mon mot de passe
            </Button>
          </form>
        </Form>
        <ErrorLine className="mb-3 text-center">{errorMessage}</ErrorLine>

        <SuccessText className="mb-3 text-center">{successMessage}</SuccessText>
      </div>
    </div>
  );
};

export default ForgotPassword;
