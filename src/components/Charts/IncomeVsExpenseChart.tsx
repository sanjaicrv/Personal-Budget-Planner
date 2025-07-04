import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useBudget } from '../../context/BudgetContext';

const IncomeVsExpenseChart: React.FC = () => {
  const { budgetData } = useBudget();
  
  // Group data by month
  const monthlyData: Record<string, { month: string, income: number, expense: number }> = {};
  
  // Process incomes
  budgetData.incomes.forEach(income => {
    const date = new Date(income.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { month: monthYear, income: 0, expense: 0 };
    }
    
    monthlyData[monthYear].income += income.amount;
  });
  
  // Process expenses
  budgetData.expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { month: monthYear, income: 0, expense: 0 };
    }
    
    monthlyData[monthYear].expense += expense.amount;
  });
  
  // Convert to array and sort by date
  const chartData = Object.values(monthlyData).sort((a, b) => {
    const [aMonth, aYear] = a.month.split(' ');
    const [bMonth, bYear] = b.month.split(' ');
    
    const aDate = new Date(`${aMonth} 1, ${aYear}`);
    const bDate = new Date(`${bMonth} 1, ${bYear}`);
    
    return aDate.getTime() - bDate.getTime();
  });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 h-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Income vs Expenses</h3>
      
      {chartData.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={chartData}
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
            <Bar dataKey="income" name="Income" fill="#4ade80" />
            <Bar dataKey="expense" name="Expenses" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IncomeVsExpenseChart;