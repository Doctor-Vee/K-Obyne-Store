const express = require('express');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('static'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  const article = req.query.search || 'keyword';
  const x = article.toLowerCase();
  let query = `SELECT * FROM articles WHERE`;
  if (req.query.sTitle){
    query+= ` lower(title) LIKE '%${x}%' OR`;
  }
  if (req.query.sAuthor){
    query+= ` lower(author) LIKE '%${x}%' OR`;
  }
  if (req.query.sYear){
    query+= ` lower(year) LIKE '%${x}%' OR`;
  }
  if (req.query.sJournal){
    query+= ` lower(journal) LIKE '%${x}%' OR`;
  }
  if (req.query.sResearch){
    query+= ` lower(research_questions) LIKE '%${x}%' OR`;
  }
  if (req.query.sAims){
    query+= ` lower(aims_or_findings) LIKE '%${x}%' OR`;
  }
  if (req.query.sContributions){
    query+= ` lower(contributions) LIKE '%${x}%' OR`;
  }
  if (req.query.sTheory){
    query+= ` lower(theory_or_framework) LIKE '%${x}%' OR`;
  }
  if (req.query.sData){
    query+= ` lower(data) LIKE '%${x}%' OR`;
  }
  if (req.query.sMethod){
    query+= ` lower(method) LIKE '%${x}%' OR`;
  }
  if (req.query.sVariables){
    query+= ` lower(variables) LIKE '%${x}%' OR`;
  }
  if (req.query.sOther){
    query+= ` lower(other_notes) LIKE '%${x}%' OR`;
  }
  if (req.query.sKeywords){
    query+= ` lower(keywords_or_tags) LIKE '%${x}%' OR`;
  }
  query+= `DER BY title;`;

if (!req.query.sTitle && !req.query.sAuthor && !req.query.sYear &&
  !req.query.sJournal && !req.query.sResearch && !req.query.sAims &&
  !req.query.sContributions && !req.query.sTheory && !req.query.sData &&
  !req.query.sMethod && !req.query.sVariables && !req.query.sOther &&
  !req.query.sKeywords){
  query = `SELECT * FROM articles WHERE lower(title) LIKE '%search keyword%' ORDER BY title;`;
}
      pool.query( query, (err, result) => {
      if (err) {
        return console.error('error running query', err);
      }
      res.render('search', {
        articles: result.rows,
        keyword: article
      });
    });
  });

app.get('/addnew', (req, res) => {
  let article = {research_questions: 'Fill the details above', title: 'Null', title: 'Null'};
  res.render('addnew', { article });
});

app.get('/viewall', (req, res) => {
  pool.query('SELECT * FROM articles ORDER BY title;', (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    res.render('viewall', {
      articles: result.rows
    });
  });
});

app.post('/addnew', (req, res) => {
  const { title, author, year, journal, research_questions, 
    aims_or_findings, contributions, theory_or_framework, 
    data, method, variables, other_notes, keywords_or_tags } = req.body;
  pool.query(`INSERT INTO articles 
  (title, author, year, journal, research_questions, 
    aims_or_findings, contributions, theory_or_framework, 
    data, method, variables, other_notes, keywords_or_tags) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
    RETURNING *; `,
      [title, author, year, journal, research_questions, 
        aims_or_findings, contributions, theory_or_framework, 
        data, method, variables, other_notes, keywords_or_tags])
    .then((result) => {
      res.render('addnew', {
        article: result.rows[0]
      });
    });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM articles WHERE id = ${id};`;
  pool.query(query, (err) => {
    if (err) {
      return err;
    }
    return res.status(200).send({
      status: 200,
      data: 'deleted successfully',
    });
  });
});

// app.post('/update', (req, res) => {
//   console.log([req.body.name, req.body.summary, req.body.details, req.body.id]);
//   pool.query('UPDATE articles SET name=$1, summary=$2, details=$3 WHERE id=$4 RETURNING *; ',
//       [req.body.name, req.body.summary, req.body.details, req.body.id])
//     .then((result) => {
//       console.log(result.rows)
//       res.render('search', {
//         articles: result.rows,
//         keyword: 'updated article'
//       });
//     });
// });



app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});