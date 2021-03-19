const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 5000;
const rs = crypto.randomBytes(20).toString('hex');

app.get('/', (req, res) => {
  const date = new Date();
  res.send(`<p>${date.toISOString()} - ${rs}</p>`)
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
  getString();
});

const getString = () => {
  const date = new Date();
  console.log(date.toISOString() + ' ' + rs);

  setTimeout(getString, 5000);
}