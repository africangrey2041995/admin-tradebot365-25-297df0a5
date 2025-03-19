
import React from 'react';
import { BotCardProps } from '@/components/bots/BotCard';
import BotCard from '@/components/bots/BotCard';

interface BotListingProps {
  bots: BotCardProps[];
  favorites: Record<string, boolean>;
}

const BotListing = ({ bots, favorites }: BotListingProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      {bots.map((bot, index) => (
        <BotCard 
          key={index} 
          {...bot} 
          isFavorite={favorites[index] || false}
        />
      ))}
    </div>
  );
};

export default BotListing;
