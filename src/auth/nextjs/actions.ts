"use client";

import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema, signUpSchema } from "./schema";

export async function SignIn(unsafeData: z.Infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) {
    return "Unable to log in";
  }
  // Do something
  redirect("/");
}

export async function SignUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Unable to sign up";
  // Do Something

  redirect("/");
}

export async function LogOut() {
  // Do something
  redirect("/");
}
