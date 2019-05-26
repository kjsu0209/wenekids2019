//station.js: kids station viewer
const router = require('express').Router();
var firebase = require('./firebase');
var db = firebase.firestore();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

//함수
function checkLogin(req, res){
    if(req.session.logined){
        return true;
    }
    else{
        res.redirect('/auth/login');
    }
}

//메인 대시보드
router.get('/', function (req, res) {
    checkLogin(req, res);
    var kinder = db.collection('kinder').doc(req.session.kinder).collection('bus').doc('1').collection('station');
    if(req.session.type){ //선생님 계정
        var stationArray = [];
        var i = 0;
        kinder.get()
        .then(snapshot => {
            //정류장 객체 생성
            snapshot.forEach(doc => {
            //정류장 객체에 정보 넣기
              stationArray[i++] = doc.data();
            });
            //정류장 순서별로 소팅하기
            stationArray.sort(function(a, b){
                return a.order < b.order ? -1 : a.order > b.order ? 1: 0;
            })
            //페이지 출력
            res.render('station.ejs', {
                station : stationArray,
                admin : true,
                err : null
            })
          })
    }
    else{ // 학부모 계정 
        // 자녀 배열 생성
        // 자녀 승하차 정류장 배열에 저장
        // 전체 정류장 배열에 저장
        // 페이지 렌더링
    }
});
//정류장 추가
router.post('/new', function (req, res) {
    var station = db.collection('kinder').doc(req.session.kinder).collection('bus').doc('1').collection('station').doc(req.body.name);
    var data = req.body.location;
    var locations = data.split('/');
    var location = {
        _latitude : locations[0],
        _longitude : locations[1]
    }
    //순서 정하기
    db.collection('kinder').doc(req.session.kinder).collection('bus').doc('1').collection('station').get().then(snap => {
        size = snap.size // will return the collection size
        if(station.get().exists){
            //같은 이름이 존재할 경우 '-1' 붙이기
            var data = {
                name : req.body.name + '-1',
                offkid : [],
                onkid : [],
                location : location,
                order : size + 1
            }
            station.set(data).then(() => {
                console.log('Add station succeeded!');
                res.redirect('/station');
              });
        }
        else{
            var data = {
                name : req.body.name,
                offkid : [],
                onkid : [],
                location : location,
                order : size + 1
            }
            station.set(data).then(() => {
                console.log('Add station succeeded!');
                res.redirect('/station');
              });
        }
    });

});
//정류장 삭제
router.get('/delete', function(res, req){
    var name = req.query.name;
    //정류장 순서 정리하기
    
    //정류장 삭제
    db.collection('kinder').doc(req.session.kinder).collection('bus').doc('1').collection('station').doc(name).delete().then(()=>{
        console.log('Delete station succeeded!');
        res.redirect('/station');
    });
});

//정류장 선택 - 파라미터: 아이 Id, 정류장 Id, 하차/승차 여부
router.post('/change', function(res, req){
    //승하차 여부 확인
})
module.exports = router;