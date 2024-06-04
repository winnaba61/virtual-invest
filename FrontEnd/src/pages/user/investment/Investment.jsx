import React, { useEffect, useState } from 'react';
import './investment.css';
import { Topbar } from '../../../components/topbar/Topbar';
import { stockDB } from '../../../data/stockDB'; // stockDB import

export const Investment = () => {
    const [userName, setUserName] = useState(null);
    const [userBirth, setUserBirth] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userAcc, setUserAcc] = useState(null);
    const [activeUnit, setActiveUnit] = useState('주'); // 초기 단위를 '주'로 설정
    const [currentPrice, setCurrentPrice] = useState(null); // 현재가 데이터를 위한 상태
    const [currentWallet, setCurrentWallet] = useState(null); // 현재 보유 자산
    const [investmentValue, setInvestmentValue] = useState('');
    const [stockName, setStockName] = useState(''); // 종목명을 위한 상태
    const [foundStock, setFoundStock] = useState(null); // 검색된 주식을 위한 상태
    const [user, setUser] = useState(null); // 초기 사용자 객체 설정을 null로 수정

    useEffect(() => {
        // 로컬 스토리지에서 유저 정보를 가져옴
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserName(user.user_name);
            setUserBirth(user.user_birth);
            setUserPhone(user.user_phone);
            setUserAcc(user.user_account);
            setUser(user); // user 상태 설정
        }
    }, []);

    useEffect(() => {
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
    }, [user]);

    useEffect(() => {
        if (foundStock) {
            setCurrentPrice(foundStock.clpr);
        }
    }, [foundStock]);

    const handleStockSearch = () => {
        const stock = stockDB.find((stock) => stock.itmsNm === stockName);
        if (stock) {
            setFoundStock(stock);
        } else {
            alert('검색된 주식이 없습니다.');
            setFoundStock(null);
            setCurrentPrice(null);
        }
    };

    const handleButtonClickBuy = () => {
        if (!foundStock) {
            alert('먼저 종목명을 입력하고 검색해주세요.');
            return;
        }

        if (!user || !user.user_account) {
            alert('유저 정보가 없습니다. 다시 로그인 해주세요.');
            return;
        }

        if (activeUnit === '주') {
            const investmentAmount = parseInt(investmentValue) * currentPrice;
            console.log('매수:', investmentAmount);
            const remainingBalance = currentWallet - investmentAmount;

            const investableShares = Math.floor(currentWallet / currentPrice); // 투자 가능한 주식 수 계산

            if (investableShares >= parseInt(investmentValue)) {
                // 투자 가능한 주식 수를 초과하는지 확인
                // 서버로 투자한 주 수, 잔여 잔고를 전달
                fetch('http://localhost:3000/api/invest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_account: user.user_account,
                        stock_name: foundStock.itmsNm,
                        investmentAmount: parseInt(investmentValue), // 주 수를 전달
                        remainingBalance,
                        buy_money: investmentAmount,
                    }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log('Investment successful:', data);
                        // 투자가 성공하면 마이페이지로 이동
                        window.location.href = 'http://localhost:5173/mypage';
                    })
                    .catch((error) => {
                        console.error('Error investing:', error);
                        // 투자에 실패하면 오류 메시지 출력
                        alert('투자에 실패했습니다. 다시 시도해주세요.');
                    });
            } else {
                // 투자 가능한 주식 수를 초과하는 경우 경고창 출력
                alert('투자 가능한 주식의 수를 초과했습니다.');
            }
        } else {
            const investmentAmount = parseInt(investmentValue);
            console.log('매수:', investmentAmount);

            // 서버로 투자 금액을 전달
            fetch('http://localhost:3000/api/invest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_account: user.user_account,
                    stock_name: foundStock.itmsNm,
                    investmentAmount: Math.floor(investmentValue / currentPrice),
                    remainingBalance: currentWallet - investmentAmount,
                    buy_money: investmentAmount,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Investment successful:', data);
                    // 투자가 성공하면 마이페이지로 이동
                    window.location.href = 'http://localhost:5173/mypage';
                })
                .catch((error) => {
                    console.error('Error investing:', error);
                    // 투자에 실패하면 오류 메시지 출력
                    alert('투자에 실패했습니다. 다시 시도해주세요.');
                });
        }
    };

    const handleButtonClickSell = () => {
        if (!foundStock) {
            alert('먼저 종목명을 입력하고 검색해주세요.');
            return;
        }

        if (!user || !user.user_account) {
            alert('유저 정보가 없습니다. 다시 로그인 해주세요.');
            return;
        }

        const investmentValueInt = parseInt(investmentValue);
        let sellAmount, sellMoney, remainingBalance;

        if (activeUnit === '주') {
            sellAmount = investmentValueInt;
            sellMoney = sellAmount * currentPrice;
        } else {
            sellMoney = investmentValueInt;
            sellAmount = Math.floor(sellMoney / currentPrice);
        }

        remainingBalance = currentWallet + sellMoney;

        console.log('매도:', sellAmount, sellMoney, remainingBalance);

        fetch('http://localhost:3000/api/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_account: user.user_account,
                stock_name: foundStock.itmsNm,
                sellAmount,
                remainingBalance,
                sellmoney: sellMoney, // 서버에서 기대하는 변수명으로 맞춤
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Sell successful:', data);
                window.location.href = 'http://localhost:5173/mypage';
            })
            .catch((error) => {
                console.error('Error selling:', error);
                alert('매도에 실패했습니다. 다시 시도해주세요.');
            });
    };

    const handleUnitClick = (unit) => {
        setActiveUnit(unit); // 클릭된 단위로 상태 업데이트
    };

    const handleInputChange = (e) => {
        setInvestmentValue(e.target.value);
    };

    return (
        <>
            <Topbar />
            <div className="investment">
                <div className="investment-table-container">
                    <div className="investment-title">종목명</div>
                    <input
                        className="investment-stock-input"
                        type="text"
                        value={stockName}
                        onChange={(e) => setStockName(e.target.value)}
                    />
                    <button className="investment-stock-search-button" onClick={handleStockSearch}>
                        종목 검색
                    </button>
                    {foundStock && (
                        <table className="investment-table">
                            <tbody>
                                <tr>
                                    <th>현재가</th>
                                    <td>
                                        {currentPrice !== null ? Number(currentPrice).toLocaleString() : 'Loading...'}{' '}
                                        원
                                    </td>
                                </tr>
                                <tr>
                                    <th>현재 보유 자산</th>
                                    <td>
                                        {currentWallet !== null ? Number(currentWallet).toLocaleString() : 'Loading...'}{' '}
                                        원
                                    </td>
                                </tr>
                                <tr>
                                    <th>가능 투자 주수</th>
                                    <td>{Number(Math.floor(currentWallet / currentPrice)).toLocaleString()} 주</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="investment-unit-container">
                    <div className="investment-title">단위 설정</div>
                    <button
                        className={`investment-unit-button ${activeUnit === '주' ? 'active' : ''}`}
                        onClick={() => handleUnitClick('주')}
                    >
                        주
                    </button>
                    <button
                        className={`investment-unit-button ${activeUnit === '원' ? 'active' : ''}`}
                        onClick={() => handleUnitClick('원')}
                    >
                        원
                    </button>
                </div>
                <div className="investment-price-container">
                    <div className="investment-title">매수/매도 금액 입력</div>
                    <input
                        className="investment-price"
                        type="number"
                        value={investmentValue}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="investment-pagination">
                    <button className="investment-pagination-button" onClick={handleButtonClickBuy}>
                        매수
                    </button>
                    <button className="investment-pagination-button" onClick={handleButtonClickSell}>
                        매도
                    </button>
                </div>
            </div>
        </>
    );
};
