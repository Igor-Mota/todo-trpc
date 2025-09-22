"use client";

import { Controller, useForm } from "react-hook-form";
import { ILogin } from "@/interfaces/auth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LoginInput, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export interface IViewProps {
  data: {
    locale: string;
    isLoading: boolean;
  };
  handles: {
    onSubmit: (data: ILogin) => Promise<void>;
  };
}

export default function View({ data, handles }: IViewProps) {
  const t = useTranslations("login");
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-400 text-white">
      <div className="w-full max-w-md p-8 m-4 space-y-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
        <div className="flex justify-center">
          <svg className="w-14 h-14 text-white drop-shadow-lg mb-2" fill="none" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="4" />
            <path d="M16 24l6 6 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">{t("title")}</h1>
          <p className="mt-2 text-sm text-white/80">
            {t("noAccount")}{" "}
            <Link href={`/${data.locale}/auth/register`} className="font-semibold text-yellow-300 hover:underline transition">
              {t("signUp")}
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(handles.onSubmit)} className="space-y-6">
          <div>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("email")}
                  className="relative block w-full px-3 py-3 bg-white/80 border border-white/30 rounded-lg shadow-sm appearance-none text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm transition"
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={t("password")}
                  className="relative block w-full px-3 py-3 bg-white/80 border border-white/30 rounded-lg shadow-sm appearance-none text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm transition"
                />
              )}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div />
            <div className="text-sm">
              <a href="#" className="font-medium text-yellow-300 hover:underline transition">
                {t("forgotPassword")}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={data.isLoading}
              className={`cursor-pointer flex justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 border border-transparent rounded-lg shadow-md hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300
                ${data.isLoading ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              {data.isLoading ? (
                <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : null}
              {t("signIn")}
            </button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white/10 text-white/80 backdrop-blur">{t("orContinueWith")}</span>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-3 font-medium text-indigo-700 bg-white border border-white/30 rounded-lg shadow-sm hover:bg-yellow-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
          >
            <svg className="w-5 h-5 mr-3" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 172.9 56.9L365.7 119.6c-26.2-25.2-62.8-41.2-117.7-41.2-93.8 0-170.3 76.5-170.3 170.3s76.5 170.3 170.3 170.3c107.8 0 143.8-74.3 149.3-112.3H248v-69.8h239.2c4.2 22.9 6.8 46.9 6.8 73.8z"
              ></path>
            </svg>
            {t("signInWithGoogle")}
          </button>
        </div>
      </div>
    </div>
  );
}
