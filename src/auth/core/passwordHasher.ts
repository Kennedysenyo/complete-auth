import crypto from "crypto";

export const hashPassword = (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hashPassword) => {
      if (error) {
        reject(error);
      }
      resolve(hashPassword.toString("hex"));
    });
  });
};

/**
 * Returns True if password is equal to hashedPassword
 */
export const comparePasswords = async ({
  password,
  salt,
  hashedPassword,
}: {
  password: string;
  salt: string;
  hashedPassword: string;
}) => {
  const hashedInputPassword = await hashPassword(password, salt);
  return crypto.timingSafeEqual(
    Buffer.from(hashedPassword, "hex"),
    Buffer.from(hashedInputPassword, "hex"),
  );
};
