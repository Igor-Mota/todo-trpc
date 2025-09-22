"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { ToastProvider } from "./toast.provider";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { pacerDevtoolsPlugin } from "@tanstack/react-pacer-devtools";

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_URL}/api/trpc` || "localhost:3000/api/trpc",
        }),
      ],
    })
  );

  const isDev = process.env.NODE_ENV === "development";

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ToastProvider>{children}</ToastProvider>
        </SessionProvider>

        {isDev && (
          <TanStackDevtools eventBusConfig={{ debug: false }} plugins={[pacerDevtoolsPlugin(), { name: "TanStack Query", render: <ReactQueryDevtoolsPanel /> }].filter(Boolean)} />
        )}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
