const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.get('/', (r, s) => { fs.readFile('./files/logs.txt', (e, d) => { if (e) s.send(e); s.send(`<p>${d}</p>`); }); });
app.listen(port, () => { console.log(`Server started in port ${port}`); });