import crypto from "crypto";

export const hashPassword = (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hashPassword) => {
      if (error) {
        reject(error.message);
      }
      resolve(hashPassword.toString("hex"));
    });
  });
};
