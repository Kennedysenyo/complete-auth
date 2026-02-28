import { sql } from "drizzle-orm";

import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userRoles = ["admin", "user"] as const;
export type UserRole = (typeof userRoles)[number];
// export const userRoleEnum = sqliteEnum("user_roles", userRoles);

export const UserTable = sqliteTable("users", {
  id: text().notNull().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  salt: text().notNull(),
  password: text().notNull(),
  role: text("role", { enum: ["admin", "user"] })
    .notNull()
    .default("user"),
  createdAt: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
