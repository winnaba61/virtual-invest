const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const mysql = require('mysql');
const cors = require('cors');
const { token } = require('morgan');

const app = express();
const port = 3000;

module.exports = app;

// MySQL 연결
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'project3',
});

connection.connect();

// CORS 설정
app.use(cors());

app.get('/api/current-price', (req, res) => {
    //시가 가져오기
    const query = 'SELECT clpr FROM stock_info WHERE itmsNm="이스트아시아홀딩스"';
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
    const query = 'SELECT user_wallet FROM user_account WHERE user_account=1000000001';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.json(results[0]);
    });
});

// 관리자인지 여부를 확인
// 요청 형식: ~/api/admin?id=(getLoginId로 얻어온 key)
app.get('/api/admin', (req, res) => {
    const query = 'SELECT user_admin FROM logins WHERE id=?';
    connection.query(query, [req.query.id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.json(results[0]);
    });
    
});

// 관리자인지 여부를 확인
// 요청 형식: ~/api/admin?id=(getLoginId로 얻어온 key)
app.get('/api/userName', (req, res) => {
    const query = 'SELECT user_name FROM logins WHERE id=?';
    connection.query(query, [req.query.id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.json(results[0]);
    });
});

// board: 공지 게시글 제목만 가져오기
    app.get('/api/mBoardHeadlines', (req, res) => {
        const query = 'SELECT id, author, title, createdAt as date FROM boards WHERE isNotice=1';
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Server Error');
                return;
            }
            res.json(results);
        });
    });

// board: 일반 게시글 제목만 가져오기
app.get('/api/boardHeadlines', (req, res) => {
    const query = 'SELECT id, author, title, createdAt as date FROM boards WHERE isNotice=0';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.json(results);
    });
});

// POST 요청 처리
app.use(express.json());

//  사용자 등록. 이름, 아이디, 패스워드, 생년월일, 이메일.
app.post('/api/regist', (req, res) => {
    const { user_name, user_id, user_passwd, user_birth, user_email, user_admin } = req.body;

    const query = 'INSERT INTO logins (user_name, user_id, user_passwd, user_birth, user_email, user_admin) VALUES(?,?,?,?,?,?)';

    connection.query(query, [user_name, user_id, user_passwd, user_birth, user_email, user_admin], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        console.log('regist user');
        res.status(200).json({ message: 'regist user' });
    });
});

//  아이디 중복 체크. 중복 체크하지 않으면 회원가입 실패.
app.post('/api/checkID', (req, res) => {
    const checkID = req.body.user_id;
    const check = { ischeck: '' };

    const query = 'SELECT user_id FROM logins WHERE user_id = ?';

    connection.query(query, [checkID], (error, result) => {
        console.log(result);
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }

        if (result.length <= 0) {
            check.ischeck = 'null';
            res.send(check);
        } else {
            check.ischeck = 'exist';
            res.send(check);
        }
    });
});

app.post('/api/setLoginInfo', (req, res) => {
    const userID = req.body.user_id;

    const query0 = 'SELECT id FROM logins WHERE user_id = ?';
    const query1 = 'DELETE FROM user_loginInfo WHERE user_key = ?'
    const query2 = 'INSERT INTO user_loginInfo (user_key, tokenKey) VALUES(?,?)';

    connection.query(query0, [userID], (error, result) => {
        const userKey = result[0].id;
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        connection.query(query1, [userKey], (error, result) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Server Error');
                return;
            }
            const tokenVal = Math.floor(Math.random() * 0x7FFFFFFF);
            connection.query(query2, [userKey, tokenVal], (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).send('Server Error');
                    return;
                }
                console.log(userID +' is loged in with ' + tokenVal);
                res.status(200).json({ message: 'set login info', token: tokenVal });
            });
        });
    });
});

