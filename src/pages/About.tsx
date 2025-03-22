
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">About TradeBot</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        TradeBot is a platform that helps traders automate their trading strategies.
      </p>
    </div>
  );
};

export default AboutPage;
