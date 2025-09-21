import { protectedProcedure, router } from "../../trpc";
import { z } from "zod";
import { todoListSchema, createSchema } from "@/schemas/todoList";
import { queryParametersSchema, findSchema } from "@/schemas/query";

import { findMany } from "./findMany";
import { find } from "./find";
import { create } from "./create";
import { remove } from "./remove";
import { update } from "./update";

export const todoListRouter = router({
  findMany: protectedProcedure.input(findSchema).query(findMany),
  find: protectedProcedure.input(queryParametersSchema).query(find),
  create: protectedProcedure.input(createSchema).mutation(create),
  update: protectedProcedure.input(todoListSchema.partial()).mutation(update),
  remove: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(remove),
});
