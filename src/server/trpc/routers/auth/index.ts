import { registerSchema, loginSchema } from "@/schemas/auth";
import { publicProcedure, protectedProcedure, router } from "../../trpc";
import { register } from "./register.user";
import { me } from "./me";
import { login } from "./login";

export const authRouter = router({
  register: publicProcedure.input(registerSchema).mutation(register),
  login: publicProcedure.input(loginSchema).mutation(login),
  me: protectedProcedure.query(me),
});
