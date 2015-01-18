var koa = require('koa'),
    fs = require('fs'),
    app = koa();

var staticServer = require('koa-static');

var views = require('co-views');
var render = views(__dirname + '/views', { ext: 'ejs' });
var bodyParser = require('koa-body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zmx');

// logger

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// middleware
app.use(staticServer('public'));
app.use(bodyParser());

app.use(function *(){
    if (this.method === 'POST') {
        console.log(this.req.body);
    } else {
        if(/^\/list\W/.test(this.url)) {
            this.body = yield render('list');
        } else {
            this.body = '';
        }
    }
});

app.listen(3000);
