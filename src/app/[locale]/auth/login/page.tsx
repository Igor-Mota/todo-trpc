"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import View from "./view";
import { ILogin } from "@/interfaces/auth";
import { useToast } from "@/app/providers/toast.provider";

interface IParams {
  params: Promise<{
    locale: string;
  }>;
}

export default function LoginPage({ params }: IParams) {
  const { locale } = React.use(params);
  const { showToast } = useToast();
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ILogin) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      showToast({ message: "" + result?.error?.toString(), type: "error" });
    }

    setIsLoading(false);
    if (result?.ok) {
      navigate.push(`/${locale}/dashboard`);
    }
  };

  const viewProps = {
    data: {
      locale,
      isLoading,
    },
    handles: {
      onSubmit,
    },
  };

  return <View {...viewProps} />;
}
