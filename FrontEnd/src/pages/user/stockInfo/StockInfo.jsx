import './stockInfo.css';
import { Topbar } from '../../../components/topbar/Topbar';
import { stockDB } from '../../../data/stockDB';
import { useLocation } from 'react-router-dom';
import { ChartLineURL } from '../../../components/chart/ChartLine';
import { ChartCandle01, ChartCandle02 } from '../../../components/chart/ChartCandle';
import { ChartBar } from '../../../components/chart/ChartBar';

export const StockInfo = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const stockName = searchParams.get('itmsNm') || '두산'; // 기본값을 빈 문자열로 설정

    // '매수' 버튼 클릭 시 실행되는 함수
    const handleButtonClickBuy = () => {
        // 현재 주식 종목명을 사용하여 투자 페이지로 리다이렉트
        window.location.href = `http://localhost:5173/investment?stockName=${stockName}`;
    };

    // '매도' 버튼 클릭 시 실행되는 함수
    const handleButtonClickSell = () => {
        // 현재 주식 종목명을 사용하여 투자 페이지로 리다이렉트
        window.location.href = `http://localhost:5173/investment?stockName=${stockName}`;
    };

    const stockDetail = stockDB.find((stock) => stock.itmsNm === stockName);

    if (!stockDetail) {
        return <div>해당 종목명을 찾을 수 없습니다: {stockName}</div>;
    }

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
                            <ChartLineURL itmsNm={stockName} />
                        </div>
                        <div className="stockinfo-chart" id="bar">
                            <ChartBar />
                        </div>
                        <div className="stockinfo-chart" id="candle">
                            <ChartCandle02 />
                        </div>
                        <div className="stockinfo-chart">
                            <ChartCandle01 />
                        </div>
                        <div className="stockinfo-chart" id="bar">
                            <ChartBar />
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
