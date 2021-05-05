const express = require('express');
const app = express();
const port = 3002;
const { Pool } = require('pg');

const pool = new Pool();
var counter = 0;

app.get('/pingpong/', (req, res) => {
  counter++;
  pool.query('UPDATE counter SET counter = $1 WHERE id = true', [counter], (err, res) => {
    if (err) {
      console.log(err);
    }
  });

  res.send(`<p>pong ${counter}</p>`);
});

app.get('/pingpong/pongs', (req, res) => {
  pool.query('SELECT * FROM counter', (err, dbres) => {
    if (err) {
      console.log(err);
    }
    
    // Not the right way to do it but w.e. should work bc only 1 row should exist
    res.send({ pongs: `Ping / Pongs: ${dbres.rows[0].counter}` });
  });
});

// Healthcheck endpoint for kubernetes, checks if db connection established
app.get('/healthz', (req, res) => {
  pool.query('SELECT * FROM counter', (err, dbres) => {
    // No connection to db if we get error
    if (err) {
      res.sendStatus(500);
    }

    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
  // Create schema if doesn't exist
  pool.query('CREATE SCHEMA IF NOT EXISTS pingpong', (err, res) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });

  // Create table if doesn't exist, makeshift restriction to allow just 1 row
  // https://stackoverflow.com/questions/25307244/how-to-allow-only-one-row-for-a-table
  pool.query(`CREATE TABLE IF NOT EXISTS counter (
    ID BOOL PRIMARY KEY DEFAULT TRUE,
    counter INTEGER NOT NULL DEFAULT '0',
    CONSTRAINT onerow_uni CHECK (ID)
  )`, (err, res) => {
    if (err) {
      console.log(err);
    }

    console.log(res);

    pool.query(`INSERT INTO counter (counter)
    VALUES (0)`, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  });

  pool.query('SELECT * FROM counter', (err, res) => {
    if (err) {
      console.log(err);
    }

    console.log(res);

    if (res.rows[0].counter) {
      counter = res.rows[0].counter;
    } else {
      counter = 0;
    }
  })
});