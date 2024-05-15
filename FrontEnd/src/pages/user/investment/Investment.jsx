import { useState } from 'react';
import './investment.css';
import { Topbar } from '../../../components/topbar/Topbar';
import { stockDB } from '../../../data/stockDB';
import { useLocation } from 'react-router-dom';

export const Investment = () => {
    const [activeUnit, setActiveUnit] = useState('주'); // 초기 단위를 '주'로 설정
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const stockId = searchParams.get('stockId') || '1'; // 기본값으로 '1'을 사용
    const stockDetail = stockDB.find((stock) => stock.id === stockId);

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
                    <div className="investment-title" id="stock-name">
                        {stockDetail.itmsNm}
                    </div>
                    <table className="investment-table">
                        <tbody>
                            <tr>
                                <th>1주 당 가격(종가)</th>
                                <td>{Number(stockDetail.clpr).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>현재 보유 자산</th>
                                <td>숫자입니다</td>
                            </tr>
                            <tr>
                                <th>가능 투자 주수</th>
                                <td>숫자입니다</td>
                            </tr>
                        </tbody>
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
