import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import GoalForm from '../components/Forms/GoalForm';
import { BudgetGoal } from '../types';

const GoalsPage: React.FC = () => {
  const { budgetData, addGoal, updateGoal, deleteGoal } = useBudget();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<BudgetGoal | null>(null);
  
  const handleAddGoal = (goal: Omit<BudgetGoal, 'id'>) => {
    addGoal(goal);
    setShowForm(false);
  };
  
  const handleUpdateGoal = (goal: Omit<BudgetGoal, 'id'>) => {
    if (editingGoal) {
      updateGoal({ ...goal, id: editingGoal.id });
      setEditingGoal(null);
    }
  };
  
  const handleEdit = (goal: BudgetGoal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingGoal(null);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(id);
    }
  };
  
  // Sort goals by deadline (closest first)
  const sortedGoals = [...budgetData.goals].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Budget Goals</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Goal'}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            {editingGoal ? 'Edit Goal' : 'Add New Goal'}
          </h2>
          <GoalForm 
            onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal} 
            initialData={editingGoal || undefined}
            onCancel={handleCancel}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedGoals.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center text-gray-500 dark:text-gray-400">
            No savings goals set. Add your first goal!
          </div>
        ) : (
          sortedGoals.map(goal => {
            const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{goal.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Target Amount:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      ${goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Current Amount:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      ${goal.currentAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Deadline:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Time Remaining:</span>
                    <span className={`font-medium ${
                      daysLeft <= 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-white'
                    }`}>
                      {daysLeft > 0 ? `${daysLeft} days` : 'Deadline passed'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Progress:</span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {progressPercentage.toFixed(0)}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          progressPercentage >= 100 ? 'bg-green-500' : 
                          daysLeft <= 0 ? 'bg-red-500' : 
                          'bg-indigo-500'
                        }`} 
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GoalsPage;