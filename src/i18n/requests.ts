import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  const locales = ["en", "pt"];

  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: { login: (await import(`../../locales/${locale}/login.json`)).default },
  };
});
