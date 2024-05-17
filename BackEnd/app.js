const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL 연결
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'project3'
});

connection.connect();

// CORS 설정
app.use(cors());

app.get('/api/current-price', (req, res) => {
  //시가 가져오기
  const query = 'SELECT clpr FROM stock_info WHERE id=1';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Server Error');
      return;
    }
    res.json(results[0]);
  });
});

app.get('/api/current-wallet', (req, res) => {
  //보유 자산 가져오기
  const query = 'SELECT user_wallet FROM user_account WHERE user_account=10000000001';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Server Error');
      return;
    }
    res.json(results[0]);
  });
});

// POST 요청 처리
app.use(express.json());

app.post('/api/invest', (req, res) => {
    const { investmentAmount, remainingBalance, buy_money } = req.body;

    // 첫 번째 쿼리: user_account 테이블 업데이트
    const query1 = 'UPDATE user_account SET user_wallet = ? WHERE user_account = 10000000001';

    connection.query(query1, [remainingBalance], (err, result1) => {
        if (err) {
            console.error('Error updating user account in MySQL:', err);
            return res.status(500).json({ error: 'Failed to update user account' });
        }

        // 두 번째 쿼리: my_stock 테이블 업데이트
        const query2 = 'UPDATE my_stock SET stock_count= stock_count + ? WHERE user_account=10000000001';

        connection.query(query2, [investmentAmount], (err, result2) => {
            if (err) {
                console.error('Error updating my_stock in MySQL:', err);
                return res.status(500).json({ error: 'Failed to update my_stock' });
            }


            const query3 = 'UPDATE my_stock SET buy_money= buy_money + ? WHERE user_account=10000000001';

            connection.query(query3, [buy_money], (err, result2) => {
            if (err) {
                console.error('Error updating my_stock in MySQL:', err);
                return res.status(500).json({ error: 'Failed to update my_stock' });
            }

            // 모든 업데이트가 성공하면 성공 메시지 반환
            console.log('Investment saved successfully to MySQL');
            res.status(200).json({ message: 'Investment saved successfully' });
            });
        });
    });
});

app.post('/api/sell', (req, res) => {
    const { sellAmount, remainingBalance } = req.body;

    // my_stock 테이블에서 현재 주식 개수 조회
    const getCurrentStockQuery = 'SELECT stock_count FROM my_stock WHERE user_account = 10000000001';

    connection.query(getCurrentStockQuery, (err, rows) => {
        if (err) {
            console.error('Error retrieving current stock count from MySQL:', err);
            return res.status(500).json({ error: 'Failed to retrieve current stock count' });
        }

        // 현재 주식 개수 확인
        const currentStockCount = rows[0].stock_count;

        // 판매하려는 주식 개수가 현재 주식 개수보다 많으면 오류 반환
        if (sellAmount > currentStockCount) {
            return res.status(400).json({ error: 'Insufficient stock to sell' });
        }

        // 첫 번째 쿼리: user_account 테이블 업데이트
        const query1 = 'UPDATE user_account SET user_wallet = ? WHERE user_account = 10000000001';

        connection.query(query1, [remainingBalance], (err, result1) => {
            if (err) {
                console.error('Error updating user account in MySQL:', err);
                return res.status(500).json({ error: 'Failed to update user account' });
            }

            // 두 번째 쿼리: my_stock 테이블 업데이트
            const query2 = 'UPDATE my_stock SET stock_count = stock_count - ? WHERE user_account = 10000000001';

            connection.query(query2, [sellAmount], (err, result2) => {
                if (err) {
                    console.error('Error updating my_stock in MySQL:', err);
                    return res.status(500).json({ error: 'Failed to update my_stock' });
                }

                // 모든 업데이트가 성공하면 성공 메시지 반환
                console.log('Investment saved successfully to MySQL');
                res.status(200).json({ message: 'Investment saved successfully' });
            });
        });
    });
});

// 사용자 정보를 반환하는 엔드포인트
app.get('/api/username', (req, res) => {
    // 데이터베이스 쿼리 실행
    connection.query('SELECT user_name FROM user_info WHERE id = 1', (err, rows) => {
        if (err) {
            console.error('Error fetching user data from MySQL:', err);
            res.status(500).json({ error: 'Failed to fetch user data' });
            return;
        }
        // 결과를 JSON 형식으로 응답
        res.json(rows[0]);
    });
});

app.get('/api/userbirth', (req, res) => {
    // 데이터베이스 쿼리 실행
    connection.query('SELECT user_birth FROM user_info WHERE id = 1', (err, rows) => {
        if (err) {
            console.error('Error fetching user data from MySQL:', err);
            res.status(500).json({ error: 'Failed to fetch user data' });
            return;
        }
        // 결과를 JSON 형식으로 응답
        res.json(rows[0]);
    });
});

app.get('/api/userphone', (req, res) => {
    // 데이터베이스 쿼리 실행
    connection.query('SELECT user_phone FROM user_info WHERE id = 1', (err, rows) => {
        if (err) {
            console.error('Error fetching user data from MySQL:', err);
            res.status(500).json({ error: 'Failed to fetch user data' });
            return;
        }
        // 결과를 JSON 형식으로 응답
        res.json(rows[0]);
    });
});

app.get('/api/useraccount', (req, res) => {
    // 데이터베이스 쿼리 실행
    connection.query('SELECT user_account FROM user_info WHERE id = 1', (err, rows) => {
        if (err) {
            console.error('Error fetching user data from MySQL:', err);
            res.status(500).json({ error: 'Failed to fetch user data' });
            return;
        }
        // 결과를 JSON 형식으로 응답
        res.json(rows[0]);
    });
});

// 주식 이름을 가져오는 엔드포인트
app.get('/api/stockNames', (req, res) => {
    // 데이터베이스에서 주식 이름을 가져오는 쿼리
    const query = 'SELECT stock_id FROM my_stock WHERE user_account=10000000001';

    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching stock names from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch stock names' });
        }

        // 주식 이름 배열을 클라이언트에 응답
        const stockNames = rows.map(row => row.stock_id);
        //const stockNames = rows;
        res.json(stockNames);
    });
});

// 특정 주식의 상세 정보를 가져오는 엔드포인트
app.get('/api/stockInfo/:stockId', (req, res) => {
    const stockId = req.params.stockId;
    const query = 'SELECT * FROM stock_info WHERE itmsNm = ?';

    connection.query(query, [stockId], (err, rows) => {
        if (err) {
            console.error('Error fetching stock info from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch stock info' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.json(rows[0]);
    });
});

app.get('/api/buymoney/:stockId', (req, res) => {
    const stockId = req.params.stockId;
    const query = 'SELECT * FROM my_stock WHERE stock_id = ?';

    connection.query(query, [stockId], (err, rows) => {
        if (err) {
            console.error('Error fetching stock info from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch stock info' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.json(rows[0]);
    });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
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
*/