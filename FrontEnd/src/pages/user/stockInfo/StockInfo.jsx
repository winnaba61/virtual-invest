import React from 'react';
import './stockInfo.css';
import { Topbar } from '../../../components/topbar/Topbar';

export const StockInfo = () => {
    const handleButtonClickBuy = () => {
        window.location.href = 'http://localhost:5173/investment';
    };
    const handleButtonClickSell = () => {
        window.location.href = 'http://localhost:5173/investment';
    };

    return (
        <>
            <Topbar />
            <div className="stockinfo">
                <div className="stockinfo-text">
                    <div className="stockinfo-title">종목명</div>
                    <table className="stockinfo-table">
                        <tr>
                            <th>현재가</th>
                            <td>1</td>
                            <th>등락률</th>
                            <td>2</td>
                        </tr>
                        <tr>
                            <th>PBR</th>
                            <td>3</td>
                            <th>PER</th>
                            <td>4</td>
                            <th>ROE</th>
                            <td>5</td>
                        </tr>
                    </table>
                    <div className="stockinfo-line" />
                    <div className="stockinfo-chart-container">
                        <div className="stockinfo-chart">라인그래프</div>
                        <div className="stockinfo-chart">캔들그래프</div>
                    </div>
                    <div className="stockinfo-pagination">
                        <button className="stockinfo-pagination-button" onClick={handleButtonClickBuy}>
                            매수
                        </button>
                        <button className="stockinfo-pagination-button" onClick={handleButtonClickSell}>
                            매도
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
