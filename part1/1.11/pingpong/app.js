const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

var counter = 0;

app.get('/', (req, res) => {
  counter++;
  res.send(`pong ${counter}`);
  fs.writeFile('./files/ponglogs.txt', `Ping / Pongs: ${counter}`, (e) => {
    if (e) console.log(e);
  });
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});