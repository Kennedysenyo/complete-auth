import { z } from "zod";

const Server = z.object({
  REDIS_URL: z.string().min(1),
  REDIS_TOKEN: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

type SeverEnv = z.infer<typeof Server>;

export const env: SeverEnv = {
  REDIS_URL: process.env.UPSTASH_REDIS_REST_URL!,
  REDIS_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,
  DATABASE_URL: process.env.DATABASE_URL!,
};
