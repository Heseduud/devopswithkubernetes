const express = require('express');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const axios = require('axios');
const cors = require('cors');

const app = express();
const pool = new Pool();
const port = 5000;

var imgDate = new Date();

const imgPath = path.resolve(__dirname, 'files', 'photo.jpg');
const timestampPath = path.resolve(__dirname, 'files', 'timestamp.txt');

app.use(express.json());
app.use(cors());

// Check if we're in GKE
if (process.env.GKE='true') {
  app.use(express.static('build'));
}

const checkDay = () => {
  const dateNow = new Date();
  if (fs.existsSync(timestampPath)) {
    const timestamp = fs.readFileSync(timestampPath).toString();
    if (dateNow.toISOString().substring(0, 10) !== timestamp) {
      fs.writeFileSync(timestampPath, `${dateNow.toISOString().substring(0, 10)}`);
      return false;
    } else {
      return true;
    }
  } else {
    fs.writeFileSync(timestampPath, `${dateNow.toISOString().substring(0, 10)}`);
    return false;
  }
};

const downloadImage = async () => {
  const url = 'https://picsum.photos/400/600.jpg';
  if (fs.existsSync(imgPath)) {
    try {
      fs.unlinkSync(imgPath);
    } catch (e) {
      console.log(e);
    }
  }

  const writer = fs.createWriteStream(imgPath);

  const res = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  res.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

app.post('/api/todos', (req, res) => {
  pool.query('INSERT INTO todos (todo) VALUES ($1)', [req.body.todo], (err, resdb) => {
    if (err) {
      console.log(err);
    }

    if (req.body.todo.length > 140) {
      console.log(`Recieved message over 140 characters: ${req.body.todo}`);
      res.status(403).send('Todo too long');
    } else {
      console.log(`Recieved todo: ${req.body.todo}`);
      res.status(201).send('Insert succesful');
    }
  })
});

app.get('/api/todos', (req, res) => {
  pool.query('SELECT * FROM todos ORDER BY ID ASC', (err, resdb) => {
    if (err) {
      console.log(err);
    }

    res.status(200).json(resdb.rows)
  })
})

app.get('/api/getImage', async (req, res) => {
  if (checkDay() && fs.existsSync(imgPath)) {
    res.sendFile(imgPath);
  } else {
    imgDate = new Date();

    await downloadImage()
    res.sendFile(imgPath);
  }
});

app.get('/api', (req, res) => {
  res.send('<p>Working as intended!</p>');
});

// Healthcheck endpoint for kube probes
app.get('/healthz', (req, res) => {
  console.log('healthcheck');
  pool.query('SELECT * FROM todos', (err, dbres) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    // We have Db connection AND todos schema/table exists
    if (dbres.rows) {
      console.log('healthcheck passed');
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);

  pool.query('CREATE SCHEMA IF NOT EXISTS todos', (err, res) => {
    if (err) {
      console.log(err);
      // throw err;
    }
  });

  pool.query(`CREATE TABLE IF NOT EXISTS todos (
    ID SERIAL PRIMARY KEY,
    todo VARCHAR NOT NULL
  )`, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
});