import React, { createContext, useContext, useState, useEffect } from 'react';
import { BudgetData, Income, Expense, BudgetGoal } from '../types';

interface BudgetContextType {
  budgetData: BudgetData;
  addIncome: (income: Omit<Income, 'id'>) => void;
  updateIncome: (income: Income) => void;
  deleteIncome: (id: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addGoal: (goal: Omit<BudgetGoal, 'id'>) => void;
  updateGoal: (goal: BudgetGoal) => void;
  deleteGoal: (id: string) => void;
  toggleTheme: () => void;
  totalIncome: number;
  totalExpense: number;
  savings: number;
}

const defaultBudgetData: BudgetData = {
  incomes: [],
  expenses: [],
  goals: [],
  theme: 'light',
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [budgetData, setBudgetData] = useState<BudgetData>(() => {
    const savedData = localStorage.getItem('budgetData');
    return savedData ? JSON.parse(savedData) : defaultBudgetData;
  });

  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
    
    // Apply theme
    if (budgetData.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [budgetData]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addIncome = (income: Omit<Income, 'id'>) => {
    const newIncome = { ...income, id: generateId() };
    setBudgetData(prev => ({
      ...prev,
      incomes: [...prev.incomes, newIncome],
    }));
  };

  const updateIncome = (income: Income) => {
    setBudgetData(prev => ({
      ...prev,
      incomes: prev.incomes.map(inc => (inc.id === income.id ? income : inc)),
    }));
  };

  const deleteIncome = (id: string) => {
    setBudgetData(prev => ({
      ...prev,
      incomes: prev.incomes.filter(income => income.id !== id),
    }));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: generateId() };
    setBudgetData(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));
  };

  const updateExpense = (expense: Expense) => {
    setBudgetData(prev => ({
      ...prev,
      expenses: prev.expenses.map(exp => (exp.id === expense.id ? expense : exp)),
    }));
  };

  const deleteExpense = (id: string) => {
    setBudgetData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(expense => expense.id !== id),
    }));
  };

  const addGoal = (goal: Omit<BudgetGoal, 'id'>) => {
    const newGoal = { ...goal, id: generateId() };
    setBudgetData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal],
    }));
  };

  const updateGoal = (goal: BudgetGoal) => {
    setBudgetData(prev => ({
      ...prev,
      goals: prev.goals.map(g => (g.id === goal.id ? goal : g)),
    }));
  };

  const deleteGoal = (id: string) => {
    setBudgetData(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id),
    }));
  };

  const toggleTheme = () => {
    setBudgetData(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  // Calculate totals
  const totalIncome = budgetData.incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = budgetData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savings = totalIncome - totalExpense;

  return (
    <BudgetContext.Provider
      value={{
        budgetData,
        addIncome,
        updateIncome,
        deleteIncome,
        addExpense,
        updateExpense,
        deleteExpense,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleTheme,
        totalIncome,
        totalExpense,
        savings,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};