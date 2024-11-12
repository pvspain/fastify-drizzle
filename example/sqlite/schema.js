const { sql } = require('drizzle-orm');
const { check, int, real, sqliteTable, text } = require('drizzle-orm/sqlite-core');

const members = sqliteTable(
  'members',
  {
    id: text().primaryKey(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    birthDate: real().notNull(),
    email: text().notNull().unique(),
    online: int().notNull(),
    joinDate: real().notNull()
  },
  (table) => ({
    online: check('members_online', sql`${table.online} in (0,1)`)
  })
);

const friends = sqliteTable(
  'friends',
  {
    id: text().primaryKey(),
    person: text()
      .notNull()
      .references(() => membersTable.id),
    friend: text()
      .notNull()
      .references(() => membersTable.id),
    beginDate: real().notNull()
  },
  (table) => ({
    selfref: check('friend_selfref', sql`${table.person} != ${table.friend}`)
  })
);

const groups = sqliteTable('groups', {
  id: text().primaryKey(),
  name: text().notNull().unique(),
  description: text().notNull(),
  creationDate: real().notNull()
});

module.exports = {
  members,
  friends,
  groups
};
