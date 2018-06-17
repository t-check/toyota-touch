var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;
const {google} = require('googleapis');

var piRootDirectory = '/media/pi';

let createServer = function () {
    app.listen(3333, function () {
        console.log('Example app listening on port 3333!')
    });
}

if (fs.existsSync(piRootDirectory)) {
    // Do something
    createServer();
}
else {
    piRootDirectory = '/Users/tomislavhorvaticek/Downloads/pifolder'
    createServer();
}

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



app.get('/files/:drive/:folderName', function(req, res){
    var fileList = [];
    // /media/pi/9CC8BB5BC8BB327E/USA
    // /Users/tomislavhorvaticek/Downloads
    try{
        fs.readdir(piRootDirectory + '/' + req.params.drive + '/' + req.params.folderName, function(err, files){
            if (err){
                res.writeHead(200, {'Content-Type': 'application/javascript'});
                res.write(JSON.stringify([{"name":" Sia - Elastic Heart feat. Shia LaBeouf & Maddie Ziegler (Official Video).mp4"},{"name":"ALEXANDRA STAN - Mr. Saxobeat.mp4"},{"name":"Adele - Hello.mp4"},{"name":"Alex Gaudino Feat. Christal Waters - Destination Calabria.mp4"},{"name":"Alexandra Stan - Mr Saxobeat (Official Video).mp4"},{"name":"Aventura - Obsesion.mp4"},{"name":"Beyoncé - Baby Boy ft. Sean Paul.mp4"},{"name":"Drake - Hotline Bling.mp4"},{"name":"Ed Sheeran - Thinking Out Loud [Official Video].mp4"},{"name":"Edward Maya & Vika Jigulina - Stereo Love (Official Music Video).mp4"},{"name":"Ellie Goulding - Burn.mp4"},{"name":"Ellie Goulding - Love Me Like You Do (Official Video).mp4"},{"name":"Eminem - Stan (Long Version) ft. Dido.mp4"},{"name":"Eminem - The Monster (Explicit) ft. Rihanna.mp4"},{"name":"Eminem - The Real Slim Shady (Uncensored).mp4"},{"name":"Enrique Iglesias - Bailando (Español) ft. Descemer Bueno, Gente De Zona.mp4"},{"name":"Enrique Iglesias - DUELE EL CORAZON (Lyric Video) ft. Wisin.mp4"},{"name":"Enrique Iglesias - I Like It.mp4"},{"name":"Guantanamera - Los Paraguayos.mp4"},{"name":"Lady Gaga - Alejandro.mp4"},{"name":"Lady Gaga - Paparazzi.mp4"},{"name":"Lady Gaga - Poker Face.mp4"},{"name":"Los del Rio - Macarena (Original Video) [HD].mp4"},{"name":"Lou Bega - Mambo No. 5 (A Little Bit of...).mp4"},{"name":"Madonna - Die Another Day  (Official Music Video).mp4"},{"name":"Mark Ronson - Uptown Funk ft. Bruno Mars.mp4"},{"name":"Maroon 5 - Sugar.mp4"},{"name":"Mr. President - Coco Jambo (1920 x 1080p HD) videoclip.mp4"},{"name":"OMI - Cheerleader (Felix Jaehn Remix) [Official Video].mp4"},{"name":"OneRepublic - Counting Stars.mp4"},{"name":"Pitbull - Feel This Moment ft. Christina Aguilera.mp4"},{"name":"Pitbull - Hey Baby (Drop It To The Floor) ft. T-Pain.mp4"},{"name":"Pitbull - Rain Over Me ft. Marc Anthony.mp4"},{"name":"Pitbull - Timber ft. Ke$ha.mp4"},{"name":"Ricky Martin - Livin' La Vida Loca.mp4"},{"name":"Rihanna - Diamonds.mp4"},{"name":"Romeo Santos - Propuesta Indecente.mp4"},{"name":"Sam Smith - Writing's On The Wall (from Spectre).mp4"},{"name":"Sean Paul - She Doesn't Mind [Official Music Video].mp4"},{"name":"Sean Paul - Temperature [OFFICIAL VIDEO].mp4"},{"name":"Shaggy Mohombi Faydee Costi - Habibi (I need Your love) - Official Video.mp4"},{"name":"Shakira - Can't Remember to Forget You ft. Rihanna.mp4"},{"name":"Shakira - La Tortura ft. Alejandro Sanz.mp4"},{"name":"Sia - Chandelier (Official Video).mp4"},{"name":"Sia - Elastic Heart feat. Shia LaBeouf & Maddie Ziegler (Official Video).mp4"},{"name":"Silentó - Watch Me (Whip-Nae Nae) (Official).mp4"},{"name":"Sophia Loren - Mambo Italiano.mp4"},{"name":"TBF - Ništa mi neće ovi dan pokvarit.mp4"},{"name":"TINA IVANOVIC - BAMBUS (OFFICIAL VIDEO 2007).mp4"},{"name":"Tacabro - Tacata (Official Video).mp4"},{"name":"Tacatà - Tacabro - Official New Video HD.mp4"},{"name":"Taylor Swift - Bad Blood ft. Kendrick Lamar.mp4"},{"name":"The Weeknd - Can't Feel My Face.mp4"},{"name":"The Weeknd - The Hills.mp4"},{"name":"Tina Turner - Golden Eye (Official Music Video).mp4"},{"name":"Tom Jones - Sexbomb.mp4"},{"name":"Vengaboys - We're Going to Ibiza!.mp4"},{"name":"We Be Burning - Sean Paul (Official Video).mp4"},{"name":"Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack.mp4"},{"name":"Yves LaRock - Rise Up.mp4"},{"name":"video-1486376952.mp4"}]));
                res.end();
            }
            else{
                for(var i=0; i<files.length; i++){
                    if (files[i].indexOf('.mp4') >= 0){
                        fileList.push({name: files[i]});
                    }
                }

                res.writeHead(200, {'Content-Type': 'application/javascript'});
                res.write(JSON.stringify(fileList));
                res.end();
            }
        })
    }
    catch(err){
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write(JSON.stringify(fileList));
        res.end();
    }
})



