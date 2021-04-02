const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const axios = require('axios');

const rs = crypto.randomBytes(20).toString('hex');

const app = express();
const port = 3000;

app.get('/', async (r, s) => {
  const d = new Date();
  const dataTimeHash = `${d.toISOString()} - ${rs}`;
  const dataPingPong = await axios.get('http://pingpong-svc/pongs');
  s.send(`<p>${dataTimeHash} \n ${dataPingPong.data.pongs}</p>`);
});

app.listen(port, () => { console.log(`Server started in port ${port}`); });