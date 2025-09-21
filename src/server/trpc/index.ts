import { router } from "./trpc";
import { authRouter } from "./routers/auth/index";
import { todoRouter } from "./routers/todo/index";
import { todoListRouter } from "./routers/todoList/index";

export const appRouter = router({
  auth: authRouter,
  todoList: todoListRouter,
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
