const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('<p>Working as intended!</p>')
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});