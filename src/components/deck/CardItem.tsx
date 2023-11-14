import React from 'react';
import { type Card } from 'types/Card';

export interface CardProps {
  card: Card
}

export const CardItem: React.FC<CardProps> = ({ card }) => {
  return (
    <div>
      <p>{card.type.name}</p>
      {(card.value != null) &&
        <p>{card.value}</p>
      }
    </div>
  );
};
