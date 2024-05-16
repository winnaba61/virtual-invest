import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    CartesianGrid,
    Cell,
} from 'recharts';
import { dummyData } from '../../data/dummyData';
import './chartCandle.css';

export const ChartCandle = ({ title, data }) => {
    const reversedData = [...dummyData].reverse(); // 데이터를 뒤집습니다.
    const firstDataAvg = (reversedData[0].mkp + reversedData[0].clpr) / 2;
    const minLowest = Math.min(...reversedData.map((entry) => entry.lopr));
    const maxHighest = Math.max(...reversedData.map((entry) => entry.hipr));
    const length = reversedData.length;

    return (
        <div className="chartCandle">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer>
                <BarChart data={reversedData}>
                    {' '}
                    // 뒤집힌 데이터를 사용
                    <XAxis dataKey="basDt" />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip />
                    <Bar
                        dataKey={(data) => {
                            const range = [data.lopr, data.hipr];
                            return range;
                        }}
                    >
                        {reversedData.map((data) => (
                            <Cell fill={data.vs > 0 ? '#E94560' : '#006DEE'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
