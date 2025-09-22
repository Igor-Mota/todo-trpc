import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../../server/trpc/index";
import { NextRequest } from "next/server";
import { createContext } from "@/server/context";

const applyCors = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
  return res;
};

const handler = async (req: NextRequest) => {
  if (req.method === "OPTIONS") {
    const res = new Response(null, { status: 204 });
    return applyCors(res);
  }

  const res = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

  return applyCors(res);
};

export { handler as GET, handler as POST, handler as OPTIONS };
