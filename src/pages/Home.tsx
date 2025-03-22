
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Welcome to TradeBot</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        The next generation trading bot platform to automate your trading strategies.
      </p>
    </div>
  );
};

export default HomePage;
