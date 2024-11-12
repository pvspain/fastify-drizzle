import { sql } from "drizzle-orm";
import { check, int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const membersTable = sqliteTable("members", {
  id: text().primaryKey(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  birthDate: real().notNull(),
  email: text().notNull().unique(),
  online: int().notNull(),
  joinDate: real().notNull(),
},
(table) => ({
  online: check("members_online", sql`${table.online} in (0,1)`),
}));

export const friendsTable = sqliteTable("friends", {
  id: text().primaryKey(),
  person: text().notNull().references(() => membersTable.id),
  friend: text().notNull().references(() => membersTable.id),
  beginDate: real().notNull(),
},
(table) => ({
  selfref: check("friend_selfref", sql`${table.person} != ${table.friend}`),
}));

export const groupsTable = sqliteTable("groups", {
  id: text().primaryKey(),
  name: text().notNull().unique(),
  description: text().notNull(),
  creationDate: real().notNull(),
});
