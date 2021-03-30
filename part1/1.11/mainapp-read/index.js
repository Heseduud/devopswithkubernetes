const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.get('/', (r, s) => {
  const dataTimeHash = fs.readFileSync('./files/logs.txt', 'utf-8');
  const dataPingPong = fs.readFileSync('./files/ponglogs.txt', 'utf-8');
  s.send(`<p>${dataTimeHash} \n ${dataPingPong}</p>`);
});

app.listen(port, () => { console.log(`Server started in port ${port}`); });