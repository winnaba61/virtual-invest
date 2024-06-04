import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useLocation } from 'react-router-dom';
import './chartLine.css';
import * as stocks from '../../data/stocks'; // stocks 디렉토리의 모든 파일을 가져옴

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

// 날짜 형식을 변환하는 함수
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}`;
};

export const ChartLineURL = ({ title }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itmNm = searchParams.get('itmsNm');
    const stockData = stocks[itmNm]; // itmNm에 해당하는 주식 데이터 가져오기

    if (!stockData) {
        return <div>No data available</div>;
    }

    const reversedData = [...stockData].reverse();
    const minLowest = Math.min(...reversedData.map((entry) => entry?.lopr || 0));
    const maxHighest = Math.max(...reversedData.map((entry) => entry?.hipr || 0));
    const length = reversedData.length;

    return (
        <div className="chartLineURL">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer>
                <LineChart data={reversedData}>
                    <XAxis dataKey="basDt" hide={true} />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="linear"
                        dataKey="clpr"
                        stroke={reversedData[length - 1].clpr > reversedData[length - 2].clpr ? '#FF3B30' : '#007AFF'}
                        dot={false}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const ChartLine = ({ data }) => {
    const stockData = stocks[data];

    if (!stockData) {
        return <div>No data available</div>;
    }

    const reversedData = [...stockData].reverse();
    const minLowest = Math.min(...reversedData.map((entry) => entry?.lopr || 0));
    const maxHighest = Math.max(...reversedData.map((entry) => entry?.hipr || 0));
    const length = reversedData.length;

    return (
        <div className="chartLine">
            <h3 className="chart-title">{data}</h3>
            <ResponsiveContainer>
                <LineChart data={reversedData}>
                    <XAxis dataKey="basDt" tickFormatter={formatDate} />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="linear"
                        dataKey="clpr"
                        stroke={reversedData[length - 1].clpr > reversedData[length - 2].clpr ? '#FF3B30' : '#007AFF'}
                        dot={false}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
