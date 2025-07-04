import React, { useState } from 'react';
import { BudgetGoal } from '../../types';

interface GoalFormProps {
  onSubmit: (goal: Omit<BudgetGoal, 'id'>) => void;
  initialData?: BudgetGoal;
  onCancel?: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState<Omit<BudgetGoal, 'id'>>({
    name: initialData?.name || '',
    targetAmount: initialData?.targetAmount || 0,
    currentAmount: initialData?.currentAmount || 0,
    deadline: initialData?.deadline || new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Goal Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div>
        <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Target Amount ($)
        </label>
        <input
          type="number"
          id="targetAmount"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div>
        <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Current Amount ($)
        </label>
        <input
          type="number"
          id="currentAmount"
          name="currentAmount"
          value={formData.currentAmount}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          {initialData ? 'Update' : 'Add'} Goal
        </button>
      </div>
    </form>
  );
};

export default GoalForm;