
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Sign in to your TradeBot account.
      </p>
    </div>
  );
};

export default LoginPage;
