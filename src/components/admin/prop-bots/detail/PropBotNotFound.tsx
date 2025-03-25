
import React from 'react';
import { Card } from '@/components/ui/card';

interface PropBotNotFoundProps {
  botId: string | undefined;
  onBack: () => void;
}

const PropBotNotFound: React.FC<PropBotNotFoundProps> = ({ botId, onBack }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">
          Không tìm thấy Prop Bot
        </h1>
        <p className="text-gray-400 mb-6">
          Bot với ID {botId} không tồn tại hoặc đã bị xóa.
        </p>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Quay lại
        </button>
      </div>
    </Card>
  );
};

export default PropBotNotFound;
