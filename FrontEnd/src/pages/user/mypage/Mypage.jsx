import React, { useState, useEffect } from 'react';
import './mypage.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Mypage = () => {
    const [userName, setUserName] = useState(null);
    const [userBirth, setUserBirth] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userAcc, setUserAcc] = useState(null);
    const [currentWallet, setCurrentWallet] = useState(null); // 현재 보유 자산
    const [stockNames, setStockNames] = useState([]);
    const [stockInfos, setStockInfos] = useState({});
    const [stockEach, setStockEach] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/username')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data_name) => {
                console.log('Received data:', data_name); // 디버깅 로그 추가
                setUserName(data_name.user_name);
            })
            .catch((error) => {
                console.error('Error fetching:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/userbirth')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data_birth) => {
                console.log('Received data:', data_birth); // 디버깅 로그 추가
                // 날짜를 ISO 형식으로 가져오므로 날짜 부분만 추출하여 사용
                const birthDate = new Date(data_birth.user_birth);
                const formattedDate = birthDate.toISOString().slice(0, 10);
                setUserBirth(formattedDate);
            })
            .catch((error) => {
                console.error('Error fetching:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/userphone')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data_phone) => {
                console.log('Received data:', data_phone); // 디버깅 로그 추가
                setUserPhone(data_phone.user_phone);
            })
            .catch((error) => {
                console.error('Error fetching:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/useraccount')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data_account) => {
                console.log('Received data:', data_account); // 디버깅 로그 추가
                setUserAcc(data_account.user_account);
            })
            .catch((error) => {
                console.error('Error fetching:', error);
            });
    }, []);

    useEffect(() => {
        // 서버로부터 보유 자산 데이터를 요청
        fetch('http://localhost:3000/api/current-wallet')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((wallet_data) => {
                console.log('Received data:', wallet_data); // 디버깅 로그 추가
                setCurrentWallet(wallet_data.user_wallet);
            })
            .catch((error) => {
                console.error('Error fetching:', error);
            });
    }, []);

    useEffect(() => {
        // 서버로부터 주식 이름 배열을 가져오는 함수
        fetch('http://localhost:3000/api/stockNames')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Received data:', data); // 디버깅 로그 추가
                setStockNames(data);
            })
            .catch((error) => {
                console.error('Error fetching:', error);
            });
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
        if (!stockEach[stockName]) {
            try {
                const response = await fetch(`http://localhost:3000/api/buymoney/${stockName}`);
                const data = await response.json();
                setStockEach((prev) => ({ ...prev, [stockName]: data }));
            } catch (error) {
                console.error('Error fetching stock info:', error);
                setStockEach((prev) => ({ ...prev, [stockName]: 'Failed to fetch' }));
            }
        }
        return stockEach[stockName];
    };

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
                            <th>생일</th>
                            <td>{userBirth !== null ? userBirth : 'Loading...'}</td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>{userPhone !== null ? userPhone : 'Loading...'}</td>
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
                            <td>1000000</td>
                        </tr>
                        <tr>
                            <th>매수 원금</th>
                            <td>보유주식 처리 후 입력</td>
                        </tr>
                        <tr>
                            <th>총 주식 평가금액</th>
                            <td>보유주식 처리 후 입력</td>
                        </tr>
                        <tr>
                            <th>현 투자 가능 금액</th>
                            <td>{currentWallet !== null ? currentWallet : 'Loading...'}</td>
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
                                    <a href={'/stockInfo/${stock}'}>{stock}</a>
                                </td>
                                <td>{fetchStockInfo(stock) ? stockInfos[stock]?.vs || '-' : 'Loading...'}</td>
                                <td>{fetchStockInfo(stock) ? stockInfos[stock]?.vs || '-' : 'Loading...'}</td>
                                <td>{fetchStockInfo2(stock) ? stockEach[stock]?.stock_count || '-' : 'Loading...'}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    );
};
