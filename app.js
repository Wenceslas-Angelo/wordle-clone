const axios = require('axios');
const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');

const app = express();
const PORT = 8000;

dotEnv.config();
app.use(cors());

app.get('/word', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: { count: '5', wordLength: '5' },
    headers: {
      // eslint-disable-next-line no-undef
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const wordIndex = Math.floor(Math.random() * response.data.length);
      const word = response.data[wordIndex].toUpperCase();
      res.status(200).json(word);
    })
    .catch(function (error) {
      res.status(500).json({ error });
    });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