app.get('/folders/:drive', function(req, res){
    var folderList = [];
    var dItems = [];

    try{
        function getDirectories (srcpath) {
            return fs.readdirSync(srcpath)
                .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
        }

        var directories = getDirectories(piRootDirectory + '/'+ req.params.drive);
        dItems = directories.map(function(d){
            return {name: d};
        })
    }
    catch(err){
        
    }
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.write(JSON.stringify(dItems));
    res.end();
})

app.get('/get-default-drive', function(req, res){
    var defaultDrive = '';
    var disks = [];
    try{
        function getDirectories (srcpath) {
            return fs.readdirSync(srcpath)
                .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
        }
        var directories = getDirectories(piRootDirectory);
        disks = directories.map(function(d){
            return {name: d};
        });

        for(var i=0; i<disks.length; i++){
            try{
                var dirs = getDirectories(piRootDirectory + '/' + disks[i].name);
                if (dirs.length > 0 && dirs.indexOf('USA') > -1){
                    defaultDrive = disks[i].name;
                }
            }
            catch(er){

            }
        }
    }
    catch(err){

    }
    if (defaultDrive == '' && disks.length > 0){
        defaultDrive = disks[0].name;
    }

    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.write(JSON.stringify({defaultDrive: defaultDrive}));
    res.end();
})

app.get('/get-drives', function(req, res){
    var disks = [];

    try{
        function getDirectories (srcpath) {
            return fs.readdirSync(srcpath)
                .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
        }
        var directories = getDirectories(piRootDirectory);
        disks = directories.map(function(d){
            return {name: d};
        });
    }
    catch(err){

    }
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.write(JSON.stringify(disks));
    res.end();
});

app.get('/get-latest', function(req, res){
    
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("git -C \"Desktop/toyota-touch\" pull", puts);
})

app.get('/reboot', function(req,res){
    exec("sudo shutdown -r now");
})

app.get('/update-songs/:drive', function(req, res){
    var privatekey = require(piRootDirectory + '/' + req.params.drive + '/secret.json');
    var jwtClient = new google.auth.JWT(
        privatekey.client_email,
        null,
        privatekey.private_key,
        ['https://www.googleapis.com/auth/drive']
    );

    jwtClient.authorize(function (err, tokens) {
        if (err) {
            return;
        } else {
            console.log("Google autorization complete");
            var drive = google.drive({version: 'v3', auth: jwtClient});

            drive.files.list({
                auth: jwtClient,
                pageSize: 10,
                q: "'1iFmhRqneX2gEfZq9YrLuYkgqoa4MCMlr' in parents and trashed = false",
                fields: "nextPageToken, files(id, name)"
            }, function (err, {data}) {
                if (err) {
                    console.log(err);
                // Handle error
                } else {
                    console.log('got ok response');
                    const files = data.files;
                    const dest = fs.createWriteStream(piRootDirectory + '/Video');

                    if (files.length) {
                        console.log('Files:');
                        files.map((file) => {
                            var dfile = fs.createWriteStream(piRootDirectory + "/" + file.name);
                            dfile.on("finish", function() {
                                console.log("downloaded", file.name);
                            });

                            // Download file
                            drive.files.get({
                                auth: jwtClient,
                                fileId: file.id,
                                alt: "media"
                            }).pipe(dfile);
                        });
                    }
                // Success is much harder to handle
                }
            });
        }
      });
});

app.get('/media-file/:drive/*', function(req, res){
    var drive = req.params.drive,
        path = req.params[0] ? req.params[0] : 'index.html';
    res.sendfile(path, {root: piRootDirectory + '/'+ drive});
});
//app.use('/media-file', express.static('/media/pi/9CC8BB5BC8BB327E1'));

