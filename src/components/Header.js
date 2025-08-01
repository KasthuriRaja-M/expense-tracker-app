import React from 'react';
import { Wallet, TrendingUp, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="card" style={{ 
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 50%, rgba(240, 147, 251, 0.95) 100%)',
      color: 'white',
      marginBottom: '40px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white opacity-10 rounded-full float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-white opacity-10 rounded-full float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
            <Wallet size={40} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-2" style={{ 
              background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              Expense Tracker
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-sm font-medium text-yellow-100">Smart Finance Management</span>
              <Sparkles size={16} className="text-yellow-300" />
            </div>
          </div>
          <div className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
            <TrendingUp size={40} className="text-white" />
          </div>
        </div>
        
        <p className="text-xl opacity-95 font-medium leading-relaxed max-w-3xl mx-auto">
          Track your expenses, analyze spending patterns, and take control of your finances with beautiful insights and intuitive analytics
        </p>
        
        <div className="mt-8 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full pulse"></div>
            <span>Real-time Analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full pulse" style={{ animationDelay: '1s' }}></div>
            <span>Smart Categories</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full pulse" style={{ animationDelay: '2s' }}></div>
            <span>Beautiful Charts</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 