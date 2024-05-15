import './stockInfo.css';
import { Topbar } from '../../../components/topbar/Topbar';
import { stockDB } from '../../../data/stockDB';
import { useLocation } from 'react-router-dom';
import { ChartLine } from '../../../components/chart/ChartLine';
import { ChartCandle } from '../../../components/chart/ChartCandle';
import { dummyData } from '../../../data/dummyData';

export const StockInfo = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const stockId = searchParams.get('id') || '1'; // 기본값으로 '1'을 사용

    // '매수' 버튼 클릭 시 실행되는 함수
    const handleButtonClickBuy = () => {
        // 현재 주식 ID를 사용하여 투자 페이지로 리다이렉트
        window.location.href = `http://localhost:5173/investment?stockId=${stockId}`;
    };
    // '매도' 버튼 클릭 시 실행되는 함수
    const handleButtonClickSell = () => {
        // 현재 주식 ID를 사용하여 투자 페이지로 리다이렉트
        window.location.href = `http://localhost:5173/investment?stockId=${stockId}`;
    };

    const stockDetail = stockDB.find((stock) => stock.id === stockId);

    return (
        <>
            <Topbar />
            <div className="stockinfo">
                <div className="stockinfo-text">
                    <div className="stockinfo-title">{stockDetail.itmsNm}</div>
                    <table className="stockinfo-table">
                        <tbody>
                            <tr>
                                <th>종가</th>
                                <td>{Number(stockDetail.clpr).toLocaleString()}</td>
                                <th>고가</th>
                                <td>{Number(stockDetail.hipr).toLocaleString()}</td>
                                <th>저가</th>
                                <td>{Number(stockDetail.lopr).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>전일 대비 변동</th>
                                <td style={{ color: stockDetail.vs > 0 ? 'var(--positive)' : 'var(--negative)' }}>
                                    {Number(stockDetail.vs).toLocaleString()}
                                </td>
                                <th>시가</th>
                                <td>{Number(stockDetail.mkp).toLocaleString()}</td>
                                <th>상장 주식 수</th>
                                <td>{Number(stockDetail.lstgStCnt).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="stockinfo-line" />
                    <div className="stockinfo-chart-container">
                        <div className="stockinfo-chart">
                            <ChartLine title="라인그래프" data={dummyData} />
                        </div>
                        <div className="stockinfo-chart">
                            <ChartCandle title="캔들그래프" data={dummyData} />
                        </div>
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
