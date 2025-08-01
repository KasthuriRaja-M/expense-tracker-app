import React from 'react';
import { DollarSign, TrendingUp, Calendar, Target, TrendingDown } from 'lucide-react';

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

  // Get previous month for comparison
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const previousMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === previousMonth && expenseDate.getFullYear() === previousYear;
  });
  const previousMonthTotal = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const monthChange = previousMonthTotal > 0 ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 : 0;

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
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      description: `${expenses.length} transactions`,
      change: null
    },
    {
      title: 'Average Expense',
      value: `$${averageExpense.toFixed(2)}`,
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
      description: 'Per transaction',
      change: null
    },
    {
      title: 'This Month',
      value: `$${currentMonthTotal.toFixed(2)}`,
      icon: Calendar,
      gradient: 'linear-gradient(135deg, #45B7D1 0%, #96C93D 100%)',
      description: `${currentMonthExpenses.length} transactions`,
      change: monthChange
    },
    {
      title: 'Top Category',
      value: mostExpensiveCategory,
      icon: Target,
      gradient: 'linear-gradient(135deg, #96CEB4 0%, #FFEAA7 100%)',
      description: mostExpensiveCategory !== 'None' ? `$${categoryTotals[mostExpensiveCategory]?.toFixed(2)}` : 'No expenses yet',
      change: null
    }
  ];

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <TrendingUp size={24} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Financial Overview</h2>
      </div>
      
      <div className="grid grid-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl border border-gray-100"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ background: stat.gradient }}
                >
                  <stat.icon size={24} className="text-white" />
                </div>
                {stat.change !== null && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.change > 0 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {stat.change > 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                    {Math.abs(stat.change).toFixed(1)}%
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{stat.title}</h3>
              <div className="text-3xl font-bold mb-2" style={{ 
                background: stat.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {expenses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
            <DollarSign size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Yet</h3>
          <p className="text-gray-500">Add your first expense to see beautiful statistics!</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseStats; 