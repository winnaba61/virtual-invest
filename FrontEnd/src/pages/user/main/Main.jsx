import React from 'react';
import './main.css';
import Topbar from '../../../components/topbar/Topbar';
import { ChartLine } from '../../../components/chart/ChartLine';
import { stockDB } from '../../../data/stockDB';

const sortedStocks = stockDB.sort((a, b) => b.vs - a.vs);
const [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10] = sortedStocks
    .slice(0, 10)
    .map((stock) => stock.itmsNm);

export const Main = () => {
    return (
        <>
            <Topbar />
            <div className="main">
                <div className="main-tutorial">
                    <div className="main-tutorial-title">튜토리얼</div>
                    <div>안녕하세요, 소프트웨어공학 2조의 가상투자시뮬레이션 웹사이트에 오신 것을 환영합니다.</div>
                    <div>
                        이 사이트는 주식을 경험해보고 싶지만 실물자산으로 투자하기에 자금적으로 부담되어 망설여지는
                        분들을 위해 제작됐습니다. 사이트를 통해서 다양한 주식 정보를 비교하고, 부여되는 가상계좌와
                        가상자산으로 주식을 투자하고 수익률을 판단해보는 과정을 거칠 수 있습니다.
                    </div>
                    <div className="tutorial-warning">
                        해당 가상투자는 실제 주식장에 영향을 끼치기 않기 때문에 실제 수익률과 다를 수 있습니다.
                    </div>
                </div>
                <div className="main-container">
                    <div className="main-chart-title">전일 대비 변동량 TOP3</div>
                    <div className="main-chart-container">
                        <div className="main-chart">
                            <ChartLine title="전일대비변동률1위" data={data1} />
                        </div>
                        <div className="main-chart">
                            <ChartLine title="전일대비변동률2위" data={data2} />
                        </div>
                        <div className="main-chart">
                            <ChartLine title="전일대비변동률3위" data={data3} />
                        </div>
                    </div>
                    <div className="main-table-container">
                        <table className="main-table" border="1">
                            <thead>
                                <tr>
                                    <th>종목</th>
                                    <th>현재가</th>
                                    <th>전일비</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockDB.slice(0, 15).map((stock) => (
                                    <tr key={stock.id}>
                                        <td id="stock-title">
                                            <a href={`/stockInfo?itmsNm=${stock.itmsNm}`}>{stock.itmsNm}</a>
                                        </td>
                                        <td id="stock-author">
                                            <a href={`/stockInfo?itmsNm=${stock.itmsNm}`}>
                                                {Number(stock.clpr).toLocaleString()}
                                            </a>
                                        </td>
                                        <td id="stock-date">
                                            <a href={`/stockInfo?itmsNm=${stock.itmsNm}`}>
                                                {Number(stock.vs).toLocaleString()}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
