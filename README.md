# 주식 가상 매매 사이트 (금융시장 플랫폼)

## 소개
주식 가상 매매 사이트는 사용자가 가상 자금을 사용하여 주식을 사고 팔 수 있는 웹 애플리케이션입니다. 이 프로젝트는 주식 거래에 대한 이해를 높이고, 실제 거래에 앞서 연습할 수 있는 환경을 제공하기 위해 개발되었습니다.

## 기능
- **회원 가입 및 로그인**: 사용자는 계정을 생성하고 로그인할 수 있습니다.
- **아이디 및 비밀번호 찾기**: 회원가입 시, 입력한 이메일을 사용하여 아이디 및 비밀번호를 찾을 수 있습니다.
- **튜토리얼 제공**: 메인 페이지에 해당 사이트 활용 목적이 제시되어져 있습니다.
- **전일 대비 변동량 TOP3 제공**: 메인 페이지에 전일과 비교하여 변동량이 제일 큰 주식 3개를 차트로 보여줍니다.
- **게시판**: 주식에 대한 정보 혹은 의견을 게시판을 통해 나눌 수 있습니다. 관리자와 사용자가 게시판에 수행할 수 있는 행동은 차이가 있게 구현되어져 있습니다.
- **가상 자금 할당**: 회원 가입 시 초기 가상 자금이 할당됩니다. 초기 자금은 1,000,000원으로 고정하여 할당됩니다.
- **주식 검색 및 정보 제공**: 사용자는 특정 주식을 검색하고 실시간 가격, 과거 데이터 등 관련 정보를 확인할 수 있습니다. 각 주식에 대한 데이터를 차트를 통해 시각적으로 확인할 수 있습니다.
- **주식 매매/매도(가상투자)**: 사용자는 원하는 주식을 검색한 후, 주식 거래가 가능한 주식이라면 투자를 진행할 수 있습니다. 개인에게 할당괸 가상 자금을 사용하여 원하는 주식을 사고 팔 수 있습니다. 거래시, 거래 단위를 지정하여 편리하게 투자 가능합니다.
- **가상투자 마이페이지**: 사용자는 자신의 주식 포트폴리오를 관리하고, 초기 투자 자금, 매수 원금, 총 주식 평가금액, 현 투자 가능 금액, 수익률, 수익 금액, 보유 주식 수 등을 확인할 수 있습니다. 

## 설치 및 실행 방법
### 요구 사항
- React
- Node.js
- npm
- MySQL

### 설치
1. 저장소를 클론합니다.
    ```sh
    git clone https://github.com/winnaba61/virtual-invest.git
    ```
2. 프로젝트 디렉토리로 이동합니다.
    ```sh
    cd virtual-invest
    ```
3. 필요한 패키지를 설치합니다.
    ```sh
    npm install
    ```

### 데이터베이스 설정
1. MySQL을 설치하고 실행합니다.
2. sequelizer로 migrate 진행합니다. 작성되어져 있는 모든 데이터베이스 table 복제 가능합니다.

### 서버 실행
1. 개발 서버를 시작합니다.
    ```sh
    node app.js 혹은 npm start
    ```
2. 클라이언트 서버를 시작합니다.
    ```sh
    yarn vite 혹은 yarn dev
    ```

## 기여 방법
1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다.
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. 변경 사항을 커밋합니다.
    ```sh
    git commit -m "Add your feature description"
    ```
4. 브랜치를 푸시합니다.
    ```sh
    git push origin feature/your-feature-name
    ```
5. 풀 리퀘스트를 생성합니다.

## 팀장

2020202028 최승아 (winnaba61)

## 팀원

2019202053 신윤석 (tlsdbstjr)

2020202033 고동우 (DwKwCs)

2021202022 한은진 (hanejj)
