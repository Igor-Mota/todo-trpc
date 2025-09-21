import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { TrpcProvider } from "@/app/providers/client.provider";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To do app",
  description: "App to do list",
  icons: "/todo-icon.png",
};

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <TrpcProvider>{children}</TrpcProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
