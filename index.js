const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const shuffle = require('shuffle-array');


// use Heroku port
const PORT = process.env.PORT || 3000;


// raw html only
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');


// on server startup, load list of all images & vidoeos in static directory
// into global array variable
FILE_NAMES = [];
// load photos and gifs first
fs.readdirSync(__dirname + '/public/images').forEach(function(img_name) {
  FILE_NAMES.push({
    // for each file, track whether it is a photo or video
    'ftype': 'img',
    'src': img_name
  });
});
// next load videos
fs.readdirSync(__dirname + '/public/videos').forEach(function(vid_name) {
  FILE_NAMES.push({
    // for each file, track whether it is a photo or video
    'ftype': 'video',
    'src': vid_name
  });
});


app.get('/', function(req,res) {
  // shuffle order of image names before sending to client
  shuffle(FILE_NAMES);
  res.render('index.html', {file_names: FILE_NAMES});
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
