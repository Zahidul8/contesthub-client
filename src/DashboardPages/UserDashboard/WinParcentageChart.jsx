import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const COLORS = ['#facc15', '#9ca3af']; // Yellow for win, Darker Gray for loss

const WinPercentageChart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Participated contests
  const { data: participated = [] } = useQuery({
    queryKey: ['participated', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/participator?email=${user?.email}`);
      return data;
    },
  });

  // Won contests
  const { data: won = [] } = useQuery({
    queryKey: ['won', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contests-winner?email=${user?.email}`);
      return data;
    },
  });

  const wonCount = won.length;
  const participatedCount = participated.length;

  const chartData = [
    { name: 'Won', value: wonCount },
    { name: 'Participated', value: participatedCount - wonCount }, // Remaining = loss
  ];

  return (
    <div className="max-w-md mx-auto p-5 bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Win Percentage</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <p className="text-center mt-4 text-gray-600 font-semibold">
        {wonCount}/{participatedCount} contests won
      </p>
    </div>
  );
};

export default WinPercentageChart;
