"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/providers/toast.provider";
import { useTranslations } from "next-intl";
import { IRegister } from "@/interfaces/auth";
import { trpc } from "@/utils/trpc";
import View from "./view";
import { signIn } from "next-auth/react";
import { set } from "zod";

interface IParams {
  params: Promise<{
    locale: string;
  }>;
}

export default function RegisterPage({ params }: IParams) {
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = React.use(params);
  const t = useTranslations("login");
  const { mutateAsync, reset } = trpc.auth.register.useMutation();
  const { showToast } = useToast();
  const navigate = useRouter();

  const onSubmit = async (data: IRegister) => {
    setIsLoading(true);
    try {
      const result = await mutateAsync(data);

      if (result.success) {
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (signInResult?.ok) {
          setIsLoading(false);
          navigate.push(`/${locale}/dashboard`);
        }
        if (signInResult?.error) {
          navigate.push(`/${locale}/auth/login`);
        }
      } else {
        showToast({ message: t(result.message), type: "error" });
        reset();
      }
    } catch (error) {
      showToast({ message: t("unexpectedError"), type: "error" });
    }
    setIsLoading(false);
  };

  const viewProps = {
    data: { locale, isLoading },
    handles: {
      onSubmit,
    },
  };

  return <View {...viewProps} />;
}
