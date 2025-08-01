import React from 'react';
import { Wallet, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="card" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      marginBottom: '30px',
      textAlign: 'center'
    }}>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Wallet size={32} />
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <TrendingUp size={32} />
      </div>
      <p className="text-lg opacity-90">
        Track your expenses, analyze spending patterns, and take control of your finances
      </p>
    </header>
  );
};

export default Header; 