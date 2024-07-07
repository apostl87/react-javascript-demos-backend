const dotenv = require('dotenv')
const Pool = require('pg').Pool;

// Take the correct .env file
dotenv.config()
let envFile = null
if(process.env.NODE_ENV=='development') {
  envFile = `.env.localdb`;
  //envFile = `.env.remotedb`;
} else {
  envFile = `.env`;
}
dotenv.config({path: envFile})

console.log("Env File: " + envFile)
console.log("Database ", process.env.POSTGRES_DATABASE)
console.log("SSL ", process.env.POSTGRES_USE_SSL)

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  ssl: JSON.parse(process.env.POSTGRES_USE_SSL) // parsing "false" is necessary
});

module.exports = {
  pool
};