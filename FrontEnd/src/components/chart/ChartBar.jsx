import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import * as stocks from '../../data/stocks'; // stocks 디렉토리의 모든 파일을 가져옴
import './chartBar.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

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

export const ChartBar = ({ title }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itmNm = searchParams.get('itmsNm');
    const stockData = stocks[itmNm]; // itmNm에 해당하는 주식 데이터 가져오기
    const reversedData = [...stockData].reverse(); // 데이터를 뒤집습니다.
    const minLowest = Math.min(...reversedData.map((entry) => entry.lopr));
    const maxHighest = Math.max(...reversedData.map((entry) => entry.hipr));

    return (
        <div className="chartBar">
            <ResponsiveContainer>
                <BarChart data={reversedData}>
                    <XAxis dataKey="basDt" tickFormatter={formatDate} />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="clpr" fill="gray" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
