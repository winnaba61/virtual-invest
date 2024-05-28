import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { stockDB } from '../../data/stockDB';
import { dummyData } from '../../data/stockInfo/dummyData.js';
import './chartLine.css';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="custom-tooltip">
                <p>날짜: {data.basDt}</p>
                <p>시가: {data.mkp}</p>
                <p>종가: {data.clpr}</p>
                <p>저가: {data.lopr}</p>
                <p>고가: {data.hipr}</p>
            </div>
        );
    }
    return null;
};

export const ChartLine = ({ id, title }) => {
    // const [stockData, setStockData] = useState([]);

    // useEffect(() => {
    //     // 해당 ID에 해당하는 주식 데이터 가져오기
    //     const selectedStock = stockDB.find((stock) => stock.id === id);
    //     // 해당 주식 데이터 파일 가져오기
    //     import(`../../data/stockInfo/${selectedStock.itmsNm}.js`)
    //         .then((module) => {
    //             setStockData([...module.default]);
    //             console.log(selectedStock);
    //         })
    //         .catch((error) => console.error('데이터를 가져오는 동안 오류가 발생했습니다:', error));
    // }, [id]);

    const stockData = dummyData;
    const reversedData = [...stockData].reverse();
    const firstDataAvg = (reversedData[0]?.mkp + reversedData[0]?.clpr) / 2;
    const minLowest = Math.min(...reversedData.map((entry) => entry?.lopr || 0));
    const maxHighest = Math.max(...reversedData.map((entry) => entry?.hipr || 0));
    const length = reversedData.length;

    return (
        <div className="chartLine">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer>
                <LineChart data={reversedData}>
                    <XAxis dataKey="basDt" hide={true} />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="linear"
                        dataKey="clpr"
                        stroke={reversedData[length - 1]?.clpr > firstDataAvg ? '#E94560' : '#006DEE'}
                        dot={false}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
