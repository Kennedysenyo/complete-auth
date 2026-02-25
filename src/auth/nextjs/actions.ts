"use client";

import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema, signUpSchema } from "./schema";
import { db } from "@/db/db";
import { UserTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null) return "Account already exists for this email";

  redirect("/");
}

export async function LogOut() {
  // Do something
  redirect("/");
}
