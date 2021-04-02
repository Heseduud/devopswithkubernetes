const express = require('express');
const fs = require('fs');
const app = express();
const port = 3002;

var counter = 0;

app.get('/', (req, res) => {
  counter++;
  res.send(`<p>pong ${counter}</p>`);
});

app.get('/pongs', (req, res) => {
  res.send({ pongs: `Ping / Pongs: ${counter}` });
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});