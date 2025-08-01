import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseChart = ({ expenses }) => {
  const [chartType, setChartType] = useState('pie');

  // Prepare data for pie chart (by category)
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  // Prepare data for bar chart (by month)
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const existing = acc.find(item => item.month === monthYear);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ month: monthYear, amount: expense.amount });
    }
    return acc;
  }, []).sort((a, b) => a.month.localeCompare(b.month));

  // Format month labels
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#AEB6BF'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-red-600">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (expenses.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Expense Analytics</h2>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No data to display</p>
          <p className="text-sm text-gray-500">Add some expenses to see beautiful charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Expense Analytics</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              chartType === 'pie'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              chartType === 'bar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            By Month
          </button>
        </div>
      </div>

      <div style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickFormatter={formatMonth}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip 
                content={<CustomTooltip />}
                labelFormatter={formatMonth}
              />
              <Bar dataKey="amount" fill="#667eea" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {chartType === 'pie' && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Category Breakdown</h3>
          <div className="grid grid-2 gap-2">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart; 