import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import SummaryCard from '../components/Dashboard/SummaryCard';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import BudgetProgress from '../components/Dashboard/BudgetProgress';
import GoalProgress from '../components/Dashboard/GoalProgress';
import IncomeVsExpenseChart from '../components/Charts/IncomeVsExpenseChart';

const Dashboard: React.FC = () => {
  const { totalIncome, totalExpense, savings } = useBudget();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Income" 
          amount={totalIncome} 
          icon={<TrendingUp size={24} />} 
          className="border-l-4 border-green-500"
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={totalExpense} 
          icon={<TrendingDown size={24} />} 
          className="border-l-4 border-red-500"
        />
        <SummaryCard 
          title="Savings" 
          amount={savings} 
          icon={<Wallet size={24} />} 
          className="border-l-4 border-blue-500"
        />
        <SummaryCard 
          title="Savings Rate" 
          amount={totalIncome > 0 ? (savings / totalIncome) * 100 : 0} 
          icon={<Target size={24} />} 
          className="border-l-4 border-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeVsExpenseChart />
        <div className="grid grid-cols-1 gap-6">
          <BudgetProgress />
          <GoalProgress />
        </div>
      </div>
      
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;