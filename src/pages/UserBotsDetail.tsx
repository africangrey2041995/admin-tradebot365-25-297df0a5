
import React from 'react';
import { useParams } from 'react-router-dom';

const UserBotsDetailPage: React.FC = () => {
  const { botId } = useParams<{ botId: string }>();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Bot Details</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Details for bot ID: {botId}
      </p>
    </div>
  );
};

export default UserBotsDetailPage;
