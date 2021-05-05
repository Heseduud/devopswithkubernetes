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
  const dataPingPong = await axios.get('http://pingpong-svc/pingpong/pongs');
  const envMsg = process.env.MESSAGE;
  s.send(`<p> ${envMsg} \n ${dataTimeHash} \n ${dataPingPong.data.pongs}</p>`);
});

app.get('/healthz', async (req, res) => {
  try {
    const check = await axios.get('http://pingpong-svc/healthz');
    if (check.status == 200) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.listen(port, () => { console.log(`Server started in port ${port}`); });