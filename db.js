const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});


module.exports = pool;