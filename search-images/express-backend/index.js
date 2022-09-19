var request = require('request');
var express = require('express');
var app = express();

app.get('/search-images', function(req, res){
    const uri = 'https://api.pexels.com/v1/search?query=people';
    const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Pexels/JavaScript",
          Authorization: '563492ad6f91700001000001623e8c17387d44a68ef101b77ecdfb56',
        }
    };
    request(uri, options).pipe(res);
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});