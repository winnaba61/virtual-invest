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

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="custom-tooltip" id="front">
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

export const ChartCandle01 = ({ title, data }) => {
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
                    {/* // 뒤집힌 데이터를 사용 */}
                    <XAxis dataKey="basDt" hide={true} />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey={(data) => [data.mkp, data.clpr]}>
                        {reversedData.map((data, index) => (
                            <Cell key={index} fill={data.mkp - data.clpr > 0 ? '#E94560' : '#006DEE'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const ChartCandle02 = ({ title, data }) => {
    const reversedData = [...dummyData].reverse(); // 데이터를 뒤집습니다.
    const firstDataAvg = (reversedData[0].mkp + reversedData[0].clpr) / 2;
    const minLowest = Math.min(...reversedData.map((entry) => entry.lopr));
    const maxHighest = Math.max(...reversedData.map((entry) => entry.hipr));
    const length = reversedData.length;

    return (
        <div className="chartCandle" id="back">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer>
                <BarChart data={reversedData}>
                    {' '}
                    {/* // 뒤집힌 데이터를 사용 */}
                    <XAxis dataKey="basDt" hide={true} />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Bar
                        dataKey={(data) => {
                            const range = [data.hipr, data.lopr];
                            return range;
                        }}
                        fill="gray"
                        barSize={2}
                    ></Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
