본 폴더는 json-server를 구동하기 위한 서버입니다.
json-server는 게시판을 운영하기 위해 사용됩니다.
다음 명령어로 json서버를 설치할 수 있습니다.
---
npm i -g json-server
---
그리고 working directory를 ./FrontEnd/json_server로 바꾼 뒤 다음 명령어로 서버를 구동할 수 있습니다.
---
json-server --watch data.json --port 3001
---