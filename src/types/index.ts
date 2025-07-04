export interface Income {
  id: string;
  source: string;
  amount: number;
  date: string;
  recurring: boolean;
  frequency?: 'weekly' | 'biweekly' | 'monthly' | 'yearly';
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  recurring: boolean;
  frequency?: 'weekly' | 'biweekly' | 'monthly' | 'yearly';
}

export interface BudgetGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface BudgetData {
  incomes: Income[];
  expenses: Expense[];
  goals: BudgetGoal[];
  theme: 'light' | 'dark';
}