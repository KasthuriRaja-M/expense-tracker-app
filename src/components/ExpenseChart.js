import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';

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

  const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#AEB6BF'
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-xl backdrop-blur-sm">
          <p className="font-bold text-gray-800 mb-1">{label}</p>
          <p className="text-red-600 font-semibold text-lg">
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
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
            <BarChart3 size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Expense Analytics</h2>
        </div>
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
            <BarChart3 size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-600 mb-3">No Data to Display</h3>
          <p className="text-gray-500 text-lg">Add some expenses to see beautiful charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
            <BarChart3 size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Expense Analytics</h2>
        </div>
        <div className="flex gap-2 p-1 rounded-xl bg-gray-100">
          <button
            onClick={() => setChartType('pie')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              chartType === 'pie'
                ? 'bg-white text-purple-600 shadow-md'
                : 'text-gray-600'
            }`}
          >
            <PieChartIcon size={16} />
            Category
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              chartType === 'bar'
                ? 'bg-white text-purple-600 shadow-md'
                : 'text-gray-600'
            }`}
          >
            <BarChart3 size={16} />
            Timeline
          </button>
        </div>
      </div>

      <div style={{ height: '450px' }} className="mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tickFormatter={formatMonth}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
              />
              <Tooltip 
                content={<CustomTooltip />}
                labelFormatter={formatMonth}
              />
              <Bar 
                dataKey="amount" 
                fill="url(#gradient)"
                radius={[6, 6, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {chartType === 'pie' && categoryData.length > 0 && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Category Breakdown</h3>
          <div className="grid grid-2 gap-4">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shadow-md"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="font-semibold text-gray-700">{item.name}</span>
                </div>
                <span className="font-bold text-gray-800">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart; 