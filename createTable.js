const pool = require('./db')

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year VARCHAR(4) NOT NULL,
    journal VARCHAR(255) NOT NULL,
    research_questions TEXT NOT NULL,
    aims_or_findings TEXT NOT NULL,
    contributions TEXT NOT NULL,
    theory_or_framework TEXT NOT NULL,
    data VARCHAR(1000) NOT NULL,
    method VARCHAR(500),
    variables TEXT NOT NULL,
    other_notes TEXT NOT NULL,
    keywords_or_tags VARCHAR(255) NOT NULL,
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const dropUsersTable = `DROP TABLE IF EXISTS articles;`;

pool.query(`${dropUsersTable}${createUsersTable}`, (err) => {
  console.error(err);
  pool.end();
  console.log('Done dropping and creating tables');
});
