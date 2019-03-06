const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');


// use Heroku port
const PORT = process.env.PORT || 3000;


// raw html only
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');


// on server startup, load list of all images in static directory
// keep list of image filenames as global array variable
IMAGE_NAMES = fs.readdirSync(__dirname + '/public/images');


app.get('/', function(req,res) {
  res.render('index.html', {image_names: IMAGE_NAMES});
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
