const mysql = require('mysql');
const express = require('express');

const USE_LOCAL = false;
const host = USE_LOCAL ? 'localhost' : 'bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
const user = USE_LOCAL ? 'root' : 'xravf7yqc3o91e7h';
const password = USE_LOCAL ? 'password' : 'n1318e8kw0n3xsnl';
const database = USE_LOCAL ? 'bookshelf' : 'eb74ljv8f0xthcpq';

const connection = mysql.createConnection({ host, user, password, database });

connection.connect();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.listen(port, () => console.log(`Server listening on PORT ${port}`));

/* ----- Book Routes ----- */

app.get('/books', (_req, res, next) => {
  const sql = 'call fetch_books();';
  connection.query(sql, (error, results, _fields) => {
    if (error) next(error);

    const json = results[0].map((row) => ({
      ...row,
      authors: JSON.parse(row.authors),
      genres: JSON.parse(row.genres),
    }));

    res.send(json);
  });
});

app.post('/books', (req, res, next) => {
  const book = req.body;
  const { title, image, description, authors, genres } = book;

  const sql = 'call add_book(?, ?, ?, ?, ?);';
  connection.query(
    sql,
    [title, image, description, JSON.stringify(authors), JSON.stringify(genres)],
    (error, _results, _fields) => {
      if (error) next(error);
      res.send();
    }
  );
});

app.post('/books/:book_id', (req, res, next) => {
  const book = req.body;
  const id = req.params.book_id;
  const { title, image, description, authors, genres } = book;

  const sql = 'call update_book(?, ?, ?, ?, ?, ?);';
  connection.query(
    sql,
    [id, title, image, description, JSON.stringify(authors), JSON.stringify(genres)],
    (error, _results, _fields) => {
      if (error) next(error);
      res.send();
    }
  );
});

app.delete('/books/:book_id', (req, res, next) => {
  const id = req.params.book_id;

  const sql = 'call delete_book(?);';
  connection.query(sql, [id], (error, _results, _fields) => {
    if (error) next(error);
    res.send();
  });
});

/* ----- User Routes ----- */

app.get('/users', (_req, res, next) => {
  const sql = 'call fetch_users();';
  connection.query(sql, (error, results, _fields) => {
    if (error) next(error);

    const json = results[0].map((row) => ({ ...row }));
    res.send(json);
  });
});

/* ----- Genre Routes ----- */

app.get('/genres', (_req, res, next) => {
  const sql = 'call fetch_genres();';
  connection.query(sql, (error, results, _fields) => {
    if (error) next(error);

    const json = results[0].map((row) => ({ ...row }));
    res.send(json);
  });
});

/* ----- Review Routes ----- */

app.get('/reviews/:book_id', (req, res, next) => {
  const id = req.params.book_id;

  const sql = 'call fetch_reviews(?);';
  connection.query(sql, [id], (error, results, _fields) => {
    if (error) next(error);

    const json = results[0].map((row) => ({ ...row }));
    res.send(json);
  });
});

app.post('/reviews/:book_id', (req, res, next) => {
  const review = req.body;
  const id = req.params.book_id;
  const { user_id, rating, review_text } = review;

  const sql = 'call update_review(?, ?, ?, ?);';
  connection.query(sql, [id, user_id, rating, review_text], (error, _results, _fields) => {
    if (error) next(error);
    res.send();
  });
});

app.delete('/reviews/:book_id', (req, res, next) => {
  const id = req.params.book_id;
  const { user_id } = req.body;

  const sql = 'call delete_review(?);';
  connection.query(sql, [id, user_id], (error, _results, _fields) => {
    if (error) next(error);
    res.send();
  });
});
