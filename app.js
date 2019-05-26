//debug mode : nodemon app.js
//variables for server
const http = require('http');

//variables for express
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

//session
var session = require('express-session'); 
app.use(session({
    key: 'sid', 
    secret: '1@%24^%$3^*&98&^%$', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
    resave: false,                //세션 아이디를 접속할때마다 새롭게 발급하지 않음
    saveUninitialized: true,       //세션 아이디를 실제 사용하기전에는 발급하지 않음
    cookie: {
        maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
        }
}));

//variables for router
var auth = require('./routes/auth');
app.use('/auth', auth);
var notice = require('./routes/notice');
app.use('/notice', notice);
var station = require('./routes/station');
app.use('/station', station);

//main page
app.get('/', function (req, res) {
    if(req.session.logined){
        res.render('main.ejs', {
            username : req.session.user_id
        })
    }
    else{
        res.render('index.html');
    }
});
app.get('/main', function (req, res){
    if(req.session.logined){
        res.render('main.ejs', {
            username : req.session.user_id,
            usertype : req.session.type
        })
    }
    else{
        res.redirect('/');
    }
})

function checkLogin(req, res){
    if(req.session.logined){
        return true;
    }
    else{
        res.redirect('/auth/login');
    }
}

//runserver
http.createServer(app).listen(3000,function() {
    console.log(`Server running at http://127.0.0.1:3000/`);
});
