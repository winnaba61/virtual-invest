const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // 모듈 import
const app = express();
const port = 3000;

module.exports = app;

// MySQL 연결
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQLpass',
  database: 'swe'
});

connection.connect();

// CORS 설정
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/current-price', (req, res) => {
  const stockName = req.query.stockName; // 클라이언트로부터 주식 종목명 받기
  const query = 'SELECT clpr FROM stock_info WHERE itmsNm = ?';
  connection.query(query, [stockName], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Stock not found');
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
// 보유 자산 가져오기 (POST 요청으로 user_account 받아오기)
app.post('/api/current-wallet', (req, res) => {
  const { user_account } = req.body;
  const query = 'SELECT user_wallet FROM user_account WHERE user_account=?';
  connection.query(query, [user_account], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Server Error');
      return;
    }
    res.json(results[0]);
  });
});

// 사용자 등록
app.post('/api/regist', (req, res) => {
    const { user_name, user_id, user_passwd, user_birth, user_email, user_phone, user_admin } = req.body;

    const query = 'INSERT INTO logins (user_name, user_id, user_passwd, user_birth, user_email, user_phone, user_admin) VALUES(?,?,?,?,?,?,?)';
    const query2 = 'INSERT INTO user_info (user_account, user_password, user_name, user_email, user_phone, user_birth) VALUES (?,?,?,?,?,?);';
    connection.query(query, [user_name, user_id, user_passwd, user_birth, user_email, user_phone, user_admin], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
        }
        connection.query(query2, [user_id, user_passwd, user_name, user_email, user_phone, user_birth], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).send('Server Error');
                return;
            }
            //res.status(200).json({ message: 'regist user' });
            console.log('User registered successfully.');

            // 회원가입 후 user_account 테이블에 초기 자산 설정
            const userAccountQuery = 'INSERT INTO user_account (user_account, user_wallet) VALUES (?, 1000000)';
            connection.query(userAccountQuery, [user_id], (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).send('Server Error');
                    return;
                }
                console.log('User account initialized successfully.');
                res.status(200).json({ message: 'User registered and account initialized successfully.' });

            });
        });
    });
});


// 아이디 중복 체크
app.post('/api/checkID', (req, res) => {
  const checkID = req.body.user_id;
  const check = { ischeck: '' };
  const query = 'SELECT user_account FROM user_info WHERE user_account = ?';
  connection.query(query, [checkID], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Server Error');
      return;
    }
    check.ischeck = result.length <= 0 ? 'null' : 'exist';
    res.send(check);
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

  const query = 'SELECT * FROM user_info WHERE user_account = ?';
  connection.query(query, [loginID], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Server Error');
      return;
    }

    if (result.length > 0) {
      const user = result[0];
      if (user.user_password === loginPasswd) {
        login.islogin = 'ok';
        res.json({ islogin: 'ok', user });
      } else {
        login.islogin = 'fault';
        res.send(login);
      }
    } else {
      login.islogin = 'fault';
      res.send(login);
    }
  });
});

