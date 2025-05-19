require('dotenv').config();
const express = require('express');
const shortid = require('shortid');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let urlDatabase = {};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const baseUrl = process.env.LINK || `http://localhost:${port}`;

app.post('/shorten', (req, res) => {
  const { url, alias } = req.body;
  let id = alias || shortid.generate();

  if (urlDatabase[id]) {
    return res.status(400).json({ error: 'Alias already in use' });
  }

  urlDatabase[id] = url;
  res.json({ shortUrl: `${baseUrl}/${id}` });
});

app.get('/:id', (req, res) => {
  const longUrl = urlDatabase[req.params.id];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(port, () => {
  console.log(`HYGHJ is cooking on http://localhost:${port}`);
});