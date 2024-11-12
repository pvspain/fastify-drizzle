import { faker } from '@faker-js/faker';

const getStringElements = (a: string[], count: number) =>
  faker.helpers.arrayElements(a, count);
const MEMBERS: string[] = [];
const getMembers = (count: number) => getStringElements(MEMBERS, count);

export function createMember() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const id = faker.string.uuid();
  MEMBERS.push(id);

  return {
    id,
    firstName,
    lastName,
    birthDate: faker.date
      .birthdate({ mode: 'age', min: 15, max: 85 })
      .getTime(),
    email: faker.internet.email({ firstName: firstName, lastName: lastName }),
    online: faker.datatype.boolean(),
    joinDate: faker.date.recent().getTime(),
  };
}

export function createFriend() {
  const id = faker.string.uuid();
  const [person, friend] = getMembers(2);
  return {
    id,
    person,
    friend,
    beginDate: faker.date.recent().getTime(),
  };
}

export function createGroup() {
  const id = faker.string.uuid();
  return {
    id,
    name: faker.lorem.lines(1),
    description: faker.lorem.lines({ min: 1, max: 5 }),
    creationDate: faker.date.recent().getTime(),
  };
}

export const seed = {
  members: faker.helpers.multiple(createMember, { count: 500 }),
  friends: faker.helpers.multiple(createFriend, { count: 1000 }),
  groups: faker.helpers.multiple(createGroup, { count: 200 }),
};
