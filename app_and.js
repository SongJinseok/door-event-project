const express = require('express');
var FCM = require('fcm-node');
const app = express();
let users = [
  {
    "door open": 'check'
  }
]
app.get('/users', (req, res) => {
   console.log('문열림 감지');
   res.json(users) //이거를 사용자 핸드폰에 푸쉬알람으로 주기.

   //fcm
   fcm.send(push_data, function(err, response) {
       if (err) {
           console.error('Push메시지 발송에 실패했습니다.');
           console.error(err);
           return;
       }

       console.log('Push메시지가 발송되었습니다.');
       console.log(response);
   });
   //fcm


});
app.post('/post', (req, res) => {
   console.log('who get in here post /users');
   var inputData;
   req.on('data', (data) => {
     inputData = JSON.parse(data);
   });
   req.on('end', () => {
     console.log('user_id : '+inputData.user_id + ' , name : '+inputData.name);
   });
   res.write('OK!');
   res.end();
});












//fcm

var serverKey = 'AAAA9s8Emjk:APA91bGfotDtCiw6-mS9LMxJk5lIattLtxkGcwjZiwNFbZA98UR_E33cqI3z4XqTg7KARrYDslDd6hhlB3Z3c9iSk4juNOLgdnAg-WG0DVHG7pm9n086aOFNfdqpPbh0PGcBqlhozEzg';

/** 안드로이드 단말에서 추출한 token값 */
// 안드로이드 App이 적절한 구현절차를 통해서 생성해야 하는 값이다.
// 안드로이드 단말에서 Node server로 POST방식 전송 후,
// Node서버는 이 값을 DB에 보관하고 있으면 된다.
var client_token = 'e2BbK8sRDGI:APA91bGxgRCZNjXtwJr79XJRNz2jDAzHS9SeskccOFIKv8U1KGSPvAE0Oxu2Ju3654gEg-cnxpz2ujs_BzSmEsne_NqOglFWHanB4QLYoQ5kULpoPrF-j9bsCfsepgFwr1Gv8bzdgc4E';

/** 발송할 Push 메시지 내용 */
var push_data = {
    // 수신대상
    to: client_token,
    // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
    notification: {
        title: "Hello Node",
        body: "문 열림이 감지되었습니다.",
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon"
    },
    // 메시지 중요도
    priority: "high",
    // App 패키지 이름
    restricted_package_name: "com.example.song.node_and",
    // App에게 전달할 데이터
    data: {
        num1: 2000,
        num2: 3000
    }
};

/** 아래는 푸시메시지 발송절차 */
var fcm = new FCM(serverKey);

//fcm







app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
