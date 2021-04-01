const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 5000;

var imgDate = new Date();
const imgPath = path.resolve(__dirname, 'files', 'photo.jpg');
const timestampPath = path.resolve(__dirname, 'files', 'timestamp.txt');

app.use(express.json());
app.use(express.static('build'));

app.get('/api/', (req, res) => {
  res.send('<p>Working as intended!</p>');
});

const checkDay = () => {
  const dateNow = new Date();
  if (fs.existsSync(timestampPath)) {
    const timestamp = fs.readFileSync(timestampPath).toString();
    if (dateNow.toISOString().substring(0, 10) !== timestamp) {
      fs.writeFileSync(timestampPath, `${dateNow.toISOString().substring(0, 10)}`);
      return false;
    } else {
      return true;
    }
  } else {
    fs.writeFileSync(timestampPath, `${dateNow.toISOString().substring(0, 10)}`);
    return false;
  }
};

const downloadImage = async () => {
  const url = 'https://picsum.photos/400/600.jpg';
  if (fs.existsSync(imgPath)) {
    try {
      fs.unlinkSync(imgPath);
    } catch (e) {
      console.log(e);
    }
  }

  const writer = fs.createWriteStream(imgPath);

  const res = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  res.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

app.get('/api/getImage', async (req, res) => {
  if (checkDay() && fs.existsSync(imgPath)) {
    res.sendFile(imgPath);
  } else {
    imgDate = new Date();

    await downloadImage()
    res.sendFile(imgPath);
  }
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});