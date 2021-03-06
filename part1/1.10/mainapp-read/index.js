const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.get('/', (r, s) => {
  const data = fs.readFileSync('./files/logs.txt', 'utf8');
  r.send(`<p>${data}</p>`);
});
app.listen(port, () => { console.log(`Server started in port ${port}`); });