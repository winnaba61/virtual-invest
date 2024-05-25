import React, { useEffect, useState } from 'react';
import './investment.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Investment = () => {

    const [activeUnit, setActiveUnit] = useState('주'); // 초기 단위를 '주'로 설정
    const [currentPrice, setCurrentPrice] = useState(null); // 현재가 데이터를 위한 상태
    const [currentWallet, setCurrentWallet] = useState(null); // 현재 보유 자산
    const [investmentValue, setInvestmentValue] = useState('');

    useEffect(() => {
        // 서버로부터 현재가 데이터를 요청
        fetch('http://localhost:3000/api/current-price')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(price_data => {
                console.log('Received data:', price_data); // 디버깅 로그 추가
                setCurrentPrice(price_data.clpr);
            })
            .catch(error => {
                console.error('Error fetching current price:', error);
            });
    }, []);

    useEffect(() => {
        // 서버로부터 보유 자산 데이터를 요청
        fetch('http://localhost:3000/api/current-wallet')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(wallet_data => {
                console.log('Received data:', wallet_data); // 디버깅 로그 추가
                setCurrentWallet(wallet_data.user_wallet);
            })
            .catch(error => {
                console.error('Error fetching:', error);
            });
    }, []);

    const handleButtonClickBuy = () => {
        // 투자 버튼 클릭 시 동작
        if (activeUnit === '주') {
            const investmentAmount = parseInt(investmentValue) * currentPrice;
            console.log('매수:', investmentAmount);
            const remainingBalance = currentWallet - investmentAmount;

            const investableShares = Math.floor(currentWallet / currentPrice); // 투자 가능한 주식 수 계산

            if (investableShares >= parseInt(investmentValue)) { // 투자 가능한 주식 수를 초과하는지 확인
                // 서버로 투자한 주 수, 잔여 잔고를 전달
                fetch('http://localhost:3000/api/invest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        investmentAmount: Math.floor(investmentAmount / currentPrice),
                        remainingBalance,
                        buy_money: (Math.floor(investmentAmount / currentPrice) * currentPrice),
                    }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Investment successful:', data);
                        // 투자가 성공하면 마이페이지로 이동
                        window.location.href = 'http://localhost:5173/mypage';
                    })
                    .catch(error => {
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
                    investmentAmount: Math.floor(investmentValue / currentPrice),
                    remainingBalance: currentWallet - (Math.floor(investmentValue / currentPrice) * currentPrice), // 잔여 잔고는 변경된 금액으로 계산
                    buy_money: (Math.floor(investmentAmount / currentPrice) * currentPrice),
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Investment successful:', data);
                    // 투자가 성공하면 마이페이지로 이동
                    window.location.href = 'http://localhost:5173/mypage';
                })
                .catch(error => {
                    console.error('Error investing:', error);
                    // 투자에 실패하면 오류 메시지 출력
                    alert('투자에 실패했습니다. 다시 시도해주세요.');
                });
        }
    };

    const handleButtonClickSell = () => {
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
                sellAmount,
                remainingBalance,
                sellmoney: sellMoney, // 서버에서 기대하는 변수명으로 맞춤
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Sell successful:', data);
                window.location.href = 'http://localhost:5173/mypage';
            })
            .catch(error => {
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
                    <table className="investment-table">
                        <tr>
                            <th>현재가</th>
                            <td>{currentPrice !== null ? currentPrice : 'Loading...'} 원</td>
                        </tr>
                        <tr>
                            <th>1주 당 가격</th>
                            <td>{currentPrice !== null ? currentPrice : 'Loading...'} 원</td>
                        </tr>
                        <tr>
                            <th>현재 보유 자산</th>
                            <td>{currentWallet !== null ? currentWallet : 'Loading...'} 원</td>
                        </tr>
                        <tr>
                            <th>가능 투자 주수</th>
                            <td>{Math.floor(currentWallet / currentPrice)} 주</td>
                        </tr>
                    </table>
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
                    <input className="investment-price" type="number" value={investmentValue} onChange={handleInputChange} />
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
