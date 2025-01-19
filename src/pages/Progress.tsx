
import React from 'react';
import { Card } from '../components/common/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Progress = () => {
  // Example data
  const data = [
    { date: '1/1', weight: 180 },
    { date: '1/8', weight: 178 },
    { date: '1/15', weight: 176 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>

      {/* Weight Progress Chart */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Weight Progress
        </h2>
        <div className="h-[300px] w-full">
          <LineChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </Card>

      {/* Measurements */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Body Measurements
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Chest</p>
            <p className="text-xl font-semibold text-gray-900">42"</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Waist</p>
            <p className="text-xl font-semibold text-gray-900">34"</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Arms</p>
            <p className="text-xl font-semibold text-gray-900">15"</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Progress;