app.post('/api/getLoginId', (req, res) => {
    const query1 = 'DELETE FROM user_loginInfo WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 HOUR)'; //1시간 지나면 로그인 정보 삭제
    const query2 = 'SELECT user_key FROM user_loginInfo WHERE tokenKey = ?';

    // 우선 한시간 지난 로그인 정보 삭제
    connection.query(query1, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }

        // 받은 토큰을 가지고 id로 변환 후 반환
        connection.query(query2, [req.body.token], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Server Error');
                return;
            }

            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: 'Login info not found' });
            }
        });
    });
});
//  로그인
app.post('/api/login', (req, res) => {
    const loginID = req.body.user_id;
    const loginPasswd = req.body.user_passwd;
    const login = { islogin: '' };

    console.log(loginID);
    console.log(loginPasswd);

    const query = 'SELECT * FROM logins WHERE user_id = ?';

    connection.query(query, [loginID], (error, result) => {
        console.log(result);
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }

        if (result.length > 0) {
            console.log('ID ok');

            if (loginPasswd === result[0].user_passwd) {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).send('Server Error');
                    return;
                }

                console.log('passwd ok');
                login.islogin = 'ok';
                res.send(login);
            } else {
                console.log('passwd fault');
                login.islogin = 'fault';
                res.send(login);
            }
        } else {
            console.log('id fault');
            login.islogin = 'fault';
            res.send(login);
        }
    });
});

app.post('/api/invest', (req, res) => {
    const { investmentAmount, remainingBalance, buy_money } = req.body;

    // 첫 번째 쿼리: user_account 테이블 업데이트
    const query1 = 'UPDATE user_account SET user_wallet = ? WHERE user_account = 1000000001';

    connection.query(query1, [remainingBalance], (err, result1) => {
        if (err) {
            console.error('Error updating user account in MySQL:', err);
            return res.status(500).json({ error: 'Failed to update user account' });
        }

        // 두 번째 쿼리: my_stock 테이블 업데이트
        const query2 = 'UPDATE my_stock SET stock_count= stock_count + ? WHERE user_account=1000000001';

        connection.query(query2, [investmentAmount], (err, result2) => {
            if (err) {
                console.error('Error updating my_stock in MySQL:', err);
                return res.status(500).json({ error: 'Failed to update my_stock' });
            }

            const query3 = 'UPDATE my_stock SET buy_money= buy_money + ? WHERE user_account=1000000001';

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
    const { sellAmount, remainingBalance, sellmoney } = req.body;

    // my_stock 테이블에서 현재 주식 개수 조회
    const getCurrentStockQuery = 'SELECT stock_count FROM my_stock WHERE user_account = 1000000001';

    connection.query(getCurrentStockQuery, (err, rows) => {
        if (err) {
            console.error('현재 주식 개수를 조회하는 중 오류 발생:', err);
            return res.status(500).json({ error: '현재 주식 개수를 조회하는 데 실패했습니다.' });
        }

        const currentStockCount = rows[0].stock_count;

        if (sellAmount > currentStockCount) {
            return res.status(400).json({ error: '판매할 주식이 부족합니다.' });
        }

        // 트랜잭션 시작
        connection.beginTransaction((err) => {
            if (err) {
                console.error('트랜잭션 시작 중 오류 발생:', err);
                return res.status(500).json({ error: '트랜잭션 시작에 실패했습니다.' });
            }

            // 첫 번째 쿼리: user_account 업데이트
            const updateUserAccountQuery = 'UPDATE user_account SET user_wallet = ? WHERE user_account = 1000000001';
            connection.query(updateUserAccountQuery, [remainingBalance], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('user_account 업데이트 중 오류 발생:', err);
                        res.status(500).json({ error: 'user_account 업데이트에 실패했습니다.' });
                    });
                }

                // 두 번째 쿼리: my_stock 업데이트
                const updateStockCountQuery =
                    'UPDATE my_stock SET stock_count = stock_count - ? WHERE user_account = 1000000001';
                connection.query(updateStockCountQuery, [sellAmount], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('my_stock 업데이트 중 오류 발생:', err);
                            res.status(500).json({ error: 'my_stock 업데이트에 실패했습니다.' });
                        });
                    }

                    // 세 번째 쿼리: sellmoney 업데이트
                    const updateSellMoneyQuery =
                        'UPDATE my_stock SET sell_money = sell_money + ? WHERE user_account = 1000000001';
                    connection.query(updateSellMoneyQuery, [sellmoney], (err, result) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('sellmoney 업데이트 중 오류 발생:', err);
                                res.status(500).json({ error: 'sellmoney 업데이트에 실패했습니다.' });
                            });
                        }

                        // 트랜잭션 커밋
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    console.error('트랜잭션 커밋 중 오류 발생:', err);
                                    res.status(500).json({ error: '트랜잭션 커밋에 실패했습니다.' });
                                });
                            }

                            console.log('투자가 MySQL에 성공적으로 저장되었습니다.');
                            res.status(200).json({ message: '투자가 성공적으로 저장되었습니다.' });
                        });
                    });
                });
            });
        });
    });
});

