import React from 'react';
import { useBudget } from '../../context/BudgetContext';

const GoalProgress: React.FC = () => {
  const { budgetData } = useBudget();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Savings Goals</h3>
      
      {budgetData.goals.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No savings goals set</p>
      ) : (
        <div className="space-y-4">
          {budgetData.goals.slice(0, 3).map(goal => {
            const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800 dark:text-white">{goal.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                  ₹{goal.currentAmount.toLocaleString()} of ₹{goal.targetAmount.toLocaleString()}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-indigo-500" 
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoalProgress;