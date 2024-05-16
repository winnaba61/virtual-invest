import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    CartesianGrid,
} from 'recharts';
import { dummyData } from '../../data/dummyData';
import './chartLine.css';

export const ChartLine = ({ title, data }) => {
    const reversedData = [...dummyData].reverse(); // 데이터를 뒤집습니다.
    const firstDataAvg = (reversedData[0].mkp + reversedData[0].clpr) / 2;
    const minLowest = Math.min(...reversedData.map((entry) => entry.lopr));
    const maxHighest = Math.max(...reversedData.map((entry) => entry.hipr));
    const length = reversedData.length;

    return (
        <div className="chartLine">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer>
                {/* 차트 크기 설정*/}
                <LineChart data={reversedData}>
                    {' '}
                    // 뒤집힌 데이터를 사용
                    <ReferenceLine strokeDasharray="5 5" y={firstDataAvg} stroke="black" />
                    <XAxis dataKey="basDt" />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="clpr"
                        stroke={reversedData[length - 1].clpr > firstDataAvg ? '#E94560' : '#006DEE'}
                        dot={false}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
