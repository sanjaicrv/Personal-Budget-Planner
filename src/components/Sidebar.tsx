import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BarChart4, 
  Settings 
} from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Sidebar: React.FC = () => {
  const { budgetData } = useBudget();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/income', name: 'Income', icon: <TrendingUp size={20} /> },
    { path: '/expenses', name: 'Expenses', icon: <TrendingDown size={20} /> },
    { path: '/goals', name: 'Budget Goals', icon: <Target size={20} /> },
    { path: '/analytics', name: 'Analytics', icon: <BarChart4 size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`bg-indigo-700 dark:bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden md:block`}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-xl font-bold">Budget App</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-indigo-600 dark:hover:bg-gray-700"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-800 dark:bg-gray-700'
                      : 'hover:bg-indigo-600 dark:hover:bg-gray-700'
                  } ${isCollapsed ? 'justify-center' : 'space-x-3'}`
                }
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;