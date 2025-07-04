import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useBudget } from '../context/BudgetContext';

const Layout: React.FC = () => {
  const { budgetData } = useBudget();
  
  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${budgetData.theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;