const { drizzle } = require('drizzle-orm/libsql');
const { createClient } = require('@libsql/client');
const { connectorInitializationErrorMessage } = require('../utils/connector');

module.exports = async (opts) => {
  try {
    const connectionString = opts.connectionString;
    const client = createClient({ url: connectionString });
    let handler = drizzle(client);
    return handler;
  } catch (err) {
    throw new Error(connectorInitializationErrorMessage(opts.connector));
  }
};
