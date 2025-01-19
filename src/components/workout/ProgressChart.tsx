import React from 'react';
import { Card } from '../common/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ProgressDataPoint {
  date: string;
  value: number;
}

interface ProgressChartProps {
  title: string;
  data: ProgressDataPoint[];
  dataKey: string;
  yAxisLabel?: string;
  color?: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  title,
  data,
  dataKey,
  yAxisLabel,
  color = '#3B82F6'
}) => {
  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name={dataKey}
              stroke={color}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};