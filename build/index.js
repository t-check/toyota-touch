var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');


app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var fileStream = fs.createReadStream(__dirname + '/index.html');
    fileStream.pipe(res);
});

app.get('/appjs', function(req,res){
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    var fileStream = fs.createReadStream(__dirname + '/js/app.js');
    fileStream.pipe(res);
});

app.get('/css', function(req, res){
        res.writeHead(200, {'Content-Type': 'text/css'});
    var fileStream = fs.createReadStream(__dirname + '/css/css.css/index.css');
    fileStream.pipe(res);
});

app.get('/files', function(req, res){
    var fileList = [];
    fs.readdir('/Users/tomislavhorvaticek/Downloads', function(err, files){
        for(var i=0; i<files.length; i++){
            if (files[i].indexOf('.mp4') >= 0){
                fileList.push({name: files[i]});
            }
        }

        console.log(fileList);

        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write('window.files = ' + JSON.stringify(fileList));
        res.end();
    })
})

app.use('/media-file', express.static('/Users/tomislavhorvaticek/Downloads'));

app.listen(3333, function () {
  console.log('Example app listening on port 3333!')
});