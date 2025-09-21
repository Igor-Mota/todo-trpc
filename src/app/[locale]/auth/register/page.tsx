"use client";

import React from "react";
import { useToast } from "@/app/providers/toast.provider";
import { useTranslations } from "next-intl";
import { IRegister } from "@/interfaces/auth";
import { trpc } from "@/utils/trpc";
import View from "./view";

interface IParams {
  params: Promise<{
    locale: string;
  }>;
}

export default function RegisterPage({ params }: IParams) {
  const { locale } = React.use(params);
  const t = useTranslations("login");
  const { data, mutateAsync, reset } = trpc.auth.register.useMutation();
  const { showToast } = useToast();

  const onSubmit = async (data: IRegister) => {
    await mutateAsync(data);
  };

  if (data && data.success === false) {
    showToast({ message: t(data.message), type: "error" });
    reset();
  }

  console.log(data);
  const viewProps = {
    data: { locale },
    handles: {
      onSubmit,
    },
  };

  return <View {...viewProps} />;
}
