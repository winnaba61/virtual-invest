# 24.05.11 DB 연동 코드(eunjin)

### 개발환경

-   Node.js
-   express 4.16.1
-   MySQL

### 코드 실행 시, 주의사항

-   주식 정보 API는 https://www.data.go.kr/data/15094808/openapi.do 사용.

### trouble shooting

-   mySql data table 동기화 방법

BackEnd > config > config.json 에서 데이터 베이스 development 정보를 환경에 맞게 수정

npx sequelize db:create --env development	// 데이터 베이스에 이번 프로젝트에 필요한 스키마 생성

npx sequelize-cli db:migrate	// 데이터 베이스에 이번 프로젝트에 필요한 테이블 생성

-   backend server가 3000번 포트를 사용중이지 않음에도 3000번 포트를 사용하고 있다는 알림이 뜨면

BackEnd > bin > www를 열고 15번째 줄

var port = normalizePort(process.env.PORT || '3000');

에서 '3000'을 쓰지 않는 임의의 포트로 바꾸고 저장 -> 3000번 포트와 임의의 포트 둘 다 열림

-   BackEnd\app.js:6:24에서 MODULE_NOT_FOUND가 뜨는 경우

6번 줄을 주석처리 하거나 삭제
