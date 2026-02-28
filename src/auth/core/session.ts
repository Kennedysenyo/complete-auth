"use server";

import { userRoles } from "@/db/schema";
import z from "zod";
import crypto from "crypto";
import { redisClient } from "@/redis/redis";
import { setCookie } from "./cookieSetter";
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from "./utils";

type SessionSchemaType = z.infer<typeof sessionSchema>;

export type CookiesType = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    },
  ) => void;
  get: (key: string) =>
    | {
        name: string;
        value: string;
      }
    | undefined;
  delete: (key: string) => void;
};

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});

export const createUserSession = async (
  user: SessionSchemaType,
  cookies: CookiesType,
) => {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  setCookie(sessionId, cookies);
};

export const getUserFromSession = async (cookie: Pick<CookiesType, "get">) => {
  const sessionId = cookie.get(COOKIE_SESSION_KEY)?.value;

  if (!sessionId) {
    return null;
  }

  return getUserSessionById(sessionId);
};

async function getUserSessionById(sessionId: string) {
  const rawUser = await redisClient.get(`session:${sessionId}`);

  const { success, data: user } = sessionSchema.safeParse(rawUser);

  return success ? user : null;
}
