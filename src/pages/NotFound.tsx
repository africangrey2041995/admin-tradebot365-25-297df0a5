
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
