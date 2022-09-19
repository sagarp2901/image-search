var request = require('request');
var express = require('express');
var app = express();

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.get('/search', function(req, res){
  const searchQuery = req.query.searchQuery;

  //Do something when the searchQuery is not null.
  if(searchQuery != null){
    const uri = `https://api.pexels.com/v1/search?query=${searchQuery}`;
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
  }else{
    response.end();
  } 
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});