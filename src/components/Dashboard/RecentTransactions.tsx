import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const { budgetData } = useBudget();
  
  // Combine incomes and expenses into a single array of transactions
  const transactions = [
    ...budgetData.incomes.map(income => ({
      id: income.id,
      description: income.source,
      amount: income.amount,
      date: income.date,
      type: 'income'
    })),
    ...budgetData.expenses.map(expense => ({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      type: 'expense',
      category: expense.category
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // Get only the 5 most recent transactions

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Transactions</h3>
      
      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No recent transactions</p>
      ) : (
        <div className="space-y-3">
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' 
                    : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
                }`}>
                  {transaction.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{transaction.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString()} 
                    {transaction.type === 'expense' && transaction.category && ` • ${transaction.category}`}
                  </p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.type === 'income' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;