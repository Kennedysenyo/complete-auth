import crypto from "crypto";

export const generateSalt = (): string => {
  return crypto.randomBytes(16).toString("hex").normalize();
};
