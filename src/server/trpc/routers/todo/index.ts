import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";
import { todoCreateSchema, todoSchema, todoUpdateSchema } from "@/schemas/todo";
import { find } from "./find";
import { findMany } from "./findMany";
import { create } from "./create";
import { remove } from "./remove";
import { update } from "./update";

export const todoRouter = router({
  findMany: protectedProcedure.query(findMany),
  find: protectedProcedure.query(find),
  create: protectedProcedure.input(todoCreateSchema).mutation(create),
  update: protectedProcedure.input(todoUpdateSchema).mutation(update),
  remove: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(remove),
});
