import React, { useState } from 'react';
import './investment.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const Investment = () => {
    const [activeUnit, setActiveUnit] = useState('주'); // 초기 단위를 '주'로 설정

    const handleButtonClickBuy = () => {
        window.location.href = 'http://localhost:5173/mypage';
    };
    const handleButtonClickSell = () => {
        window.location.href = 'http://localhost:5173/mypage';
    };
    const handleUnitClick = (unit) => {
        setActiveUnit(unit); // 클릭된 단위로 상태 업데이트
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
                            <td>1</td>
                        </tr>
                        <tr>
                            <th>1주 당 가격</th>
                            <td>2</td>
                        </tr>
                        <tr>
                            <th>현재 보유 자산</th>
                            <td>3</td>
                        </tr>
                        <tr>
                            <th>가능 투자 주수</th>
                            <td>4</td>
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
                    <div className="investment-title">투자 금액 입력</div>
                    <input className="investment-price" type="number" />
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
