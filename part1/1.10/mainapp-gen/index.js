const fs = require('fs');
const crypto = require('crypto');

const rs = crypto.randomBytes(20).toString('hex');

const createFile = () => {
  fs.open('./files/logs.txt', 'w', (e, f) => {
    if (e) throw e;
  })
}

const writeIntoFile = () => {
  const date = new Date();
  fs.appendFile('./files/logs.txt', `${date.toISOString()} - ${rs} \n`, (e) => { if (e) throw e; });

  setTimeout(writeIntoFile, 5000);
}

createFile();
writeIntoFile();