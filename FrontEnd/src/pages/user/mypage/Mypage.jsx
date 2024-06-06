import React, { useState, useEffect } from 'react';
import './mypage.css';
import { Topbar } from '../../../components/topbar/Topbar';
import { stockDB } from '../../../data/stockDB'; // stockDB import

export const Mypage = () => {
    const [userName, setUserName] = useState(null);
    const [userBirth, setUserBirth] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userAcc, setUserAcc] = useState(null);
    const [currentWallet, setCurrentWallet] = useState(null);
    const [stockNames, setStockNames] = useState([]);
    const [stockInfos, setStockInfos] = useState({});
    const [stockEach, setStockEach] = useState({});
    const [buyMoney, setBuyMoney] = useState(null);
    const [calculatedValue, setCalculatedValue] = useState({});
    const [calculatedValue2, setCalculatedValue2] = useState({});
    const [calculatedValue3, setCalculatedValue3] = useState({});
    const [calculatedValue4, setCalculatedValue4] = useState({});

    useEffect(() => {
        // 로컬 스토리지에서 유저 정보를 가져옴
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserName(user.user_name);
            setUserBirth(user.user_birth);
            setUserPhone(user.user_phone);
            setUserAcc(user.user_account);
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.user_account) {
            fetch('http://localhost:3000/api/current-wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_account: user.user_account }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((wallet_data) => {
                    console.log('Received data:', wallet_data);
                    setCurrentWallet(wallet_data.user_wallet);
                })
                .catch((error) => {
                    console.error('Error fetching:', error);
                });
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.user_account) {
            fetch('http://localhost:3000/api/stockNames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_account: user.user_account }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Received data:', data);
                    setStockNames(data);
                })
                .catch((error) => {
                    console.error('Error fetching:', error);
                });
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.user_account) {
            fetch('http://localhost:3000/api/buymoney', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_account: user.user_account }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Buy Money:', data.buyMoney);
                    console.log('Sell Money:', data.sellMoney);
                    console.log('Difference:', data.difference);
                    setBuyMoney(data.difference);
                })
                .catch((error) => {
                    console.error('Error fetching:', error);
                });
        }
    }, []);

    const fetchStockInfo = async (stockName) => {
        if (!stockInfos[stockName]) {
            try {
                const response = await fetch(`http://localhost:3000/api/stockInfo/${stockName}`);
                const data = await response.json();
                setStockInfos((prev) => ({ ...prev, [stockName]: data }));
            } catch (error) {
                console.error('Error fetching stock info:', error);
                setStockInfos((prev) => ({ ...prev, [stockName]: 'Failed to fetch' }));
            }
        }
        return stockInfos[stockName];
    };

    const fetchStockInfo2 = async (stockName) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.user_account && !stockEach[stockName]) {
            try {
                const response = await fetch(`http://localhost:3000/api/buymoney/${stockName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_account: user.user_account }),
                });
                const data = await response.json();
                setStockEach((prev) => ({ ...prev, [stockName]: data }));
            } catch (error) {
                console.error('Error fetching stock info:', error);
                setStockEach((prev) => ({ ...prev, [stockName]: 'Failed to fetch' }));
            }
        }
        return stockEach[stockName];
    };

    const calculateValues = () => {
        stockNames.forEach((stock) => {
            const stockInfoData = stockDB.find((item) => item.itmsNm === stock) || {}; // stockDB에서 데이터를 가져옴
            const myStockData = stockEach[stock] || {};

            const buyMoney = myStockData.buy_money || 0;
            const sellMoney = myStockData.sell_money || 0;
            const stockCount = myStockData.stock_count || 0;
            const stockPrice = stockInfoData.clpr || 0;

            const calculatedResult = buyMoney - sellMoney - stockCount * stockPrice;
            const calculatedResult2 = ((buyMoney - sellMoney - stockCount * stockPrice) / (buyMoney - sellMoney)) * 100;
            const calculatedResult3 = buyMoney - sellMoney;
            const calculatedResult4 = stockCount * stockPrice;

            setCalculatedValue((prev) => ({ ...prev, [stock]: calculatedResult }));
            setCalculatedValue2((prev) => ({ ...prev, [stock]: calculatedResult2 }));
            setCalculatedValue3((prev) => ({ ...prev, [stock]: calculatedResult3 }));
            setCalculatedValue4((prev) => ({ ...prev, [stock]: calculatedResult4 }));
        });
    };

    useEffect(() => {
        calculateValues();
    }, [stockNames, stockInfos, stockEach]);

    useEffect(() => {
        const calculateStockValues2 = async () => {
            for (const stock of stockNames) {
                try {
                    const stockInfoData = stockDB.find((item) => item.itmsNm === stock); // stockDB에서 데이터를 가져옴
                    const myStockData = await fetchStockInfo2(stock);
                    const calculatedResult2 =
                        ((myStockData?.buy_money -
                            myStockData?.sell_money -
                            myStockData?.stock_count * stockInfoData?.clpr) /
                            (myStockData?.buy_money - myStockData?.sell_money)) *
                        100;
                    setCalculatedValue2((prev) => ({ ...prev, [stock]: calculatedResult2 }));
                } catch (error) {
                    console.error('Error fetching stock info:', error);
                    setCalculatedValue2((prev) => ({ ...prev, [stock]: 'Failed to fetch' }));
                }
            }
        };

        calculateStockValues2();
    }, [stockNames]);

    useEffect(() => {
        const calculateStockValues3 = async () => {
            for (const stock of stockNames) {
                try {
                    const stockInfoData = stockDB.find((item) => item.itmsNm === stock); // stockDB에서 데이터를 가져옴
                    const myStockData = await fetchStockInfo2(stock);
                    const calculatedResult3 = myStockData?.buy_money - myStockData?.sell_money;
                    setCalculatedValue3((prev) => ({ ...prev, [stock]: calculatedResult3 }));
                } catch (error) {
                    console.error('Error fetching stock info:', error);
                    setCalculatedValue3((prev) => ({ ...prev, [stock]: 'Failed to fetch' }));
                }
            }
        };

        calculateStockValues3();
    }, [stockNames]);

    useEffect(() => {
        const calculateStockValues4 = async () => {
            for (const stock of stockNames) {
                try {
                    const stockInfoData = stockDB.find((item) => item.itmsNm === stock); // stockDB에서 데이터를 가져옴
                    const myStockData = await fetchStockInfo2(stock);
                    const calculatedResult4 = myStockData?.stock_count * stockInfoData?.clpr;
                    setCalculatedValue4((prev) => ({ ...prev, [stock]: calculatedResult4 }));
                } catch (error) {
                    console.error('Error fetching stock info:', error);
                    setCalculatedValue4((prev) => ({ ...prev, [stock]: 'Failed to fetch' }));
                }
            }
        };

        calculateStockValues4();
    }, [stockNames]);

    return (
        <>
            <Topbar />
            <div className="mypage">
                <div className="mypage-user-container">
                    <div className="mypage-title">개인 정보</div>
                    <table className="mypage-info-table">
                        <tr>
                            <th>이름</th>
                            <td>{userName !== null ? userName : 'Loading...'}</td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td>{userBirth !== null ? userBirth.split('T')[0] : 'Loading...'}</td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                {userPhone !== null
                                    ? userPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
                                    : 'Loading...'}
                            </td>
                        </tr>
                        <tr>
                            <th>가상계좌</th>
                            <td>{userAcc !== null ? userAcc : 'Loading...'}</td>
                        </tr>
                    </table>
                </div>
                <div className="mypage-stocks-container">
                    <div className="mypage-title">
                        개인 투자 상세 정보<a className="mypage-subtitle">(단위: 원)</a>
                    </div>
                    <table className="mypage-stocks-table">
                        <tr>
                            <th>초기 투자 자금</th>
                            <td>1000000 원</td>
                        </tr>
                        <tr>
                            <th>매수 원금</th>
                            <td>
                                {stockNames.length > 0
                                    ? stockNames.reduce((totalProfit, stock) => {
                                          const profit =
                                              typeof calculatedValue3[stock] === 'number' ? calculatedValue3[stock] : 0;
                                          return totalProfit + profit;
                                      }, 0) + ' 원'
                                    : 'Loading...'}
                            </td>
                        </tr>
                        <tr>
                            <th>총 주식 평가금액</th>
                            <td>
                                {stockNames.length > 0
                                    ? stockNames.reduce((totalProfit4, stock) => {
                                          const profit4 =
                                              typeof calculatedValue4[stock] === 'number' ? calculatedValue4[stock] : 0;
                                          return totalProfit4 + profit4;
                                      }, 0) + ' 원'
                                    : 'Loading...'}
                            </td>
                        </tr>
                        <tr>
                            <th>현 투자 가능 금액</th>
                            <td>{currentWallet !== null ? currentWallet : 'Loading...'} 원</td>
                        </tr>
                    </table>
                </div>
                <div className="mypage-stock-container">
                    <div className="mypage-title">
                        보유 주식 정보
                        <a className="mypage-subtitle">(주식의 상세 정보를 알고 싶다면 종목명을 클릭하세요)</a>
                    </div>
                    <table className="mypage-stock-table">
                        <tr>
                            <th>종목명</th>
                            <th>수익률</th>
                            <th>수익금액</th>
                            <th>보유 주식 수</th>
                        </tr>
                        {stockNames.map((stock, index) => (
                            <tr key={index}>
                                <td>
                                    <a href={`/stockInfo/${stock}`}>{stock}</a>
                                </td>
                                <td>
                                    {typeof calculatedValue2[stock] === 'number'
                                        ? calculatedValue2[stock].toFixed(2)
                                        : 'Loading...'}{' '}
                                    %
                                </td>
                                <td>
                                    {typeof calculatedValue[stock] === 'number'
                                        ? calculatedValue[stock].toFixed(2)
                                        : 'Loading...'}{' '}
                                    원
                                </td>
                                <td>
                                    {fetchStockInfo2(stock) ? stockEach[stock]?.stock_count || '-' : 'Loading...'} 주
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    );
};
