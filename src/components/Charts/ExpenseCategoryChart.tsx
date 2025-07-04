import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useBudget } from '../../context/BudgetContext';

const ExpenseCategoryChart: React.FC = () => {
  const { budgetData } = useBudget();
  
  // Group expenses by category
  const expensesByCategory: Record<string, number> = {};
  
  budgetData.expenses.forEach(expense => {
    if (expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] += expense.amount;
    } else {
      expensesByCategory[expense.category] = expense.amount;
    }
  });
  
  // Convert to array for chart
  const chartData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#6B66FF'];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 h-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Expense Breakdown</h3>
      
      {chartData.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px', border: 'none' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseCategoryChart;