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
    const firstDataAvg = (dummyData[0].mkp + dummyData[0].clpr) / 2;
    const minLowest = Math.min(...dummyData.map((entry) => entry.lopr));
    const maxHighest = Math.max(...dummyData.map((entry) => entry.hipr));
    const length = dummyData.length;

    return (
        <div className="chartCandle">
            <h3 className="chart-title">{title}</h3>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="basDt" />
                    <YAxis domain={[minLowest, maxHighest]} hide={true} />
                    <Tooltip />
                    <Bar
                        dataKey={(data) => {
                            const range = [data.hipr, data.lopr];
                            return range;
                        }}
                    >
                        {data.map((data) => (
                            <Cell fill={data.vs > 0 ? '#E94560' : '#006DEE'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
