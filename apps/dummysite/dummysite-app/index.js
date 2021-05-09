const axios = require('axios');

const url = String(process.env.URL) || 'http://example.com'

/*
  I guess you could start an express server here and serve the site.
  "Create a copy of the site" is kinda ambiguous and I don't think the main point of the exercise is generating sites from downloaded HTML
  So I decided not to implement that.
*/

if (url) {
  axios.get(url).then((res) => { console.log(res.data) });
} else {
  console.log('No url given');
}