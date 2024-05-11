const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const mysql = require('mysql');

const app = express();

// MySQL 연결
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'project3'
});

connection.connect();

// API 요청 보내기
app.get('/', (req, res) => {
  //인증키입력부분에 입력해서 사용, 일단 100개 정보 받아 옴.
  const apiUrl = 'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=인증키입력&numOfRows=100&pageNo=1';

  axios.get(apiUrl)
  .then(response => {
    // XML parsing
    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const items = result.response.body[0].items[0].item;
      if (!items || items.length === 0) {
        console.error('No items found in the response');
        res.status(500).send('Internal Server Error');
        return;
      }

      // 반복문, 각 주식 항목 처리
      items.forEach(item => {
        const basDt = item.basDt[0]; //기준일자
        const srtnCd = item.srtnCd[0]; //단축코드
        const isinCd = item.isinCd[0]; //ISIN코드
        const itmsNm = item.itmsNm[0]; //종목명
        const mrktCtg = item.mrktCtg[0]; //시장구분
        const clpr = item.clpr[0]; //종가
        const vs = item.vs[0]; //대비
        const fltRt = item.fltRt[0]; //등락률
        const mkp = item.mkp[0]; //시가
        const hipr = item.hipr[0]; //고가
        const lopr = item.lopr[0]; //저가
        const trqu = item.trqu[0]; //거래량
        const trPrc = item.trPrc[0]; //거래대금
        const lstgStCnt = item.lstgStCnt[0]; //상장주식수
        const mrktTotAmt = item.mrktTotAmt[0]; //시가총액

        // 데이터 삽입
        const sql = `INSERT INTO stock_info (itmsNm, clpr, hipr, lopr, vs, basDt, mkp, mrktTotAmt, lstgStCnt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [itmsNm, clpr, hipr, lopr, vs, basDt, mkp, mrktTotAmt, lstgStCnt];

        connection.query(sql, values, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }

          //정상 작동 시, 콘솔에 100번 출력됨.
          console.log('1 record inserted');
        });
      });

      res.send('Data inserted successfully');
    });
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Internal Server Error');
  });
 });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});