//  아이디 찾기
app.post('/api/findID', (req, res) => {
  const checkName = req.body.user_name;
  const checkBirth = req.body.user_birth;
  const checkPhone = req.body.user_phone;
  const checkEmail = req.body.user_email;
  const check = { ischeck: '' };

  console.log(checkName);
  console.log(checkBirth);
  console.log(checkPhone);
  console.log(checkEmail);

  const query = 'SELECT * FROM logins WHERE user_name = ?';

  connection.query(query, [checkName], (error, result) => {
      console.log(result);
      if (error) {
          console.error('Error executing query:', error);
          res.status(500).send('Server Error');
          return;
      }

      if (result.length > 0) {
          console.log('Name ok');

          if (checkBirth === result[0].user_birth) {
              if (error) {
                  console.error('Error executing query:', error);
                  res.status(500).send('Server Error');
                  return;
              }

              console.log('birth ok');
              if (checkPhone === result[0].user_phone) {
                  if (error) {
                      console.error('Error executing query:', error);
                      res.status(500).send('Server Error');
                      return;
                  }

                  console.log('phone ok');
                  if (checkEmail === result[0].user_email) {
                      if (error) {
                          console.error('Error executing query:', error);
                          res.status(500).send('Server Error');
                          return;
                      }
                      console.log('email ok');

                      const transporter = nodemailer.createTransport({
                          service: 'naver', // gmail을 사용함
                          host: "smtp.naver.net", // 사용할 이메일 서비스의 호스트 주소
                          port: 465, // 이메일 서비스의 포트 번호 (25, 587, 465, 2525 등)
                          auth : {
                              user: 'kwcs_go670@naver.com', // 나의 (작성자) 이메일 주소
                              pass : 'KWCSpass1157!!' // 이메일의 비밀번호
                          }
                      });
            
                      const mailOptions = {
                          from: 'kwcs_go670@naver.com', // 작성자
                          to : result[0].user_email, // 수신자
                          subject : '소프트웨어공학 2조 웹 페이지 아이디', // 메일 제목
                          text : '아이디는 [ '+result[0].user_id+' ]입니다.' // 메일 내용
                      };
            
                      transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                              console.log(error);
                          }
                          else {
                              console.log('Email sent: ' + info.response);
                          }
                      });
  
                      console.log('send email');
                      check.ischeck = 'ok';
                      res.send(check);
                  } else {
                      console.log('email fault');
                      check.ischeck = 'fault';
                      res.send(check);
                  }
              } else {
                  console.log('phone fault');
                  check.ischeck = 'fault';
                  res.send(check);
              }
          } else {
              console.log('birth fault');
              check.ischeck = 'fault';
              res.send(check);
          }
      } else {
          console.log('name fault');
          check.ischeck = 'fault';
          res.send(check);
      }
  });
});

//  패스워드 찾기
app.post('/api/findPass', (req, res) => {
const checkID = req.body.user_id;
const checkName = req.body.user_name;
const checkBirth = req.body.user_birth;
const checkPhone = req.body.user_phone;
const checkEmail = req.body.user_email;
const check = { ischeck: '' };

console.log(checkID);
console.log(checkName);
console.log(checkBirth);
console.log(checkPhone);
console.log(checkEmail);

const query = 'SELECT * FROM logins WHERE user_id = ?';

connection.query(query, [checkID], (error, result) => {
  console.log(result);
  if (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Server Error');
    return;
  }

  if (result.length > 0) {
    console.log('ID ok');

    if (checkName === result[0].user_name) {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Server Error');
        return;
      }

      if (checkBirth === result[0].user_birth) {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).send('Server Error');
          return;
        }

        console.log('birth ok');
        if (checkPhone === result[0].user_phone) {
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server Error');
            return;
          }

          console.log('phone ok');
          if (checkEmail === result[0].user_email) {
            if (error) {
              console.error('Error executing query:', error);
              res.status(500).send('Server Error');
              return;
            }
            console.log('email ok');

            const transporter = nodemailer.createTransport({
              service: 'naver', // gmail을 사용함
              host : "smtp.naver.net", // 사용할 이메일 서비스의 호스트 주소
              port : 465, // 이메일 서비스의 포트 번호 (25, 587, 465, 2525 등)
              auth : {
                user: 'kwcs_go670@naver.com', // 나의 (작성자) 이메일 주소
                pass : 'KWCSpass1157!!' // 이메일의 비밀번호
              }
              });

            const mailOptions = {
              from: 'kwcs_go670@naver.com', // 작성자
              to : result[0].user_email, // 수신자
              subject : '소프트웨어공학 2조 웹 페이지 패스워드', // 메일 제목
              text : '패스워드는 [ ' + result[0].user_passwd + ' ]입니다.' // 메일 내용
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              }
              else {
                console.log('Email sent: ' + info.response);
              }
            });

            console.log('send email');
            check.ischeck = 'ok';
            res.send(check);
          }
          else {
            console.log('email fault');
            check.ischeck = 'fault';
            res.send(check);
          }
        }
        else {
          console.log('phone fault');
          check.ischeck = 'fault';
          res.send(check);
        }
      }
      else {
        console.log('birth fault');
        check.ischeck = 'fault';
        res.send(check);
      }
    }
    else {
      console.log('name fault');
      check.ischeck = 'fault';
      res.send(check);
    }
  }
  else {
    console.log('ID fault');
    check.ischeck = 'fault';
    res.send(check);
  }
});
});

