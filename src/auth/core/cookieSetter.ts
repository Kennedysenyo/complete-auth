"use server";

import { CookiesType } from "./session";
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from "./utils";

export async function setCookie(
  sessioId: string,
  cookies: Pick<CookiesType, "set">,
) {
  cookies.set(COOKIE_SESSION_KEY, sessioId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}
