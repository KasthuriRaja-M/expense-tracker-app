import React, { useState, useEffect } from 'react';
import { Plus, Edit, X } from 'lucide-react';

const ExpenseForm = ({ onSubmit, editingExpense, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Education',
    'Housing',
    'Utilities',
    'Travel',
    'Other'
  ];

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        description: editingExpense.description,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Please fill in all fields');
      return;
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    if (!editingExpense) {
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        {editingExpense && (
          <button 
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ padding: '8px 12px' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter expense description"
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <button type="submit" className="btn flex items-center justify-center gap-2">
          {editingExpense ? (
            <>
              <Edit size={16} />
              Update Expense
            </>
          ) : (
            <>
              <Plus size={16} />
              Add Expense
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm; 