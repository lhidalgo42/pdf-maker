var fs = require('fs');
var pdf = require('html-pdf');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '150mb'}));

app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));
//var html = fs.readFileSync('example.html', 'utf8');
// var options = { format: 'A4',orientation: 'portrait' };
app.post('/', function (sReq, sRes) {

    var html = sReq.body.html;
    //var options = sReq.body.options;
    var file = path.join(__dirname, sReq.body.rute);
    //console.log(options);
	//console.log(html);
	//console.log(file);
    var options = {
        "height": "10.5in",        // allowed units: mm, cm, in, px
        "width": "8in",            // allowed units: mm, cm, in, px
        orientation: "portrait"
    };

    pdf.create(html, options).toFile(file, function (err, pdf) {
              if(err) throw err;
            console.log(pdf);
            fs.existsSync(pdf.filename);
        sRes.send(pdf.filename);
        })
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('HTNLPDF app listening at http://0.0.0.0:' + port);
});
