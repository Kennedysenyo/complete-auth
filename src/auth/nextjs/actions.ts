"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema } from "./schema";
import { db } from "@/db/db";
import { UserTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "../core/passwordHasher";
import { SignUpData } from "./validations";
import { generateSalt } from "../core/saltGenerator";
import { createUserSession } from "../core/session";
import { cookies } from "next/headers";

export async function SignIn(unsafeData: z.Infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) {
    return "Unable to log in";
  }
  // Do something
  redirect("/");
}

export async function signUp(data: SignUpData): Promise<string | null> {
  try {
    console.log(data);
    const existingUser = await db.query.UserTable.findFirst({
      where: eq(UserTable.email, data.email),
    });

    if (existingUser) return "Account already exists for this email";

    const salt = generateSalt();

    const hashedPassword: string = await hashPassword(data.password, salt);
    console.log(hashedPassword);

    const [user] = await db
      .insert(UserTable)
      .values({
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    // console.log(user);
    if (user === null) return "Unable to create account";

    const cookieStore = await cookies();

    await createUserSession(user, cookieStore);

    return null;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return error as string;
  }
}

export async function LogOut() {
  // Do something
  redirect("/");
}
