
import React from 'react';
import Navigation from './Navigation';

const FixedNavigation = () => {
  return (
    <div className="sticky top-0 z-50">
      <Navigation />
    </div>
  );
};

export default FixedNavigation;
