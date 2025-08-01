import React, { useState } from 'react';
import { Edit, Trash2, Calendar, Tag, Filter, SortAsc } from 'lucide-react';
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

  const getCategoryGradient = (category) => {
    const gradients = {
      'Food & Dining': 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      'Transportation': 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
      'Shopping': 'linear-gradient(135deg, #45B7D1 0%, #96C93D 100%)',
      'Entertainment': 'linear-gradient(135deg, #96CEB4 0%, #FFEAA7 100%)',
      'Healthcare': 'linear-gradient(135deg, #FFEAA7 0%, #DDA0DD 100%)',
      'Education': 'linear-gradient(135deg, #DDA0DD 0%, #98D8C8 100%)',
      'Housing': 'linear-gradient(135deg, #98D8C8 0%, #F7DC6F 100%)',
      'Utilities': 'linear-gradient(135deg, #F7DC6F 0%, #BB8FCE 100%)',
      'Travel': 'linear-gradient(135deg, #BB8FCE 0%, #AEB6BF 100%)',
      'Other': 'linear-gradient(135deg, #AEB6BF 0%, #FF6B6B 100%)'
    };
    return gradients[category] || 'linear-gradient(135deg, #AEB6BF 0%, #FF6B6B 100%)';
  };

  if (expenses.length === 0) {
    return (
      <div className="card text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
          <Tag size={40} className="text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-700">No Expenses Yet</h3>
        <p className="text-gray-600 text-lg">
          Start tracking your expenses by adding your first expense above!
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600">
            <Tag size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Expense History</h2>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="select pl-10 pr-4"
              style={{ width: 'auto', minWidth: '180px' }}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <SortAsc size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select pl-10 pr-4"
              style={{ width: 'auto', minWidth: '160px' }}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="description">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedAndFilteredExpenses.map(expense => (
          <div
            key={expense.id}
            className="group relative p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Category indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: getCategoryGradient(expense.category) }}></div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ background: getCategoryGradient(expense.category) }}
                ></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{expense.description}</h3>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
                      <Tag size={14} />
                      <span className="font-medium">{expense.category}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
                      <Calendar size={14} />
                      <span className="font-medium">{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-600">
                    -${expense.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onEdit(expense)}
                    className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                    title="Edit expense"
                  >
                    <Edit size={18} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors duration-200"
                    title="Delete expense"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedAndFilteredExpenses.length === 0 && expenses.length > 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <Filter size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Matching Expenses</h3>
          <p className="text-gray-500">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList; 