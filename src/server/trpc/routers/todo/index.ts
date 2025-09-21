import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";
import { todoSchema } from "@/schemas/todo";
import { find } from "./find";
import { findMany } from "./findMany";
import { create } from "./create";
import { remove } from "./remove";
import { update } from "./update";

export const todoRouter = router({
  findMany: protectedProcedure.query(findMany),
  find: protectedProcedure.query(find),
  create: protectedProcedure.input(todoSchema).mutation(create),
  update: protectedProcedure.input(todoSchema).mutation(update),
  remove: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(remove),
});
