import React, { useState } from 'react';
import './main.css';
import Topbar from '../../../components/topbar/Topbar';
import { dummyData } from '../../../data/dummyData';
import { ChartLine } from '../../../components/chart/ChartLine';

export const Main = () => {
    const [currentPage] = useState(1);
    const stockPerPage = 10;

    //데이터
    const rows = new Array(100).fill(null).map(() => ({
        name: '삼성전자',
        price: 79700,
        change: 5432,
    }));

    // 현재 페이지에 보여질 게시글 계산
    const indexOfLastStock = currentPage * stockPerPage;
    const indexOfFirstStock = indexOfLastStock - stockPerPage;
    const currentStock = rows.slice(indexOfFirstStock, indexOfLastStock);

    return (
        <>
            <Topbar />
            <div className="main">
                <div className="main-container">
                    <div className="main-chart-container">
                        <div className="main-chart">
                            <ChartLine title="코스피" data={dummyData} />
                        </div>
                        <div className="main-chart">
                            <ChartLine title="코스닥" data={dummyData} />
                        </div>
                        <div className="main-chart">
                            <ChartLine title="코스넥" data={dummyData} />
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
                                {currentStock.map((stock) => (
                                    <tr key={stock.id}>
                                        <td id="stock-title">
                                            <a href={`/stockInfo`}>{stock.name}</a>
                                        </td>
                                        <td id="stock-author">
                                            <a href={`/stockInfo`}>{stock.price}</a>
                                        </td>
                                        <td id="stock-date">
                                            <a href={`/stockInfo`}>{stock.change}</a>
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
