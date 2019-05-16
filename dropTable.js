const pool = require('./db')

pool.query(`DROP TABLE IF EXISTS articles;`, (err) => {
  console.error(err);
  pool.end();
  console.log('Done dropping tables');
});


