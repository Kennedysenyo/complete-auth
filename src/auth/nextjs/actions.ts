"use server";

import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { UserTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePasswords, hashPassword } from "../core/passwordHasher";
import { SignInData, SignUpData } from "./validations";
import { generateSalt } from "../core/saltGenerator";
import { createUserSession } from "../core/session";
import { cookies } from "next/headers";

export async function signIn(data: SignInData) {
  try {
    const [user] = await db
      .select({
        id: UserTable.id,
        email: UserTable.email,
        role: UserTable.role,
        salt: UserTable.salt,
        password: UserTable.password,
      })
      .from(UserTable)
      .where(eq(UserTable.email, data.email))
      .limit(1);

    if (!user) return "Wrong user credentials";

    const isCorrectPassword = await comparePasswords({
      password: data.password,
      salt: user.salt,
      hashedPassword: user.password,
    });

    if (!isCorrectPassword) {
      return "Wrong user credentials";
    }

    await createUserSession(user, await cookies());

    return null;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return error as string;
  }
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
    // console.log(hashedPassword);

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
