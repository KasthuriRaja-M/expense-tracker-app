import React, { useState } from 'react';
import { Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [...new Set(expenses.map(exp => exp.category))];

  const sortedAndFilteredExpenses = expenses
    .filter(expense => !filterCategory || expense.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'description':
          return a.description.localeCompare(b.description);
        default:
          return 0;
      }
    });

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': '#FF6B6B',
      'Transportation': '#4ECDC4',
      'Shopping': '#45B7D1',
      'Entertainment': '#96CEB4',
      'Healthcare': '#FFEAA7',
      'Education': '#DDA0DD',
      'Housing': '#98D8C8',
      'Utilities': '#F7DC6F',
      'Travel': '#BB8FCE',
      'Other': '#AEB6BF'
    };
    return colors[category] || '#AEB6BF';
  };

  if (expenses.length === 0) {
    return (
      <div className="card text-center">
        <h3 className="text-xl font-semibold mb-2">No Expenses Yet</h3>
        <p className="text-gray-600">
          Start tracking your expenses by adding your first expense above!
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Expense History</h2>
        <div className="flex gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select"
            style={{ width: 'auto', minWidth: '120px' }}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="description">Sort by Name</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedAndFilteredExpenses.map(expense => (
          <div
            key={expense.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
            style={{ backgroundColor: '#fafafa' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getCategoryColor(expense.category) }}
                ></div>
                <div>
                  <h3 className="font-semibold text-lg">{expense.description}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Tag size={14} />
                      {expense.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {format(new Date(expense.date), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-600">
                  -${expense.amount.toFixed(2)}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(expense)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Edit expense"
                  >
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Delete expense"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedAndFilteredExpenses.length === 0 && expenses.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No expenses match the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList; 