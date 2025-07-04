import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { Moon, Sun, Download, Trash2 } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { budgetData, toggleTheme } = useBudget();
  
  const handleExportData = () => {
    const dataStr = JSON.stringify(budgetData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `budget_data_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all budget data? This action cannot be undone.')) {
      localStorage.removeItem('budgetData');
      window.location.reload();
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Appearance</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Theme</span>
            <button
              onClick={toggleTheme}
              className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {budgetData.theme === 'dark' ? (
                <>
                  <Sun size={16} className="mr-2 text-yellow-500" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={16} className="mr-2 text-indigo-500" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
        
        <hr className="border-gray-200 dark:border-gray-700" />
        
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Data Management</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Export Data</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download all your budget data as a JSON file
                </p>
              </div>
              <button
                onClick={handleExportData}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Clear All Data</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Remove all your budget data (cannot be undone)
                </p>
              </div>
              <button
                onClick={handleClearData}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} className="mr-2" />
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;