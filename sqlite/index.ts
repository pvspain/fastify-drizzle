import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://stackoverflow.com/a/68010217
dotenv.config({ path: path.resolve(__dirname, '.', '.env') });

import { drizzle } from 'drizzle-orm/libsql';
import {
  membersTable,
  friendsTable,
  groupsTable,
} from './db/schema';
import { seed } from './db/seed_data';

const db = drizzle(process.env.DATABASE_URL!);
// const db = drizzle('file:local.db');

async function main() {
  await db.delete(friendsTable);
  await Promise.all([db.delete(groupsTable), db.delete(membersTable)]);

  type Member = typeof membersTable.$inferInsert;
  type Friend = typeof friendsTable.$inferInsert;
  type Group = typeof groupsTable.$inferInsert;

  const insertMember = async (members: Member[]) => {
    return db.insert(membersTable).values(members);
  };
  const insertFriend = async (friends: Friend[]) => {
    return db.insert(friendsTable).values(friends);
  };
  const insertGroup = async (groups: Group[]) => {
    return db.insert(groupsTable).values(groups);
  };

  await Promise.all([insertMember(seed.members), insertGroup(seed.groups)]);
  console.log('New members created!');
  console.log('New groups created!');
  await insertFriend(seed.friends);
  console.log('New friends created!');

  console.log(
    'Getting all members from the database: ',
    await db.select().from(membersTable),
  );
  console.log(
    'Getting all friends from the database: ',
    await db.select().from(friendsTable),
  );
  console.log(
    'Getting all groups from the database: ',
    await db.select().from(groupsTable),
  );
}

let isProduction = /^prod/i,
  environment = process.env.ENVIRONMENT || '';
if (!isProduction.test(environment)) {
  main();
} else {
  console.error("Seed script won't override PRODUCTION data!");
}
