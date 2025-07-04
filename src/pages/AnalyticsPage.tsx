import React from 'react';
import IncomeVsExpenseChart from '../components/Charts/IncomeVsExpenseChart';
import ExpenseCategoryChart from '../components/Charts/ExpenseCategoryChart';
import SavingsProgressChart from '../components/Charts/SavingsProgressChart';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeVsExpenseChart />
        <ExpenseCategoryChart />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <SavingsProgressChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;