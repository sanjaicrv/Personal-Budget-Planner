import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useBudget } from '../../context/BudgetContext';

const SavingsProgressChart: React.FC = () => {
  const { budgetData } = useBudget();
  
  // Calculate monthly savings (income - expenses)
  const monthlySavings: Record<string, { month: string, savings: number }> = {};
  
  // Create a map of all months with expenses and incomes
  const allMonths = new Set<string>();
  
  // Process incomes
  budgetData.incomes.forEach(income => {
    const date = new Date(income.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    allMonths.add(monthYear);
  });
  
  // Process expenses
  budgetData.expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    allMonths.add(monthYear);
  });
  
  // Initialize all months with zero values
  Array.from(allMonths).forEach(month => {
    monthlySavings[month] = { month, savings: 0 };
  });
  
  // Calculate income for each month
  budgetData.incomes.forEach(income => {
    const date = new Date(income.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    monthlySavings[monthYear].savings += income.amount;
  });
  
  // Subtract expenses for each month
  budgetData.expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    monthlySavings[monthYear].savings -= expense.amount;
  });
  
  // Convert to array and sort by date
  const chartData = Object.values(monthlySavings).sort((a, b) => {
    const [aMonth, aYear] = a.month.split(' ');
    const [bMonth, bYear] = b.month.split(' ');
    
    const aDate = new Date(`${aMonth} 1, ${aYear}`);
    const bDate = new Date(`${bMonth} 1, ${bYear}`);
    
    return aDate.getTime() - bDate.getTime();
  });
  
  // Calculate cumulative savings
  let cumulativeSavings = 0;
  const cumulativeData = chartData.map(item => {
    cumulativeSavings += item.savings;
    return {
      ...item,
      cumulativeSavings
    };
  });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 h-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Savings Progress</h3>
      
      {chartData.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={cumulativeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px', border: 'none' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="cumulativeSavings" 
              name="Cumulative Savings" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="savings" 
              name="Monthly Savings" 
              stroke="#82ca9d" 
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SavingsProgressChart;