//주식 매수
app.post('/api/invest', (req, res) => {
  const { user_account, stock_name, investmentAmount, remainingBalance, buy_money } = req.body;
  const query1 = 'UPDATE user_account SET user_wallet = ? WHERE user_account = ?';
  connection.query(query1, [remainingBalance, user_account], (err, result1) => {
    if (err) {
      console.error('Error updating user account in MySQL:', err);
      return res.status(500).json({ error: 'Failed to update user account' });
    }

    // 주식이 이미 존재하는지 확인
    const checkStockQuery = 'SELECT * FROM my_stock WHERE user_account = ? AND stock_name = ?';
    connection.query(checkStockQuery, [user_account, stock_name], (err, result) => {
      if (err) {
        console.error('Error checking my_stock in MySQL:', err);
        return res.status(500).json({ error: 'Failed to check my_stock' });
      }

      if (result.length > 0) {
        // 주식이 이미 존재하는 경우 업데이트
        const query2 = 'UPDATE my_stock SET stock_count = stock_count + ?, buy_money = buy_money + ? WHERE user_account = ? AND stock_name = ?';
        connection.query(query2, [investmentAmount, buy_money, user_account, stock_name], (err, result2) => {
          if (err) {
            console.error('Error updating my_stock in MySQL:', err);
            return res.status(500).json({ error: 'Failed to update my_stock' });
          }
          res.status(200).json({ message: 'Investment updated successfully' });
        });
      } else {
        // 주식이 존재하지 않는 경우 삽입
        const query2 = 'INSERT INTO my_stock (user_account, stock_name, stock_count, buy_money, sell_money) VALUES (?, ?, ?, ?, 0)';
        connection.query(query2, [user_account, stock_name, investmentAmount, buy_money], (err, result2) => {
          if (err) {
            console.error('Error inserting into my_stock in MySQL:', err);
            return res.status(500).json({ error: 'Failed to insert into my_stock' });
          }
          res.status(200).json({ message: 'Investment saved successfully' });
        });
      }
    });
  });
});

// 주식 판매
app.post('/api/sell', (req, res) => {
  const { user_account, stock_name, sellAmount, remainingBalance, sellmoney } = req.body;
  const getCurrentStockQuery = 'SELECT stock_count FROM my_stock WHERE user_account = ? AND stock_name = ?';
  connection.query(getCurrentStockQuery, [user_account, stock_name], (err, rows) => {
    if (err) {
      console.error('현재 주식 개수를 조회하는 중 오류 발생:', err);
      return res.status(500).json({ error: '현재 주식 개수를 조회하는 데 실패했습니다.' });
    }

    if (rows.length === 0) {
      // 주식이 존재하지 않는 경우
      return res.status(400).json({ error: '판매할 주식이 존재하지 않습니다.' });
    }

    const currentStockCount = rows[0].stock_count;
    if (sellAmount > currentStockCount) {
      return res.status(400).json({ error: '판매할 주식이 부족합니다.' });
    }

    connection.beginTransaction(err => {
      if (err) {
        console.error('트랜잭션 시작 중 오류 발생:', err);
        return res.status(500).json({ error: '트랜잭션 시작에 실패했습니다.' });
      }

      const updateUserAccountQuery = 'UPDATE user_account SET user_wallet = ? WHERE user_account = ?';
      connection.query(updateUserAccountQuery, [remainingBalance, user_account], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            console.error('user_account 업데이트 중 오류 발생:', err);
            res.status(500).json({ error: 'user_account 업데이트에 실패했습니다.' });
          });
        }

        const updateStockCountQuery = 'UPDATE my_stock SET stock_count = stock_count - ?, sell_money = sell_money + ? WHERE user_account = ? AND stock_name = ?';
        connection.query(updateStockCountQuery, [sellAmount, sellmoney, user_account, stock_name], (err, result) => {
          if (err) {
            return connection.rollback(() => {
              console.error('my_stock 업데이트 중 오류 발생:', err);
              res.status(500).json({ error: 'my_stock 업데이트에 실패했습니다.' });
            });
          }

          connection.commit(err => {
            if (err) {
              return connection.rollback(() => {
                console.error('트랜잭션 커밋 중 오류 발생:', err);
                res.status(500).json({ error: '트랜잭션 커밋에 실패했습니다.' });
              });
            }

            res.status(200).json({ message: '투자가 성공적으로 저장되었습니다.' });
          });
        });
      });
    });
  });
});




