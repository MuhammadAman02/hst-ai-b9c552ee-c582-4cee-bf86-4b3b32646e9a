import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Week 1', alerts: 12, transactions: 5 },
  { name: 'Week 2', alerts: 19, transactions: 8 },
  { name: 'Week 3', alerts: 15, transactions: 6 },
  { name: 'Week 4', alerts: 27, transactions: 11 },
  { name: 'Week 5', alerts: 32, transactions: 14 },
  { name: 'Week 6', alerts: 24, transactions: 9 },
];

const FraudTrendsChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis dataKey="name" className="text-xs fill-gray-500 dark:fill-gray-400" />
          <YAxis className="text-xs fill-gray-500 dark:fill-gray-400" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              color: '#333'
            }} 
          />
          <Legend />
          <Bar dataKey="alerts" name="Alerts Generated" fill="#f87171" radius={[4, 4, 0, 0]} />
          <Bar dataKey="transactions" name="Flagged Transactions" fill="#fbbf24" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FraudTrendsChart;