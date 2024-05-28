import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { dummyData } from '../../data/dummyData';
import './chartBar.css';

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
    const reversedData = [...dummyData].reverse(); // 데이터를 뒤집습니다.
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