// 사용자 정보를 반환하는 엔드포인트
app.post('/api/username', (req, res) => {
  const { user_account } = req.body;
  connection.query('SELECT user_name FROM user_info WHERE user_account = ?', [user_account], (err, rows) => {
    if (err) {
      console.error('Error fetching user data from MySQL:', err);
      res.status(500).json({ error: 'Failed to fetch user data' });
      return;
    }
    res.json(rows[0]);
  });
});

// 생일 정보를 반환하는 엔드포인트 (날짜까지만 포맷팅)
app.post('/api/userbirth', (req, res) => {
  const { user_account } = req.body;
  connection.query('SELECT user_birth FROM user_info WHERE user_account = ?', [user_account], (err, rows) => {
    if (err) {
      console.error('Error fetching user data from MySQL:', err);
      res.status(500).json({ error: 'Failed to fetch user data' });
      return;
    }
    if (rows.length > 0) {
      const userBirth = new Date(rows[0].user_birth);
      const formattedDate = userBirth.getFullYear() + '-' + ('0' + (userBirth.getMonth() + 1)).slice(-2) + '-' + ('0' + userBirth.getDate()).slice(-2);
      res.json({ user_birth: formattedDate });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});



app.post('/api/userphone', (req, res) => {
  const { user_account } = req.body;
  connection.query('SELECT user_phone FROM user_info WHERE user_account = ?', [user_account], (err, rows) => {
    if (err) {
      console.error('Error fetching user data from MySQL:', err);
      res.status(500).json({ error: 'Failed to fetch user data' });
      return;
    }
    res.json(rows[0]);
  });
});

app.post('/api/useraccount', (req, res) => {
  const { user_account } = req.body;
  connection.query('SELECT user_account FROM user_info WHERE user_account = ?', [user_account], (err, rows) => {
    if (err) {
      console.error('Error fetching user data from MySQL:', err);
      res.status(500).json({ error: 'Failed to fetch user data' });
      return;
    }
    res.json(rows[0]);
  });
});

// 주식 이름을 가져오는 엔드포인트
app.post('/api/stockNames', (req, res) => {
  const { user_account } = req.body;
  const query = 'SELECT stock_name FROM my_stock WHERE user_account = ?';
  connection.query(query, [user_account], (err, rows) => {
    if (err) {
      console.error('Error fetching stock names from MySQL:', err);
      return res.status(500).json({ error: 'Failed to fetch stock names' });
    }
    const stockNames = rows.map(row => row.stock_name);
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

// 특정 주식의 매수 정보를 가져오는 엔드포인트
app.post('/api/buymoney/:stockId', (req, res) => {
  const stockId = req.params.stockId;
  const { user_account } = req.body;
  const query = 'SELECT * FROM my_stock WHERE stock_name = ? AND user_account = ?';
  connection.query(query, [stockId, user_account], (err, rows) => {
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

// 매수, 매도 차이 가져오는 엔드포인트
app.post('/api/buymoney', (req, res) => {
  const { user_account } = req.body;
  const query = 'SELECT buy_money, sell_money FROM my_stock WHERE user_account = ?';
  connection.query(query, [user_account], (error, results) => {
    if (error) {
      console.error('쿼리 실행 중 오류 발생:', error);
      res.status(500).send('서버 오류');
      return;
    }

    if (results.length === 0) {
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
const PORT = process.env.PORT || 3000;

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
