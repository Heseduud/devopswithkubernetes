const fs = require('fs');
const crypto = require('crypto');

const rs = crypto.randomBytes(20).toString('hex');

const writeIntoFile = () => {
  const date = new Date();
  fs.writeFile('./files/logs.txt', `${date.toISOString()} - ${rs}`, (e) => { if (e) console.log(e); });

  setTimeout(writeIntoFile, 5000);
}

writeIntoFile();