const express = require('express');
const app = express();
// use Heroku port
const PORT = process.env.PORT || 3000;

app.get('/', function(req,res) {
  res.send('Hello Reuter!');
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
