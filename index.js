const express = require('express');
const app = express();
const ejs = require('ejs');

// use Heroku port
const PORT = process.env.PORT || 3000;


// raw html only
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');


app.get('/', function(req,res) {
  res.render('index.html');
  // res.send('Hello Reuter!');
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
