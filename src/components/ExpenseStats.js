import React from 'react';
import { DollarSign, TrendingUp, Calendar, Target } from 'lucide-react';

const ExpenseStats = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  
  // Get current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const currentMonthTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Get most expensive category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  
  const mostExpensiveCategory = Object.keys(categoryTotals).length > 0 
    ? Object.entries(categoryTotals).reduce((a, b) => categoryTotals[a[0]] > categoryTotals[b[0]] ? a : b)[0]
    : 'None';

  const stats = [
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toFixed(2)}`,
      icon: DollarSign,
      color: '#FF6B6B',
      description: `${expenses.length} transactions`
    },
    {
      title: 'Average Expense',
      value: `$${averageExpense.toFixed(2)}`,
      icon: TrendingUp,
      color: '#4ECDC4',
      description: 'Per transaction'
    },
    {
      title: 'This Month',
      value: `$${currentMonthTotal.toFixed(2)}`,
      icon: Calendar,
      color: '#45B7D1',
      description: `${currentMonthExpenses.length} transactions`
    },
    {
      title: 'Top Category',
      value: mostExpensiveCategory,
      icon: Target,
      color: '#96CEB4',
      description: mostExpensiveCategory !== 'None' ? `$${categoryTotals[mostExpensiveCategory]?.toFixed(2)}` : 'No expenses yet'
    }
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Statistics</h2>
      <div className="grid grid-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-200"
            style={{ backgroundColor: '#fafafa' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <h3 className="font-semibold text-gray-700">{stat.title}</h3>
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseStats; 