// 사용자 정보를 반환하는 엔드포인트
app.get('/api/username', (req, res) => {
    // 데이터베이스 쿼리 실행
    connection.query('SELECT user_name FROM user_info WHERE user_account = 1000000001', (err, rows) => {
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
    connection.query('SELECT user_birth FROM user_info WHERE user_account = 1000000001', (err, rows) => {
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
    connection.query('SELECT user_phone FROM user_info WHERE user_account = 1000000001', (err, rows) => {
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
    connection.query('SELECT user_account FROM user_info WHERE user_account = 1000000001', (err, rows) => {
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
    const query = 'SELECT stock_name FROM my_stock WHERE user_account=1000000001';

    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching stock names from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch stock names' });
        }

        // 주식 이름 배열을 클라이언트에 응답
        const stockNames = rows.map((row) => row.stock_name);
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
    const query = 'SELECT * FROM my_stock WHERE stock_name = ?';

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

app.get('/api/buymoney', (req, res) => {
    // my_stock 테이블에서 buy_money와 sell_money 값을 가져오기 위한 쿼리
    const query = 'SELECT buy_money, sell_money FROM my_stock WHERE user_account = 1000000001';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('쿼리 실행 중 오류 발생:', error);
            res.status(500).send('서버 오류');
            return;
        }

        if (results.length === 0) {
            // 결과가 없는 경우
            res.status(404).send('데이터를 찾을 수 없습니다.');
            return;
        }

        const buyMoney = results[0].buy_money;
        const sellMoney = results[0].sell_money;
        const difference = buyMoney - sellMoney;

        res.json({ buyMoney, sellMoney, difference });
    });
});

module.exports = app;

// board: 글 등록하기
app.put('/api/writeBoard', (req, res) => {
    const query = 'INSERT INTO boards (author, title, content, login_id) VALUES(?,?,?,?)';
    connection.query(query, [req.body.author, req.body.title, req.body.content, req.body.login_id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.status(201).json('success to insert the message');
    });
});

// manager board: 글 등록하기
app.put('/api/writeBoardM', (req, res) => {
    const query = 'INSERT INTO boards (author, title, content, login_id, isNotice) VALUES(?,?,?,?,?)';
    connection.query(query, [req.body.author, req.body.title, req.body.content, req.body.login_id, req.body.isNotice], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.status(201).json('success to insert the message');
    });
});

// board: 글 조회하기
app.get('/api/readBoard', (req, res) => {
    const postId = req.query.id;
    const query = 'SELECT author, title, content, createdAt as date, login_id FROM boards where id = ?'
    connection.query(query, [postId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.json(results[0]);
    });
});

// board: 글 수정하기
app.put('/api/modifyBoard', (req, res) => {
    const query = 'UPDATE boards SET title = ?, content = ? WHERE id = ?';
    connection.query(query, [req.body.title, req.body.content, req.query.id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.status(201).json('success to modify with the message');
    });
});

app.delete('/api/deleteBoard', (req, res) => {
    const query = 'DELETE FROM boards WHERE id = ?';
    connection.query(query, [req.query.id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        res.status(201).json('success to delete the page');
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
