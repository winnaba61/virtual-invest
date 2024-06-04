# 24.05.11 DB 연동 코드(eunjin)

### 개발환경
- Node.js
- express 4.16.1
- MySQL
### 코드 실행 시, 주의사항

-   주식 정보 API는 https://www.data.go.kr/data/15094808/openapi.do 사용.

### 업데이트

로그인시 세션 방식으로 업데이트 됌 데이터 베이스에서 user_loginInfo table이 추가되었고, 로그인 시 서버에서 랜덤 난수와 그에 해당하는 logins 테이블의 id를 user_loginInfo 테이블에 넣고 클라이언트에게 랜덤 난수를 하나 보내줌.
랜덤 난수를 받은 클라이언트는 sessionStorage에 저장해 놨다가 필요할 때, 랜덤 난수를 서버에 보내서 logins 테이블 id로 다시 교환을 받고 logins 테이블 id에 해당하는 정보를 얻어올 수 있음

새로운 테이블인 user_loginInfo table은 trouble shooting에 있는 mySQL 동기화 방법 항목을 적용하면 logins 테이블과 boards 테이블과 함께 생성할 수 있음

-  추가 변경된 함수, backend 서버 app.js 기준

-  app.get('/api/admin')

요청 형식: ~/api/admin?id=(getLoginId로 얻어온 key)
=======
- 코드 실행 시, app.js 파일의 21line 인증키 입력하셔야 동작합니다.
- 주식 정보 API는 https://www.data.go.kr/data/15094808/openapi.do 사용.
### 결과 화면
- cmd에서 node app.js


![1](https://github.com/hanejj/private-test/assets/165184750/d356ea51-c05d-46e8-b196-49ae34f0b5f4)
- localhost:3000


![2](https://github.com/hanejj/private-test/assets/165184750/d7d7c5c9-12a8-4dd4-952d-80a05f43b7b4)
- MySQL 데이터 확인


반환: admin인 경우 1, 아닌경우 0 (logins의 user_admin 항목 가져옴)

-  app.post('/api/setLoginInfo')

로그인 시 수행되는 함수로, 서버 user_loginInfo 테이블에 클라이언트에게 전달한 난수와 로그인한 id에 해당하는 logins 테이블의 id를 같이 저장해 놓음

- app.post('/api/getLoginId')

토큰을 받아 login table 상의 id를 얻어오는 함수로, 우선 1시간이 지난 세션정보는 삭제하고 받은 토큰과 일치하는 row가 user_loginInfo 상에 있는지 확인 후 있으면 반환

### trouble shooting

-   mySql data table 동기화 방법

BackEnd > config > config.json 에서 데이터 베이스 development 정보를 환경에 맞게 수정

npx sequelize db:create --env development	// 데이터 베이스에 이번 프로젝트에 필요한 스키마 생성

npx sequelize-cli db:migrate	// 데이터 베이스에 이번 프로젝트에 필요한 테이블 생성

npx sequelize-cli db:migrate:undo:all // 생성한 테이블 삭제

-   backend server가 3000번 포트를 사용중이지 않음에도 3000번 포트를 사용하고 있다는 알림이 뜨면

BackEnd > bin > www를 열고 15번째 줄

var port = normalizePort(process.env.PORT || '3000');

에서 '3000'을 쓰지 않는 임의의 포트로 바꾸고 저장 -> 3000번 포트와 임의의 포트 둘 다 열림
=======

# 24.05.18 가상투자, 마이페이지 구현_ver1(eunjin)

### 구현된 결과화면
![4](https://github.com/winnaba61/virtual-invest/assets/165184750/0c735478-211e-418a-ad4d-fd9ee2ac370b)
- 가상투자 예시 화면 (매수, 매도 정상 동작합니다.)

![5](https://github.com/winnaba61/virtual-invest/assets/165184750/52170625-3048-451e-aeb7-01ef4161aa8d)
- 마이페이지 예시 화면 (수익률, 수익금액은 예시로 작성해둔 것입니다.)

