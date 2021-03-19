const crypto = require('crypto');
const rs = crypto.randomBytes(20).toString('hex');

const getString = () => {
  const date = new Date();
  console.log(date.toISOString() + ' ' + rs);

  setTimeout(getString, 5000);
}

getString();