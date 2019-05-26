//auth.js: authorization management
const router = require('express').Router();
var firebase = require('./firebase');
var db = firebase.firestore();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
//session
var session = require('express-session'); 
router.use(session({
    key: 'sid', 
    secret: '1@%24^%$3^*&98&^%$', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
    resave: false,                //세션 아이디를 접속할때마다 새롭게 발급하지 않음
    saveUninitialized: true,       //세션 아이디를 실제 사용하기전에는 발급하지 않음
    cookie: {
        maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
        }
}));
//register
router.get('/register', function (req, res) {
    res.render('auth/register.ejs', {err: null});
});
//after register
router.post('/register', function(req, res){
    //등록된 유치원인지 검사
    var kinder = db.collection('kinder').doc(req.body.kinder_name);
    kinder.get()
    .then(doc=>{
        if(!doc.exists){
            res.render('auth/register.ejs', {err: '등록된 유치원이 아닙니다!'});
        }
        else{
            //선생님인지 학부모인지 검사
            if(req.body.kid_name){
                //아이디 중복검사
                var parent =  db.collection('user').doc(req.body.Id_no);
                if(parent.get().exists){
                    res.render('auth/register.ejs', {err: '중복되는 아이디입니다!'});
                }
                else{
                    var data = {
                        address : req.body.address,
                        name : req.body.name,
                        password : req.body.password,
                        phone : req.body.phone,
                        kid : [req.body.num],
                        kinder: req.body.kinder_name,
                        type: false // true면 선생님;;
                    }
                    parent.set(data);
    
                    var kid_data = {
                        class : req.body.kid_class,
                        name : req.body.kid_name,
                        sex : req.body.sex,
                        age : req.body.age
                    }
                    kinder.collection('kid').doc(req.body.num).set(kid_data);
                    
                }
            }
            else{
                //아이디 중복검사
                var teacher = db.collection('user').doc(req.body.Id_no);
                if(teacher.get().exists){
                    res.render('auth/register.ejs', {err: '중복되는 아이디입니다!'});
                }
                else{
                    var data = {
                        name : req.body.name,
                        password : req.body.password,
                        phone : req.body.phone,
                        class : req.body.class,
                        kinder : req.body.kinder_name,
                        type : true
                    }
                    teacher.set(data);
                }
            }
            firebase.auth().createUser({
                email: req.body.Id_no,
                emailVerified: false,
                password: req.body.password,
                displayName: req.body.name,
                kinder: req.body.kinder_name,
                disabled: false
              })
            .then(function(userRecord) {
                res.redirect('/auth/login');
            })
            .catch(function(error) {
                res.render('auth/register.ejs', {err: error.errorInfo.message});
            });
        }
    })
  
});

//sign-in
router.get('/login', function (req, res) {
    res.render('auth/login.ejs', {err: null});
});
router.post('/login', function(req, res){
    var user = db.collection('user').doc(req.body.Id);
    user.get()
    .then(doc=>{
        if(!doc.exists){
            res.render('auth/login.ejs', {err: '아이디를 찾을 수 없습니다!'});
        }
        else{
            if(doc._fieldsProto.password.stringValue == req.body.password){
                req.session.logined = true;
                req.session.user_id = req.body.Id;
                req.session.kinder = doc._fieldsProto.kinder.stringValue;
                req.session.type = doc._fieldsProto.type.booleanValue;
                res.redirect('/main');
            }
            else{
                res.render('auth/login.ejs', {err: '비밀번호를 확인해 주세요'});
            }
        }
    })
});

//log out
router.get('/logout', function (req, res){
    res.redirect('/');
    req.session.logined = false;
});

module.exports = router;