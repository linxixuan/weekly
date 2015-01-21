var koa = require('koa'),
    fs = require('fs'),
    Weekly = require('./models/weekly'),
    app = koa();

var staticServer = require('koa-static');

var views = require('co-views');
var render = views(__dirname + '/views', { ext: 'ejs' });
var bodyParser = require('koa-bodyparser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zmx');
Weekly = mongoose.model('Weekly');

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
        var content = this.request.body.content,
            mood = 1,
            date = new Date();

        var weekly = new Weekly({
            content: content,
            mood: mood,
            date: date
        });

        // 在save的回调函数中设置body会报错，是不是两种机制的promise有冲突？
        weekly.save();
        this.body = JSON.stringify({
            status: 1,
            msg: '保存成功'
        });
    } else {
        if(/^\/edit/.test(this.url)) {
            this.body = yield render('edit');
        } else if (/^\/list/.test(this.url)) {
            this.body = yield render('list');
        } else {
            this.body = '哈哈哈，你找啥呢？';
        }
    }
});

app.listen(3000);
