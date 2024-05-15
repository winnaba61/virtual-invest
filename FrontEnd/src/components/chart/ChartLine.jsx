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
    const firstDataAvg = (dummyData[0].mkp + dummyData[0].clpr) / 2;
    const minLowest = Math.min(...dummyData.map((entry) => entry.lopr));
    const maxHighest = Math.max(...dummyData.map((entry) => entry.hipr));
    const length = dummyData.length;

    return (
        <div className="chartLine">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer>
                {/* 차트 크기 설정*/}
                <LineChart data={data}>
                    <ReferenceLine strokeDasharray="5 5" y={firstDataAvg} stroke="black" />
                    <XAxis dataKey="basDt" />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="clpr"
                        stroke={dummyData[length - 1].clpr > firstDataAvg ? '#E94560' : '#006DEE'}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
