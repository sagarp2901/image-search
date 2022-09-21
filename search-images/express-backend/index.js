var request = require('request');
var express = require('express');
const axios = require('axios');
var app = express();

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.get('/search', (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    const page = req.query.page;
    //Do something when the searchQuery is not null.
    if(searchQuery !== null) {
      const pexelResultsPromise = axios.get(`https://api.pexels.com/v1/search?per_page=10&query=${searchQuery}&page=${page}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Pexels/JavaScript",
          Authorization: '563492ad6f91700001000001623e8c17387d44a68ef101b77ecdfb56',
        }
      });

      const unsplashPromise = axios.get(`https://api.unsplash.com/search/photos?per_page=10&query=${searchQuery}&page=${page}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Pexels/JavaScript",
          Authorization: 'Client-ID T7RX7l3P1juE_4sy_CPmvIz0CPLizdnQFewsoS-v6mU',
        }
      })

      Promise.all([pexelResultsPromise,unsplashPromise]).then((result) => {
        const finalResults = formatData(result);
        console.log(finalResults);
        res.send(finalResults);
      });
    } else {
      res.end();
    }
  } catch(err) {
    console.log(err)
    res.send({ err }) // <= send error
  }
});

const formatData = (results) => {
  let pexelResults = results[0].data;
  let unsplashResults = results[1].data;

  let photosPexel = pexelResults.photos.map((res => {
    return {
      alt: res.alt,
      id: res.id,
      url: res.src.small
    }
  }));

  let photosUnsplash = unsplashResults.results.map((res => {
    return {
      alt: res.alt_description,
      id: res.id,
      url: res.urls.small
    }
  }));

  const photosAll = photosPexel.concat(photosUnsplash);
  return {
    photos: photosAll,
    page: pexelResults.page
  }
}

app.listen(3001, () => {
  console.log('listening on port 3001');
});