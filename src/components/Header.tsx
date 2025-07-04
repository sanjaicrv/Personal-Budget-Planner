import React from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Header: React.FC = () => {
  const { toggleTheme, budgetData } = useBudget();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex justify-between items-center transition-colors duration-200">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-2 text-gray-600 dark:text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Budget Planner</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {budgetData.theme === 'dark' ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;