const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const shuffle = require('shuffle-array');
const formidable = require('formidable');


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


// main entrypoint, sends to homepage with all liquid reuter pics
app.get('/', function(req,res) {
  // shuffle order of image names before sending to client
  shuffle(FILE_NAMES);
  res.render('index.html', {file_names: FILE_NAMES});
});

// handle file uploads from main liquid reuter page
app.post('/file_upload', function(req, res) {
  // create new incoming form object
  var form = new formidable.IncomingForm();

  // parse incoming uploaded file
  form.parse(req, function(err, fields, files) {
    // 'fields' is a dictionary of strings, giving the names of the form fields
    // files is a dictionary of file objects uploaded in form
    // path of temporary directory that file is uploaded to
    var tmp_path = files.file_to_upload.path;
    // path where we want to move the file to for permanent saving
    // (move new images to public/images directory along with the others)
    var new_path = __dirname + '/public/images/' + files.file_to_upload.name;
    // move file from temporary directory to permanent directory
    fs.rename(tmp_path, new_path);
  });

  // redirect to homepage
  console.log('all files uploaded');
  res.redirect('/');
});


app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
