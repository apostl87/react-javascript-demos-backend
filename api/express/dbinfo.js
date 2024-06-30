const Pool = require('pg').Pool;
const localdb = require('../../.env.postgres-local');

const pool = new Pool({
  user: localdb.user,
  host: 'localhost',
  database: 'my_database',
  password: 'postgres',
  port: 5432,
});

module.exports = {
  pool
};