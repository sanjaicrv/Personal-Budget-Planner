import React from 'react';
import { useBudget } from '../../context/BudgetContext';

const BudgetProgress: React.FC = () => {
  const { budgetData, totalIncome, totalExpense } = useBudget();
  
  // Get the top expense categories
  const expensesByCategory: Record<string, number> = {};
  
  budgetData.expenses.forEach(expense => {
    if (expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] += expense.amount;
    } else {
      expensesByCategory[expense.category] = expense.amount;
    }
  });
  
  const topCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  // Calculate percentage of income spent
  const spentPercentage = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Budget Overview</h3>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Spent: ₹{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {spentPercentage.toFixed(0)}% of income
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              spentPercentage > 90 ? 'bg-red-500' : 
              spentPercentage > 75 ? 'bg-yellow-500' : 
              'bg-green-500'
            }`} 
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
      
      {topCategories.length > 0 ? (
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Top Spending Categories</h4>
          <div className="space-y-2">
            {topCategories.map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                ₹{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
      )}
    </div>
  );
};

export default BudgetProgress;