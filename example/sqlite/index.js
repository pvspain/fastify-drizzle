const fastify = require('fastify')({ logger: true });
const dbURI = 'file:sqlite/local.db';
const connector = 'sqlite';

fastify.register(require('../../'), { connectionString: dbURI, connector }, (err) => fastify.log.error(err));

const db = require('./schema.js');

const drizzleConnectionInfo = (fastify) => {
  const drizzleClient = fastify.drizzle;
  return {
    connector,
    instance: drizzleClient
  };
};

fastify.get('/', async (request, reply) => {
  const drizzle = drizzleConnectionInfo(fastify);
  fastify.log.info(JSON.stringify(drizzle));
  reply.send(JSON.stringify(drizzle, null, 2));
});

fastify.get('/members', async (request, reply) => {
  const result = await fastify.drizzle.select().from(db.members);
  reply.send(JSON.stringify(result, null, 2))
});

fastify.get('/friends', async (request, reply) => {
  const result = await fastify.drizzle.select().from(db.friends);
  reply.send(JSON.stringify(result, null, 2))
});

fastify.get('/groups', async (request, reply) => {
  const result = await fastify.drizzle.select().from(db.groups);
  reply.send(JSON.stringify(result, null, 2))
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
