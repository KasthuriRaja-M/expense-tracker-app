import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseStats from './components/ExpenseStats';
import ExpenseChart from './components/ExpenseChart';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    if (editingExpense) {
      // Update existing expense
      setExpenses(expenses.map(exp => 
        exp.id === editingExpense.id ? { ...expense, id: exp.id } : exp
      ));
      setEditingExpense(null);
    } else {
      // Add new expense
      setExpenses([...expenses, { ...expense, id: Date.now() }]);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
  };

  const cancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="grid grid-2">
          <div>
            <ExpenseForm 
              onSubmit={addExpense} 
              editingExpense={editingExpense}
              onCancel={cancelEdit}
            />
            <ExpenseStats expenses={expenses} />
          </div>
          <div>
            <ExpenseChart expenses={expenses} />
          </div>
        </div>
        <ExpenseList 
          expenses={expenses} 
          onDelete={deleteExpense} 
          onEdit={editExpense}
        />
      </div>
    </div>
  );
}

export default App; 